<template>
  <view class="ui-skeleton-avatar" :class="[classs, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { skeletonKey } from "../ui-skeleton"
import { useUnit, useStyle, useParent } from "../hooks"
import { skeletonAvatarEmits, skeletonAvatarProps, useSkeletonAvatarProps } from "./index"

defineOptions({ name: "ui-skeleton-avatar" })

const props = defineProps(skeletonAvatarProps)
const emits = defineEmits(skeletonAvatarEmits)
const useProps = useSkeletonAvatarProps(props)
const { parent } = useParent(skeletonKey)

const style = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(useProps.size)
  style.height = useUnit(useProps.size)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  list.push(`ui-skeleton-avatar--${useProps.shape}`)
  if (prop("animate")) list.push("ui-skeleton-avatar--animate")
  return list
})

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}
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
  background-color: #f2f3f5;

  &--round {
    border-radius: 9999px;
  }

  &--square {
    border-radius: 16rpx;
  }

  &--animate {
    animation: skeleton-blink 2s ease-in-out infinite;
  }

  @keyframes skeleton-blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 01;
    }
  }
}
</style>
