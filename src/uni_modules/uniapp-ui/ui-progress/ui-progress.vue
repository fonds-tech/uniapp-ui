<template>
  <view
    class="ui-progress"
    :class="[customClass]"
    :style="[style]"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="validPercentage"
    :aria-valuetext="displayText"
  >
    <!-- 进度条填充 -->
    <view class="ui-progress__portion" :style="[portionStyle]" />
    <!-- 文本显示 -->
    <view v-if="showText && useProps.textPosition !== 'none'" class="ui-progress__pivot" :style="[pivotStyle]">
      <slot name="text" :percentage="validPercentage">
        <text class="ui-progress__text" :style="[textStyle]">{{ displayText }}</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { watch, computed } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { progressEmits, progressProps, useProgressProps } from "./index"

defineOptions({ name: "ui-progress" })

const props = defineProps(progressProps)
const emits = defineEmits(progressEmits)
const useProps = useProgressProps(props)

// 百分比边界校验
const validPercentage = computed(() => {
  const value = Number(useProps.percentage)
  if (Number.isNaN(value)) return 0
  return Math.max(0, Math.min(100, value))
})

// 显示文本
const displayText = computed(() => {
  return useProps.text || `${validPercentage.value}%`
})

// 监听进度达到100%触发finish事件
watch(validPercentage, (newVal, oldVal) => {
  if (newVal === 100 && oldVal !== 100) {
    emits("finish")
  }
})

const style = computed(() => {
  const result: CSSProperties = {
    height: useUnit(useProps.height),
  }
  if (useProps.trackColor) {
    result.backgroundColor = useColor(useProps.trackColor)
  }
  return useStyle({ ...result, ...useStyle(useProps.customStyle) })
})

const textStyle = computed(() => {
  const result: CSSProperties = {}
  if (useProps.textColor) result.color = useColor(useProps.textColor)
  if (useProps.textSize) result.fontSize = useUnit(useProps.textSize)
  if (useProps.textWeight) result.fontWeight = useProps.textWeight as CSSProperties["fontWeight"]
  return useStyle(result)
})

const pivotStyle = computed(() => {
  const result: CSSProperties = {}
  const isInside = useProps.textPosition === "inside"

  if (isInside) {
    // 内部文本：跟随进度条，但限制最小位置防止溢出
    const minLeft = 10 // 最小10%位置，防止文字溢出左侧
    result.left = `${Math.max(validPercentage.value, minLeft)}%`
  } else {
    // 外部文本：固定在右侧
    result.right = "0"
    result.transform = "none"
  }

  return useStyle(result)
})

const portionStyle = computed(() => {
  const result: CSSProperties = {
    width: `${validPercentage.value}%`,
  }
  if (useProps.color) {
    result.backgroundColor = useColor(useProps.color)
  }
  return useStyle(result)
})

defineExpose({ name: "ui-progress" })
</script>

<script lang="ts">
export default {
  name: "ui-progress",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-progress {
  width: 100%;
  height: 28rpx;
  display: flex;
  position: relative;
  align-items: center;
  border-radius: var(--ui-radius-round);
  background-color: var(--ui-color-border-light);

  &__pivot {
    top: 50%;
    display: flex;
    z-index: calc(var(--ui-z-index-base) + 1);
    position: absolute;
    transform: translate(-100%, -50%);
    box-sizing: border-box;
    text-align: center;
    transition:
      left var(--ui-transition-duration) ease-out,
      right var(--ui-transition-duration) ease-out;
    word-break: keep-all;
    align-items: center;
  }

  &__text {
    color: var(--ui-color-background);
    padding: 0 var(--ui-spacing-sm);
    font-size: var(--ui-font-size-xs);
    line-height: 1;
    white-space: nowrap;
    border-radius: var(--ui-radius-round);
  }

  &__portion {
    top: 0;
    left: 0;
    bottom: 0;
    z-index: var(--ui-z-index-base);
    position: absolute;
    transition: width var(--ui-transition-duration) ease-out;
    border-radius: var(--ui-radius-round);
    background-color: var(--ui-color-primary);
  }
}
</style>
