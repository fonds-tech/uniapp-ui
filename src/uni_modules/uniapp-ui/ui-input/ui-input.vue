<template>
  <view
    class="ui-input"
    :class="[classNames, props.customClass]"
    :style="[rootStyle]"
    :aria-disabled="effectiveDisabled || undefined"
    :aria-readonly="effectiveReadonly || undefined"
    @click="onClick"
  >
    <slot name="prefix">
      <view v-if="props.prefixIcon" class="ui-input__prefix">
        <ui-icon :name="props.prefixIcon" :size="props.prefixIconSize" :color="props.prefixIconColor" :weight="props.prefixIconWeight" />
      </view>
    </slot>
    <input
      class="ui-input__input"
      :style="[inputStyle]"
      :class="[inputClass]"
      :value="current"
      :type="type"
      :focus="props.focus"
      :cursor="props.cursor"
      :password="password"
      :disabled="disabled"
      :maxlength="props.maxlength"
      :auto-blur="props.autoBlur"
      :confirm-type="props.confirmType"
      :confirm-hold="props.confirmHold"
      :hold-keyboard="props.holdKeyboard"
      :placeholder="props.placeholder"
      :cursor-color="props.cursorColor"
      :adjust-position="props.adjustPosition"
      :cursor-spacing="props.cursorSpacing"
      :selection-end="props.selectionEnd"
      :selection-start="props.selectionStart"
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
    <slot name="suffix">
      <view v-if="props.suffixIcon" class="ui-input__suffix">
        <ui-icon :name="props.suffixIcon" :size="props.suffixIconSize" :color="props.suffixIconColor" :weight="props.suffixIconWeight" />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { formItemKey } from "../ui-form-item"
import { ref, watch, computed } from "vue"
import { inputEmits, inputProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-input" })

const props = defineProps(inputProps)
const emits = defineEmits(inputEmits)

const { parent } = useParent(formItemKey)

const current = ref("")
const isFocus = ref(false)

const type = computed(() => (props.type === "password" || props.password ? "text" : props.type))
const password = computed(() => props.password || props.type === "password")
const effectiveDisabled = computed(() => Boolean(props.disabled) || Boolean(parent?.disabled?.value))
const effectiveReadonly = computed(() => Boolean(props.readonly) || Boolean(parent?.readonly?.value))
// disabled 或 readonly 都阻止 input 接受输入
const disabled = computed(() => effectiveDisabled.value || effectiveReadonly.value)

const rootStyle = computed(() => {
  const style: CSSProperties = {
    width: useUnit(props.width),
    height: useUnit(props.height),
    border: props.border,
    padding: useUnit(props.padding),
    background: useColor(props.background),
    borderRadius: useUnit(props.radius),
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classNames = computed(() => {
  const list: string[] = []
  if (effectiveReadonly.value) list.push("ui-input--readonly")
  if (effectiveDisabled.value) list.push("ui-input--disabled")
  if (props.clearable) list.push("ui-input--clearable")
  return list
})

const inputClass = computed(() => {
  const list: string[] = [`ui-input__input--${props.inputAlign}`]
  if (effectiveReadonly.value) list.push("ui-input__input--readonly")
  return list
})

const inputStyle = computed(() => {
  const style: CSSProperties = {
    color: useColor(props.color),
    fontSize: useUnit(props.fontSize),
    fontWeight: props.fontWeight,
    textAlign: props.inputAlign,
  }
  return useStyle(style)
})

const clearStyle = computed(() => useStyle({ width: useUnit(props.clearIconSize), height: useUnit(props.clearIconSize) } as CSSProperties))

const placeholderStyle = computed(() => useStyle({ color: useColor(props.placeholderColor), ...useStyle(props.placeholderStyle) } as CSSProperties, "string"))

watch(
  () => props.modelValue,
  (val) => {
    current.value = normalizeValue(val)
  },
  { immediate: true },
)

// 空值统一映射为空字符串，避免 input value 出现 "null"/"undefined"
function normalizeValue(value: unknown): string {
  if (value === null || value === undefined) return ""
  return String(value)
}

function reset(value: any) {
  const normalized = normalizeValue(value)
  current.value = normalized
  updateValue(normalized)
}

function updateValue(value: string) {
  emits("update:modelValue", value)
  emits("input", value)
  emits("change", value)
}

function onBlur() {
  // 延迟使 clear 点击事件先于 blur 触发，否则点击清除按钮时 isFocus=false 导致按钮卸载
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
    font-size: var(--ui-font-size-sm);

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

  &__prefix,
  &__suffix {
    color: var(--ui-color-text-secondary);
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  &__prefix {
    margin-right: var(--ui-spacing-sm);
  }

  &__suffix {
    margin-left: var(--ui-spacing-sm);
  }

  &__clear {
    cursor: pointer;
    display: flex;
    box-sizing: content-box;
    align-items: center;
    margin-left: var(--ui-spacing-sm);
    justify-content: center;
  }
}
</style>
