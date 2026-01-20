<template>
  <view class="ui-search" :class="[useProps.customClass]" :style="[rootStyle]" role="search" @click="onClick">
    <view class="ui-search__content" :class="[contentClass]" :style="[contentStyle]">
      <view class="ui-search__icon">
        <slot name="icon">
          <ui-icon :name="useProps.icon" :size="useProps.iconSize" :color="useProps.iconColor" :weight="useProps.iconWeight" />
        </slot>
      </view>
      <input
        v-model="modelValue"
        class="ui-search__value"
        :class="[inputClass]"
        :style="[inputStyle]"
        type="text"
        confirm-type="search"
        :focus="useProps.focus"
        :disabled="useProps.disabled"
        :maxlength="useProps.maxlength"
        :placeholder="useProps.placeholder"
        :placeholder-style="placeholderStyle"
        :aria-label="useProps.placeholder"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
      />
      <view v-if="showClear" class="ui-search__clear" hover-class="ui-search__clear--active" role="button" aria-label="清除" @click.stop="onClickClear">
        <slot name="clear">
          <ui-icon name="close-circle" :size="useProps.clearSize" :color="useProps.clearColor" :weight="useProps.clearWeight" />
        </slot>
      </view>
    </view>
    <view v-if="useProps.action" class="ui-search__action" @click.stop="onClickAction">
      <slot name="action">
        <view
          class="ui-search__action__button"
          hover-class="ui-search__action__button--active"
          role="button"
          :hover-stay-time="50"
          :aria-label="useProps.actionText"
          :style="[actionButtonStyle]"
        >
          {{ useProps.actionText }}
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, nextTick } from "vue"
import { searchEmits, searchProps, useSearchProps, searchInputAlign } from "./index"

defineOptions({ name: "ui-search" })

const props = defineProps(searchProps)
const emits = defineEmits(searchEmits)
const useProps = useSearchProps(props)
const modelValue = ref(useProps.modelValue)

// 根元素样式
const rootStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.height = useUnit(useProps.height)
  styles.margin = useUnit(useProps.margin)
  return useStyle({ ...styles, ...useStyle(useProps.customStyle) })
})

// 搜索框容器样式
const contentStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.border = useProps.border
  styles.background = useColor(useProps.background)
  styles.borderRadius = useUnit(useProps.radius)
  return useStyle(styles)
})

// 搜索框容器类名
const contentClass = computed(() => {
  return useProps.round ? ["ui-search__content--round"] : []
})

// 输入框样式
const inputStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(useProps.color)
  styles.fontSize = useUnit(useProps.fontSize)
  if (searchInputAlign.includes(useProps.inputAlign)) {
    styles.textAlign = useProps.inputAlign as CSSProperties["textAlign"]
  }
  return useStyle({ ...styles, ...useStyle(useProps.inputStyle) })
})

// 输入框类名
const inputClass = computed(() => {
  return useProps.disabled ? ["ui-search__value--disabled"] : []
})

// 右侧操作按钮样式
const actionButtonStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(useProps.actionColor)
  styles.fontSize = useUnit(useProps.actionSize)
  styles.fontWeight = useProps.actionWeight
  return useStyle(styles)
})

// 占位符样式（返回字符串格式，用于 placeholder-style 属性）
const placeholderStyle = computed(() => {
  const styles: CSSProperties = {}
  if (useProps.fontSize) styles.fontSize = useUnit(useProps.fontSize)
  if (useProps.placeholderColor) styles.color = useColor(useProps.placeholderColor)
  return useStyle(styles, "string")
})

// 是否显示清除按钮
const showClear = computed(() => {
  const clearable = useProps.clearabled !== undefined ? useProps.clearabled : useProps.clearable
  return clearable && modelValue.value
})

watch(() => modelValue.value, updateValue)
watch(
  () => useProps.modelValue,
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
  width: 100%;
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
      color: var(--ui-color-text);
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
