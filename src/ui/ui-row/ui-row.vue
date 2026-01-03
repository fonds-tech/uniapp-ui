<template>
  <view class="ui-row" :class="[useProps.customClass, { 'ui-row--wrap': useProps.wrap }]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useUnit, useStyle } from "../hooks"
import { rowProps, useRowProps } from "./index"

defineOptions({ name: "ui-row" })

const props = defineProps(rowProps)
const useProps = useRowProps(props)

// 计算间距值（用于 provide 给 Col）
const gapInfo = computed(() => {
  const rowGapVal = useProps.gap || useProps.rowGap
  const colGapVal = useProps.gap || useProps.colGap
  return {
    rowGap: rowGapVal ? useUnit(rowGapVal) : "0px",
    colGap: colGapVal ? useUnit(colGapVal) : "0px",
  }
})

// 计算样式
const style = computed(() => {
  const style: CSSProperties = {}
  const { rowGap, colGap } = gapInfo.value

  // 使用负 margin 抵消子元素的 padding（兼容性更好）
  if (rowGap !== "0px" || colGap !== "0px") {
    const rowGapHalf = `calc(${rowGap} / -2)`
    const colGapHalf = `calc(${colGap} / -2)`
    style.margin = `${rowGapHalf} ${colGapHalf}`
  }

  // 水平对齐方式
  switch (useProps.justify) {
    case "start":
    case "end":
      style.justifyContent = `flex-${useProps.justify}`
      break
    case "around":
    case "between":
      style.justifyContent = `space-${useProps.justify}`
      break
    default:
      style.justifyContent = useProps.justify
      break
  }

  // 垂直对齐方式
  switch (useProps.align) {
    case "start":
    case "end":
      style.alignItems = `flex-${useProps.align}`
      break
    default:
      style.alignItems = useProps.align
      break
  }

  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 向子组件提供间距信息
provide("ui-row", gapInfo)

defineExpose({ name: "ui-row" })
</script>

<script lang="ts">
export default {
  name: "ui-row",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-row {
  width: 100%;
  display: flex;

  &--wrap {
    flex-wrap: wrap;
  }
}
</style>
