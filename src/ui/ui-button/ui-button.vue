<template>
  <button
    class="ui-button"
    :style="[buttonStyle]"
    :class="[classNames, customClass]"
    :lang="lang"
    :form-type="formType"
    :open-type="openType"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :hover-class="hoverClass"
    :hover-stay-time="hoverStayTime"
    :hover-start-time="hoverStartTime"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    :hover-stop-propagation="hoverStopPropagation"
    @error="handleError"
    @click="handleClick"
    @launchapp="handleLaunchApp"
    @getuserinfo="handleGetUserInfo"
    @opensetting="handleOpenSetting"
    @getphonenumber="handleGetPhoneNumber"
  >
    <view class="ui-button__content" :class="{ 'ui-button__content--reverse': props.iconPosition === 'right' }">
      <view v-if="isLoading" class="ui-button__loading">
        <ui-loading :size="loadingIconSize" color="currentColor" />
      </view>
      <view v-else-if="icon" class="ui-button__icon">
        <ui-icon :name="icon" :color="iconColor" :size="iconSize" :weight="iconWeight" />
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
import { buttonEmits, buttonProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-button" })

// 定义props和emits
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
.ui-button {
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
  border-radius: var(--ui-radius-md);
  justify-content: center;
  -webkit-appearance: none;
  -webkit-font-smoothing: auto;

  &::before {
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    content: "";
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    background: #000;
    transition: opacity var(--ui-transition-fast) var(--ui-transition-timing);
    user-select: none;
    border-radius: inherit;
  }

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

  &__loading {
    color: inherit;
    display: flex;
    font-size: inherit;
  }

  &__icon {
    color: inherit;
    display: flex;
    font-size: inherit;
  }

  &__text {
    display: flex;
  }

  &__icon + &__text {
    margin-left: var(--ui-spacing-sm);
  }

  &__content--reverse &__icon {
    margin-left: var(--ui-spacing-sm);
  }

  &__content--reverse &__icon + &__text {
    margin-left: 0;
  }

  &--mini {
    height: var(--ui-size-mini);
    font-size: var(--ui-font-size-sm);
  }

  &--small {
    height: var(--ui-size-small);
    font-size: var(--ui-font-size-sm);
  }

  &--normal {
    height: var(--ui-size-normal);
    font-size: var(--ui-font-size-md);
  }

  &--medium {
    height: var(--ui-size-medium);
    font-size: var(--ui-font-size-md);
  }

  &--large {
    height: var(--ui-size-large);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &--primary {
    color: var(--ui-color-background);
    background: var(--ui-color-primary);

    &.ui-button--plain {
      color: var(--ui-color-primary);
      border: var(--ui-border-width-thick) solid currentcolor;
      background-color: var(--ui-color-background);

      &::before {
        background: currentcolor;
      }
    }

    &.ui-button--text {
      color: var(--ui-color-primary);
      border-width: 0;
      background-color: transparent;
    }
  }

  &--default {
    color: var(--ui-color-text-primary);
    border: var(--ui-border-width) solid var(--ui-color-border);
    background: var(--ui-color-background);

    &.ui-button--plain {
      color: var(--ui-color-text-primary);
      border: var(--ui-border-width-thick) solid var(--ui-color-border);
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

  &--success {
    color: var(--ui-color-background);
    background: var(--ui-color-success);

    &.ui-button--plain {
      color: var(--ui-color-success);
      border: var(--ui-border-width-thick) solid currentcolor;
      background-color: var(--ui-color-background);

      &::before {
        background: currentcolor;
      }
    }

    &.ui-button--text {
      color: var(--ui-color-success);
      border-width: 0;
      background-color: transparent;
    }
  }

  &--warning {
    color: var(--ui-color-background);
    background: var(--ui-color-warning);

    &.ui-button--plain {
      color: var(--ui-color-warning);
      border: var(--ui-border-width-thick) solid currentcolor;
      background-color: var(--ui-color-background);

      &::before {
        background: currentcolor;
      }
    }

    &.ui-button--text {
      color: var(--ui-color-warning);
      border-width: 0;
      background-color: transparent;
    }
  }

  &--danger {
    color: var(--ui-color-background);
    background: var(--ui-color-danger);

    &.ui-button--plain {
      color: var(--ui-color-danger);
      border: var(--ui-border-width-thick) solid currentcolor;
      background-color: var(--ui-color-background);

      &::before {
        background: currentcolor;
      }
    }

    &.ui-button--text {
      color: var(--ui-color-danger);
      border-width: 0;
      background-color: transparent;
    }
  }

  &--info {
    color: var(--ui-color-background);
    background: var(--ui-color-info);

    &.ui-button--plain {
      color: var(--ui-color-info);
      border: var(--ui-border-width-thick) solid currentcolor;
      background-color: var(--ui-color-background);

      &::before {
        background: currentcolor;
      }
    }

    &.ui-button--text {
      color: var(--ui-color-info);
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

  &--loading {
    .ui-button__loading + .ui-button__text {
      margin-left: var(--ui-spacing-sm);
    }
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
