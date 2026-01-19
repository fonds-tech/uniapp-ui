<template>
  <view class="ui-input" :class="[classs, useProps.customClass]" :style="[style]" @click="onClick">
    <input
      class="ui-input__input"
      :style="[inputStyle]"
      :class="[inputClass]"
      :value="current"
      :type="type"
      :focus="useProps.focus"
      :cursor="+useProps.cursor"
      :password="password"
      :disabled="disabled"
      :maxlength="+useProps.maxlength"
      :auto-blur="useProps.autoBlur"
      :confirm-type="useProps.confirmType"
      :confirm-hold="useProps.confirmHold"
      :hold-keyboard="useProps.holdKeyboard"
      :placeholder="useProps.placeholder"
      :cursor-color="useProps.cursorColor"
      :adjust-position="useProps.adjustPosition"
      :cursor-spacing="+useProps.cursorSpacing"
      :selection-end="+useProps.selectionEnd"
      :selection-start="+useProps.selectionStart"
      :placeholder-style="placeholderStyle"
      :ignore-composition-event="useProps.ignoreCompositionEvent"
      @blur="onBlur"
      @input="onInput"
      @focus="onFocus"
      @confirm="onConfirm"
      @keyboardheightchange="onKeyboardheightchange"
    />
    <view v-if="useProps.clearable && current && isFocus" class="ui-input__clear" :style="[clearStyle]" @click="onClickClear">
      <ui-icon :name="useProps.clearIcon" :size="useProps.clearIconSize" :color="useProps.clearIconColor" :weight="useProps.clearIconWeight" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { formItemKey } from "../ui-form-item"
import { ref, watch, computed } from "vue"
import { inputEmits, inputProps, useInputProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-input" })

const props = defineProps(inputProps)
const emits = defineEmits(inputEmits)
const useProps = useInputProps(props)
const { parent } = useParent(formItemKey)

const current = ref("")
const isFocus = ref(false)

const style = computed(() => {
  const style: any = {}
  style.width = useUnit(useProps.width)
  style.height = useUnit(useProps.height)
  style.padding = useUnit(useProps.padding)
  style.background = useColor(useProps.background)
  style.borderRadius = useUnit(useProps.radius)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (useProps.readonly) list.push("ui-input--readonly")
  if (useProps.disabled) list.push("ui-input--disabled")
  if (useProps.clearable) list.push("ui-input--clearable")
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

const inputClass = computed(() => {
  const list: string[] = []
  list.push(`ui-input__input--${useProps.inputAlign}`)
  if (useProps.readonly) list.push("ui-input__input--readonly")
  return list
})

const clearStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(useProps.clearIconSize)
  style.height = useUnit(useProps.clearIconSize)
  style.backgroundColor = useColor(useProps.clearIconBackground)
  return useStyle(style)
})

const placeholderStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.placeholderColor)
  return useStyle({ ...style, ...useStyle(useProps.placeholderStyle) }, "string")
})

const type = computed(() => {
  return useProps.type === "password" || useProps.password ? "text" : useProps.type
})

const password = computed(() => {
  return useProps.password || useProps.type === "password"
})

const disabled = computed(() => {
  return useProps.disabled || useProps.readonly
})

// 空值统一映射为空字符串，避免出现 "undefined"/"null" 文案
function normalizeValue(value: unknown): string {
  if (value === null || value === undefined) return ""
  return String(value)
}

watch(
  () => useProps.modelValue,
  (val) => {
    current.value = normalizeValue(val)
  },
  { immediate: true },
)

/**
 * 重置输入值
 * @param value - 需要重置的值
 */
function reset(value: any) {
  const normalized = normalizeValue(value)
  current.value = normalized
  updateValue(normalized)
}

async function updateValue(value: string) {
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
  const value = normalizeValue(event?.detail?.value)
  current.value = value
  updateValue(value)
  parent?.onChange(current.value)
}

function onClickClear() {
  current.value = ""
  updateValue("")
  emits("clear")
  // 清空属于值变化，触发表单 change 校验
  parent?.onChange(current.value)
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
    opacity: var(--ui-opacity-disabled);
  }

  &__input {
    flex: 1;
    height: 100%;
    display: flex;
    font-size: var(--ui-font-size-sm);
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
    padding: var(--ui-spacing-xs);
    box-sizing: content-box;
    align-items: center;
    margin-left: var(--ui-spacing-sm);
    border-radius: var(--ui-radius-round);
    justify-content: center;
    background-color: var(--ui-color-text-placeholder);
  }
}
</style>
