<template>
  <view class="ui-badge" :style="[style]">
    <slot />
    <view v-if="isShow" class="ui-badge__inner" :class="[classs, useProps.customClass]" :style="[innerStyle]" @click="onClick">
      <slot name="content">
        <ui-icon v-if="isShowIcon" :name="useProps.icon" />
        <text v-else class="ui-badge__value" :style="[valueStyle]">{{ formatValue }}</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isArray, isNumber } from "../utils/check"
import { computed, useSlots } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { badgeEmits, badgeProps, useBadgeProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-badge" })

// 定义props和emits
const props = defineProps(badgeProps)
const emits = defineEmits(badgeEmits)
const useProps = useBadgeProps(props)
const slots = useSlots()

// 计算主容器样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = useProps.zIndex
  return useStyle(style)
})

// 计算徽章内部样式
const innerStyle = computed(() => {
  const style: CSSProperties = {}
  style.background = useColor(useProps.color)
  if (useProps.dot) {
    // 如果是圆点样式
    style.width = useUnit(useProps.dotSize)
    style.height = useUnit(useProps.dotSize)
  } else {
    // 非圆点样式
    style.height = useUnit(useProps.height)
    style.minWidth = useUnit(useProps.height)
    style.borderRadius = useUnit(useProps.radius)
  }
  // 处理偏移
  if (useProps.offset) {
    if (isArray(useProps.offset)) {
      const top: any = useProps.offset[0] || 0
      const right: any = useProps.offset[1] || 0
      style.top = useUnit(top)
      style.right = useUnit(right)
    } else {
      style.top = useUnit(useProps.offset)
      style.right = useUnit(useProps.offset)
    }
  }
  // 如果显示图标,添加内边距
  if (isShowIcon.value) {
    style.padding = "4rpx"
  }
  // 单个字符显示为圆形，多个字符显示为药丸形
  if (!useProps.dot && !isShowIcon.value && String(formatValue.value).length > 1) {
    style.padding = "0 8rpx"
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 计算徽章类名
const classs = computed(() => {
  const list = []
  list.push(`ui-badge__inner--${useProps.position}`)
  if (useProps.dot) list.push("ui-badge__inner--dot")
  if (slots.default) list.push("ui-badge__inner--absolute")
  return list
})

// 计算徽章值的样式
const valueStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.valueColor)
  style.fontSize = useUnit(useProps.valueSize)
  style.fontWeight = useProps.valueWeight
  return useStyle(style)
})

// 格式化显示的值
const formatValue = computed(() => {
  // 检查 value 和 max 是否都为数字
  if (isNumber(useProps.value) && isNumber(useProps.max)) {
    // 如果 value 大于 max，显示 "max+"
    // 否则直接显示 value
    return Number(useProps.value) > Number(useProps.max) ? `${useProps.max}+` : useProps.value
  }
  // 如果 value 或 max 不是数字，直接返回 value
  return useProps.value
})

// 是否显示
const isShow = computed(() => {
  if (useProps.dot) return true
  if (useProps.icon) return true
  // 有 value 值时的判断
  if (useProps.value !== undefined && useProps.value !== null && useProps.value !== "") {
    // 数值类型
    if (isNumber(useProps.value)) {
      if (+useProps.value > 0) return true
      if (+useProps.value === 0 && useProps.showZero) return true
      return false
    }
    // 字符串类型直接显示
    return true
  }
  return false
})
// 是否显示图标
const isShowIcon = computed(() => useProps.icon && !useProps.dot)

// 点击事件处理函数
function onClick() {
  emits("click")
}
</script>

<script lang="ts">
export default {
  name: "ui-badge",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-badge {
  width: max-content;
  height: max-content;
  display: flex;
  position: relative;

  &__inner {
    color: #fff;
    height: 40rpx;
    display: flex;
    padding: 0;
    font-size: var(--ui-font-size-xs);
    min-width: 40rpx;
    box-sizing: border-box;
    align-items: center;
    line-height: 1;
    border-radius: var(--ui-radius-round);
    justify-content: center;
    background-color: var(--ui-color-danger);

    &--absolute {
      position: absolute;
    }

    &--top-right {
      &.ui-badge__inner--absolute {
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        transform-origin: 100%;
      }
    }

    &--top-left {
      &.ui-badge__inner--absolute {
        top: 0;
        left: 0;
        right: auto;
        transform: translate(-50%, -50%);
        transform-origin: 0;
      }
    }

    &--bottom-right {
      &.ui-badge__inner--absolute {
        top: auto;
        right: 0;
        bottom: 0;
        transform: translate(50%, 50%);
        transform-origin: 100%;
      }
    }

    &--bottom-left {
      &.ui-badge__inner--absolute {
        top: auto;
        left: 0;
        right: auto;
        bottom: 0;
        transform: translate(-50%, 50%);
        transform-origin: 0;
      }
    }

    &--dot {
      width: 16rpx;
      height: 16rpx;
      padding: 0;
      min-width: 0;
      border-radius: 50%;
    }
  }

  &__value {
    line-height: 1;
    white-space: nowrap;
  }
}
</style>
