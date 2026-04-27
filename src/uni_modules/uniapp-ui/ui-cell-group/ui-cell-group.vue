<template>
  <view class="ui-cell-group" :class="[classNames, customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useUnit, useColor, useStyle, useChildren } from "../hooks"
import { cellGroupKey, cellGroupEmits, cellGroupProps } from "./index"

defineOptions({ name: "ui-cell-group" })

const props = defineProps(cellGroupProps)
const emits = defineEmits(cellGroupEmits)

// 收集子组件（ui-cell），建立父子通信关系
const { childrens, linkChildren } = useChildren(cellGroupKey)

// 根节点类名
const classNames = computed(() => ({ "ui-cell-group--inset": props.inset }))

// 根节点样式：背景 / 圆角 / 内外边距通过 CSS var 注入；SCSS 顶部声明默认值
const rootStyle = computed(() => {
  const s: Record<string, string | number | undefined> = {}
  if (props.background) s["--ui-cell-group-background"] = useColor(props.background)
  if (props.radius !== undefined) s["--ui-cell-group-radius"] = useUnit(props.radius)
  if (props.padding !== undefined) s["--ui-cell-group-padding"] = useUnit(props.padding)
  if (props.margin !== undefined) s["--ui-cell-group-margin"] = useUnit(props.margin)
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) })
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
  --ui-cell-group-margin: 0;
  --ui-cell-group-radius: 0;
  --ui-cell-group-padding: 0;
  --ui-cell-group-background: var(--ui-color-background);
  margin: var(--ui-cell-group-margin);
  padding: var(--ui-cell-group-padding);
  overflow: hidden;

  position: relative;
  border-radius: var(--ui-cell-group-radius);
  background-color: var(--ui-cell-group-background);

  // 卡片内嵌模式：默认带圆角 + 横向外间距（iOS 列表卡片风格）
  &--inset {
    --ui-cell-group-margin: var(--ui-spacing-md);
    --ui-cell-group-radius: var(--ui-radius-md);
  }
}
</style>
