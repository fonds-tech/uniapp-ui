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
import { computed } from "vue"
import { cellGroupKey } from "../ui-cell-group"
import { cellEmits, cellProps, useCellProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-cell" })

// 定义props和emits
const props = defineProps(cellProps)
const emits = defineEmits(cellEmits)
const useProps = useCellProps(props)

// 使用useParent hook获取父组件信息
const { index, parent: cellGroup } = useParent(cellGroupKey)

// 计算样式
const style = computed(() => {
  const style: any = {}
  style.height = useUnit(useProps.height)
  style.padding = useUnit(useProps.padding)
  style.background = useColor(useProps.background)

  style["--ui-cell-border-left"] = useUnit(useProps.borderLeft)
  style["--ui-cell-border-right"] = useUnit(useProps.borderRight)
  style["--ui-cell-border-width"] = useUnit(useProps.borderWidth)
  style["--ui-cell-border-color"] = useColor(useProps.borderColor)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 判断是否是最后一个 cell
const isLastCell = computed(() => {
  if (!cellGroup?.childrens) return false
  return index.value === cellGroup.childrens.length - 1
})

// 计算class列表
const classs = computed(() => {
  const list: string[] = []
  // 最后一个 cell 不显示边框
  if (useProps.border && !isLastCell.value) list.push("ui-cell--border")
  if (useProps.center) list.push("ui-cell--center")
  if (useProps.clickable) list.push("ui-cell--clickable")
  return list
})

// 计算hover class
const hoverClass = computed(() => {
  return useProps.clickable || useProps.isLink ? "ui-cell--active" : ""
})

// 计算图标样式
const iconStyle = computed(() => {
  const style: CSSProperties = {}
  style.marginRight = useStyle(useProps.iconGap)
  return useStyle(style)
})

// 计算标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.titleColor)
  style.fontSize = useUnit(useProps.titleSize)
  style.fontWeight = useProps.titleWeight
  return useStyle(style)
})

// 计算标签样式
const labelStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.labelColor)
  style.fontSize = useUnit(useProps.labelSize)
  style.marginTop = useUnit(useProps.labelGap)
  style.fontWeight = useProps.labelWeight
  return useStyle(style)
})

// 计算右侧图标样式
const rightIconStyle = computed(() => {
  const style: CSSProperties = {}
  style.marginLeft = useStyle(useProps.rightIconGap)
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
const isShowIcon = computed(() => useProps.icon)
const isShowTitle = computed(() => useProps.title)
const isShowLabel = computed(() => useProps.label)
const isShowValue = computed(() => useProps.value)
const isShowRightIcon = computed(() => useProps.isLink && isDef(useProps.rightIcon))

// 获取属性值，优先使用props中的值，如果没有则使用cellGroup中的值
function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (cellGroup?.props && isDef(cellGroup.props[name])) return cellGroup.props[name]
  return ""
}

// 点击事件处理
function onClick() {
  if (useProps.url) {
    const linkType = useProps.linkType || "navigateTo"
    if (uni[linkType]) {
      uni[linkType]({ url: useProps.url })
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
    background: var(--ui-color-text-primary);
    border-color: var(--ui-color-text-primary);
    border-radius: inherit;
  }

  &__icon {
    display: flex;
    font-size: var(--ui-font-size-md);
    align-items: center;
    flex-shrink: 0;
    margin-right: var(--ui-spacing-xs);
  }

  &__body {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    color: var(--ui-color-text-primary);
    font-size: var(--ui-font-size-sm);
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xs);
  }

  &__value {
    color: var(--ui-color-text-secondary);
    display: flex;
    font-size: var(--ui-font-size-sm);
    align-items: center;
    flex-shrink: 0;
    margin-left: var(--ui-spacing-md);
  }

  &__right-icon {
    color: var(--ui-color-text-placeholder);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-left: var(--ui-spacing-xs);
  }

  &--center {
    align-items: center;
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
