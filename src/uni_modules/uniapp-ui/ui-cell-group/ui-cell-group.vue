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

// 组件 props 定义
const props = defineProps(cellGroupProps)
// 组件 emits 定义
const emits = defineEmits(cellGroupEmits)

// 收集子组件（ui-cell），建立父子通信关系
const { childrens, linkChildren } = useChildren(cellGroupKey)

// 根节点样式对象，合并背景色、圆角和自定义样式
const style = computed(() => {
  const style: CSSProperties = {}
  // 设置背景色
  style.background = useColor(props.background)
  // 设置圆角
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 建立父子组件关联，将 props 和子组件列表传递给子组件
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
