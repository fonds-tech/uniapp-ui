<template>
  <view class="ui-float-button" hover-class="ui-float-button--hover" :hover-stay-time="100" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <slot>
      <view class="ui-float-button__content">
        <ui-loading v-if="loading" :size="iconSize" color="currentColor" />
        <ui-icon v-else :name="icon" :color="iconColor" :size="iconSize" />
        <view v-if="text" class="ui-float-button__text">{{ text }}</view>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { floatButtonEmits, floatButtonProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-float-button" })

// 定义props和emits
const props = defineProps(floatButtonProps)
const emits = defineEmits(floatButtonEmits)

// 计算组件的class列表
const classs = computed(() => {
  const list: string[] = []
  list.push(`ui-float-button--${props.type}`)
  list.push(`ui-float-button--${props.position}`)
  if (props.disabled) list.push("ui-float-button--disabled")
  if (props.loading) list.push("ui-float-button--loading")
  if (props.text) list.push("ui-float-button--with-text")
  if (props.safeAreaBottom && props.position.includes("bottom")) {
    list.push("ui-float-button--safe-area-bottom")
  }
  return list
})

// 计算组件的样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = +props.zIndex
  // 设置尺寸：width/height 优先级高于 size
  style.width = useUnit(props.width) || useUnit(props.size)
  style.height = useUnit(props.height) || useUnit(props.size)
  // 根据position设置位置
  if (props.position.includes("right")) {
    style.right = useUnit(props.right)
  }
  if (props.position.includes("left")) {
    style.left = useUnit(props.left) || useUnit(props.right)
  }
  if (props.position.includes("bottom")) {
    style.bottom = useUnit(props.bottom)
  }
  if (props.position.includes("top")) {
    style.top = useUnit(props.top) || useUnit(props.bottom)
  }
  // 自定义样式
  if (props.color) {
    style.background = useColor(props.color)
  }
  if (props.shadow) {
    style.boxShadow = props.shadow
  }
  style.borderRadius = useUnit(props.borderRadius)
  // 文本样式
  if (props.textColor) {
    style.color = useColor(props.textColor)
  }
  if (props.textSize) {
    style.fontSize = useUnit(props.textSize)
  }
  // 合并自定义样式
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 点击事件处理函数
function onClick() {
  if (props.disabled || props.loading) return
  emits("click")
}
</script>

<script lang="ts">
export default {
  name: "ui-float-button",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
$ui-float-button-error-color: #ee0c24;
$ui-float-button-default-color: #fff;
$ui-float-button-primary-color: var(--ui-color-primary, #fd7441);
$ui-float-button-success-color: #15c366;
$ui-float-button-warning-color: #ffa51a;

.ui-float-button {
  display: flex;
  position: fixed;
  box-sizing: border-box;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  align-items: center;
  border-radius: 50%;
  justify-content: center;

  &--hover {
    opacity: 0.8;
    transform: scale(0.95);
  }

  &--disabled {
    opacity: 0.5;
  }

  &--loading {
    opacity: 0.8;
  }

  // 类型
  &--primary {
    color: #fff;
    background: $ui-float-button-primary-color;
  }

  &--success {
    color: #fff;
    background: $ui-float-button-success-color;
  }

  &--warning {
    color: #fff;
    background: $ui-float-button-warning-color;
  }

  &--error {
    color: #fff;
    background: $ui-float-button-error-color;
  }

  &--default {
    color: #333;
    background: $ui-float-button-default-color;
  }

  // 带文本时变为药丸形状
  &--with-text {
    width: auto;
    height: auto;
    padding: 20rpx 32rpx;
    border-radius: 999rpx;
  }

  // 底部安全区域适配
  &--safe-area-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    font-size: 28rpx;
    font-weight: 500;
    margin-left: 8rpx;
  }
}
</style>
