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
import { computed } from "vue"
import { dividerProps } from "./index"
import { useUnit, useColor, useStyle, useHasSlot } from "../hooks"

defineOptions({ name: "ui-divider" })

const props = defineProps(dividerProps)

// 是否有内容（运行期检测 VNode，兼容小程序 slot 函数恒 truthy）
const hasContent = useHasSlot("default")

// 实际使用的线条类型（dashed 快捷属性优先）
const lineType = computed(() => (props.dashed ? "dashed" : props.type))

// 线条粗细：thickness 显式 > hairline 0.5px > 默认 var(--ui-border-width)
const lineWidth = computed(() => {
  if (props.thickness) return useUnit(props.thickness)
  if (props.hairline) return "0.5px"
  return "var(--ui-border-width)"
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
  const s: Record<string, string | number | undefined> = {}
  if (props.margin) s.margin = useUnit(props.margin)
  // 自定义长度
  if (props.length) {
    if (props.direction === "vertical") s.height = useUnit(props.length)
    else s.width = useUnit(props.length)
  }
  return useStyle({ ...s, ...useStyle(props.customStyle) })
})

// 线条样式
const lineStyle = computed(() => {
  const s: Record<string, string | undefined> = {}
  if (props.borderColor) s.borderColor = useColor(props.borderColor)
  s.borderStyle = lineType.value
  if (props.direction === "vertical") s.borderLeftWidth = lineWidth.value
  else s.borderTopWidth = lineWidth.value
  return useStyle(s)
})
</script>

<script lang="ts">
export default {
  name: "ui-divider",
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
    margin: var(--ui-spacing-md) 0;
    align-items: center;
    flex-direction: row;
  }

  // 垂直分割线
  &--vertical {
    height: 1em;
    margin: 0 var(--ui-spacing-sm);
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    vertical-align: middle;
  }

  // 线条
  &__line {
    flex-shrink: 0;
    border-color: var(--ui-color-border-light);
    border-style: solid;
    border-width: 0;
  }

  // 水平线条样式
  &--horizontal &__line {
    flex: 1;
    border-top-width: var(--ui-border-width);
  }

  // 垂直线条样式
  &--vertical &__line {
    height: 100%;
    border-left-width: var(--ui-border-width);
  }

  // 有内容时的样式
  &--with-content &__line {
    flex: 1;
  }

  // 内容容器
  &__content {
    color: var(--ui-color-text-secondary);
    padding: 0 var(--ui-spacing-sm);
    font-size: var(--ui-font-size-md);
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
