<template>
  <view v-if="show" class="ui-empty" :class="[useProps.customClass]" :style="[style]">
    <slot name="icon">
      <image v-if="icon" class="ui-empty__icon" :src="icon" mode="widthFix" :style="[iconStyle]" />
      <image v-else class="ui-empty__icon" :src="emptyImg" mode="widthFix" :style="[iconStyle]" />
    </slot>
    <slot name="text">
      <text class="ui-empty__text" :style="[textStyle]">{{ text }}</text>
    </slot>
    <view class="ui-empty__slot">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import emptyImg from "./lib/empty.png"
import { emptyProps, useEmptyProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-empty" })

const props = defineProps(emptyProps)
const useProps = useEmptyProps(props)

const style = computed(() => {
  return useStyle({
    margin: useUnit(useProps.margin),
    padding: useUnit(useProps.padding),
    ...useStyle(useProps.customStyle),
  })
})

const iconStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.iconColor)
  style.width = useUnit(useProps.iconSize || useProps.iconWidth)
  style.height = useUnit(useProps.iconSize || useProps.iconHeight)
  style.fontWeight = useProps.iconWeight
  return useStyle(style)
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.iconColor)
  style.width = useUnit(useProps.iconSize || useProps.iconWidth)
  style.height = useUnit(useProps.iconSize || useProps.iconHeight)
  style.fontWeight = useProps.iconWeight
  return useStyle(style)
})
</script>

<script lang="ts">
export default {
  name: "ui-empty",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-empty {
  flex: 1;
  display: flex;
  padding: 96rpx 0;
  align-items: center;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;

  &__icon {
    width: 450rpx;
    height: 280rpx;
  }

  &__text {
    color: var(--ui-color-text-secondary);
    margin-top: var(--ui-spacing-xl);
  }

  &__slot {
    margin-top: var(--ui-spacing-xl);
  }
}
</style>
