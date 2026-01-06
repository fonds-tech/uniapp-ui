<template>
  <view class="ui-slider" :class="[rootClass, customClass]" :style="[rootStyle]">
    <!-- 滑块轨道 -->
    <view
      class="ui-slider__track"
      :style="[trackStyle]"
      @click="onTrackClick"
      @touchstart.stop="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
      @touchend.stop="onTouchEnd"
      @touchcancel.stop="onTouchEnd"
    >
      <!-- 背景轨道 -->
      <view class="ui-slider__track-bg" :style="[trackBgStyle]" />

      <!-- 激活轨道 -->
      <view class="ui-slider__track-active" :style="[activeStyle]" />

      <!-- 刻度标记 -->
      <template v-if="marks">
        <view v-for="(mark, key) in normalizedMarks" :key="key" class="ui-slider__mark" :style="[markStyle(mark)]">
          <view class="ui-slider__mark-dot" :class="{ 'ui-slider__mark-dot--active': isMarkActive(mark.value) }" />
          <view v-if="mark.label" class="ui-slider__mark-label" :style="[mark.labelStyle]">
            {{ mark.label }}
          </view>
        </view>
      </template>

      <!-- 左侧滑块按钮（范围模式使用） -->
      <view
        v-if="useProps.range"
        class="ui-slider__button-wrapper"
        :class="{ 'ui-slider__button-wrapper--dragging': draggingIndex === 0 }"
        :style="[buttonWrapperStyle(0)]"
        @touchstart.stop="onButtonTouchStart($event, 0)"
      >
        <slot name="left-button" :value="rangeValue[0]" :dragging="draggingIndex === 0">
          <view class="ui-slider__button" :style="[buttonStyle]">
            <!-- 值提示 -->
            <view v-if="shouldShowValue(0)" class="ui-slider__value">
              {{ formatDisplayValue(rangeValue[0]) }}
            </view>
          </view>
        </slot>
      </view>

      <!-- 右侧/单个滑块按钮 -->
      <view
        class="ui-slider__button-wrapper"
        :class="{ 'ui-slider__button-wrapper--dragging': draggingIndex === (useProps.range ? 1 : 0) }"
        :style="[buttonWrapperStyle(useProps.range ? 1 : 0)]"
        @touchstart.stop="onButtonTouchStart($event, useProps.range ? 1 : 0)"
      >
        <slot :name="useProps.range ? 'right-button' : 'button'" :value="useProps.range ? rangeValue[1] : currentValue" :dragging="draggingIndex === (useProps.range ? 1 : 0)">
          <view class="ui-slider__button" :style="[buttonStyle]">
            <!-- 值提示 -->
            <view v-if="shouldShowValue(useProps.range ? 1 : 0)" class="ui-slider__value">
              {{ formatDisplayValue(useProps.range ? rangeValue[1] : currentValue) }}
            </view>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { SliderMarks, SliderValue } from "./index"
import { isArray } from "../utils/check"
import { sliderEmits, sliderProps, useSliderProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-slider" })

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)
const useProps = useSliderProps(props)

// 组件实例
const instance = getCurrentInstance()

// 状态
const draggingIndex = ref<number>(-1) // 当前拖动的滑块索引，-1 表示未拖动
const startValue = ref<SliderValue>(0) // 开始拖动时的值
const startPosition = ref({ x: 0, y: 0 }) // 开始拖动时的触摸位置
const trackRect = ref<UniApp.NodeInfo>({}) // 轨道区域信息
const lastTouchEndTime = ref(0) // 上次触摸结束时间，用于防止 click 与 touch 事件冲突

// 内部值状态（用于拖动过程中的实时更新）
const internalValue = ref<SliderValue>(useProps.modelValue)

// 当前值（单滑块模式）
const currentValue = computed(() => {
  if (useProps.range) return 0
  const val = internalValue.value
  return isArray(val) ? val[0] : val
})

// 范围值（双滑块模式）
const rangeValue = computed<[number, number]>(() => {
  const val = internalValue.value
  if (isArray(val)) {
    return [val[0], val[1]]
  }
  return [useProps.min, val as number]
})

// 监听外部值变化
watch(
  () => useProps.modelValue,
  (newVal) => {
    if (draggingIndex.value === -1) {
      internalValue.value = newVal
    }
  },
)

// 标准化刻度标记
const normalizedMarks = computed(() => {
  if (!useProps.marks) return []

  const result: Array<{ value: number; label: string; labelStyle?: CSSProperties }> = []
  const marksObj = useProps.marks as SliderMarks

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

// 根样式类
const rootClass = computed(() => {
  const list: string[] = []
  if (useProps.vertical) list.push("ui-slider--vertical")
  if (useProps.disabled) list.push("ui-slider--disabled")
  if (useProps.readonly) list.push("ui-slider--readonly")
  if (draggingIndex.value !== -1) list.push("ui-slider--dragging")
  return list
})

// 根样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 按钮半径（像素）
const halfButtonSize = computed(() => useUnitToPx(useProps.buttonSize) / 2)

// 轨道容器样式
const trackStyle = computed(() => {
  const style: CSSProperties = {}
  const barHeight = useUnit(useProps.barHeight)
  const halfButton = halfButtonSize.value

  if (useProps.vertical) {
    style.width = barHeight
    // 左右 padding 容纳按钮垂直居中（按钮比轨道高度大）
    style.paddingLeft = `${halfButton}px`
    style.paddingRight = `${halfButton}px`
  } else {
    style.height = barHeight
    // 上下 padding 容纳按钮垂直居中（按钮比轨道高度大）
    style.paddingTop = `${halfButton}px`
    style.paddingBottom = `${halfButton}px`
  }

  return useStyle(style)
})

// 轨道背景样式
const trackBgStyle = computed(() => {
  const style: CSSProperties = {}
  if (useProps.inactiveColor) {
    style.backgroundColor = useColor(useProps.inactiveColor)
  }
  return useStyle(style)
})

// 激活轨道样式
// 激活轨道需要与按钮位置对齐，所以也要考虑按钮半径
const activeStyle = computed(() => {
  const style: CSSProperties = {}
  const range = useProps.max - useProps.min
  const halfButton = halfButtonSize.value

  if (useProps.range) {
    // 范围模式：从左值到右值
    const leftRatio = (rangeValue.value[0] - useProps.min) / range
    const rightRatio = (rangeValue.value[1] - useProps.min) / range

    if (useProps.vertical) {
      // 起始位置 = halfButton + (可用高度 * leftRatio)
      style.bottom = `calc(${halfButton}px + (100% - ${halfButton * 2}px) * ${leftRatio})`
      // 高度 = 可用高度 * (rightRatio - leftRatio)
      style.height = `calc((100% - ${halfButton * 2}px) * ${rightRatio - leftRatio})`
    } else {
      style.left = `calc(${halfButton}px + (100% - ${halfButton * 2}px) * ${leftRatio})`
      style.width = `calc((100% - ${halfButton * 2}px) * ${rightRatio - leftRatio})`
    }
  } else {
    // 单值模式：从起点到当前值
    const ratio = (currentValue.value - useProps.min) / range

    if (useProps.vertical) {
      style.bottom = `${halfButton}px`
      style.height = `calc((100% - ${halfButton * 2}px) * ${ratio})`
    } else {
      style.left = `${halfButton}px`
      style.width = `calc((100% - ${halfButton * 2}px) * ${ratio})`
    }
  }

  if (useProps.activeColor) {
    style.backgroundColor = useColor(useProps.activeColor)
  }

  return useStyle(style)
})

// 按钮样式
const buttonStyle = computed(() => {
  const style: CSSProperties = {}
  const size = useUnit(useProps.buttonSize)
  style.width = size
  style.height = size

  if (useProps.buttonColor) {
    style.backgroundColor = useColor(useProps.buttonColor)
  }

  return useStyle(style)
})

// 按钮包装器样式（用于定位）
// 按钮可移动范围：从 半径 到 100%-半径，确保按钮不超出轨道
const buttonWrapperStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {}
    const range = useProps.max - useProps.min
    const halfButton = halfButtonSize.value
    let value: number

    if (useProps.range) {
      value = rangeValue.value[index]
    } else {
      value = currentValue.value
    }

    // 百分比 0~1
    const ratio = (value - useProps.min) / range

    if (useProps.vertical) {
      // 垂直模式：从 halfButton 到 100% - halfButton
      style.bottom = `calc(${halfButton}px + (100% - ${halfButton * 2}px) * ${ratio})`
    } else {
      // 水平模式：从 halfButton 到 100% - halfButton
      style.left = `calc(${halfButton}px + (100% - ${halfButton * 2}px) * ${ratio})`
    }

    return useStyle(style)
  }
})

// 刻度样式
// 刻度位置与按钮位置计算方式一致
const markStyle = computed(() => {
  return (mark: { value: number }) => {
    const style: CSSProperties = {}
    const range = useProps.max - useProps.min
    const halfButton = halfButtonSize.value
    const ratio = (mark.value - useProps.min) / range

    if (useProps.vertical) {
      style.bottom = `calc(${halfButton}px + (100% - ${halfButton * 2}px) * ${ratio})`
    } else {
      style.left = `calc(${halfButton}px + (100% - ${halfButton * 2}px) * ${ratio})`
    }

    return useStyle(style)
  }
})

// 判断刻度是否在激活范围内
function isMarkActive(value: number): boolean {
  if (useProps.range) {
    return value >= rangeValue.value[0] && value <= rangeValue.value[1]
  }
  return value <= currentValue.value
}

// 是否应该显示值提示
function shouldShowValue(index: number): boolean {
  if (useProps.showValueMode === "never" || !useProps.showValue) return false
  if (useProps.showValueMode === "always") return true
  // dragging 模式：仅拖动时显示
  return draggingIndex.value === index
}

// 格式化显示值
function formatDisplayValue(value: number): string {
  if (useProps.formatValue) {
    return useProps.formatValue(value)
  }
  return String(value)
}

// 将位置转换为值
function positionToValue(position: number, trackLength: number): number {
  const range = useProps.max - useProps.min
  let ratio = position / trackLength

  // 限制在 0-1 范围内
  ratio = Math.max(0, Math.min(1, ratio))

  // 计算原始值
  let value = useProps.min + ratio * range

  // 根据步长对齐
  const steps = Math.round((value - useProps.min) / useProps.step)
  value = useProps.min + steps * useProps.step

  // 确保在范围内
  value = Math.max(useProps.min, Math.min(useProps.max, value))

  return value
}

// 更新轨道区域信息
async function updateTrackRect() {
  trackRect.value = await useRect(".ui-slider__track", instance)
}

// 轨道点击事件
async function onTrackClick(event: MouseEvent) {
  if (useProps.disabled || useProps.readonly) return

  // 防止 touch 结束后触发的合成 click 事件导致值跳变
  // 在触摸设备上，touchend 后通常会触发一个合成的 click 事件
  if (Date.now() - lastTouchEndTime.value < 300) return

  await updateTrackRect()

  // 获取点击位置（click 事件直接使用 clientX/clientY）
  const clientX = event.clientX
  const clientY = event.clientY

  // 计算相对于轨道的位置
  const rect = trackRect.value
  let position: number
  let trackLength: number

  if (useProps.vertical) {
    position = (rect.bottom || 0) - clientY
    trackLength = rect.height || 1
  } else {
    position = clientX - (rect.left || 0)
    trackLength = rect.width || 1
  }

  const newValue = positionToValue(position, trackLength)

  if (useProps.range) {
    // 范围模式：判断点击位置更接近哪个滑块
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
}

// 触摸开始
function onTouchStart(event: TouchEvent) {
  if (useProps.disabled || useProps.readonly) return
  updateTrackRect()
}

// 按钮触摸开始
function onButtonTouchStart(event: TouchEvent, index: number) {
  if (useProps.disabled || useProps.readonly) return

  draggingIndex.value = index
  startPosition.value = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  }
  startValue.value = useProps.range ? [...rangeValue.value] : currentValue.value

  updateTrackRect()

  emit("dragStart", internalValue.value, index)
}

// 触摸移动
function onTouchMove(event: TouchEvent) {
  if (useProps.disabled || useProps.readonly) return
  if (draggingIndex.value === -1) return

  const touch = event.touches[0]
  const rect = trackRect.value
  let position: number
  let trackLength: number

  if (useProps.vertical) {
    position = (rect.bottom || 0) - touch.clientY
    trackLength = rect.height || 1
  } else {
    position = touch.clientX - (rect.left || 0)
    trackLength = rect.width || 1
  }

  const newValue = positionToValue(position, trackLength)

  if (useProps.range) {
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

  // 记录触摸结束时间，用于防止后续 click 事件误触发
  lastTouchEndTime.value = Date.now()

  emit("dragEnd", internalValue.value, index)
  emit("update:modelValue", internalValue.value)
}

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

  // 支持滑块穿越交换：当左滑块拖到右边或右滑块拖到左边时，自动交换角色
  if (newRange[0] > newRange[1]) {
    // 交换两个值，使 newRange[0] <= newRange[1]
    ;[newRange[0], newRange[1]] = [newRange[1], newRange[0]]
    // 同时交换当前拖动的滑块索引
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
  width: 100%;
  position: relative;
  user-select: none;
  touch-action: none;

  // 禁用状态
  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  // 只读状态
  &--readonly {
    pointer-events: none;
  }

  // 轨道容器
  &__track {
    width: 100%;
    cursor: pointer;
    position: relative;
    box-sizing: content-box;
  }

  // 轨道背景
  &__track-bg {
    top: 50%;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translateY(-50%);
    border-radius: var(--ui-radius-round);
    background-color: var(--ui-color-background-dark);
  }

  // 激活轨道
  &__track-active {
    top: 50%;
    left: 0;
    height: 100%;
    position: absolute;
    transform: translateY(-50%);
    border-radius: var(--ui-radius-round);
    background-color: var(--ui-color-primary);
  }

  // 滑块按钮包装器
  &__button-wrapper {
    top: 50%;
    cursor: grab;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, -50%);

    &--dragging {
      cursor: grabbing;
      z-index: 2;
    }
  }

  // 滑块按钮
  &__button {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    position: relative;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
    transition: transform 0.15s ease;
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
    background-color: var(--ui-color-background);

    &:active {
      transform: scale(1.1);
    }
  }

  // 值提示
  &__value {
    left: 50%;
    color: var(--ui-color-background);
    bottom: 100%;
    padding: 4rpx 12rpx;
    position: absolute;
    font-size: var(--ui-font-size-xs);
    transform: translateX(-50%);
    white-space: nowrap;
    border-radius: var(--ui-radius-sm);
    margin-bottom: 8rpx;
    background-color: var(--ui-color-text-main);

    &::after {
      top: 100%;
      left: 50%;
      border: 8rpx solid transparent;
      content: "";
      position: absolute;
      transform: translateX(-50%);
      border-top-color: var(--ui-color-text-main);
    }
  }

  // 刻度标记
  &__mark {
    top: 50%;
    z-index: 0;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  &__mark-dot {
    width: 12rpx;
    border: 2rpx solid var(--ui-color-border);
    height: 12rpx;
    border-radius: var(--ui-radius-round);
    background-color: var(--ui-color-background);

    &--active {
      border-color: var(--ui-color-primary);
    }
  }

  &__mark-label {
    top: 100%;
    left: 50%;
    color: var(--ui-color-text-secondary);
    position: absolute;
    font-size: var(--ui-font-size-xs);
    transform: translateX(-50%);
    margin-top: 16rpx;
    white-space: nowrap;
  }

  // 垂直模式
  &--vertical {
    width: max-content;
    height: 300rpx;
    display: inline-flex;

    .ui-slider__track {
      width: max-content;
      height: 100%;
    }

    .ui-slider__track-bg {
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
      bottom: 0;
      position: absolute;
      transform: translateX(-50%);
    }

    .ui-slider__button-wrapper {
      top: auto;
      left: 50%;
      transform: translate(-50%, 50%);
    }

    .ui-slider__mark {
      top: auto;
      left: 50%;
      transform: translate(-50%, 50%);
    }

    .ui-slider__mark-label {
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      margin-top: 0;
      margin-left: 16rpx;
    }

    .ui-slider__value {
      left: auto;
      right: 100%;
      bottom: 50%;
      transform: translateY(50%);
      margin-right: 8rpx;
      margin-bottom: 0;

      &::after {
        top: 50%;
        left: 100%;
        border: 8rpx solid transparent;
        transform: translateY(-50%);
        border-top-color: transparent;
        border-left-color: var(--ui-color-text-main);
      }
    }
  }
}
</style>
