<template>
  <view class="ui-row" :class="[classNames, props.customClass]" :style="rootStyle">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { rowProps } from "./index"
import { computed } from "vue"
import { useUnit, useStyle } from "../hooks"

defineOptions({ name: "ui-row" })

const props = defineProps(rowProps)

// flex 对齐 lookup 表
const justifyMap: Record<string, string> = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  around: "space-around",
  between: "space-between",
}
const alignMap: Record<string, string> = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
}

// 根节点类名
const classNames = computed(() => ({ "ui-row--wrap": props.wrap }))

// 根节点样式：注入 CSS var 给后代 col 自动继承做半 padding；自身用负 margin 抵消视觉边距
const rootStyle = computed(() => {
  const s: Record<string, string | undefined> = {}
  const rowGap = props.gap ?? props.rowGap
  const colGap = props.gap ?? props.colGap
  const ru = rowGap !== undefined ? useUnit(rowGap) : undefined
  const cu = colGap !== undefined ? useUnit(colGap) : undefined
  if (ru) s["--ui-row-row-gap-half"] = `calc(${ru} / 2)`
  if (cu) s["--ui-row-col-gap-half"] = `calc(${cu} / 2)`
  // 负 margin 抵消子元素半 padding，让 row 内容贴齐外部容器
  if (ru || cu) s.margin = `${ru ? `calc(${ru} / -2)` : "0px"} ${cu ? `calc(${cu} / -2)` : "0px"}`
  s.justifyContent = justifyMap[props.justify] ?? props.justify
  s.alignItems = alignMap[props.align] ?? props.align
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) }) as CSSProperties
})
</script>

<script lang="ts">
export default {
  name: "ui-row",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
.ui-row {
  width: 100%;
  display: flex;

  &--wrap {
    flex-wrap: wrap;
  }
}
</style>
