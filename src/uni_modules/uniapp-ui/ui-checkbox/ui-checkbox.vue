<template>
  <view class="ui-checkbox" :class="[rootClass, props.customClass]" :style="[rootStyle]" @click.stop="onClick">
    <view class="ui-checkbox__icon" :class="[iconClass]" :style="[iconContainerStyle]" @click.stop="onClickIcon">
      <slot name="icon" :checked="checked" :disabled="disabled" :indeterminate="isIndeterminate">
        <view v-if="checked && !isIndeterminate && actualShape === 'dot'" class="ui-checkbox__dot" :style="[dotStyle]" />
      </slot>
    </view>
    <view v-if="hasLabel" class="ui-checkbox__content" :class="[contentClass]">
      <view class="ui-checkbox__label" :class="[labelClass]" :style="[labelStyle]" @click.stop="onClickLabel">
        <slot>{{ label }}</slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { CheckboxValueType } from "./index"
import { checkboxGroupKey } from "../ui-checkbox-group"
import { isDef, isBoolean } from "../utils/check"
import { checkboxEmits, checkboxProps } from "./index"
import { toRaw, watch, computed, useSlots } from "vue"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-checkbox" })

const props = defineProps(checkboxProps)
const emits = defineEmits(checkboxEmits)
const slots = useSlots()

const { index, parent } = useParent(checkboxGroupKey)

const DEFAULT_ICON_SIZE = "36rpx"
const DEFAULT_LABEL_SIZE = "28rpx"

const actualIconSize = computed(() => {
  const iconSize = prop("iconSize")
  if (iconSize) return useUnit(iconSize)
  const size = prop("size")
  if (size) return useUnit(size)
  return DEFAULT_ICON_SIZE
})

const actualLabelSize = computed(() => {
  const labelSize = prop("labelSize")
  if (labelSize) return useUnit(labelSize)
  return DEFAULT_LABEL_SIZE
})

const isLabelLeft = computed(() => prop("labelPosition") === "left")

const primaryColor = computed(() => {
  const color = prop("color")
  if (color) return useColor(color)
  const checkedIconColor = prop("checkedIconColor")
  if (checkedIconColor) return useColor(checkedIconColor)
  const checkedColor = prop("checkedColor")
  if (checkedColor) return useColor(checkedColor)
  return ""
})

const isIndeterminate = computed(() => prop("indeterminate"))

const actualShape = computed(() => prop("shape") || "dot")

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const rootClass = computed(() => {
  const list: string[] = []
  if (checked.value) list.push("ui-checkbox--checked")
  if (isIndeterminate.value) list.push("ui-checkbox--indeterminate")
  if (prop("disabled")) list.push("ui-checkbox--disabled")
  if (prop("readonly")) list.push("ui-checkbox--readonly")
  if (isLabelLeft.value) list.push("ui-checkbox--left")
  return list
})

const iconContainerStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = actualIconSize.value
  style.height = actualIconSize.value
  style.borderColor = useColor(prop("iconColor")) || undefined
  style.borderRadius = useUnit(prop("iconRadius")) || undefined

  if (checked.value || isIndeterminate.value) {
    const color = primaryColor.value || "var(--ui-color-primary)"
    style.borderColor = color
    style.backgroundColor = color
  }

  return useStyle(style)
})

const iconClass = computed(() => {
  const list: string[] = []
  if (prop("round")) list.push("ui-checkbox__icon--round")
  if (isIndeterminate.value) {
    list.push("ui-checkbox__icon--indeterminate")
  } else if (checked.value && actualShape.value === "icon") {
    list.push("ui-checkbox__icon--check")
  }
  if (disabled.value) list.push("ui-checkbox__icon--disabled")
  return list
})

const dotStyle = computed(() => {
  const style: CSSProperties = {}
  style.borderRadius = prop("round") ? "9999px" : useUnit(prop("iconRadius")) || "2rpx"
  return useStyle(style)
})

const hasLabel = computed(() => slots.default || props.label)

const contentClass = computed(() => {
  const list: string[] = []
  if (isLabelLeft.value) list.push("ui-checkbox__content--left")
  return list
})

const labelStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(prop("labelColor")) || undefined
  style.fontSize = actualLabelSize.value
  style.fontWeight = prop("labelWeight") || undefined
  if (prop("checkedLabelColor") && checked.value) {
    style.color = useColor(prop("checkedLabelColor"))
  }
  if (prop("labelGap")) {
    if (isLabelLeft.value) {
      style.marginRight = useUnit(prop("labelGap"))
    } else {
      style.marginLeft = useUnit(prop("labelGap"))
    }
  }
  return useStyle(style)
})

const labelClass = computed(() => {
  const list: string[] = []
  if (checked.value) list.push("ui-checkbox__label--checked")
  if (disabled.value) list.push("ui-checkbox__label--disabled")
  if (isLabelLeft.value) list.push("ui-checkbox__label--left")
  return list
})

const name = computed(() => props.name || index.value)
const checked = computed(() => (props.bindGroup && parent ? parent.props.modelValue.includes(name.value) : !!props.modelValue))
const disabled = computed(() => prop("disabled"))
const label = computed(() => props.label)

watch(
  () => props.modelValue,
  (value) => emits("change", value),
)

function prop(name: string) {
  if (props.bindGroup && parent) {
    // 子组件有显式定义的值时使用子组件的
    if (isDef(props[name])) return props[name]
    // 否则使用父组件的值
    if (isDef(parent.props[name])) return parent.props[name]
  }
  return props[name]
}

async function updateValue(value: CheckboxValueType) {
  emits("update:modelValue", toRaw(value))
}

function toggle(check?: boolean) {
  if (prop("disabled") || prop("readonly")) return

  if (parent && props.bindGroup) {
    const value = parent.props.modelValue
    const min = parent.props.min ?? 0

    const add = () => {
      const isMax = parent.props.max && value.length >= +parent.props.max
      if (!isMax && !value.includes(props.name)) {
        value.push(props.name)
        parent.updateValue(value)
      }
    }

    const remove = () => {
      if (value.length <= +min) return
      const valueIndex = value.indexOf(name.value)
      if (valueIndex !== -1) {
        value.splice(valueIndex, 1)
        parent.updateValue(value)
      }
    }

    if (isBoolean(check)) {
      if (check) add()
      else remove()
    } else if (checked.value) {
      remove()
    } else {
      add()
    }
  } else {
    updateValue(!props.modelValue)
  }
}

function onClick(event: any) {
  toggle()
  emits("click", event)
}

function onClickIcon(event: any) {
  toggle()
  emits("click", event)
}

function onClickLabel(event: any) {
  if (prop("labelDisabled")) return
  toggle()
  emits("click", event)
}

defineExpose({ props, checked, toggle, name })
</script>

<script lang="ts">
export default {
  name: "ui-checkbox",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
$check-icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cpolyline points='4,12 9,17 20,6' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
$indeterminate-icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cline x1='5' y1='12' x2='19' y2='12' stroke='white' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E";

.ui-checkbox {
  gap: 12rpx;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);
  }

  &--readonly {
    cursor: default;
  }

  &--left {
    flex-direction: row-reverse;
  }

  &__icon {
    border: var(--ui-border-width-thick) solid var(--ui-color-border-dark);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: var(--ui-radius-sm);
    background-size: 65% 65%;
    justify-content: center;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    transition-duration: var(--ui-transition-fast);
    transition-property: border-color, background-color;

    &--round {
      border-radius: var(--ui-radius-round);
    }

    &--check {
      background-image: url($check-icon);
    }

    &--indeterminate {
      background-image: url($indeterminate-icon);
    }

    &--disabled {
      border-color: var(--ui-color-border-dark);
      background-color: var(--ui-color-background-dark);
    }
  }

  &__dot {
    width: 40%;
    height: 40%;
    border-radius: 2rpx;
    background-color: #fff;
  }

  &__content {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;

    &--left {
      align-items: flex-end;
    }
  }

  &__label {
    flex: 1;
    color: var(--ui-color-text-primary);
    word-break: break-word;
    line-height: 1.4;

    &--disabled {
      color: var(--ui-color-text-disabled);
    }
  }
}
</style>
