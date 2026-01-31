<template>
  <view class="ui-safe-area-bottom" :class="[props.customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue"
import { useColor, useStyle, useSystemInfo } from "../hooks"
import { safeAreaBottomEmits, safeAreaBottomProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-safe-area-bottom" })

// 定义 props 和 emits
const props = defineProps(safeAreaBottomProps)
const emits = defineEmits(safeAreaBottomEmits)

// 安全区域高度
const height = ref(0)

// 根节点样式，设置高度和背景色
const style = computed(() => {
  const style: any = {}
  style.height = `${height.value}px`
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 重新计算安全区域高度
function resize() {
  const { safeAreaInsets } = useSystemInfo()
  if (safeAreaInsets) {
    height.value = Math.max(safeAreaInsets.bottom - 17, 0)
    emits("height", height.value)
  }
}

// 组件挂载前初始化
onBeforeMount(() => resize())

defineExpose({ name: "ui-safe-area-bottom" })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-safe-area-bottom {
  width: 100%;
  flex-shrink: 0;
}
</style>
