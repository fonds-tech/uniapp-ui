<template>
  <text class="ui-text" :class="[classes, customClass]" :style="[style]" :decode="decode" :selectable="selectable" :user-select="selectable" @click="onClick">
    <slot>{{ text }}</slot>
  </text>
</template>

<script setup lang="ts">
import { computed } from "vue"

import { useUnit, useColor, useStyle } from "../hooks"
import { textEmits, textProps, useTextProps } from "./index"

defineOptions({ name: "ui-text" })

const props = defineProps(textProps)
const emits = defineEmits(textEmits)
const useProps = useTextProps(props)
const style = computed(() => {
  const style: any = {}
  style.fontWeight = useProps.weight
  style.color = useColor(useProps.color)
  style.fontSize = useUnit(useProps.size)
  style.textAlign = useProps.align
  style.lineHeight = useProps.lineHeight
  style.textDecoration = useProps.decoration
  if (+useProps.rows > 1) {
    style["-webkit-line-clamp"] = useProps.rows
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classes = computed(() => {
  const list: string[] = []
  if (useProps.clickable) list.push("ui-text--clickable")
  if (+useProps.rows === 1) list.push("ui-text--ellipsis")
  if (+useProps.rows > 1) list.push("ui-text--clamp")
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
