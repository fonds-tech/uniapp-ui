<template>
  <view v-if="props.show" class="ui-empty" :class="[props.customClass]" :style="[style]">
    <slot name="icon">
      <image v-if="iconAsImage" class="ui-empty__icon" :src="iconAsImage" mode="widthFix" :style="[iconImageStyle]" />
      <ui-icon v-else class="ui-empty__icon" :name="props.icon" :size="useUnit(props.iconSize)" :color="useColor(props.iconColor)" :weight="props.iconWeight" />
    </slot>
    <slot name="text">
      <text class="ui-empty__text" :style="[textStyle]">{{ props.text }}</text>
    </slot>
    <view v-if="$slots.footer" class="ui-empty__footer">
      <slot name="footer" />
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

// icon 解析：含 / 或 . = 图片 URL；空 = 默认 emptyImg；否则 = ui-icon 名（返回空走 ui-icon 分支）
const iconAsImage = computed<string>(() => {
  if (!props.icon) return emptyImg
  if (props.icon.includes("/") || props.icon.includes(".")) return props.icon
  return ""
})

// 图片模式样式（仅 image 分支用，width 控制，height 由 widthFix 自适应）
const iconImageStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.iconSize)
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
  padding: var(--ui-spacing-xxl) 0;
  align-items: center;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-md);
    margin-top: var(--ui-spacing-xl);
  }

  &__footer {
    margin-top: var(--ui-spacing-xl);
  }
}
</style>
