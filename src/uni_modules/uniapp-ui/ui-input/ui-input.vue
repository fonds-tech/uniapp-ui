<template>
  <view class="ui-input" :class="[classes, props.customClass]" :style="[style]" @click="onClick">
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
    <slot name="suffix">
      <view v-if="props.suffixIcon" class="ui-input__suffix">
        <ui-icon :name="props.suffixIcon" :size="props.suffixIconSize" :color="props.suffixIconColor" :weight="props.suffixIconWeight" />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { formItemKey } from "../ui-form-item"
import { ref, watch, computed } from "vue"
import { inputEmits, inputProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-input" })

const props = defineProps(inputProps)
const emits = defineEmits(inputEmits)

// 表单项父组件
const { parent } = useParent(formItemKey)

// 当前输入值
const current = ref("")
// 是否聚焦
const isFocus = ref(false)

// 根节点样式
const style = computed(() => {
  const style: any = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.border = props.border
  style.padding = useUnit(props.padding)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 类名数组
const classes = computed(() => {
  const list: string[] = []
  if (props.readonly) list.push("ui-input--readonly")
  if (props.disabled) list.push("ui-input--disabled")
  if (props.clearable) list.push("ui-input--clearable")
  return list
})
// 输入框样式
const inputStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  style.textAlign = props.inputAlign
  return useStyle(style)
})
// 输入框类名
const inputClass = computed(() => {
  const list: string[] = []
  list.push(`ui-input__input--${props.inputAlign}`)
  if (props.readonly) list.push("ui-input__input--readonly")
  return list
})
// 清除按钮样式
const clearStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.clearIconSize)
  style.height = useUnit(props.clearIconSize)
  style.backgroundColor = useColor(props.clearIconBackground)
  return useStyle(style)
})
// 占位符样式
const placeholderStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.placeholderColor)
  return useStyle({ ...style, ...useStyle(props.placeholderStyle) }, "string")
})
// 输入类型
const type = computed(() => {
  return props.type === "password" || props.password ? "text" : props.type
})
// 是否密码类型
const password = computed(() => {
  return props.password || props.type === "password"
})
// 是否禁用
const disabled = computed(() => {
  return props.disabled || props.readonly
})

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    current.value = normalizeValue(val)
  },
  { immediate: true },
)

// 空值统一映射为空字符串
function normalizeValue(value: unknown): string {
  if (value === null || value === undefined) return ""
  return String(value)
}

// 重置输入值
function reset(value: any) {
  const normalized = normalizeValue(value)
  current.value = normalized
  updateValue(normalized)
}

// 更新值
async function updateValue(value: string) {
  emits("update:modelValue", value)
  emits("input", value)
  emits("change", value)
}

// 失焦事件
function onBlur() {
  setTimeout(() => (isFocus.value = false), 100)
  emits("blur", current.value)
  parent?.onBlur(current.value)
}

// 聚焦事件
function onFocus() {
  isFocus.value = true
  emits("focus")
}

// 确认事件
function onConfirm() {
  emits("confirm", current.value)
}

// 点击事件
function onClick() {
  emits("click")
}

// 键盘高度变化事件
function onKeyboardheightchange() {
  emits("keyboardheightchange")
}

// 输入事件
function onInput(event: any) {
  const value = normalizeValue(event?.detail?.value)
  current.value = value
  updateValue(value)
  parent?.onChange(current.value)
}

// 点击清除按钮
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
