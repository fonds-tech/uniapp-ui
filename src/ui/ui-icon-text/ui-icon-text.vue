<template>
  <view class="ui-icon-text" :class="[classs, useProps.customClass]" :style="[style]" @click="click">
    <ui-icon :name="name" :size="size" :color="color" :radius="radius" :weight="weight" :custom-prefix="customPrefix" />
    <text v-if="text" class="icon-text" :style="[textStyle]">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
import { useUnit, useColor, useStyle } from "../hooks"
import { iconTextEmits, iconTextProps, useIconTextProps } from "./index"

defineOptions({ name: "ui-icon-text" })
const props = defineProps(iconTextProps)
const emits = defineEmits(iconTextEmits)
const useProps = useIconTextProps(props)
const style = computed(() => {
  const style: any = {}
  style.borderRadius = useUnit(useProps.radius)
  style.background = useColor(useProps.background)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (useProps.textLeft) list.push("ui-icon-text--left")
  return list
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.textColor)
  style.fontSize = useUnit(useProps.textSize)
  style.fontWeight = useProps.textWeight
  if (useProps.textGap) {
    if (useProps.textLeft) style.marginRight = useUnit(useProps.textGap)
    else style.marginLeft = useUnit(useProps.textGap)
  }
  if (useProps.textLeft) {
    style.marginLeft = "0"
  }
  return useStyle(style)
})

function click() {
  emits("click")
}

defineExpose({ name: "ui-icon-text" })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-icon-text {
  width: max-content;
  display: inline-flex;
  overflow: hidden;
  font-size: inherit;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  &--left {
    flex-direction: row-reverse;

    .ui-icon-text__text {
      margin-left: 0;
      margin-right: 8rpx;
    }
  }

  .icon-text {
    line-height: 1;
    margin-left: 8rpx;
  }
}
</style>
