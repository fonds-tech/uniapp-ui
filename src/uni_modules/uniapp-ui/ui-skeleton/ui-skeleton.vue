<template>
  <view v-if="props.loading" class="ui-skeleton" :class="[customClass]" :style="[style]">
    <slot />
  </view>
  <slot v-else name="content" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { skeletonKey, skeletonProps } from "./index"
import { useUnit, useStyle, useChildren } from "../hooks"

defineOptions({ name: "ui-skeleton" })

const props = defineProps(skeletonProps)
const { linkChildren } = useChildren(skeletonKey)

const style = computed(() => {
  const styles: CSSProperties = {}
  styles["--ui-skeleton-background"] = props.background
  if (props.gap) styles.gap = useUnit(props.gap)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
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
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: var(--ui-skeleton-background);
}
</style>
