<template>
  <view class="ui-search" :class="[customClass]" :style="[style]" @click="onClick">
    <view class="ui-search__content" :class="[contentClass]" :style="[contentStyle]">
      <view class="ui-search__icon">
        <slot name="icon">
          <ui-icon :name="icon" :size="iconSize" :color="iconColor" :weight="iconWeight" />
        </slot>
      </view>
      <input
        v-model="modelValue"
        class="ui-search__value"
        :class="[valueClass]"
        :style="[valueStyle]"
        type="text"
        confirm-type="search"
        :focus="focus"
        :disabled="disabled"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
      />
      <view v-if="clearabled" class="ui-search__clear" @click.stop="onClickClear">
        <slot name="clear">
          <ui-icon name="clear" color="#999" size="28rpx" />
        </slot>
      </view>
    </view>
    <view v-if="action" class="ui-search__action" @click.stop="onClickAction">
      <slot name="action">
        <view class="ui-search__action__button" hover-class="ui-search__action__button--active" :style="[actionButtonStyle]">
          {{ actionText }}
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUnit, useColor, useStyle } from "../hooks"
import { searchEmits, searchProps, searchInputAlign } from "./index"

defineOptions({ name: "ui-search" })

const props = defineProps(searchProps)
const emits = defineEmits(searchEmits)
const modelValue = ref(props.modelValue)

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.margin = useUnit(props.margin)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const contentStyle = computed(() => {
  const style: any = {}
  style.border = props.border
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle(style)
})

const contentClass = computed(() => {
  const list: string[] = []
  if (props.round) list.push("ui-search__content--round")
  return list
})

const valueStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  if (searchInputAlign.includes(props.inputAlign)) style.textAlign = props.inputAlign
  return useStyle({ ...style, ...useStyle(props.inputStyle) })
})

const valueClass = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("ui-search__value--disabled")
  return list
})

const actionButtonStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.actionColor)
  style.fontSize = useUnit(props.actionSize)
  style.fontWeight = props.actionWeight
  return useStyle(style)
})

const placeholderStyle = computed(() => {
  const style: any = {}
  if (props.fontSize) style.fontSize = useUnit(props.fontSize)
  if (props.placeholderColor) style.color = useColor(props.placeholderColor)
  return useStyle(style, "string")
})

const clearabled = computed(() => {
  return props.clearabled && modelValue.value
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

function onClick(event: any) {
  emits("click", event)
}

function onClickClear(event: any) {
  modelValue.value = ""
  updateValue("")
  emits("clear", event)
}

function onClickAction(event: any) {
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
    padding: 0 var(--ui-spacing-lg);
    align-items: center;
    border-radius: var(--ui-radius-md);
    background-color: var(--ui-color-background-light);

    &--round {
      border-radius: var(--ui-radius-round);
    }
  }

  &__icon {
    display: flex;
    margin-right: var(--ui-spacing-sm);
  }

  &__value {
    width: 100%;
    font-size: var(--ui-font-size-md);
    &--disabled {
      pointer-events: none;
    }
  }

  &__clear {
    margin-left: var(--ui-spacing-lg);
  }

  &__action {
    margin-left: var(--ui-spacing-lg);
    &__button {
      color: var(--ui-color-text-secondary);
      padding: 0 var(--ui-spacing-lg);
      font-size: var(--ui-font-size-md);

      &--active {
        opacity: var(--ui-opacity-active);
      }
    }
  }
}
</style>
