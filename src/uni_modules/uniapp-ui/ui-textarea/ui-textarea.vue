<template>
  <view class="ui-textarea" :class="[classes, customClass]" :style="[style]">
    <view class="ui-textarea__body">
      <textarea
        class="ui-textarea__input"
        :style="[textareaStyle]"
        :class="[textareaClass]"
        :value="current"
        :fixed="props.fixed"
        :focus="props.focus"
        :cursor="+props.cursor"
        :disabled="disabled"
        :maxlength="+props.maxlength"
        :placeholder="props.placeholder"
        :cursor-color="props.cursorColor"
        :auto-height="props.autoHeight"
        :confirm-type="props.confirmType"
        :confirm-hold="props.confirmHold"
        :hold-keyboard="props.holdKeyboard"
        :selection-end="+props.selectionEnd"
        :cursor-spacing="+props.cursorSpacing"
        :adjust-position="props.adjustPosition"
        :show-confirm-bar="props.showConfirmBar"
        :selection-start="+props.selectionStart"
        :placeholder-style="placeholderStyle"
        :disable-default-padding="props.disableDefaultPadding"
        :ignore-composition-event="props.ignoreCompositionEvent"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @confirm="onConfirm"
        @linechange="onLinechange"
        @keyboardheightchange="onKeyboardheightchange"
      />
      <view v-if="props.clearable && current && isFocus" class="ui-textarea__clear" :style="[clearStyle]" @click="onClickClear">
        <ui-icon :name="props.clearIcon" :size="props.clearIconSize" :color="props.clearIconColor" :weight="props.clearIconWeight" />
      </view>
    </view>
    <view v-if="props.showCount" class="ui-textarea__footer">
      <view class="ui-textarea__count" :style="[countStyle]">{{ valueLength }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { formItemKey } from "../ui-form-item"
import { ref, watch, computed } from "vue"
import { textareaEmits, textareaProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-textarea" })

const props = defineProps(textareaProps)
const emits = defineEmits(textareaEmits)

// 表单项父组件
const { parent } = useParent(formItemKey)

// 是否聚焦
const isFocus = ref(false)
// 当前输入值
const current = ref("")

// 根节点样式
const style = computed(() => {
  const style: any = {}
  style.border = props.border
  style.width = useUnit(props.width)
  if (props.padding) style.padding = useUnit(props.padding)
  style.minHeight = useUnit(props.minHeight)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 类名数组
const classes = computed(() => {
  const list: string[] = []
  if (props.readonly) list.push("ui-textarea--readonly")
  if (props.disabled) list.push("ui-textarea--disabled")
  return list
})
// 文本域样式
const textareaStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.minHeight = useUnit(props.minHeight)
  style.fontWeight = props.fontWeight
  return useStyle(style)
})
// 文本域类名
const textareaClass = computed(() => {
  const list: string[] = []
  list.push(`ui-textarea__input--${props.inputAlign}`)
  if (props.readonly) list.push("ui-textarea__input--readonly")
  return list
})
// 占位符样式
const placeholderStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.placeholderColor)
  style.fontSize = useUnit(props.fontSize)
  return useStyle({ ...style, ...useStyle(props.placeholderStyle) }, "string")
})
// 清除按钮样式
const clearStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.clearIconSize)
  style.height = useUnit(props.clearIconSize)
  style.backgroundColor = useColor(props.clearIconBackground)
  return useStyle(style)
})
// 计数器样式
const countStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.countColor)
  style.fontSize = useUnit(props.countSize)
  style.fontWeight = props.countWeight
  return useStyle(style)
})
// 字符计数
const valueLength = computed(() => {
  const count = String(props.modelValue).length
  return props.maxlength === -1 ? count : `${count}/${props.maxlength}`
})
// 是否禁用
const disabled = computed(() => {
  return props.disabled || props.readonly
})

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (value) => {
    current.value = value
  },
  { immediate: true },
)

// 重置输入值
function reset(value: any) {
  current.value = value
  updateValue(value)
}

// 更新值
async function updateValue(value: string) {
  emits("input", value)
  emits("change", value)
  emits("update:modelValue", value)
}

// 失焦事件
function onBlur() {
  setTimeout(() => (isFocus.value = false), 100)
  emits("blur", current.value)
  parent?.onBlur(current.value)
}

// 行数变化事件
function onLinechange(event: any) {
  emits("linechange", event)
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

// 键盘高度变化事件
function onKeyboardheightchange() {
  emits("keyboardheightchange")
}

// 输入事件
function onInput(event: any) {
  current.value = event.detail.value
  updateValue(event.detail.value)
  parent?.onChange(current.value)
}

// 点击清除按钮
function onClickClear() {
  current.value = ""
  updateValue("")
  emits("clear")
  parent?.onBlur(current.value)
}

defineExpose({ name: "ui-textarea", reset })
</script>

<script lang="ts">
export default {
  name: "ui-textarea",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-textarea {
  flex: 1;
  display: flex;
  padding: var(--ui-spacing-md);
  flex-direction: column;
  background-color: var(--ui-color-background);

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);
  }

  &__body {
    flex: 1;
    display: flex;
    align-items: center;
  }

  &__input {
    flex: 1;
    width: 0;
    font-size: inherit;

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

  &__footer {
    display: flex;
    margin-top: var(--ui-spacing-sm);
    justify-content: flex-end;
  }

  &__count {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__clear {
    display: flex;
    padding: var(--ui-spacing-xs);
    box-sizing: content-box;
    align-items: center;
    flex-shrink: 0;
    margin-left: var(--ui-spacing-sm);
    border-radius: var(--ui-radius-round);
    justify-content: center;
    background-color: var(--ui-color-text-placeholder);
  }
}
</style>
