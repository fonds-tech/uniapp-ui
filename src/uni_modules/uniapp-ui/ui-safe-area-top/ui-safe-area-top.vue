<template>
  <view class="ui-safe-area-top" :class="[props.customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { safeAreaTopProps } from "./index"
import { useColor, useStyle, useSystemInfo } from "../hooks"

defineOptions({ name: "ui-safe-area-top" })

const props = defineProps(safeAreaTopProps)

const systemInfo = useSystemInfo()

const rootStyle = computed(() => {
  const style: CSSProperties = { height: `${systemInfo.statusBarHeight}px` }
  if (props.background) style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
</script>

<script lang="ts">
export default {
  name: "ui-safe-area-top",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
.ui-safe-area-top {
  width: 100%;
}
</style>
