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
import { createThrottle } from "../utils/utils"
import { buttonEmits, buttonProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, markRaw, computed, useSlots, shallowRef } from "vue"

defineOptions({ name: "ui-button" })

const props = defineProps(buttonProps)
const emits = defineEmits(buttonEmits)
const slots = useSlots()

const throttledEmit = shallowRef(markRaw(createThrottle(+props.throttle)))
const internalLoading = ref(false)
const internalDisabled = ref(false)
const internalLoadingText = ref("")

const isLoading = computed(() => props.loading || internalLoading.value)
const isDisabled = computed(() => props.disabled || isLoading.value || internalDisabled.value)
const hoverClass = computed(() => (isDisabled.value || isLoading.value ? "" : "ui-button--active"))
const hasSlotContent = computed(() => !!slots.default)
const openTypeValue = computed(() => (isDisabled.value ? undefined : props.openType))
const resolvedLoadingText = computed(() => props.loadingText || internalLoadingText.value)

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

// 根节点样式：尺寸/颜色/边框/字体均通过 CSS var 注入；marginLeft/marginRight 与 width 直接 inline
const buttonStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {}
  if (props.width !== undefined) styles.width = useUnit(props.width)
  if (props.height !== undefined) styles["--ui-button-height"] = useUnit(props.height)
  if (props.padding !== undefined) styles["--ui-button-padding-x"] = useUnit(props.padding)
  if (props.color) styles["--ui-button-background"] = useColor(props.color)
  if (props.textColor) styles["--ui-button-text-color"] = useColor(props.textColor)
  if (props.textSize) styles["--ui-button-font-size"] = useUnit(props.textSize)
  if (props.textWeight) styles["--ui-button-font-weight"] = String(props.textWeight)
  if (props.borderColor) styles["--ui-button-border-color"] = useColor(props.borderColor)
  if (props.borderWidth !== undefined) styles["--ui-button-border-width"] = useUnit(props.borderWidth)
  if (props.borderRadius !== undefined) styles["--ui-button-radius"] = useUnit(props.borderRadius)
  if (props.shadow) styles["--ui-button-shadow"] = props.shadow
  if (props.marginLeft !== undefined) styles.marginLeft = useUnit(props.marginLeft)
  if (props.marginRight !== undefined) styles.marginRight = useUnit(props.marginRight)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

// 小程序开放能力事件桥接（disabled/loading 时静默）
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

// throttle 变化时重建节流实例
watch(
  () => props.throttle,
  (newThrottle) => {
    throttledEmit.value = markRaw(createThrottle(+newThrottle))
  },
)

// 通用事件桥接器（disabled/loading 时静默，否则转发 emit）
function createEventHandler(name: keyof typeof buttonEmits) {
  return (event: any) => {
    if (isLoading.value || isDisabled.value) return
    // @ts-ignore emits 联合类型过于复杂
    emits(name, event)
  }
}

// 点击事件（节流）
function handleClick(event: any) {
  if (isLoading.value || isDisabled.value) return
  throttledEmit.value(() => emits("click", event))
}

// 通过 ref 控制加载状态（外部命令式 API）
function setLoading(state: boolean, text?: string) {
  internalLoading.value = state
  if (text !== undefined) internalLoadingText.value = text
}

// 通过 ref 控制禁用状态（外部命令式 API）
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
.ui-button {
  --ui-button-height: 76rpx;
  --ui-button-radius: var(--ui-radius-sm);
  --ui-button-shadow: none;
  --ui-button-font-size: var(--ui-font-size-md);
  --ui-button-padding-x: var(--ui-spacing-md);
  --ui-button-background: var(--ui-color-primary);
  --ui-button-text-color: var(--ui-color-text-inverse);
  --ui-button-font-weight: normal;
  --ui-button-border-color: transparent;
  --ui-button-border-width: 0;
  color: var(--ui-button-text-color);

  height: var(--ui-button-height);
  margin: 0;
  display: flex;
  padding: 0 var(--ui-button-padding-x);
  overflow: visible;
  position: relative;
  font-size: var(--ui-button-font-size);
  appearance: none;
  background: var(--ui-button-background);
  box-shadow: var(--ui-button-shadow);
  box-sizing: border-box;
  text-align: center;
  transition: opacity var(--ui-transition-fast) var(--ui-transition-timing);
  align-items: center;
  font-weight: var(--ui-button-font-weight);
  line-height: 1;
  white-space: nowrap;
  border-color: var(--ui-button-border-color);
  border-style: solid;
  border-width: var(--ui-button-border-width);
  border-radius: var(--ui-button-radius);
  justify-content: center;
  -webkit-appearance: none;
  -webkit-font-smoothing: auto;

  // 点击态遮罩（::before 透明叠加层，&--active 时可见）
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

  // 尺寸档位（仅覆盖 height/padding-x/font-size 三个 var）
  &--mini {
    --ui-button-height: 48rpx;
    --ui-button-font-size: var(--ui-font-size-xs);
    --ui-button-padding-x: var(--ui-spacing-xs);
  }
  &--small {
    --ui-button-height: 56rpx;
    --ui-button-font-size: var(--ui-font-size-xs);
    --ui-button-padding-x: var(--ui-spacing-sm);
  }
  &--medium {
    --ui-button-height: 64rpx;
    --ui-button-font-size: var(--ui-font-size-sm);
    --ui-button-padding-x: var(--ui-spacing-sm);
  }
  &--normal {
    --ui-button-height: 76rpx;
    --ui-button-font-size: var(--ui-font-size-md);
    --ui-button-padding-x: var(--ui-spacing-md);
  }
  &--large {
    --ui-button-height: 88rpx;
    --ui-button-font-size: var(--ui-font-size-md);
    --ui-button-padding-x: var(--ui-spacing-md);
  }

  // 类型档位（仅覆盖 background；text-color 默认 inverse 适用所有彩色 type）
  &--primary {
    --ui-button-background: var(--ui-color-primary);
  }
  &--success {
    --ui-button-background: var(--ui-color-success);
  }
  &--warning {
    --ui-button-background: var(--ui-color-warning);
  }
  &--danger {
    --ui-button-background: var(--ui-color-danger);
  }
  &--info {
    --ui-button-background: var(--ui-color-info);
  }
  &--default {
    --ui-button-background: var(--ui-color-background);
    --ui-button-text-color: var(--ui-color-text);
    --ui-button-border-color: var(--ui-color-border);
    --ui-button-border-width: var(--ui-border-width);
  }

  // 镂空：文字用主色，背景透明，边框用主色
  &--plain {
    color: var(--ui-button-text-color);
    background: var(--ui-color-background);
    border-color: var(--ui-button-background);
    border-width: var(--ui-border-width);

    &::before {
      background: currentcolor;
    }

    &.ui-button--default {
      border-color: var(--ui-button-border-color);

      &::before {
        background: currentcolor;
      }
    }
  }

  // 文本按钮：去边框背景
  &--text {
    color: var(--ui-button-text-color);
    height: fit-content;
    display: inline-flex;
    padding: 0;
    background: transparent;
    line-height: normal;
    border-width: 0;
  }

  // text/plain 非 default 类型：text-color 默认跟随 background（textColor inline 显式时优先级最高）
  &--text:not(.ui-button--default),
  &--plain:not(.ui-button--default) {
    --ui-button-text-color: var(--ui-button-background);
  }

  &--block {
    width: 100%;
  }

  &--round {
    --ui-button-radius: var(--ui-radius-round);
  }

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;

    &.ui-button--text,
    &.ui-button--plain {
      background: transparent;
    }

    &.ui-button--text {
      border-color: transparent;
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
