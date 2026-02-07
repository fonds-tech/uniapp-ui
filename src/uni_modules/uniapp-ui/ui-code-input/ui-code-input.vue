<template>
  <view class="ui-code-input" :class="[rootClasses, props.customClass]" :style="[rootStyle]" @click="handleClick">
    <!-- 隐藏的原生输入框 -->
    <input
      ref="inputRef"
      class="ui-code-input__hidden"
      :value="currentValue"
      :type="props.inputType === 'number' ? 'number' : 'text'"
      :maxlength="props.length"
      :focus="isFocused"
      :disabled="props.disabled"
      :adjust-position="props.adjustPosition"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <!-- 验证码格子 -->
    <view v-for="(_, index) in props.length" :key="index" class="ui-code-input__code" :class="[codeClasses(index)]" :style="[codeStyle(index)]">
      <!-- 自定义内容 -->
      <slot :value="currentValue[index]" :index="index" :focused="isFocused && index === currentValue.length">
        <!-- 显示内容 -->
        <template v-if="currentValue[index]">
          <!-- 密码模式显示圆点 -->
          <view v-if="props.mask" class="ui-code-input__dot" :style="[dotStyle]" />
          <!-- 正常模式显示字符 -->
          <text v-else class="ui-code-input__text" :style="[textStyle]">{{ currentValue[index] }}</text>
        </template>
        <!-- 光标 -->
        <view v-else-if="props.showCursor && isFocused && index === currentValue.length" class="ui-code-input__cursor" :style="[cursorStyle]" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { ref, watch, computed } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { codeInputEmits, codeInputProps } from "./index"

defineOptions({ name: "ui-code-input" })

const props = defineProps(codeInputProps)
const emits = defineEmits(codeInputEmits)

// 当前输入值
const currentValue = ref("")
// 是否聚焦
const isFocused = ref(false)
// 输入框引用
const inputRef = ref()

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  style.gap = useUnit(props.gap)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
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

// 格子类名
function codeClasses(index: number) {
  const isActive = isFocused.value && index === currentValue.value.length
  const isFilled = index < currentValue.value.length
  return {
    "ui-code-input__code--active": isActive,
    "ui-code-input__code--filled": isFilled,
  }
}

// 格子样式
function codeStyle(index: number): CSSProperties {
  const isActive = isFocused.value && index === currentValue.value.length
  const style: CSSProperties = {}
  style.width = useUnit(props.codeWidth)
  style.height = useUnit(props.codeHeight)
  // 只在用户显式传入时才覆盖 CSS 类的默认值
  if (props.codeRadius) style.borderRadius = useUnit(props.codeRadius)
  if (props.codeBorderWidth) style.borderWidth = useUnit(props.codeBorderWidth)
  // 根据激活状态设置颜色
  if (props.error) {
    // 错误状态
    style.borderColor = useColor(props.errorColor) || "var(--ui-color-danger)"
  } else if (isActive) {
    if (props.codeActiveColor) style.borderColor = useColor(props.codeActiveColor)
    if (props.codeActiveBackground) style.backgroundColor = useColor(props.codeActiveBackground)
  } else {
    if (props.codeColor) style.borderColor = useColor(props.codeColor)
    if (props.codeBackground) style.backgroundColor = useColor(props.codeBackground)
  }
  return style
}

// 文本样式
const textStyle = computed<CSSProperties>(() => ({
  fontSize: useUnit(props.textSize),
  color: useColor(props.textColor),
  fontWeight: props.textWeight as CSSProperties["fontWeight"],
}))

// 光标样式
const cursorStyle = computed<CSSProperties>(() => ({
  width: useUnit(props.cursorWidth),
  height: useUnit(props.cursorHeight),
  backgroundColor: useColor(props.cursorColor) || "var(--ui-color-primary)",
}))

// 圆点样式
const dotStyle = computed<CSSProperties>(() => ({
  width: useUnit(props.dotSize),
  height: useUnit(props.dotSize),
  backgroundColor: useColor(props.dotColor) || "var(--ui-color-text)",
}))

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

// 处理点击事件
function handleClick() {
  if (props.disabled || props.readonly) return
  isFocused.value = true
  emits("click")
}

// 处理输入事件
function handleInput(event: any) {
  if (props.disabled || props.readonly) return
  let value = String(event?.detail?.value || "")
  // 数字模式下只允许数字
  if (props.inputType === "number") {
    value = value.replace(/\D/g, "")
  }
  // 限制长度
  value = value.slice(0, props.length)
  currentValue.value = value
  emits("update:modelValue", value)
  emits("change", value)
  // 输入完成回调
  if (value.length === props.length) {
    emits("complete", value)
  }
}

// 处理聚焦事件
function handleFocus() {
  isFocused.value = true
  emits("focus")
}

// 处理失焦事件
function handleBlur() {
  isFocused.value = false
  emits("blur")
}

// 暴露方法
defineExpose({
  /** 聚焦 */
  focus: () => {
    isFocused.value = true
  },
  /** 失焦 */
  blur: () => {
    isFocused.value = false
  },
  /** 清空 */
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
    display: flex;
    box-sizing: border-box;
    transition:
      border-color var(--ui-transition-fast) var(--ui-transition-timing),
      background-color var(--ui-transition-fast) var(--ui-transition-timing);
    align-items: center;
    flex-shrink: 0;
    border-color: var(--ui-color-border);
    border-style: solid;
    justify-content: center;
    background-color: var(--ui-color-background);

    &--active {
      border-color: var(--ui-color-primary);
    }
  }

  &__text {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-lg);
    line-height: 1;
  }

  &__cursor {
    animation: ui-code-input-cursor 1s infinite;
    border-radius: var(--ui-radius-xs);
  }

  &__dot {
    border-radius: var(--ui-radius-round);
    background-color: var(--ui-color-text);
  }

  // ===== 样式变体 =====
  // Box 样式（默认）
  &--box &__code {
    border-width: var(--ui-border-width);
    border-radius: var(--ui-radius-sm);
  }

  // Underline 样式
  &--underline &__code {
    border-width: 0;
    border-radius: 0;
    background-color: transparent;
    border-bottom-width: 4rpx;
  }

  // Filled 样式
  &--filled &__code {
    border-width: 0;
    border-radius: var(--ui-radius-sm);
    background-color: var(--ui-color-background-section);
  }

  &--filled &__code--active {
    background-color: var(--ui-color-primary-light);
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
