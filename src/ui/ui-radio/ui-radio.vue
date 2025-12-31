<template>
  <view class="ui-radio" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="ui-radio__icon" :class="[iconClass]" @click.stop="onClickIcon">
      <slot name="icon" :checked="checked" :disabled="disabled">
        <view class="ui-radio__icon__wrap" :style="[iconWrapStyle]">
          <view v-if="prop('shape') === 'dot'" class="ui-radio__dot" :style="[dotStyle]" />
          <ui-icon v-else :name="icon" :color="iconColor" :weight="iconWeight" :custom-style="iconStyle" />
        </view>
      </slot>
    </view>
    <view v-if="labelVisible" class="ui-radio__label" :class="[labelClass]" :style="[labelStyle]" @click.stop="onClickLabel">
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { radioGroupKey } from "../ui-radio-group"
import { radioEmits, radioProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-radio" })

const props = defineProps(radioProps)
const emits = defineEmits(radioEmits)
const slots = useSlots()

const { index, parent } = useParent(radioGroupKey)

const style = computed(() => {
  const style: CSSProperties = {}
  style.fontSize = useUnit(prop("iconSize"))

  const gap = prop("gap")
  if (gap && index.value > 0) {
    if (parent?.props.vertical) {
      style.marginTop = useUnit(gap)
    } else {
      style.marginLeft = useUnit(gap)
    }
  }

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (checked.value) list.push("ui-radio--checked")
  if (prop("disabled")) list.push("ui-radio--disabled")
  if (prop("labelLeft")) list.push("ui-radio--left")
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
  if (prop("round")) list.push("ui-radio__icon--round")
  if (checked.value) list.push("ui-radio__icon--checked")
  if (disabled.value) list.push("ui-radio__icon--disabled")
  return list
})

const iconWrapStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(prop("iconSize"))
  style.height = useUnit(prop("iconSize"))
  style.fontSize = useUnit(prop("iconSize"))
  style.borderColor = useColor(prop("iconColor"))
  style.borderRadius = useUnit(prop("iconRadius"))

  if (prop("shape") === "dot") {
    // dot 样式下，背景色和边框颜色同步
    const color = checked.value ? useColor(prop("checkedIconColor")) : useColor(prop("iconColor"))
    style.backgroundColor = color
    style.borderColor = color
  } else if (checked.value) {
    style.color = useColor(prop("checkedIconColor"))
    style.borderColor = useColor(prop("checkedIconColor"))
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
  if (checked.value) list.push("ui-radio__label--checked")
  if (disabled.value) list.push("ui-radio__label--disabled")
  if (prop("labelLeft")) list.push("ui-radio__label--left")
  return list
})

const name = computed(() => props.name || index.value)
const checked = computed(() => parent?.props.modelValue === name.value)
const disabled = computed(() => prop("disabled"))
const labelVisible = computed(() => slots.default || props.label)

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}

function toggle() {
  if (prop("disabled") || checked.value) return
  parent.updateValue(props.name)
}

function onClick() {
  toggle()
  emits("click")
}

function onClickIcon() {
  toggle()
  emits("click")
}

function onClickLabel() {
  if (prop("labelDisabled")) return
  toggle()
  emits("click")
}

defineExpose({ toggle })
</script>

<script lang="ts">
export default {
  name: "ui-radio",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-radio {
  display: flex;
  user-select: none;

  &__icon {
    display: flex;
    position: relative;
    align-items: center;

    &__wrap {
      border: 2rpx solid #cccccc;
      display: flex;
      align-items: center;
      border-radius: 4rpx;
      justify-content: center;
      transition-duration: 0.2s;
      transition-property: color, border-color, background-color;
    }

    &--round > &__wrap {
      border-radius: 9999px;
    }

    &--checked > &__wrap {
      color: #ffffff;
      border-color: var(--ui-color-primary);
      background-color: var(--ui-color-primary);
    }

    &--disabled > &__wrap {
      color: #ffffff;
      border-color: #cccccc;
      background-color: #f5f5f5;
    }
  }

  &__dot {
    width: 40%;
    height: 40%;
    transition: border-radius 0.2s;
    background-color: #ffffff;
  }

  &__label {
    flex: 1;
    margin-left: 12rpx;
    &--left {
      margin-left: 0;
      margin-right: 12rpx;
    }
  }

  &--left {
    flex-direction: row-reverse;
  }
}
</style>
