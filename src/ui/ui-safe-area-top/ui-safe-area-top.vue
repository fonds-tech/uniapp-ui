<template>
  <view class="ui-safe-area-top" :class="[props.customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import { useColor, useStyle, useSystemInfo } from "../hooks"
import { safeAreaTopEmits, safeAreaTopProps } from "./index"

defineOptions({ name: "ui-safe-area-top" })

const props = defineProps(safeAreaTopProps)
const emits = defineEmits(safeAreaTopEmits)
const height = ref(0)
const style = computed(() => {
  const style: any = {}
  style.height = `${height.value}px`
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function resize() {
  const { safeAreaInsets } = useSystemInfo()
  if (safeAreaInsets) {
    height.value = safeAreaInsets.top
    emits("height", safeAreaInsets.top)
  }
}

onBeforeMount(() => resize())
defineExpose({ name: "ui-safe-area-top" })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-safe-area-top {
  width: 100%;
  flex-shrink: 0;
}
</style>
