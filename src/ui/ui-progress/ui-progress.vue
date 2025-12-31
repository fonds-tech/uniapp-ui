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
import { progressProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-progress" })

const props = defineProps(progressProps)

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  style.fontWeight = props.textWeight
  return useStyle(style)
})

const pivotStyle = computed(() => {
  const style: any = {}
  style.left = `${props.percentage}%`
  style.background = useColor(props.color)
  return useStyle(style)
})

const portionStyle = computed(() => {
  const style: any = {}
  style.width = `${props.percentage}%`
  style.background = useColor(props.background)
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
  border-radius: 9999px;
  background-color: #ebedf0;

  &__pivot {
    top: 50%;
    display: flex;
    z-index: 2;
    position: absolute;
    transform: translate(-100%, -50%);
    box-sizing: border-box;
    text-align: center;
    transition: all 0.3s ease-out;
    word-break: keep-all;
    align-items: center;
  }

  &__text {
    color: #fff;
    padding: 0 8rpx;
    font-size: 20rpx;
    border-radius: 9999px;
  }

  &__portion {
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    position: absolute;
    transition: all 0.3s ease-out;
    border-radius: 9999px;
    background-color: var(--ui-color-primary);
  }
}
</style>
