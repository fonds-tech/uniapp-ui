<template>
  <view
    class="ui-stepper"
    :class="[classes, customClass]"
    :style="[style]"
    role="spinbutton"
    :aria-valuenow="+current"
    :aria-valuemin="+useProps.min"
    :aria-valuemax="+useProps.max"
    :aria-disabled="useProps.disabled"
  >
    <button
      v-if="showMinus"
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
        <view class="ui-stepper__minus" :style="[minusStyle]" :class="[minusClasses]" />
      </slot>
    </button>
    <view v-if="showInput" class="ui-stepper__value" @click="onClick">
      <input
        v-model="current"
        :style="[inputStyle]"
        class="ui-stepper__input"
        :class="[inputClasses]"
        :type="inputType"
        :disabled="inputDisabled"
        placeholder=""
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
      />
    </view>
    <button
      v-if="showPlus"
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
        <view class="ui-stepper__plus" :style="[plusStyle]" :class="[plusClasses]" />
      </slot>
    </button>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { addNumber } from "../utils/utils"
import { formatNumber } from "../utils/format"
import { callInterceptor } from "../utils/interceptor"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, nextTick } from "vue"
import { isEmpty, isEqual, isNumber, isFunction } from "../utils/check"
import { stepperEmits, stepperProps, useStepperProps } from "./index"

defineOptions({ name: "ui-stepper" })

const props = defineProps(stepperProps)
const emits = defineEmits(stepperEmits)
const useProps = useStepperProps(props)
const timer = ref(null)
const loading = ref(false)
const origin = ref(initialValue())
const current = ref(initialValue())
const isLongPress = ref(false)

const inputType = computed(() => (useProps.integer ? "number" : "digit"))
const plusDisabled = computed(() => useProps.disabled || useProps.disablePlus || +current.value >= +useProps.max)
const minusDisabled = computed(() => useProps.disabled || useProps.disableMinus || +current.value <= +useProps.min)
const inputDisabled = computed(() => useProps.disabled || useProps.disabledInput)
const showMinus = computed(() => useProps.showMinus)
const showPlus = computed(() => useProps.showPlus)
const showInput = computed(() => useProps.showInput)
const customClass = computed(() => useProps.customClass)

const style = computed(() => {
  const style: CSSProperties = {}
  if (useProps.height) {
    style.height = useUnit(useProps.height)
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-stepper--${useProps.size}`)
  list.push(`ui-stepper--${useProps.theme}`)
  if (useProps.disabled) list.push("ui-stepper--disabled")
  if (loading.value) list.push("ui-stepper--loading")
  return list
})

const minusStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(useProps.minusWidth)
  style.height = useUnit(useProps.height)
  style.background = useColor(useProps.minusColor)
  style.borderColor = useColor(useProps.minusBorderColor)
  style["--stepper-minus-text-size"] = useUnit(useProps.minusTextSize)
  return useStyle(style)
})

const plusStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(useProps.plusWidth)
  style.height = useUnit(useProps.height)
  style.background = useColor(useProps.plusColor)
  style.borderColor = useColor(useProps.plusBorderColor)
  style["--stepper-plus-text-size"] = useUnit(useProps.plusTextSize)
  return useStyle(style)
})

const inputStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.inputTextColor)
  style.width = useUnit(useProps.inputWidth)
  style.fontSize = useUnit(useProps.inputTextSize)
  style.fontWeight = useProps.inputTextWeight
  style.marginLeft = useUnit(useProps.inputGap)
  style.marginRight = useUnit(useProps.inputGap)
  style.background = useColor(useProps.inputColor)
  if (useProps.disabledInput) {
    style.pointerEvents = "none"
  }
  return useStyle(style)
})

const inputClasses = computed(() => {
  const list: string[] = []
  list.push(`ui-stepper__input--${useProps.theme}`)
  if (inputDisabled.value) list.push("ui-stepper__input--disabled")
  return list
})

const minusClasses = computed(() => {
  const list: string[] = []
  list.push(`ui-stepper__minus--${useProps.theme}`)
  if (loading.value) list.push("ui-stepper__minus--loading")
  if (minusDisabled.value) list.push("ui-stepper__minus--disabled")
  return list
})

const plusClasses = computed(() => {
  const list: string[] = []
  list.push(`ui-stepper__plus--${useProps.theme}`)
  if (loading.value) list.push("ui-stepper__plus--loading")
  if (plusDisabled.value) list.push("ui-stepper__plus--disabled")
  return list
})

watch(() => [useProps.max, useProps.min, useProps.integer, useProps.decimalLength], checkValue)

watch(
  () => useProps.modelValue,
  (value) => {
    if (!isEqual(value, current.value)) {
      origin.value = format(value)
      current.value = format(value)
    }
  },
)

function onPlus() {
  if (loading.value) return
  if (plusDisabled.value) {
    emits("overlimit", "plus")
    return
  }
  updateValue(format(addNumber(+current.value, +useProps.step)))
  emits("plus")
}

function onMinus() {
  if (loading.value) return
  if (minusDisabled.value) {
    emits("overlimit", "minus")
    return
  }
  updateValue(format(addNumber(+current.value, -useProps.step)))
  emits("minus")
}

function onBlur(event: any) {
  current.value = format(event.detail.value)
  if (+current.value !== +origin.value) {
    updateValue(current.value)
  }
  emits("blur", event)
}

function onFocus() {
  emits("focus")
}

function onClick() {
  if (useProps.disabledInput) {
    emits("click")
  }
}

function onInput(event: any) {
  const { value } = event.detail
  if (isEmpty(value)) return

  let formatted = formatNumber(value, !useProps.integer)

  if (isNumber(useProps.decimalLength) && formatted.includes(".")) {
    const pair = formatted.split(".")
    formatted = `${pair[0]}.${pair[1].slice(0, +useProps.decimalLength)}`
  }

  formatted = format(formatted)

  if (+origin.value === +formatted) return

  nextTick(() => {
    if (useProps.beforeChange) {
      current.value = String(current.value)
    } else if (!isEqual(value, formatted)) {
      current.value = formatted
    }

    updateValue(formatted)
  })
}

function onMinusTouchstart() {
  if (useProps.longPress) {
    isLongPress.value = false
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      isLongPress.value = true
      longPressStep("minus")
    }, 500)
  }
}
function onPlusTouchstart(event: any) {
  if (useProps.longPress) {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      isLongPress.value = true
      longPressStep("plus")
    }, 500)
    // #ifdef WEB
    // event.preventDefault()
    // #endif
  }
}

function onTouchend(event: TouchEvent) {
  if (!useProps.longPress) return
  clearInterval(timer.value)
}

function longPressStep(type = "plus") {
  timer.value = setTimeout(() => {
    type === "plus" ? onPlus() : onMinus()
    longPressStep(type)
  }, 200)
}

function checkValue() {
  const value = format(current.value)
  if (!isEqual(value, current.value)) {
    current.value = value
  }
}

function updateValue(value: any) {
  if (isNumber(value)) {
    const next = () => {
      loading.value = false
      if (+origin.value !== +value) {
        origin.value = value
        current.value = value
        emits("update:modelValue", value)
        emits("change", value, useProps.name)
      }
    }
    if (isFunction(useProps.beforeChange)) {
      loading.value = true
      callInterceptor(useProps.beforeChange, {
        args: [value, useProps.name],
        done() {
          next()
        },
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
}

function format(value: number | string, fixed = true) {
  value = formatNumber(String(value), !useProps.integer)
  value = value === "" ? 0 : +value
  value = Number.isNaN(value) ? +useProps.min : value
  value = fixed ? Math.max(Math.min(+useProps.max, value), +useProps.min) : value
  if (isNumber(useProps.decimalLength)) value = value.toFixed(+useProps.decimalLength)
  return String(value)
}

function initialValue() {
  const defaultValue = useProps.modelValue
  const value = format(defaultValue)
  if (!isEqual(value, useProps.modelValue)) {
    emits("update:modelValue", value)
  }
  return value
}
</script>

<script lang="ts">
export default {
  name: "ui-stepper",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-stepper {
  width: max-content;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  user-select: none;
  justify-content: center;

  // 尺寸
  &--small {
    --stepper-height: 56rpx;
    --stepper-font-size: var(--ui-font-size-xs);
    --stepper-icon-size: 20rpx;
    --stepper-button-size: 56rpx;
    --stepper-input-width: 64rpx;
  }

  &--medium {
    --stepper-height: 72rpx;
    --stepper-font-size: var(--ui-font-size-sm);
    --stepper-icon-size: 24rpx;
    --stepper-button-size: 72rpx;
    --stepper-input-width: 80rpx;
  }

  &--large {
    --stepper-height: 88rpx;
    --stepper-font-size: var(--ui-font-size-md);
    --stepper-icon-size: 28rpx;
    --stepper-button-size: 88rpx;
    --stepper-input-width: 96rpx;
  }

  height: var(--stepper-height);

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &--loading {
    pointer-events: none;
  }

  &__button {
    width: var(--stepper-button-size);
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

    &--loading {
      opacity: 0.5;
    }

    &[disabled] {
      opacity: var(--ui-opacity-disabled);
    }
  }

  &__minus {
    width: var(--stepper-button-size);
    height: 100%;
    position: relative;

    &::before {
      top: 50%;
      left: 50%;
      width: var(--stepper-icon-size);
      height: 3rpx;
      content: "";
      position: absolute;
      transform: translate(-50%, -50%);
      background-color: var(--ui-color-text-primary);
    }

    &--disabled {
      opacity: var(--ui-opacity-disabled);
    }

    &--loading {
      opacity: 0.5;
    }

    &--button {
      border-radius: var(--ui-radius-md) 0 0 var(--ui-radius-md);
      background-color: var(--ui-color-background-dark);
    }

    &--round {
      border: var(--ui-border-width) solid currentColor;
      border-radius: var(--ui-radius-round);
      background-color: var(--ui-color-background);
    }

    &--border {
      color: currentColor;
      border-right: var(--ui-border-width-thick) solid var(--ui-color-border-light);
      background-color: var(--ui-color-background);
    }
  }

  &__plus {
    width: var(--stepper-button-size);
    height: 100%;
    position: relative;

    &::before {
      top: 50%;
      left: 50%;
      width: var(--stepper-icon-size);
      height: 3rpx;
      content: "";
      position: absolute;
      transform: translate(-50%, -50%);
      background-color: currentColor;
    }

    &::after {
      top: 50%;
      left: 50%;
      width: 3rpx;
      height: var(--stepper-icon-size);
      content: "";
      position: absolute;
      transform: translate(-50%, -50%);
      background-color: currentColor;
    }

    &--disabled {
      opacity: var(--ui-opacity-disabled);
    }

    &--loading {
      opacity: 0.5;
    }

    &--button {
      border-radius: 0 var(--ui-radius-md) var(--ui-radius-md) 0;
      background-color: var(--ui-color-background-dark);
    }

    &--round {
      color: var(--ui-color-background);
      border: var(--ui-border-width) solid var(--ui-color-primary);
      border-radius: var(--ui-radius-round);
      background-color: var(--ui-color-primary);
    }

    &--border {
      color: currentColor;
      border-left: var(--ui-border-width-thick) solid var(--ui-color-border-light);
      background-color: var(--ui-color-background);
    }
  }

  &__value {
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__input {
    width: var(--stepper-input-width);
    height: 100%;
    margin: 0 var(--ui-spacing-xs);
    display: flex;
    font-size: var(--stepper-font-size);
    text-align: center;
    align-items: center;
    font-variant-numeric: tabular-nums;

    &--button {
      background-color: var(--ui-color-background-dark);
    }

    &--disabled {
      opacity: var(--ui-opacity-disabled);
    }
  }

  &--border {
    border: var(--ui-border-width-thick) solid var(--ui-color-border-light);
    overflow: hidden;
    border-radius: var(--ui-radius-round);
  }
}
</style>
