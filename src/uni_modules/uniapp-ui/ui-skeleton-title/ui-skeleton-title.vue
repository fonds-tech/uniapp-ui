<template>
  <view class="ui-skeleton-title" :class="[classes, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonTitleProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-skeleton-title" })

// 定义 props
const props = defineProps(skeletonTitleProps)

// 获取父组件（ui-skeleton）
const { parent } = useParent(skeletonKey)

// 根节点样式，设置宽度、高度和圆角
const style = computed(() => {
  const style: CSSProperties = {}
  if (props.width) style.width = useUnit(props.width)
  if (props.height) style.height = useUnit(props.height)
  if (props.radius) style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 类名数组，根据父组件动画状态设置
const classes = computed(() => {
  const list: string[] = []
  // 根据父组件设置是否添加动画类名
  if (parent?.props?.animate) list.push("ui-skeleton-title--animate")
  return list
})
</script>

<script lang="ts">
export default {
  name: "ui-skeleton-title",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-skeleton-title {
  width: 100%;
  height: 35rpx;
  position: relative;
  border-radius: 8rpx;
  background-color: #f2f3f5;

  &--animate {
    animation: ui-skeleton-blink 1.5s ease-in-out infinite;
  }
}

@keyframes ui-skeleton-blink {
  50% {
    opacity: 0.4;
  }
}
</style>
