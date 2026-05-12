<template>
  <view class="ui-timeline-item" :class="[classNames, customClass]" :style="[rootStyle]" @click="onClick">
    <view v-if="showLeftArea" class="ui-timeline-item__content--left">
      <template v-if="hasLeftContent">
        <slot name="time" :time="time">
          <view v-if="time" class="ui-timeline-item__time">{{ time }}</view>
        </slot>
        <slot name="title" :title="title">
          <view v-if="title" class="ui-timeline-item__title">{{ title }}</view>
        </slot>
        <slot name="description" :description="description">
          <view v-if="description" class="ui-timeline-item__description">{{ description }}</view>
        </slot>
        <slot />
      </template>
    </view>

    <view class="ui-timeline-item__axis">
      <view class="ui-timeline-item__line ui-timeline-item__line--before" :style="[lineBeforeStyle]" />
      <view class="ui-timeline-item__dot-wrapper">
        <slot name="dot">
          <view class="ui-timeline-item__dot" :style="[dotStyle]">
            <ui-icon v-if="icon" :name="icon" :size="iconSize" :color="iconCurrentColor" />
          </view>
        </slot>
      </view>
      <view class="ui-timeline-item__line ui-timeline-item__line--after" :style="[lineAfterStyle]" />
    </view>

    <view v-if="showRightArea" class="ui-timeline-item__content--right">
      <template v-if="hasRightContent">
        <slot name="time" :time="time">
          <view v-if="time" class="ui-timeline-item__time">{{ time }}</view>
        </slot>
        <slot name="title" :title="title">
          <view v-if="title" class="ui-timeline-item__title">{{ title }}</view>
        </slot>
        <slot name="description" :description="description">
          <view v-if="description" class="ui-timeline-item__description">{{ description }}</view>
        </slot>
        <slot />
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { timelineKey } from "../ui-timeline"
import { timelineItemEmits, timelineItemProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-timeline-item" })

const props = defineProps(timelineItemProps)
const emits = defineEmits(timelineItemEmits)

const { parent, index } = useParent(timelineKey)

// 父级 mode
const parentMode = computed(() => parent?.props.mode ?? "left")
// 是否倒序
const isReverse = computed(() => parent?.props.reverse ?? false)
// 是否首项（视觉）
const isFirst = computed(() => {
  if (!parent) return true
  return isReverse.value ? index.value === parent.count.value - 1 : index.value === 0
})
// 是否末项（视觉）
const isLast = computed(() => {
  if (!parent) return true
  return isReverse.value ? index.value === 0 : index.value === parent.count.value - 1
})
// 是否 alternate 模式
const isAlternate = computed(() => parentMode.value === "alternate")
// 当前项轴位置
const itemPosition = computed(() => {
  if (props.position) return props.position
  if (isAlternate.value) {
    // reverse 后视觉索引取反，保持交替规律
    const visualIndex = isReverse.value && parent ? parent.count.value - 1 - index.value : index.value
    return visualIndex % 2 === 0 ? "left" : "right"
  }
  return parentMode.value === "right" ? "right" : "left"
})
// 内容在左侧（轴在右）
const hasLeftContent = computed(() => itemPosition.value === "right")
// 内容在右侧（轴在左）
const hasRightContent = computed(() => itemPosition.value === "left")
// alternate 总是渲染两侧占位以保持轴居中
const showLeftArea = computed(() => isAlternate.value || hasLeftContent.value)
const showRightArea = computed(() => isAlternate.value || hasRightContent.value)
// 节点颜色（dotColor > type > iconColor > primary）
const dotCurrentColor = computed(() => {
  if (props.dotColor) return useColor(props.dotColor)
  if (props.type) return useColor(props.type)
  if (props.iconColor) return useColor(props.iconColor)
  return "var(--ui-color-primary)"
})
// 图标颜色（iconColor > 空心跟节点 > 反白）
const iconCurrentColor = computed(() => {
  if (props.iconColor) return useColor(props.iconColor)
  if (props.hollow) return dotCurrentColor.value
  return "var(--ui-color-text-inverse)"
})
// 图标尺寸（item 不接 iconSize，复用父级或默认 var；带 fallback 兜底）
const iconSize = computed(() => {
  if (parent?.props.iconSize !== undefined) return useUnit(parent.props.iconSize)
  return "var(--ui-timeline-item-icon-size, 28rpx)"
})

// 根节点样式
const rootStyle = computed(() => {
  const vars: CSSProperties = {}
  if (props.dotSize !== undefined) vars["--ui-timeline-item-dot-size" as keyof CSSProperties] = useUnit(props.dotSize) as never
  vars["--ui-timeline-item-dot-color" as keyof CSSProperties] = dotCurrentColor.value as never
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})
// 根节点类名
const classNames = computed(() => {
  const list: string[] = []
  if (isFirst.value) list.push("ui-timeline-item--first")
  if (isLast.value) list.push("ui-timeline-item--last")
  if (isAlternate.value) list.push("ui-timeline-item--alternate")
  if (props.hollow) list.push("ui-timeline-item--hollow")
  if (props.type) list.push(`ui-timeline-item--${props.type}`)
  list.push(`ui-timeline-item--${itemPosition.value}`)
  return list
})
// 节点 inline 样式
const dotStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.hollow) {
    style.backgroundColor = "transparent"
    style.borderColor = dotCurrentColor.value
  } else {
    style.backgroundColor = dotCurrentColor.value
    if (!props.icon) style.borderColor = dotCurrentColor.value
  }
  return useStyle(style)
})
// 线条基础样式（虚线走 border）
const lineBaseStyle = computed(() => {
  const lineStyle = parent?.props.lineStyle ?? "solid"
  const style: CSSProperties = {}
  if (lineStyle !== "solid") {
    style.backgroundColor = "transparent"
    style.borderLeftStyle = lineStyle as "dashed" | "dotted"
    style.borderLeftWidth = "var(--ui-timeline-item-line-width)"
    style.borderLeftColor = "var(--ui-timeline-item-line-color)"
  }
  return style
})
// 前连接线（首项隐藏）
const lineBeforeStyle = computed(() => {
  const style: CSSProperties = { ...lineBaseStyle.value }
  if (isFirst.value) style.opacity = 0
  return useStyle(style)
})
// 后连接线（末项隐藏）
const lineAfterStyle = computed(() => {
  const style: CSSProperties = { ...lineBaseStyle.value }
  if (isLast.value) style.opacity = 0
  return useStyle(style)
})

// 点击
function onClick() {
  const i = index.value < 0 ? 0 : index.value
  emits("click", i)
  parent?.onClickItem(i)
}
</script>

<script lang="ts">
export default {
  name: "ui-timeline-item",
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
// 默认值不在 .ui-timeline-item 选择器内重声明 var，避免覆盖父级 .ui-timeline cascade
// 所有 consumer 通过 var(name, fallback) 内联兜底
.ui-timeline-item {
  display: flex;
  position: relative;

  &--left,
  &--right {
    flex-direction: row;
  }

  &__axis {
    width: var(--ui-timeline-item-axis-width, 48rpx);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: flex-start;
  }

  &__line {
    width: var(--ui-timeline-item-line-width, 2rpx);
    background-color: var(--ui-timeline-item-line-color, var(--ui-color-border));

    &--before {
      // 上方线条固定高度：(行高 - dot 高) / 2，使 dot 与首行文字垂直对齐
      height: calc((var(--ui-timeline-item-time-font-size, var(--ui-font-size-xs)) * 1.4 - var(--ui-timeline-item-dot-size, 24rpx)) / 2);
      flex-shrink: 0;
    }

    &--after {
      flex: 1;
      min-height: 16rpx;
    }
  }

  &__dot-wrapper {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
  }

  &__dot {
    width: var(--ui-timeline-item-dot-size, 24rpx);
    border: var(--ui-border-width) solid var(--ui-timeline-item-dot-color, var(--ui-color-primary));
    height: var(--ui-timeline-item-dot-size, 24rpx);
    display: flex;
    align-items: center;
    border-radius: 50%;
    justify-content: center;
    background-color: var(--ui-timeline-item-dot-color, var(--ui-color-primary));
  }

  &__content {
    &--left,
    &--right {
      flex: 1;
      display: flex;
      padding: 0 var(--ui-timeline-item-content-gap, 24rpx) var(--ui-timeline-item-gap, 24rpx);
      flex-direction: column;
      justify-content: flex-start;
    }

    &--left {
      text-align: right;
    }

    &--right {
      text-align: left;
    }
  }

  &__time {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-timeline-item-time-font-size, var(--ui-font-size-xs));
    line-height: 1.4;
    margin-bottom: var(--ui-spacing-xs);
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-timeline-item-title-font-size, var(--ui-font-size-sm));
    font-weight: var(--ui-font-weight-medium);
    line-height: 1.4;
  }

  &__description {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-timeline-item-desc-font-size, var(--ui-font-size-xs));
    margin-top: var(--ui-spacing-xs);
    line-height: var(--ui-line-height-normal);
  }

  &--last {
    .ui-timeline-item__content--left,
    .ui-timeline-item__content--right {
      padding-bottom: 0;
    }
  }
}
</style>
