<template>
  <view v-if="prefix || suffix" class="ui-text" :style="[style]" :class="[classs, customClass]" @click="onClick">
    <text class="ui-text__prefix" :style="[prefixStyle]" :decode="decode" :selectable="selectable" :user-select="selectable">{{ prefix }}</text>
    <text class="ui-text__text" :style="[textStyle]" :decode="decode" :selectable="selectable" :user-select="selectable">
      <slot>{{ text }}</slot>
    </text>
    <text class="ui-text__suffix" :style="[suffixStyle]" :decode="decode" :selectable="selectable" :user-select="selectable">{{ suffix }}</text>
  </view>
  <text v-else class="ui-text" :class="[classs, customClass]" :style="[textStyle]" :decode="decode" :selectable="selectable" :user-select="selectable" @click="onClick">
    <slot>{{ text }}</slot>
  </text>
</template>

<script setup lang="ts">
import { textEmits, textProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-text" })

const props = defineProps(textProps)
const emits = defineEmits(textEmits)

const style = computed(() => {
  const style: any = {}
  style.fontWeight = props.weight
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.size)
  if (props.rows && props.rows !== Infinity) {
    style["-webkit-line-clamp"] = props.rows
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const textStyle = computed(() => {
  const style: any = {}
  style.fontWeight = props.weight
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.size)
  style.textAlign = props.align
  style.lineHeight = props.lineHeight
  style.textOverflow = props.overflow
  style.textDecoration = props.decoration
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const prefixStyle = computed(() => {
  const style: any = {}
  style.fontWeight = props.prefixWeight
  style.color = useColor(props.prefixColor)
  style.fontSize = useUnit(props.prefixSize)
  style.marginRight = useUnit(props.prefixGutter)
  style.textDecoration = props.prefixDecoration
  return useStyle(style)
})

const suffixStyle = computed(() => {
  const style: any = {}
  style.fontWeight = props.suffixWeight
  style.color = useColor(props.suffixColor)
  style.fontSize = useUnit(props.suffixSize)
  style.marginLeft = useUnit(props.suffixGutter)
  style.textDecoration = props.suffixDecoration
  return useStyle(style)
})

const classs = computed(() => {
  const list: string[] = []
  if (props.clickable) list.push("ui-text--clickable")
  if (props.rows && props.rows !== Infinity) {
    list.push("ui-text--rows")
  }
  return list
})

/**
 * 点击事件
 */
function onClick() {
  if (props.cell) {
    uni.makePhoneCall({ phoneNumber: props.text as string })
  }
  emits("click")
}

defineExpose({ name: "ui-text" })
</script>

<script lang="ts">
export default {
  name: "ui-text",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-text {
  &--rows {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }

  &--clickable {
    &:active {
      opacity: 0.6;
    }
  }
}
</style>
