<template>
  <view class="ui-space" :class="[classes, props.customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { spaceProps } from "./index"
import { useUnit, useStyle } from "../hooks"

defineOptions({ name: "ui-space" })

const props = defineProps(spaceProps)

// 预设间距大小映射
const sizeMap: Record<string, string> = {
  mini: "var(--ui-spacing-xs, 8rpx)",
  small: "var(--ui-spacing-sm, 16rpx)",
  normal: "var(--ui-spacing-md, 24rpx)",
  large: "var(--ui-spacing-lg, 32rpx)",
}

// 解析间距值
function resolveSize(size: string | number): string {
  if (typeof size === "string" && sizeMap[size]) {
    return sizeMap[size]
  }
  return useUnit(size)
}

// 类名
const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-space--${props.direction}`)
  if (props.wrap) list.push("ui-space--wrap")
  if (props.fill) list.push("ui-space--fill")
  if (props.inline) list.push("ui-space--inline")
  if (props.align) list.push(`ui-space--align-${props.align}`)
  if (props.justify) list.push(`ui-space--justify-${props.justify}`)
  return list
})

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}

  // 计算 gap
  const gapSize = resolveSize(props.size)
  const rowGap = props.gapRow ? resolveSize(props.gapRow) : gapSize
  const colGap = props.gapCol ? resolveSize(props.gapCol) : gapSize

  // 使用 CSS 变量传递间距值给子元素
  ;(style as any)["--ui-space-row-gap"] = rowGap
  ;(style as any)["--ui-space-col-gap"] = colGap

  // 设置 gap（现代浏览器和高版本小程序支持）
  if (props.direction === "vertical") {
    style.gap = rowGap
  } else {
    style.gap = props.wrap ? `${rowGap} ${colGap}` : colGap
  }

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

defineExpose({ name: "ui-space" })
</script>

<script lang="ts">
export default {
  name: "ui-space",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-space {
  display: flex;
  box-sizing: border-box;

  // 方向
  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  // 换行
  &--wrap {
    flex-wrap: wrap;
  }

  // 行内元素
  &--inline {
    display: inline-flex;
  }

  // 填充：MP WXSS 不支持 *，列举常见直接子元素标签
  &--fill {
    > view,
    > text,
    > image,
    > button,
    > navigator,
    > scroll-view,
    > swiper,
    > swiper-item,
    > label,
    > picker,
    > input,
    > textarea {
      flex: 1;
    }
  }

  // 交叉轴对齐
  &--align-start {
    align-items: flex-start;
  }
  &--align-end {
    align-items: flex-end;
  }
  &--align-center {
    align-items: center;
  }
  &--align-baseline {
    align-items: baseline;
  }
  &--align-stretch {
    align-items: stretch;
  }

  // 主轴对齐
  &--justify-start {
    justify-content: flex-start;
  }
  &--justify-end {
    justify-content: flex-end;
  }
  &--justify-center {
    justify-content: center;
  }
  &--justify-space-between {
    justify-content: space-between;
  }
  &--justify-space-around {
    justify-content: space-around;
  }
  &--justify-space-evenly {
    justify-content: space-evenly;
  }
}
</style>
