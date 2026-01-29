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
import { skeletonParagraphProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-skeleton-paragraph" })

const props = defineProps(skeletonParagraphProps)
const { parent } = useParent(skeletonKey)

const row = computed(() => +props.row)

const style = computed(() => {
  const styles: CSSProperties = {}
  styles["--ui-skeleton-paragraph-gap"] = useUnit(props.rowGap)
  styles["--ui-skeleton-paragraph-height"] = useUnit(props.rowHeight)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

const rowStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {}
    if (isArray(props.rowWidth)) {
      style.width = useUnit(props.rowWidth[index])
    } else {
      style.width = useUnit(props.rowWidth)
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
