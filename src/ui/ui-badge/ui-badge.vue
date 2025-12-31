<template>
  <view class="ui-badge" :style="[style]">
    <slot />
    <view v-if="isShow" class="ui-badge__inner" :class="[classs, customClass]" :style="[innerStyle]" @click="onClick">
      <slot name="content">
        <ui-icon v-if="isShowIcon" :name="icon" />
        <text v-else class="ui-badge__value" :style="[valueStyle]">{{ formatValue }}</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isArray, isNumber } from "../utils/check"
import { badgeEmits, badgeProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-badge" })

// 定义props和emits
const props = defineProps(badgeProps)
const emits = defineEmits(badgeEmits)
const slots = useSlots()

// 计算主容器样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex
  return useStyle(style)
})

// 计算徽章内部样式
const innerStyle = computed(() => {
  const style: CSSProperties = {}
  style.background = useColor(props.color)
  if (props.dot) {
    // 如果是圆点样式
    style.width = useUnit(props.dotSize)
    style.height = useUnit(props.dotSize)
  } else {
    // 非圆点样式
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
  // 如果显示图标,添加内边距
  if (isShowIcon.value) {
    style.padding = "4rpx"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 计算徽章类名
const classs = computed(() => {
  const list = []
  list.push(`ui-badge__inner--${props.position}`)
  if (props.dot) list.push("ui-badge__inner--dot")
  if (slots.default) list.push("ui-badge__inner--absolute")
  return list
})

// 计算徽章值的样式
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
    // 否则直接显示 value
    return Number(props.value) > Number(props.max) ? `${props.max}+` : props.value
  }
  // 如果 value 或 max 不是数字，直接返回 value
  return props.value
})

// 是否显示
const isShow = computed(() => {
  if (props.dot) return true
  if (props.icon) return true
  if (isNumber(formatValue.value)) {
    if (+formatValue.value > 0) return true
    if (+formatValue.value === 0 && props.showZero) return true
  }
  return false
})
// 是否显示图标
const isShowIcon = computed(() => props.icon && !props.dot)

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
    color: var(--ui-color-background);
    display: flex;
    padding: var(--ui-spacing-xs) var(--ui-spacing-sm);
    font-size: var(--ui-font-size-sm);
    min-width: var(--ui-spacing-xxl);
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
    background-color: var(--ui-color-danger);

    &--absolute {
      top: 0;
      right: 0;
      position: absolute;
      transform: translate(50%, -50%);
      transform-origin: 100%;
    }
  }

  &__value {
    line-height: 1;
  }
}
</style>
