<template>
  <view class="ui-skeleton-title" :class="[classNames, customClass]" :style="[rootStyle]" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonTitleProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-skeleton-title" })

const props = defineProps(skeletonTitleProps)
const { parent } = useParent(skeletonKey)

const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.width) vars["--ui-skeleton-title-width"] = useUnit(props.width)
  if (props.height) vars["--ui-skeleton-title-height"] = useUnit(props.height)
  if (props.radius) vars["--ui-skeleton-title-radius"] = useUnit(props.radius)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})

const classNames = computed(() => {
  const list: string[] = []
  if (parent?.props?.animate) list.push("ui-skeleton-title--animate")
  return list
})
</script>

<script lang="ts">
export default {
  name: "ui-skeleton-title",
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
.ui-skeleton-title {
  --ui-skeleton-title-width: 100%;
  --ui-skeleton-title-height: 32rpx;
  --ui-skeleton-title-radius: var(--ui-radius-sm);

  width: var(--ui-skeleton-title-width);
  height: var(--ui-skeleton-title-height);
  position: relative;
  background: var(--ui-skeleton-block, var(--ui-color-background-section));
  border-radius: var(--ui-skeleton-title-radius);

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
