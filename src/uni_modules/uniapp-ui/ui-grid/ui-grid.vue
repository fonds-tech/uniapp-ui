<template>
  <view class="ui-grid" :class="[rootClass, props.customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { gridKey, gridProps } from "./index"
import { useUnit, useStyle, useChildren } from "../hooks"

defineOptions({ name: "ui-grid" })

const props = defineProps(gridProps)
const { linkChildren } = useChildren(gridKey)

const rootClass = computed(() => {
  const list: string[] = []
  if (props.border && !props.gutter) list.push("ui-grid--border")
  return list
})

const rootStyle = computed(() => {
  const style: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${props.columnNum || 4}, 1fr)`,
  }
  if (props.gutter) style.gap = useUnit(props.gutter)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

linkChildren({ props })
</script>

<script lang="ts">
export default {
  name: "ui-grid",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-grid {
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  &--border {
    &::before {
      top: 0;
      left: 0;
      width: 1px;
      height: 100%;
      content: "";
      z-index: 1;
      position: absolute;
      transform: scaleX(0.5);
      background-color: var(--ui-color-border);
    }

    &::after {
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      content: "";
      z-index: 1;
      position: absolute;
      transform: scaleY(0.5);
      background-color: var(--ui-color-border);
    }
  }
}
</style>
