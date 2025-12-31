<template>
  <text class="ui-text" :class="[classes, customClass]" :style="[style]" :decode="decode" :selectable="selectable" :user-select="selectable" @click="onClick">
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
  style.textAlign = props.align
  style.lineHeight = props.lineHeight
  style.textDecoration = props.decoration
  if (+props.rows > 1) {
    style["-webkit-line-clamp"] = props.rows
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classes = computed(() => {
  const list: string[] = []
  if (props.clickable) list.push("ui-text--clickable")
  if (+props.rows === 1) list.push("ui-text--ellipsis")
  if (+props.rows > 1) list.push("ui-text--clamp")
  return list
})

function onClick() {
  emits("click")
}
</script>

<script lang="ts">
export default {
  name: "ui-text",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-text {
  &--ellipsis {
    flex: 1;
    display: block;
    overflow: hidden;
    min-width: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &--clamp {
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
