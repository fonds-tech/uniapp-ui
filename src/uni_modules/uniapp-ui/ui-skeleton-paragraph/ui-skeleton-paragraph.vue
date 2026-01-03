<template>
  <view class="ui-skeleton-paragraph" :class="[customClass]" :style="[style]">
    <view v-for="(_, index) in row" :key="index" class="ui-skeleton-paragraph__row" :style="[rowStyle(index)]" :class="[rowClass]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { isDef, isArray } from "../utils/check"
import { useUnit, useStyle, useParent } from "../hooks"
import { skeletonParagraphEmits, skeletonParagraphProps, useSkeletonParagraphProps } from "./index"

defineOptions({ name: "ui-skeleton-paragraph" })

const props = defineProps(skeletonParagraphProps)
const emits = defineEmits(skeletonParagraphEmits)
const useProps = useSkeletonParagraphProps(props)
const { parent } = useParent(skeletonKey)

const row = computed(() => +useProps.row)

const style = computed(() => {
  const style: CSSProperties = {}
  if (useProps.rowWidth === "100%") style.flex = "1"
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const rowStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {}
    if (isArray(useProps.rowWidth)) {
      style.width = useUnit(useProps.rowWidth[index])
    } else {
      style.width = useUnit(useProps.rowWidth)
    }
    return useStyle(style)
  }
})

const rowClass = computed(() => {
  const list: string[] = []
  if (prop("animate")) list.push("ui-skeleton-paragraph__row--animate")
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
  name: "ui-skeleton-paragraph",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-skeleton-paragraph {
  display: grid;
  row-gap: 30rpx;
  overflow: hidden;
  position: relative;
  grid-template-columns: repeat(1, 1fr);

  &__row {
    height: 35rpx;
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
}
</style>
