<template>
  <view class="ui-divider" :class="[classes, props.customClass]" :style="[style]">
    <!-- 水平分割线时显示插槽内容 -->
    <template v-if="props.direction === 'horizontal' && hasContent">
      <view class="ui-divider__line ui-divider__line--left" :style="[lineStyle]" />
      <view class="ui-divider__content">
        <slot />
      </view>
      <view class="ui-divider__line ui-divider__line--right" :style="[lineStyle]" />
    </template>
    <!-- 垂直分割线或无内容的水平分割线 -->
    <template v-else>
      <view class="ui-divider__line" :style="[lineStyle]" />
    </template>
  </view>
</template>

<script setup lang="ts">
import { dividerProps } from "./index"
import { computed, useSlots } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-divider" })

// 定义 props
const props = defineProps(dividerProps)

// 获取插槽
const slots = useSlots()

// 是否有内容
const hasContent = computed(() => !!slots.default)

// 实际使用的线条类型（dashed 快捷属性优先）
const lineType = computed(() => (props.dashed ? "dashed" : props.type))

// 线条粗细（thickness 优先级高于 hairline）
const lineWidth = computed(() => {
  if (props.thickness) return useUnit(props.thickness)
  return props.hairline ? "0.5px" : "1px"
})

// 类名数组
const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-divider--${props.direction}`)
  if (hasContent.value) {
    list.push(`ui-divider--with-content`)
    list.push(`ui-divider--content-${props.contentPosition}`)
  }
  // 仅在未设置 thickness 时应用 hairline 缩放
  if (props.hairline && !props.thickness) list.push("ui-divider--hairline")
  return list
})

// 根节点样式
const style = computed(() => {
  const style: any = {}
  if (props.margin) {
    style.margin = useUnit(props.margin)
  }
  // 自定义长度
  if (props.length) {
    if (props.direction === "vertical") {
      style.height = useUnit(props.length)
    } else {
      style.width = useUnit(props.length)
    }
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 线条样式
const lineStyle = computed(() => {
  const style: any = {}
  if (props.borderColor) {
    style.borderColor = useColor(props.borderColor)
  }
  style.borderStyle = lineType.value
  if (props.direction === "vertical") {
    style.borderLeftWidth = lineWidth.value
  } else {
    style.borderTopWidth = lineWidth.value
  }
  return useStyle(style)
})

defineExpose({ name: "ui-divider" })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-divider {
  display: flex;
  box-sizing: border-box;
  flex-shrink: 0;

  // 水平分割线
  &--horizontal {
    width: 100%;
    margin: 24rpx 0;
    align-items: center;
    flex-direction: row;
  }

  // 垂直分割线
  &--vertical {
    height: 1em;
    margin: 0 16rpx;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    vertical-align: middle;
  }

  // 线条
  &__line {
    flex-shrink: 0;
    border-color: var(--ui-color-border, #ebedf0);
    border-style: solid;
    border-width: 0;
  }

  // 水平线条样式
  &--horizontal &__line {
    flex: 1;
    border-top-width: 1px;
  }

  // 垂直线条样式
  &--vertical &__line {
    height: 100%;
    border-left-width: 1px;
  }

  // 有内容时的样式
  &--with-content &__line {
    flex: 1;
  }

  // 内容容器
  &__content {
    color: var(--ui-color-text-secondary, #969799);
    padding: 0 16rpx;
    font-size: var(--ui-font-size-md, 28rpx);
    white-space: nowrap;
  }

  // 内容位置 - 左侧
  &--content-left &__line--left {
    flex: 0 0 10%;
    max-width: 10%;
  }

  // 内容位置 - 右侧
  &--content-right &__line--right {
    flex: 0 0 10%;
    max-width: 10%;
  }

  // 细线样式（0.5px 在某些设备上可能需要 transform 缩放）
  &--hairline &__line {
    transform: scaleY(0.5);
  }

  &--hairline#{&}--vertical &__line {
    transform: scaleX(0.5);
  }
}
</style>
