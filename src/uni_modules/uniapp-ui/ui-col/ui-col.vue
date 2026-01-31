<template>
  <view class="ui-col" :class="[props.customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { ComputedRef, CSSProperties } from "vue"
import { useStyle } from "../hooks"
import { colProps } from "./index"
import { inject, computed } from "vue"

defineOptions({ name: "ui-col" })

// 组件 props
const props = defineProps(colProps)

// 从 Row 注入间距信息
const rowGapInfo = inject<ComputedRef<{ rowGap: string; colGap: string }> | null>("ui-row", null)

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}

  // 计算列宽（基于24栅格系统）
  const spanValue = Math.min(24, Math.max(0, +props.span))
  const widthPercent = (100 / 24) * spanValue
  style.width = `${widthPercent}%`

  // 计算偏移
  if (props.offset > 0) {
    const offsetValue = Math.min(24 - spanValue, Math.max(0, +props.offset))
    style.marginLeft = `${(100 / 24) * offsetValue}%`
  }

  // 从 Row 获取间距，设置 padding（配合 Row 的负 margin）
  if (rowGapInfo?.value) {
    const { rowGap, colGap } = rowGapInfo.value
    if (rowGap !== "0px" || colGap !== "0px") {
      const rowGapHalf = `calc(${rowGap} / 2)`
      const colGapHalf = `calc(${colGap} / 2)`
      style.padding = `${rowGapHalf} ${colGapHalf}`
    }
  }

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

defineExpose({ name: "ui-col" })
</script>

<script lang="ts">
export default {
  name: "ui-col",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-col {
  box-sizing: border-box;
}
</style>
