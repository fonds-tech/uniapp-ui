<template>
  <view class="ui-progress" :class="[customClass]" :style="[style]">
    <view class="ui-progress__pivot" :style="[pivotStyle]">
      <slot name="text" :percentage="percentage">
        <text v-if="showText" class="ui-progress__text" :style="[textStyle]">{{ text ? text : `${percentage}%` }}</text>
      </slot>
    </view>
    <view class="ui-progress__portion" :style="[portionStyle]" />
  </view>
</template>

<script setup lang="ts">
import { useUnit, useColor, useStyle } from "../hooks"
import { progressProps, useProgressProps } from "./index"

defineOptions({ name: "ui-progress" })

const props = defineProps(progressProps)
const useProps = useProgressProps(props)

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(useProps.height)
  style.background = useColor(useProps.background)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.textColor)
  style.fontSize = useUnit(useProps.textSize)
  style.fontWeight = useProps.textWeight
  return useStyle(style)
})

const pivotStyle = computed(() => {
  const style: any = {}
  style.left = `${useProps.percentage}%`
  style.background = useColor(useProps.color)
  return useStyle(style)
})

const portionStyle = computed(() => {
  const style: any = {}
  style.width = `${useProps.percentage}%`
  style.background = useColor(useProps.background)
  return useStyle(style)
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
  height: 24rpx;
  display: flex;
  position: relative;
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
    transition: all var(--ui-transition-duration) ease-out;
    word-break: keep-all;
    align-items: center;
  }

  &__text {
    color: var(--ui-color-background);
    padding: 0 var(--ui-spacing-sm);
    font-size: var(--ui-font-size-xs);
    border-radius: var(--ui-radius-round);
  }

  &__portion {
    top: 0;
    left: 0;
    bottom: 0;
    z-index: var(--ui-z-index-base);
    position: absolute;
    transition: all var(--ui-transition-duration) ease-out;
    border-radius: var(--ui-radius-round);
    background-color: var(--ui-color-primary);
  }
}
</style>
