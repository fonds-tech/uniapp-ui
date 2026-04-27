<template>
  <view class="ui-cell" :class="[classNames, props.customClass]" :style="[rootStyle]" :hover-class="hoverClass" :hover-stay-time="+props.hoverStayTime" @click="onClick">
    <slot name="icon">
      <view v-if="props.icon" class="ui-cell__icon">
        <ui-icon :name="props.icon" />
      </view>
    </slot>
    <view class="ui-cell__body">
      <slot name="title">
        <text v-if="props.title" class="ui-cell__title">{{ props.title }}</text>
      </slot>
      <slot name="label">
        <text v-if="props.label" class="ui-cell__label">{{ props.label }}</text>
      </slot>
    </view>
    <view class="ui-cell__content">
      <slot>
        <text v-if="isDef(props.value)" class="ui-cell__value">{{ props.value }}</text>
      </slot>
    </view>
    <slot name="right-icon">
      <view v-if="showRightIcon" class="ui-cell__right-icon">
        <ui-icon :name="props.rightIcon" />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { isDef } from "../utils/check"
import { computed } from "vue"
import { cellGroupKey } from "../ui-cell-group"
import { cellEmits, cellProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-cell" })

const props = defineProps(cellProps)
const emits = defineEmits(cellEmits)

// 父级 cell-group（用于判定是否末尾以隐藏分隔线）
const { index, parent: cellGroup } = useParent(cellGroupKey)

// 是否末尾 cell（用于隐藏分隔线）
const isLastCell = computed(() => {
  if (!cellGroup?.childrens) return true
  return index.value === cellGroup.childrens.length - 1
})
// 右侧图标显示：showRightIcon 显式控制优先，否则跟随 isLink
const showRightIcon = computed(() => props.showRightIcon ?? props.isLink)
// 是否启用点击反馈（clickable / isLink / 有 url 任一即触发）
const isInteractive = computed(() => !props.disabled && (props.clickable || props.isLink || !!props.url))
// 点击态类名
const hoverClass = computed(() => (isInteractive.value ? "ui-cell--active" : ""))

// 根节点样式：所有 prop 通过 CSS var 注入；SCSS 选择器顶部声明默认值
const rootStyle = computed(() => {
  const s: Record<string, string | number | undefined> = {}
  // 尺寸 / 容器
  if (props.height !== undefined) s.height = useUnit(props.height)
  if (props.minHeight !== undefined) s["--ui-cell-min-height"] = useUnit(props.minHeight)
  if (props.padding !== undefined) s.padding = useUnit(props.padding)
  if (props.background) s.background = useColor(props.background)
  else if (!cellGroup) s.background = "var(--ui-color-background)"
  if (props.activeOpacity !== undefined) s["--ui-cell-active-opacity"] = String(props.activeOpacity)
  // border
  if (props.borderLeft !== undefined) s["--ui-cell-border-left"] = useUnit(props.borderLeft)
  if (props.borderRight !== undefined) s["--ui-cell-border-right"] = useUnit(props.borderRight)
  if (props.borderWidth !== undefined) s["--ui-cell-border-width"] = useUnit(props.borderWidth)
  if (props.borderColor) s["--ui-cell-border-color"] = useColor(props.borderColor)
  // icon
  if (props.iconGap !== undefined) s["--ui-cell-icon-gap"] = useUnit(props.iconGap)
  if (props.iconSize !== undefined) s["--ui-cell-icon-size"] = useUnit(props.iconSize)
  if (props.iconColor) s["--ui-cell-icon-color"] = useColor(props.iconColor)
  if (props.iconWeight !== undefined) s["--ui-cell-icon-weight"] = String(props.iconWeight)
  // title / body：titleWidth 显式设置时禁止 body 收缩，让标题占满指定宽度
  if (props.titleWidth !== undefined) {
    s["--ui-cell-title-width"] = useUnit(props.titleWidth)
    s["--ui-cell-body-shrink"] = "0"
  }
  if (props.titleSize !== undefined) s["--ui-cell-title-size"] = useUnit(props.titleSize)
  if (props.titleColor) s["--ui-cell-title-color"] = useColor(props.titleColor)
  if (props.titleWeight !== undefined) s["--ui-cell-title-weight"] = String(props.titleWeight)
  const titleLines = clampLines(props.titleLines)
  if (titleLines !== undefined) s["--ui-cell-title-lines"] = String(titleLines)
  // label
  if (props.labelGap !== undefined) s["--ui-cell-label-gap"] = useUnit(props.labelGap)
  if (props.labelSize !== undefined) s["--ui-cell-label-size"] = useUnit(props.labelSize)
  if (props.labelColor) s["--ui-cell-label-color"] = useColor(props.labelColor)
  if (props.labelWeight !== undefined) s["--ui-cell-label-weight"] = String(props.labelWeight)
  const labelLines = clampLines(props.labelLines)
  if (labelLines !== undefined) s["--ui-cell-label-lines"] = String(labelLines)
  // value
  if (props.valueSize !== undefined) s["--ui-cell-value-size"] = useUnit(props.valueSize)
  if (props.valueColor) s["--ui-cell-value-color"] = useColor(props.valueColor)
  if (props.valueWeight !== undefined) s["--ui-cell-value-weight"] = String(props.valueWeight)
  const valueLines = clampLines(props.valueLines)
  if (valueLines !== undefined) s["--ui-cell-value-lines"] = String(valueLines)
  // right icon
  if (props.rightIconGap !== undefined) s["--ui-cell-right-icon-gap"] = useUnit(props.rightIconGap)
  if (props.rightIconSize !== undefined) s["--ui-cell-right-icon-size"] = useUnit(props.rightIconSize)
  if (props.rightIconColor) s["--ui-cell-right-icon-color"] = useColor(props.rightIconColor)
  if (props.rightIconWeight !== undefined) s["--ui-cell-right-icon-weight"] = String(props.rightIconWeight)
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) })
})
// 类名数组
const classNames = computed(() => {
  const list: string[] = []
  if (props.border && !isLastCell.value) list.push("ui-cell--border")
  if (isInteractive.value) list.push("ui-cell--clickable")
  if (props.disabled) list.push("ui-cell--disabled")
  if (props.align === "top") list.push("ui-cell--align-top")
  return list
})

// 行数转 line-clamp 值：0 表示不省略，用大数模拟「无限制」
function clampLines(v: number | string | undefined) {
  if (v === undefined) return undefined
  const n = +v
  return n === 0 ? 9999 : n
}

// 点击事件：永远 emit click（不被 url 吞）；有 url 时再走路由跳转，失败抛 linkFail
function onClick(event: Event) {
  if (props.disabled) return
  emits("click", event)
  if (!props.url) return
  const fn = uni[props.linkType]
  if (typeof fn !== "function") {
    emits("linkFail", new Error(`uni.${props.linkType} is not a function`))
    return
  }
  fn({
    url: props.url,
    fail: (err: any) => emits("linkFail", err instanceof Error ? err : new Error(String(err?.errMsg ?? err))),
  } as any)
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
  --ui-cell-icon-gap: var(--ui-spacing-xs);
  --ui-cell-icon-size: var(--ui-font-size-md);

  --ui-cell-label-gap: var(--ui-spacing-xs);
  --ui-cell-icon-color: var(--ui-color-text-secondary);
  --ui-cell-label-size: var(--ui-font-size-xs);
  --ui-cell-min-height: var(--ui-size-md);

  --ui-cell-title-size: var(--ui-font-size-sm);

  --ui-cell-value-size: var(--ui-font-size-sm);
  --ui-cell-body-shrink: 1;

  --ui-cell-border-left: var(--ui-spacing-md);
  --ui-cell-icon-weight: normal;
  --ui-cell-label-color: var(--ui-color-text-tertiary);
  --ui-cell-label-lines: 1;
  --ui-cell-title-color: var(--ui-color-text);
  --ui-cell-title-lines: 1;
  --ui-cell-title-width: auto;
  --ui-cell-value-color: var(--ui-color-text-secondary);
  --ui-cell-value-lines: 1;
  --ui-cell-border-color: var(--ui-color-border-light);
  --ui-cell-border-right: var(--ui-spacing-md);
  --ui-cell-border-width: var(--ui-border-width-thin);
  --ui-cell-label-weight: normal;
  --ui-cell-title-weight: normal;
  --ui-cell-value-weight: normal;
  --ui-cell-active-opacity: var(--ui-opacity-light);

  --ui-cell-right-icon-gap: var(--ui-spacing-xs);
  --ui-cell-right-icon-size: var(--ui-font-size-sm);
  --ui-cell-right-icon-color: var(--ui-color-text-tertiary);
  --ui-cell-right-icon-weight: normal;

  display: flex;
  padding: var(--ui-spacing-md);
  position: relative;
  background: transparent;
  box-sizing: border-box;
  min-height: var(--ui-cell-min-height);
  align-items: center;

  // 点击反馈遮罩：默认透明，&--active 时通过 opacity 显形
  &::before {
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    content: "";
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    background: var(--ui-color-text);
    border-radius: inherit;
    pointer-events: none;
  }

  &__icon {
    color: var(--ui-cell-icon-color);
    display: flex;
    font-size: var(--ui-cell-icon-size);
    align-items: center;
    flex-shrink: 0;
    font-weight: var(--ui-cell-icon-weight);
    margin-right: var(--ui-cell-icon-gap);
  }

  &__body {
    width: var(--ui-cell-title-width);
    display: flex;
    min-width: 0;
    flex-shrink: var(--ui-cell-body-shrink);
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    color: var(--ui-cell-title-color);
    display: -webkit-box;
    overflow: hidden;
    font-size: var(--ui-cell-title-size);
    word-break: break-word;
    font-weight: var(--ui-cell-title-weight);
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--ui-cell-title-lines);
  }

  &__label {
    color: var(--ui-cell-label-color);
    display: -webkit-box;
    overflow: hidden;
    font-size: var(--ui-cell-label-size);
    margin-top: var(--ui-cell-label-gap);
    word-break: break-word;
    font-weight: var(--ui-cell-label-weight);
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--ui-cell-label-lines);
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
    color: var(--ui-cell-value-color);
    display: -webkit-box;
    overflow: hidden;
    font-size: var(--ui-cell-value-size);
    text-align: right;
    word-break: break-word;
    font-weight: var(--ui-cell-value-weight);
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--ui-cell-value-lines);
  }

  &__right-icon {
    color: var(--ui-cell-right-icon-color);
    display: flex;
    font-size: var(--ui-cell-right-icon-size);
    align-items: center;
    flex-shrink: 0;
    font-weight: var(--ui-cell-right-icon-weight);
    margin-left: var(--ui-cell-right-icon-gap);
  }

  // 顶对齐：多行 label 时让 icon / 标题 / 右侧图标 顶对齐而非视觉飘移
  &--align-top {
    align-items: flex-start;
  }

  &--clickable {
    cursor: pointer;
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
    opacity: var(--ui-cell-active-opacity);
  }

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }
}
</style>
