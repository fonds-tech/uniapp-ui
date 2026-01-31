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

// 定义组件名称
defineOptions({ name: "ui-skeleton-paragraph" })

// 定义 props
const props = defineProps(skeletonParagraphProps)

// 获取父组件（ui-skeleton）
const { parent } = useParent(skeletonKey)

// 行数
const row = computed(() => +props.row)

// 根节点样式，设置行间距和行高
const style = computed(() => {
  const styles: CSSProperties = {}
  // 设置行间距
  styles["--ui-skeleton-paragraph-gap"] = useUnit(props.rowGap)
  // 设置行高
  styles["--ui-skeleton-paragraph-height"] = useUnit(props.rowHeight)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

// 行样式（根据索引返回不同宽度）
const rowStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {}
    // 如果是数组，使用对应索引的宽度
    if (isArray(props.rowWidth)) {
      style.width = useUnit(props.rowWidth[index])
    } else {
      // 否则使用统一宽度
      style.width = useUnit(props.rowWidth)
    }
    return useStyle(style)
  }
})

// 行类名，根据父组件动画状态设置
const rowClass = computed(() => {
  const list: string[] = []
  // 根据父组件设置是否添加动画类名
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
