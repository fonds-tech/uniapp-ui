<template>
  <view v-if="props.loading" class="ui-skeleton" :class="[customClass]" :style="[rootStyle]">
    <slot />
  </view>
  <slot v-else name="content" />
</template>

<script setup lang="ts">
import { isDef } from "../utils/check"
import { computed } from "vue"
import { skeletonKey, skeletonProps } from "./index"
import { useUnit, useColor, useStyle, useChildren } from "../hooks"

defineOptions({ name: "ui-skeleton" })

const props = defineProps(skeletonProps)
const { linkChildren } = useChildren(skeletonKey)

// 根节点 CSS var 注入 + 子项间距
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.background) vars["--ui-skeleton-background"] = useColor(props.background)
  if (props.duration) vars["--ui-skeleton-animation-duration"] = props.duration
  if (isDef(props.gap)) vars.gap = useUnit(props.gap)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})

linkChildren({ props })
</script>

<script lang="ts">
export default {
  name: "ui-skeleton",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-skeleton {
  --ui-skeleton-block: var(--ui-gray-3);
  --ui-skeleton-highlight: var(--ui-gray-2);
  --ui-skeleton-background: var(--ui-color-background);
  --ui-skeleton-animation-duration: 1.5s;

  width: 100%;
  display: flex;
  position: relative;
  background: var(--ui-skeleton-background);
  flex-direction: column;
}

@keyframes ui-skeleton-shimmer {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: -100% 50%;
  }
}
</style>
