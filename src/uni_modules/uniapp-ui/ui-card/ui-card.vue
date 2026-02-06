<template>
  <view class="ui-card" :class="[classes, props.customClass]" :style="[style]" @click="onClick">
    <!-- 头部区域 -->
    <slot name="header">
      <view v-if="isShowHeader" class="ui-card__header">
        <!-- 左侧图片 -->
        <slot name="thumb">
          <view v-if="isShowThumb" class="ui-card__thumb" @click.stop="onClickThumb">
            <image class="ui-card__thumb-image" :src="props.thumb" :mode="props.thumbMode as any" :style="[thumbStyle]" />
          </view>
        </slot>
        <!-- 标题区域 -->
        <view v-if="isShowTitleArea" class="ui-card__header-content">
          <slot name="title">
            <text v-if="isShowTitle" class="ui-card__title" :style="[titleStyle]">{{ props.title }}</text>
          </slot>
          <slot name="desc">
            <text v-if="isShowDesc" class="ui-card__desc" :style="[descStyle]">{{ props.desc }}</text>
          </slot>
        </view>
      </view>
    </slot>
    <!-- 内容区域 -->
    <view class="ui-card__body">
      <slot />
    </view>
    <!-- 底部区域 -->
    <slot name="footer">
      <!-- 默认无底部内容，用户可通过插槽自定义 -->
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { cardEmits, cardProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-card" })

const props = defineProps(cardProps)
const emits = defineEmits(cardEmits)

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  // 背景色
  if (props.background) {
    style.background = useColor(props.background)
  }
  // 圆角
  if (props.radius !== undefined) {
    style.borderRadius = useUnit(props.radius)
  }
  // 内边距
  if (props.padding !== undefined) {
    style.padding = useUnit(props.padding)
  }
  // 外边距
  if (props.margin !== undefined) {
    style.margin = useUnit(props.margin)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 类名数组
const classes = computed(() => {
  const list: string[] = []
  if (props.border) list.push("ui-card--border")
  if (props.shadow && props.shadow !== "none") list.push(`ui-card--shadow-${props.shadow}`)
  return list
})

// 图片样式
const thumbStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.thumbWidth !== undefined) {
    style.width = useUnit(props.thumbWidth)
  }
  if (props.thumbHeight !== undefined) {
    style.height = useUnit(props.thumbHeight)
  }
  if (props.thumbRadius !== undefined) {
    style.borderRadius = useUnit(props.thumbRadius)
  }
  return useStyle(style)
})

// 标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.titleSize !== undefined) {
    style.fontSize = useUnit(props.titleSize)
  }
  if (props.titleColor) {
    style.color = useColor(props.titleColor)
  }
  if (props.titleWeight !== undefined) {
    style.fontWeight = props.titleWeight as CSSProperties["fontWeight"]
  }
  return useStyle(style)
})

// 描述样式
const descStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.descSize !== undefined) {
    style.fontSize = useUnit(props.descSize)
  }
  if (props.descColor) {
    style.color = useColor(props.descColor)
  }
  if (props.descWeight !== undefined) {
    style.fontWeight = props.descWeight as CSSProperties["fontWeight"]
  }
  return useStyle(style)
})

// 是否显示图片
const isShowThumb = computed(() => !!props.thumb)
// 是否显示标题
const isShowTitle = computed(() => !!props.title)
// 是否显示描述
const isShowDesc = computed(() => !!props.desc)
// 是否显示标题区域（标题或描述任一存在）
const isShowTitleArea = computed(() => isShowTitle.value || isShowDesc.value)
// 是否显示头部区域（图片或标题区域任一存在）
const isShowHeader = computed(() => isShowThumb.value || isShowTitleArea.value)

// 点击卡片事件
function onClick() {
  emits("click")
}

// 点击图片事件
function onClickThumb() {
  emits("clickThumb")
}
</script>

<script lang="ts">
export default {
  name: "ui-card",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-card {
  display: flex;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  border-radius: var(--ui-radius-md);
  flex-direction: column;
  background-color: var(--ui-color-background);

  // 头部区域
  &__header {
    display: flex;
    padding: var(--ui-spacing-md);
    align-items: center;
  }

  // 左侧图片容器
  &__thumb {
    flex-shrink: 0;
    margin-right: var(--ui-spacing-md);
  }

  // 图片样式
  &__thumb-image {
    width: 88rpx;
    height: 88rpx;
    display: block;
    border-radius: var(--ui-radius-sm);
  }

  // 头部内容区域
  &__header-content {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: center;
  }

  // 标题
  &__title {
    color: var(--ui-color-text);
    overflow: hidden;
    font-size: var(--ui-font-size-md);
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  // 描述
  &__desc {
    color: var(--ui-color-text-tertiary);
    overflow: hidden;
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xs);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  // 内容区域
  &__body {
    padding: 0 var(--ui-spacing-md) var(--ui-spacing-md);
  }

  // 边框样式
  &--border {
    border: var(--ui-border-width) solid var(--ui-color-border-light);
  }

  // 小阴影
  &--shadow-small {
    box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.04);
  }

  // 中等阴影
  &--shadow-medium {
    box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.08);
  }

  // 大阴影
  &--shadow-large {
    box-shadow: 0 8rpx 24rpx 0 rgba(0, 0, 0, 0.12);
  }
}
</style>
