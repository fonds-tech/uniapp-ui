<template>
  <view class="ui-skeleton-paragraph" :class="[customClass]" :style="[style]">
    <view v-for="(_, index) in row" :key="index" class="ui-skeleton-paragraph__row" :style="[rowStyle(index)]" :class="[rowClass]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isArray } from "../utils/check"
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { useUnit, useStyle, useParent } from "../hooks"
import { skeletonParagraphProps, useSkeletonParagraphProps } from "./index"

defineOptions({ name: "ui-skeleton-paragraph" })

const props = defineProps(skeletonParagraphProps)
const useProps = useSkeletonParagraphProps(props)
const { parent } = useParent(skeletonKey)

const row = computed(() => +useProps.row)

const style = computed(() => {
  const styles: CSSProperties = {}
  styles["--ui-skeleton-paragraph-gap"] = useUnit(useProps.rowGap)
  styles["--ui-skeleton-paragraph-height"] = useUnit(useProps.rowHeight)
  return useStyle({ ...styles, ...useStyle(useProps.customStyle) })
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
  if (parent?.props?.animate) list.push("ui-skeleton-paragraph__row--animate")
  return list
})
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
  row-gap: var(--ui-skeleton-paragraph-gap);
  overflow: hidden;
  position: relative;
  grid-template-columns: repeat(1, 1fr);

  &__row {
    height: var(--ui-skeleton-paragraph-height);
    border-radius: 8rpx;
    background-color: #f2f3f5;

    &--animate {
      animation: ui-skeleton-blink 1.5s ease-in-out infinite;
    }
  }
}

@keyframes ui-skeleton-blink {
  50% {
    opacity: 0.4;
  }
}
</style>
