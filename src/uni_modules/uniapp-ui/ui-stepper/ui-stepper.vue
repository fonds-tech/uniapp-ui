<template>
  <view
    class="ui-stepper"
    :class="[classNames, customClass]"
    :style="[rootStyle]"
    role="spinbutton"
    :aria-valuenow="+current"
    :aria-valuemin="+props.min"
    :aria-valuemax="+props.max"
    :aria-disabled="effectiveDisabled"
  >
    <button
      v-if="props.showMinus"
      class="ui-stepper__button"
      :class="{ 'ui-stepper__button--loading': loading }"
      hover-class="ui-stepper__button--active"
      :disabled="minusDisabled || loading"
      aria-label="减少"
      @click.stop="onMinus"
      @touchend.stop="onTouchend"
      @touchstart="onMinusTouchstart"
    >
      <slot name="minus" :disabled="minusDisabled">
        <view class="ui-stepper__minus" :class="minusClasses" />
      </slot>
    </button>

    <view v-if="props.showInput" class="ui-stepper__value" @click="onClick">
      <input
        v-model="current"
        class="ui-stepper__input"
        :class="inputClasses"
        :type="inputType"
        :disabled="inputDisabled"
        placeholder=""
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
      />
    </view>

    <button
      v-if="props.showPlus"
      class="ui-stepper__button"
      :class="{ 'ui-stepper__button--loading': loading }"
      hover-class="ui-stepper__button--active"
      :disabled="plusDisabled || loading"
      aria-label="增加"
      @click.stop="onPlus"
      @touchstart="onPlusTouchstart"
      @touchend.stop="onTouchend"
    >
      <slot name="plus" :disabled="plusDisabled">
        <view class="ui-stepper__plus" :class="plusClasses" />
      </slot>
    </button>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { addNumber } from "../utils/utils"
import { formItemKey } from "../ui-form-item"
import { formatNumber } from "../utils/format"
import { callInterceptor } from "../utils/interceptor"
import { ref, watch, computed, nextTick } from "vue"
import { useUnit, useColor, useStyle, useParent } from "../hooks"
import { isEmpty, isEqual, isNumber, isFunction } from "../utils/check"
import { stepperEmits, stepperProps, STEPPER_LONG_PRESS_START, STEPPER_LONG_PRESS_INTERVAL } from "./index"

defineOptions({ name: "ui-stepper" })

const props = defineProps(stepperProps)
const emits = defineEmits(stepperEmits)

const { parent: formItem } = useParent(formItemKey)

const timer = ref<ReturnType<typeof setTimeout> | null>(null)
const loading = ref(false)
const origin = ref(initialValue())
const current = ref(initialValue())

const effectiveDisabled = computed(() => Boolean(props.disabled) || Boolean(formItem?.disabled?.value))
const effectiveReadonly = computed(() => Boolean(formItem?.readonly?.value))

const inputType = computed(() => (props.integer ? "number" : "digit"))
const plusDisabled = computed(() => effectiveDisabled.value || effectiveReadonly.value || props.disablePlus || +current.value >= +props.max)
const minusDisabled = computed(() => effectiveDisabled.value || effectiveReadonly.value || props.disableMinus || +current.value <= +props.min)
const inputDisabled = computed(() => effectiveDisabled.value || effectiveReadonly.value || props.disabledInput)

const classNames = computed(() => {
  const list: string[] = [`ui-stepper--${props.size}`, `ui-stepper--${props.theme}`]
  if (effectiveDisabled.value) list.push("ui-stepper--disabled")
  if (effectiveReadonly.value) list.push("ui-stepper--readonly")
  if (loading.value) list.push("ui-stepper--loading")
  return list
})

// 根节点 CSS var 注入：把所有 prop 转成 var，SCSS 单路径消费
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.height) vars["--ui-stepper-height"] = useUnit(props.height)
  if (props.inputGap) vars["--ui-stepper-input-gap"] = useUnit(props.inputGap)
  if (props.inputWidth) vars["--ui-stepper-input-width"] = useUnit(props.inputWidth)
  if (props.inputColor) vars["--ui-stepper-input-bg"] = useColor(props.inputColor)
  if (props.inputTextSize) vars["--ui-stepper-input-font-size"] = useUnit(props.inputTextSize)
  if (props.inputTextWeight) vars["--ui-stepper-input-font-weight"] = String(props.inputTextWeight)
  if (props.inputTextColor) vars["--ui-stepper-input-text-color"] = useColor(props.inputTextColor)
  if (props.minusWidth) vars["--ui-stepper-minus-width"] = useUnit(props.minusWidth)
  if (props.minusColor) vars["--ui-stepper-minus-bg"] = useColor(props.minusColor)
  if (props.minusBorderColor) vars["--ui-stepper-minus-border-color"] = useColor(props.minusBorderColor)
  if (props.plusWidth) vars["--ui-stepper-plus-width"] = useUnit(props.plusWidth)
  if (props.plusColor) vars["--ui-stepper-plus-bg"] = useColor(props.plusColor)
  if (props.plusBorderColor) vars["--ui-stepper-plus-border-color"] = useColor(props.plusBorderColor)
  if (props.borderColor) vars["--ui-stepper-border-color"] = useColor(props.borderColor)
  if (props.borderWidth) vars["--ui-stepper-border-width"] = useUnit(props.borderWidth)
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

const inputClasses = computed(() => {
  const list: string[] = [`ui-stepper__input--${props.theme}`]
  if (inputDisabled.value) list.push("ui-stepper__input--disabled")
  return list
})

const minusClasses = computed(() => {
  const list: string[] = [`ui-stepper__minus--${props.theme}`]
  if (loading.value) list.push("ui-stepper__minus--loading")
  if (minusDisabled.value) list.push("ui-stepper__minus--disabled")
  return list
})

const plusClasses = computed(() => {
  const list: string[] = [`ui-stepper__plus--${props.theme}`]
  if (loading.value) list.push("ui-stepper__plus--loading")
  if (plusDisabled.value) list.push("ui-stepper__plus--disabled")
  return list
})

watch(() => [props.max, props.min, props.integer, props.decimalLength], checkValue)
watch(
  () => props.modelValue,
  (value) => {
    if (!isEqual(value, current.value)) {
      origin.value = format(value)
      current.value = format(value)
    }
  },
)

function onPlus() {
  if (loading.value) return
  if (plusDisabled.value) return emits("overlimit", "plus")
  updateValue(format(addNumber(+current.value, +props.step)))
  emits("plus")
}

function onMinus() {
  if (loading.value) return
  if (minusDisabled.value) return emits("overlimit", "minus")
  updateValue(format(addNumber(+current.value, -+props.step)))
  emits("minus")
}

function onBlur(event: any) {
  current.value = format(event.detail.value)
  if (+current.value !== +origin.value) updateValue(current.value)
  emits("blur", event)
}

function onFocus() {
  emits("focus")
}

function onClick() {
  if (props.disabledInput) emits("click")
}

function onInput(event: any) {
  const { value } = event.detail
  if (isEmpty(value)) return

  let formatted = formatNumber(value, !props.integer)
  if (isNumber(props.decimalLength) && formatted.includes(".")) {
    const [int, dec] = formatted.split(".")
    formatted = `${int}.${dec.slice(0, +props.decimalLength)}`
  }
  formatted = format(formatted)

  if (+origin.value === +formatted) return

  nextTick(() => {
    if (!props.beforeChange && !isEqual(value, formatted)) {
      current.value = formatted
    }
    updateValue(formatted)
  })
}

function onMinusTouchstart() {
  startLongPress("minus")
}

function onPlusTouchstart() {
  startLongPress("plus")
}

function onTouchend() {
  if (!props.longPress) return
  clearLongPressTimer()
}

function startLongPress(type: "plus" | "minus") {
  if (!props.longPress) return
  clearLongPressTimer()
  timer.value = setTimeout(() => {
    longPressStep(type)
  }, STEPPER_LONG_PRESS_START)
}

function longPressStep(type: "plus" | "minus") {
  timer.value = setTimeout(() => {
    type === "plus" ? onPlus() : onMinus()
    longPressStep(type)
  }, STEPPER_LONG_PRESS_INTERVAL)
}

function clearLongPressTimer() {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

function checkValue() {
  const value = format(current.value)
  if (!isEqual(value, current.value)) current.value = value
}

function updateValue(value: number | string) {
  if (!isNumber(value)) return
  const next = () => {
    loading.value = false
    if (+origin.value === +value) return
    origin.value = value
    current.value = value
    emits("update:modelValue", value)
    emits("change", value, props.name)
  }
  if (isFunction(props.beforeChange)) {
    loading.value = true
    callInterceptor(props.beforeChange, {
      args: [value, props.name],
      done: next,
      error() {
        loading.value = false
        current.value = origin.value
      },
      canceled() {
        loading.value = false
        current.value = origin.value
      },
    })
  } else {
    next()
  }
}

function format(value: number | string, fixed = true): string {
  let v: number | string = formatNumber(String(value), !props.integer)
  v = v === "" ? 0 : +v
  v = Number.isNaN(v) ? +props.min : v
  v = fixed ? Math.max(Math.min(+props.max, v), +props.min) : v
  if (isNumber(props.decimalLength)) return (+v).toFixed(+props.decimalLength)
  return String(v)
}

function initialValue() {
  const value = format(props.modelValue)
  if (!isEqual(value, props.modelValue)) emits("update:modelValue", value)
  return value
}
</script>

<script lang="ts">
export default {
  name: "ui-stepper",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-stepper {
  --ui-stepper-height: 72rpx;
  --ui-stepper-plus-bg: var(--ui-color-primary);
  --ui-stepper-input-bg: transparent;
  --ui-stepper-minus-bg: var(--ui-color-background-section);
  --ui-stepper-icon-size: 24rpx;
  --ui-stepper-input-gap: var(--ui-spacing-xs);
  --ui-stepper-icon-color: var(--ui-color-text);
  --ui-stepper-plus-width: var(--ui-stepper-button-size);
  --ui-stepper-button-size: 72rpx;
  --ui-stepper-input-width: 80rpx;
  --ui-stepper-minus-width: var(--ui-stepper-button-size);
  --ui-stepper-border-color: var(--ui-color-border-light);
  --ui-stepper-border-width: var(--ui-border-width-thick);
  --ui-stepper-icon-thickness: 3rpx;
  --ui-stepper-input-font-size: var(--ui-font-size-sm);
  --ui-stepper-plus-icon-color: var(--ui-color-text-inverse);
  --ui-stepper-input-text-color: var(--ui-color-text);
  --ui-stepper-input-font-weight: var(--ui-font-weight-normal);
  --ui-stepper-plus-border-color: var(--ui-color-primary);
  --ui-stepper-minus-border-color: var(--ui-color-border-light);

  width: max-content;
  height: var(--ui-stepper-height);
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  user-select: none;
  justify-content: center;

  // size 预设
  &--small {
    --ui-stepper-height: 56rpx;
    --ui-stepper-icon-size: 20rpx;
    --ui-stepper-button-size: 56rpx;
    --ui-stepper-input-width: 64rpx;
    --ui-stepper-input-font-size: var(--ui-font-size-xs);
  }

  &--medium {
    --ui-stepper-height: 72rpx;
    --ui-stepper-icon-size: 24rpx;
    --ui-stepper-button-size: 72rpx;
    --ui-stepper-input-width: 80rpx;
    --ui-stepper-input-font-size: var(--ui-font-size-sm);
  }

  &--large {
    --ui-stepper-height: 88rpx;
    --ui-stepper-icon-size: 28rpx;
    --ui-stepper-button-size: 88rpx;
    --ui-stepper-input-width: 96rpx;
    --ui-stepper-input-font-size: var(--ui-font-size-md);
  }

  // theme 预设
  &--border {
    border: var(--ui-stepper-border-width) solid var(--ui-stepper-border-color);
    overflow: hidden;
    border-radius: var(--ui-radius-round);
  }

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &--readonly .ui-stepper__button,
  &--readonly .ui-stepper__input {
    pointer-events: none;
  }

  &--loading {
    pointer-events: none;
  }

  &__button {
    width: var(--ui-stepper-button-size);
    height: 100%;
    margin: 0;
    display: flex;
    padding: 0;
    position: relative;
    align-items: center;
    border-radius: 0;
    vertical-align: middle;
    justify-content: center;
    background-color: transparent;

    &::after {
      content: none;
    }

    &--active {
      opacity: var(--ui-opacity-active);
    }

    &--loading,
    &[disabled] {
      opacity: var(--ui-opacity-disabled);
    }
  }

  &__minus,
  &__plus {
    width: var(--ui-stepper-button-size);
    height: 100%;
    position: relative;

    &--loading,
    &--disabled {
      opacity: var(--ui-opacity-disabled);
    }
  }

  // 减号横线
  &__minus::before {
    top: 50%;
    left: 50%;
    width: var(--ui-stepper-icon-size);
    height: var(--ui-stepper-icon-thickness);
    content: "";
    position: absolute;
    transform: translate(-50%, -50%);
    background: var(--ui-stepper-icon-color);
  }

  // 加号横竖两条
  &__plus::before,
  &__plus::after {
    top: 50%;
    left: 50%;
    content: "";
    position: absolute;
    transform: translate(-50%, -50%);
    background: currentColor;
  }

  &__plus::before {
    width: var(--ui-stepper-icon-size);
    height: var(--ui-stepper-icon-thickness);
  }

  &__plus::after {
    width: var(--ui-stepper-icon-thickness);
    height: var(--ui-stepper-icon-size);
  }

  // theme: button（块状）
  &__minus--button {
    width: var(--ui-stepper-minus-width);
    background: var(--ui-stepper-minus-bg);
    border-radius: var(--ui-radius-md) 0 0 var(--ui-radius-md);
  }

  &__plus--button {
    color: var(--ui-stepper-plus-icon-color);
    width: var(--ui-stepper-plus-width);
    background: var(--ui-stepper-plus-bg);
    border-radius: 0 var(--ui-radius-md) var(--ui-radius-md) 0;
  }

  // theme: round
  &__minus--round {
    color: var(--ui-stepper-icon-color);
    width: var(--ui-stepper-minus-width);
    border: var(--ui-border-width) solid currentColor;
    background: var(--ui-color-background);
    border-radius: var(--ui-radius-round);
  }

  &__plus--round {
    color: var(--ui-stepper-plus-icon-color);
    width: var(--ui-stepper-plus-width);
    border: var(--ui-border-width) solid var(--ui-stepper-plus-bg);
    background: var(--ui-stepper-plus-bg);
    border-radius: var(--ui-radius-round);
  }

  // theme: border
  &__minus--border {
    color: var(--ui-stepper-icon-color);
    background: var(--ui-color-background);
    border-right: var(--ui-stepper-border-width) solid var(--ui-stepper-minus-border-color);
  }

  &__plus--border {
    color: var(--ui-stepper-icon-color);
    background: var(--ui-color-background);
    border-left: var(--ui-stepper-border-width) solid var(--ui-stepper-plus-border-color);
  }

  &__value {
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__input {
    color: var(--ui-stepper-input-text-color);
    width: var(--ui-stepper-input-width);
    height: 100%;
    margin: 0 var(--ui-stepper-input-gap);
    display: flex;
    font-size: var(--ui-stepper-input-font-size);
    background: var(--ui-stepper-input-bg);
    text-align: center;
    align-items: center;
    font-weight: var(--ui-stepper-input-font-weight);
    font-variant-numeric: tabular-nums;

    &--button {
      background: var(--ui-color-background-input);
    }

    &--disabled {
      opacity: var(--ui-opacity-disabled);
    }
  }
}
</style>
