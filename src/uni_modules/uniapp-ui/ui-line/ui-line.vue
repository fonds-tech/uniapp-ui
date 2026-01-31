<template>
  <view class="ui-line" :class="[props.customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import { computed } from "vue"

import { lineProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-line" })

// 定义 props
const props = defineProps(lineProps)

// 根节点样式
const style = computed(() => {
  const style: any = {}
  style.margin = useUnit(props.margin)

  if (props.vertical) {
    // 垂直线：length 作为高度，thickness 作为边框粗细
    style.width = 0
    style.height = useUnit(props.length)
    style.borderLeft = `${useUnit(props.thickness)} ${props.type} ${useColor(props.color)}`
  } else {
    // 水平线：length 作为宽度，thickness 作为边框粗细
    style.width = useUnit(props.length)
    style.height = 0
    style.borderTop = `${useUnit(props.thickness)} ${props.type} ${useColor(props.color)}`
  }

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

defineExpose({ name: "ui-line" })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-line {
  display: flex;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
