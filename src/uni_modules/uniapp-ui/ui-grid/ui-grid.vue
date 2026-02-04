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
  const columnNum = props.columnNum || 4

  // 使用 CSS Grid 布局
  style.display = "grid"
  style.gridTemplateColumns = `repeat(${columnNum}, 1fr)`

  // 有间距时设置 gap
  if (props.gutter) {
    const gutterValue = useUnit(props.gutter)
    style.gap = gutterValue
  }

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 根节点类名
const rootClass = computed(() => {
  const list: string[] = []
  if (props.border && !props.gutter) {
    list.push("ui-grid--border")
  }
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
