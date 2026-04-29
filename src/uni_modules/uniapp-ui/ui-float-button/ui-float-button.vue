<template>
  <view class="ui-float-button-wrapper" :class="[wrapperClass]" :style="[wrapperStyle]" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove" @touchend="onTouchEnd">
    <view
      class="ui-float-button"
      role="button"
      :aria-label="props.text || props.icon"
      :aria-disabled="props.disabled"
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
const sys = useSystemInfo()

const inited = ref(false)
const dragged = ref(false)
const dragging = ref(false)
const snapping = ref(false)

const pos = reactive({ top: 0, left: 0 })
const bounds = reactive({ minTop: 0, minLeft: 0, maxTop: 0, maxLeft: 0 })
const offset = reactive({ x: 0, y: 0 })

let snapTimer: ReturnType<typeof setTimeout> | null = null
// #ifdef H5
let docBound = false
// #endif

const hoverClass = computed(() => (props.disabled || dragging.value ? "" : "ui-float-button--hover"))

const buttonClass = computed(() => {
  const list = [`ui-float-button--${props.type}`]
  if (props.disabled) list.push("ui-float-button--disabled")
  if (props.text) list.push("ui-float-button--with-text")
  return list
})

const buttonStyle = computed(() => {
  const style: CSSProperties = {}
  // 文字模式让 SCSS &--with-text 接管尺寸
  if (!props.text) {
    style.width = useUnit(props.size)
    style.height = useUnit(props.size)
  }
  if (props.color) style.background = useColor(props.color)
  if (props.foregroundColor) style.color = useColor(props.foregroundColor)
  if (props.draggable) {
    style.touchAction = "none"
    style.userSelect = "none"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const wrapperClass = computed(() => {
  const list: string[] = []
  if (!props.show) list.push("ui-float-button-wrapper--hidden")
  if (dragging.value) list.push("ui-float-button-wrapper--dragging")
  return list
})

const wrapperStyle = computed(() => {
  const style: CSSProperties = { zIndex: +props.zIndex }
  if (inited.value) {
    style.top = `${pos.top}px`
    style.left = `${pos.left}px`
    style.transition = snapping.value ? "left 0.3s ease, top 0.3s ease" : "none"
  } else {
    const x = useUnit(props.offsetX)
    const y = useUnit(props.offsetY)
    if (props.position.includes("right")) style.right = x
    else style.left = x
    if (props.position.includes("bottom")) style.bottom = y
    else style.top = y
  }
  return useStyle(style)
})

watch(
  () => [props.position, props.offsetX, props.offsetY, props.size],
  () => {
    if (inited.value) initPos()
  },
)

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function detail(): FloatButtonDragDetail {
  return { left: pos.left, top: pos.top, position: props.position }
}

function initPos() {
  const { windowWidth: w, windowHeight: h } = sys
  if (!w || !h) return
  const size = useUnitToPx(props.size)
  const ox = useUnitToPx(props.offsetX)
  const oy = useUnitToPx(props.offsetY)

  bounds.minTop = 0
  bounds.minLeft = 0
  bounds.maxTop = h - size
  bounds.maxLeft = w - size

  pos.left = props.position.includes("right") ? w - size - ox : ox
  pos.top = props.position.includes("bottom") ? h - size - oy : oy

  inited.value = true
}

// 拖拽核心：阈值检测 + 边界 clamp + 更新 pos
function move(x: number, y: number) {
  // 首次移动需超 5px 才算拖拽，避免误吃 click
  if (!dragged.value) {
    if (Math.abs(x - pos.left) < 5 && Math.abs(y - pos.top) < 5) return
    dragged.value = true
  }
  if (props.dragBoundary) {
    x = clamp(x, bounds.minLeft, bounds.maxLeft)
    y = clamp(y, bounds.minTop, bounds.maxTop)
  }
  pos.left = x
  pos.top = y
  emits("dragMove", detail())
}

function dragBegin(cx: number, cy: number) {
  offset.x = cx - pos.left
  offset.y = cy - pos.top
  snapping.value = false
  dragging.value = true
  dragged.value = false
  emits("dragStart", detail())
}

function dragFinish() {
  if (!dragging.value) return
  dragging.value = false
  snap()
  emits("dragEnd", detail())
}

function snap() {
  const m = props.magnetic
  if (!m) return
  const { windowWidth: w, windowHeight: h } = sys
  if (!w) return
  const size = useUnitToPx(props.size)

  snapping.value = true
  // magnetic === true 等同 "both"
  const snapX = m === true || m === "both" || m === "x"
  const snapY = m === true || m === "both" || m === "y"

  if (snapX) pos.left = pos.left + size / 2 < w / 2 ? bounds.minLeft : bounds.maxLeft
  if (snapY && h) pos.top = pos.top + size / 2 < h / 2 ? bounds.minTop : bounds.maxTop

  if (snapTimer) clearTimeout(snapTimer)
  snapTimer = setTimeout(() => {
    snapping.value = false
    snapTimer = null
  }, 300)
}

function onClick() {
  if (props.disabled || dragged.value) return
  emits("click")
}

function onTouchStart(e: TouchEvent) {
  if (!props.draggable) return
  const t = e.touches[0]
  dragBegin(t.clientX, t.clientY)
}

function onTouchMove(e: TouchEvent) {
  if (!props.draggable || !dragging.value) return
  const t = e.touches[0]
  move(t.clientX - offset.x, t.clientY - offset.y)
}

function onTouchEnd() {
  if (!props.draggable) return
  dragFinish()
}

function onMouseDown(e: MouseEvent) {
  // #ifdef H5
  if (!props.draggable) return
  e.preventDefault()
  dragBegin(e.clientX, e.clientY)
  bindDoc()
  // #endif
}

// #ifdef H5
function bindDoc() {
  if (docBound) return
  docBound = true
  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
}

function unbindDoc() {
  if (!docBound) return
  docBound = false
  document.removeEventListener("mousemove", onMouseMove)
  document.removeEventListener("mouseup", onMouseUp)
}

function onMouseMove(e: MouseEvent) {
  if (!dragging.value) return
  move(e.clientX - offset.x, e.clientY - offset.y)
}

function onMouseUp() {
  unbindDoc()
  dragFinish()
}
// #endif

onMounted(() => initPos())

onUnmounted(() => {
  // #ifdef H5
  unbindDoc()
  // #endif
  if (snapTimer) {
    clearTimeout(snapTimer)
    snapTimer = null
  }
})
</script>

<script lang="ts">
export default {
  name: "ui-float-button",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-float-button-wrapper {
  display: flex;
  position: fixed;
  align-items: center;

  &--hidden {
    opacity: 0;
    transform: scale(0);
    transition: all var(--ui-transition-duration) cubic-bezier(0.25, 0.8, 0.5, 1);
    pointer-events: none;
  }

  &--dragging {
    transition: none !important;
  }
}

.ui-float-button {
  display: flex;
  position: relative;
  box-shadow: var(--ui-shadow-md);
  box-sizing: border-box;
  transition: var(--ui-transition-duration) cubic-bezier(0.25, 0.8, 0.5, 1);
  align-items: center;
  border-radius: var(--ui-radius-round);
  justify-content: center;

  &--hover {
    opacity: 0.8;
    transform: scale(0.95);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);
  }

  &--primary {
    color: var(--ui-color-text-inverse);
    background: var(--ui-color-primary);
  }

  &--success {
    color: var(--ui-color-text-inverse);
    background: var(--ui-color-success);
  }

  &--warning {
    color: var(--ui-color-text-inverse);
    background: var(--ui-color-warning);
  }

  &--danger {
    color: var(--ui-color-text-inverse);
    background: var(--ui-color-danger);
  }

  &--default {
    color: var(--ui-color-text);
    background: var(--ui-color-text-inverse);
  }

  &--with-text {
    width: auto;
    height: auto;
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-medium);
    margin-left: var(--ui-spacing-xs);
  }
}
</style>
