<template>
  <view v-if="props.show" class="ui-empty" :class="[props.customClass]" :style="[style]">
    <slot name="icon">
      <image v-if="props.icon" class="ui-empty__icon" :src="props.icon" mode="widthFix" :style="[iconStyle]" />
      <image v-else class="ui-empty__icon" :src="emptyImg" mode="widthFix" :style="[iconStyle]" />
    </slot>
    <slot name="text">
      <text class="ui-empty__text" :style="[textStyle]">{{ props.text }}</text>
    </slot>
    <view class="ui-empty__slot">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
// 默认空状态图片
import emptyImg from "./lib/empty.png"
import { computed } from "vue"
import { emptyProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-empty" })

// 组件 props
const props = defineProps(emptyProps)

// 根节点样式，合并边距和自定义样式
const style = computed(() => {
  return useStyle({
    margin: useUnit(props.margin),
    padding: useUnit(props.padding),
    ...useStyle(props.customStyle),
  })
})

// 图标样式，设置颜色、尺寸等
const iconStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.iconColor)
  style.width = useUnit(props.iconSize || props.iconWidth)
  style.height = useUnit(props.iconSize || props.iconHeight)
  style.fontWeight = props.iconWeight
  return useStyle(style)
})

// 文字样式，设置颜色和字重
const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  style.fontWeight = props.textWeight
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
