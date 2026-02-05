<template>
  <view class="ui-avatar-group" :class="[customClass]" :style="[rootStyle]" @click="onClick">
    <view class="ui-avatar-group__container" :style="containerStyle">
      <slot />
    </view>

    <view v-if="shouldShowExcess" class="ui-avatar-group__excess" :class="[excessShapeClass]" :style="excessStyle" @click.stop="onClickExcess">
      <text class="ui-avatar-group__excess-text">+{{ excessCount }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { computed } from "vue"
import { useUnit, useColor, useStyle, useChildren } from "../hooks"
import { avatarGroupKey, avatarGroupEmits, avatarGroupProps } from "./index"

defineOptions({ name: "ui-avatar-group" })

const props = defineProps(avatarGroupProps)
const emits = defineEmits(avatarGroupEmits)

// 使用 useChildren 收集子头像组件
const { childrens, linkChildren } = useChildren(avatarGroupKey)

// 预设尺寸映射
const sizeMap: Record<string, string> = {
  mini: "48rpx",
  small: "64rpx",
  medium: "80rpx",
  large: "120rpx",
}

// 超出的数量
const excessCount = computed(() => {
  const total = childrens.length
  const max = isDef(props.max) ? Number(props.max) : 5
  return total > max ? total - max : 0
})
// 是否显示超出数量
const shouldShowExcess = computed(() => excessCount.value > 0)
// 计算尺寸值
const sizeValue = computed(() => {
  const size = props.size
  if (typeof size === "string" && size in sizeMap) {
    return sizeMap[size]
  }
  return useUnit(size)
})
// 计算间距值
const gapValue = computed(() => {
  return useUnit(props.gap)
})
// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 容器样式
const containerStyle = computed(() => {
  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
  }
  // 如果是从右向左堆叠，需要反转方向
  if (props.direction === "left") {
    style.flexDirection = "row-reverse"
  }
  return style
})
// 超出数量形状类名
const excessShapeClass = computed(() => {
  return `ui-avatar-group__excess--${props.shape}`
})
// 超出数量样式
const excessStyle = computed(() => {
  const style: CSSProperties = {
    width: sizeValue.value,
    height: sizeValue.value,
    borderWidth: useUnit(props.borderWidth) || "4rpx",
    borderStyle: "solid",
    borderColor: useColor(props.borderColor) || "var(--ui-color-text-inverse)",
    background: "var(--ui-color-background-page)",
  }
  if (props.direction === "left") {
    style.marginRight = gapValue.value
  } else {
    style.marginLeft = gapValue.value
  }

  if (props.excessColor) {
    style.color = useColor(props.excessColor)
  }

  if (props.excessBackground) {
    style.background = useColor(props.excessBackground)
  }

  // 计算 z-index：超出数量应该在最上层
  const max = isDef(props.max) ? Number(props.max) : 5
  if (props.direction === "right") {
    style.zIndex = max + 1
  } else {
    style.zIndex = 0
  }

  return style
})

// 获取索引的方法（由子组件调用）
function getIndex() {
  return childrens.length
}

// 获取最大数量
function getMax() {
  return isDef(props.max) ? Number(props.max) : 5
}

// 获取总数
function getTotal() {
  return childrens.length
}

// 点击事件处理
function onClick(event: any) {
  emits("click", event)
}

// 点击超出数量
function onClickExcess(event: any) {
  emits("clickExcess", event)
}

// 建立父子组件关联
linkChildren({
  props,
  getIndex,
  getMax,
  getTotal,
})
</script>

<script lang="ts">
export default {
  name: "ui-avatar-group",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-avatar-group {
  display: inline-flex;
  align-items: center;

  &__container {
    display: flex;
    align-items: center;
  }

  &__excess {
    display: inline-flex;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    background-color: var(--ui-color-background-page);

    &--circle {
      border-radius: 50%;
    }

    &--square {
      border-radius: var(--ui-radius-md);
    }
  }

  &__excess-text {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
    font-weight: 500;
  }
}
</style>
