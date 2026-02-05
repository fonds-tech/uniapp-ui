<template>
  <view v-show="props.show" class="ui-upload" :class="[classs, props.customClass]" :style="[style]">
    <view v-for="(item, index) in renderList" :key="index" class="ui-upload__preview" :style="[previewStyle(index)]" @click="previewImage(item)">
      <view v-if="isShowStatus(item)" class="ui-upload__status">
        <ui-icon v-if="item.status === 'fail'" name="cross" color="text-inverse" size="40rpx" />
        <ui-loading v-else-if="item.status === 'uploading'" color="text-inverse" size="40rpx" />
        <text class="ui-upload__status__message">
          {{ item.message }}
        </text>
      </view>
      <view v-if="isShowDelete(item)" class="ui-upload__delete" @click.stop="deleteFile(index)">
        <slot name="delete">
          <ui-icon custom-class="ui-upload__delete__icon" name="cross" color="text-inverse" size="20rpx" />
        </slot>
      </view>
      <ui-image v-if="isImage(item.name || item.url)" :src="item.url" :width="props.width" :height="props.height" :mode="props.imageMode" />
      <ui-icon v-else-if="isDocument(item.name || item.url)" name="description" :size="props.previewIconSize" :color="props.previewIconColor" :weight="props.previewIconWeight" />
      <ui-icon v-else name="description" :size="props.previewIconSize" :color="props.previewIconColor" :weight="props.previewIconWeight" />
    </view>
    <view v-if="list.length < props.maxCount" class="ui-upload__trigger" :hover-class="triggerHoverClass" :hover-stay-time="100" :style="[triggerStyle]" @click="triggerUpload">
      <slot name="trigger">
        <slot name="icon">
          <ui-icon :name="props.icon" :size="props.iconSize" :color="props.iconColor" :weight="props.iconWeight" />
        </slot>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { UploadFile } from "./index"
import type { CSSProperties } from "vue"
import { uuid, clone } from "../utils/utils"
import { callInterceptor } from "../utils/interceptor"
import { uploadEmits, uploadProps } from "./index"
import { useRect, useUnit, useColor, useRects, useStyle } from "../hooks"
import { ref, watch, computed, nextTick, reactive, getCurrentInstance } from "vue"
import { isArray, isNoEmpty, isFunction, isImage as isImageLink, isDocument as isDocumentLink } from "../utils/check"

defineOptions({ name: "ui-upload" })

const props = defineProps(uploadProps)
const emits = defineEmits(uploadEmits)
const list = reactive<UploadFile[]>([])
const triggerRect = ref<UniApp.NodeInfo>({})
const previewRects = ref<UniApp.NodeInfo[]>([])
const instance = getCurrentInstance()

const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("ui-upload--disabled")
  return list
})

const previewStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {}
    const firstRect = clone(previewRects.value[0])
    const currentRect = previewRects.value[index]
    style.width = useUnit(props.width)
    style.height = useUnit(props.height)
    style.background = useColor(props.background)
    style.marginRight = props.maxCount > 1 ? useUnit(props.previewGap) : 0
    if (index === list.length - 1) style.marginRight = 0
    if (firstRect && currentRect && firstRect?.top !== currentRect.top) {
      style.marginTop = useUnit(props.previewGap)
    }

    return useStyle(style)
  }
})

const triggerStyle = computed(() => {
  const style: CSSProperties = {}
  const firstRect = clone(previewRects.value[0])
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  if (props.disabled) {
    style.opacity = 0.6
    style.cursor = "not-allowed"
  }
  style.marginLeft = list.length > 0 ? useUnit(props.previewGap) : 0

  if (isNoEmpty(firstRect) && isNoEmpty(triggerRect.value)) {
    const diff = Math.abs(triggerRect.value.top - firstRect.top)
    if (diff >= triggerRect.value.height) style.marginTop = useUnit(props.previewGap)
  }

  return useStyle(style)
})

const isImage = computed(() => (url: string) => isImageLink(url))
const isDocument = computed(() => (url: string) => isDocumentLink(url))
const isShowStatus = computed(() => (item: UploadFile) => ["fail", "uploading"].includes(item.status))
const isShowDelete = computed(() => (item: UploadFile) => item.status !== "uploading" && props.deletable && !props.disabled)
const triggerHoverClass = computed(() => (props.disabled ? "" : "ui-upload__trigger--active"))
const renderList = computed(() => list.slice(0, props.maxCount))

watch(() => list, resize, { deep: true, immediate: true })
watch(() => props.modelValue, formatModelValue, { deep: true, immediate: true })

async function resize() {
  await nextTick()
  triggerRect.value = await useRect(".ui-upload__trigger", instance)
  previewRects.value = await useRects(".ui-upload__preview", instance)
}

// 触发上传
async function triggerUpload() {
  if (props.disabled) return
  const files = await handleChoose()
  beforeRead(reactive(files))
}

// 读取之前
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

// 读取之后
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

// 检查是否超出大小
function checkOversize(file: UploadFile) {
  return isFunction(props.maxSize) ? props.maxSize(file) : file.size > +props.maxSize
}

// 格式化绑定值列表
function formatModelValue() {
  const modelUrls = new Set(isArray(props.modelValue) ? props.modelValue : props.modelValue ? props.modelValue.split(",") : [])

  // 1. 移除 list 中状态为 success 但不在 modelValue 中的项（外部删除了）
  // 注意倒序遍历以安全删除
  for (let i = list.length - 1; i >= 0; i--) {
    const item = list[i]
    if (item.status === "success") {
      if (!modelUrls.has(item.url)) {
        list.splice(i, 1)
      } else {
        // 如果存在，从 set 中移除，剩下的就是新增的
        modelUrls.delete(item.url)
      }
    }
  }

  // 2. 添加 modelValue 中有但 list 中没有的项（外部新增了）
  modelUrls.forEach((url) => {
    list.push({ url: url as string, status: "success", message: "" })
  })
}

// 更新绑定值
function updateModelValue() {
  const urls = list.filter((item) => item.status === "success" && item.url).map((item) => item.url)
  const newValue = isArray(props.modelValue) ? urls : urls.join(",")
  emits("update:modelValue", newValue)
}

// 处理选择文件
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

// 选择文件
function chooseFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseFile({
      count: props.multiple ? props.maxCount : 1,
      type: props.accept as any,
      success: (res: any) => {
        resolve(
          res.tempFiles.map((file: any) => {
            return { file, url: file.path, name: file.name, size: file.size, type: file.type, uuid: uuid(), status: "", message: "" }
          }),
        )
      },
      fail: reject,
    })
  })
}

// 删除文件
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

// 选择图片文件
function chooseImageFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: props.multiple ? Math.min(props.maxCount, 9) : 1,
      sizeType: props.sizeType,
      sourceType: props.capture,
      success: (res: any) => {
        resolve(
          res.tempFiles.map((file: any) => {
            return {
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
            }
          }),
        )
      },
      fail: reject,
    })
  })
}

// 选择媒体文件(微信小程序)
function chooseMediaFile(params?: any): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    uni.chooseMedia({
      count: props.multiple ? Math.min(props.maxCount, 9) : 1,
      mediaType: params.mediaType || ["image", "video"],
      sourceType: props.capture as any,
      maxDuration: props.maxDuration,
      sizeType: props.sizeType,
      camera: props.camera,
      success: (res) => {
        resolve(
          res.tempFiles.map((item: any) => {
            return {
              ...item,
              url: item.tempFilePath,
              thumb: res.type === "video" ? item.thumbTempFilePath : item.tempFilePath,
              uuid: uuid(),
              status: "",
              message: "",
            }
          }),
        )
      },
      fail: reject,
    })
  })
}

// 选择微信聊天文件(微信小程序)
function chooseMessageFile(): Promise<UploadFile[]> {
  return new Promise((resolve, reject) => {
    wx.chooseMessageFile({
      count: props.multiple ? Math.min(props.maxCount, 100) : 1,
      type: props.accept as UniApp.ChooseMessageFileOption["type"],
      success: (res: any) => {
        resolve(
          res.tempFiles.map((item: any) => {
            return { ...item, url: item.path, uuid: uuid(), status: "", message: "" }
          }),
        )
      },
      fail: reject,
    })
  })
}

// 选择视频文件
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

// 预览图片
function previewImage(item: UploadFile) {
  if (!props.preview) return
  if (isImageLink(item.name || item.url)) {
    uni.previewImage({ urls: [item.url] })
  }
}
</script>

<script lang="ts">
export default {
  name: "ui-upload",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-upload {
  flex: 1;
  display: flex;
  flex-wrap: wrap;

  &__preview {
    display: flex;
    position: relative;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    background-color: #f7f8fa;
  }

  &__status {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1;
    position: absolute;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(50 50 51 / 88%);

    &__message {
      color: var(--ui-color-text-inverse);
      margin-top: 12rpx;
    }
  }

  &__delete {
    top: 0;
    right: 0;
    z-index: 2;
    position: absolute;

    &__icon {
      width: 28rpx;
      height: 28rpx;
      display: flex;
      align-items: center;
      padding-left: 4rpx;
      border-radius: 0 0 0 24rpx;
      padding-bottom: 4rpx;
      justify-content: center;
      background-color: rgb(0 0 0 / 70%);
    }
  }

  &__trigger {
    display: flex;
    position: relative;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    background-color: #f7f8fa;

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
      background: #000;
      border-radius: inherit;
    }

    &--active::before {
      opacity: 0.1;
    }
  }
}
</style>
