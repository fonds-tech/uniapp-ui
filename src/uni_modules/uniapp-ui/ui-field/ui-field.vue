<template>
  <view class="ui-field" :class="[classs, customClass]" :style="[style]">
    <view v-if="label || slots.label" class="ui-field__label" :class="[labelClass]" :style="[labelStyle]">
      <slot name="label"> {{ label }}{{ colon ? ":" : "" }} </slot>
    </view>
    <view v-if="prefixIcon || slots.prefixIcon" class="ui-field__prefix">
      <slot name="prefix">
        <ui-icon :name="prefixIcon" :size="prefixIconSize" :color="prefixIconColor" :weight="prefixIconWeight" />
      </slot>
    </view>
    <ui-textarea
      v-if="type === 'textarea'"
      v-model="current"
      :style="[textareaStyle]"
      :fixed="fixed"
      :focus="focus"
      :disabled="disabled"
      :placeholder="placeholder"
      :placeholder-style="placeholderStyle"
      :cursor="+cursor"
      :input-align="inputAlign"
      :cursor-spacing="+cursorSpacing"
      :auto-height="autosize"
      :show-confirm-bar="showConfirmBar"
      :selection-start="+selectionStart"
      :selection-end="+selectionEnd"
      :adjust-position="adjustPosition"
      :disable-default-padding="disableDefaultPadding"
      :hold-keyboard="holdKeyboard"
      :maxlength="+maxlength"
      :confirm-type="confirmType"
      :ignore-composition-event="ignoreCompositionEvent"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @clear="onClear"
      @confirm="onConfirm"
      @linechange="onLinechange"
      @keyboardheightchange="onKeyboardheightchange"
    />
    <ui-input
      v-else
      v-model="current"
      :style="[inputStyle]"
      :type="type"
      :focus="focus"
      :cursor="+cursor"
      :disabled="disabled"
      :maxlength="+maxlength"
      :auto-blur="autoBlur"
      :input-align="inputAlign"
      :confirm-type="confirmType"
      :confirm-hold="confirmHold"
      :hold-keyboard="holdKeyboard"
      :placeholder="placeholder"
      :adjust-position="adjustPosition"
      :cursor-spacing="+cursorSpacing"
      :selection-end="+selectionEnd"
      :selection-start="+selectionStart"
      :placeholder-style="placeholderStyle"
      :ignore-composition-event="ignoreCompositionEvent"
      @blur="onBlur"
      @input="onInput"
      @clear="onClear"
      @focus="onFocus"
      @confirm="onConfirm"
      @keyboardheightchange="onKeyboardheightchange"
    />
    <view v-if="suffixIcon || slots.suffixIcon" class="ui-field__suffix">
      <ui-icon :name="suffixIcon" :size="suffixIconSize" :color="suffixIconColor" :weight="suffixIconWeight" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUnit, useColor, useStyle } from "../hooks"
import { fieldEmits, fieldProps, useFieldProps } from "./index"

defineOptions({ name: "ui-field" })

const props = defineProps(fieldProps)
const emits = defineEmits(fieldEmits)
const useProps = useFieldProps(props)
const slots = useSlots()
const current = ref("")
const isFocus = ref(false)

const style = computed(() => {
  const style: any = {}
  style.border = useProps.border
  style.width = useUnit(useProps.width)
  style.height = useUnit(useProps.height)
  style.minHeight = useUnit(useProps.minHeight)
  style.background = useColor(useProps.background)
  style.borderRadius = useUnit(useProps.borderRadius)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  list.push(`ui-field--${useProps.type}`)
  if (useProps.readonly) list.push("ui-field--readonly")
  if (useProps.disabled) list.push("ui-field--disabled")
  if (useProps.labelAlign) list.push(`ui-field--${useProps.labelAlign}`)
  return list
})

const inputStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.color)
  style.fontSize = useUnit(useProps.fontSize)
  style.fontWeight = useProps.fontWeight
  style.textAlign = useProps.inputAlign
  return useStyle(style)
})

const labelStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(useProps.labelWidth)
  style.color = useColor(useProps.labelColor)
  style.fontSize = useUnit(useProps.labelSize)
  style.fontWeight = useProps.labelWeight
  style.textAlign = useProps.labelAlign
  return useStyle(style)
})

const labelClass = computed(() => {
  const list: string[] = []
  if (useProps.labelAlign) list.push(`ui-field__label--${useProps.labelAlign}`)
  return list
})

const textareaStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.color)
  style.fontSize = useUnit(useProps.fontSize)
  style.fontWeight = useProps.fontWeight
  return useStyle(style)
})

const placeholderStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.placeholderColor)
  return useStyle({ ...style, ...useStyle(useProps.placeholderStyle) }, "string")
})

const type = computed(() => {
  return useProps.type as any
})

const disabled = computed(() => {
  return useProps.disabled || useProps.readonly
})

watch(
  () => useProps.modelValue,
  (val) => (current.value = String(val)),
  { immediate: true },
)

function reset(value: any) {
  current.value = value
  upadteValue(value)
}

async function upadteValue(value: string) {
  emits("change", value)
  emits("update:modelValue", value)
}

function onInput(value: any) {
  current.value = value
  upadteValue(value)
}

function onClear() {
  emits("clear")
  upadteValue("")
}

function onBlur() {
  setTimeout(() => (isFocus.value = false), 100)
  emits("blur", current.value)
}

function onFocus() {
  isFocus.value = true
  emits("focus")
}

function onConfirm() {
  emits("confirm", current.value)
}

function onLinechange(event: any) {
  emits("linechange", event)
}

function onKeyboardheightchange() {
  emits("keyboardheightchange")
}

defineExpose({ name: "ui-field", prop: useProps.prop, modelValue: useProps.modelValue, reset })
</script>

<script lang="ts">
export default {
  name: "ui-field",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-field {
  flex: 1;
  display: flex;

  &--top {
    display: flex;
    flex-direction: column;
  }

  &--center:not(&--textarea) {
    display: flex;
    align-items: center;
  }

  &--right:not(&--textarea) {
    display: flex;
    align-items: center;
  }

  &--disabled {
    opacity: 0.6;
  }

  &__input {
    flex: 1;
    height: 100%;
    display: flex;
    font-size: inherit;
  }

  &__textarea {
    width: 100%;
    font-size: inherit;
  }

  &__count {
    flex: 1;
    color: #909193;
    margin-top: 8rpx;
    text-align: right;
  }

  &__label {
    height: max-content;
    margin-right: 16rpx;

    &--top {
      width: 100%;
      display: flex;
      text-align: left;
      margin-bottom: 16rpx;
      overflow-wrap: break-word;
    }

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &__value {
    flex: 1;
    display: flex;
    overflow: hidden;
    position: relative;
    flex-wrap: wrap;
    word-wrap: break-word;
    vertical-align: middle;
  }

  &__clear {
    display: flex;
    padding: 4rpx;
    box-sizing: content-box;
    align-items: center;
    border-radius: 9999px;
    justify-content: center;
    background-color: #c6c7cb;
  }

  &__prefix {
    margin-right: 16rpx;
  }

  &__suffix {
    margin-left: 16rpx;
  }
}
</style>
