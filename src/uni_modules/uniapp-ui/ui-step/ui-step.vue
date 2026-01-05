<template>
  <view class="ui-step" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <!-- 图标区域 -->
    <view class="ui-step__icon" :class="iconClasss" :style="[iconStyle]">
      <slot name="icon" :status="currentStatus" :index="index" :active="isActive">
        <!-- 自定义图标或默认图标 -->
        <ui-icon v-if="currentIcon" :name="currentIcon" :size="currentIconSize" :color="currentColor" />
        <!-- 默认数字/勾选图标 -->
        <view v-else class="ui-step__circle" :style="[circleStyle]">
          <ui-icon v-if="isFinish" name="check" :size="circleIconSize" color="#fff" />
          <ui-icon v-else-if="isError" name="close" :size="circleIconSize" color="#fff" />
          <text v-else class="ui-step__index">{{ index + 1 }}</text>
        </view>
      </slot>
    </view>

    <!-- 连接线 -->
    <view v-if="!isLast" class="ui-step__line" :class="lineClasss" :style="[lineStyle]" />

    <!-- 内容区域 -->
    <view class="ui-step__content">
      <slot :status="currentStatus" :index="index" :active="isActive">
        <view v-if="title" class="ui-step__title" :style="[titleStyle]">{{ title }}</view>
        <view v-if="description" class="ui-step__description" :style="[descStyle]">{{ description }}</view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { StepStatus } from "../ui-steps"
import type { CSSProperties } from "vue"
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

/**
 * 获取父组件属性，如果子组件有设置则使用子组件的
 */
function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (parent && isDef(parent.props[name])) return parent.props[name]
  return ""
}

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
const currentIcon = computed(() => {
  if (useProps.icon) return useProps.icon
  if (isFinish.value && prop("finishIcon")) return prop("finishIcon")
  if (isActive.value && prop("activeIcon")) return prop("activeIcon")
  if (isError.value && prop("errorIcon")) return prop("errorIcon")
  if (isWait.value && prop("inactiveIcon")) return prop("inactiveIcon")
  return ""
})

/**
 * 图标大小
 */
const currentIconSize = computed(() => {
  return useProps.iconSize || prop("iconSize") || "40rpx"
})

/**
 * 圆圈内图标大小
 */
const circleIconSize = computed(() => {
  return "28rpx"
})

/**
 * 当前状态颜色
 */
const currentColor = computed(() => {
  if (isError.value) {
    return useColor(prop("errorColor")) || "var(--ui-color-danger)"
  }
  if (isFinish.value || isActive.value) {
    return useColor(prop("activeColor")) || "var(--ui-color-primary)"
  }
  return useColor(prop("inactiveColor")) || "var(--ui-color-text-placeholder)"
})

/**
 * 非激活颜色
 */
const inactiveColor = computed(() => {
  return useColor(prop("inactiveColor")) || "var(--ui-color-text-placeholder)"
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
  if (isLast.value) {
    list.push("ui-step--last")
  }
  return list
})

/**
 * 图标区域类名
 */
const iconClasss = computed(() => {
  const list: string[] = []
  list.push(`ui-step__icon--${currentStatus.value}`)
  return list
})

/**
 * 图标区域样式
 */
const iconStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle(style)
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
 * 点击事件处理
 */
function onClick() {
  emits("click", index.value)
  parent?.onClickStep(index.value)
}

defineExpose({ useProps, index, currentStatus })
</script>

<script lang="ts">
export default {
  name: "ui-step",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
// 步骤项基础样式
.ui-step {
  flex: 1;
  display: flex;
  position: relative;
  min-width: 120rpx;
  align-items: center;
  flex-direction: column;

  // 图标区域
  &__icon {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    z-index: 1;
    position: relative;
    transition: all 0.3s ease;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
  }

  // 默认圆圈
  &__circle {
    width: 48rpx;
    border: 2rpx solid var(--ui-color-primary);
    height: 48rpx;
    display: flex;
    font-size: 24rpx;
    transition: all 0.3s ease;
    align-items: center;
    font-weight: 500;
    border-radius: 50%;
    justify-content: center;
  }

  // 步骤序号
  &__index {
    color: #fff;
    font-size: 24rpx;
    font-weight: 500;
    line-height: 1;
  }

  // 连接线 - 水平方向
  &__line {
    top: 24rpx;
    left: 50%;
    width: 100%;
    height: 2rpx;
    position: absolute;
    transform: translateY(-50%);
    transition: background-color 0.3s ease;
    background-color: var(--ui-color-border);

    &--finish {
      background-color: var(--ui-color-primary);
    }
  }

  // 内容区域
  &__content {
    max-width: 100%;
    text-align: center;
    padding-top: 16rpx;
  }

  // 标题
  &__title {
    color: var(--ui-color-text-main);
    font-size: 28rpx;
    transition: color 0.3s ease;
    word-break: break-word;
    font-weight: 500;
    line-height: 1.4;
  }

  // 描述
  &__description {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
    margin-top: 8rpx;
    transition: color 0.3s ease;
    word-break: break-word;
    line-height: 1.4;
  }

  // 最后一个步骤
  &--last {
    flex: none;
    min-width: auto;

    .ui-step__line {
      display: none;
    }
  }

  // 垂直方向布局
  &--vertical {
    min-height: 120rpx;
    align-items: flex-start;
    flex-direction: row;
    padding-bottom: 20rpx;

    .ui-step__icon {
      margin-right: 20rpx;
    }

    .ui-step__line {
      top: 48rpx;
      left: 24rpx;
      width: 2rpx;
      height: calc(100% - 28rpx);
      transform: translateX(-50%);
    }

    .ui-step__content {
      flex: 1;
      text-align: left;
      padding-top: 8rpx;
    }

    &.ui-step--last {
      min-height: auto;
      padding-bottom: 0;
    }
  }

  // 等待状态
  &--wait {
    .ui-step__circle {
      border-color: var(--ui-color-border);
      background-color: transparent;
    }

    .ui-step__index {
      color: var(--ui-color-text-placeholder);
    }
  }

  // 进行中状态
  &--process {
    .ui-step__circle {
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
