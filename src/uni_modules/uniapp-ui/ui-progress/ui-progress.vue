<template>
  <view
    class="ui-progress"
    :class="[customClass]"
    :style="[rootStyle]"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="validPercentage"
    :aria-valuetext="displayText"
  >
    <view class="ui-progress__portion" :style="[portionStyle]" />
    <view v-if="showText && props.textPosition !== 'none'" class="ui-progress__pivot" :style="[pivotStyle]">
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
import { progressEmits, progressProps } from "./index"

defineOptions({ name: "ui-progress" })

const props = defineProps(progressProps)
const emits = defineEmits(progressEmits)

// 百分比夹紧到 [0, 100]
const validPercentage = computed(() => {
  const value = Number(props.percentage)
  if (Number.isNaN(value)) return 0
  return Math.max(0, Math.min(100, value))
})

const displayText = computed(() => props.text || `${validPercentage.value}%`)

watch(validPercentage, (newVal, oldVal) => {
  if (newVal === 100 && oldVal !== 100) emits("finish")
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.height !== undefined) style.height = useUnit(props.height)
  if (props.trackColor) style.backgroundColor = useColor(props.trackColor)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const textStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.textColor) style.color = useColor(props.textColor)
  if (props.textSize) style.fontSize = useUnit(props.textSize)
  if (props.textWeight) style.fontWeight = props.textWeight as CSSProperties["fontWeight"]
  return useStyle(style)
})

const pivotStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.textPosition === "inside") {
    // 进度低于 10% 时锁 left=10%，避免 transform: translate(-100%) 把 inside 文字推出左侧外部
    style.left = `${Math.max(validPercentage.value, 10)}%`
  } else {
    // outside: 钉右边；只保留 Y 居中，去掉 X 方向的 -100% 平移（不能 transform:none，否则 Y 也丢）
    style.right = "0"
    style.transform = "translateY(-50%)"
  }
  return useStyle(style)
})

const portionStyle = computed(() => {
  const style: CSSProperties = { width: `${validPercentage.value}%` }
  if (props.color) style.backgroundColor = useColor(props.color)
  return useStyle(style)
})
</script>

<script lang="ts">
export default {
  name: "ui-progress",
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
