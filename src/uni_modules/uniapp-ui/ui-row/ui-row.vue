<template>
  <view class="ui-row" :class="[classNames, props.customClass]" :style="[rootStyle]">
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

// 根节点类名
const classNames = computed(() => ({ "ui-row--wrap": props.wrap }))

// 根节点样式：注入 CSS var 给后代 col 自动继承做半 padding；自身用负 margin 抵消视觉边距
const rootStyle = computed<CSSProperties>(() => {
  const s: Record<string, string | undefined> = {}
  const rowGap = props.gap ?? props.rowGap
  const colGap = props.gap ?? props.colGap
  if (rowGap !== undefined) s["--ui-row-row-gap-half"] = `calc(${useUnit(rowGap)} / 2)`
  if (colGap !== undefined) s["--ui-row-col-gap-half"] = `calc(${useUnit(colGap)} / 2)`
  // 负 margin 抵消子元素半 padding，让 row 内容贴齐外部容器
  if (rowGap !== undefined || colGap !== undefined) {
    const r = rowGap !== undefined ? `calc(${useUnit(rowGap)} / -2)` : "0px"
    const c = colGap !== undefined ? `calc(${useUnit(colGap)} / -2)` : "0px"
    s.margin = `${r} ${c}`
  }
  // 水平对齐
  switch (props.justify) {
    case "start":
    case "end":
      s.justifyContent = `flex-${props.justify}`
      break
    case "around":
    case "between":
      s.justifyContent = `space-${props.justify}`
      break
    default:
      s.justifyContent = props.justify
  }
  // 垂直对齐
  switch (props.align) {
    case "start":
    case "end":
      s.alignItems = `flex-${props.align}`
      break
    default:
      s.alignItems = props.align
  }
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) }) as CSSProperties
})

defineExpose({ name: "ui-row" })
</script>

<script lang="ts">
export default {
  name: "ui-row",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
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
