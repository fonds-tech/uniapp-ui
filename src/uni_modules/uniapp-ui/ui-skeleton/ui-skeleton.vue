<template>
  <view class="ui-skeleton" :class="[customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { useStyle, useChildren } from "../hooks"
import { skeletonKey, skeletonProps, useSkeletonProps } from "./index"

defineOptions({ name: "ui-skeleton" })

const props = defineProps(skeletonProps)
const useProps = useSkeletonProps(props)

const { linkChildren } = useChildren(skeletonKey)

const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

linkChildren({ props })
</script>

<script lang="ts">
export default {
  name: "ui-skeleton",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-skeleton {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  position: fixed;
  background-color: #ffffff;
}
</style>
