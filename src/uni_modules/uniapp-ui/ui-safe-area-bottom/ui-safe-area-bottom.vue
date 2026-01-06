<template>
  <view class="ui-safe-area-bottom" :class="[useProps.customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue"

import { useColor, useStyle, useSystemInfo } from "../hooks"
import { safeAreaBottomEmits, safeAreaBottomProps, useSafeAreaBottomProps } from "./index"

defineOptions({ name: "ui-safe-area-bottom" })

const props = defineProps(safeAreaBottomProps)
const emits = defineEmits(safeAreaBottomEmits)
const useProps = useSafeAreaBottomProps(props)
const height = ref(0)
const style = computed(() => {
  const style: any = {}
  style.height = `${height.value}px`
  style.background = useColor(useProps.background)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

function resize() {
  const { safeAreaInsets } = useSystemInfo()
  if (safeAreaInsets) {
    height.value = Math.max(safeAreaInsets.bottom - 17, 0)
    emits("height", height.value)
  }
}

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
