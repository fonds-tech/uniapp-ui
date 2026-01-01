<template>
  <view class="ui-row" :class="[useProps.customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { pick } from "lodash-es"
import { rowProps, useRowProps } from "./index"
import { useRect, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-row" })

const props = defineProps(rowProps)
const useProps = useRowProps(props)
const rect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()

const style = computed(() => {
  const style: any = {}
  style.margin = `-${useUnitToPx(useProps.gap || useProps.rowGap) / 2}px -${useUnitToPx(useProps.gap || useProps.colGap) / 2}px`
  switch (useProps.justify) {
    case "start":
    case "end":
      style.justifyContent = `flex-${useProps.justify}`
      break
    case "around":
    case "between":
      style.justifyContent = `space-${useProps.justify}`
      break
    default:
      style.justifyContent = useProps.justify
      break
  }
  switch (useProps.align) {
    case "start":
    case "end":
      style.alignItems = `flex-${useProps.align}`
      break
    default:
      style.alignItems = useProps.align
      break
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
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
