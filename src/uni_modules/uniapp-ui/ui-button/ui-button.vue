<template>
  <button
    class="ui-button"
    :style="[buttonStyle]"
    :class="[classNames, props.customClass]"
    :lang="props.lang"
    :form-type="props.formType"
    :open-type="openTypeValue"
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
    :group-id="props.groupId"
    :guild-id="props.guildId"
    :public-id="props.publicId"
    :data-im-id="props.dataImId"
    :data-im-type="props.dataImType"
    :data-goods-id="props.dataGoodsId"
    :data-order-id="props.dataOrderId"
    :data-biz-line="props.dataBizLine"
    :contact-type="props.contactType"
    :contact-id="props.contactId"
    @error="handleError"
    @click="handleClick"
    @launchapp="handleLaunchApp"
    @getuserinfo="handleGetUserInfo"
    @opensetting="handleOpenSetting"
    @getphonenumber="handleGetPhoneNumber"
    @contact="handleContact"
    @chooseavatar="handleChooseAvatar"
    @agreeprivacyauthorization="handleAgreePrivacyAuthorization"
    @addgroupapp="handleAddGroupApp"
    @chooseaddress="handleChooseAddress"
    @chooseinvoicetitle="handleChooseInvoiceTitle"
    @subscribe="handleSubscribe"
    @login="handleLogin"
    @im="handleIm"
  >
    <view class="ui-button__content" :class="{ 'ui-button__content--reverse': props.iconPosition === 'right' }">
      <view v-if="isLoading" class="ui-button__loading">
        <ui-loading :size="props.loadingIconSize" color="currentColor" />
      </view>
      <view v-else-if="props.icon" class="ui-button__icon">
        <ui-icon :name="props.icon" :color="props.iconColor" :size="props.iconSize" :weight="props.iconWeight" />
      </view>
      <view v-if="hasSlotContent || resolvedLoadingText" class="ui-button__text">
        <template v-if="isLoading && resolvedLoadingText">
          {{ resolvedLoadingText }}
        </template>
        <template v-else>
          <slot />
        </template>
      </view>
    </view>
  </button>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { createThrottle } from "../utils/utils"
import { buttonEmits, buttonProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, markRaw, computed, useSlots, shallowRef } from "vue"

defineOptions({ name: "ui-button" })

const props = defineProps(buttonProps)
const emits = defineEmits(buttonEmits)
const slots = useSlots()

// 内部加载状态，用于通过 setLoading 方法控制
const internalLoading = ref(false)
// 内部禁用状态，用于通过 setDisabled 方法控制
const internalDisabled = ref(false)
// 内部加载文本，用于通过 setLoading 方法设置
const internalLoadingText = ref("")
// 创建节流函数实例
const throttledEmit = shallowRef(markRaw(createThrottle(+props.throttle)))

// 检测 slot 是否有内容
const hasSlotContent = computed(() => !!slots.default)
// 合并后的加载状态
const isLoading = computed(() => props.loading || internalLoading.value)
// 合并后的禁用状态
const isDisabled = computed(() => props.disabled || isLoading.value || internalDisabled.value)
// 合并后的 open-type 值，禁用时为 undefined
const openTypeValue = computed(() => (isDisabled.value ? undefined : props.openType))
// 解析后的加载文本
const resolvedLoadingText = computed(() => props.loadingText || internalLoadingText.value)
// 点击态的 CSS 类名
const hoverClass = computed(() => (isDisabled.value || isLoading.value ? "" : "ui-button--active"))
// 按钮样式对象
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
// 按钮类名数组
const classNames = computed(() => [
  `ui-button--${props.type}`,
  `ui-button--${props.size}`,
  {
    "ui-button--text": props.text,
    "ui-button--plain": props.plain,
    "ui-button--round": props.round,
    "ui-button--block": props.block,
    "ui-button--loading": isLoading.value,
    "ui-button--disabled": isDisabled.value,
  },
])

// 小程序开放能力事件处理
const handleError = createEventHandler("error")
const handleLaunchApp = createEventHandler("launchapp")
const handleGetUserInfo = createEventHandler("getuserinfo")
const handleOpenSetting = createEventHandler("opensetting")
const handleGetPhoneNumber = createEventHandler("getphonenumber")
const handleContact = createEventHandler("contact")
const handleChooseAvatar = createEventHandler("chooseavatar")
const handleAgreePrivacyAuthorization = createEventHandler("agreeprivacyauthorization")
const handleAddGroupApp = createEventHandler("addgroupapp")
const handleChooseAddress = createEventHandler("chooseaddress")
const handleChooseInvoiceTitle = createEventHandler("chooseinvoicetitle")
const handleSubscribe = createEventHandler("subscribe")
const handleLogin = createEventHandler("login")
const handleIm = createEventHandler("im")

// 监听 throttle 变化，动态更新节流函数
watch(
  () => props.throttle,
  (newThrottle) => {
    throttledEmit.value = markRaw(createThrottle(+newThrottle))
  },
)

// 创建通用事件处理器
function createEventHandler(name: keyof typeof buttonEmits) {
  return (event: any) => {
    if (isLoading.value || isDisabled.value) return
    // @ts-ignore 忽略类型检查，因为 emits 的联合类型过于复杂
    emits(name, event)
  }
}

// 点击事件处理
function handleClick(event: any) {
  if (isLoading.value || isDisabled.value) return
  throttledEmit.value(() => emits("click", event))
}

// 设置按钮加载状态
function setLoading(state: boolean, text?: string) {
  internalLoading.value = state
  if (text !== undefined) internalLoadingText.value = text
}

// 设置按钮禁用状态
function setDisabled(state: boolean) {
  internalDisabled.value = state
}

defineExpose({ setLoading, setDisabled })
</script>

<script lang="ts">
export default {
  name: "ui-button",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
@mixin button-type($color) {
  color: var(--ui-color-text-inverse);
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

@mixin button-size($height, $font-size) {
  height: $height;
  font-size: $font-size;
}

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
  border-radius: var(--ui-radius-sm);
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
    background: var(--ui-color-text);
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

  &__loading,
  &__icon {
    color: inherit;
    display: flex;
    font-size: inherit;
  }

  &__text {
    display: flex;
  }

  &__icon + &__text,
  &--loading &__loading + &__text {
    margin-left: var(--ui-spacing-sm);
  }

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

  &--default {
    color: var(--ui-color-text);
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
    color: var(--ui-color-text-disabled);
    background: var(--ui-color-background-disabled);
    border-color: var(--ui-color-border);
    pointer-events: none;

    &.ui-button--text {
      background: transparent;
      border-color: transparent;
    }

    &.ui-button--plain {
      background: transparent;
    }
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
