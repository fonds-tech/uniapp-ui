<template>
  <view :class="rootClass" :style="rootStyle">
    <view
      class="ui-slider__wrapper"
      :style="wrapperStyle"
      @click="onTrackClick"
      @touchstart.stop="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
      @touchend.stop="onTouchEnd"
      @touchcancel.stop="onTouchEnd"
      @mousedown.stop="onMouseDown"
    >
      <view class="ui-slider__track" :style="trackStyle">
        <view class="ui-slider__track-inactive" :style="inactiveTrackStyle" />

        <view class="ui-slider__track-active" :style="activeTrackStyle" />

        <template v-if="props.marks">
          <view
            v-for="(mark, key) in normalizedMarks"
            :key="key"
            class="ui-slider__tick"
            :class="{ 'ui-slider__tick--active': isMarkActive(mark.value) }"
            :style="getTickStyle(mark.value)"
          />
        </template>

        <view
          v-if="props.range"
          class="ui-slider__handle"
          :class="getHandleClass(0)"
          :style="getHandleStyle(0)"
          @touchstart.stop="onHandleTouchStart($event, 0)"
          @mousedown.stop="onHandleMouseDown($event, 0)"
        >
          <slot name="left-handle" :value="rangeValue[0]" :dragging="draggingIndex === 0">
            <view v-if="shouldShowValue(0)" class="ui-slider__indicator" :style="indicatorStyle">
              {{ formatDisplayValue(rangeValue[0]) }}
            </view>
          </slot>
        </view>

        <view
          class="ui-slider__handle"
          :class="getHandleClass(props.range ? 1 : 0)"
          :style="getHandleStyle(props.range ? 1 : 0)"
          @touchstart.stop="onHandleTouchStart($event, props.range ? 1 : 0)"
          @mousedown.stop="onHandleMouseDown($event, props.range ? 1 : 0)"
        >
          <slot :name="props.range ? 'right-handle' : 'handle'" :value="props.range ? rangeValue[1] : currentValue" :dragging="draggingIndex === (props.range ? 1 : 0)">
            <view v-if="shouldShowValue(props.range ? 1 : 0)" class="ui-slider__indicator" :style="indicatorStyle">
              {{ formatDisplayValue(props.range ? rangeValue[1] : currentValue) }}
            </view>
          </slot>
        </view>
      </view>
    </view>

    <view v-if="props.marks && hasMarkLabels" class="ui-slider__labels" :style="labelsStyle">
      <view
        v-for="(mark, key) in normalizedMarks"
        :key="key"
        class="ui-slider__label"
        :class="{ 'ui-slider__label--active': isMarkActive(mark.value) }"
        :style="getLabelStyle(mark)"
      >
        {{ mark.label }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { SliderMarks, SliderValue } from "./index"
import { isArray } from "../utils/check"
import { sliderEmits, sliderProps } from "./index"
import { useRect, useColor, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-slider" })

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)
// 组件实例
const instance = getCurrentInstance()

// 尺寸预设配置（px 单位）
const SIZE_PRESETS = {
  small: { trackHeight: 4, handleSize: 20 },
  medium: { trackHeight: 6, handleSize: 28 },
  large: { trackHeight: 8, handleSize: 36 },
} as const

const draggingIndex = ref<number>(-1)
const startPosition = ref({ x: 0, y: 0 })
const trackRect = ref<UniApp.NodeInfo>({})
const lastTouchEndTime = ref(0)

const internalValue = ref<SliderValue>(props.modelValue)

// 当前值（单滑块模式）
const currentValue = computed(() => {
  if (props.range) return 0
  const val = internalValue.value
  return isArray(val) ? val[0] : val
})

// 范围值（双滑块模式）
const rangeValue = computed<[number, number]>(() => {
  const val = internalValue.value
  if (isArray(val)) {
    return [val[0], val[1]]
  }
  return [props.min, val as number]
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (draggingIndex.value === -1) {
      internalValue.value = newVal
    }
  },
)

const sizeConfig = computed(() => {
  const preset = SIZE_PRESETS[props.size] || SIZE_PRESETS.medium
  return {
    trackHeight: props.barHeight ? useUnitToPx(props.barHeight) : preset.trackHeight,
    handleSize: props.handleSize ? useUnitToPx(props.handleSize) : preset.handleSize,
  }
})

// 标准化刻度标记
const normalizedMarks = computed(() => {
  if (!props.marks) return []
  const result: Array<{ value: number; label: string; labelStyle?: CSSProperties }> = []
  const marksObj = props.marks as SliderMarks

  for (const key of Object.keys(marksObj)) {
    const numKey = Number(key)
    const mark = marksObj[numKey]
    if (typeof mark === "string") {
      result.push({ value: numKey, label: mark })
    } else {
      result.push({ value: numKey, label: mark.label, labelStyle: mark.style as CSSProperties })
    }
  }

  return result.sort((a, b) => a.value - b.value)
})

// 是否有刻度标签
const hasMarkLabels = computed(() => {
  return normalizedMarks.value.some((mark) => mark.label)
})

// 根样式类
const rootClass = computed(() => {
  const list: string[] = ["ui-slider"]
  list.push(`ui-slider--${props.size}`)
  if (props.vertical) list.push("ui-slider--vertical")
  if (props.disabled) list.push("ui-slider--disabled")
  if (props.readonly) list.push("ui-slider--readonly")
  if (draggingIndex.value !== -1) list.push("ui-slider--dragging")
  if (props.customClass) list.push(props.customClass)
  return list
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 轨道包装器样式（提供足够的触摸区域）
const wrapperStyle = computed(() => {
  const style: CSSProperties = {}
  const minTouchSize = 44 // 最小触摸区域 44px
  const { handleSize } = sizeConfig.value

  if (props.vertical) {
    // 垂直模式：固定宽度，高度 100%
    style.width = `${Math.max(minTouchSize, handleSize)}px`
    style.height = "100%"
  } else {
    // 水平模式：固定高度，宽度 100%
    style.height = `${Math.max(minTouchSize, handleSize)}px`
    style.width = "100%"
  }

  return useStyle(style)
})

const trackStyle = computed(() => {
  const style: CSSProperties = {}
  const { trackHeight } = sizeConfig.value

  if (props.vertical) {
    // 垂直模式：宽度固定，高度由 flex: 1 决定（在 CSS 中设置）
    style.width = `${trackHeight}px`
  } else {
    // 水平模式：高度固定，宽度由 flex: 1 决定
    style.height = `${trackHeight}px`
  }

  return useStyle(style)
})

const inactiveTrackStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.inactiveColor) {
    style.backgroundColor = useColor(props.inactiveColor)
  }
  return useStyle(style)
})

const activeTrackStyle = computed(() => {
  const style: CSSProperties = {}
  const range = props.max - props.min

  if (props.range) {
    const leftRatio = ((rangeValue.value[0] - props.min) / range) * 100
    const rightRatio = ((rangeValue.value[1] - props.min) / range) * 100

    if (props.vertical) {
      style.bottom = `${leftRatio}%`
      style.height = `${rightRatio - leftRatio}%`
    } else {
      style.left = `${leftRatio}%`
      style.width = `${rightRatio - leftRatio}%`
    }
  } else {
    const ratio = ((currentValue.value - props.min) / range) * 100

    if (props.vertical) {
      style.bottom = "0"
      style.height = `${ratio}%`
    } else {
      style.left = "0"
      style.width = `${ratio}%`
    }
  }

  if (props.activeColor) {
    style.backgroundColor = useColor(props.activeColor)
  }

  return useStyle(style)
})

const indicatorStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.activeColor) {
    style.backgroundColor = useColor(props.activeColor)
  }
  return useStyle(style)
})

const labelsStyle = computed(() => {
  const style: CSSProperties = {}
  const { handleSize } = sizeConfig.value
  const halfHandle = handleSize / 2

  // 标签容器需要与轨道内容区域对齐
  // 由于把手会溢出轨道两端，标签也需要相同的边距来对齐
  if (props.vertical) {
    style.paddingTop = `${halfHandle}px`
    style.paddingBottom = `${halfHandle}px`
  } else {
    style.paddingLeft = `${halfHandle}px`
    style.paddingRight = `${halfHandle}px`
  }

  return useStyle(style)
})

// 获取把手样式类
function getHandleClass(index: number): string[] {
  const classes: string[] = []
  if (draggingIndex.value === index) {
    classes.push("ui-slider__handle--dragging")
  }
  return classes
}

function getHandleStyle(index: number): CSSProperties {
  const style: CSSProperties = {}
  const range = props.max - props.min
  const { handleSize } = sizeConfig.value
  let value: number

  if (props.range) {
    value = rangeValue.value[index]
  } else {
    value = currentValue.value
  }

  const ratio = ((value - props.min) / range) * 100

  // 设置把手尺寸
  style.width = `${handleSize}px`
  style.height = `${handleSize}px`

  if (props.vertical) {
    style.bottom = `${ratio}%`
  } else {
    style.left = `${ratio}%`
  }

  if (props.handleColor) {
    style.backgroundColor = useColor(props.handleColor)
  }

  return useStyle(style)
}

// 使用 calc() 让刻度点始终在轨道内部，不超出边界
// 0% 时刻度点左边缘对齐轨道左边缘，100% 时刻度点右边缘对齐轨道右边缘
function getTickStyle(value: number): CSSProperties {
  const style: CSSProperties = {}
  const range = props.max - props.min
  const ratio = ((value - props.min) / range) * 100
  const tickSize = 4 // 刻度点尺寸 4px

  if (props.vertical) {
    // 垂直模式：bottom 从 0 到 calc(100% - 4px)
    style.bottom = `calc(${ratio}% - ${(ratio / 100) * tickSize}px)`
  } else {
    // 水平模式：left 从 0 到 calc(100% - 4px)
    style.left = `calc(${ratio}% - ${(ratio / 100) * tickSize}px)`
  }

  return useStyle(style)
}

function getLabelStyle(mark: { value: number; labelStyle?: CSSProperties }): CSSProperties {
  const style: CSSProperties = {}
  const range = props.max - props.min
  const ratio = ((mark.value - props.min) / range) * 100

  if (props.vertical) {
    style.bottom = `${ratio}%`
  } else {
    style.left = `${ratio}%`
  }

  if (mark.labelStyle) {
    Object.assign(style, mark.labelStyle)
  }

  return useStyle(style)
}

// 判断刻度是否在激活范围内
function isMarkActive(value: number): boolean {
  if (props.range) {
    return value >= rangeValue.value[0] && value <= rangeValue.value[1]
  }
  return value <= currentValue.value
}

// 是否应该显示值提示
function shouldShowValue(index: number): boolean {
  if (props.showValueMode === "never" || !props.showValue) return false
  if (props.showValueMode === "always") return true
  return draggingIndex.value === index
}

// 格式化显示值
function formatDisplayValue(value: number): string {
  if (props.formatValue) {
    return props.formatValue(value)
  }
  return String(value)
}

// 将位置转换为值
function positionToValue(position: number, trackLength: number): number {
  // 防止除以 0 或无效输入
  if (!Number.isFinite(position) || !Number.isFinite(trackLength) || trackLength === 0) {
    return props.min
  }

  const range = props.max - props.min
  // 防止 range 为 0
  if (range === 0) {
    return props.min
  }

  let ratio = position / trackLength
  ratio = Math.max(0, Math.min(1, ratio))

  let value = props.min + ratio * range

  // 根据步长对齐
  if (props.step > 0) {
    const steps = Math.round((value - props.min) / props.step)
    value = props.min + steps * props.step
  }

  // 确保在范围内
  value = Math.max(props.min, Math.min(props.max, value))

  return value
}

// 更新轨道区域信息
async function updateTrackRect() {
  trackRect.value = await useRect(".ui-slider__track", instance)
}

async function onTrackClick(event: any) {
  if (props.disabled || props.readonly) return
  if (Date.now() - lastTouchEndTime.value < 300) return

  await updateTrackRect()

  // 兼容 UniApp 和 H5 的事件对象
  // UniApp tap 事件使用 detail.x/detail.y，H5 click 使用 clientX/clientY
  let clientX: number
  let clientY: number

  if (event.detail && typeof event.detail.x === "number") {
    clientX = event.detail.x
    clientY = event.detail.y
  } else if (event.touches && event.touches.length > 0) {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
  } else if (typeof event.clientX === "number") {
    clientX = event.clientX
    clientY = event.clientY
  } else {
    // 无法获取坐标，忽略此次点击
    return
  }

  const rect = trackRect.value
  // 确保 rect 有有效值
  if (!rect.width && !rect.height) {
    return
  }

  let position: number
  let trackLength: number

  if (props.vertical) {
    position = (rect.bottom || 0) - clientY
    trackLength = rect.height || 1
  } else {
    position = clientX - (rect.left || 0)
    trackLength = rect.width || 1
  }

  // 防止 NaN
  if (!Number.isFinite(position) || !Number.isFinite(trackLength) || trackLength === 0) {
    return
  }

  const newValue = positionToValue(position, trackLength)

  // 防止 NaN 值
  if (!Number.isFinite(newValue)) {
    return
  }

  if (props.range) {
    const leftDist = Math.abs(newValue - rangeValue.value[0])
    const rightDist = Math.abs(newValue - rangeValue.value[1])

    if (leftDist <= rightDist) {
      updateRangeValue(0, newValue)
    } else {
      updateRangeValue(1, newValue)
    }
  } else {
    updateSingleValue(newValue)
  }

  // 触发最终值更新
  emit("update:modelValue", internalValue.value)
}

// 触摸开始
function onTouchStart() {
  if (props.disabled || props.readonly) return
  updateTrackRect()
}

// 把手触摸开始
function onHandleTouchStart(event: TouchEvent, index: number) {
  if (props.disabled || props.readonly) return

  draggingIndex.value = index
  startPosition.value = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  }

  updateTrackRect()
  emit("dragStart", internalValue.value, index)
}

// 触摸移动
function onTouchMove(event: TouchEvent) {
  if (props.disabled || props.readonly) return
  if (draggingIndex.value === -1) return

  const touch = event.touches[0]
  if (!touch) return

  const rect = trackRect.value
  // 确保 rect 有有效值
  if (!rect.width && !rect.height) {
    return
  }

  let position: number
  let trackLength: number

  if (props.vertical) {
    position = (rect.bottom || 0) - touch.clientY
    trackLength = rect.height || 1
  } else {
    position = touch.clientX - (rect.left || 0)
    trackLength = rect.width || 1
  }

  // 防止 NaN
  if (!Number.isFinite(position) || !Number.isFinite(trackLength) || trackLength === 0) {
    return
  }

  const newValue = positionToValue(position, trackLength)

  // 防止 NaN 值
  if (!Number.isFinite(newValue)) {
    return
  }

  if (props.range) {
    updateRangeValue(draggingIndex.value, newValue)
  } else {
    updateSingleValue(newValue)
  }
}

// 触摸结束
function onTouchEnd() {
  if (draggingIndex.value === -1) return

  const index = draggingIndex.value
  draggingIndex.value = -1
  lastTouchEndTime.value = Date.now()

  emit("dragEnd", internalValue.value, index)
  emit("update:modelValue", internalValue.value)
}

// 鼠标按下（PC 端支持）
function onMouseDown(_event: MouseEvent) {
  if (props.disabled || props.readonly) return
  updateTrackRect()
}

// 鼠标移动处理函数
function handleMouseMove(event: MouseEvent) {
  if (props.disabled || props.readonly) return
  if (draggingIndex.value === -1) return

  const rect = trackRect.value
  if (!rect.width && !rect.height) {
    return
  }

  let position: number
  let trackLength: number

  if (props.vertical) {
    position = (rect.bottom || 0) - event.clientY
    trackLength = rect.height || 1
  } else {
    position = event.clientX - (rect.left || 0)
    trackLength = rect.width || 1
  }

  if (!Number.isFinite(position) || !Number.isFinite(trackLength) || trackLength === 0) {
    return
  }

  const newValue = positionToValue(position, trackLength)

  if (!Number.isFinite(newValue)) {
    return
  }

  if (props.range) {
    updateRangeValue(draggingIndex.value, newValue)
  } else {
    updateSingleValue(newValue)
  }
}

// 鼠标释放处理函数
function handleMouseUp() {
  if (draggingIndex.value === -1) return

  const index = draggingIndex.value
  draggingIndex.value = -1
  lastTouchEndTime.value = Date.now()

  emit("dragEnd", internalValue.value, index)
  emit("update:modelValue", internalValue.value)

  // 移除全局鼠标事件监听（仅在浏览器环境）
  if (typeof document !== "undefined") {
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }
}

// 把手鼠标按下
function onHandleMouseDown(event: MouseEvent, index: number) {
  if (props.disabled || props.readonly) return

  event.preventDefault()
  draggingIndex.value = index
  startPosition.value = {
    x: event.clientX,
    y: event.clientY,
  }

  updateTrackRect()
  emit("dragStart", internalValue.value, index)

  // 添加全局鼠标事件监听（仅在浏览器环境）
  if (typeof document !== "undefined") {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }
}

onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }
})

// 更新单值
function updateSingleValue(value: number) {
  if (value === internalValue.value) return
  internalValue.value = value
  emit("change", value)
}

// 更新范围值
function updateRangeValue(index: number, value: number) {
  const newRange = [...rangeValue.value] as [number, number]
  newRange[index] = value

  // 支持滑块穿越交换
  if (newRange[0] > newRange[1]) {
    ;[newRange[0], newRange[1]] = [newRange[1], newRange[0]]
    draggingIndex.value = index === 0 ? 1 : 0
  }

  if (newRange[0] === rangeValue.value[0] && newRange[1] === rangeValue.value[1]) return

  internalValue.value = newRange
  emit("change", newRange)
}

defineExpose({ name: "ui-slider" })
</script>

<script lang="ts">
export default {
  name: "ui-slider",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-slider {
  --slider-tick-color: var(--ui-color-border);
  --slider-label-color: var(--ui-color-text-secondary);
  --slider-active-color: var(--ui-color-primary);
  --slider-handle-color: var(--ui-color-background);
  --slider-handle-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  --slider-inactive-color: var(--ui-color-background-disabled);
  --slider-indicator-color: var(--ui-color-primary);
  --slider-tick-active-color: var(--ui-color-primary);
  --slider-handle-shadow-active: 0 4px 12px rgba(0, 0, 0, 0.24);
  --slider-indicator-text-color: var(--ui-color-background);

  width: 100%;
  position: relative;
  box-sizing: border-box;
  user-select: none;
  touch-action: none;

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &--readonly {
    pointer-events: none;
  }

  // 轨道包装器
  &__wrapper {
    cursor: pointer;
    display: flex;
    overflow: visible;
    position: relative;
    box-sizing: border-box;
    align-items: center; // 允许把手超出但不影响布局
  }

  // 轨道
  &__track {
    flex: 1;
    overflow: visible;
    position: relative;
    border-radius: 9999px;
  }

  // 非激活轨道（相对于 content-box 定位）
  &__track-inactive {
    top: 50%;
    left: 0;
    right: 0;
    height: 100%;
    position: absolute;
    transform: translateY(-50%);
    border-radius: 9999px;
    background-color: var(--slider-inactive-color);
  }

  // 激活轨道（相对于 content-box 定位）
  &__track-active {
    top: 50%;
    height: 100%;
    position: absolute;
    transform: translateY(-50%);
    transition: none;
    border-radius: 9999px;
    background-color: var(--slider-active-color);
  }

  // 把手
  &__handle {
    top: 50%;
    cursor: grab;
    display: flex;
    z-index: 1;
    overflow: visible;
    position: absolute; // 允许涟漪效果超出
    transform: translate(-50%, -50%);
    box-shadow: var(--slider-handle-shadow);
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
    align-items: center;
    border-radius: 50%;
    justify-content: center;
    background-color: var(--slider-handle-color);

    &:active,
    &--dragging {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: var(--slider-handle-shadow-active);
    }

    // 涟漪效果层（使用固定尺寸避免影响布局）
    &::before {
      top: 50%;
      left: 50%;
      width: 44px;
      height: 44px;
      content: "";
      opacity: 0;
      position: absolute;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s ease;
      border-radius: 50%;
      pointer-events: none;
      background-color: var(--slider-active-color);
    }

    &:active::before,
    &--dragging::before {
      opacity: 0.12;
    }
  }

  // 值指示器
  &__indicator {
    left: 50%;
    color: var(--slider-indicator-text-color);
    bottom: calc(100% + 8px);
    opacity: 0;
    padding: 4px 10px;
    position: absolute;
    animation: slider-indicator-show 0.15s ease forwards;
    font-size: 12px;
    min-width: 32px;
    transform: translateX(-50%);
    text-align: center;
    font-weight: 500;
    line-height: 1.4;
    white-space: nowrap;
    border-radius: 6px;
    background-color: var(--slider-indicator-color);

    // 箭头
    &::after {
      top: 100%;
      left: 50%;
      border: 5px solid transparent;
      content: "";
      position: absolute;
      transform: translateX(-50%);
      border-top-color: var(--slider-indicator-color);
    }
  }

  @keyframes slider-indicator-show {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  // 刻度点
  // 使用 calc() 让刻度点始终在轨道内部，不超出边界
  &__tick {
    top: 50%;
    width: 4px;
    height: 4px;
    z-index: 0;
    position: absolute;
    transform: translateY(-50%); // 只做垂直居中
    border-radius: 50%;
    pointer-events: none;
    background-color: var(--slider-tick-color);

    &--active {
      background-color: var(--slider-tick-active-color);
    }
  }

  // 刻度标签容器
  &__labels {
    height: 20px;
    display: flex;
    position: relative;
    box-sizing: border-box;
    margin-top: 8px;
  }

  // 刻度标签
  &__label {
    color: var(--slider-label-color);
    position: absolute;
    font-size: 12px;
    transform: translateX(-50%);
    white-space: nowrap;

    &--active {
      color: var(--slider-active-color);
    }
  }

  // 垂直模式
  &--vertical {
    width: max-content; // 使用 max-content 保持固定宽度
    height: 100%; // 自适应父容器高度
    min-height: 100px; // 最小高度保证可用性
    display: inline-flex;
    flex-shrink: 0;
    flex-direction: row; // 防止被压缩

    .ui-slider__wrapper {
      height: 100%;
      flex-shrink: 0;
      flex-direction: column; // 垂直布局
      box-sizing: border-box;
      justify-content: center; // 居中轨道
    }

    .ui-slider__track {
      flex: 1; // 填充 padding 之间的剩余空间
      width: auto; // 由 trackStyle 控制
      height: auto; // 由 flex 决定
      min-height: 0; // 允许收缩
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
      transform: translateX(-50%); // 只做水平居中
    }

    .ui-slider__indicator {
      left: auto;
      right: calc(100% + 8px);
      bottom: 50%;
      transform: translateY(50%);
      animation-name: slider-indicator-show-vertical;

      &::after {
        top: 50%;
        left: 100%;
        border: 5px solid transparent;
        transform: translateY(-50%);
        border-top-color: transparent;
        border-left-color: var(--slider-indicator-color);
      }
    }

    @keyframes slider-indicator-show-vertical {
      from {
        opacity: 0;
        transform: translateY(50%) translateX(4px);
      }
      to {
        opacity: 1;
        transform: translateY(50%) translateX(0);
      }
    }

    .ui-slider__labels {
      width: 20px;
      height: 100%;
      margin-top: 0;
      margin-left: 8px;
    }

    .ui-slider__label {
      transform: translateY(50%);
    }
  }

  // 拖动中状态（全局）
  &--dragging {
    .ui-slider__track-active {
      transition: none;
    }
  }
}
</style>
