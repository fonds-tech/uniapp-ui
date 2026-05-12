<template>
  <view :class="rootClass" :style="[rootStyle]">
    <view
      class="ui-slider__wrapper"
      @click="onTrackClick"
      @touchstart.stop="onTouchStart"
      @touchmove.stop="onTouchMove"
      @touchend.stop="onTouchEnd"
      @touchcancel.stop="onTouchEnd"
      @mousedown.stop="onWrapperMouseDown"
    >
      <view class="ui-slider__track">
        <view class="ui-slider__track-inactive" />
        <view class="ui-slider__track-active" :style="[activeTrackStyle]" />

        <template v-if="props.marks">
          <view
            v-for="(mark, key) in normalizedMarks"
            :key="key"
            class="ui-slider__tick"
            :class="{ 'ui-slider__tick--active': isMarkActive(mark.value) }"
            :style="[getTickStyle(mark.value)]"
          />
        </template>

        <view
          v-if="props.range"
          class="ui-slider__handle"
          :class="{ 'ui-slider__handle--dragging': draggingIndex === 0 }"
          :style="[getHandleStyle(0)]"
          @touchstart.stop="onHandleTouchStart($event, 0)"
          @mousedown.stop="onHandleMouseDown($event, 0)"
        >
          <slot name="left-handle" :value="rangeValue[0]" :dragging="draggingIndex === 0">
            <view v-if="shouldShowValue(0)" class="ui-slider__indicator">
              {{ formatDisplayValue(rangeValue[0]) }}
            </view>
          </slot>
        </view>

        <view
          class="ui-slider__handle"
          :class="{ 'ui-slider__handle--dragging': draggingIndex === (props.range ? 1 : 0) }"
          :style="[getHandleStyle(props.range ? 1 : 0)]"
          @touchstart.stop="onHandleTouchStart($event, props.range ? 1 : 0)"
          @mousedown.stop="onHandleMouseDown($event, props.range ? 1 : 0)"
        >
          <slot :name="props.range ? 'right-handle' : 'handle'" :value="props.range ? rangeValue[1] : currentValue" :dragging="draggingIndex === (props.range ? 1 : 0)">
            <view v-if="shouldShowValue(props.range ? 1 : 0)" class="ui-slider__indicator">
              {{ formatDisplayValue(props.range ? rangeValue[1] : currentValue) }}
            </view>
          </slot>
        </view>
      </view>
    </view>

    <view v-if="props.marks && hasMarkLabels" class="ui-slider__labels">
      <view
        v-for="(mark, key) in normalizedMarks"
        :key="key"
        class="ui-slider__label"
        :class="{ 'ui-slider__label--active': isMarkActive(mark.value) }"
        :style="[getLabelStyle(mark)]"
      >
        {{ mark.label }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { SliderValue } from "./index"
import type { CSSProperties } from "vue"
import { formItemKey } from "../ui-form-item"
import { isDef, isArray } from "../utils/check"
import { sliderEmits, sliderProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"
import { ref, watch, computed, onMounted, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-slider" })

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const { parent: formItem } = useParent(formItemKey)
const instance = getCurrentInstance()

// 拖动中的 handle 索引，-1 = 未拖动
const draggingIndex = ref(-1)
// 轨道布局信息
const trackRect = ref<UniApp.NodeInfo>({})
// 上次 touchend 时间戳，用于在 300ms 内屏蔽合成的 click
const lastTouchEndTime = ref(0)
// 内部值（拖动期间脱离 v-model，结束才回流）
const internalValue = ref<SliderValue>(props.modelValue)

const effectiveDisabled = computed(() => Boolean(props.disabled) || Boolean(formItem?.disabled?.value))
const effectiveReadonly = computed(() => Boolean(props.readonly) || Boolean(formItem?.readonly?.value))

// 单滑块当前值
const currentValue = computed(() => {
  if (props.range) return 0
  const val = internalValue.value
  return isArray(val) ? val[0] : val
})

// 双滑块范围值
const rangeValue = computed<[number, number]>(() => {
  const val = internalValue.value
  if (isArray(val)) return [val[0], val[1]]
  return [props.min, val as number]
})

const normalizedMarks = computed(() => {
  if (!props.marks) return []
  const list: Array<{ value: number; label: string; labelStyle?: CSSProperties }> = []
  for (const key of Object.keys(props.marks)) {
    const numKey = Number(key)
    const mark = props.marks[numKey]
    if (typeof mark === "string") list.push({ value: numKey, label: mark })
    else list.push({ value: numKey, label: mark.label, labelStyle: mark.style as CSSProperties })
  }
  return list.sort((a, b) => a.value - b.value)
})

const hasMarkLabels = computed(() => normalizedMarks.value.some((m) => m.label))

const rootClass = computed(() => {
  const list: string[] = ["ui-slider", `ui-slider--${props.size}`]
  if (props.vertical) list.push("ui-slider--vertical")
  if (effectiveDisabled.value) list.push("ui-slider--disabled")
  if (effectiveReadonly.value) list.push("ui-slider--readonly")
  if (draggingIndex.value !== -1) list.push("ui-slider--dragging")
  if (props.customClass) list.push(props.customClass)
  return list
})

// 根节点 CSS var 注入
const rootStyle = computed(() => {
  const vars: Record<string, string | undefined> = {}
  if (isDef(props.barHeight)) vars["--ui-slider-track-height"] = useUnit(props.barHeight)
  if (isDef(props.handleSize)) vars["--ui-slider-handle-size"] = useUnit(props.handleSize)
  if (props.activeColor) vars["--ui-slider-color-active"] = useColor(props.activeColor)
  if (props.inactiveColor) vars["--ui-slider-color-inactive"] = useColor(props.inactiveColor)
  if (props.handleColor) vars["--ui-slider-color-handle"] = useColor(props.handleColor)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})

// 激活轨道位置/宽度
const activeTrackStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.range) {
    const l = getRatio(rangeValue.value[0])
    const r = getRatio(rangeValue.value[1])
    if (props.vertical) {
      style.bottom = `${l}%`
      style.height = `${r - l}%`
    } else {
      style.left = `${l}%`
      style.width = `${r - l}%`
    }
  } else {
    const ratio = getRatio(currentValue.value)
    if (props.vertical) {
      style.bottom = "0"
      style.height = `${ratio}%`
    } else {
      style.left = "0"
      style.width = `${ratio}%`
    }
  }
  return useStyle(style)
})

watch(
  () => props.modelValue,
  (val) => {
    if (draggingIndex.value === -1) internalValue.value = val
  },
)

function getRatio(value: number): number {
  const range = props.max - props.min
  if (!Number.isFinite(range) || range === 0) return 0
  return ((value - props.min) / range) * 100
}

function getHandleStyle(index: number): CSSProperties {
  const value = props.range ? rangeValue.value[index] : currentValue.value
  const ratio = getRatio(value)
  const style: CSSProperties = {}
  if (props.vertical) style.bottom = `${ratio}%`
  else style.left = `${ratio}%`
  return useStyle(style)
}

// 刻度点中心对齐 ratio 位置（transform 由 SCSS 完成 translate -50%）
function getTickStyle(value: number): CSSProperties {
  const ratio = getRatio(value)
  const style: CSSProperties = {}
  if (props.vertical) style.bottom = `${ratio}%`
  else style.left = `${ratio}%`
  return useStyle(style)
}

function getLabelStyle(mark: { value: number; labelStyle?: CSSProperties }): CSSProperties {
  const ratio = getRatio(mark.value)
  const style: CSSProperties = {}
  if (props.vertical) style.bottom = `${ratio}%`
  else style.left = `${ratio}%`
  if (mark.labelStyle) Object.assign(style, mark.labelStyle)
  return useStyle(style)
}

function isMarkActive(value: number): boolean {
  if (props.range) return value >= rangeValue.value[0] && value <= rangeValue.value[1]
  return value <= currentValue.value
}

function shouldShowValue(index: number): boolean {
  if (!props.showValue || props.showValueMode === "never") return false
  if (props.showValueMode === "always") return true
  return draggingIndex.value === index
}

function formatDisplayValue(value: number): string {
  return props.formatValue ? props.formatValue(value) : String(value)
}

// 位置 → 值（带 step 对齐 + clamp）
function positionToValue(position: number, trackLength: number): number {
  if (!Number.isFinite(position) || !Number.isFinite(trackLength) || trackLength === 0) return props.min
  const range = props.max - props.min
  if (range === 0) return props.min
  let ratio = position / trackLength
  ratio = Math.max(0, Math.min(1, ratio))
  let value = props.min + ratio * range
  const step = props.step > 0 ? props.step : 1
  const steps = Math.round((value - props.min) / step)
  value = props.min + steps * step
  return Math.max(props.min, Math.min(props.max, value))
}

async function updateTrackRect() {
  trackRect.value = await useRect(".ui-slider__track", instance)
}

// 从事件取坐标（兼容 H5 / MP / mouse）
function extractCoord(event: any): { x: number; y: number } | null {
  if (event?.detail && typeof event.detail.x === "number") return { x: event.detail.x, y: event.detail.y }
  if (event?.touches && event.touches.length > 0) return { x: event.touches[0].clientX, y: event.touches[0].clientY }
  if (event?.changedTouches && event.changedTouches.length > 0) return { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
  if (typeof event?.clientX === "number") return { x: event.clientX, y: event.clientY }
  return null
}

// 屏幕坐标 → 轨道相对位置（垂直从底部算）
function coordToTrackPos(x: number, y: number): { position: number; trackLength: number } | null {
  const rect = trackRect.value
  if (!rect.width && !rect.height) return null
  if (props.vertical) {
    return { position: (rect.bottom || 0) - y, trackLength: rect.height || 1 }
  }
  return { position: x - (rect.left || 0), trackLength: rect.width || 1 }
}

function applyValueAt(coord: { x: number; y: number }) {
  const t = coordToTrackPos(coord.x, coord.y)
  if (!t) return
  const newValue = positionToValue(t.position, t.trackLength)
  if (!Number.isFinite(newValue)) return
  if (props.range) {
    updateRangeValue(draggingIndex.value, newValue)
  } else {
    updateSingleValue(newValue)
  }
}

// 点击轨道（非拖动场景）
async function onTrackClick(event: any) {
  if (effectiveDisabled.value || effectiveReadonly.value) return
  // 屏蔽 touchend 后 300ms 内合成的 click，避免双触发
  if (Date.now() - lastTouchEndTime.value < 300) return
  await updateTrackRect()
  const coord = extractCoord(event)
  if (!coord) return
  const t = coordToTrackPos(coord.x, coord.y)
  if (!t) return
  const newValue = positionToValue(t.position, t.trackLength)
  if (!Number.isFinite(newValue)) return
  if (props.range) {
    // 点击位置就近映射到左右 handle
    const leftDist = Math.abs(newValue - rangeValue.value[0])
    const rightDist = Math.abs(newValue - rangeValue.value[1])
    updateRangeValue(leftDist <= rightDist ? 0 : 1, newValue)
  } else {
    updateSingleValue(newValue)
  }
  emit("update:modelValue", internalValue.value)
}

function onTouchStart() {
  if (effectiveDisabled.value || effectiveReadonly.value) return
  updateTrackRect()
}

function onHandleTouchStart(event: TouchEvent, index: number) {
  if (effectiveDisabled.value || effectiveReadonly.value) return
  draggingIndex.value = index
  updateTrackRect()
  emit("dragStart", internalValue.value, index)
}

function onTouchMove(event: TouchEvent) {
  if (effectiveDisabled.value || effectiveReadonly.value) return
  if (draggingIndex.value === -1) return
  const coord = extractCoord(event)
  if (!coord) return
  // 拖动中阻止页面滚动；未拖动状态保持默认滚动行为
  event.preventDefault?.()
  applyValueAt(coord)
}

function onTouchEnd() {
  if (draggingIndex.value === -1) return
  const index = draggingIndex.value
  draggingIndex.value = -1
  lastTouchEndTime.value = Date.now()
  emit("dragEnd", internalValue.value, index)
  emit("update:modelValue", internalValue.value)
}

// PC 端：从空白 track 按下也支持拖动
function onWrapperMouseDown(event: MouseEvent) {
  if (effectiveDisabled.value || effectiveReadonly.value) return
  // 落在 handle 上交由 onHandleMouseDown 处理
  const target = event.target as HTMLElement | undefined
  if (target?.closest?.(".ui-slider__handle")) return
  event.preventDefault()
  updateTrackRect()
  // 默认按下落点就近 handle
  draggingIndex.value = pickNearestHandle(event)
  applyValueAt({ x: event.clientX, y: event.clientY })
  emit("dragStart", internalValue.value, draggingIndex.value)
  attachMouseGlobals()
}

function onHandleMouseDown(event: MouseEvent, index: number) {
  if (effectiveDisabled.value || effectiveReadonly.value) return
  event.preventDefault()
  draggingIndex.value = index
  updateTrackRect()
  emit("dragStart", internalValue.value, index)
  attachMouseGlobals()
}

function pickNearestHandle(event: MouseEvent): number {
  if (!props.range) return 0
  const t = coordToTrackPos(event.clientX, event.clientY)
  if (!t) return 0
  const guess = positionToValue(t.position, t.trackLength)
  return Math.abs(guess - rangeValue.value[0]) <= Math.abs(guess - rangeValue.value[1]) ? 0 : 1
}

function handleMouseMove(event: MouseEvent) {
  if (effectiveDisabled.value || effectiveReadonly.value) return
  if (draggingIndex.value === -1) return
  applyValueAt({ x: event.clientX, y: event.clientY })
}

function handleMouseUp() {
  if (draggingIndex.value === -1) return
  const index = draggingIndex.value
  draggingIndex.value = -1
  lastTouchEndTime.value = Date.now()
  emit("dragEnd", internalValue.value, index)
  emit("update:modelValue", internalValue.value)
  detachMouseGlobals()
}

function attachMouseGlobals() {
  if (typeof document === "undefined") return
  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("mouseup", handleMouseUp)
}

function detachMouseGlobals() {
  if (typeof document === "undefined") return
  document.removeEventListener("mousemove", handleMouseMove)
  document.removeEventListener("mouseup", handleMouseUp)
}

function updateSingleValue(value: number) {
  if (value === internalValue.value) return
  internalValue.value = value
  emit("change", value)
}

function updateRangeValue(index: number, value: number) {
  if (index < 0) return
  const next = [...rangeValue.value] as [number, number]
  next[index] = value
  // 穿越交换：拖动越过另一个 handle 时切换 draggingIndex
  if (next[0] > next[1]) {
    ;[next[0], next[1]] = [next[1], next[0]]
    draggingIndex.value = index === 0 ? 1 : 0
  }
  if (next[0] === rangeValue.value[0] && next[1] === rangeValue.value[1]) return
  internalValue.value = next
  emit("change", next)
}

onMounted(updateTrackRect)
onUnmounted(detachMouseGlobals)

defineExpose({ reset })

function reset() {
  internalValue.value = props.modelValue
}
</script>

<script lang="ts">
export default {
  name: "ui-slider",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-slider {
  --ui-slider-shadow: var(--ui-shadow-sm);
  --ui-slider-tick-size: 4px;
  --ui-slider-touch-min: 44px;
  --ui-slider-color-tick: var(--ui-color-border);
  --ui-slider-color-label: var(--ui-color-text-secondary);
  --ui-slider-handle-size: 28px;
  --ui-slider-color-active: var(--ui-color-primary);
  --ui-slider-color-handle: var(--ui-color-background);
  --ui-slider-track-height: 6px;
  --ui-slider-shadow-active: var(--ui-shadow-md);
  --ui-slider-color-inactive: var(--ui-color-background-disabled);
  --ui-slider-color-indicator: var(--ui-color-primary);
  --ui-slider-label-font-size: var(--ui-font-size-xs);
  --ui-slider-color-tick-active: var(--ui-color-primary);
  --ui-slider-indicator-font-size: var(--ui-font-size-xs);
  --ui-slider-color-indicator-text: var(--ui-color-background);

  width: 100%;
  position: relative;
  box-sizing: border-box;
  user-select: none;
  touch-action: none;

  &--small {
    --ui-slider-handle-size: 20px;
    --ui-slider-track-height: 4px;
  }

  &--large {
    --ui-slider-handle-size: 36px;
    --ui-slider-track-height: 8px;
  }

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  // readonly 仅禁修改，保留视觉交互
  &--readonly &__wrapper,
  &--readonly &__handle {
    pointer-events: none;
  }

  &__wrapper {
    width: 100%;
    cursor: pointer;
    height: var(--ui-slider-touch-min);
    display: flex;
    overflow: visible;
    position: relative;
    box-sizing: border-box;
    align-items: center;
  }

  &__track {
    flex: 1;
    height: var(--ui-slider-track-height);
    overflow: visible;
    position: relative;
    border-radius: var(--ui-radius-round);
  }

  &__track-inactive {
    top: 50%;
    left: 0;
    right: 0;
    height: 100%;
    position: absolute;
    transform: translateY(-50%);
    background: var(--ui-slider-color-inactive);
    border-radius: var(--ui-radius-round);
  }

  &__track-active {
    top: 50%;
    height: 100%;
    position: absolute;
    transform: translateY(-50%);
    background: var(--ui-slider-color-active);
    border-radius: var(--ui-radius-round);
  }

  &__handle {
    top: 50%;
    width: var(--ui-slider-handle-size);
    cursor: grab;
    height: var(--ui-slider-handle-size);
    display: flex;
    z-index: 1;
    overflow: visible;
    position: absolute;
    transform: translate(-50%, -50%);
    background: var(--ui-slider-color-handle);
    box-shadow: var(--ui-slider-shadow);
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
    align-items: center;
    border-radius: 50%;
    justify-content: center;

    &:active,
    &--dragging {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: var(--ui-slider-shadow-active);
    }

    // 涟漪
    &::before {
      top: 50%;
      left: 50%;
      width: var(--ui-slider-touch-min);
      height: var(--ui-slider-touch-min);
      content: "";
      opacity: 0;
      position: absolute;
      transform: translate(-50%, -50%);
      background: var(--ui-slider-color-active);
      transition: opacity var(--ui-transition-fast) var(--ui-transition-timing);
      border-radius: 50%;
      pointer-events: none;
    }

    &:active::before,
    &--dragging::before {
      opacity: 0.12;
    }
  }

  &__indicator {
    left: 50%;
    color: var(--ui-slider-color-indicator-text);
    bottom: calc(100% + var(--ui-spacing-xs));
    opacity: 0;
    padding: var(--ui-spacing-xxs) var(--ui-spacing-xs);
    position: absolute;
    animation: ui-slider-indicator-show 0.15s ease forwards;
    font-size: var(--ui-slider-indicator-font-size);
    min-width: var(--ui-spacing-lg);
    transform: translateX(-50%);
    background: var(--ui-slider-color-indicator);
    text-align: center;
    font-weight: var(--ui-font-weight-normal);
    line-height: 1.4;
    white-space: nowrap;
    border-radius: var(--ui-radius-sm);

    &::after {
      top: 100%;
      left: 50%;
      border: 5px solid transparent;
      content: "";
      position: absolute;
      transform: translateX(-50%);
      border-top-color: var(--ui-slider-color-indicator);
    }
  }

  &__tick {
    top: 50%;
    width: var(--ui-slider-tick-size);
    height: var(--ui-slider-tick-size);
    z-index: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    background: var(--ui-slider-color-tick);
    border-radius: 50%;
    pointer-events: none;

    &--active {
      background: var(--ui-slider-color-tick-active);
    }
  }

  &__labels {
    height: var(--ui-spacing-md);
    display: flex;
    padding: 0 calc(var(--ui-slider-handle-size) / 2);
    position: relative;
    box-sizing: border-box;
    margin-top: var(--ui-spacing-xs);
  }

  &__label {
    color: var(--ui-slider-color-label);
    position: absolute;
    font-size: var(--ui-slider-label-font-size);
    transform: translateX(-50%);
    white-space: nowrap;

    &--active {
      color: var(--ui-slider-color-active);
    }
  }

  // 垂直模式
  &--vertical {
    width: max-content;
    height: 100%;
    display: inline-flex;
    min-height: 200rpx;
    flex-shrink: 0;
    flex-direction: row;

    .ui-slider__wrapper {
      width: var(--ui-slider-touch-min);
      height: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      flex-direction: column;
      justify-content: center;
    }

    .ui-slider__track {
      flex: 1;
      width: var(--ui-slider-track-height);
      height: auto;
      min-height: 0;
    }

    .ui-slider__track-inactive {
      top: 0;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translateX(-50%);
    }

    .ui-slider__track-active {
      top: auto;
      left: 50%;
      width: 100%;
      transform: translateX(-50%);
    }

    .ui-slider__handle {
      top: auto;
      left: 50%;
      transform: translate(-50%, 50%);

      &:active,
      &--dragging {
        transform: translate(-50%, 50%) scale(1.1);
      }
    }

    .ui-slider__tick {
      top: auto;
      left: 50%;
      transform: translate(-50%, 50%);
    }

    .ui-slider__indicator {
      left: auto;
      right: calc(100% + var(--ui-spacing-xs));
      bottom: 50%;
      transform: translateY(50%);
      animation-name: ui-slider-indicator-show-vertical;

      &::after {
        top: 50%;
        left: 100%;
        border: 5px solid transparent;
        transform: translateY(-50%);
        border-top-color: transparent;
        border-left-color: var(--ui-slider-color-indicator);
      }
    }

    .ui-slider__labels {
      width: var(--ui-spacing-md);
      height: 100%;
      padding: calc(var(--ui-slider-handle-size) / 2) 0;
      margin-top: 0;
      margin-left: var(--ui-spacing-xs);
    }

    .ui-slider__label {
      transform: translateY(50%);
    }
  }
}

@keyframes ui-slider-indicator-show {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes ui-slider-indicator-show-vertical {
  from {
    opacity: 0;
    transform: translateY(50%) translateX(4px);
  }

  to {
    opacity: 1;
    transform: translateY(50%) translateX(0);
  }
}
</style>
