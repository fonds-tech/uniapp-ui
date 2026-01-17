<template>
  <view class="ui-arc" :class="[customClass]" :style="[style]" @click="onClick">
    <view class="ui-arc__inner" :style="[innerStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { arcEmits, arcProps, useArcProps } from "./index"

const props = defineProps(arcProps)
const emits = defineEmits(arcEmits)
const useProps = useArcProps(props)

const width = computed(() => Math.max(Number(useProps.percent), 100))
const widthOffset = computed(() => (width.value - 100) / 2)

const style = computed(() => {
  const result: CSSProperties = {
    top: useUnit(useProps.top),
    left: useUnit(useProps.left),
    height: useUnit(useProps.height),
    zIndex: useProps.zIndex,
  }
  if (useProps.fixed) result.position = "fixed"
  return useStyle({ ...result, ...useStyle(useProps.customStyle) })
})

const innerStyle = computed(() => {
  const offset = `${widthOffset.value}%`
  const result: CSSProperties = {
    height: useUnit(useProps.height),
    left: `-${offset}`,
    right: `-${offset}`,
    paddingLeft: offset,
    paddingRight: offset,
    background: useColor(useProps.background),
  }
  return useStyle(result)
})

function onClick() {
  emits("click")
}
</script>

<script lang="ts">
export default {
  name: "ui-arc",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-arc {
  width: 100%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  &__inner {
    top: 0;
    overflow: hidden;
    position: absolute;
    border-radius: 0 0 100% 100%;
    background-color: var(--ui-color-primary);
  }
}
</style>
