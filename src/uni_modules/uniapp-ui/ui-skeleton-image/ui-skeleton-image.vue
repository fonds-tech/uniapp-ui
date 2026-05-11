<template>
  <view class="ui-skeleton-image" :class="[classNames, customClass]" :style="[rootStyle]" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonImageProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-skeleton-image" })

const props = defineProps(skeletonImageProps)
const { parent } = useParent(skeletonKey)

const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  const width = props.width ?? props.size
  const height = props.height ?? props.size
  if (width) vars["--ui-skeleton-image-width"] = useUnit(width)
  // square 模式默认走 aspect-ratio；用户显式传 height 仍优先
  if (height) vars["--ui-skeleton-image-height"] = useUnit(height)
  if (props.radius) vars["--ui-skeleton-image-radius"] = useUnit(props.radius)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})

const classNames = computed(() => {
  const list: string[] = []
  if (props.square) list.push("ui-skeleton-image--square")
  if (parent?.props?.animate) list.push("ui-skeleton-image--animate")
  return list
})
</script>

<script lang="ts">
export default {
  name: "ui-skeleton-image",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-skeleton-image {
  --ui-skeleton-image-width: var(--ui-size-lg);
  --ui-skeleton-image-height: var(--ui-size-lg);
  --ui-skeleton-image-radius: var(--ui-radius-md);

  width: var(--ui-skeleton-image-width);
  height: var(--ui-skeleton-image-height);
  position: relative;
  background: var(--ui-skeleton-block, var(--ui-color-background-section));
  flex-shrink: 0;
  border-radius: var(--ui-skeleton-image-radius);

  // square: 用户未显式传 height 时由 aspect-ratio 撑出正方形
  &--square {
    height: auto;
    aspect-ratio: 1;
  }

  &--animate {
    animation: ui-skeleton-shimmer var(--ui-skeleton-animation-duration, 1.5s) ease-in-out infinite;
    background: linear-gradient(
      90deg,
      var(--ui-skeleton-block, var(--ui-gray-3)) 25%,
      var(--ui-skeleton-highlight, var(--ui-gray-2)) 50%,
      var(--ui-skeleton-block, var(--ui-gray-3)) 75%
    );
    background-size: 400% 100%;
  }
}
</style>
