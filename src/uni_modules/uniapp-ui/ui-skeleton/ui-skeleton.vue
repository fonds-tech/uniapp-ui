<template>
  <view v-if="props.loading" class="ui-skeleton" :class="[customClass]" :style="[style]">
    <slot />
  </view>
  <slot v-else name="content" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { skeletonKey, skeletonProps } from "./index"
import { useUnit, useStyle, useChildren } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-skeleton" })

// 定义 props
const props = defineProps(skeletonProps)

// 收集子组件（骨架屏子元素）
const { linkChildren } = useChildren(skeletonKey)

// 根节点样式，设置背景色和间距
const style = computed(() => {
  const styles: CSSProperties = {}
  // 设置骨架屏背景色
  styles["--ui-skeleton-background"] = props.background
  // 设置子元素间距
  if (props.gap) styles.gap = useUnit(props.gap)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

// 建立父子组件关联
linkChildren({ props })
</script>

<script lang="ts">
export default {
  name: "ui-skeleton",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-skeleton {
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: var(--ui-skeleton-background);
}
</style>
