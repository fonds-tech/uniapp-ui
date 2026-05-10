<template>
  <view class="ui-safe-area-bottom" :class="[props.customClass]" :style="[rootStyle]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { ref, computed, onBeforeMount } from "vue"
import { useColor, useStyle, useSystemInfo } from "../hooks"
import { safeAreaBottomEmits, safeAreaBottomProps } from "./index"

defineOptions({ name: "ui-safe-area-bottom" })

const props = defineProps(safeAreaBottomProps)
const emits = defineEmits(safeAreaBottomEmits)

const height = ref(0)

const rootStyle = computed(() => {
  const style: CSSProperties = { height: `${height.value}px` }
  if (props.background) style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

function resize() {
  const { safeAreaInsets } = useSystemInfo()
  if (!safeAreaInsets) return
  // -17 经验值: home indicator 视觉小条占 17px，扣除后剩余为内容可呼吸的真正安全区
  height.value = Math.max(safeAreaInsets.bottom - 17, 0)
  emits("height", height.value)
}

onBeforeMount(resize)

defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-safe-area-bottom",
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
.ui-safe-area-bottom {
  width: 100%;
  flex-shrink: 0;
}
</style>
