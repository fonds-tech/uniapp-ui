<template>
  <button
    class="ui-button"
    :style="[buttonStyle]"
    :class="[classNames, props.customClass]"
    :lang="props.lang"
    :form-type="props.formType"
    :open-type="props.openType"
    :session-from="props.sessionFrom"
    :app-parameter="props.appParameter"
    :hover-class="hoverClass"
    :hover-stay-time="props.hoverStayTime"
    :hover-start-time="props.hoverStartTime"
    :send-message-img="props.sendMessageImg"
    :send-message-path="props.sendMessagePath"
    :show-message-card="props.showMessageCard"
    :send-message-title="props.sendMessageTitle"
    :hover-stop-propagation="props.hoverStopPropagation"
    @error="handleError"
    @click="handleClick"
    @launchapp="handleLaunchApp"
    @getuserinfo="handleGetUserInfo"
    @opensetting="handleOpenSetting"
    @getphonenumber="handleGetPhoneNumber"
  >
    <view class="ui-button__content" :class="{ 'ui-button__content--reverse': props.iconPosition === 'right' }">
      <view v-if="isLoading" class="ui-button__loading">
        <ui-loading :size="props.loadingIconSize" color="currentColor" />
      </view>
      <view v-else-if="props.icon" class="ui-button__icon">
        <ui-icon :name="props.icon" :color="props.iconColor" :size="props.iconSize" :weight="props.iconWeight" />
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
import { buttonEmits, buttonProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-button" })

const props = defineProps(buttonProps)
const emits = defineEmits(buttonEmits)
const slots = useSlots()

// 检测 slot 是否有内容
const hasSlotContent = computed(() => !!slots.default)

// 定义响应式变量
const internalLoading = ref(false)
const internalDisabled = ref(false)
const internalLoadingText = ref("")

// 创建节流函数实例
const throttledEmit = computed(() => createThrottle(+props.throttle))

// 计算按钮样式
const buttonStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.width = useUnit(props.width)
  styles.height = useUnit(props.height)
  styles.color = useColor(props.textColor)
  styles.fontSize = useUnit(props.textSize)
  styles.boxShadow = props.shadow
  styles.fontWeight = props.textWeight
  styles.background = useColor(props.color)
  styles.borderWidth = useUnit(props.borderWidth)
  styles.borderColor = useColor(props.borderColor)
  styles.borderRadius = useUnit(props.borderRadius)
  styles.marginLeft = useUnit(props.marginLeft)
  styles.marginRight = useUnit(props.marginRight)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

// 计算按钮类名
const classNames = computed(() => {
  const classList: string[] = []
  classList.push(`ui-button--${props.type}`)
  classList.push(`ui-button--${props.size}`)
  const modifiers = ["text", "plain", "round", "block"]
  modifiers.forEach((modifier) => {
    if (props[modifier]) classList.push(`ui-button--${modifier}`)
  })
  if (isLoading.value) classList.push("ui-button--loading")
  if (isDisabled.value) classList.push("ui-button--disabled")
  return classList
})

// 计算按钮状态
const isLoading = computed(() => props.loading || internalLoading.value)
const isDisabled = computed(() => props.disabled || internalDisabled.value)
const resolvedLoadingText = computed(() => props.loadingText || internalLoadingText.value)
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
