<template>
  <view class="ui-card" :class="[classes, customClass]" :style="[style]" :hover-class="hoverClass" :hover-stay-time="50" @click="onClick">
    <!-- 封面区域 -->
    <slot name="cover">
      <view v-if="thumb" class="ui-card__cover" @click.stop="onClickThumb">
        <image class="ui-card__thumb" :src="thumb" :mode="thumbMode" :style="[thumbStyle]" />
      </view>
    </slot>

    <!-- 头部区域 -->
    <slot name="header">
      <view v-if="isShowHeader" class="ui-card__header">
        <view class="ui-card__header-content">
          <text v-if="title" class="ui-card__title" :style="[titleStyle]">{{ title }}</text>
          <text v-if="desc" class="ui-card__desc" :style="[descStyle]">{{ desc }}</text>
        </view>
        <slot name="extra" />
      </view>
    </slot>

    <!-- 内容区域 -->
    <view v-if="hasBodySlot" class="ui-card__body">
      <slot />
    </view>

    <!-- 底部区域 -->
    <slot name="footer">
      <view v-if="hasFooterSlot" class="ui-card__footer">
        <slot name="footer" />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed, useSlots } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { cardEmits, cardProps, useCardProps } from "./index"

defineOptions({ name: "ui-card" })

// 定义 props 和 emits
const props = defineProps(cardProps)
const emits = defineEmits(cardEmits)
const useProps = useCardProps(props)
const slots = useSlots()

// 计算是否有默认插槽内容
const hasBodySlot = computed(() => !!slots.default)

// 计算是否有 footer 插槽内容
const hasFooterSlot = computed(() => !!slots.footer)

// 计算是否显示头部
const isShowHeader = computed(() => useProps.title || useProps.desc || !!slots.extra)

// 计算样式
const style = computed(() => {
  const style: CSSProperties = {}

  // 圆角
  if (useProps.radius) {
    style.borderRadius = useUnit(useProps.radius)
  }

  // 内边距
  if (useProps.padding) {
    style["--ui-card-padding"] = useUnit(useProps.padding)
  }

  // 背景色
  if (useProps.background) {
    style.background = useColor(useProps.background)
  }

  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 计算封面图片样式
const thumbStyle = computed(() => {
  const style: CSSProperties = {}
  if (useProps.thumbHeight) {
    style.height = useUnit(useProps.thumbHeight)
  }
  return useStyle(style)
})

// 计算标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  if (useProps.titleColor) {
    style.color = useColor(useProps.titleColor)
  }
  if (useProps.titleSize) {
    style.fontSize = useUnit(useProps.titleSize)
  }
  if (useProps.titleWeight) {
    style.fontWeight = useProps.titleWeight as CSSProperties["fontWeight"]
  }
  return useStyle(style)
})

// 计算描述样式
const descStyle = computed(() => {
  const style: CSSProperties = {}
  if (useProps.descColor) {
    style.color = useColor(useProps.descColor)
  }
  if (useProps.descSize) {
    style.fontSize = useUnit(useProps.descSize)
  }
  return useStyle(style)
})

// 计算 class 列表
const classes = computed(() => {
  const list: string[] = []
  if (useProps.border) list.push("ui-card--border")
  if (useProps.clickable) list.push("ui-card--clickable")
  if (useProps.full) list.push("ui-card--full")

  // 阴影模式
  if (useProps.shadow === "always") {
    list.push("ui-card--shadow")
  } else if (useProps.shadow === "hover") {
    list.push("ui-card--shadow-hover")
  }

  return list
})

// 计算 hover class
const hoverClass = computed(() => {
  return useProps.clickable ? "ui-card--active" : ""
})

// 点击事件处理
function onClick() {
  if (useProps.clickable) {
    emits("click")
  }
}

// 点击封面事件处理
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
  --ui-card-radius: var(--ui-radius-lg);
  --ui-card-shadow: var(--ui-shadow-sm);
  --ui-card-padding: var(--ui-spacing-xl);
  --ui-card-desc-size: var(--ui-font-size-sm);
  --ui-card-background: var(--ui-color-background);
  --ui-card-desc-color: var(--ui-color-text-secondary);
  --ui-card-title-size: var(--ui-font-size-md);
  --ui-card-title-color: var(--ui-color-text-main);
  --ui-card-border-color: var(--ui-color-border-light);

  display: flex;
  overflow: hidden;
  position: relative;
  background: var(--ui-card-background);
  border-radius: var(--ui-card-radius);
  flex-direction: column;

  // 阴影模式
  &--shadow {
    box-shadow: var(--ui-card-shadow);
  }

  &--shadow-hover {
    transition: box-shadow var(--ui-transition-duration);

    &:active {
      box-shadow: var(--ui-card-shadow);
    }
  }

  // 边框模式
  &--border {
    border: var(--ui-border-width) solid var(--ui-card-border-color);
  }

  // 可点击模式
  &--clickable {
    cursor: pointer;
  }

  // 点击态
  &--active {
    opacity: var(--ui-opacity-active);
  }

  // 全宽模式
  &--full {
    border-radius: 0;
  }

  // 封面区域
  &__cover {
    overflow: hidden;
    position: relative;
  }

  &__thumb {
    width: 100%;
    height: 300rpx;
    display: block;
  }

  // 头部区域
  &__header {
    display: flex;
    padding: var(--ui-card-padding);
    align-items: flex-start;
    justify-content: space-between;

    &-content {
      flex: 1;
      display: flex;
      min-width: 0;
      flex-direction: column;
    }
  }

  &__title {
    color: var(--ui-card-title-color);
    font-size: var(--ui-card-title-size);
    word-break: break-all;
    font-weight: var(--ui-font-weight-bold);
    line-height: 1.4;
  }

  &__desc {
    color: var(--ui-card-desc-color);
    font-size: var(--ui-card-desc-size);
    margin-top: var(--ui-spacing-sm);
    word-break: break-all;
    line-height: 1.4;
  }

  // 内容区域
  &__body {
    color: var(--ui-color-text-main);
    padding: 0 var(--ui-card-padding) var(--ui-card-padding);
    font-size: var(--ui-font-size-md);
    line-height: 1.6;

    // 如果没有头部，则添加顶部内边距
    &:first-child {
      padding-top: var(--ui-card-padding);
    }
  }

  // 底部区域
  &__footer {
    display: flex;
    padding: var(--ui-card-padding);
    border-top: var(--ui-border-width) solid var(--ui-card-border-color);
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
