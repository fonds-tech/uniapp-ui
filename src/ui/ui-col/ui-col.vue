<template>
  <view class="ui-col" :class="[useProps.customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isNumber, isString } from "../utils/check"
import { colProps, useColProps } from "./index"
import { useUnit, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-col" })

const props = defineProps(colProps)
const useProps = useColProps(props)
const row = inject("ui-row", null)

const style = computed(() => {
  const style: CSSProperties = {}
  // #ifdef H5 || APP-PLUS || MP-WEIXIN
  style.flex = `0 0 ${(100 / 24) * Math.min(24, +useProps.span)}%`
  style.marginLeft = isNumber(useProps.offset) ? `${(100 / 24) * useProps.offset}%` : isString(useProps.offset) ? useUnit(useProps.offset) : 0
  // #endif
  // #ifndef H5 || APP-PLUS || MP-WEIXIN
  if (row) {
    style.width = `${(row.width.value / 24) * useProps.span}px`
    style.marginLeft = isNumber(useProps.offset) ? `${(row.width.value / 24) * useProps.offset}px` : isString(useProps.offset) ? `${useUnitToPx(useProps.offset)}px` : 0
  }
  // #endif
  if (row) style.padding = `${useUnitToPx(row.gap.value || row.rowGap.value) / 2}px ${useUnitToPx(row.gap.value || row.colGap.value) / 2}px`
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
  switch (useProps.align) {
    case "top":
      style.alignItems = "flex-start"
      break
    case "bottom":
      style.alignItems = "flex-end"
      break
    default:
      style.alignItems = useProps.align
      break
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

defineExpose({ name: "ui-col" })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-col {
  display: flex;
}
</style>
