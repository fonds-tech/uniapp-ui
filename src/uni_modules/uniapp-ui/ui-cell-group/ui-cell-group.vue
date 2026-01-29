<template>
  <view class="ui-cell-group" :class="[customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { useUnit, useColor, useStyle, useChildren } from "../hooks"
import { cellGroupKey, cellGroupEmits, cellGroupProps } from "./index"

defineOptions({ name: "ui-cell-group" })

const props = defineProps(cellGroupProps)
const emits = defineEmits(cellGroupEmits)
const { childrens, linkChildren } = useChildren(cellGroupKey)

const style = computed(() => {
  const style: CSSProperties = {}
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

linkChildren({ props, childrens })
</script>

<script lang="ts">
export default {
  name: "ui-cell-group",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-cell-group {
  position: relative;
  background-color: var(--ui-color-background);
}
</style>
