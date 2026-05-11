<template>
  <view class="ui-skeleton-avatar" :class="[classNames, customClass]" :style="[rootStyle]" />
</template>

<script setup lang="ts">
import { computed } from "vue"
import { skeletonKey } from "../ui-skeleton"
import { skeletonAvatarProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-skeleton-avatar" })

const props = defineProps(skeletonAvatarProps)
const { parent } = useParent(skeletonKey)

const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.size) vars["--ui-skeleton-avatar-size"] = useUnit(props.size)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})

const classNames = computed(() => {
  const list: string[] = [`ui-skeleton-avatar--${props.shape}`]
  if (parent?.props?.animate) list.push("ui-skeleton-avatar--animate")
  return list
})
</script>

<script lang="ts">
export default {
  name: "ui-skeleton-avatar",
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
.ui-skeleton-avatar {
  --ui-skeleton-avatar-size: var(--ui-size-lg);

  width: var(--ui-skeleton-avatar-size);
  height: var(--ui-skeleton-avatar-size);
  position: relative;
  background: var(--ui-skeleton-block, var(--ui-color-background-section));
  flex-shrink: 0;

  &--round {
    border-radius: var(--ui-radius-round);
  }

  &--square {
    border-radius: var(--ui-radius-md);
  }

  &--animate {
    animation: ui-skeleton-shimmer var(--ui-skeleton-animation-duration, 1.5s) ease-in-out infinite;
    background: linear-gradient(
      90deg,
      var(--ui-skeleton-block, var(--ui-gray-3)) 25%,
      var(--ui-skeleton-highlight, var(--ui-gray-2)) 50%,
      var(--ui-skeleton-block, var(--ui-gray-3)) 75%
    );
    background-size: 400% 100%;
  }
}
</style>
