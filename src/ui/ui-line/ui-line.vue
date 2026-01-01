<template>
  <view class="ui-line" :class="[useProps.customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import { lineProps, useLineProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-line" })

const props = defineProps(lineProps)
const useProps = useLineProps(props)

const style = computed(() => {
  const style: any = {}
  style.width = useUnit(useProps.width)
  style.height = useUnit(useProps.height)
  style.margin = useUnit(useProps.margin)
  if (useProps.vertical) {
    style.borderLeft = `${useUnit(useProps.width)} ${useProps.type} ${useColor(useProps.color)}`
  } else {
    style.borderTop = `${useUnit(useProps.height)} ${useProps.type} ${useColor(useProps.color)}`
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
