<template>
  <view class="ui-step" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <!-- 连接线 -->
    <view class="ui-step__line" :class="lineClasss" :style="[lineStyle]" />

    <!-- 图标容器（绝对定位，遮住线条） -->
    <view class="ui-step__circle-container">
      <slot name="icon" :status="currentStatus" :index="safeIndex" :active="isActive">
        <!-- 自定义图标 -->
        <ui-icon v-if="currentIcon" :name="currentIcon" :size="currentIconSize" :color="currentColor" />
        <!-- 默认圆圈 -->
        <view v-else class="ui-step__circle" :style="[circleStyle]">
          <ui-icon v-if="isFinish" name="check" :size="circleIconSize" color="#fff" />
          <ui-icon v-else-if="isError" name="close" :size="circleIconSize" color="#fff" />
          <text v-else class="ui-step__index" :style="[indexStyle]">{{ safeIndex + 1 }}</text>
        </view>
      </slot>
    </view>

    <!-- 内容区域 -->
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
import { useColor, useStyle, useParent } from "../hooks"
import { stepEmits, stepProps, useStepProps } from "./index"

defineOptions({ name: "ui-step" })

const props = defineProps(stepProps)
const emits = defineEmits(stepEmits)
const useProps = useStepProps(props)
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
  if (useProps.status === "finish") return true
  if (useProps.status) return false
  return index.value < parent.active.value
})

/**
 * 是否为错误状态
 */
const isError = computed(() => {
  return useProps.status === "error"
})

/**
 * 是否为等待状态
 */
const isWait = computed(() => {
  if (!parent) return true
  if (useProps.status === "wait") return true
  if (useProps.status) return false
  return index.value > parent.active.value
})

/**
 * 当前步骤状态
 */
const currentStatus = computed<StepStatus>(() => {
  if (useProps.status) return useProps.status
  if (isFinish.value) return "finish"
  if (isActive.value) return "process"
  return "wait"
})

/**
 * 当前图标
 */
const currentIcon = computed<string>(() => {
  if (useProps.icon) return useProps.icon
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
  return useProps.iconSize || getInheritProp("iconSize") || "40rpx"
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
 * 组件容器样式
 */
const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

/**
 * 组件容器类名
 */
const classs = computed(() => {
  const list: string[] = []
  list.push(`ui-step--${currentStatus.value}`)
  if (parent?.useProps.direction === "vertical") {
    list.push("ui-step--vertical")
  }
  if (isFirst.value) {
    list.push("ui-step--first")
  }
  if (isLast.value) {
    list.push("ui-step--last")
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
    style.backgroundColor = "transparent"
    style.color = inactiveColor.value
  }
  return useStyle(style)
})

/**
 * 连接线类名
 */
const lineClasss = computed(() => {
  const list: string[] = []
  if (isFinish.value) {
    list.push("ui-step__line--finish")
  }
  return list
})

/**
 * 连接线样式
 */
const lineStyle = computed(() => {
  const style: CSSProperties = {}
  if (isFinish.value) {
    style.backgroundColor = currentColor.value
  } else {
    style.backgroundColor = inactiveColor.value
  }
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

defineExpose({ useProps, index: safeIndex, currentStatus })
</script>

<script lang="ts">
export default {
  name: "ui-step",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
// 过渡动画时长
$step-transition-duration: 0.3s;
// 图标尺寸
$step-icon-size: 48rpx;
// 图标容器内边距（用于遮罩线条）
$step-icon-padding: 8rpx;

// 步骤项基础样式（水平方向）
.ui-step {
  flex: 1;
  color: var(--ui-color-text-secondary);
  position: relative;
  font-size: 28rpx;

  // 图标容器（绝对定位，用背景遮住线条）
  &__circle-container {
    top: 30rpx;
    left: calc($step-icon-padding * -1);
    display: flex;
    padding: 0 $step-icon-padding;
    z-index: 1;
    position: absolute;
    transform: translateY(-50%);
    align-items: center;
    justify-content: center;
    background-color: var(--ui-color-background);
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

  // 连接线（全宽，靠圆圈容器背景遮罩）
  &__line {
    top: 30rpx;
    left: 0;
    width: 100%;
    height: 2rpx;
    position: absolute;
    transform: translateY(-50%);
    transition: background-color $step-transition-duration ease;
    background-color: var(--ui-color-border);

    &--finish {
      background-color: var(--ui-color-primary);
    }
  }

  // 内容区域
  &__content {
    display: block;
    font-size: 24rpx;
    padding-top: calc(30rpx + $step-icon-size / 2 + 16rpx);
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

  // 第一个步骤
  &--first {
    .ui-step__content {
      text-align: left;
    }
  }

  // 最后一个步骤：绝对定位到右边，隐藏线条
  &--last:not(.ui-step--first) {
    right: 1rpx;
    width: auto;
    position: absolute;

    .ui-step__content {
      text-align: right;
    }

    .ui-step__circle-container {
      left: auto;
      right: calc($step-icon-padding * -1);
    }

    .ui-step__line {
      width: 0;
    }
  }

  // 中间步骤：居中对齐
  &:not(.ui-step--first):not(.ui-step--last) {
    .ui-step__content {
      text-align: center;
    }
  }

  // 只有一个步骤时
  &--first.ui-step--last {
    width: auto;
    position: relative;

    .ui-step__circle-container {
      left: calc($step-icon-padding * -1);
      right: auto;
    }
  }

  // 垂直方向布局
  &--vertical {
    display: block;
    padding: 20rpx 20rpx 20rpx 0;
    line-height: 1.5;

    .ui-step__circle-container {
      top: 38rpx;
      left: -30rpx;
      transform: translate(-50%, -50%);
    }

    .ui-step__line {
      top: 32rpx;
      left: -30rpx;
      width: 2rpx;
      height: 100%;
    }

    .ui-step__content {
      display: block;
      transform: none;
      text-align: left;
      margin-left: 0;
      padding-top: 0;
    }

    &.ui-step--last {
      right: auto;
      width: 100%;
      position: relative;

      .ui-step__circle-container {
        left: -30rpx;
        right: auto;
      }

      .ui-step__line {
        height: 0;
      }
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
}
</style>
