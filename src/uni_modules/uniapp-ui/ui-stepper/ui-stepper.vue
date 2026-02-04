<template>
  <view
    class="ui-stepper"
    :class="[classes, customClass]"
    :style="[style]"
    role="spinbutton"
    :aria-valuenow="+current"
    :aria-valuemin="+props.min"
    :aria-valuemax="+props.max"
    :aria-disabled="props.disabled"
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
import { stepperEmits, stepperProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, nextTick } from "vue"
import { isEmpty, isEqual, isNumber, isFunction } from "../utils/check"

defineOptions({ name: "ui-stepper" })

const props = defineProps(stepperProps)
const emits = defineEmits(stepperEmits)

// 定时器
const timer = ref(null)
// 加载状态
const loading = ref(false)
// 原始值
const origin = ref(initialValue())
// 当前值
const current = ref(initialValue())
// 是否长按中
const isLongPress = ref(false)

// 输入类型
const inputType = computed(() => (props.integer ? "number" : "digit"))
// 加号是否禁用
const plusDisabled = computed(() => props.disabled || props.disablePlus || +current.value >= +props.max)
// 减号是否禁用
const minusDisabled = computed(() => props.disabled || props.disableMinus || +current.value <= +props.min)
// 输入框是否禁用
const inputDisabled = computed(() => props.disabled || props.disabledInput)
// 是否显示减号
const showMinus = computed(() => props.showMinus)
// 是否显示加号
const showPlus = computed(() => props.showPlus)
// 是否显示输入框
const showInput = computed(() => props.showInput)
// 自定义类名
const customClass = computed(() => props.customClass)
// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  if (props.height) {
    style.height = useUnit(props.height)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 类名数组
const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-stepper--${props.size}`)
  list.push(`ui-stepper--${props.theme}`)
  if (props.disabled) list.push("ui-stepper--disabled")
  if (loading.value) list.push("ui-stepper--loading")
  return list
})
// 减号样式
const minusStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.minusWidth)
  style.height = useUnit(props.height)
  style.background = useColor(props.minusColor)
  style.borderColor = useColor(props.minusBorderColor)
  style["--stepper-minus-text-size"] = useUnit(props.minusTextSize)
  return useStyle(style)
})
// 加号样式
const plusStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.plusWidth)
  style.height = useUnit(props.height)
  style.background = useColor(props.plusColor)
  style.borderColor = useColor(props.plusBorderColor)
  style["--stepper-plus-text-size"] = useUnit(props.plusTextSize)
  return useStyle(style)
})
// 输入框样式
const inputStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(props.inputTextColor)
  style.width = useUnit(props.inputWidth)
  style.fontSize = useUnit(props.inputTextSize)
  style.fontWeight = props.inputTextWeight
  style.marginLeft = useUnit(props.inputGap)
  style.marginRight = useUnit(props.inputGap)
  style.background = useColor(props.inputColor)
  if (props.disabledInput) {
    style.pointerEvents = "none"
  }
  return useStyle(style)
})
// 输入框类名
const inputClasses = computed(() => {
  const list: string[] = []
  list.push(`ui-stepper__input--${props.theme}`)
  if (inputDisabled.value) list.push("ui-stepper__input--disabled")
  return list
})
// 减号类名
const minusClasses = computed(() => {
  const list: string[] = []
  list.push(`ui-stepper__minus--${props.theme}`)
  if (loading.value) list.push("ui-stepper__minus--loading")
  if (minusDisabled.value) list.push("ui-stepper__minus--disabled")
  return list
})
// 加号类名
const plusClasses = computed(() => {
  const list: string[] = []
  list.push(`ui-stepper__plus--${props.theme}`)
  if (loading.value) list.push("ui-stepper__plus--loading")
  if (plusDisabled.value) list.push("ui-stepper__plus--disabled")
  return list
})

// 监听边界值变化
watch(() => [props.max, props.min, props.integer, props.decimalLength], checkValue)
// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (value) => {
    if (!isEqual(value, current.value)) {
      origin.value = format(value)
      current.value = format(value)
    }
  },
)

// 点击加号
function onPlus() {
  if (loading.value) return
  if (plusDisabled.value) {
    emits("overlimit", "plus")
    return
  }
  updateValue(format(addNumber(+current.value, +props.step)))
  emits("plus")
}

// 点击减号
function onMinus() {
  if (loading.value) return
  if (minusDisabled.value) {
    emits("overlimit", "minus")
    return
  }
  updateValue(format(addNumber(+current.value, -props.step)))
  emits("minus")
}

// 输入框失焦
function onBlur(event: any) {
  current.value = format(event.detail.value)
  if (+current.value !== +origin.value) {
    updateValue(current.value)
  }
  emits("blur", event)
}

// 输入框聚焦
function onFocus() {
  emits("focus")
}

// 点击输入框区域
function onClick() {
  if (props.disabledInput) {
    emits("click")
  }
}

// 输入事件
function onInput(event: any) {
  const { value } = event.detail
  if (isEmpty(value)) return

  let formatted = formatNumber(value, !props.integer)

  if (isNumber(props.decimalLength) && formatted.includes(".")) {
    const pair = formatted.split(".")
    formatted = `${pair[0]}.${pair[1].slice(0, +props.decimalLength)}`
  }

  formatted = format(formatted)

  if (+origin.value === +formatted) return

  nextTick(() => {
    if (props.beforeChange) {
      current.value = String(current.value)
    } else if (!isEqual(value, formatted)) {
      current.value = formatted
    }

    updateValue(formatted)
  })
}

// 减号长按开始
function onMinusTouchstart() {
  if (props.longPress) {
    isLongPress.value = false
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      isLongPress.value = true
      longPressStep("minus")
    }, 500)
  }
}

// 加号长按开始
function onPlusTouchstart(event: any) {
  if (props.longPress) {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      isLongPress.value = true
      longPressStep("plus")
    }, 500)
  }
}

// 触摸结束
function onTouchend(event: TouchEvent) {
  if (!props.longPress) return
  clearInterval(timer.value)
}

// 长按步进
function longPressStep(type = "plus") {
  timer.value = setTimeout(() => {
    type === "plus" ? onPlus() : onMinus()
    longPressStep(type)
  }, 200)
}

// 检查并校正值
function checkValue() {
  const value = format(current.value)
  if (!isEqual(value, current.value)) {
    current.value = value
  }
}

// 更新值
function updateValue(value: any) {
  if (isNumber(value)) {
    const next = () => {
      loading.value = false
      if (+origin.value !== +value) {
        origin.value = value
        current.value = value
        emits("update:modelValue", value)
        emits("change", value, props.name)
      }
    }
    if (isFunction(props.beforeChange)) {
      loading.value = true
      callInterceptor(props.beforeChange, {
        args: [value, props.name],
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

// 格式化值
function format(value: number | string, fixed = true) {
  value = formatNumber(String(value), !props.integer)
  value = value === "" ? 0 : +value
  value = Number.isNaN(value) ? +props.min : value
  value = fixed ? Math.max(Math.min(+props.max, value), +props.min) : value
  if (isNumber(props.decimalLength)) value = value.toFixed(+props.decimalLength)
  return String(value)
}

// 初始化值
function initialValue() {
  const defaultValue = props.modelValue
  const value = format(defaultValue)
  if (!isEqual(value, props.modelValue)) {
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
      background-color: var(--ui-color-text);
    }

    &--disabled {
      opacity: var(--ui-opacity-disabled);
    }

    &--loading {
      opacity: 0.5;
    }

    &--button {
      border-radius: var(--ui-radius-md) 0 0 var(--ui-radius-md);
      background-color: var(--ui-color-background-section);
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
      background-color: var(--ui-color-background-section);
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
      background-color: var(--ui-color-background-input);
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
