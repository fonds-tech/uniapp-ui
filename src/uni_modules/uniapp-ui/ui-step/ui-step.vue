<template>
  <view class="ui-step" :class="[classes, customClass]" :style="[style]" @click="onClick">
    <view class="ui-step__head">
      <view class="ui-step__line ui-step__line--before" :style="[lineBeforeStyle]" />

      <view class="ui-step__icon-wrapper">
        <slot name="icon" :status="currentStatus" :index="safeIndex" :active="isActive">
          <ui-icon v-if="currentIcon" :name="currentIcon" :size="currentIconSize" :color="currentColor" />

          <view v-else class="ui-step__circle" :style="[circleStyle]">
            <ui-icon v-if="!isDot && isFinish" name="check" :size="circleIconSize" color="#fff" />
            <ui-icon v-else-if="!isDot && isError" name="close" :size="circleIconSize" color="#fff" />
            <text v-else-if="!isDot" class="ui-step__index" :style="[indexStyle]">{{ safeIndex + 1 }}</text>
          </view>
        </slot>
      </view>

      <view class="ui-step__line ui-step__line--after" :style="[lineAfterStyle]" />
    </view>

    <view class="ui-step__content">
      <slot :status="currentStatus" :index="safeIndex" :active="isActive">
        <view v-if="title" class="ui-step__title" :style="[titleStyle]">{{ title }}</view>
        <view v-if="description" class="ui-step__description" :style="[descStyle]">{{ description }}</view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { StepStatus } from "../ui-steps"
import type { CSSProperties } from "vue"
import type { InheritableStepPropKeys } from "./index"
import { isDef } from "../utils/check"
import { stepsKey } from "../ui-steps"
import { computed } from "vue"
import { stepEmits, stepProps } from "./index"
import { useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-step" })

const props = defineProps(stepProps)
const emits = defineEmits(stepEmits)
const { parent, index } = useParent(stepsKey)

/** 安全的索引值（处理父组件不存在时返回 0） */
const safeIndex = computed(() => Math.max(0, index.value))

/**
 * 获取可继承的属性值（优先使用子组件的，否则使用父组件的）
 */
function getInheritProp(name: InheritableStepPropKeys): string | number | undefined {
  const selfVal = props[name as keyof typeof props]
  if (isDef(selfVal)) return selfVal as string | number | undefined
  if (parent) {
    const parentVal = parent.props[name as keyof typeof parent.props]
    if (isDef(parentVal)) return parentVal as string | number | undefined
  }
  return undefined
}

/**
 * 是否为第一个步骤
 */
const isFirst = computed(() => {
  return index.value === 0
})

/**
 * 是否为最后一个步骤
 */
const isLast = computed(() => {
  if (!parent) return true
  return index.value === parent.count.value - 1
})

/**
 * 是否为激活状态
 */
const isActive = computed(() => {
  if (!parent) return false
  return index.value === parent.active.value
})

/**
 * 是否为完成状态
 */
const isFinish = computed(() => {
  if (!parent) return false
  if (props.status === "finish") return true
  if (props.status) return false
  return index.value < parent.active.value
})

/**
 * 是否为错误状态
 */
const isError = computed(() => {
  return props.status === "error"
})

/**
 * 是否为等待状态
 */
const isWait = computed(() => {
  if (!parent) return true
  if (props.status === "wait") return true
  if (props.status) return false
  return index.value > parent.active.value
})

/**
 * 当前步骤状态
 */
const currentStatus = computed<StepStatus>(() => {
  if (props.status) return props.status
  if (isFinish.value) return "finish"
  if (isActive.value) return "process"
  return "wait"
})

/**
 * 是否为点状模式
 */
const isDot = computed(() => parent?.props.dot ?? false)

/**
 * 是否为简洁模式
 */
const isSimple = computed(() => parent?.props.simple ?? false)

/**
 * 当前图标
 */
const currentIcon = computed<string>(() => {
  if (isDot.value) return ""
  if (props.icon) return props.icon
  const finishIcon = getInheritProp("finishIcon")
  if (isFinish.value && finishIcon) return String(finishIcon)
  const activeIcon = getInheritProp("activeIcon")
  if (isActive.value && activeIcon) return String(activeIcon)
  const errorIcon = getInheritProp("errorIcon")
  if (isError.value && errorIcon) return String(errorIcon)
  const inactiveIcon = getInheritProp("inactiveIcon")
  if (isWait.value && inactiveIcon) return String(inactiveIcon)
  return ""
})

/**
 * 图标大小
 */
const currentIconSize = computed(() => {
  return props.iconSize || getInheritProp("iconSize") || "40rpx"
})

/** 默认圆圈尺寸 */
const defaultCircleSize = 48

/**
 * 圆圈内图标大小（根据图标尺寸动态计算，约为圆圈尺寸的 58%）
 */
const circleIconSize = computed(() => {
  const iconSize = currentIconSize.value
  if (typeof iconSize === "number") {
    return `${Math.round(iconSize * 0.58)}rpx`
  }
  if (typeof iconSize === "string") {
    const match = iconSize.match(/^(\d+(?:\.\d+)?)(rpx|px|rem|em)?$/)
    if (match) {
      const num = Number.parseFloat(match[1])
      const unit = match[2] || "rpx"
      return `${Math.round(num * 0.58)}${unit}`
    }
  }
  return `${Math.round(defaultCircleSize * 0.58)}rpx`
})

/**
 * 当前状态颜色
 */
const currentColor = computed(() => {
  if (isError.value) {
    const errColor = getInheritProp("errorColor")
    return useColor(errColor ? String(errColor) : undefined) || "var(--ui-color-danger)"
  }
  if (isFinish.value || isActive.value) {
    const actColor = getInheritProp("activeColor")
    return useColor(actColor ? String(actColor) : undefined) || "var(--ui-color-primary)"
  }
  const inactColor = getInheritProp("inactiveColor")
  return useColor(inactColor ? String(inactColor) : undefined) || "var(--ui-color-text-placeholder)"
})

/**
 * 非激活颜色
 */
const inactiveColor = computed(() => {
  const inactColor = getInheritProp("inactiveColor")
  return useColor(inactColor ? String(inactColor) : undefined) || "var(--ui-color-text-placeholder)"
})

/**
 * 连接线颜色（用于垂直模式连续线条）
 */
const lineBeforeColor = computed(() => {
  if (isFirst.value) return "transparent"
  const prevFinish = parent && index.value <= parent.active.value
  const actColor = getInheritProp("activeColor")
  if (prevFinish) {
    return useColor(actColor ? String(actColor) : undefined) || "var(--ui-color-primary)"
  }
  return inactiveColor.value
})

const lineAfterColor = computed(() => {
  if (isLast.value) return "transparent"
  if (isFinish.value) return currentColor.value
  return inactiveColor.value
})

/**
 * 组件容器样式
 */
const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

/**
 * 组件容器类名
 */
const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-step--${currentStatus.value}`)
  if (parent?.props.direction === "vertical") {
    list.push("ui-step--vertical")
  }
  if (isFirst.value) {
    list.push("ui-step--first")
  }
  if (isLast.value) {
    list.push("ui-step--last")
  }
  if (isDot.value) {
    list.push("ui-step--dot")
  }
  if (isSimple.value) {
    list.push("ui-step--simple")
  }
  return list
})

/**
 * 圆圈样式
 */
const circleStyle = computed(() => {
  const style: CSSProperties = {}
  style.backgroundColor = currentColor.value
  style.borderColor = currentColor.value
  if (isWait.value) {
    style.backgroundColor = isDot.value ? inactiveColor.value : "transparent"
    style.color = inactiveColor.value
  }
  return useStyle(style)
})

/**
 * 前连接线样式（第一个步骤隐藏）
 */
const lineBeforeStyle = computed(() => {
  const style: CSSProperties = {}
  if (isFirst.value) {
    style.visibility = "hidden"
  }
  style.backgroundColor = lineBeforeColor.value
  return useStyle(style)
})

/**
 * 后连接线样式（最后一个步骤隐藏）
 */
const lineAfterStyle = computed(() => {
  const style: CSSProperties = {}
  if (isLast.value) {
    style.visibility = "hidden"
  }
  style.backgroundColor = lineAfterColor.value
  return useStyle(style)
})

/**
 * 标题样式
 */
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = currentColor.value
  return useStyle(style)
})

/**
 * 描述样式
 */
const descStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = inactiveColor.value
  return useStyle(style)
})

/**
 * 步骤序号文字样式（统一管理颜色）
 */
const indexStyle = computed(() => {
  const style: CSSProperties = {}
  if (isWait.value) {
    style.color = inactiveColor.value
  } else {
    style.color = "#fff"
  }
  return useStyle(style)
})

/**
 * 点击事件处理
 */
function onClick() {
  emits("click", safeIndex.value)
  parent?.onClickStep(safeIndex.value)
}

defineExpose({ props, index: safeIndex, currentStatus })
</script>

<script lang="ts">
export default {
  name: "ui-step",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
// CSS 变量
$step-dot-size: 16rpx;
$step-icon-size: 48rpx;
$step-content-gap: 16rpx;
$step-line-height: 2rpx;
$step-transition-duration: 0.3s;

.ui-step {
  flex: 1;
  color: var(--ui-color-text-secondary);
  display: flex;
  font-size: 28rpx;
  flex-direction: column;

  // 头部区域：前线条 + 图标 + 后线条
  &__head {
    display: flex;
    align-items: center;
  }

  // 连接线基础样式
  &__line {
    flex: 1;
    height: $step-line-height;
    transition: background-color $step-transition-duration ease;
    background-color: var(--ui-color-border);
  }

  // 图标容器
  &__icon-wrapper {
    display: flex;
    padding: 0 8rpx;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
  }

  // 默认圆圈
  &__circle {
    width: $step-icon-size;
    border: 2rpx solid var(--ui-color-primary);
    height: $step-icon-size;
    display: flex;
    font-size: 24rpx;
    transition:
      background-color $step-transition-duration ease,
      border-color $step-transition-duration ease,
      box-shadow $step-transition-duration ease,
      transform $step-transition-duration ease;
    align-items: center;
    flex-shrink: 0;
    font-weight: 500;
    border-radius: 50%;
    justify-content: center;
  }

  // 步骤序号
  &__index {
    font-size: 24rpx;
    transition: color $step-transition-duration ease;
    font-weight: 500;
    line-height: 1;
  }

  // 内容区域
  &__content {
    display: flex;
    text-align: center;
    padding-top: $step-content-gap;
    flex-direction: column;
  }

  // 标题
  &__title {
    color: var(--ui-color-text-primary);
    font-size: 28rpx;
    transition: color $step-transition-duration ease;
    word-break: break-word;
    font-weight: 500;
    line-height: 1.4;
  }

  // 描述
  &__description {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
    margin-top: 8rpx;
    transition: color $step-transition-duration ease;
    word-break: break-word;
    line-height: 1.4;
  }

  &--vertical {
    padding: 0;
    min-height: 100rpx;
    flex-direction: row;

    .ui-step__head {
      width: $step-icon-size;
      flex-shrink: 0;
      margin-right: 24rpx;
      flex-direction: column;
    }

    .ui-step__line {
      flex: 1;
      width: $step-line-height;
      height: auto;
      min-height: 24rpx;
    }

    .ui-step__icon-wrapper {
      padding: 8rpx 0;
    }

    .ui-step__content {
      flex: 1;
      text-align: left;
      padding-top: 0;
      justify-content: center;
    }

    // 最后一个垂直步骤也左对齐
    &.ui-step--last .ui-step__content {
      text-align: left;
    }
  }

  // 等待状态
  &--wait {
    .ui-step__circle {
      border-color: var(--ui-color-border);
      background-color: transparent;
    }
  }

  // 进行中状态
  &--process {
    .ui-step__circle {
      transform: scale(1.05);
      box-shadow: 0 4rpx 16rpx rgba(var(--ui-color-primary-rgb), 0.3);
      border-color: var(--ui-color-primary);
      background-color: var(--ui-color-primary);
    }
  }

  // 完成状态
  &--finish {
    .ui-step__circle {
      border-color: var(--ui-color-primary);
      background-color: var(--ui-color-primary);
    }
  }

  // 错误状态
  &--error {
    .ui-step__circle {
      border-color: var(--ui-color-danger);
      background-color: var(--ui-color-danger);
    }
  }

  &--dot {
    .ui-step__circle {
      width: $step-dot-size;
      border: none;
      height: $step-dot-size;
    }

    .ui-step__index {
      display: none;
    }
  }

  &--simple {
    .ui-step__content {
      display: none;
    }
  }
}
</style>
