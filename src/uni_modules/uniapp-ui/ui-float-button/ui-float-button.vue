<template>
  <view class="ui-float-button-wrapper" :class="[wrapperClass]" :style="[wrapperStyle]" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove" @touchend="onTouchEnd">
    <view
      class="ui-float-button"
      :hover-class="hoverClass"
      :hover-stay-time="100"
      :class="[buttonClass, props.customClass]"
      :style="[buttonStyle]"
      @click="onClick"
      @mousedown="onMouseDown"
    >
      <slot>
        <view class="ui-float-button__content">
          <ui-icon :name="props.icon" :color="props.foregroundColor" :size="props.iconSize" />
          <view v-if="props.text" class="ui-float-button__text">{{ props.text }}</view>
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { FloatButtonDragDetail } from "./index"
import { floatButtonEmits, floatButtonProps } from "./index"
import { ref, watch, computed, reactive, onMounted, onUnmounted } from "vue"
import { useUnit, useColor, useStyle, useUnitToPx, useSystemInfo } from "../hooks"

defineOptions({ name: "ui-float-button" })

const props = defineProps(floatButtonProps)
const emits = defineEmits(floatButtonEmits)
const systemInfo = useSystemInfo()

const inited = ref(false)
const dragging = ref(false)
const attractTransition = ref(false)

// 当前位置（px）
const pos = reactive({ top: 0, left: 0 })
// 触摸点相对于元素的偏移
const touchOffset = reactive({ x: 0, y: 0 })
// 边界
const bounding = reactive({ minTop: 0, minLeft: 0, maxTop: 0, maxLeft: 0 })

// #ifdef H5
let documentMouseBound = false
// #endif

const hoverClass = computed(() => {
  if (props.disabled || dragging.value) return ""
  return "ui-float-button--hover"
})

const wrapperClass = computed(() => {
  const list: string[] = []
  if (!props.show) list.push("ui-float-button-wrapper--hidden")
  if (dragging.value) list.push("ui-float-button-wrapper--dragging")
  return list
})

const wrapperStyle = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = +props.zIndex

  if (inited.value) {
    // 已初始化：使用 top/left + px 直接定位
    style.top = `${pos.top}px`
    style.left = `${pos.left}px`
    style.transition = attractTransition.value ? "left 0.3s ease, top 0.3s ease" : "none"
  } else {
    // 未初始化：使用 props 定位（兼容非拖拽场景）
    const offsetX = useUnit(props.offsetX)
    const offsetY = useUnit(props.offsetY)

    if (props.position.includes("right")) {
      style.right = offsetX
    } else {
      style.left = offsetX
    }

    if (props.position.includes("bottom")) {
      style.bottom = offsetY
    } else {
      style.top = offsetY
    }
  }

  return useStyle(style)
})

const buttonClass = computed(() => {
  const list: string[] = []
  list.push(`ui-float-button--${props.type}`)
  if (props.disabled) list.push("ui-float-button--disabled")
  if (props.text) list.push("ui-float-button--with-text")
  return list
})

const buttonStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.size)
  style.height = useUnit(props.size)
  if (props.color) {
    style.background = useColor(props.color)
  }
  if (props.foregroundColor) {
    style.color = useColor(props.foregroundColor)
  }
  if (props.draggable) {
    style.touchAction = "none"
    style.userSelect = "none"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

onMounted(() => {
  initPosition()
})

onUnmounted(() => {
  // #ifdef H5
  unbindDocumentMouse()
  // #endif
})

watch(
  () => props.show,
  (val) => {
    emits("update:show", val)
  },
)

// 监听 position 属性变化，重新初始化位置
watch(
  () => props.position,
  () => {
    initPosition()
  },
)

// 监听 offset 和 size 变化，重新计算边界和位置
watch(
  () => [props.offsetX, props.offsetY, props.size],
  () => {
    if (inited.value) {
      initPosition()
    }
  },
)

function onClick() {
  if (props.disabled) return
  emits("click")
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function initPosition() {
  const { windowWidth, windowHeight } = systemInfo
  if (!windowWidth || !windowHeight) return

  const size = useUnitToPx(props.size)
  const offsetX = useUnitToPx(props.offsetX)
  const offsetY = useUnitToPx(props.offsetY)

  // 计算边界
  bounding.minTop = 0
  bounding.minLeft = 0
  bounding.maxTop = windowHeight - size
  bounding.maxLeft = windowWidth - size

  // 根据 position 计算初始 top/left
  if (props.position.includes("right")) {
    pos.left = windowWidth - size - offsetX
  } else {
    pos.left = offsetX
  }

  if (props.position.includes("bottom")) {
    pos.top = windowHeight - size - offsetY
  } else {
    pos.top = offsetY
  }

  inited.value = true
}

function buildDragDetail(): FloatButtonDragDetail {
  return {
    left: pos.left,
    top: pos.top,
    position: props.position,
  }
}

// #ifdef H5
function bindDocumentMouse() {
  if (documentMouseBound) return
  documentMouseBound = true
  document.addEventListener("mousemove", onDocumentMouseMove)
  document.addEventListener("mouseup", onDocumentMouseUp)
}

function unbindDocumentMouse() {
  if (!documentMouseBound) return
  documentMouseBound = false
  document.removeEventListener("mousemove", onDocumentMouseMove)
  document.removeEventListener("mouseup", onDocumentMouseUp)
}

function onDocumentMouseMove(e: MouseEvent) {
  handleMouseMove(e)
}

function onDocumentMouseUp() {
  handleMouseEnd()
}
// #endif

function applyMagneticSnap() {
  const magnetic = props.magnetic
  if (!magnetic) return

  const { windowWidth, windowHeight } = systemInfo
  if (!windowWidth) return

  const size = useUnitToPx(props.size)

  attractTransition.value = true

  const shouldSnapX = magnetic === true || magnetic === "x" || magnetic === "both"
  const shouldSnapY = magnetic === "y" || magnetic === "both"

  if (shouldSnapX) {
    const fabCenterX = pos.left + size / 2
    const screenCenterX = windowWidth / 2
    pos.left = fabCenterX < screenCenterX ? bounding.minLeft : bounding.maxLeft
  }

  if (shouldSnapY && windowHeight) {
    const fabCenterY = pos.top + size / 2
    const screenCenterY = windowHeight / 2
    pos.top = fabCenterY < screenCenterY ? bounding.minTop : bounding.maxTop
  }

  // 动画结束后重置
  setTimeout(() => {
    attractTransition.value = false
  }, 300)
}

function onTouchStart(e: TouchEvent) {
  if (!props.draggable) return

  const touch = e.touches[0]
  // 记录触摸点相对于元素左上角的偏移
  touchOffset.x = touch.clientX - pos.left
  touchOffset.y = touch.clientY - pos.top
  attractTransition.value = false
  dragging.value = true

  emits("dragStart", buildDragDetail())
}

function onTouchMove(e: TouchEvent) {
  if (!props.draggable || !dragging.value) return

  const touch = e.touches[0]
  // 直接计算新位置 = 触摸位置 - 偏移
  let x = touch.clientX - touchOffset.x
  let y = touch.clientY - touchOffset.y

  // 边界限制
  if (props.dragBoundary) {
    x = clamp(x, bounding.minLeft, bounding.maxLeft)
    y = clamp(y, bounding.minTop, bounding.maxTop)
  }

  pos.left = x
  pos.top = y

  emits("dragMove", buildDragDetail())
}

function onTouchEnd() {
  if (!props.draggable || !dragging.value) return

  dragging.value = false
  applyMagneticSnap()
  emits("dragEnd", buildDragDetail())
}

function onMouseDown(e: MouseEvent) {
  // #ifdef H5
  if (!props.draggable) return

  e.preventDefault()
  touchOffset.x = e.clientX - pos.left
  touchOffset.y = e.clientY - pos.top
  attractTransition.value = false
  dragging.value = true
  bindDocumentMouse()
  emits("dragStart", buildDragDetail())
  // #endif
}

function handleMouseMove(e: MouseEvent) {
  if (!props.draggable || !dragging.value) return

  let x = e.clientX - touchOffset.x
  let y = e.clientY - touchOffset.y

  if (props.dragBoundary) {
    x = clamp(x, bounding.minLeft, bounding.maxLeft)
    y = clamp(y, bounding.minTop, bounding.maxTop)
  }

  pos.left = x
  pos.top = y

  emits("dragMove", buildDragDetail())
}

function handleMouseEnd() {
  // #ifdef H5
  if (!props.draggable || !dragging.value) {
    unbindDocumentMouse()
    return
  }
  dragging.value = false
  unbindDocumentMouse()
  applyMagneticSnap()
  emits("dragEnd", buildDragDetail())
  // #endif
}
</script>

<script lang="ts">
export default {
  name: "ui-float-button",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
$ui-float-button-danger-color: var(--ui-color-danger, #ee0a24);
$ui-float-button-default-color: var(--ui-color-text-inverse);
$ui-float-button-primary-color: var(--ui-color-primary, #1989fa);
$ui-float-button-success-color: var(--ui-color-success, #07c160);
$ui-float-button-warning-color: var(--ui-color-warning, #ff976a);

.ui-float-button-wrapper {
  display: flex;
  position: fixed;
  align-items: center;

  &--hidden {
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    pointer-events: none;
  }

  &--dragging {
    transition: none !important;
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

  &--primary {
    color: var(--ui-color-text-inverse);
    background: $ui-float-button-primary-color;
  }

  &--success {
    color: var(--ui-color-text-inverse);
    background: $ui-float-button-success-color;
  }

  &--warning {
    color: var(--ui-color-text-inverse);
    background: $ui-float-button-warning-color;
  }

  &--danger {
    color: var(--ui-color-text-inverse);
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
