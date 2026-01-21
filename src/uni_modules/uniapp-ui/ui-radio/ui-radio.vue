<template>
  <view class="ui-radio" :class="[rootClass, useProps.customClass]" :style="[rootStyle]" @click.stop="onClick">
    <view class="ui-radio__icon" :class="[iconClass]" :style="[iconContainerStyle]" @click.stop="onClickIcon">
      <slot name="icon" :checked="checked" :disabled="disabled">
        <view v-if="checked && actualShape === 'dot'" class="ui-radio__dot" :style="[dotStyle]" />
      </slot>
    </view>
    <view v-if="hasLabel" class="ui-radio__content" :class="[contentClass]">
      <view class="ui-radio__label" :class="[labelClass]" :style="[labelStyle]" @click.stop="onClickLabel">
        <slot>{{ label }}</slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { RadioValueType } from "./index"
import { isDef } from "../utils/check"
import { radioGroupKey } from "../ui-radio-group"
import { toRaw, watch, computed, useSlots } from "vue"
import { radioEmits, radioProps, useRadioProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-radio" })

const props = defineProps(radioProps)
const emits = defineEmits(radioEmits)
const useProps = useRadioProps(props)
const slots = useSlots()

const { index, parent } = useParent(radioGroupKey)

const actualShape = computed(() => prop("shape") || "dot")
const isLabelLeft = computed(() => prop("labelLeft"))

const primaryColor = computed(() => {
  const color = prop("checkedColor")
  if (color) return useColor(color)
  const checkedIconColor = prop("checkedIconColor")
  if (checkedIconColor) return useColor(checkedIconColor)
  return ""
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const rootClass = computed(() => {
  const list: string[] = []
  if (checked.value) list.push("ui-radio--checked")
  if (prop("disabled")) list.push("ui-radio--disabled")
  if (prop("readonly")) list.push("ui-radio--readonly")
  if (isLabelLeft.value) list.push("ui-radio--left")
  return list
})

const iconContainerStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(prop("iconSize")) || undefined
  style.height = useUnit(prop("iconSize")) || undefined
  style.borderColor = useColor(prop("iconColor")) || undefined
  style.borderRadius = useUnit(prop("iconRadius")) || undefined

  if (checked.value) {
    const color = primaryColor.value || "var(--ui-color-primary)"
    style.borderColor = color
    style.backgroundColor = color
  }

  return useStyle(style)
})

const iconClass = computed(() => {
  const list: string[] = []
  if (prop("round")) list.push("ui-radio__icon--round")
  if (checked.value && actualShape.value === "icon") list.push("ui-radio__icon--check")
  if (disabled.value) list.push("ui-radio__icon--disabled")
  return list
})

const dotStyle = computed(() => {
  const style: CSSProperties = {}
  style.borderRadius = prop("round") ? "9999px" : useUnit(prop("iconRadius")) || "2rpx"
  return useStyle(style)
})

const hasLabel = computed(() => slots.default || useProps.label)

const contentClass = computed(() => {
  const list: string[] = []
  if (isLabelLeft.value) list.push("ui-radio__content--left")
  return list
})

const labelStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(prop("labelColor")) || undefined
  style.fontSize = useUnit(prop("labelSize")) || undefined
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
  if (checked.value) list.push("ui-radio__label--checked")
  if (disabled.value) list.push("ui-radio__label--disabled")
  if (isLabelLeft.value) list.push("ui-radio__label--left")
  return list
})

const name = computed(() => useProps.name || index.value)
const checked = computed(() => {
  if (useProps.bindGroup && parent) {
    return parent.useProps.modelValue === name.value
  }
  return !!useProps.modelValue
})
const disabled = computed(() => prop("disabled"))
const label = computed(() => useProps.label)

watch(
  () => useProps.modelValue,
  (value) => emits("change", value),
)

function prop(name: string) {
  if (useProps.bindGroup && parent) {
    if (isDef(props[name]) && props[name] !== "") return props[name]
    if (isDef(parent.props[name])) return parent.props[name]
  }
  return props[name]
}

async function updateValue(value: RadioValueType) {
  emits("update:modelValue", toRaw(value))
}

function toggle(check?: boolean) {
  if (prop("disabled") || prop("readonly")) return

  if (parent && useProps.bindGroup) {
    if (!checked.value) {
      parent.updateValue(useProps.name)
    }
  } else {
    const newValue = check ?? !useProps.modelValue
    updateValue(newValue)
  }
}

function onClick(event: any) {
  toggle()
  emits("click")
}

function onClickIcon(event: any) {
  toggle()
  emits("click")
}

function onClickLabel(event: any) {
  if (prop("labelDisabled")) return
  toggle()
  emits("click")
}

defineExpose({ useProps, checked, toggle, name })
</script>

<script lang="ts">
export default {
  name: "ui-radio",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
$check-icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cpolyline points='4,12 9,17 20,6' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

.ui-radio {
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
    width: 36rpx;
    border: var(--ui-border-width-thick) solid var(--ui-color-border-dark);
    height: 36rpx;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: var(--ui-radius-round);
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

    &--disabled {
      border-color: var(--ui-color-border-dark);
      background-color: var(--ui-color-background-dark);
    }
  }

  &__dot {
    width: 40%;
    height: 40%;
    border-radius: 9999px;
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
    font-size: 28rpx;
    word-break: break-word;
    line-height: 1.4;

    &--disabled {
      color: var(--ui-color-text-disabled);
    }
  }
}
</style>
