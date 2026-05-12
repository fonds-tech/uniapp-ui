<template>
  <view class="ui-textarea" :class="[classNames, customClass]" :style="[rootStyle]">
    <view class="ui-textarea__body">
      <textarea
        class="ui-textarea__input"
        :class="[textareaClass]"
        :style="[textareaStyle]"
        :value="current"
        :fixed="props.fixed"
        :focus="props.focus"
        :cursor="+props.cursor"
        :disabled="effectiveDisabled"
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
      <view v-if="props.clearable && current && isFocus" class="ui-textarea__clear" @click="onClickClear">
        <ui-icon
          :name="props.clearIcon"
          :size="props.clearIconSize || 'var(--ui-textarea-clear-icon-size)'"
          :color="props.clearIconColor || 'var(--ui-textarea-clear-icon-color)'"
          :weight="props.clearIconWeight"
        />
      </view>
    </view>
    <view v-if="props.showCount" class="ui-textarea__footer">
      <view class="ui-textarea__count">{{ valueLength }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { formItemKey } from "../ui-form-item"
import { ref, watch, computed } from "vue"
import { textareaEmits, textareaProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-textarea" })

const props = defineProps(textareaProps)
const emits = defineEmits(textareaEmits)

// form-item 父级注入
const { parent } = useParent(formItemKey)

// 聚焦态
const isFocus = ref(false)
// 当前值（内部副本，与 modelValue 同步）
const current = ref("")

// 有效禁用 / 只读（合并父级 form/form-item）
const effectiveDisabled = computed(() => Boolean(props.disabled) || Boolean(parent?.disabled?.value))
const effectiveReadonly = computed(() => Boolean(props.readonly) || Boolean(parent?.readonly?.value))
// 字数统计文本
const valueLength = computed(() => {
  const count = current.value.length
  return props.maxlength === -1 ? `${count}` : `${count}/${props.maxlength}`
})

// 根节点样式（CSS var 注入）
const rootStyle = computed(() => {
  const vars: CSSProperties = {}
  if (props.color) vars["--ui-textarea-color" as keyof CSSProperties] = useColor(props.color) as never
  if (props.background) vars["--ui-textarea-bg" as keyof CSSProperties] = useColor(props.background) as never
  if (props.width !== undefined) vars["--ui-textarea-width" as keyof CSSProperties] = useUnit(props.width) as never
  if (props.padding !== undefined) vars["--ui-textarea-padding" as keyof CSSProperties] = useUnit(props.padding) as never
  if (props.minHeight !== undefined) vars["--ui-textarea-min-height" as keyof CSSProperties] = useUnit(props.minHeight) as never
  if (props.fontSize !== undefined) vars["--ui-textarea-font-size" as keyof CSSProperties] = useUnit(props.fontSize) as never
  if (props.fontWeight !== undefined) vars["--ui-textarea-font-weight" as keyof CSSProperties] = String(props.fontWeight) as never
  if (props.radius !== undefined) vars["--ui-textarea-radius" as keyof CSSProperties] = useUnit(props.radius) as never
  if (props.border) vars["--ui-textarea-border" as keyof CSSProperties] = props.border as never
  if (props.countColor) vars["--ui-textarea-count-color" as keyof CSSProperties] = useColor(props.countColor) as never
  if (props.countSize !== undefined) vars["--ui-textarea-count-size" as keyof CSSProperties] = useUnit(props.countSize) as never
  if (props.countWeight !== undefined) vars["--ui-textarea-count-weight" as keyof CSSProperties] = String(props.countWeight) as never
  if (props.clearIconSize !== undefined) vars["--ui-textarea-clear-icon-size" as keyof CSSProperties] = useUnit(props.clearIconSize) as never
  if (props.clearIconColor) vars["--ui-textarea-clear-icon-color" as keyof CSSProperties] = useColor(props.clearIconColor) as never
  if (props.clearIconBackground) vars["--ui-textarea-clear-icon-bg" as keyof CSSProperties] = useColor(props.clearIconBackground) as never
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})
// 根节点类名
const classNames = computed(() => {
  const list: string[] = []
  if (effectiveDisabled.value) list.push("ui-textarea--disabled")
  if (effectiveReadonly.value) list.push("ui-textarea--readonly")
  return list
})
// textarea 类名
const textareaClass = computed(() => {
  const list = [`ui-textarea__input--${props.inputAlign}`]
  if (effectiveReadonly.value) list.push("ui-textarea__input--readonly")
  return list
})
// textarea inline 样式：覆盖 uni-textarea 默认 height: 150px
// 同时落 height + min-height：autoHeight=false 时 height 主导；autoHeight=true 时 uni 内部接管 height，min-height 兜底
const textareaStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.minHeight !== undefined) {
    const h = useUnit(props.minHeight)
    style.height = h
    style.minHeight = h
  }
  return useStyle(style)
})
// 占位符 inline 样式（uni placeholder-style 只接 string；空兜底返 "" 避免 prop 类型告警）
const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.placeholderColor) style.color = useColor(props.placeholderColor)
  if (props.fontSize !== undefined) style.fontSize = useUnit(props.fontSize)
  const merged = { ...style, ...useStyle(props.placeholderStyle) }
  const result = useStyle(merged, "string")
  return typeof result === "string" ? result : ""
})

// 外部 modelValue → current 同步（守卫避免回环）
watch(
  () => props.modelValue,
  (value) => {
    const next = String(value ?? "")
    if (next !== current.value) current.value = next
  },
  { immediate: true },
)

// 派发更新
function updateValue(value: string) {
  emits("input", value)
  emits("change", value)
  emits("update:modelValue", value)
}

// 重置值
function reset(value: string) {
  current.value = String(value ?? "")
  updateValue(current.value)
}

// 聚焦
function onFocus() {
  isFocus.value = true
  emits("focus")
}

// 失焦：延迟 100ms 让 clear 点击先触发（否则 clear 按钮已因 isFocus=false 卸载）
function onBlur() {
  setTimeout(() => (isFocus.value = false), 100)
  emits("blur", current.value)
  parent?.onBlur(current.value)
}

// 输入
function onInput(event: { detail: { value: string } }) {
  current.value = event.detail.value
  updateValue(current.value)
  parent?.onChange(current.value)
}

// 确认
function onConfirm() {
  emits("confirm", current.value)
}

// 行数变化
function onLinechange(event: unknown) {
  emits("linechange", event)
}

// 键盘高度变化
function onKeyboardheightchange() {
  emits("keyboardheightchange")
}

// 清除
function onClickClear() {
  current.value = ""
  updateValue("")
  emits("clear")
  parent?.onBlur(current.value)
}

defineExpose({ reset })
</script>

<script lang="ts">
export default {
  name: "ui-textarea",
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
.ui-textarea {
  --ui-textarea-bg: var(--ui-color-background);
  --ui-textarea-color: var(--ui-color-text);
  --ui-textarea-width: 100%;
  --ui-textarea-border: none;
  --ui-textarea-radius: 0;
  --ui-textarea-padding: var(--ui-spacing-md);
  --ui-textarea-font-size: var(--ui-font-size-sm);
  --ui-textarea-count-size: var(--ui-font-size-xs);
  --ui-textarea-min-height: 150rpx;
  --ui-textarea-count-color: var(--ui-color-text-secondary);
  --ui-textarea-font-weight: var(--ui-font-weight-normal);
  --ui-textarea-count-weight: var(--ui-font-weight-normal);
  --ui-textarea-clear-icon-bg: var(--ui-color-text-placeholder);
  --ui-textarea-clear-icon-size: 24rpx;
  --ui-textarea-clear-icon-color: var(--ui-color-text-inverse);
  width: var(--ui-textarea-width);
  border: var(--ui-textarea-border);

  display: flex;
  padding: var(--ui-textarea-padding);
  background: var(--ui-textarea-bg);
  border-radius: var(--ui-textarea-radius);
  flex-direction: column;

  &__body {
    display: flex;
    align-items: center;
  }

  &__input {
    flex: 1;
    color: var(--ui-textarea-color);
    width: 0;
    font-size: var(--ui-textarea-font-size);
    min-height: var(--ui-textarea-min-height);
    font-weight: var(--ui-textarea-font-weight);

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
    color: var(--ui-textarea-count-color);
    font-size: var(--ui-textarea-count-size);
    font-weight: var(--ui-textarea-count-weight);
  }

  &__clear {
    width: var(--ui-textarea-clear-icon-size);
    height: var(--ui-textarea-clear-icon-size);
    display: flex;
    padding: var(--ui-spacing-xs);
    background: var(--ui-textarea-clear-icon-bg);
    box-sizing: content-box;
    align-items: center;
    flex-shrink: 0;
    margin-left: var(--ui-spacing-sm);
    border-radius: var(--ui-radius-round);
    justify-content: center;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);
  }

  &--readonly {
    cursor: default;
  }
}
</style>
