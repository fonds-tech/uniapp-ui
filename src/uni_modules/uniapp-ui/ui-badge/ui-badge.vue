<template>
  <view class="ui-badge" :style="[style]">
    <slot />
    <view v-if="isShow" class="ui-badge__inner" :class="[classs, props.customClass]" :style="[innerStyle]" @click="onClick">
      <slot name="content">
        <ui-icon v-if="isShowIcon" :name="props.icon" />
        <text v-else class="ui-badge__value" :style="[valueStyle]">{{ formatValue }}</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isArray, isNumber } from "../utils/check"
import { computed, useSlots } from "vue"
import { badgeEmits, badgeProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-badge" })

const props = defineProps(badgeProps)
const emits = defineEmits(badgeEmits)
const slots = useSlots()

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex
  return useStyle(style)
})
// 内部容器样式
const innerStyle = computed(() => {
  const style: CSSProperties = {}
  style.background = useColor(props.color)
  if (props.dot) {
    style.width = useUnit(props.dotSize)
    style.height = useUnit(props.dotSize)
  } else {
    style.height = useUnit(props.height)
    style.minWidth = useUnit(props.height)
    style.borderRadius = useUnit(props.radius)
  }
  // 处理偏移
  if (props.offset) {
    if (isArray(props.offset)) {
      const top: any = props.offset[0] || 0
      const right: any = props.offset[1] || 0
      style.top = useUnit(top)
      style.right = useUnit(right)
    } else {
      style.top = useUnit(props.offset)
      style.right = useUnit(props.offset)
    }
  }
  // 如果显示图标，添加内边距
  if (isShowIcon.value) {
    style.padding = "4rpx"
  }
  // 单个字符显示为圆形，多个字符显示为药丸形
  if (!props.dot && !isShowIcon.value && String(formatValue.value).length > 1) {
    style.padding = "0 8rpx"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 类名数组
const classs = computed(() => {
  const list = []
  list.push(`ui-badge__inner--${props.position}`)
  if (props.dot) list.push("ui-badge__inner--dot")
  if (slots.default) list.push("ui-badge__inner--absolute")
  return list
})
// 数值样式
const valueStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(props.valueColor)
  style.fontSize = useUnit(props.valueSize)
  style.fontWeight = props.valueWeight
  return useStyle(style)
})
// 格式化显示的值
const formatValue = computed(() => {
  // 检查 value 和 max 是否都为数字
  if (isNumber(props.value) && isNumber(props.max)) {
    // 如果 value 大于 max，显示 "max+"
    return Number(props.value) > Number(props.max) ? `${props.max}+` : props.value
  }
  // 如果 value 或 max 不是数字，直接返回 value
  return props.value
})
// 是否显示
const isShow = computed(() => {
  if (props.dot) return true
  if (props.icon) return true
  // 有 value 值时的判断
  if (props.value !== undefined && props.value !== null && props.value !== "") {
    // 数值类型
    if (isNumber(props.value)) {
      if (+props.value > 0) return true
      if (+props.value === 0 && props.showZero) return true
      return false
    }
    // 字符串类型直接显示
    return true
  }
  return false
})
// 是否显示图标
const isShowIcon = computed(() => props.icon && !props.dot)

// 点击事件处理
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
