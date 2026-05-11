<template>
  <view>
    <ui-overlay
      v-if="props.overlay"
      :show="visible"
      :duration="props.duration"
      :z-index="zIndex"
      :lazy-render="props.lazyRender"
      :custom-style="props.overlayStyle"
      @click="onClickOverlay"
    />
    <view v-if="inited" class="ui-popup" :style="[style]" :class="[classs, props.customClass]" @transitionend="transition.end" @touchmove.prevent.stop="noop">
      <view v-if="props.closeable" class="ui-popup__close" :class="[closeClass]" @click.stop="onClickClose">
        <slot name="close">
          <ui-icon :name="props.closeIcon" />
        </slot>
      </view>
      <ui-safe-area-top v-if="props.safeAreaInsetTop" />
      <slot name="header" />
      <scroll-view class="ui-popup__scroll" enable-flex scroll-y :style="[scrollViewStyle]" @click.stop="onClickBody">
        <slot />
      </scroll-view>
      <slot name="footer" />
      <ui-safe-area-bottom v-if="props.safeAreaInsetBottom" />
      <slot name="outside" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { TransitionName } from "../hooks"
import type { PopupCloseAction } from "./index"
import { noop } from "../utils/utils"
import { isNumber } from "../utils/check"
import { ref, watch, computed } from "vue"
import { popupEmits, popupProps } from "./index"
import { useUnit, useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-popup" })

const props = defineProps(popupProps)
const emits = defineEmits(popupEmits)

const transition = useTransition()

const zIndex = ref<number>()
// 关闭来源 (用于事件传递)
const action = ref<PopupCloseAction>("external")
const visible = ref(false)

const inited = computed(() => !props.lazyRender || transition.inited.value)
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = zIndex.value
  if (props.background) style.background = useColor(props.background)
  if (props.borderRadius !== undefined) style["--ui-popup-border-radius"] = useUnit(props.borderRadius)
  // 离开动画结束后 panel 仍 inited=true 留 DOM；center 模式 fade opacity:0 不出屏，必须 display:none 否则拦截点击
  if (!transition.visible.value) style.display = "none"
  return useStyle({ ...style, ...useStyle(props.customStyle), ...transition.styles.value })
})
const classs = computed(() => [`ui-popup--${props.mode}`, transition.classs.value])
const closeClass = computed(() => {
  // mode → 默认关闭按钮位置 (right 改右侧不直观，故 left 上的 popup 关闭键放右上)
  const positions = { top: "top-right", right: "top-left", bottom: "top-right", left: "top-right", center: "top-right" }
  if (props.closeIconPosition) return [`ui-popup__close--${props.closeIconPosition}`]
  return [`ui-popup__close--${positions[props.mode]}`]
})
const scrollViewStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.width !== undefined) style.width = useUnit(props.width)
  if (props.height !== undefined) style.height = useUnit(props.height)
  if (props.maxWidth !== undefined) style.maxWidth = useUnit(props.maxWidth)
  if (props.maxHeight !== undefined) style.maxHeight = useUnit(props.maxHeight)
  return useStyle(style)
})

transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close", action.value))
transition.on("after-leave", () => emits("closed", action.value))

watch(
  () => props.show,
  (val) => {
    if (val) open()
    else close("external")
  },
  { immediate: true },
)
watch(() => [props.mode, props.duration], initTransition, { immediate: true })

function initTransition() {
  const modes = { top: "slide-down", left: "slide-left", right: "slide-right", bottom: "slide-up", center: "fade" }
  transition.init({ name: modes[props.mode] as TransitionName, duration: props.duration })
}

function open() {
  if (transition.visible.value) return
  initTransition()
  zIndex.value = isNumber(props.zIndex) ? +props.zIndex : useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
}

function close(a: PopupCloseAction = "external") {
  // 不再 early return：transition.visible 为 false 时仍交给 transition.leave 处理 (内部已有 enterPromise / visible 守卫)，
  // 否则 enter 动画进行中被关闭会让 popup 状态卡死，下次 open 失效
  action.value = a
  visible.value = false
  transition.leave()
  emits("update:show", false)
}

function onClickClose() {
  emits("clickClose")
  close("close")
}

function onClickBody() {
  emits("click")
}

function onClickOverlay() {
  emits("clickOverlay")
  if (props.closeOnClickOverlay) close("overlay")
}

defineExpose({ open, close })
</script>

<script lang="ts">
export default {
  name: "ui-popup",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-popup {
  --ui-popup-close-size: var(--ui-icon-size-sm);
  --ui-popup-side-width: 60vw;
  --ui-popup-close-color: var(--ui-color-text-secondary);
  --ui-popup-border-radius: var(--ui-radius-lg);

  overflow: hidden;
  position: fixed;
  max-width: 100vw;
  max-height: 100vh;
  background-color: var(--ui-color-background);
  transition-duration: var(--ui-transition-duration);

  &__scroll {
    max-height: 80vh;
  }

  &__close {
    color: var(--ui-popup-close-color);
    z-index: var(--ui-z-index-content);
    position: absolute;
    font-size: var(--ui-popup-close-size);
    line-height: 1;

    &--top-left {
      top: var(--ui-spacing-lg);
      left: var(--ui-spacing-lg);
    }

    &--top-right {
      top: var(--ui-spacing-lg);
      right: var(--ui-spacing-lg);
    }

    &--bottom-left {
      left: var(--ui-spacing-lg);
      bottom: var(--ui-spacing-lg);
    }

    &--bottom-right {
      right: var(--ui-spacing-lg);
      bottom: var(--ui-spacing-lg);
    }
  }

  &--top {
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: var(--ui-popup-border-radius);
    border-bottom-right-radius: var(--ui-popup-border-radius);
  }

  &--left {
    top: 0;
    left: 0;
    width: var(--ui-popup-side-width);
    bottom: 0;
    display: flex;
    flex-direction: column;
    border-top-right-radius: var(--ui-popup-border-radius);
    border-bottom-right-radius: var(--ui-popup-border-radius);
  }

  &--right {
    top: 0;
    right: 0;
    width: var(--ui-popup-side-width);
    bottom: 0;
    display: flex;
    flex-direction: column;
    border-top-left-radius: var(--ui-popup-border-radius);
    border-bottom-left-radius: var(--ui-popup-border-radius);
  }

  &--bottom {
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    border-top-left-radius: var(--ui-popup-border-radius);
    border-top-right-radius: var(--ui-popup-border-radius);
  }

  &--center {
    top: 50%;
    left: 0;
    right: 0;
    width: fit-content;
    margin: 0 auto;
    transform: translateY(-50%);
    border-radius: var(--ui-popup-border-radius);
  }
}
</style>
