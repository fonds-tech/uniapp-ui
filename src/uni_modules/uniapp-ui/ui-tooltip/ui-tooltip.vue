<template>
  <view class="ui-tooltip-wrapper">
    <!-- 触发元素容器 -->
    <view
      class="ui-tooltip__reference"
      @click="onClickReference"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot />
    </view>
    <!-- 提示内容 -->
    <view
      v-if="inited"
      class="ui-tooltip"
      :class="[tooltipClass, props.customClass]"
      :style="[tooltipStyle]"
      @transitionend="transition.end"
      @touchmove.stop="() => {}"
      @mouseenter="onTooltipMouseEnter"
      @mouseleave="onTooltipMouseLeave"
    >
      <!-- 箭头 -->
      <view v-if="props.showArrow" class="ui-tooltip__arrow" :class="[arrowClass]" :style="arrowStyle" />
      <!-- 内容区域 -->
      <view class="ui-tooltip__content">
        <slot name="content">
          <text class="ui-tooltip__text">{{ props.content }}</text>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { TooltipPlacement } from "./index"
import { isNumber } from "../utils/check"
import { tooltipEmits, tooltipProps } from "./index"
import { ref, watch, computed, onMounted, onUnmounted, getCurrentInstance } from "vue"
import { useRect, useUnit, useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-tooltip" })

const props = defineProps(tooltipProps)
const emits = defineEmits(tooltipEmits)

// 组件实例
const instance = getCurrentInstance()

// 过渡动画 hook
const transition = useTransition()

// 层级管理
const currentZIndex = ref<number>()

// 控制提示框可见性
const visible = ref(false)

// 触发元素位置信息
const referenceRect = ref<UniApp.NodeInfo>({})

// 计算后的提示框位置
const tooltipPosition = ref<{ top?: string; left?: string; right?: string; bottom?: string }>({})

// 是否已初始化
const inited = computed(() => transition.inited.value)

// hover 延时定时器
let hoverTimer: ReturnType<typeof setTimeout> | null = null

// 是否支持 hover（仅 H5 平台支持）
let supportsHover = false
// #ifdef H5
supportsHover = true
// #endif

// 提示框样式
const tooltipStyle = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = currentZIndex.value

  // 背景色
  if (props.bgColor) {
    style.backgroundColor = useColor(props.bgColor)
  }

  // 文字颜色
  if (props.textColor) {
    style.color = useColor(props.textColor)
  }

  // 最大宽度
  if (props.maxWidth) {
    style.maxWidth = useUnit(props.maxWidth)
  }

  // 合并位置样式
  Object.assign(style, tooltipPosition.value)
  return useStyle({ ...style, ...useStyle(props.customStyle), ...transition.styles.value })
})

// 提示框类名
const tooltipClass = computed(() => {
  const list: string[] = [`ui-tooltip--${props.placement}`, transition.classs.value]
  return list
})

// 箭头类名
const arrowClass = computed(() => {
  const placement = props.placement as TooltipPlacement
  // 根据位置确定箭头方向
  if (placement === "top") return "ui-tooltip__arrow--bottom"
  if (placement === "bottom") return "ui-tooltip__arrow--top"
  if (placement === "left") return "ui-tooltip__arrow--right"
  if (placement === "right") return "ui-tooltip__arrow--left"
  return ""
})

// 箭头样式（自定义背景色时同步）
const arrowStyle = computed<CSSProperties>(() => {
  if (props.bgColor) {
    return { backgroundColor: useColor(props.bgColor) }
  }
  return {}
})

// 过渡事件绑定
transition.on("before-enter", () => emits("open"))
transition.on("after-leave", () => emits("close"))

// 监听 visible 变化
watch(
  () => props.visible,
  (val) => {
    if (val) open()
    else close()
  },
  { immediate: true },
)

// 监听 duration 变化
watch(() => props.duration, initTransition, { immediate: true })

// 组件挂载
onMounted(() => {
  // 初始获取位置
  updateReferenceRect()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  clearHoverTimer()
})

// 清除 hover 定时器
function clearHoverTimer() {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
}

// 初始化过渡动画
function initTransition() {
  transition.init({ name: "fade", duration: props.duration })
}

// 更新触发元素位置
async function updateReferenceRect() {
  if (!instance) return
  referenceRect.value = await useRect(".ui-tooltip__reference", instance)
  calculatePosition()
}

// 计算提示框位置
function calculatePosition() {
  const rect = referenceRect.value
  if (!rect || rect.width === undefined) return

  const offsetValue = isNumber(props.offset) ? Number(props.offset) : 8
  const placement = props.placement as TooltipPlacement
  const position: { top?: string; left?: string; right?: string; bottom?: string } = {}

  // 基于触发元素的位置计算提示框位置
  const top = rect.top || 0
  const left = rect.left || 0
  const width = rect.width || 0
  const height = rect.height || 0

  switch (placement) {
    case "top":
      position.top = `${top - offsetValue}px`
      position.left = `${left + width / 2}px`
      break
    case "bottom":
      position.top = `${top + height + offsetValue}px`
      position.left = `${left + width / 2}px`
      break
    case "left":
      position.top = `${top + height / 2}px`
      position.left = `${left - offsetValue}px`
      break
    case "right":
      position.top = `${top + height / 2}px`
      position.left = `${left + width + offsetValue}px`
      break
  }

  tooltipPosition.value = position
}

// 打开提示框
async function open() {
  if (props.disabled) return
  if (transition.visible.value) return
  initTransition()
  await updateReferenceRect()
  currentZIndex.value = isNumber(props.zIndex) ? +props.zIndex! : useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:visible", true)
}

// 关闭提示框
function close() {
  if (transition.visible.value) {
    visible.value = false
    transition.leave()
    emits("update:visible", false)
  }
}

// 切换显示状态
function toggle() {
  if (visible.value) {
    close()
  } else {
    open()
  }
}

// 点击触发元素
function onClickReference() {
  if (props.disabled) return
  if (props.trigger === "click") {
    toggle()
  }
}

// 鼠标进入触发元素
function onMouseEnter() {
  if (!supportsHover) return
  if (props.disabled) return
  if (props.trigger !== "hover") return
  // 清除关闭定时器
  clearHoverTimer()
  open()
}

// 鼠标离开触发元素
function onMouseLeave() {
  if (!supportsHover) return
  if (props.disabled) return
  if (props.trigger !== "hover") return
  // 延迟关闭，避免快速移动时闪烁
  hoverTimer = setTimeout(() => {
    close()
    hoverTimer = null
  }, 100)
}

// 鼠标进入提示框（保持显示）
function onTooltipMouseEnter() {
  if (!supportsHover) return
  if (props.trigger !== "hover") return
  clearHoverTimer()
}

// 鼠标离开提示框
function onTooltipMouseLeave() {
  if (!supportsHover) return
  if (props.disabled) return
  if (props.trigger !== "hover") return
  hoverTimer = setTimeout(() => {
    close()
    hoverTimer = null
  }, 100)
}

defineExpose({ open, close, toggle })
</script>

<script lang="ts">
export default {
  name: "ui-tooltip",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-tooltip-wrapper {
  display: inline-block;
  position: relative;
}

.ui-tooltip__reference {
  display: inline-block;
}

.ui-tooltip {
  color: var(--ui-color-white);
  padding: var(--ui-spacing-sm) var(--ui-spacing-md);
  position: fixed;
  font-size: var(--ui-font-size-sm);
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  line-height: 1.4;
  border-radius: var(--ui-radius-sm);
  background-color: #4a4a4a;
  transform-origin: center;
  transition-duration: var(--ui-transition-duration);

  // 位置相关样式 - transform 用于居中调整
  &--top {
    transform: translateX(-50%) translateY(-100%);
    transform-origin: bottom center;
  }

  &--bottom {
    transform: translateX(-50%);
    transform-origin: top center;
  }

  &--left {
    transform: translateX(-100%) translateY(-50%);
    transform-origin: right center;
  }

  &--right {
    transform: translateY(-50%);
    transform-origin: left center;
  }
}

.ui-tooltip__arrow {
  width: 16rpx;
  height: 16rpx;
  position: absolute;
  transform: rotate(45deg);
  background-color: #4a4a4a;

  &--top {
    top: -8rpx;
    left: 50%;
    margin-left: -8rpx;
  }

  &--bottom {
    left: 50%;
    bottom: -8rpx;
    margin-left: -8rpx;
  }

  &--left {
    top: 50%;
    left: -8rpx;
    margin-top: -8rpx;
  }

  &--right {
    top: 50%;
    right: -8rpx;
    margin-top: -8rpx;
  }
}

.ui-tooltip__content {
  overflow: hidden;
}

.ui-tooltip__text {
  color: inherit;
  font-size: inherit;
  line-height: inherit;
}
</style>
