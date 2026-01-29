<template>
  <view class="ui-search" :class="[props.customClass]" :style="[rootStyle]" role="search" @click="onClick">
    <view class="ui-search__content" :class="[contentClass]" :style="[contentStyle]">
      <view class="ui-search__icon">
        <slot name="icon">
          <ui-icon :name="props.icon" :size="props.iconSize" :color="props.iconColor" :weight="props.iconWeight" />
        </slot>
      </view>
      <input
        v-model="modelValue"
        class="ui-search__value"
        :class="[inputClass]"
        :style="[inputStyle]"
        type="text"
        confirm-type="search"
        :focus="props.focus"
        :disabled="props.disabled"
        :maxlength="props.maxlength"
        :placeholder="props.placeholder"
        :placeholder-style="placeholderStyle"
        :aria-label="props.placeholder"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
      />
      <view v-if="showClear" class="ui-search__clear" hover-class="ui-search__clear--active" role="button" aria-label="清除" @click.stop="onClickClear">
        <slot name="clear">
          <ui-icon name="close-circle" :size="props.clearSize" :color="props.clearColor" :weight="props.clearWeight" />
        </slot>
      </view>
    </view>
    <view v-if="props.action" class="ui-search__action" @click.stop="onClickAction">
      <slot name="action">
        <view
          class="ui-search__action__button"
          hover-class="ui-search__action__button--active"
          role="button"
          :hover-stay-time="50"
          :aria-label="props.actionText"
          :style="[actionButtonStyle]"
        >
          {{ props.actionText }}
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, nextTick } from "vue"
import { searchEmits, searchProps, searchInputAlign } from "./index"

defineOptions({ name: "ui-search" })

const props = defineProps(searchProps)
const emits = defineEmits(searchEmits)
const modelValue = ref(props.modelValue)

// 根元素样式
const rootStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.height = useUnit(props.height)
  styles.margin = useUnit(props.margin)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

// 搜索框容器样式
const contentStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.border = props.border
  styles.background = useColor(props.background)
  styles.borderRadius = useUnit(props.radius)
  return useStyle(styles)
})

// 搜索框容器类名
const contentClass = computed(() => {
  return props.round ? ["ui-search__content--round"] : []
})

// 输入框样式
const inputStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.color)
  styles.fontSize = useUnit(props.fontSize)
  if (searchInputAlign.includes(props.inputAlign)) {
    styles.textAlign = props.inputAlign as CSSProperties["textAlign"]
  }
  return useStyle({ ...styles, ...useStyle(props.inputStyle) })
})

// 输入框类名
const inputClass = computed(() => {
  return props.disabled ? ["ui-search__value--disabled"] : []
})

// 右侧操作按钮样式
const actionButtonStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.actionColor)
  styles.fontSize = useUnit(props.actionSize)
  styles.fontWeight = props.actionWeight
  return useStyle(styles)
})

// 占位符样式（返回字符串格式，用于 placeholder-style 属性）
const placeholderStyle = computed(() => {
  const styles: CSSProperties = {}
  if (props.fontSize) styles.fontSize = useUnit(props.fontSize)
  if (props.placeholderColor) styles.color = useColor(props.placeholderColor)
  return useStyle(styles, "string")
})

// 是否显示清除按钮
const showClear = computed(() => {
  const clearable = props.clearabled !== undefined ? props.clearabled : props.clearable
  return clearable && modelValue.value
})

watch(() => modelValue.value, updateValue)
watch(
  () => props.modelValue,
  (val) => (modelValue.value = val),
)

function updateValue(value: string) {
  emits("update:modelValue", value)
  nextTick(() => emits("change", value))
}

function onBlur(event: any) {
  emits("blur", event)
}

function onFocus(event: any) {
  emits("focus", event)
}

function onConfirm() {
  emits("search", modelValue.value)
}

function onClick(event: Event) {
  emits("click", event)
}

function onClickClear(event: Event) {
  modelValue.value = ""
  updateValue("")
  emits("clear", event)
}

function onClickAction(event: Event) {
  emits("action", event)
}

defineExpose({ name: "ui-search" })
</script>

<script lang="ts">
export default {
  name: "ui-search",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-search {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__content {
    flex: 1;
    height: 100%;
    display: flex;
    padding: 0 var(--ui-spacing-md);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
    align-items: center;
    border-radius: var(--ui-radius-sm);
    background-color: var(--ui-color-background-light);

    &--round {
      border-radius: var(--ui-radius-round);
    }
  }

  &__icon {
    color: var(--ui-color-text-tertiary);
    display: flex;
    align-items: center;
    margin-right: var(--ui-spacing-sm);
    justify-content: center;
  }

  &__value {
    flex: 1;
    height: 100%;
    font-size: var(--ui-font-size-sm);

    &--disabled {
      opacity: 0.6;
      pointer-events: none;
    }
  }

  // 清除按钮 - 视觉紧凑但触摸区域扩展
  &__clear {
    display: flex;
    padding: var(--ui-spacing-sm);
    align-items: center;
    justify-content: center; // 扩展触摸区域
    margin: calc(var(--ui-spacing-sm) * -1); // 负 margin 保持视觉紧凑
    transition: opacity 0.2s ease;
    margin-left: var(--ui-spacing-xs);

    &--active {
      opacity: var(--ui-opacity-active);
    }
  }

  &__action {
    height: 100%;
    margin-left: var(--ui-spacing-md);

    &__button {
      height: 100%;
      display: flex;
      font-size: var(--ui-font-size-sm);
      align-items: center;
      justify-content: center;

      &--active {
        opacity: var(--ui-opacity-active);
      }
    }
  }
}
</style>
