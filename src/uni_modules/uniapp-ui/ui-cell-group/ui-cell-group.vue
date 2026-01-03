<template>
  <view class="ui-cell-group" :class="[customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useUnit, useColor, useStyle, useChildren } from "../hooks"
import { cellGroupKey, cellGroupEmits, cellGroupProps, useCellGroupProps } from "./index"

defineOptions({ name: "ui-cell-group" })

const props = defineProps(cellGroupProps)
const emits = defineEmits(cellGroupEmits)
const useProps = useCellGroupProps(props)
const { childrens, linkChildren } = useChildren(cellGroupKey)

const style = computed(() => {
  const style: CSSProperties = {}
  style.background = useColor(useProps.background)
  style.borderRadius = useUnit(useProps.radius)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
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
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: var(--ui-radius-xl);
  flex-direction: column;
  background-color: var(--ui-color-background);
}
</style>
