<template>
  <view class="ui-steps" :class="[classes, customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { useStyle, useChildren } from "../hooks"
import { stepsKey, stepsEmits, stepsProps } from "./index"

defineOptions({ name: "ui-steps" })

const props = defineProps(stepsProps)
const emits = defineEmits(stepsEmits)
const { childrens, linkChildren } = useChildren(stepsKey)

/**
 * 当前激活步骤索引（带边界校验）
 */
const active = computed(() => {
  const val = Number(props.active)
  if (Number.isNaN(val)) return 0
  const maxIndex = Math.max(0, count.value - 1)
  return Math.max(0, Math.min(val, maxIndex))
})

/**
 * 子组件数量
 */
const count = computed(() => childrens.length)

/**
 * 组件容器样式
 */
const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

/**
 * 组件容器类名
 */
const classes = computed(() => {
  const list: string[] = []
  if (props.direction === "vertical") {
    list.push("ui-steps--vertical")
  }
  if (props.clickable) {
    list.push("ui-steps--clickable")
  }
  if (props.simple) {
    list.push("ui-steps--simple")
  }
  if (props.dot) {
    list.push("ui-steps--dot")
  }
  if (props.center) {
    list.push("ui-steps--center")
  }
  return list
})

/**
 * 点击步骤事件处理
 */
function onClickStep(index: number) {
  if (props.clickable) {
    emits("clickStep", index)
  }
}

linkChildren({ props, active, count, onClickStep })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-steps {
  width: 100%;
  display: flex;
  overflow: hidden;
  background-color: var(--ui-color-background);

  // 水平方向（默认）
  &:not(.ui-steps--vertical) {
    padding: 20rpx 0;
    flex-direction: row;
  }

  // 垂直方向
  &--vertical {
    padding: 0 20rpx 0 60rpx;
    flex-direction: column;
  }

  &--clickable {
    cursor: pointer;
  }
}
</style>
