<template>
  <view class="ui-line" :class="[props.customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import { lineProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-line" })

const props = defineProps(lineProps)

const style = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.margin = useUnit(props.margin)
  if (props.vertical) {
    style.borderLeft = `${useUnit(props.width)} ${props.type} ${useColor(props.color)}`
  } else {
    style.borderTop = `${useUnit(props.height)} ${props.type} ${useColor(props.color)}`
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
