<template>
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

  <view v-if="inited" class="ui-dialog" :class="[rootClass, props.customClass]" :style="rootStyle" @transitionend="transition.end" @touchmove.prevent.stop="noop">
    <view class="ui-dialog__body" :style="bodyStyle" @click.stop="noop">
      <slot name="title">
        <view v-if="mergedOptions.title" class="ui-dialog__title">
          {{ mergedOptions.title }}
        </view>
      </slot>

      <scroll-view class="ui-dialog__scroll" :style="scrollStyle" scroll-y enable-flex>
        <view class="ui-dialog__content" :style="contentStyle">
          <slot>
            <view class="ui-dialog__content__text" :class="contentTextClass">
              {{ mergedOptions.content }}
            </view>
          </slot>
        </view>
      </scroll-view>

      <view class="ui-dialog__footer" :class="footerClass" :style="footerStyle">
        <slot name="footer">
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

          <view v-if="mergedOptions.showCancelButton && mergedOptions.showConfirmButton" class="ui-dialog__footer__line" />

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

const props = defineProps(dialogProps)
const emits = defineEmits(dialogEmits)
// 过渡动画 hook
const transition = useTransition()
// 当前层级
const zIndex = ref<number | string>()
// 是否可见
const visible = ref(false)
// 打开动作来源（内部/外部）
const openAction = ref<DialogOpenAction>("outside")
// 取消按钮加载状态
const cancelLoading = ref(false)
// 确认按钮加载状态
const confirmLoading = ref(false)

// 配置合并：props（含 buildDefaultProps 默认值）< open() 运行时传入配置
// 删除冗余 baseOptions 硬编码（已由 buildDefaultProps 提供同份默认值）
const propOptions = ref<DialogOptions>({})
const mergedOptions = ref<DialogOptions>({})

// 显示中再次调用 open 时的请求队列（关闭后自动处理下一个，避免请求被吞）
const openQueue: Array<{ options: DialogOptions; action: DialogOpenAction }> = []

// 当前 show/alert/confirm 的 Promise resolve 引用，dialog.close() 主动关闭时兜底触发，防止 Promise 泄漏
let pendingPromiseResolve: ((value: unknown) => void) | null = null

// 是否已初始化（懒渲染场景）
const inited = computed(() => !props.lazyRender || transition.inited.value)

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {
    zIndex: zIndex.value,
    display: transition.visible.value ? "flex" : "none",
    marginTop: useUnit(mergedOptions.value.offsetTop),
  }
  return useStyle({ ...style, ...transition.styles.value })
})

// 根节点类名
const rootClass = computed(() => [`ui-dialog--${mergedOptions.value.contentAlign}`, transition.classs.value])

// 对话框主体样式
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

const footerStyle = computed(() =>
  useStyle({
    borderBottomLeftRadius: useUnit(mergedOptions.value.borderRadius),
    borderBottomRightRadius: useUnit(mergedOptions.value.borderRadius),
  }),
)

// 内容文本对齐类名
const contentTextClass = computed(() => `ui-dialog__content__text--${mergedOptions.value.contentAlign}`)

// 底部按钮区域类名
const footerClass = computed(() => (mergedOptions.value.buttonReverse ? "ui-dialog__footer--reverse" : ""))

transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => {
  emits("closed")
  // 关闭动画结束后，处理排队的下一个请求
  if (openQueue.length > 0) {
    const next = openQueue.shift()
    if (next) open(next.options, next.action)
  }
})

watch(
  () => props,
  (options) => {
    propOptions.value = { ...options }
  },
  { deep: true, immediate: true },
)

watch(
  () => props.show,
  (val) => {
    val ? open({}, "inner") : close("close")
  },
  { immediate: true },
)

watch(() => [props.duration, props.enterTimingFunction, props.leaveTimingFunction], initTransition, { immediate: true })

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
  // 兜底：未被 confirm/cancel/overlay callback 消费的 Promise 在此 resolve（按取消语义）
  if (pendingPromiseResolve) {
    pendingPromiseResolve(false)
    pendingPromiseResolve = null
  }
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

/** 打开对话框；显示中再次调用入队，关闭后自动处理 */
function open(options: DialogOptions = {}, action: DialogOpenAction = "outside") {
  if (visible.value) {
    openQueue.push({ options, action })
    return
  }

  initTransition()
  openAction.value = action
  mergedOptions.value = merge(propOptions.value, options)
  zIndex.value = isNumber(mergedOptions.value.zIndex) ? mergedOptions.value.zIndex : useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
}

/** 关闭对话框（内部使用，需要 action 参数） */
function close(action: DialogCloseAction) {
  if (!visible.value) return

  // 仅 confirm/cancel/overlay 三种 action 触发对应回调；"close" 为外部主动关闭，不触发
  const callbackMap: Record<Exclude<DialogCloseAction, "close">, ((next?: { close: () => void; done: () => void }) => void) | undefined> = {
    confirm: mergedOptions.value.onConfirm,
    cancel: mergedOptions.value.onCancel,
    overlay: mergedOptions.value.onOverlay,
  }
  const callback = action === "close" ? undefined : callbackMap[action]

  if (isFunction(callback)) {
    // 有 callback（show/alert/confirm 注入的 wrapper 或用户传的 onConfirm/onCancel/onOverlay）
    // → resolve 由 callback 自己处理，清空兜底引用，避免 doClose 触发 fallback resolve 抢先
    pendingPromiseResolve = null
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
    if (next && originalCallback) {
      // 异步模式 + 用户回调：用户掌握 close 时机；包装 next.close 让真正关闭时再 resolve
      const userClose = next.close
      const wrappedNext = {
        close: () => {
          userClose()
          resolve(resolveValue)
        },
        done: next.done,
      }
      originalCallback(wrappedNext)
    } else {
      // 同步模式或无用户回调：原逻辑（先关再 resolve）
      originalCallback?.(next)
      next?.close()
      resolve(resolveValue)
    }
  }
}

/** 关闭对话框（对外暴露，无需参数） */
function closeDialog() {
  close("close")
}

/** 显示对话框（Promise 风格） */
function show(options?: DialogOptions): Promise<boolean> {
  return new Promise((resolve) => {
    pendingPromiseResolve = resolve as (value: unknown) => void
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

/** 提示对话框（只有确认按钮）；包装 cancel/overlay 防止 closeOnClickOverlay 等场景下 Promise 泄漏 */
function alert(options?: string | DialogOptions): Promise<void> {
  const opts = typeof options === "string" ? { title: options } : options
  return new Promise<void>((resolve) => {
    pendingPromiseResolve = resolve as (value: unknown) => void
    open({
      ...opts,
      showCancelButton: false,
      showConfirmButton: true,
      onConfirm: createPromiseCallbacks(resolve, undefined, opts?.onConfirm),
      onCancel: createPromiseCallbacks(resolve, undefined, opts?.onCancel),
      onOverlay: createPromiseCallbacks(resolve, undefined, opts?.onOverlay),
    })
  })
}

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
    font-size: var(--ui-font-size-md);
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
