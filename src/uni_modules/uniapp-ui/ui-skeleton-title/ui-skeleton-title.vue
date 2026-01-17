<template>
  <view class="ui-skeleton-title" :class="[classes, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { useUnit, useStyle, useParent } from "../hooks"
import { skeletonTitleProps, useSkeletonTitleProps } from "./index"

defineOptions({ name: "ui-skeleton-title" })

const props = defineProps(skeletonTitleProps)
const useProps = useSkeletonTitleProps(props)
const { parent } = useParent(skeletonKey)

const style = computed(() => {
  const style: CSSProperties = {}
  if (useProps.width) style.width = useUnit(useProps.width)
  if (useProps.height) style.height = useUnit(useProps.height)
  if (useProps.radius) style.borderRadius = useUnit(useProps.radius)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classes = computed(() => {
  const list: string[] = []
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
