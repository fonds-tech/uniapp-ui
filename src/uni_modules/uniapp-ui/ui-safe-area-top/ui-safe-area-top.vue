<template>
  <view class="ui-safe-area-top" :class="[customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { safeAreaTopProps } from "./index"
import { useStyle, useSystemInfo } from "../hooks"

defineOptions({ name: "ui-safe-area-top" })

// 组件 props
const props = defineProps(safeAreaTopProps)

// 系统信息，包含状态栏高度等
const systemInfo = useSystemInfo()

// 组件样式对象，计算状态栏高度和背景色
const style = computed((): CSSProperties => {
  // 解构获取状态栏高度
  const { statusBarHeight } = systemInfo
  // 基础样式对象
  const style: CSSProperties = {}
  // 设置高度为状态栏高度
  style.height = `${statusBarHeight}px`
  // 设置背景颜色
  style.background = props.background
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 暴露组件名称供外部使用
defineExpose({ name: "ui-safe-area-top" })
</script>

<script lang="ts">
export default {
  name: "ui-safe-area-top",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-safe-area-top {
  width: 100%;
}
</style>
