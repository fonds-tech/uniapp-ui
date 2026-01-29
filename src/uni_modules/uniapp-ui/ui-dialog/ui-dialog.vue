<template>
  <!-- 遮罩层 -->
  <ui-overlay
    v-if="mergedOptions.overlay"
    :show="visible"
    :z-index="zIndex"
    :duration="mergedOptions.duration"
    :lazy-render="lazyRender"
    :enter-timing-function="mergedOptions.enterTimingFunction"
    :leave-timing-function="mergedOptions.leaveTimingFunction"
    :custom-style="mergedOptions.overlayStyle"
    @click="handleOverlayClick"
  />

  <!-- 对话框主体 -->
  <view v-if="inited" class="ui-dialog" :class="[rootClass, props.customClass]" :style="rootStyle" @transitionend="transition.end" @touchmove.prevent.stop="noop">
    <view class="ui-dialog__body" :style="bodyStyle" @click.stop="noop">
      <!-- 标题区域 -->
      <slot name="title">
        <view v-if="mergedOptions.title" class="ui-dialog__title">
          {{ mergedOptions.title }}
        </view>
      </slot>

      <!-- 内容区域 -->
      <scroll-view class="ui-dialog__scroll" :style="scrollStyle" scroll-y enable-flex>
        <view class="ui-dialog__content" :style="contentStyle">
          <slot>
            <view class="ui-dialog__content__text" :class="contentTextClass">
              {{ mergedOptions.content }}
            </view>
          </slot>
        </view>
      </scroll-view>

      <!-- 底部按钮区域 -->
      <view class="ui-dialog__footer" :class="footerClass" :style="footerStyle">
        <slot name="footer">
          <!-- 取消按钮 -->
          <slot name="cancel">
            <ui-button
              v-if="mergedOptions.showCancelButton"
              block
              :loading="cancelLoading"
              loading-text=""
              size="large"
              type="default"
              border-radius="0rpx"
              text-weight="normal"
              border-width="0"
              :text-color="useColor(mergedOptions.cancelButtonColor)"
              @click="handleCancel"
            >
              {{ mergedOptions.cancelButtonText }}
            </ui-button>
          </slot>

          <!-- 按钮分隔线 -->
          <view v-if="mergedOptions.showCancelButton && mergedOptions.showConfirmButton" class="ui-dialog__footer__line" />

          <!-- 确认按钮 -->
          <slot name="confirm">
            <ui-button
              v-if="mergedOptions.showConfirmButton"
              block
              :loading="confirmLoading"
              loading-text=""
              size="large"
              type="default"
              border-radius="0rpx"
              text-weight="normal"
              border-width="0"
              :text-color="useColor(mergedOptions.confirmButtonColor)"
              @click="handleConfirm"
            >
              {{ mergedOptions.confirmButtonText }}
            </ui-button>
          </slot>
        </slot>
      </view>
    </view>

    <!-- 外部插槽 -->
    <slot name="outside" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { DialogOptions, DialogDoneAction, DialogOpenAction, DialogCloseAction } from "./index"
import { noop, merge } from "../utils/utils"
import { isNumber, isFunction } from "../utils/check"
import { ref, watch, computed } from "vue"
import { dialogEmits, dialogProps } from "./index"
import { useUnit, useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-dialog" })

// ===================== Props & Emits =====================
const props = defineProps(dialogProps)
const emits = defineEmits(dialogEmits)
// ===================== 状态管理 =====================
const transition = useTransition()
const zIndex = ref<number | string>()
const visible = ref(false)
const openAction = ref<DialogOpenAction>("outside")
const cancelLoading = ref(false)
const confirmLoading = ref(false)

// 配置合并：基础配置 < props配置 < open()传入配置
const baseOptions = ref<DialogOptions>({
  show: false,
  contentAlign: "center",
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: "确认",
  confirmButtonColor: "var(--ui-color-primary)",
  cancelButtonText: "取消",
  overlay: true,
  closeOnClickOverlay: false,
  asyncClose: false,
  duration: 300,
})
const propOptions = ref<DialogOptions>({})
const mergedOptions = ref<DialogOptions>({})

// ===================== 计算属性 =====================
const inited = computed(() => !props.lazyRender || transition.inited.value)

// 根元素样式
const rootStyle = computed(() => {
  const style: CSSProperties = {
    zIndex: zIndex.value,
    display: transition.visible.value ? "flex" : "none",
    marginTop: useUnit(mergedOptions.value.offsetTop),
  }
  return useStyle({ ...style, ...transition.styles.value })
})

// 根元素类名
const rootClass = computed(() => [`ui-dialog--${mergedOptions.value.contentAlign}`, transition.classs.value])

// 主体样式
const bodyStyle = computed(() => {
  const style: CSSProperties = {
    width: useUnit(mergedOptions.value.width),
    background: useColor(mergedOptions.value.background),
    borderRadius: useUnit(mergedOptions.value.borderRadius),
  }
  return useStyle({ ...style, ...useStyle(mergedOptions.value.customStyle) })
})

// 滚动区域样式
const scrollStyle = computed(() => useStyle({ height: useUnit(mergedOptions.value.height) }))

// 内容区域样式
const contentStyle = computed(() => useStyle({ padding: useUnit(mergedOptions.value.padding) }))

// 底部样式
const footerStyle = computed(() =>
  useStyle({
    borderBottomLeftRadius: useUnit(mergedOptions.value.borderRadius),
    borderBottomRightRadius: useUnit(mergedOptions.value.borderRadius),
  }),
)

// 内容文本类名
const contentTextClass = computed(() => `ui-dialog__content__text--${mergedOptions.value.contentAlign}`)

// 底部类名
const footerClass = computed(() => (mergedOptions.value.buttonReverse ? "ui-dialog__footer--reverse" : ""))

// ===================== 过渡动画事件绑定 =====================
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// ===================== 监听器 =====================
// 监听 props 变化，更新配置
watch(
  () => props,
  (options) => {
    propOptions.value = merge(baseOptions.value, options)
  },
  { deep: true, immediate: true },
)

// 监听 show 属性变化
watch(
  () => props.show,
  (val) => {
    val ? open({}, "inner") : close("close")
  },
  { immediate: true },
)

// 监听动画相关属性变化
watch(() => [props.duration, props.enterTimingFunction, props.leaveTimingFunction], initTransition, { immediate: true })

// ===================== 内部方法 =====================
/** 初始化过渡动画 */
function initTransition() {
  mergedOptions.value.enterTimingFunction = props.enterTimingFunction
  mergedOptions.value.leaveTimingFunction = props.leaveTimingFunction
  transition.init({
    name: "dialog-bounce",
    duration: props.duration,
    enterTimingFunction: props.enterTimingFunction,
    leaveTimingFunction: props.leaveTimingFunction,
  })
}

/** 执行关闭操作 */
function doClose() {
  openAction.value = "outside"
  cancelLoading.value = false
  confirmLoading.value = false
  visible.value = false
  transition.leave()
  emits("update:show", false)
}

/** 重置加载状态 */
function resetLoading(action: DialogDoneAction) {
  if (action === "confirm") {
    confirmLoading.value = false
  } else if (action === "cancel") {
    cancelLoading.value = false
  } else {
    confirmLoading.value = false
    cancelLoading.value = false
  }
}

// ===================== 事件处理 =====================
/** 点击遮罩层 */
function handleOverlayClick() {
  if (!mergedOptions.value.closeOnClickOverlay) return

  if (mergedOptions.value.asyncClose) {
    cancelLoading.value = true
    if (openAction.value === "inner") {
      emits("clickOverlay", { close: () => close("overlay") })
    } else {
      close("overlay")
      emits("clickOverlay")
    }
  } else {
    close("overlay")
    emits("clickOverlay")
  }
}

/** 点击取消按钮 */
function handleCancel() {
  if (mergedOptions.value.asyncClose) {
    cancelLoading.value = true
    if (openAction.value === "inner") {
      emits("cancel", { close: () => close("cancel"), done: () => resetLoading("cancel") })
    } else {
      close("cancel")
      emits("cancel")
    }
  } else {
    close("cancel")
    emits("cancel")
  }
}

/** 点击确认按钮 */
function handleConfirm() {
  if (mergedOptions.value.asyncClose) {
    confirmLoading.value = true
    if (openAction.value === "inner") {
      emits("confirm", { close: () => close("confirm"), done: () => resetLoading("confirm") })
    } else {
      close("confirm")
      emits("confirm")
    }
  } else {
    close("confirm")
    emits("confirm")
  }
}

// ===================== 公开方法 =====================
/** 打开对话框 */
function open(options: DialogOptions = {}, action: DialogOpenAction = "outside") {
  if (visible.value) return

  initTransition()
  openAction.value = action
  mergedOptions.value = merge(merge(baseOptions.value, propOptions.value), options)
  zIndex.value = isNumber(mergedOptions.value.zIndex) ? mergedOptions.value.zIndex : useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
}

/** 关闭对话框（内部使用，需要 action 参数） */
function close(action: DialogCloseAction) {
  if (!visible.value) return

  const callback = mergedOptions.value[`on${action.charAt(0).toUpperCase()}${action.slice(1)}` as keyof DialogOptions] as
    | ((next?: { close: () => void; done: () => void }) => void)
    | undefined

  if (isFunction(callback) && action !== "close") {
    if (mergedOptions.value.asyncClose) {
      callback({ close: doClose, done: () => resetLoading(action as DialogDoneAction) })
    } else {
      doClose()
      callback()
    }
  } else {
    doClose()
  }
}

/** 创建 Promise 回调处理器 */
function createPromiseCallbacks<T>(resolve: (value: T) => void, resolveValue: T, originalCallback?: (next?: { close: () => void; done: () => void }) => void) {
  return (next?: { close: () => void; done: () => void }) => {
    originalCallback?.(next)
    next?.close()
    resolve(resolveValue)
  }
}

/** 关闭对话框（对外暴露，无需参数） */
function closeDialog() {
  close("close")
}

/** 显示对话框（Promise 风格） */
function show(options?: DialogOptions): Promise<boolean> {
  return new Promise((resolve) => {
    open({
      ...options,
      onConfirm: createPromiseCallbacks(resolve, true, options?.onConfirm),
      onCancel: createPromiseCallbacks(resolve, false, options?.onCancel),
      onOverlay: createPromiseCallbacks(resolve, false, options?.onOverlay),
    })
  })
}

/** 确认对话框（带确认和取消按钮） */
function confirm(options?: string | DialogOptions): Promise<boolean> {
  const opts = typeof options === "string" ? { title: options } : options
  return show({
    ...opts,
    showCancelButton: true,
    showConfirmButton: true,
  })
}

/** 提示对话框（只有确认按钮） */
function alert(options?: string | DialogOptions): Promise<void> {
  const opts = typeof options === "string" ? { title: options } : options
  return new Promise((resolve) => {
    open({
      ...opts,
      showCancelButton: false,
      showConfirmButton: true,
      onConfirm: createPromiseCallbacks(resolve, undefined, opts?.onConfirm),
    })
  })
}

// ===================== 暴露方法 =====================
defineExpose({
  /** 打开对话框 */
  open,
  /** 关闭对话框 */
  close: closeDialog,
  /** 显示对话框（Promise 风格） */
  show,
  /** 确认对话框 */
  confirm,
  /** 提示对话框 */
  alert,
})
</script>

<script lang="ts">
export default {
  name: "ui-dialog",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-dialog {
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  position: fixed;
  max-width: calc(100vw - 96rpx);
  transform: translateY(-50%);
  max-height: 100%;
  border-radius: var(--ui-radius-lg);
  flex-direction: column;
  backface-visibility: hidden;
  transition-property: transform, opacity;

  &__body {
    margin: 0 auto;
    overflow: hidden;
    border-radius: var(--ui-radius-md);
    background-color: var(--ui-color-background);
  }

  &__title {
    display: flex;
    padding: var(--ui-spacing-md);
    overflow: hidden;
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
    justify-content: center;
  }

  &__scroll {
    max-height: 80vh;
  }

  &__content {
    padding: var(--ui-spacing-lg);
    font-size: var(--ui-font-size-md);
    word-wrap: break-word;
    white-space: pre-wrap;

    &__text {
      &--left {
        text-align: left;
      }
      &--center {
        text-align: center;
      }
      &--right {
        text-align: right;
      }
    }
  }

  &__footer {
    display: flex;
    overflow: hidden;
    position: relative;
    flex-direction: row;

    &--reverse {
      flex-direction: row-reverse;
    }

    &__line {
      top: 0;
      left: 50%;
      width: var(--ui-border-width);
      height: 100%;
      display: flex;
      z-index: var(--ui-z-index-content);
      position: absolute;
      transform: translateX(-50%);
      background-color: var(--ui-color-border-light);
    }

    &::after {
      top: 0;
      left: 0;
      width: 100%;
      content: "";
      position: absolute;
      border-top: var(--ui-border-width) solid var(--ui-color-border-light);
    }
  }

  // 弹出动画
  &-bounce-enter {
    opacity: 0;
    transform: translate3d(0, -50%, 0) scale(0.7);
  }

  &-bounce-leave-to {
    opacity: 0;
    transform: translate3d(0, -50%, 0) scale(0.9);
  }
}
</style>
