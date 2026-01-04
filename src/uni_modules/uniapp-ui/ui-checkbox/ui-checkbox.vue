<template>
  <view class="ui-checkbox" :class="[classs, customClass]" :style="[style]" @click.stop="onClick">
    <view class="ui-checkbox__icon" :class="[iconClass]" @click.stop="onClickIcon">
      <slot name="icon" :checked="checked" :disabled="disabled">
        <view class="ui-checkbox__icon__wrap" :style="[iconWrapStyle]">
          <view v-if="prop('shape') === 'dot'" class="ui-checkbox__dot" :style="[dotStyle]" />
          <ui-icon v-else :name="icon" :color="iconColor" :weight="iconWeight" :custom-style="iconStyle" />
        </view>
      </slot>
    </view>
    <view v-if="labelVisible" class="ui-checkbox__label" :class="[labelClass]" :style="[labelStyle]" @click.stop="onClickLabel">
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { CheckboxValueType } from "./index"
import { checkboxGroupKey } from "../ui-checkbox-group"
import { isDef, isBoolean } from "../utils/check"
import { useUnit, useColor, useStyle, useParent } from "../hooks"
import { checkboxEmits, checkboxProps, useCheckboxProps } from "./index"

defineOptions({ name: "ui-checkbox" })

const props = defineProps(checkboxProps)
const emits = defineEmits(checkboxEmits)
const useProps = useCheckboxProps(props)
const slots = useSlots()

const { index, parent } = useParent(checkboxGroupKey)

const style = computed(() => {
  const style: CSSProperties = {}
  style.fontSize = useUnit(prop("iconSize"))
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (checked.value) list.push("ui-checkbox--checked")
  if (prop("disabled")) list.push("ui-checkbox--disabled")
  if (prop("labelLeft")) list.push("ui-checkbox--left")
  return list
})

const iconColor = computed(() => {
  return checked.value ? "#ffffff" : "transparent"
})

const iconStyle = computed(() => {
  const style: CSSProperties = {}
  style.fontSize = "0.8em"
  style.transition = "color 0.1s linear"
  return useStyle(style)
})

const iconClass = computed(() => {
  const list: string[] = []
  if (prop("round")) list.push("ui-checkbox__icon--round")
  if (checked.value) list.push("ui-checkbox__icon--checked")
  if (disabled.value) list.push("ui-checkbox__icon--disabled")
  return list
})

const iconWrapStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(prop("iconSize"))
  style.height = useUnit(prop("iconSize"))
  style.fontSize = useUnit(prop("iconSize"))
  style.borderColor = useColor(prop("iconColor"))
  style.borderRadius = useUnit(prop("iconRadius"))
  if (checked.value) {
    style.color = useColor(prop("checkedIconColor"))
    style.borderColor = useColor(prop("checkedIconColor"))
    if (prop("shape") === "dot") {
      style.backgroundColor = useColor(prop("checkedIconColor"))
    }
  }
  return useStyle(style)
})

const dotStyle = computed(() => {
  const style: CSSProperties = {}
  style.borderRadius = prop("round") ? "9999px" : useUnit(prop("iconRadius")) || "2rpx"
  return useStyle(style)
})

const labelStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(prop("labelColor"))
  style.fontSize = useUnit(prop("labelSize"))
  style.fontWeight = prop("labelWeight")
  if (prop("checkedLabelColor") && checked.value) style.color = useColor(prop("checkedLabelColor"))
  if (prop("labelGap")) {
    if (prop("labelLeft")) {
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
  if (prop("labelLeft")) list.push("ui-checkbox__label--left")
  return list
})

const name = computed(() => useProps.name || index.value)
const checked = computed(() => (useProps.bindGroup && parent ? parent.useProps.modelValue.includes(name.value) : !!useProps.modelValue))
const disabled = computed(() => prop("disabled"))
const labelVisible = computed(() => slots.default || useProps.label)

watch(
  () => useProps.modelValue,
  (value) => emits("change", value),
)

function prop(name: string) {
  if (useProps.bindGroup && parent) {
    if (isDef(props[name])) return props[name]
    if (isDef(parent.props[name])) return parent.props[name]
  } else {
    return props[name]
  }
}

async function updateValue(value: CheckboxValueType) {
  emits("update:modelValue", toRaw(value))
}

function toggle(check?: boolean) {
  if (prop("disabled")) return
  if (parent && useProps.bindGroup) {
    const value = parent.useProps.modelValue
    const add = () => {
      const isMax = parent.useProps.max && value.length >= +parent.useProps.max
      if (!isMax && !value.includes(useProps.name)) {
        value.push(useProps.name)
        parent.updateValue(value)
      }
    }
    const remove = () => {
      if (index.value !== -1) {
        value.splice(index.value, 1)
        parent.updateValue(value)
      }
    }
    if (isBoolean(check)) {
      if (check) add()
      else remove()
    } else if (index.value >= 0) {
      remove()
    } else {
      add()
    }
  } else {
    updateValue(!useProps.modelValue)
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

defineExpose({ useProps, checked, toggle, name })
</script>

<script lang="ts">
export default {
  name: "ui-checkbox",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-checkbox {
  display: flex;
  user-select: none;

  &__icon {
    display: flex;
    position: relative;
    align-items: center;

    &__wrap {
      border: var(--ui-border-width-thick) solid var(--ui-color-border-dark);
      display: flex;
      align-items: center;
      border-radius: var(--ui-radius-sm);
      justify-content: center;
      transition-duration: var(--ui-transition-fast);
      transition-property: color, border-color, background-color;
    }

    &--round > &__wrap {
      border-radius: var(--ui-radius-round);
    }

    &--checked > &__wrap {
      color: var(--ui-color-background);
      border-color: var(--ui-color-primary);
      background-color: var(--ui-color-primary);
    }

    &--disabled > &__wrap {
      color: var(--ui-color-background);
      border-color: var(--ui-color-border-dark);
      background-color: var(--ui-color-background-dark);
    }
  }

  &__dot {
    width: 40%;
    height: 40%;
    transition: border-radius var(--ui-transition-fast);
    background-color: var(--ui-color-background);
  }

  &__label {
    flex: 1;
    margin-left: var(--ui-spacing-sm);
    &--left {
      margin-left: 0;
      margin-right: var(--ui-spacing-sm);
    }
  }

  &--left {
    flex-direction: row-reverse;
  }
}
</style>
