<template>
  <view class="ui-skeleton-image" :class="[classes, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonImageProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-skeleton-image" })

// 定义 props
const props = defineProps(skeletonImageProps)

// 获取父组件（ui-skeleton）
const { parent } = useParent(skeletonKey)

// 根节点样式，设置宽度、高度和圆角
const style = computed(() => {
  const style: CSSProperties = {}
  // 使用 width 或 size 作为宽度
  const width = props.width ?? props.size
  // 使用 height 或 size 作为高度
  const height = props.height ?? props.size
  if (width) style.width = useUnit(width)
  // 正方形模式不设置高度，使用 CSS aspect-ratio
  if (!props.square && height) style.height = useUnit(height)
  if (props.radius) style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 类名数组，根据正方形模式和动画状态设置
const classes = computed(() => {
  const list: string[] = []
  // 正方形模式
  if (props.square) list.push("ui-skeleton-image--square")
  // 根据父组件设置是否添加动画类名
  if (parent?.props?.animate) list.push("ui-skeleton-image--animate")
  return list
})
</script>

<script lang="ts">
export default {
  name: "ui-skeleton-image",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-skeleton-image {
  width: 100rpx;
  height: 100rpx;
  position: relative;
  flex-shrink: 0;
  border-radius: 16rpx;
  background-color: #f2f3f5;

  &--square {
    height: auto;
    aspect-ratio: 1;
  }

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
