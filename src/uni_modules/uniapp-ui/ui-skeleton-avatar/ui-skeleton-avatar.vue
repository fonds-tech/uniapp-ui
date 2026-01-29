<template>
  <view class="ui-skeleton-avatar" :class="[classes, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonAvatarProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-skeleton-avatar" })

const props = defineProps(skeletonAvatarProps)
const { parent } = useParent(skeletonKey)

const style = computed(() => {
  const style: CSSProperties = {}
  if (props.size) {
    style.width = useUnit(props.size)
    style.height = useUnit(props.size)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-skeleton-avatar--${props.shape}`)
  if (parent?.props?.animate) list.push("ui-skeleton-avatar--animate")
  return list
})
</script>

<script lang="ts">
export default {
  name: "ui-skeleton-avatar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-skeleton-avatar {
  width: 100rpx;
  height: 100rpx;
  position: relative;
  flex-shrink: 0;
  background-color: #f2f3f5;

  &--round {
    border-radius: 9999px;
  }

  &--square {
    border-radius: 16rpx;
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
