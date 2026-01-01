<template>
  <view class="ui-cell" :class="[classs, customClass]" :style="[style]" :hover-class="hoverClass" :hover-stay-time="50" @click="onClick">
    <slot name="icon">
      <view v-if="isShowIcon" class="ui-cell__icon" :style="[iconStyle]">
        <ui-icon :name="icon" :size="iconSize" :color="iconColor" :weight="iconWeight" />
      </view>
    </slot>
    <view class="ui-cell__body">
      <slot name="title">
        <text v-if="isShowTitle" class="ui-cell__title" :style="[titleStyle]">{{ title }}</text>
      </slot>
      <slot name="label">
        <text v-if="isShowLabel" class="ui-cell__label" :style="[labelStyle]">{{ label }}</text>
      </slot>
    </view>
    <slot name="value">
      <text v-if="isShowValue" class="ui-cell__value" :style="[contentStyle]">{{ value }}</text>
    </slot>
    <slot name="right-icon">
      <view v-if="isShowRightIcon" class="ui-cell__right-icon" :style="[rightIconStyle]">
        <ui-icon :name="rightIcon" :size="rightIconSize" :color="rightIconColor" :weight="rightIconWeight" />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { cellGroupKey } from "../ui-cell-group"
import { cellEmits, cellProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-cell" })

// 定义props和emits
const props = defineProps(cellProps)
const emits = defineEmits(cellEmits)
const slots = useSlots()

// 使用useParent hook获取父组件信息
const { index, parent: cellGroup } = useParent(cellGroupKey)

// 计算样式
const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.padding = useUnit(props.padding)
  style.background = useColor(props.background)

  style["--ui-cell-border-left"] = useUnit(props.borderLeft)
  style["--ui-cell-border-right"] = useUnit(props.borderRight)
  style["--ui-cell-border-width"] = useUnit(props.borderWidth)
  style["--ui-cell-border-color"] = useColor(props.borderColor)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 计算class列表
const classs = computed(() => {
  const list: string[] = []
  if (props.border) list.push("ui-cell--border")
  if (props.center) list.push("ui-cell--center")
  if (props.clickable) list.push("ui-cell--clickable")
  return list
})

// 计算hover class
const hoverClass = computed(() => {
  return props.clickable || props.isLink ? "ui-cell--active" : ""
})

// 计算图标样式
const iconStyle = computed(() => {
  const style: CSSProperties = {}
  style.marginRight = useStyle(props.iconGap)
  return useStyle(style)
})

// 计算标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(props.titleColor)
  style.fontSize = useUnit(props.titleSize)
  style.fontWeight = props.titleWeight
  return useStyle(style)
})

// 计算标签样式
const labelStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(props.labelColor)
  style.fontSize = useUnit(props.labelSize)
  style.marginTop = useUnit(props.labelGap)
  style.fontWeight = props.labelWeight
  return useStyle(style)
})

// 计算右侧图标样式
const rightIconStyle = computed(() => {
  const style: CSSProperties = {}
  style.marginLeft = useStyle(props.rightIconGap)
  return useStyle(style)
})

// 计算内容样式
const contentStyle = computed(() => {
  const style: any = {}
  style.color = useColor(prop("contentColor"))
  style.fontSize = useUnit(prop("contentSize"))
  style.fontWeight = prop("contentWeight")
  return useStyle(style)
})

// 计算是否显示各个元素
const isShowIcon = computed(() => props.icon)
const isShowTitle = computed(() => props.title)
const isShowLabel = computed(() => props.label)
const isShowValue = computed(() => props.value)
const isShowRightIcon = computed(() => props.isLink && isDef(props.rightIcon))

// 获取属性值，优先使用props中的值，如果没有则使用cellGroup中的值
function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(cellGroup.props[name])) return cellGroup.props[name]
  return ""
}

// 点击事件处理
function onClick() {
  if (props.url) {
    if (uni[props.linkType]) {
      uni[props.linkType]({ url: props.url })
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
  --ui-cell-border-left: var(--ui-spacing-xl);
  --ui-cell-border-color: var(--ui-color-border-light);
  --ui-cell-border-right: var(--ui-spacing-xl);
  --ui-cell-border-width: var(--ui-border-width);
  display: flex;
  padding: var(--ui-spacing-lg) var(--ui-spacing-xl);
  position: relative;
  background: var(--ui-color-background);

  &::before {
    top: 50%;
    left: 50%;
    width: 100%;
    border: inherit;
    height: 100%;
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    background: var(--ui-color-text-main);
    border-color: var(--ui-color-text-main);
    border-radius: inherit;
  }

  &__icon {
    height: 100%;
    display: flex;
    font-size: var(--ui-font-size-md);
    align-items: center;
    margin-right: var(--ui-spacing-xl);
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: var(--ui-font-size-md);
  }

  &__label {
    color: var(--ui-color-text-secondary);
    margin-top: var(--ui-spacing-sm);
  }

  &__value {
    display: flex;
    flex-shrink: 0;
    white-space: nowrap;
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
