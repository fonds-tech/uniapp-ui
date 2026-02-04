<template>
  <view class="ui-tooltip" :class="[props.customClass]" :style="[rootStyle]" @click.stop="noop">
    <!-- 用于测量尺寸的隐藏元素 -->
    <view id="measure" class="ui-tooltip__measure">
      <view class="ui-tooltip__popup">
        <view v-if="!$slots.content" class="ui-tooltip__inner">{{ props.content }}</view>
        <slot v-else name="content" />
      </view>
    </view>

    <!-- 提示框 -->
    <ui-transition :show="showTooltip" name="fade" :duration="props.duration" custom-class="ui-tooltip__pos" :custom-style="popupStyle">
      <view class="ui-tooltip__popup">
        <!-- 箭头 -->
        <view v-if="props.showArrow" class="ui-tooltip__arrow" :class="[arrowClass]" :style="[arrowStyle]" />
        <!-- 内容 -->
        <view class="ui-tooltip__inner">
          <slot name="content">
            <text class="ui-tooltip__text">{{ props.content }}</text>
          </slot>
        </view>
        <!-- 关闭按钮 -->
        <ui-icon v-if="props.showClose" name="cross" class="ui-tooltip__close" size="24rpx" @click="close" />
      </view>
    </ui-transition>

    <!-- 触发元素 -->
    <view id="target" class="ui-tooltip__target" @click="onClickTarget">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { TooltipPlacement } from "./index"
import { tooltipEmits, tooltipProps } from "./index"
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue"
import { useRect, useUnit, useColor, useStyle, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-tooltip" })

const props = defineProps(tooltipProps)
const emits = defineEmits(tooltipEmits)

// 组件实例
const instance = getCurrentInstance()

// 控制显示
const showTooltip = ref(false)

// 触发元素尺寸
const targetWidth = ref(0)
const targetHeight = ref(0)

// 弹出框尺寸
const popupWidth = ref(0)
const popupHeight = ref(0)

// 弹出框位置样式
const popupPositionStyle = ref<CSSProperties>({})

// 层级
const zIndex = ref<number>()

// 箭头大小
const ARROW_SIZE = 5

// 根节点样式
const rootStyle = computed(() => {
  return useStyle(props.customStyle)
})

// 弹出框样式
const popupStyle = computed(() => {
  const style: CSSProperties = {
    zIndex: zIndex.value,
  }
  if (props.bgColor) {
    style.backgroundColor = useColor(props.bgColor)
  }
  if (props.textColor) {
    style.color = useColor(props.textColor)
  }
  if (props.maxWidth) {
    style.maxWidth = useUnit(props.maxWidth)
  }
  Object.assign(style, popupPositionStyle.value)
  return useStyle(style)
})

// 箭头类名
const arrowClass = computed(() => {
  const placement = props.placement as TooltipPlacement
  const map: Record<string, string> = {
    top: "ui-tooltip__arrow--down",
    "top-start": "ui-tooltip__arrow--down",
    "top-end": "ui-tooltip__arrow--down",
    bottom: "ui-tooltip__arrow--up",
    "bottom-start": "ui-tooltip__arrow--up",
    "bottom-end": "ui-tooltip__arrow--up",
    left: "ui-tooltip__arrow--right",
    "left-start": "ui-tooltip__arrow--right",
    "left-end": "ui-tooltip__arrow--right",
    right: "ui-tooltip__arrow--left",
    "right-start": "ui-tooltip__arrow--left",
    "right-end": "ui-tooltip__arrow--left",
  }
  return map[placement] || "ui-tooltip__arrow--down"
})

// 箭头样式
const arrowStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.bgColor) {
    style.borderTopColor = useColor(props.bgColor)
  }
  return style
})

// 空操作
function noop() {}

// 初始化尺寸
async function initRect() {
  if (!instance) return

  const [targetRect, popupRect] = await Promise.all([useRect("#target", instance), useRect("#measure", instance)])

  if (targetRect) {
    targetWidth.value = targetRect.width || 0
    targetHeight.value = targetRect.height || 0
  }
  if (popupRect) {
    popupWidth.value = popupRect.width || 0
    popupHeight.value = popupRect.height || 0
  }
}

// 计算位置
function calculatePosition() {
  const placement = props.placement as TooltipPlacement
  const offset = typeof props.offset === "number" ? props.offset : 0
  const arrowOffset = props.showArrow ? ARROW_SIZE + 4 : 4

  const tw = targetWidth.value
  const th = targetHeight.value
  const pw = popupWidth.value
  const ph = popupHeight.value

  const style: CSSProperties = {}

  // 基于 placement 计算位置
  switch (placement) {
    // 上方
    case "top":
      style.bottom = `${th + arrowOffset + offset}px`
      style.left = `${(tw - pw) / 2}px`
      break
    case "top-start":
      style.bottom = `${th + arrowOffset + offset}px`
      style.left = "0"
      break
    case "top-end":
      style.bottom = `${th + arrowOffset + offset}px`
      style.right = "0"
      break

    // 下方
    case "bottom":
      style.top = `${th + arrowOffset + offset}px`
      style.left = `${(tw - pw) / 2}px`
      break
    case "bottom-start":
      style.top = `${th + arrowOffset + offset}px`
      style.left = "0"
      break
    case "bottom-end":
      style.top = `${th + arrowOffset + offset}px`
      style.right = "0"
      break

    // 左侧
    case "left":
      style.right = `${tw + arrowOffset + offset}px`
      style.top = `${(th - ph) / 2}px`
      break
    case "left-start":
      style.right = `${tw + arrowOffset + offset}px`
      style.top = "0"
      break
    case "left-end":
      style.right = `${tw + arrowOffset + offset}px`
      style.bottom = "0"
      break

    // 右侧
    case "right":
      style.left = `${tw + arrowOffset + offset}px`
      style.top = `${(th - ph) / 2}px`
      break
    case "right-start":
      style.left = `${tw + arrowOffset + offset}px`
      style.top = "0"
      break
    case "right-end":
      style.left = `${tw + arrowOffset + offset}px`
      style.bottom = "0"
      break

    default:
      style.bottom = `${th + arrowOffset + offset}px`
      style.left = `${(tw - pw) / 2}px`
  }

  popupPositionStyle.value = style
}

// 打开
async function open() {
  if (props.disabled) return
  if (showTooltip.value) return

  await initRect()
  calculatePosition()
  zIndex.value = useGlobalZIndex()
  showTooltip.value = true
  emits("update:visible", true)
  emits("open")
}

// 关闭
function close() {
  if (!showTooltip.value) return
  showTooltip.value = false
  emits("update:visible", false)
  emits("close")
}

// 切换
function toggle() {
  if (showTooltip.value) {
    close()
  } else {
    open()
  }
}

// 点击触发元素
function onClickTarget() {
  if (props.disabled) return
  if (props.trigger === "click") {
    toggle()
  }
}

// 监听 visible
watch(
  () => props.visible,
  (val) => {
    if (val) open()
    else close()
  },
  { immediate: true },
)

// 监听 placement 变化
watch(
  () => props.placement,
  () => {
    if (showTooltip.value) {
      calculatePosition()
    }
  },
)

onMounted(() => {
  initRect()
})

defineExpose({ open, close, toggle })
</script>

<script lang="ts">
export default {
  name: "ui-tooltip",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-tooltip {
  display: inline-block;
  position: relative;

  // 隐藏的测量元素
  &__measure {
    top: 0;
    left: -9999px;
    opacity: 0;
    z-index: -1;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
  }

  // 弹出框定位容器
  :deep(.ui-tooltip__pos) {
    position: absolute;
    min-width: 10px;
  }

  // 弹出框
  &__popup {
    color: var(--ui-color-text-inverse);
    padding: 8px 12px;
    position: relative;
    font-size: var(--ui-font-size-sm);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    line-height: 1.5;
    white-space: nowrap;
    border-radius: 4px;
    backdrop-filter: blur(10px);
    background-color: rgba(38, 39, 40, 0.85);
  }

  // 箭头基础样式
  &__arrow {
    width: 0;
    height: 0;
    position: absolute;
    border-color: transparent;
    border-style: solid;
    border-width: 5px;

    // 箭头朝上（弹出框在下方）
    &--up {
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-top-width: 0;
      border-bottom-color: rgba(38, 39, 40, 0.85);
    }

    // 箭头朝下（弹出框在上方）
    &--down {
      left: 50%;
      bottom: -5px;
      transform: translateX(-50%);
      border-top-color: rgba(38, 39, 40, 0.85);
      border-bottom-width: 0;
    }

    // 箭头朝左（弹出框在右侧）
    &--left {
      top: 50%;
      left: -5px;
      transform: translateY(-50%);
      border-left-width: 0;
      border-right-color: rgba(38, 39, 40, 0.85);
    }

    // 箭头朝右（弹出框在左侧）
    &--right {
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
      border-left-color: rgba(38, 39, 40, 0.85);
      border-right-width: 0;
    }
  }

  &__inner {
    overflow: hidden;
  }

  &__text {
    color: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  &__close {
    top: 4px;
    color: rgba(255, 255, 255, 0.6);
    right: 4px;
    cursor: pointer;
    position: absolute;

    &:active {
      opacity: 0.7;
    }
  }

  &__target {
    display: inline-block;
  }
}
</style>
