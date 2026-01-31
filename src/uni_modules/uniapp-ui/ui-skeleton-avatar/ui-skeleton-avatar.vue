<template>
  <view class="ui-skeleton-avatar" :class="[classes, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonAvatarProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-skeleton-avatar" })

// 定义 props
const props = defineProps(skeletonAvatarProps)

// 获取父组件（ui-skeleton）
const { parent } = useParent(skeletonKey)

// 根节点样式，设置尺寸
const style = computed(() => {
  const style: CSSProperties = {}
  if (props.size) {
    style.width = useUnit(props.size)
    style.height = useUnit(props.size)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 类名数组，根据形状和动画状态设置
const classes = computed(() => {
  const list: string[] = []
  // 添加形状类名
  list.push(`ui-skeleton-avatar--${props.shape}`)
  // 根据父组件设置是否添加动画类名
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
