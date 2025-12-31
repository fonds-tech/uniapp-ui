<template>
  <view class="ui-input" :class="[classs, props.customClass]" :style="[style]" @click="onClick">
    <input
      class="ui-input__input"
      :style="[inputStyle]"
      :class="[inputClass]"
      :value="current"
      :type="type"
      :focus="props.focus"
      :cursor="+props.cursor"
      :password="password"
      :disabled="disabled"
      :maxlength="+props.maxlength"
      :auto-blur="props.autoBlur"
      :confirm-type="props.confirmType"
      :confirm-hold="props.confirmHold"
      :hold-keyboard="props.holdKeyboard"
      :placeholder="props.placeholder"
      :cursor-color="props.cursorColor"
      :adjust-position="props.adjustPosition"
      :cursor-spacing="+props.cursorSpacing"
      :selection-end="+props.selectionEnd"
      :selection-start="+props.selectionStart"
      :placeholder-style="placeholderStyle"
      :ignore-composition-event="props.ignoreCompositionEvent"
      @blur="onBlur"
      @input="onInput"
      @focus="onFocus"
      @confirm="onConfirm"
      @keyboardheightchange="onKeyboardheightchange"
    />
    <view v-if="props.clearable && current && isFocus" class="ui-input__clear" :style="[clearStyle]" @click="onClickClear">
      <ui-icon :name="props.clearIcon" :size="props.clearIconSize" :color="props.clearIconColor" :weight="props.clearIconWeight" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { formItemKey } from "../ui-form-item"
import { inputEmits, inputProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-input" })

const props = defineProps(inputProps)
const emits = defineEmits(inputEmits)

const { parent } = useParent(formItemKey)

const current = ref("")
const isFocus = ref(false)

const style = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.padding = useUnit(props.padding)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.readonly) list.push("ui-input--readonly")
  if (props.disabled) list.push("ui-input--disabled")
  if (props.clearable) list.push("ui-input--clearable")
  return list
})

const inputStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  style.textAlign = props.inputAlign
  return useStyle(style)
})

const inputClass = computed(() => {
  const list: string[] = []
  list.push(`ui-input__input--${props.inputAlign}`)
  if (props.readonly) list.push("ui-input__input--readonly")
  return list
})

const clearStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.clearIconSize)
  style.height = useUnit(props.clearIconSize)
  return useStyle(style)
})

const placeholderStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.placeholderColor)
  return useStyle({ ...style, ...useStyle(props.placeholderStyle) }, "string")
})

const type = computed(() => {
  return props.type === "password" ? "text" : props.type
})

const password = computed(() => {
  return props.type === "password" ? true : props.password
})

const disabled = computed(() => {
  return props.disabled || props.readonly
})

watch(
  () => props.modelValue,
  (val) => {
    current.value = String(val)
  },
  { immediate: true },
)

function reset(value: any) {
  current.value = value
  upadteValue(value)
}

async function upadteValue(value: string) {
  emits("input", value)
  emits("change", value)
  emits("update:modelValue", value)
}

function onBlur() {
  setTimeout(() => (isFocus.value = false), 100)
  emits("blur", current.value)
  parent?.onBlur(current.value)
}

function onFocus() {
  isFocus.value = true
  emits("focus")
}

function onConfirm() {
  emits("confirm", current.value)
}

function onClick() {
  emits("click")
}

function onKeyboardheightchange() {
  emits("keyboardheightchange")
}

function onInput(event: any) {
  current.value = event.detail.value
  upadteValue(event.detail.value)
  parent?.onChange(current.value)
}

function onClickClear() {
  current.value = ""
  upadteValue("")
  emits("clear")
  parent?.onBlur(current.value)
}

defineExpose({ reset })
</script>

<script lang="ts">
export default {
  name: "ui-input",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-input {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__input {
    flex: 1;
    height: 100%;
    display: flex;
    font-size: 24rpx;
    align-items: center;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
    &--readonly {
      pointer-events: none;
    }
  }

  &__clear {
    display: flex;
    padding: 4rpx;
    box-sizing: content-box;
    align-items: center;
    margin-left: 8rpx;
    border-radius: 9999px;
    justify-content: center;
    background-color: #c6c7cb;
  }
}
</style>
