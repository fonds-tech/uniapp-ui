<template>
  <view class="ui-col" :class="props.customClass" :style="rootStyle">
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

// 安全转数：非数值兜底为 0，clamp 到 [min, max]
function clamp(v: number | string | undefined, min: number, max: number) {
  const n = Number(v)
  return Math.min(max, Math.max(min, Number.isFinite(n) ? n : 0))
}

// 根节点样式：宽度 + 可选偏移；间距由 row 注入的 CSS var 自动继承（见 SCSS）
const rootStyle = computed(() => {
  const s: CSSProperties = {}
  // 24 栅格转百分比；span ≤ 0 → 0%（不渲染但保持布局占位语义）
  const span = clamp(props.span, 0, 24)
  s.width = `${(100 / 24) * span}%`
  // 偏移 clamp 到 [0, 24-span]
  const offset = clamp(props.offset, 0, 24 - span)
  if (offset > 0) s.marginLeft = `${(100 / 24) * offset}%`
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) })
})
</script>

<script lang="ts">
export default {
  name: "ui-col",
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
.ui-col {
  box-sizing: border-box;
  // 间距通过祖先 row 注入的 CSS var 继承；独立使用时 fallback 为 0
  padding: var(--ui-row-row-gap-half, 0px) var(--ui-row-col-gap-half, 0px);
}
</style>
