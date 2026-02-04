<template>
  <view class="ui-cell" :class="[classes, props.customClass]" :style="[style]" :hover-class="hoverClass" :hover-stay-time="50" @click="onClick">
    <slot name="icon">
      <view v-if="isShowIcon" class="ui-cell__icon" :style="[iconStyle]">
        <ui-icon :name="props.icon" :size="props.iconSize" :color="props.iconColor" :weight="props.iconWeight" />
      </view>
    </slot>
    <view class="ui-cell__body" :style="[bodyStyle]">
      <slot name="title">
        <text v-if="isShowTitle" class="ui-cell__title" :style="[titleStyle]">{{ props.title }}</text>
      </slot>
      <slot name="label">
        <text v-if="isShowLabel" class="ui-cell__label" :style="[labelStyle]">{{ props.label }}</text>
      </slot>
    </view>
    <view class="ui-cell__content">
      <slot>
        <text v-if="isShowValue" class="ui-cell__value" :style="[valueStyle]">{{ props.value }}</text>
      </slot>
    </view>
    <slot name="right-icon">
      <view v-if="isShowRightIcon" class="ui-cell__right-icon" :style="[rightIconStyle]">
        <ui-icon :name="props.rightIcon" :size="props.rightIconSize" :color="props.rightIconColor" :weight="props.rightIconWeight" />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { cellGroupKey } from "../ui-cell-group"
import { cellEmits, cellProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-cell" })

const props = defineProps(cellProps)
const emits = defineEmits(cellEmits)

// 获取父组件信息
const { index, parent: cellGroup } = useParent(cellGroupKey)

// 根节点样式
const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.padding = useUnit(props.padding)
  // 在 cell-group 中时背景透明，单独使用时默认白色
  if (props.background) {
    style.background = useColor(props.background)
  } else if (!cellGroup) {
    style.background = "var(--ui-color-background)"
  }

  style["--ui-cell-border-left"] = useUnit(props.borderLeft)
  style["--ui-cell-border-right"] = useUnit(props.borderRight)
  style["--ui-cell-border-width"] = useUnit(props.borderWidth)
  style["--ui-cell-border-color"] = useColor(props.borderColor)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 是否是最后一个 cell
const isLastCell = computed(() => {
  if (!cellGroup?.childrens) return true
  return index.value === cellGroup.childrens.length - 1
})
// 类名数组
const classes = computed(() => {
  const list: string[] = []
  if (props.border && !isLastCell.value) list.push("ui-cell--border")
  if (props.clickable) list.push("ui-cell--clickable")
  return list
})
// 点击态类名
const hoverClass = computed(() => {
  return props.clickable || props.isLink ? "ui-cell--active" : ""
})
// 图标样式
const iconStyle = computed(() => {
  const style: CSSProperties = {}
  style.marginRight = useUnit(props.iconGap)
  return useStyle(style)
})
// 标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(props.titleColor)
  style.fontSize = useUnit(props.titleSize)
  style.fontWeight = props.titleWeight
  return useStyle(style)
})
// body 样式
const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.titleWidth) {
    style.width = useUnit(props.titleWidth)
    style.flexShrink = 0
  }
  return useStyle(style)
})
// 标签样式
const labelStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(props.labelColor)
  style.fontSize = useUnit(props.labelSize)
  style.marginTop = useUnit(props.labelGap)
  style.fontWeight = props.labelWeight
  return useStyle(style)
})
// 右侧图标样式
const rightIconStyle = computed(() => {
  const style: CSSProperties = {}
  style.marginLeft = useUnit(props.rightIconGap)
  return useStyle(style)
})
// 值样式
const valueStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(props.valueColor)
  style.fontSize = useUnit(props.valueSize)
  style.fontWeight = props.valueWeight
  return useStyle(style)
})
// 是否显示图标
const isShowIcon = computed(() => props.icon)
// 是否显示标题
const isShowTitle = computed(() => props.title)
// 是否显示标签
const isShowLabel = computed(() => props.label)
// 是否显示值
const isShowValue = computed(() => props.value)
// 是否显示右侧图标
const isShowRightIcon = computed(() => props.isLink)

// 点击事件处理
function onClick() {
  if (props.url) {
    const linkType = props.linkType || "navigateTo"
    if (uni[linkType]) {
      uni[linkType]({ url: props.url })
    }
  } else {
    emits("click")
  }
}

defineExpose({ index })
</script>

<script lang="ts">
export default {
  name: "ui-cell",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-cell {
  --ui-cell-border-left: var(--ui-spacing-lg);
  --ui-cell-border-color: var(--ui-color-border-light);
  --ui-cell-border-right: var(--ui-spacing-lg);
  --ui-cell-border-width: var(--ui-border-width);
  display: flex;
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  position: relative;
  background: transparent;
  align-items: center;

  &::before {
    top: 50%;
    left: 50%;
    width: 100%;
    border: inherit;
    height: 100%;
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    background: var(--ui-color-text);
    border-color: var(--ui-color-text);
    border-radius: inherit;
  }

  &__icon {
    color: var(--ui-color-text-secondary);
    display: flex;
    font-size: var(--ui-font-size-md);
    align-items: center;
    flex-shrink: 0;
    margin-right: var(--ui-spacing-xs);
  }

  &__body {
    display: flex;
    min-width: 0;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    color: var(--ui-color-text);
    overflow: hidden;
    font-size: var(--ui-font-size-sm);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__label {
    color: var(--ui-color-text-tertiary);
    overflow: hidden;
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xs);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__content {
    flex: 1;
    display: flex;
    min-width: 0;
    align-items: center;
    margin-left: var(--ui-spacing-md);
    justify-content: flex-end;
  }

  &__value {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }

  &__right-icon {
    color: var(--ui-color-text-tertiary);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-left: var(--ui-spacing-xs);
  }

  &--border::after {
    left: var(--ui-cell-border-left);
    right: var(--ui-cell-border-right);
    bottom: 0;
    content: "";
    position: absolute;
    border-bottom: var(--ui-cell-border-width) solid var(--ui-cell-border-color);
    pointer-events: none;
  }

  &--active::before {
    content: "";
    opacity: 0.05;
  }
}
</style>
