<template>
  <view class="ui-radio" :class="[rootClass, props.customClass]" :style="[rootStyle]" @click.stop="onClick">
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
import { radioEmits, radioProps } from "./index"
import { toRaw, watch, computed, useSlots } from "vue"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-radio" })

const props = defineProps(radioProps)
const emits = defineEmits(radioEmits)
const slots = useSlots()

// 父组件（RadioGroup）
const { index, parent } = useParent(radioGroupKey)

// 实际形状
const actualShape = computed(() => prop("shape") || "dot")
// 标签是否在左侧
const isLabelLeft = computed(() => prop("labelLeft"))
// 主色
const primaryColor = computed(() => {
  const color = prop("checkedColor")
  if (color) return useColor(color)
  const checkedIconColor = prop("checkedIconColor")
  if (checkedIconColor) return useColor(checkedIconColor)
  return ""
})
// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 根节点类名
const rootClass = computed(() => {
  const list: string[] = []
  if (checked.value) list.push("ui-radio--checked")
  if (prop("disabled")) list.push("ui-radio--disabled")
  if (prop("readonly")) list.push("ui-radio--readonly")
  if (isLabelLeft.value) list.push("ui-radio--left")
  return list
})
// 图标容器样式
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
// 图标类名
const iconClass = computed(() => {
  const list: string[] = []
  if (prop("round")) list.push("ui-radio__icon--round")
  if (checked.value && actualShape.value === "icon") list.push("ui-radio__icon--check")
  if (disabled.value) list.push("ui-radio__icon--disabled")
  return list
})
// 圆点样式
const dotStyle = computed(() => {
  const style: CSSProperties = {}
  style.borderRadius = prop("round") ? "9999px" : useUnit(prop("iconRadius")) || "2rpx"
  return useStyle(style)
})
// 是否有标签
const hasLabel = computed(() => slots.default || props.label)
// 内容类名
const contentClass = computed(() => {
  const list: string[] = []
  if (isLabelLeft.value) list.push("ui-radio__content--left")
  return list
})
// 标签样式
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
// 标签类名
const labelClass = computed(() => {
  const list: string[] = []
  if (checked.value) list.push("ui-radio__label--checked")
  if (disabled.value) list.push("ui-radio__label--disabled")
  if (isLabelLeft.value) list.push("ui-radio__label--left")
  return list
})
// 名称
const name = computed(() => props.name || index.value)
// 是否选中
const checked = computed(() => {
  if (props.bindGroup && parent) {
    return parent.props.modelValue === name.value
  }
  return !!props.modelValue
})
// 是否禁用
const disabled = computed(() => prop("disabled"))
// 标签文本
const label = computed(() => props.label)

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (value) => emits("change", value),
)

// 获取属性值（优先使用自身，否则使用父组件）
function prop(name: string) {
  if (props.bindGroup && parent) {
    if (isDef(props[name]) && props[name] !== "") return props[name]
    if (isDef(parent.props[name])) return parent.props[name]
  }
  return props[name]
}

// 更新值
async function updateValue(value: RadioValueType) {
  emits("update:modelValue", toRaw(value))
}

// 切换选中状态
function toggle(check?: boolean) {
  if (prop("disabled") || prop("readonly")) return

  if (parent && props.bindGroup) {
    if (!checked.value) {
      parent.updateValue(props.name)
    }
  } else {
    const newValue = check ?? !props.modelValue
    updateValue(newValue)
  }
}

// 点击事件
function onClick(event: any) {
  toggle()
  emits("click")
}

// 点击图标事件
function onClickIcon(event: any) {
  toggle()
  emits("click")
}

// 点击标签事件
function onClickLabel(event: any) {
  if (prop("labelDisabled")) return
  toggle()
  emits("click")
}

defineExpose({ props, checked, toggle, name })
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
