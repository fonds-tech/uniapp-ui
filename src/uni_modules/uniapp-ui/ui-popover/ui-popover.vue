<template>
  <view class="ui-popover">
    <view class="ui-popover__reference" @click="onClickReference">
      <slot />
    </view>
    <ui-overlay v-if="props.overlay" :show="visible" :duration="props.duration" :z-index="currentZIndex" :custom-style="props.overlayStyle" @click="onClickOutside" />
    <!-- 隐藏镜像，按需挂载用于测量 popup 真实尺寸 -->
    <view v-if="showMirror" class="ui-popover__measure" :class="measureClass">
      <view v-if="props.showArrow" class="ui-popover__arrow" :class="[arrowClass]" />
      <view class="ui-popover__content">
        <slot name="content">
          <view v-for="(action, index) in props.actions" :key="action.id ?? index" class="ui-popover__action">
            <ui-icon v-if="action.icon" :name="action.icon" class="ui-popover__action__icon" />
            <text class="ui-popover__action__text">{{ action.text }}</text>
          </view>
        </slot>
      </view>
    </view>
    <view v-if="inited" class="ui-popover__panel" :class="[panelClass, props.customClass]" :style="[panelStyle]" @transitionend="transition.end" @touchmove.stop="noop">
      <view v-if="props.showArrow" class="ui-popover__arrow" :class="[arrowClass]" :style="arrowStyle" />
      <view class="ui-popover__content">
        <slot name="content">
          <view v-for="(action, index) in props.actions" :key="action.id ?? index" class="ui-popover__action" :class="[actionClass(action)]" @click="onClickAction(action, index)">
            <ui-icon v-if="action.icon" :name="action.icon" class="ui-popover__action__icon" />
            <text class="ui-popover__action__text">{{ action.text }}</text>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { PopoverAction } from "./index"
import type { CSSProperties } from "vue"
import { noop } from "../utils/utils"
import { useRect, useStyle, useTransition, useGlobalZIndex } from "../hooks"
import { pushQueue, closeOthers, removeQueue, popoverEmits, popoverProps } from "./index"
import { ref, watch, computed, nextTick, onMounted, onBeforeUnmount, getCurrentInstance } from "vue"

defineOptions({ name: "ui-popover" })

const props = defineProps(popoverProps)
const emits = defineEmits(popoverEmits)

const transition = useTransition()

const instance = getCurrentInstance()

const visible = ref(false)
const refWidth = ref(0)
const popWidth = ref(0)
const refHeight = ref(0)
const popHeight = ref(0)
const showMirror = ref(false)
const currentZIndex = ref<number>()

// 是否已初始化渲染
const inited = computed(() => transition.inited.value)
// 镜像类名 (与 panel 同主题/位置以保持尺寸一致)
const measureClass = computed(() => [`ui-popover__measure--${props.placement}`, `ui-popover__measure--${props.theme}`])
// 箭头方向类名
const arrowClass = computed(() => {
  const p = props.placement
  if (p.startsWith("top")) return "ui-popover__arrow--bottom"
  if (p.startsWith("bottom")) return "ui-popover__arrow--top"
  if (p === "left") return "ui-popover__arrow--right"
  if (p === "right") return "ui-popover__arrow--left"
  return ""
})
// 箭头位置 (start/end 变体: 对齐触发元素中心，并夹紧到 panel 内)
const arrowStyle = computed(() => {
  const p = props.placement
  const rw = refWidth.value
  const pw = popWidth.value
  const [offsetX] = props.offset
  const safe = 12
  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
  const style: CSSProperties = {}
  if (p === "top-start" || p === "bottom-start") {
    style.left = `${clamp(rw / 2 - offsetX, safe, Math.max(safe, pw - safe))}px`
  } else if (p === "top-end" || p === "bottom-end") {
    const x = clamp(rw / 2 - offsetX, safe, Math.max(safe, pw - safe))
    style.left = `${pw - x}px`
  }
  return useStyle(style)
})
// panel 类名 (主题 + 位置 + 过渡)
const panelClass = computed(() => [`ui-popover__panel--${props.theme}`, `ui-popover__panel--${props.placement}`, transition.classs.value])
// panel inline 定位 (相对组件根); transform 留给 zoom 动画
const panelStyle = computed(() => {
  const [offsetX, offsetY] = props.offset
  const rw = refWidth.value
  const rh = refHeight.value
  const pw = popWidth.value
  const ph = popHeight.value
  // 离开动画结束后 panel 仍 inited=true 留在 DOM，必须 display:none 否则 absolute 定位元素继续拦截点击
  const style: CSSProperties = { zIndex: currentZIndex.value, display: transition.visible.value ? undefined : "none" }

  switch (props.placement) {
    case "top":
      style.bottom = `${rh + offsetY}px`
      style.left = `${(rw - pw) / 2}px`
      break
    case "top-start":
      style.bottom = `${rh + offsetY}px`
      style.left = `${offsetX}px`
      break
    case "top-end":
      style.bottom = `${rh + offsetY}px`
      style.left = `${rw - pw - offsetX}px`
      break
    case "bottom":
      style.top = `${rh + offsetY}px`
      style.left = `${(rw - pw) / 2}px`
      break
    case "bottom-start":
      style.top = `${rh + offsetY}px`
      style.left = `${offsetX}px`
      break
    case "bottom-end":
      style.top = `${rh + offsetY}px`
      style.left = `${rw - pw - offsetX}px`
      break
    case "left":
      style.right = `${rw + offsetY}px`
      style.top = `${(rh - ph) / 2}px`
      break
    case "right":
      style.left = `${rw + offsetY}px`
      style.top = `${(rh - ph) / 2}px`
      break
  }

  return useStyle({ ...style, ...useStyle(props.customStyle), ...transition.styles.value })
})

transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

watch(
  () => props.show,
  (val) => (val ? open(true) : close(true)),
)
watch(
  () => props.duration,
  () => transition.init({ name: "zoom-in", duration: props.duration }),
  { immediate: true },
)
// actions / placement 变化重测
watch(
  () => [props.actions, props.placement],
  () => measure(),
)

function actionClass(action: PopoverAction) {
  const list: string[] = []
  if (action.disabled) list.push("ui-popover__action--disabled")
  if (action.className) list.push(action.className)
  return list
}

// 测量触发元素与镜像 panel 尺寸 (按需挂载镜像)
async function measure() {
  if (!instance) return
  showMirror.value = true
  await nextTick()
  const refRect = await useRect(".ui-popover__reference", instance)
  refWidth.value = refRect?.width || 0
  refHeight.value = refRect?.height || 0
  const popRect = await useRect(".ui-popover__measure", instance)
  popWidth.value = popRect?.width || 0
  popHeight.value = popRect?.height || 0
  showMirror.value = false
}

// silent=true 时不 emit update:show，避免 watch(props.show) 触发的状态同步又回 emit 形成回环
async function open(silent = false) {
  if (visible.value) return
  if (instance) closeOthers(instance.uid)
  visible.value = true
  await measure()
  currentZIndex.value = props.zIndex !== undefined ? Number(props.zIndex) : useGlobalZIndex()
  transition.enter()
  if (!silent) emits("update:show", true)
  // #ifdef H5
  // setTimeout 0 推到下一个 macrotask，确保完全错过当前 click 事件 task；
  // nextTick 是 microtask，仍在原 click task 内执行，导致 onDocClick 被原 click bubble 触发
  setTimeout(() => {
    if (visible.value) document.addEventListener("click", onDocClick)
  }, 0)
  // #endif
}

function close(silent = false) {
  if (!visible.value) return
  visible.value = false
  transition.leave()
  if (!silent) emits("update:show", false)
  // #ifdef H5
  document.removeEventListener("click", onDocClick)
  // #endif
}

function onClickReference() {
  if (props.trigger !== "click") return
  if (visible.value) close()
  else open()
}

function onClickOutside() {
  emits("clickOutside")
  if (props.closeOnClickOutside) close()
}

// #ifdef H5
// MP 无 document 事件，点击外部关闭仅 H5 支持；MP 端需 overlay=true 才能点遮罩关
function onDocClick(e: Event) {
  if (!visible.value || !props.closeOnClickOutside) return
  const root = instance?.proxy?.$el as HTMLElement | undefined
  if (root && !root.contains(e.target as Node)) {
    emits("clickOutside")
    close()
  }
}
// #endif

function onClickAction(action: PopoverAction, index: number) {
  if (action.disabled) return
  emits("select", action, index)
  if (props.closeOnClickAction) close()
}

onMounted(async () => {
  if (instance) pushQueue({ uid: instance.uid, close: () => close(true) })
  await measure()
  if (props.show) open()
})

onBeforeUnmount(() => {
  if (instance) removeQueue(instance.uid)
  // #ifdef H5
  // 卸载时若 popover 仍开着，监听器还挂在 document 上，需清理
  document.removeEventListener("click", onDocClick)
  // #endif
})

defineExpose({ resize: measure })
</script>

<script lang="ts">
export default {
  name: "ui-popover",
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

.ui-popover {
  width: max-content;
  display: inline-block;
  position: relative;

  // 触发元素容器
  &__reference {
    display: inline-block;
  }

  // 浮动面板 + 测量镜像共享样式
  &__panel,
  &__measure {
    --ui-popover-bg: var(--ui-color-background);
    --ui-popover-color: var(--ui-color-text);
    --ui-popover-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.12);
    --ui-popover-divider: var(--ui-color-border-light);
    --ui-popover-arrow-size: 16rpx;
    --ui-popover-action-active: var(--ui-color-background-hover);
    color: var(--ui-popover-color);
    position: absolute;
    background: var(--ui-popover-bg);
    box-shadow: var(--ui-popover-shadow);
    border-radius: var(--ui-radius-md);
    transition-duration: var(--ui-transition-duration);

    // dark 主题 var 覆盖
    &--dark {
      --ui-popover-bg: var(--ui-gray-9);
      --ui-popover-color: var(--ui-color-text-inverse);
      --ui-popover-divider: rgba(255, 255, 255, 0.1);
      --ui-popover-action-active: rgba(255, 255, 255, 0.1);
    }

    // transform-origin 让 zoom 从触发点扩展
    &--top,
    &--top-start,
    &--top-end {
      transform-origin: bottom center;
    }

    &--bottom,
    &--bottom-start,
    &--bottom-end {
      transform-origin: top center;
    }

    &--left {
      transform-origin: right center;
    }

    &--right {
      transform-origin: left center;
    }
  }

  // 测量镜像额外属性 (隐形不可点)
  &__measure {
    top: 0;
    left: 0;
    z-index: -1;
    visibility: hidden;
    pointer-events: none;
  }

  // 箭头 (旋转 45° 露出半个方块)
  &__arrow {
    width: var(--ui-popover-arrow-size);
    height: var(--ui-popover-arrow-size);
    position: absolute;
    transform: rotate(45deg);
    background: var(--ui-popover-bg);

    &--top {
      top: calc(var(--ui-popover-arrow-size) / -2);
      left: 50%;
      margin-left: calc(var(--ui-popover-arrow-size) / -2);
    }

    &--bottom {
      left: 50%;
      bottom: calc(var(--ui-popover-arrow-size) / -2);
      margin-left: calc(var(--ui-popover-arrow-size) / -2);
    }

    &--left {
      top: 50%;
      left: calc(var(--ui-popover-arrow-size) / -2);
      margin-top: calc(var(--ui-popover-arrow-size) / -2);
    }

    &--right {
      top: 50%;
      right: calc(var(--ui-popover-arrow-size) / -2);
      margin-top: calc(var(--ui-popover-arrow-size) / -2);
    }
  }

  // 内容容器
  &__content {
    overflow: hidden;
    border-radius: inherit;
  }

  // 操作项
  &__action {
    cursor: pointer;
    display: flex;
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
    position: relative;
    transition: background-color var(--ui-transition-fast);
    align-items: center;
    white-space: nowrap;

    &:active {
      background: var(--ui-popover-action-active);
    }

    &::after {
      left: var(--ui-spacing-lg);
      right: var(--ui-spacing-lg);
      bottom: 0;
      height: var(--ui-border-width-thin);
      content: "";
      position: absolute;
      background: var(--ui-popover-divider);
    }

    &:last-child::after {
      display: none;
    }

    &--disabled {
      cursor: not-allowed;
      opacity: var(--ui-opacity-disabled);

      &:active {
        background: transparent;
      }
    }

    &__icon {
      font-size: var(--ui-icon-size-sm);
      margin-right: var(--ui-spacing-sm);
      // line-height:1 让 icon 盒高 = 字号；与 text 同 line-height 后 align-items:center 才能视觉居中
      line-height: 1;
    }

    &__text {
      font-size: var(--ui-font-size-md);
      // uni 的 <text> 在 H5 默认 white-space: pre-line，会逐字换行；强制 nowrap
      line-height: 1;
      white-space: nowrap;
    }
  }
}
</style>
