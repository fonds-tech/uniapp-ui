<template>
  <view class="ui-textarea" :class="[classs, customClass]" :style="[style]">
    <view class="ui-textarea__content">
      <textarea
        class="ui-textarea__textarea"
        :style="[textareaStyle]"
        :class="[textareaClass]"
        :value="current"
        :fixed="fixed"
        :focus="focus"
        :cursor="+cursor"
        :disabled="disabled"
        :maxlength="+maxlength"
        :placeholder="placeholder"
        :auto-height="autoHeight"
        :confirm-type="confirmType"
        :hold-keyboard="holdKeyboard"
        :selection-end="+selectionEnd"
        :cursor-spacing="+cursorSpacing"
        :adjust-position="adjustPosition"
        :show-confirm-bar="showConfirmBar"
        :selection-start="+selectionStart"
        :placeholder-style="placeholderStyle"
        :disable-default-padding="disableDefaultPadding"
        :ignore-composition-event="ignoreCompositionEvent"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @confirm="onConfirm"
        @linechange="onLinechange"
        @keyboardheightchange="onKeyboardheightchange"
      />
      <view v-if="clearable && current && isFocus" class="ui-textarea__clear" :style="[clearStyle]" @click="onClickClear">
        <ui-icon :name="clearIcon" :size="clearIconSize" :color="clearIconColor" :weight="clearIconWeight" />
      </view>
    </view>
    <view v-if="showCount" class="ui-textarea__count" :style="[countStyle]">
      {{ valueLength }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { formItemKey } from "../ui-form-item"
import { textareaEmits, textareaProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-textarea" })

const props = defineProps(textareaProps)
const emits = defineEmits(textareaEmits)

const { parent } = useParent(formItemKey)

const isFocus = ref(false)
const current = ref("")

const style = computed(() => {
  const style: any = {}
  style.border = props.border
  style.width = useUnit(props.width)
  style.padding = useUnit(props.padding)
  style.minHeight = useUnit(props.minHeight)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("ui-textarea--disabled")
  if (props.clearable) list.push("ui-textarea--clearable")
  return list
})

const textareaStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.minHeight = useUnit(props.minHeight)
  style.fontWeight = props.fontWeight
  return useStyle(style)
})

const textareaClass = computed(() => {
  const list: string[] = []
  list.push(`ui-textarea__textarea--${props.inputAlign}`)
  return list
})

const placeholderStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.placeholderColor)
  return useStyle({ ...style, ...useStyle(props.placeholderStyle) }, "string")
})

const clearStyle = computed(() => {
  const style: any = {}
  style.width = useUnit(props.clearIconSize)
  style.height = useUnit(props.clearIconSize)
  return useStyle(style)
})

const countStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.countColor)
  style.fontSize = useUnit(props.countSize)
  style.fontWeight = props.countWeight
  return useStyle(style)
})

const valueLength = computed(() => {
  const count = String(props.modelValue).length
  return props.maxlength === -1 ? count : `${count > +props.maxlength ? props.maxlength : count}/${props.maxlength}`
})

watch(
  () => props.modelValue,
  (value) => {
    current.value = value
  },
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

function onLinechange(event: any) {
  emits("linechange", event)
}

function onFocus() {
  isFocus.value = true
  emits("focus")
}

function onConfirm() {
  emits("confirm", current.value)
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
  flex-direction: column;

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);
  }

  &__textarea {
    width: 100%;
    font-size: inherit;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }

    :deep(.textarea-placeholder) {
      font-weight: var(--ui-font-weight-normal);
    }
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__count {
    color: var(--ui-color-text-secondary);
    margin-top: var(--ui-spacing-md);
    text-align: right;
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
