<template>
  <view class="ui-skeleton-title" :class="[classes, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonTitleProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-skeleton-title" })

const props = defineProps(skeletonTitleProps)
const { parent } = useParent(skeletonKey)

const style = computed(() => {
  const style: CSSProperties = {}
  if (props.width) style.width = useUnit(props.width)
  if (props.height) style.height = useUnit(props.height)
  if (props.radius) style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
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
