<template>
  <view class="ui-float-button-wrapper" :class="[wrapperClass]" :style="[wrapperStyle]">
    <ui-badge :dot="badgeDot" :value="badgeValue">
      <view
        class="ui-float-button"
        :hover-class="hoverClass"
        :hover-stay-time="100"
        :class="[buttonClass, customClass]"
        :style="[buttonStyle]"
        @click="onClick"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <slot>
          <view class="ui-float-button__content">
            <ui-loading v-if="loading" :size="iconSize" color="currentColor" />
            <ui-icon v-else :name="icon" :color="foregroundColor" :size="iconSize" />
            <view v-if="text" class="ui-float-button__text">{{ text }}</view>
          </view>
        </slot>
      </view>
    </ui-badge>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { FloatButtonDragDetail } from "./index"
import { ref, watch, computed, onUnmounted } from "vue"
import { useUnit, useColor, useStyle, useUnitToPx, useSystemInfo } from "../hooks"
import { floatButtonEmits, floatButtonProps, useFloatButtonProps } from "./index"

defineOptions({ name: "ui-float-button" })

const props = defineProps(floatButtonProps)
const emits = defineEmits(floatButtonEmits)
const useProps = useFloatButtonProps(props)

const dragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const touchStart = ref({ x: 0, y: 0 })
const systemInfo = useSystemInfo()

// #ifdef H5

let documentTouchBound = false
// #endif

// 徽标处理
const badgeDot = computed(() => useProps.badge === true)
const badgeValue = computed(() => (typeof useProps.badge === "number" || typeof useProps.badge === "string" ? useProps.badge : undefined))

const hoverClass = computed(() => {
  if (useProps.disabled || useProps.loading) return ""
  return "ui-float-button--hover"
})

const wrapperClass = computed(() => {
  const list: string[] = []
  list.push(`ui-float-button-wrapper--${useProps.position}`)
  if (!useProps.show) list.push("ui-float-button-wrapper--hidden")
  if (dragging.value) list.push("ui-float-button-wrapper--dragging")
  return list
})

const wrapperStyle = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = +useProps.zIndex

  const dragX = dragOffset.value.x
  const dragY = dragOffset.value.y
  const baseOffsetX = Number.parseFloat(useUnit(resolveOffsetX()) || "0")
  const baseOffsetY = Number.parseFloat(useUnit(resolveOffsetY()) || "0")

  if (useProps.position.includes("right")) {
    style.right = `calc(${baseOffsetX}px - ${dragX}px)`
  } else {
    style.left = `calc(${baseOffsetX}px + ${dragX}px)`
  }

  if (useProps.position.includes("bottom")) {
    style.bottom = `calc(${baseOffsetY}px - ${dragY}px)`
  } else {
    style.top = `calc(${baseOffsetY}px + ${dragY}px)`
  }

  if (useProps.safeAreaBottom && useProps.position.includes("bottom")) {
    style.paddingBottom = "env(safe-area-inset-bottom)"
  }

  return useStyle(style)
})

const buttonClass = computed(() => {
  const list: string[] = []
  list.push(`ui-float-button--${useProps.type}`)
  if (useProps.disabled) list.push("ui-float-button--disabled")
  if (useProps.loading) list.push("ui-float-button--loading")
  if (useProps.text) list.push("ui-float-button--with-text")
  return list
})

const buttonStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(useProps.size)
  style.height = useUnit(useProps.size)
  if (useProps.color) {
    style.background = useColor(useProps.color)
  }
  if (useProps.foregroundColor) {
    style.color = useColor(useProps.foregroundColor)
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

function onClick() {
  if (useProps.disabled || useProps.loading) return
  emits("click")
}

// 工具函数
function resolveOffsetX() {
  return useProps.offsetX === "" ? useProps.right : useProps.offsetX
}

function resolveOffsetY() {
  return useProps.offsetY === "" ? useProps.bottom : useProps.offsetY
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

interface DragRect {
  left: number
  top: number
  size: number
  windowWidth: number
  windowHeight: number
  baseOffsetX: number
  baseOffsetY: number
}

function getDragRect(offX = dragOffset.value.x, offY = dragOffset.value.y): DragRect | null {
  const { windowWidth, windowHeight } = systemInfo
  if (!windowWidth || !windowHeight) return null
  const size = useUnitToPx(useProps.size)
  const baseOffsetX = useUnitToPx(resolveOffsetX())
  const baseOffsetY = useUnitToPx(resolveOffsetY())
  const left = useProps.position.includes("right") ? windowWidth - (baseOffsetX - offX) - size : baseOffsetX + offX
  const top = useProps.position.includes("bottom") ? windowHeight - (baseOffsetY - offY) - size : baseOffsetY + offY
  return { left, top, size, windowWidth, windowHeight, baseOffsetX, baseOffsetY }
}

function getOffsetXByLeft(left: number, rect: DragRect) {
  return useProps.position.includes("right") ? left - (rect.windowWidth - rect.baseOffsetX - rect.size) : left - rect.baseOffsetX
}

function getOffsetYByTop(top: number, rect: DragRect) {
  return useProps.position.includes("bottom") ? top - (rect.windowHeight - rect.baseOffsetY - rect.size) : top - rect.baseOffsetY
}

function buildDragDetail(): FloatButtonDragDetail {
  return {
    offsetX: dragOffset.value.x,
    offsetY: dragOffset.value.y,
    position: useProps.position,
  }
}

// #ifdef H5
function bindDocumentTouch() {
  if (documentTouchBound) return
  documentTouchBound = true
  document.addEventListener("touchmove", onDocumentTouchMove, { passive: false })
  document.addEventListener("touchend", onDocumentTouchEnd)
  document.addEventListener("touchcancel", onDocumentTouchEnd)
}

function unbindDocumentTouch() {
  if (!documentTouchBound) return
  documentTouchBound = false
  document.removeEventListener("touchmove", onDocumentTouchMove)
  document.removeEventListener("touchend", onDocumentTouchEnd)
  document.removeEventListener("touchcancel", onDocumentTouchEnd)
}

function onDocumentTouchMove(e: TouchEvent) {
  handleTouchMove(e)
}

function onDocumentTouchEnd() {
  handleTouchEnd()
}
// #endif

// 磁性吸附
function applyMagneticSnap() {
  const magnetic = useProps.magnetic
  if (!magnetic || !useProps.dragBoundary) return
  const rect = getDragRect()
  if (!rect) return

  const shouldSnapX = magnetic === true || magnetic === "x" || magnetic === "both"
  const shouldSnapY = magnetic === "y" || magnetic === "both"

  let newX = dragOffset.value.x
  let newY = dragOffset.value.y

  if (shouldSnapX) {
    const maxLeft = rect.windowWidth - rect.size
    const targetLeft = rect.left <= maxLeft / 2 ? 0 : maxLeft
    newX = getOffsetXByLeft(targetLeft, rect)
  }

  if (shouldSnapY) {
    const maxTop = rect.windowHeight - rect.size
    const targetTop = rect.top <= maxTop / 2 ? 0 : maxTop
    newY = getOffsetYByTop(targetTop, rect)
  }

  dragOffset.value = { x: newX, y: newY }
}

function onTouchStart(e: TouchEvent) {
  if (!useProps.draggable) return
  const touch = e.touches[0]
  touchStart.value = { x: touch.clientX, y: touch.clientY }
  dragging.value = true
  // #ifdef H5
  bindDocumentTouch()
  // #endif
  emits("dragStart", buildDragDetail())
}

function onTouchMove(e: TouchEvent) {
  // #ifdef H5
  if (documentTouchBound) return
  // #endif
  handleTouchMove(e)
}

function handleTouchMove(e: TouchEvent) {
  if (!useProps.draggable || !dragging.value) return
  const touch = e.touches[0]
  const deltaX = touch.clientX - touchStart.value.x
  const deltaY = touch.clientY - touchStart.value.y

  const nextOffset = {
    x: dragOffset.value.x + deltaX,
    y: dragOffset.value.y + deltaY,
  }

  if (useProps.dragBoundary) {
    const rect = getDragRect(nextOffset.x, nextOffset.y)
    if (rect) {
      const maxLeft = rect.windowWidth - rect.size
      const maxTop = rect.windowHeight - rect.size
      const left = clamp(rect.left, 0, maxLeft)
      const top = clamp(rect.top, 0, maxTop)
      nextOffset.x = getOffsetXByLeft(left, rect)
      nextOffset.y = getOffsetYByTop(top, rect)
    }
  }

  dragOffset.value = nextOffset
  touchStart.value = { x: touch.clientX, y: touch.clientY }
  emits("dragMove", buildDragDetail())
}

function onTouchEnd() {
  // #ifdef H5
  if (documentTouchBound) return
  // #endif
  handleTouchEnd()
}

function handleTouchEnd() {
  if (!useProps.draggable || !dragging.value) {
    // #ifdef H5
    unbindDocumentTouch()
    // #endif
    return
  }
  dragging.value = false
  // #ifdef H5
  unbindDocumentTouch()
  // #endif
  applyMagneticSnap()
  emits("dragEnd", buildDragDetail())
}

onUnmounted(() => {
  // #ifdef H5
  unbindDocumentTouch()
  // #endif
})

watch(
  () => useProps.show,
  (val) => {
    emits("update:show", val)
  },
)
</script>

<script lang="ts">
export default {
  name: "ui-float-button",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
$ui-float-button-danger-color: var(--ui-color-danger, #ee0a24);
$ui-float-button-default-color: #fff;
$ui-float-button-primary-color: var(--ui-color-primary, #1989fa);
$ui-float-button-success-color: var(--ui-color-success, #07c160);
$ui-float-button-warning-color: var(--ui-color-warning, #ff976a);

.ui-float-button-wrapper {
  display: flex;
  position: fixed;
  transform: scale(1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  align-items: center;

  &--hidden {
    opacity: 0;
    transform: scale(0);
    pointer-events: none;
  }

  &--dragging {
    transition: none;
  }

  &--right-bottom {
    right: 0;
    bottom: 0;
  }

  &--left-bottom {
    left: 0;
    bottom: 0;
  }

  &--right-top {
    top: 0;
    right: 0;
  }

  &--left-top {
    top: 0;
    left: 0;
  }
}

.ui-float-button {
  display: flex;
  position: relative;
  box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  align-items: center;
  border-radius: 50%;
  justify-content: center;

  &--hover {
    opacity: 0.8;
    transform: scale(0.95);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--loading {
    opacity: 0.8;
  }

  &--primary {
    color: #fff;
    background: $ui-float-button-primary-color;
  }

  &--success {
    color: #fff;
    background: $ui-float-button-success-color;
  }

  &--warning {
    color: #fff;
    background: $ui-float-button-warning-color;
  }

  &--danger {
    color: #fff;
    background: $ui-float-button-danger-color;
  }

  &--default {
    color: #333;
    background: $ui-float-button-default-color;
  }

  &--with-text {
    width: auto !important;
    height: auto !important;
    padding: 20rpx 32rpx;
    border-radius: 999rpx;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    font-size: 28rpx;
    font-weight: 500;
    margin-left: 8rpx;
  }
}
</style>
