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

// 收集子组件
const { linkChildren } = useChildren(gridKey)

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  // 设置间距
  if (props.gutter) {
    const gutterValue = useUnit(props.gutter)
    style.paddingLeft = gutterValue
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 根节点类名
const rootClass = computed(() => {
  const list: string[] = []
  if (props.border && !props.gutter) list.push("ui-grid--border")
  return list
})

// 建立父子组件关联
linkChildren({ props })

defineExpose({ name: "ui-grid" })
</script>

<script lang="ts">
export default {
  name: "ui-grid",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-grid {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;

  &--border {
    &::after {
      top: 0;
      left: 0;
      right: 0;
      border: var(--ui-border-width) solid var(--ui-color-border);
      bottom: 0;
      content: "";
      position: absolute;
      box-sizing: border-box;
      border-radius: inherit;
      pointer-events: none;
    }
    position: relative;
  }
}
</style>
