<template>
  <view class="ui-skeleton-image" :class="[classes, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonImageProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-skeleton-image" })

const props = defineProps(skeletonImageProps)
const { parent } = useParent(skeletonKey)

const style = computed(() => {
  const style: CSSProperties = {}
  const width = props.width ?? props.size
  const height = props.height ?? props.size
  if (width) style.width = useUnit(width)
  if (!props.square && height) style.height = useUnit(height)
  if (props.radius) style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classes = computed(() => {
  const list: string[] = []
  if (props.square) list.push("ui-skeleton-image--square")
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
