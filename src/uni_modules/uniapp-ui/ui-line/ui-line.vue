<template>
  <view class="ui-line" :class="[useProps.customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import { computed } from "vue"

import { lineProps, useLineProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-line" })

const props = defineProps(lineProps)
const useProps = useLineProps(props)

const style = computed(() => {
  const style: any = {}
  style.margin = useUnit(useProps.margin)

  if (useProps.vertical) {
    // 垂直线：length 作为高度，thickness 作为边框粗细
    style.width = 0
    style.height = useUnit(useProps.length)
    style.borderLeft = `${useUnit(useProps.thickness)} ${useProps.type} ${useColor(useProps.color)}`
  } else {
    // 水平线：length 作为宽度，thickness 作为边框粗细
    style.width = useUnit(useProps.length)
    style.height = 0
    style.borderTop = `${useUnit(useProps.thickness)} ${useProps.type} ${useColor(useProps.color)}`
  }

  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
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
