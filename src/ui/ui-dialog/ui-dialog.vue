<template>
  <ui-overlay
    v-if="useOptions.overlay"
    :show="visible"
    :z-index="zIndex"
    :duration="useOptions.duration"
    :lazy-render="lazyRender"
    :enter-timing-function="useOptions.enterTimingFunction"
    :leave-timing-function="useOptions.leaveTimingFunction"
    :custom-style="useOptions.overlayStyle"
    @click="onClickOverlay"
  />
  <view v-if="inited" class="ui-dialog" :style="[style]" :class="[classs, customClass]" @transitionend="transition.end" @touchmove.prevent.stop="noop">
    <view class="ui-dialog__body" :style="[bodyStyle]" @click.stop="noop">
      <slot name="title">
        <view v-if="useOptions.title" class="ui-dialog__title">
          {{ useOptions.title }}
        </view>
      </slot>

      <scroll-view class="ui-dialog__scroll" :style="[scrollStyle]" scroll-y enable-flex>
        <view class="ui-dialog__content" :style="[contentStyle]">
          <slot>
            <view class="ui-dialog__content__text" :class="[textClass]">
              {{ useOptions.content }}
            </view>
          </slot>
        </view>
      </scroll-view>

      <view class="ui-dialog__footer" :class="[footerClass]" :style="[footerStyle]">
        <slot name="footer">
          <slot name="cancel">
            <ui-button
              v-if="useOptions.showCancelButton"
              block
              :loading="cancelLoading"
              loading-text=""
              size="large"
              type="default"
              border-radius="0rpx"
              text-weight="normal"
              :text-color="useColor(useOptions.cancelButtonColor)"
              @click="cancel"
            >
              {{ useOptions.cancelButtonText }}
            </ui-button>
          </slot>
          <view v-if="useOptions.showCancelButton && useOptions.showConfirmButton" class="ui-dialog__footer__line" />
          <slot name="confirm">
            <ui-button
              v-if="useOptions.showConfirmButton"
              block
              :loading="confirmLoading"
              loading-text=""
              size="large"
              type="default"
              border-radius="0rpx"
              text-weight="normal"
              :text-color="useColor(useOptions.confirmButtonColor)"
              @click="confirm"
            >
              {{ useOptions.confirmButtonText }}
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
import { dialogEmits, dialogProps } from "./index"
import { useUnit, useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-dialog" })

// 定义props和emits
const props = defineProps(dialogProps)
const emits = defineEmits(dialogEmits)

// 使用transition hook
const transition = useTransition()

// 定义响应式变量
const zIndex = ref<number | string>()
const visible = ref(false) // 控制对话框是否可见
const openAction = ref<DialogOpenAction>("outside") // 记录打开对话框的动作来源
const cancelLoading = ref(false) // 控制取消按钮的加载状态
const confirmLoading = ref(false) // 控制确认按钮的加载状态
const useOptions = ref<DialogOptions>({}) // 当前使用的选项
const propOptions = ref<DialogOptions>({}) // 从props传入的选项
const baseOptions = ref<DialogOptions>({
  // 默认选项
  show: false,
  title: "",
  width: "",
  height: "",
  content: "",
  contentAlign: "center",
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: "确认",
  confirmButtonColor: "var(--ui-color-primary)",
  cancelButtonText: "取消",
  cancelButtonColor: "",
  enterTimingFunction: "",
  leaveTimingFunction: "",
  buttonReverse: false,
  overlay: true,
  overlayStyle: {},
  closeOnClickOverlay: false,
  padding: "",
  offsetTop: "",
  asyncClose: false,
  zIndex: "",
  duration: 300,
  background: "",
  borderRadius: "",
  customStyle: {},
  onConfirm: null,
  onCancel: null,
  onOverlay: null,
})

// 计算属性: 是否已初始化
const inited = computed(() => !props.lazyRender || transition.inited.value)

// 为transition的各个阶段绑定事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// 计算样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = zIndex.value
  style.display = transition.visible.value ? "flex" : "none"
  style.marginTop = useUnit(useOptions.value.offsetTop)
  return useStyle({ ...style, ...transition.styles.value })
})

const classs = computed(() => {
  const list = [`ui-dialog--${useOptions.value.contentAlign}`, transition.classs.value]
  return list
})

const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(useOptions.value.width)
  style.background = useColor(useOptions.value.background)
  style.borderRadius = useUnit(useOptions.value.borderRadius)
  return useStyle({ ...style, ...useStyle(useOptions.value.customStyle) })
})

const scrollStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = useUnit(useOptions.value.height)
  return useStyle(style)
})

const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.padding = useUnit(useOptions.value.padding)
  return useStyle(style)
})

const footerStyle = computed(() => {
  const style: CSSProperties = {}
  style.borderBottomLeftRadius = useUnit(useOptions.value.borderRadius)
  style.borderBottomRightRadius = useUnit(useOptions.value.borderRadius)
  return useStyle(style)
})

const textClass = computed(() => {
  const list: string[] = []
  list.push(`ui-dialog__content__text--${useOptions.value.contentAlign}`)
  return list
})

const footerClass = computed(() => {
  const list: string[] = []
  if (useOptions.value.buttonReverse) list.push("ui-dialog__footer--reverse")
  return list
})

// 监听props变化,更新propOptions
watch(
  () => props,
  (options) => {
    propOptions.value = merge(baseOptions.value, options)
  },
  { deep: true, immediate: true },
)

// 监听show属性变化,控制对话框的打开和关闭
watch(
  () => props.show,
  (val) => {
    val ? open({}, "inner") : close("close")
  },
  { immediate: true },
)

// 监听mode和duration属性变化,重新初始化transition
watch(() => [props.duration, props.enterTimingFunction, props.leaveTimingFunction], initTransition, { immediate: true })

// 初始化transition
function initTransition() {
  useOptions.value.enterTimingFunction = props.enterTimingFunction
  useOptions.value.leaveTimingFunction = props.leaveTimingFunction
  transition.init({
    name: "dialog-bounce",
    duration: props.duration,
    enterTimingFunction: props.enterTimingFunction,
    leaveTimingFunction: props.leaveTimingFunction,
  })
}

// 点击遮罩层的处理函数
function onClickOverlay() {
  if (useOptions.value.closeOnClickOverlay) {
    if (useOptions.value.asyncClose) {
      cancelLoading.value = true
      if (openAction.value === "inner") {
        const _close = () => close("overlay")
        emits("clickOverlay", { close: _close })
      } else {
        close("overlay")
        emits("clickOverlay")
      }
    } else {
      close("overlay")
      emits("clickOverlay")
    }
  }
}

// 打开对话框的函数
function open(options: DialogOptions = {}, action: DialogOpenAction = "outside") {
  if (visible.value) return
  initTransition()
  openAction.value = action
  useOptions.value = merge(merge(baseOptions.value, propOptions.value), options)
  zIndex.value = isNumber(useOptions.value.zIndex) ? useOptions.value.zIndex : useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
}

// 关闭对话框的函数
function close(action: DialogCloseAction) {
  if (visible.value) {
    const _close = () => {
      openAction.value = "outside"
      cancelLoading.value = false
      confirmLoading.value = false
      visible.value = false
      transition.leave()
      emits("update:show", false)
    }
    if (action === "confirm" && isFunction(useOptions.value.onConfirm)) {
      if (useOptions.value.asyncClose) {
        useOptions.value.onConfirm({ close: _close, done: () => done(action) })
      } else {
        _close()
        useOptions.value.onConfirm()
      }
    } else if (action === "cancel" && isFunction(useOptions.value.onCancel)) {
      if (useOptions.value.asyncClose) {
        useOptions.value.onCancel({ close: _close, done: () => done(action) })
      } else {
        _close()
        useOptions.value.onCancel()
      }
    } else if (action === "overlay" && isFunction(useOptions.value.onOverlay)) {
      if (useOptions.value.asyncClose) {
        useOptions.value.onOverlay({ close: _close, done: () => done(action) })
      } else {
        _close()
        useOptions.value.onOverlay()
      }
    } else {
      _close()
    }
  }
}

// 完成异步操作的函数
function done(action: DialogDoneAction) {
  switch (action) {
    case "confirm":
      confirmLoading.value = false
      break
    case "cancel":
      cancelLoading.value = false
      break
    default:
      confirmLoading.value = false
      cancelLoading.value = false
      break
  }
}

// 取消按钮点击处理函数
function cancel() {
  if (useOptions.value.asyncClose) {
    cancelLoading.value = true
    if (openAction.value === "inner") {
      const _done = () => done("cancel")
      const _close = () => close("cancel")
      emits("cancel", { close: _close, done: _done })
    } else {
      close("cancel")
      emits("cancel")
    }
  } else {
    close("cancel")
    emits("cancel")
  }
}

// 确认按钮点击处理函数
function confirm() {
  if (useOptions.value.asyncClose) {
    confirmLoading.value = true
    if (openAction.value === "inner") {
      const _done = () => done("confirm")
      const _close = () => close("confirm")
      emits("confirm", { close: _close, done: _done })
    } else {
      close("confirm")
      emits("confirm")
    }
  } else {
    close("confirm")
    emits("confirm")
  }
}

// 生命周期钩子函数
function onOpen() {
  emits("open")
}

function onOpened() {
  emits("opened")
}

function onClose() {
  emits("close")
}

function onClosed() {
  emits("closed")
}

defineExpose({ open, close })
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
    border-radius: var(--ui-radius-xl);
    background-color: var(--ui-color-background);
  }

  &__title {
    display: flex;
    overflow: hidden;
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
    padding-top: var(--ui-spacing-xxxl);
    padding-left: var(--ui-spacing-xxxl);
    padding-right: var(--ui-spacing-xxxl);
    justify-content: center;
  }

  &__scroll {
    max-height: 80vh;
  }

  &__content {
    padding: var(--ui-spacing-xxxl) var(--ui-spacing-xxxl);
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
      width: var(--ui-border-width-thick);
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
      border-top: var(--ui-border-width-thick) solid var(--ui-color-border-light);
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
