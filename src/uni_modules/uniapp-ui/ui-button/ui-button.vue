<template>
  <button
    class="ui-button"
    :style="[buttonStyle]"
    :class="[classNames, useProps.customClass]"
    :lang="useProps.lang"
    :form-type="useProps.formType"
    :open-type="useProps.openType"
    :session-from="useProps.sessionFrom"
    :app-parameter="useProps.appParameter"
    :hover-class="hoverClass"
    :hover-stay-time="useProps.hoverStayTime"
    :hover-start-time="useProps.hoverStartTime"
    :send-message-img="useProps.sendMessageImg"
    :send-message-path="useProps.sendMessagePath"
    :show-message-card="useProps.showMessageCard"
    :send-message-title="useProps.sendMessageTitle"
    :hover-stop-propagation="useProps.hoverStopPropagation"
    @error="handleError"
    @click="handleClick"
    @launchapp="handleLaunchApp"
    @getuserinfo="handleGetUserInfo"
    @opensetting="handleOpenSetting"
    @getphonenumber="handleGetPhoneNumber"
  >
    <view class="ui-button__content" :class="{ 'ui-button__content--reverse': useProps.iconPosition === 'right' }">
      <view v-if="isLoading" class="ui-button__loading">
        <ui-loading :size="useProps.loadingIconSize" color="currentColor" />
      </view>
      <view v-else-if="useProps.icon" class="ui-button__icon">
        <ui-icon :name="useProps.icon" :color="useProps.iconColor" :size="useProps.iconSize" :weight="useProps.iconWeight" />
      </view>
      <view v-if="isLoading && resolvedLoadingText" class="ui-button__text">
        {{ resolvedLoadingText }}
      </view>
      <view v-else-if="!isLoading && hasSlotContent" class="ui-button__text">
        <slot />
      </view>
    </view>
  </button>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { createThrottle } from "../utils/utils"
import { ref, computed, useSlots } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { buttonEmits, buttonProps, useButtonProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-button" })

// 定义props和emits
const props = defineProps(buttonProps)
const emits = defineEmits(buttonEmits)
const useProps = useButtonProps(props)
const slots = useSlots()

// 检测 slot 是否有内容
const hasSlotContent = computed(() => !!slots.default)

// 定义响应式变量
const internalLoading = ref(false)
const internalDisabled = ref(false)
const internalLoadingText = ref("")

// 创建节流函数实例
const throttledEmit = computed(() => createThrottle(+useProps.throttle))

// 计算按钮样式
const buttonStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.width = useUnit(useProps.width)
  styles.height = useUnit(useProps.height)
  styles.color = useColor(useProps.textColor)
  styles.fontSize = useUnit(useProps.textSize)
  styles.boxShadow = useProps.shadow
  styles.fontWeight = useProps.textWeight
  styles.background = useColor(useProps.color)
  styles.borderWidth = useUnit(useProps.borderWidth)
  styles.borderColor = useColor(useProps.borderColor)
  styles.borderRadius = useUnit(useProps.borderRadius)
  styles.marginLeft = useUnit(useProps.marginLeft)
  styles.marginRight = useUnit(useProps.marginRight)
  return useStyle({ ...styles, ...useStyle(useProps.customStyle) })
})

// 计算按钮类名
const classNames = computed(() => {
  const classList: string[] = []
  classList.push(`ui-button--${useProps.type}`)
  classList.push(`ui-button--${useProps.size}`)
  const modifiers = ["text", "plain", "round", "block"]
  modifiers.forEach((modifier) => {
    if (props[modifier]) classList.push(`ui-button--${modifier}`)
  })
  if (isLoading.value) classList.push("ui-button--loading")
  if (isDisabled.value) classList.push("ui-button--disabled")
  return classList
})

// 计算按钮状态
const isLoading = computed(() => useProps.loading || internalLoading.value)
const isDisabled = computed(() => useProps.disabled || internalDisabled.value)
const resolvedLoadingText = computed(() => useProps.loadingText || internalLoadingText.value)
const hoverClass = computed(() => (isDisabled.value || isLoading.value ? "" : "ui-button--active"))

// 点击事件处理
function handleClick(event: any) {
  if (isLoading.value || isDisabled.value) return
  throttledEmit.value(() => emits("click", event))
}

// 暴露控制方法
function setLoading(state: boolean, text?: string) {
  internalLoading.value = state
  if (text !== undefined) internalLoadingText.value = text
}

function setDisabled(state: boolean) {
  internalDisabled.value = state
}

defineExpose({ setLoading, setDisabled })

// 小程序开放能力事件处理
function handleError(event: any) {
  if (isLoading.value || isDisabled.value) return
  emits("error", event)
}

function handleLaunchApp(event: any) {
  if (isLoading.value || isDisabled.value) return
  emits("launchapp", event)
}

function handleGetUserInfo(event: any) {
  if (isLoading.value || isDisabled.value) return
  emits("getuserinfo", event)
}

function handleOpenSetting(event: any) {
  if (isLoading.value || isDisabled.value) return
  emits("opensetting", event)
}

function handleGetPhoneNumber(event: any) {
  if (isLoading.value || isDisabled.value) return
  emits("getphonenumber", event)
}
</script>

<script lang="ts">
export default {
  name: "ui-button",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
// 按钮类型样式 mixin
@mixin button-type($color) {
  color: var(--ui-color-background);
  background: $color;

  &.ui-button--plain {
    color: $color;
    border: var(--ui-border-width) solid currentcolor;
    background-color: var(--ui-color-background);

    &::before {
      background: currentcolor;
    }
  }

  &.ui-button--text {
    color: $color;
    border-width: 0;
    background-color: transparent;
  }
}

// 按钮尺寸样式 mixin
@mixin button-size($height, $font-size) {
  height: $height;
  font-size: $font-size;
}

.ui-button {
  // 基础样式
  height: var(--ui-size-normal);
  margin: 0;
  display: flex;
  overflow: visible;
  position: relative;
  font-size: var(--ui-font-size-md);
  appearance: none;
  box-sizing: border-box;
  text-align: center;
  transition: opacity var(--ui-transition-fast) var(--ui-transition-timing);
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  border-radius: var(--ui-radius-sm);
  justify-content: center;
  -webkit-appearance: none;
  -webkit-font-smoothing: auto;

  // 点击态遮罩层
  &::before {
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    content: "";
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    background: var(--ui-color-text-primary);
    transition: opacity var(--ui-transition-fast) var(--ui-transition-timing);
    user-select: none;
    border-radius: inherit;
  }

  // 移除原生按钮边框
  &::after {
    content: none;
  }

  // ========== 内容区域 ==========
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;

    &--reverse {
      flex-direction: row-reverse;
    }
  }

  &__loading,
  &__icon {
    color: inherit;
    display: flex;
    font-size: inherit;
  }

  &__text {
    display: flex;
  }

  // 图标与文字间距
  &__icon + &__text,
  &--loading &__loading + &__text {
    margin-left: var(--ui-spacing-sm);
  }

  // 反向布局时的间距
  &__content--reverse &__icon {
    margin-left: var(--ui-spacing-sm);
  }

  &__content--reverse &__icon + &__text {
    margin-left: 0;
  }

  // ========== 尺寸变体 ==========
  &--mini {
    @include button-size(var(--ui-size-mini), var(--ui-font-size-xs));
  }
  &--small {
    @include button-size(var(--ui-size-small), var(--ui-font-size-sm));
  }
  &--normal {
    @include button-size(var(--ui-size-normal), var(--ui-font-size-md));
  }
  &--large {
    @include button-size(var(--ui-size-large), var(--ui-font-size-md));
  }

  // ========== 类型变体 ==========
  &--primary {
    @include button-type(var(--ui-color-primary));
  }
  &--success {
    @include button-type(var(--ui-color-success));
  }
  &--warning {
    @include button-type(var(--ui-color-warning));
  }
  &--danger {
    @include button-type(var(--ui-color-danger));
  }
  &--info {
    @include button-type(var(--ui-color-info));
  }

  // default 类型特殊处理
  &--default {
    color: var(--ui-color-text-primary);
    border: var(--ui-border-width) solid var(--ui-color-border);
    background: var(--ui-color-background);

    &.ui-button--plain {
      border: var(--ui-border-width) solid var(--ui-color-border);
      background-color: var(--ui-color-background);

      &::before {
        background: currentcolor;
      }
    }

    &.ui-button--text {
      border-width: 0;
      background-color: transparent;
    }
  }

  // ========== 形态变体 ==========
  &--text {
    height: fit-content;
    display: inline-flex;
    padding: 0;
    line-height: normal;
    border-color: transparent;
  }

  &--block {
    width: 100%;
  }

  &--round {
    border-radius: var(--ui-radius-round);
  }

  // ========== 状态变体 ==========
  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &--active {
    &.ui-button--text {
      opacity: var(--ui-opacity-active);
    }

    &:not(.ui-button--text)::before {
      opacity: var(--ui-opacity-light);
    }
  }
}
</style>
