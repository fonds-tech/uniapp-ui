<template>
  <view class="ui-code-input" :class="[rootClasses, props.customClass]" :style="[rootStyle]" @click="handleClick">
    <input
      ref="inputRef"
      class="ui-code-input__hidden"
      :value="currentValue"
      :type="props.inputType === 'number' ? 'number' : 'text'"
      :inputmode="actualInputmode"
      :maxlength="props.length"
      :focus="isFocused"
      :disabled="props.disabled"
      :adjust-position="props.adjustPosition"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <view v-for="(_, index) in props.length" :key="index" class="ui-code-input__code" :class="codeClasses(index)">
      <slot :value="currentValue[index]" :index="index" :focused="isFocused && index === currentValue.length">
        <template v-if="currentValue[index]">
          <view v-if="props.mask" class="ui-code-input__dot" />
          <text v-else class="ui-code-input__text">{{ currentValue[index] }}</text>
        </template>
        <view v-else-if="props.showCursor && isFocused && index === currentValue.length" class="ui-code-input__cursor" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { codeInputEmits, codeInputProps } from "./index"
import { ref, watch, computed, nextTick } from "vue"

defineOptions({ name: "ui-code-input" })

const props = defineProps(codeInputProps)
const emits = defineEmits(codeInputEmits)

// 当前输入值
const currentValue = ref("")
// 是否聚焦
const isFocused = ref(false)
// 输入框引用
const inputRef = ref()

// 推断 H5 软键盘 inputmode
const actualInputmode = computed(() => props.inputmode ?? (props.inputType === "number" ? "numeric" : "text"))

// 根节点样式：所有 prop 通过 CSS var 注入；SCSS 选择器顶部声明默认值
const rootStyle = computed<CSSProperties>(() => {
  const s: Record<string, string | number | undefined> = {}
  if (props.gap !== undefined) s["--ui-code-input-gap"] = useUnit(props.gap)
  if (props.codeWidth !== undefined) s["--ui-code-input-code-width"] = useUnit(props.codeWidth)
  if (props.codeHeight !== undefined) s["--ui-code-input-code-height"] = useUnit(props.codeHeight)
  if (props.codeRadius !== undefined) s["--ui-code-input-code-radius"] = useUnit(props.codeRadius)
  if (props.codeBorderWidth !== undefined) s["--ui-code-input-code-border-width"] = useUnit(props.codeBorderWidth)
  if (props.codeColor) s["--ui-code-input-code-color"] = useColor(props.codeColor)
  if (props.codeActiveColor) s["--ui-code-input-code-active-color"] = useColor(props.codeActiveColor)
  if (props.codeBackground) s["--ui-code-input-code-background"] = useColor(props.codeBackground)
  if (props.codeActiveBackground) s["--ui-code-input-code-active-background"] = useColor(props.codeActiveBackground)
  if (props.errorColor) s["--ui-code-input-error-color"] = useColor(props.errorColor)
  if (props.textSize !== undefined) s["--ui-code-input-text-size"] = useUnit(props.textSize)
  if (props.textColor) s["--ui-code-input-text-color"] = useColor(props.textColor)
  if (props.textWeight !== undefined) s["--ui-code-input-text-weight"] = String(props.textWeight)
  if (props.cursorWidth !== undefined) s["--ui-code-input-cursor-width"] = useUnit(props.cursorWidth)
  if (props.cursorHeight !== undefined) s["--ui-code-input-cursor-height"] = useUnit(props.cursorHeight)
  if (props.cursorColor) s["--ui-code-input-cursor-color"] = useColor(props.cursorColor)
  if (props.dotSize !== undefined) s["--ui-code-input-dot-size"] = useUnit(props.dotSize)
  if (props.dotColor) s["--ui-code-input-dot-color"] = useColor(props.dotColor)
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) }) as CSSProperties
})

// 根节点类名
const rootClasses = computed(() => [
  `ui-code-input--${props.type}`,
  {
    "ui-code-input--error": props.error,
    "ui-code-input--disabled": props.disabled,
    "ui-code-input--readonly": props.readonly,
    "ui-code-input--focused": isFocused.value,
  },
])

// 单格类名
function codeClasses(index: number) {
  const isActive = isFocused.value && index === currentValue.value.length
  const isFilled = index < currentValue.value.length
  return {
    "ui-code-input__code--active": isActive,
    "ui-code-input__code--filled": isFilled,
  }
}

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = String(val || "").slice(0, props.length)
  },
  { immediate: true },
)

// 自动聚焦
watch(
  () => props.autofocus,
  (val) => {
    if (val) isFocused.value = true
  },
  { immediate: true },
)

// 点击根节点：聚焦 + emit click
function handleClick() {
  if (props.disabled || props.readonly) return
  // 切换 false → true 触发 :focus 重新生效（已是 true 时也能拉起键盘）
  if (isFocused.value) {
    isFocused.value = false
    nextTick(() => (isFocused.value = true))
  } else {
    isFocused.value = true
  }
  emits("click")
}

// 输入处理：过滤 + 截断 + emit
function handleInput(event: any) {
  if (props.disabled || props.readonly) return
  let value = String(event?.detail?.value || "")
  if (props.inputType === "number") value = value.replace(/\D/g, "")
  value = value.slice(0, props.length)
  currentValue.value = value
  emits("update:modelValue", value)
  emits("change", value)
  if (value.length === props.length) emits("complete", value)
}

// 聚焦
function handleFocus() {
  isFocused.value = true
  emits("focus")
}

// 失焦
function handleBlur() {
  isFocused.value = false
  emits("blur")
}

defineExpose({
  /** 编程式聚焦：先 false → nextTick → true，确保已 focused 时也能重新拉起键盘 */
  focus: () => {
    isFocused.value = false
    nextTick(() => (isFocused.value = true))
  },
  /** 编程式失焦 */
  blur: () => {
    isFocused.value = false
  },
  /** 清空输入值 */
  clear: () => {
    currentValue.value = ""
    emits("update:modelValue", "")
    emits("change", "")
  },
})
</script>

<script lang="ts">
export default {
  name: "ui-code-input",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-code-input {
  --ui-code-input-gap: var(--ui-spacing-md);
  --ui-code-input-dot-size: calc(var(--ui-code-input-code-width) * 0.25);
  --ui-code-input-dot-color: var(--ui-color-text);
  --ui-code-input-text-size: var(--ui-font-size-lg);
  --ui-code-input-code-color: var(--ui-color-border);
  --ui-code-input-code-width: 80rpx;
  --ui-code-input-text-color: var(--ui-color-text);
  --ui-code-input-code-height: 80rpx;
  --ui-code-input-code-radius: var(--ui-radius-sm);
  --ui-code-input-error-color: var(--ui-color-danger);
  --ui-code-input-text-weight: normal;
  --ui-code-input-cursor-color: var(--ui-color-primary);
  --ui-code-input-cursor-width: 2rpx;
  --ui-code-input-cursor-height: var(--ui-code-input-text-size);
  --ui-code-input-code-background: var(--ui-color-background);
  --ui-code-input-code-active-color: var(--ui-color-primary);
  --ui-code-input-code-border-width: var(--ui-border-width);
  --ui-code-input-code-active-background: var(--ui-color-primary-light);
  gap: var(--ui-code-input-gap);

  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  &__hidden {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    position: absolute;
    background-color: transparent;
  }

  &__code {
    width: var(--ui-code-input-code-width);
    border: var(--ui-code-input-code-border-width) solid var(--ui-code-input-code-color);
    height: var(--ui-code-input-code-height);
    display: flex;
    box-sizing: border-box;
    transition:
      border-color var(--ui-transition-fast) var(--ui-transition-timing),
      background-color var(--ui-transition-fast) var(--ui-transition-timing),
      box-shadow var(--ui-transition-fast) var(--ui-transition-timing);
    align-items: center;
    flex-shrink: 0;
    border-radius: var(--ui-code-input-code-radius);
    justify-content: center;
    background-color: var(--ui-code-input-code-background);

    &--active {
      border-color: var(--ui-code-input-code-active-color);
      // 焦点环：强化激活感（无 :deep / 跨端兼容 box-shadow）
      box-shadow: 0 0 0 4rpx rgba(var(--ui-color-primary-rgb), 0.12);
    }
  }

  &__text {
    color: var(--ui-code-input-text-color);
    font-size: var(--ui-code-input-text-size);
    font-weight: var(--ui-code-input-text-weight);
    line-height: 1;
  }

  &__cursor {
    width: var(--ui-code-input-cursor-width);
    height: var(--ui-code-input-cursor-height);
    animation: ui-code-input-cursor 1s infinite;
    border-radius: var(--ui-radius-xs);
    background-color: var(--ui-code-input-cursor-color);
  }

  &__dot {
    width: var(--ui-code-input-dot-size);
    height: var(--ui-code-input-dot-size);
    border-radius: var(--ui-radius-round);
    background-color: var(--ui-code-input-dot-color);
  }

  // ===== 样式变体 =====
  // underline：仅底部线，去除四周边框与背景
  &--underline &__code {
    border-width: 0;
    border-radius: 0;
    background-color: transparent;
    border-bottom-width: var(--ui-border-width-thick);
  }

  &--underline &__code--active {
    box-shadow: none;
  }

  // filled：实心底色，无边框
  &--filled &__code {
    border-width: 0;
    background-color: var(--ui-color-background-section);
  }

  &--filled &__code--active {
    box-shadow: none;
    background-color: var(--ui-code-input-code-active-background);
  }

  // ===== 错误状态 =====
  &--error &__code {
    border-color: var(--ui-code-input-error-color);
  }

  &--error &__code--active {
    box-shadow: 0 0 0 4rpx rgba(var(--ui-color-danger-rgb), 0.12);
  }

  // filled+error：边框看不见，靠背景色 tint 表达错误
  &--filled.ui-code-input--error &__code {
    background-color: rgba(var(--ui-color-danger-rgb), 0.08);
  }

  // underline+error：仅底部线变红
  &--underline.ui-code-input--error &__code {
    box-shadow: none;
    border-color: var(--ui-code-input-error-color);
  }

  // ===== 状态 =====
  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &--readonly {
    pointer-events: none;
  }
}

@keyframes ui-code-input-cursor {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
