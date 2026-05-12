<template>
  <view v-show="props.show" class="ui-upload" :class="[classNames, props.customClass]" :style="[rootStyle]">
    <view v-for="(item, index) in renderList" :key="index" class="ui-upload__preview" :style="[previewStyle(index)]" @click="previewImage(item)">
      <view v-if="hasStatus(item)" class="ui-upload__status">
        <ui-icon v-if="item.status === 'fail'" name="cross" color="text-inverse" size="40rpx" />
        <ui-loading v-else-if="item.status === 'uploading'" color="text-inverse" size="40rpx" />
        <text class="ui-upload__status__message">{{ item.message }}</text>
      </view>
      <view v-if="canDelete(item)" class="ui-upload__delete" @click.stop="deleteFile(index)">
        <slot name="delete">
          <ui-icon custom-class="ui-upload__delete__icon" name="cross" color="text-inverse" size="20rpx" />
        </slot>
      </view>
      <ui-image v-if="isImageLink(item.name || item.url)" :src="item.url" :width="props.width" :height="props.height" :mode="props.imageMode" />
      <ui-icon
        v-else
        :name="isDocumentLink(item.name || item.url) ? 'description' : 'description'"
        :size="props.previewIconSize || 'var(--ui-upload-preview-icon-size)'"
        :color="props.previewIconColor || 'var(--ui-upload-preview-icon-color)'"
        :weight="props.previewIconWeight"
      />
    </view>
    <view v-if="canTrigger" class="ui-upload__trigger" :hover-class="triggerHoverClass" :hover-stay-time="100" :style="[triggerStyle]" @click="triggerUpload">
      <slot name="trigger">
        <slot name="icon">
          <ui-icon
            :name="props.icon"
            :size="props.iconSize || 'var(--ui-upload-icon-size)'"
            :color="props.iconColor || 'var(--ui-upload-icon-color)'"
            :weight="props.iconWeight"
          />
        </slot>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { UploadFile } from "./index"
import type { CSSProperties } from "vue"
import { formItemKey } from "../ui-form-item"
import { uuid, clone } from "../utils/utils"
import { callInterceptor } from "../utils/interceptor"
import { uploadEmits, uploadProps } from "./index"
import { useRect, useUnit, useColor, useRects, useStyle, useParent } from "../hooks"
import { ref, watch, computed, nextTick, reactive, getCurrentInstance } from "vue"
import { isArray, isNoEmpty, isFunction, isImage as isImageLink, isDocument as isDocumentLink } from "../utils/check"

defineOptions({ name: "ui-upload" })

const props = defineProps(uploadProps)
const emits = defineEmits(uploadEmits)

const instance = getCurrentInstance()

const { parent: formItem } = useParent(formItemKey)
// 有效禁用：合并 form/form-item 级
const effectiveDisabled = computed(() => Boolean(props.disabled) || Boolean(formItem?.disabled?.value) || Boolean(formItem?.readonly?.value))

// 内部文件列表
const list = reactive<UploadFile[]>([])
// 触发器 rect
const triggerRect = ref<UniApp.NodeInfo>({})
// 预览项 rects
const previewRects = ref<UniApp.NodeInfo[]>([])

// 数量上限（0 表示无上限）
const effectiveMaxCount = computed(() => (props.maxCount > 0 ? props.maxCount : Infinity))
// 可见列表（受 maxCount 限制）
const renderList = computed(() => (effectiveMaxCount.value === Infinity ? list : list.slice(0, effectiveMaxCount.value)))
// 是否显示触发器
const canTrigger = computed(() => list.length < effectiveMaxCount.value)
// 触发器 hover class
const triggerHoverClass = computed(() => (effectiveDisabled.value ? "" : "ui-upload__trigger--active"))

// 根节点样式
const rootStyle = computed(() => useStyle(props.customStyle))
// 根节点类名
const classNames = computed(() => {
  const list: string[] = []
  if (effectiveDisabled.value) list.push("ui-upload--disabled")
  return list
})
// 间距值（prop 未传时用 CSS var 兜底）
const gapValue = computed(() => (props.previewGap !== undefined ? useUnit(props.previewGap) : "var(--ui-upload-preview-gap)"))

// 预览项样式（基于位置算 margin）
const previewStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {}
    const firstRect = clone(previewRects.value[0])
    const currentRect = previewRects.value[index]
    if (props.width !== undefined) style.width = useUnit(props.width)
    if (props.height !== undefined) style.height = useUnit(props.height)
    if (props.background) style.background = useColor(props.background)
    if (effectiveMaxCount.value > 1) style.marginRight = gapValue.value
    if (index === list.length - 1) style.marginRight = 0
    if (firstRect && currentRect && firstRect?.top !== currentRect.top) {
      style.marginTop = gapValue.value
    }
    return useStyle(style)
  }
})
// 触发器样式
const triggerStyle = computed(() => {
  const style: CSSProperties = {}
  const firstRect = clone(previewRects.value[0])
  if (props.width !== undefined) style.width = useUnit(props.width)
  if (props.height !== undefined) style.height = useUnit(props.height)
  if (props.background) style.background = useColor(props.background)
  if (effectiveDisabled.value) {
    style.opacity = 0.6
    style.cursor = "not-allowed"
  }
  if (list.length > 0) style.marginLeft = gapValue.value
  if (isNoEmpty(firstRect) && isNoEmpty(triggerRect.value)) {
    const diff = Math.abs(triggerRect.value.top - firstRect.top)
    if (diff >= triggerRect.value.height) style.marginTop = gapValue.value
  }
  return useStyle(style)
})

watch(() => list, resize, { deep: true, immediate: true })
watch(() => props.modelValue, formatModelValue, { deep: true, immediate: true })

// 是否显示状态遮罩
function hasStatus(item: UploadFile): boolean {
  return ["fail", "uploading"].includes(item.status as string)
}

// 是否显示删除按钮
function canDelete(item: UploadFile): boolean {
  return item.status !== "uploading" && props.deletable && !effectiveDisabled.value
}

async function resize() {
  await nextTick()
  triggerRect.value = await useRect(".ui-upload__trigger", instance)
  previewRects.value = await useRects(".ui-upload__preview", instance)
}

// 触发选择
async function triggerUpload() {
  if (effectiveDisabled.value) return
  const files = await handleChoose()
  beforeRead(reactive(files))
}

// 读取前拦截
function beforeRead(files: UploadFile[]) {
  const validFiles = files.filter((file) => !checkOversize(file))
  const invalidFiles = files.filter((file) => checkOversize(file))
  if (invalidFiles.length) {
    emits("oversize", invalidFiles)
    return
  }
  const next = (files: UploadFile[]) => {
    const newFiles: UploadFile[] = []
    files?.forEach((file) => {
      const len = list.push(file)
      newFiles.push(list[len - 1])
    })
    afterRead(newFiles)
    updateModelValue()
  }
  if (isFunction(props.beforeRead)) {
    callInterceptor(props.beforeRead, { args: [validFiles], done: (files: UploadFile[] = validFiles) => next(isArray(files) ? files : validFiles) })
  } else {
    next(validFiles)
  }
}

// 读取后处理
async function afterRead(files: UploadFile[]) {
  const next = (files: UploadFile | UploadFile[]) => {
    if (isArray(files)) {
      files?.forEach((file) => {
        const index = list.findIndex((item) => item.uuid === file.uuid)
        if (index !== -1) list.splice(index, 1, file)
      })
    } else {
      const index = list.findIndex((item) => item.uuid === files.uuid)
      if (index !== -1) list.splice(index, 1, files)
    }
    updateModelValue()
  }
  if (isFunction(props.afterRead)) {
    props.afterRead(files, next)
  } else {
    next(files)
  }
}

// 超大检查（0 = 无上限）
function checkOversize(file: UploadFile) {
  if (isFunction(props.maxSize)) return props.maxSize(file)
  const max = Number(props.maxSize) || 0
  if (max <= 0) return false
  return (file.size ?? 0) > max
}

// modelValue → list 同步
function formatModelValue() {
  const modelUrls = new Set(isArray(props.modelValue) ? props.modelValue : props.modelValue ? props.modelValue.split(",") : [])
  // 倒序删 success 不在 modelValue 中的项
  for (let i = list.length - 1; i >= 0; i--) {
    const item = list[i]
    if (item.status === "success") {
      if (!modelUrls.has(item.url)) list.splice(i, 1)
      else modelUrls.delete(item.url)
    }
  }
  // 剩下的 url 是新增项
  modelUrls.forEach((url) => {
    list.push({ url: url as string, status: "success", message: "" })
  })
}

// list → modelValue 同步
function updateModelValue() {
  const urls = list.filter((item) => item.status === "success" && item.url).map((item) => item.url as string)
  const newValue = isArray(props.modelValue) ? urls : urls.join(",")
  emits("update:modelValue", newValue)
}

// 文件选择分发
function handleChoose(): Promise<UploadFile[]> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      let result: UploadFile[] = []
      switch (props.accept) {
        case "image":
          // #ifdef MP-WEIXIN
          result = await chooseMediaFile({ mediaType: ["image"] })
          // #endif
          // #ifndef MP-WEIXIN
          result = await chooseImageFile()
          // #endif
          resolve(result)
          break
        // #ifdef MP-WEIXIN
        case "media":
          resolve(await chooseMediaFile())
          break
        // #endif
        case "video":
          // #ifdef MP-WEIXIN
          result = await chooseMediaFile({ mediaType: ["video"] })
          // #endif
          // #ifndef MP-WEIXIN
          result = await chooseVideoFile()
          // #endif
          resolve(result)
          break
        // #ifdef MP-WEIXIN || H5
        case "file":
          // #ifdef MP-WEIXIN
          result = await chooseMessageFile()
          // #endif
          // #ifdef WEB
          result = await chooseFile()
          // #endif
          resolve(result)
          break
        // #endif
        default:
          // #ifdef MP-WEIXIN
          result = await chooseMessageFile()
          // #endif
          // #ifdef WEB
          result = await chooseFile()
          // #endif
          resolve(result)
          break
      }
    } catch (error) {
      reject(error)
    }
  })
}

// H5 / 通用 file 选择
function chooseFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseFile({
      count: props.multiple ? effectiveMaxCount.value : 1,
      type: props.accept as any,
      success: (res: any) => {
        resolve(
          res.tempFiles.map((file: any) => ({ file, url: file.path, name: file.name, size: file.size, type: file.type, uuid: uuid(), status: "", message: "" })),
        )
      },
      fail: reject,
    })
  })
}

// 删除
function deleteFile(index: number) {
  const file = list[index]
  const next = () => {
    const removed = list.splice(index, 1)[0]
    updateModelValue()
    emits("delete", { index, file: removed || file })
  }
  if (isFunction(props.beforeRemove)) {
    callInterceptor(props.beforeRemove, { args: [file, index], done: next })
  } else {
    next()
  }
}

// 图片选择
function chooseImageFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: props.multiple ? Math.min(effectiveMaxCount.value === Infinity ? 9 : effectiveMaxCount.value, 9) : 1,
      sizeType: props.sizeType,
      sourceType: props.capture,
      success: (res: any) => {
        resolve(
          res.tempFiles.map((file: any) => ({
            file,
            url: file.path,
            name: file.name,
            size: file.size,
            type: file.type,
            fileType: "image",
            thumb: file.path,
            uuid: uuid(),
            status: "",
            message: "",
          })),
        )
      },
      fail: reject,
    })
  })
}

// 媒体选择（MP-WEIXIN）
function chooseMediaFile(params?: any): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseMedia({
      count: props.multiple ? Math.min(effectiveMaxCount.value === Infinity ? 9 : effectiveMaxCount.value, 9) : 1,
      mediaType: params?.mediaType || ["image", "video"],
      sourceType: props.capture as any,
      maxDuration: props.maxDuration,
      sizeType: props.sizeType,
      camera: props.camera,
      success: (res) => {
        resolve(
          res.tempFiles.map((item: any) => ({
            ...item,
            url: item.tempFilePath,
            thumb: res.type === "video" ? item.thumbTempFilePath : item.tempFilePath,
            uuid: uuid(),
            status: "",
            message: "",
          })),
        )
      },
      fail: reject,
    })
  })
}

// 微信聊天文件选择（MP-WEIXIN）
function chooseMessageFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    wx.chooseMessageFile({
      count: props.multiple ? Math.min(effectiveMaxCount.value === Infinity ? 100 : effectiveMaxCount.value, 100) : 1,
      type: props.accept as UniApp.ChooseMessageFileOption["type"],
      success: (res: any) => {
        resolve(res.tempFiles.map((item: any) => ({ ...item, url: item.path, uuid: uuid(), status: "", message: "" })))
      },
      fail: reject,
    })
    // #endif
    // #ifndef MP-WEIXIN
    reject(new Error("chooseMessageFile 仅 MP-WEIXIN 支持"))
    // #endif
  })
}

// 视频选择
function chooseVideoFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseVideo({
      camera: props.camera,
      sourceType: props.capture as any,
      compressed: props.compressed,
      maxDuration: props.maxDuration,
      success: (res: any) => {
        resolve([
          {
            ...res,
            type: "video",
            url: res.tempFilePath,
            path: res.tempFilePath,
            thumb: res.thumbTempFilePath,
            uuid: uuid(),
            status: "",
            message: "",
            // #ifdef WEB
            file: res.tempFile,
            // #endif
          },
        ])
      },
      fail: reject,
    })
  })
}

// 图片预览
function previewImage(item: UploadFile) {
  if (!props.preview) return
  if (isImageLink(item.name || item.url)) uni.previewImage({ urls: [item.url as string] })
}
</script>

<script lang="ts">
export default {
  name: "ui-upload",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-upload {
  --ui-upload-bg: var(--ui-color-background-page);
  --ui-upload-width: 160rpx;
  --ui-upload-height: 160rpx;
  --ui-upload-radius: 0;
  --ui-upload-active-bg: #000;
  --ui-upload-delete-bg: rgba(0, 0, 0, 0.7);
  --ui-upload-icon-size: 56rpx;
  --ui-upload-status-bg: rgba(50, 50, 51, 0.88);
  --ui-upload-icon-color: var(--ui-color-text-placeholder);
  --ui-upload-delete-size: 28rpx;
  --ui-upload-preview-gap: 20rpx;
  --ui-upload-preview-icon-size: 60rpx;
  --ui-upload-preview-icon-color: var(--ui-color-text-placeholder);

  flex: 1;
  display: flex;
  flex-wrap: wrap;

  &__preview {
    width: var(--ui-upload-width);
    height: var(--ui-upload-height);
    display: flex;
    position: relative;
    background: var(--ui-upload-bg);
    align-items: center;
    flex-shrink: 0;
    border-radius: var(--ui-upload-radius);
    justify-content: center;
  }

  &__status {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1;
    position: absolute;
    background: var(--ui-upload-status-bg);
    align-items: center;
    border-radius: var(--ui-upload-radius);
    flex-direction: column;
    justify-content: center;

    &__message {
      color: var(--ui-color-text-inverse);
      margin-top: var(--ui-spacing-xs);
    }
  }

  &__delete {
    top: 0;
    right: 0;
    z-index: 2;
    position: absolute;

    &__icon {
      width: var(--ui-upload-delete-size);
      height: var(--ui-upload-delete-size);
      display: flex;
      background: var(--ui-upload-delete-bg);
      align-items: center;
      padding-left: var(--ui-spacing-xxs);
      border-radius: 0 0 0 24rpx;
      padding-bottom: var(--ui-spacing-xxs);
      justify-content: center;
    }
  }

  &__trigger {
    width: var(--ui-upload-width);
    height: var(--ui-upload-height);
    display: flex;
    position: relative;
    background: var(--ui-upload-bg);
    align-items: center;
    flex-shrink: 0;
    border-radius: var(--ui-upload-radius);
    justify-content: center;

    &::before {
      top: 50%;
      left: 50%;
      width: 100%;
      border: inherit;
      height: 100%;
      content: "";
      opacity: 0;
      z-index: 3;
      position: absolute;
      transform: translate(-50%, -50%);
      background: var(--ui-upload-active-bg);
      border-radius: inherit;
    }

    &--active::before {
      opacity: var(--ui-opacity-light);
    }
  }
}
</style>
