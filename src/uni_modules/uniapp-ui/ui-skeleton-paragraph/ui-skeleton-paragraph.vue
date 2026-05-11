<template>
  <view class="ui-skeleton-paragraph" :class="[customClass]" :style="[rootStyle]">
    <view v-for="index in row" :key="`row-${index}`" class="ui-skeleton-paragraph__row" :class="[rowClass]" :style="[rowStyle(index - 1)]" />
  </view>
</template>

<script setup lang="ts">
import { isArray } from "../utils/check"
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonParagraphProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-skeleton-paragraph" })

const props = defineProps(skeletonParagraphProps)
const { parent } = useParent(skeletonKey)

// 安全的行数（非负整数）
const row = computed(() => Math.max(0, Math.floor(Number(props.row) || 0)))

// 根节点 CSS var 注入（行高/行距）
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.rowHeight) vars["--ui-skeleton-paragraph-height"] = useUnit(props.rowHeight)
  if (props.rowGap) vars["--ui-skeleton-paragraph-gap"] = useUnit(props.rowGap)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})

// 每行 inline 宽度（数组短于行数时循环取模）
function rowStyle(index: number) {
  const w = isArray(props.rowWidth)
    ? props.rowWidth[index % props.rowWidth.length]
    : props.rowWidth
  return useStyle({ width: useUnit(w) })
}

const rowClass = computed(() => {
  const list: string[] = []
  if (parent?.props?.animate) list.push("ui-skeleton-paragraph__row--animate")
  return list
})
</script>

<script lang="ts">
export default {
  name: "ui-skeleton-paragraph",
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
.ui-skeleton-paragraph {
  --ui-skeleton-paragraph-gap: var(--ui-spacing-md);
  --ui-skeleton-paragraph-height: 32rpx;

  gap: var(--ui-skeleton-paragraph-gap);
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;

  &__row {
    height: var(--ui-skeleton-paragraph-height);
    background: var(--ui-skeleton-block, var(--ui-color-background-section));
    border-radius: var(--ui-radius-sm);

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
}
</style>
