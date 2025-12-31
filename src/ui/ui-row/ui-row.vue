<template>
  <view class="ui-row" :class="[props.customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { pick } from "lodash-es"
import { rowProps } from "./index"
import { useRect, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-row" })

const props = defineProps(rowProps)
const rect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()

const style = computed(() => {
  const style: any = {}
  style.margin = `-${useUnitToPx(props.gap || props.rowGap) / 2}px -${useUnitToPx(props.gap || props.colGap) / 2}px`
  switch (props.justify) {
    case "start":
    case "end":
      style.justifyContent = `flex-${props.justify}`
      break
    case "around":
    case "between":
      style.justifyContent = `space-${props.justify}`
      break
    default:
      style.justifyContent = props.justify
      break
  }
  switch (props.align) {
    case "start":
    case "end":
      style.alignItems = `flex-${props.align}`
      break
    default:
      style.alignItems = props.align
      break
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function resize() {
  nextTick(async () => {
    rect.value = await useRect(".ui-row", instance)
  })
}

onMounted(() => resize())
provide("ui-row", { ...pick(toRefs(props), ["gap", "colGap", "rowGap"]) })
defineExpose({ name: "ui-row", resize })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
