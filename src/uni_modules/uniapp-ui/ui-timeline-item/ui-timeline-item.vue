<template>
  <view class="ui-timeline-item" :class="[classes, customClass]" :style="[style]" @click="onClick">
    <!-- 左侧内容区域 -->
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

    <!-- 时间线轴 -->
    <view class="ui-timeline-item__axis">
      <view class="ui-timeline-item__line ui-timeline-item__line--before" :style="[lineBeforeStyle]" />
      <view class="ui-timeline-item__dot-wrapper">
        <slot name="dot">
          <view class="ui-timeline-item__dot" :style="[dotStyle]">
            <ui-icon v-if="icon" :name="icon" :size="iconSize" :color="currentIconColor" />
          </view>
        </slot>
      </view>
      <view class="ui-timeline-item__line ui-timeline-item__line--after" :style="[lineAfterStyle]" />
    </view>

    <!-- 右侧内容区域 -->
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

/** 安全的索引值（处理父组件不存在时返回 0） */
const safeIndex = computed(() => Math.max(0, index.value))

/** 是否倒序 */
const isReverse = computed(() => parent?.props.reverse ?? false)

/** 是否为第一个节点（视觉上的第一个） */
const isFirst = computed(() => {
  if (!parent) return true
  if (isReverse.value) {
    return index.value === parent.count.value - 1
  }
  return index.value === 0
})

/** 是否为最后一个节点（视觉上的最后一个） */
const isLast = computed(() => {
  if (!parent) return true
  if (isReverse.value) {
    return index.value === 0
  }
  return index.value === parent.count.value - 1
})

/** 父组件的模式 */
const parentMode = computed(() => parent?.props.mode ?? "left")

/** 当前节点在 alternate 模式下的位置 */
const itemPosition = computed(() => {
  if (props.position) return props.position
  if (parentMode.value === "alternate") {
    return index.value % 2 === 0 ? "left" : "right"
  }
  return parentMode.value === "right" ? "right" : "left"
})

/** 是否为 alternate 模式 */
const isAlternate = computed(() => parentMode.value === "alternate")

/** 左侧内容区域是否有内容（轴在右边时，内容在左边） */
const hasLeftContent = computed(() => itemPosition.value === "right")

/** 右侧内容区域是否有内容（轴在左边时，内容在右边） */
const hasRightContent = computed(() => itemPosition.value === "left")

/** 是否显示左侧区域（alternate 模式下始终显示以保持轴居中，其他模式下只在有内容时显示） */
const showLeftArea = computed(() => {
  if (isAlternate.value) return true
  return hasLeftContent.value
})

/** 是否显示右侧区域（alternate 模式下始终显示以保持轴居中，其他模式下只在有内容时显示） */
const showRightArea = computed(() => {
  if (isAlternate.value) return true
  return hasRightContent.value
})

/** 是否空心节点 */
const isHollow = computed(() => props.hollow)

/** 节点状态类型对应的颜色 */
const typeColorMap: Record<string, string> = {
  primary: "var(--ui-color-primary)",
  success: "var(--ui-color-success)",
  warning: "var(--ui-color-warning)",
  error: "var(--ui-color-error)",
  info: "var(--ui-color-info)",
}

/** 组件容器样式 */
const style = computed(() => {
  const style: CSSProperties = {}
  // 节点尺寸：优先使用 item 的 dotSize，否则使用 parent 的 dotSize
  const dotSize = props.dotSize ?? parent?.props.dotSize
  if (dotSize) {
    style["--ui-timeline-dot-size"] = useUnit(dotSize)
  }
  // 图标尺寸
  const iconSize = parent?.props.iconSize
  if (iconSize) {
    style["--ui-timeline-icon-size"] = useUnit(iconSize)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

/** 组件容器类名 */
const classes = computed(() => {
  const list: string[] = []
  if (isFirst.value) {
    list.push("ui-timeline-item--first")
  }
  if (isLast.value) {
    list.push("ui-timeline-item--last")
  }
  if (isAlternate.value) {
    list.push("ui-timeline-item--alternate")
  }
  if (isHollow.value) {
    list.push("ui-timeline-item--hollow")
  }
  if (props.type) {
    list.push(`ui-timeline-item--${props.type}`)
  }
  list.push(`ui-timeline-item--${itemPosition.value}`)
  return list
})

/** 图标大小 */
const iconSize = computed(() => {
  if (parent?.props.iconSize) return useUnit(parent.props.iconSize)
  return "var(--ui-timeline-icon-size, 28rpx)"
})

/** 当前图标颜色 */
const currentIconColor = computed(() => {
  if (props.iconColor) return useColor(props.iconColor)
  // 空心节点时图标颜色跟随节点颜色
  if (isHollow.value) return currentDotColor.value
  return "#fff"
})

/** 当前节点颜色 */
const currentDotColor = computed(() => {
  if (props.dotColor) return useColor(props.dotColor)
  if (props.type) return typeColorMap[props.type] ?? "var(--ui-color-primary)"
  if (props.iconColor) return useColor(props.iconColor)
  return "var(--ui-color-primary)"
})

/** 父组件的线条颜色 */
const parentLineColor = computed(() => {
  if (parent?.props.lineColor) return useColor(parent.props.lineColor)
  return "var(--ui-color-border)"
})

/** 父组件的线条样式 */
const parentLineStyle = computed(() => parent?.props.lineStyle ?? "solid")

/** 节点样式 */
const dotStyle = computed(() => {
  const style: CSSProperties = {}
  if (isHollow.value) {
    // 空心节点：透明背景 + 边框颜色
    style.backgroundColor = "transparent"
    style.borderColor = currentDotColor.value
  } else {
    // 实心节点
    style.backgroundColor = currentDotColor.value
    if (!props.icon) {
      style.borderColor = currentDotColor.value
    }
  }
  return useStyle(style)
})

/** 线条基础样式 */
const lineBaseStyle = computed(() => {
  const style: CSSProperties = {}
  style.backgroundColor = parentLineColor.value
  // 虚线样式需要用 border 实现
  if (parentLineStyle.value !== "solid") {
    style.backgroundColor = "transparent"
    style.borderLeftStyle = parentLineStyle.value as "dashed" | "dotted"
    style.borderLeftWidth = "var(--ui-timeline-line-width)"
    style.borderLeftColor = parentLineColor.value
  }
  return style
})

/** 前连接线样式（第一个节点隐藏） */
const lineBeforeStyle = computed(() => {
  const style: CSSProperties = { ...lineBaseStyle.value }
  if (isFirst.value) {
    style.visibility = "hidden"
  }
  return useStyle(style)
})

/** 后连接线样式（最后一个节点隐藏） */
const lineAfterStyle = computed(() => {
  const style: CSSProperties = { ...lineBaseStyle.value }
  if (isLast.value) {
    style.visibility = "hidden"
  }
  return useStyle(style)
})

/** 点击事件处理 */
function onClick() {
  emits("click", safeIndex.value)
  parent?.onClickItem(safeIndex.value)
}

defineExpose({ props, index: safeIndex })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-timeline-item {
  // CSS 变量定义
  --ui-timeline-dot-size: 24rpx;
  --ui-timeline-item-gap: 24rpx;
  --ui-timeline-icon-size: 28rpx;
  --ui-timeline-axis-width: 48rpx;
  --ui-timeline-line-width: 2rpx;
  --ui-timeline-content-gap: 24rpx;
  --ui-timeline-desc-font-size: 26rpx;
  --ui-timeline-time-font-size: 24rpx;
  --ui-timeline-title-font-size: 28rpx;

  display: flex;
  position: relative;

  &--left,
  &--right {
    flex-direction: row;
  }

  &__axis {
    width: var(--ui-timeline-axis-width);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: flex-start;
  }

  &__line {
    width: var(--ui-timeline-line-width);
    background-color: var(--ui-color-border);

    &--before {
      // 上方线条固定高度，使 dot 与内容第一行文字垂直居中对齐
      // 计算：(行高 - dot高度) / 2 ≈ (24rpx * 1.4 - 24rpx) / 2 ≈ 5rpx
      height: calc((var(--ui-timeline-time-font-size) * 1.4 - var(--ui-timeline-dot-size)) / 2);
      flex-shrink: 0;
    }

    &--after {
      // 下方线条延伸填满剩余空间
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
    width: var(--ui-timeline-dot-size);
    border: 2rpx solid var(--ui-color-primary);
    height: var(--ui-timeline-dot-size);
    display: flex;
    align-items: center;
    border-radius: 50%;
    justify-content: center;
    background-color: var(--ui-color-primary);
  }

  &__content {
    &--left,
    &--right {
      flex: 1;
      display: flex;
      padding: 0 var(--ui-timeline-content-gap) var(--ui-timeline-item-gap);
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
    font-size: var(--ui-timeline-time-font-size);
    line-height: 1.4;
    margin-bottom: 8rpx;
  }

  &__title {
    color: var(--ui-color-text-primary);
    font-size: var(--ui-timeline-title-font-size);
    font-weight: 500;
    line-height: 1.4;
  }

  &__description {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-timeline-desc-font-size);
    margin-top: 8rpx;
    line-height: 1.5;
  }

  &--last {
    .ui-timeline-item__content--left,
    .ui-timeline-item__content--right {
      padding-bottom: 0;
    }
  }

  // 空心节点样式
  &--hollow {
    .ui-timeline-item__dot {
      background-color: transparent;
    }
  }

  // 状态类型颜色
  &--success .ui-timeline-item__dot {
    border-color: var(--ui-color-success);
    background-color: var(--ui-color-success);
  }

  &--warning .ui-timeline-item__dot {
    border-color: var(--ui-color-warning);
    background-color: var(--ui-color-warning);
  }

  &--error .ui-timeline-item__dot {
    border-color: var(--ui-color-error);
    background-color: var(--ui-color-error);
  }

  &--info .ui-timeline-item__dot {
    border-color: var(--ui-color-info);
    background-color: var(--ui-color-info);
  }

  // 空心 + 状态类型组合
  &--hollow.ui-timeline-item--success .ui-timeline-item__dot,
  &--hollow.ui-timeline-item--warning .ui-timeline-item__dot,
  &--hollow.ui-timeline-item--error .ui-timeline-item__dot,
  &--hollow.ui-timeline-item--info .ui-timeline-item__dot,
  &--hollow.ui-timeline-item--primary .ui-timeline-item__dot {
    background-color: transparent;
  }
}
</style>
