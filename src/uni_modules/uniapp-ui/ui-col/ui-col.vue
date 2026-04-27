<template>
  <view class="ui-col" :class="[props.customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useStyle } from "../hooks"
import { colProps } from "./index"
import { computed } from "vue"

defineOptions({ name: "ui-col" })

const props = defineProps(colProps)

// 根节点样式：宽度 + 可选偏移；间距由 row 注入的 CSS var 自动继承（见 SCSS）
const rootStyle = computed<CSSProperties>(() => {
  const s: CSSProperties = {}
  // 24 栅格转百分比；span ≤ 0 → 0%（不渲染但保持布局占位语义）
  const span = Math.min(24, Math.max(0, +props.span || 0))
  s.width = `${(100 / 24) * span}%`
  // 偏移 clamp 到 [0, 24-span]
  const offset = Math.min(24 - span, Math.max(0, +props.offset || 0))
  if (offset > 0) s.marginLeft = `${(100 / 24) * offset}%`
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) }) as CSSProperties
})

defineExpose({ name: "ui-col" })
</script>

<script lang="ts">
export default {
  name: "ui-col",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-col {
  box-sizing: border-box;
  // 间距通过祖先 row 注入的 CSS var 继承；独立使用时 fallback 为 0
  padding: var(--ui-row-row-gap-half, 0px) var(--ui-row-col-gap-half, 0px);
}
</style>
