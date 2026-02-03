<template>
  <view class="ui-timeline-item" :class="[classes, customClass]" :style="[style]" @click="onClick">
    <!-- 左侧内容区域（alternate 模式且位置为 left 时显示） -->
    <view v-if="showLeftContent" class="ui-timeline-item__content--left">
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

    <!-- 右侧内容区域（默认或 alternate 模式且位置为 right 时显示） -->
    <view v-if="showRightContent" class="ui-timeline-item__content--right">
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
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { timelineKey } from "../ui-timeline"
import { useColor, useStyle, useParent } from "../hooks"
import { timelineItemEmits, timelineItemProps } from "./index"

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
  if (isReverse.value) {
    return index.value === parent!.count.value - 1
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

/** 是否显示左侧内容（alternate 模式且位置为 left） */
const showLeftContent = computed(() => {
  return parentMode.value === "alternate" && itemPosition.value === "left"
})

/** 是否显示右侧内容（非 alternate 模式或位置为 right） */
const showRightContent = computed(() => {
  return parentMode.value !== "alternate" || itemPosition.value === "right"
})

/** 组件容器样式 */
const style = computed(() => {
  const style: CSSProperties = {}
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
  list.push(`ui-timeline-item--${itemPosition.value}`)
  return list
})

/** 图标大小 */
const iconSize = computed(() => "28rpx")

/** 当前图标颜色 */
const currentIconColor = computed(() => {
  if (props.iconColor) return useColor(props.iconColor)
  return "#fff"
})

/** 当前节点颜色 */
const currentDotColor = computed(() => {
  if (props.dotColor) return useColor(props.dotColor)
  if (props.iconColor) return useColor(props.iconColor)
  return "var(--ui-color-primary)"
})

/** 父组件的线条颜色 */
const parentLineColor = computed(() => {
  if (parent?.props.lineColor) return useColor(parent.props.lineColor)
  return "var(--ui-color-border)"
})

/** 节点样式 */
const dotStyle = computed(() => {
  const style: CSSProperties = {}
  style.backgroundColor = currentDotColor.value
  if (!props.icon) {
    style.borderColor = currentDotColor.value
  }
  return useStyle(style)
})

/** 前连接线样式（第一个节点隐藏） */
const lineBeforeStyle = computed(() => {
  const style: CSSProperties = {}
  if (isFirst.value) {
    style.visibility = "hidden"
  }
  style.backgroundColor = parentLineColor.value
  return useStyle(style)
})

/** 后连接线样式（最后一个节点隐藏） */
const lineAfterStyle = computed(() => {
  const style: CSSProperties = {}
  if (isLast.value) {
    style.visibility = "hidden"
  }
  style.backgroundColor = parentLineColor.value
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
  display: flex;
  position: relative;

  &--left {
    flex-direction: row-reverse;
  }

  &--right {
    flex-direction: row;
  }

  &__axis {
    width: 48rpx;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-direction: column;
  }

  &__line {
    flex: 1;
    width: 2rpx;
    background-color: var(--ui-color-border);

    &--before {
      min-height: 16rpx;
    }

    &--after {
      min-height: 16rpx;
    }
  }

  &__dot-wrapper {
    display: flex;
    padding: 8rpx 0;
    align-items: center;
    justify-content: center;
  }

  &__dot {
    width: 24rpx;
    border: 2rpx solid var(--ui-color-primary);
    height: 24rpx;
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
      padding: 0 24rpx 24rpx;
      flex-direction: column;
      justify-content: center;
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
    font-size: 24rpx;
    line-height: 1.4;
    margin-bottom: 8rpx;
  }

  &__title {
    color: var(--ui-color-text-primary);
    font-size: 28rpx;
    font-weight: 500;
    line-height: 1.4;
  }

  &__description {
    color: var(--ui-color-text-secondary);
    font-size: 26rpx;
    margin-top: 8rpx;
    line-height: 1.5;
  }

  &--last {
    .ui-timeline-item__content--left,
    .ui-timeline-item__content--right {
      padding-bottom: 0;
    }
  }
}
</style>
