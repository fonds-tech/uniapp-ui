<template>
  <view v-if="show" class="ui-empty" :class="[props.customClass]" :style="[style]">
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
import { emptyProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-empty" })

const props = defineProps(emptyProps)

const style = computed(() => {
  return useStyle({
    margin: useUnit(props.margin),
    padding: useUnit(props.padding),
    ...useStyle(props.customStyle),
  })
})

const iconStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.iconColor)
  style.width = useUnit(props.iconSize || props.iconWidth)
  style.height = useUnit(props.iconSize || props.iconHeight)
  style.fontWeight = props.iconWeight
  return useStyle(style)
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.iconColor)
  style.width = useUnit(props.iconSize || props.iconWidth)
  style.height = useUnit(props.iconSize || props.iconHeight)
  style.fontWeight = props.iconWeight
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
