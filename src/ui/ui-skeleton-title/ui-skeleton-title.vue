<template>
  <view class="ui-skeleton-title" :class="[classs, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { isDef, isEmpty } from "../utils/check"
import { useUnit, useStyle, useParent } from "../hooks"
import { skeletonTitleEmits, skeletonTitleProps } from "./index"

defineOptions({ name: "ui-skeleton-title" })

const props = defineProps(skeletonTitleProps)
const emits = defineEmits(skeletonTitleEmits)
const { parent } = useParent(skeletonKey)

const style = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.borderRadius = useUnit(props.radius)
  if (isEmpty(props.width)) style.flex = "1"
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (prop("animate")) list.push("ui-skeleton-title--animate")
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
  name: "ui-skeleton-title",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-skeleton-title {
  height: 35rpx;
  position: relative;
  border-radius: 8rpx;
  background-color: #f2f3f5;

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
