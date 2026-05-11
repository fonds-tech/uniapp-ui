<template>
  <text class="ui-text" :class="[classNames, customClass]" :style="[rootStyle]" :decode="decode" :selectable="selectable" :user-select="selectable" @click="onClick">
    <slot>{{ text }}</slot>
  </text>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { textEmits, textProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-text" })

const props = defineProps(textProps)
const emits = defineEmits(textEmits)

const rowsNum = computed(() => +props.rows || 0)

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.weight) style.fontWeight = props.weight as number | string
  if (props.color) style.color = useColor(props.color)
  if (props.size) style.fontSize = useUnit(props.size)
  if (props.align) style.textAlign = props.align
  if (props.lineHeight) style.lineHeight = props.lineHeight as string | number
  if (props.decoration) style.textDecoration = props.decoration
  if (rowsNum.value > 1) (style as Record<string, unknown>)["-webkit-line-clamp"] = rowsNum.value
  return useStyle({ ...style, ...useStyle(props.customStyle) } as CSSProperties)
})

const classNames = computed(() => {
  const list: string[] = []
  if (props.clickable) list.push("ui-text--clickable")
  if (rowsNum.value === 1) list.push("ui-text--ellipsis")
  if (rowsNum.value > 1) list.push("ui-text--clamp")
  return list
})

function onClick() {
  emits("click")
}
</script>

<script lang="ts">
export default {
  name: "ui-text",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
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
      opacity: var(--ui-opacity-active);
    }
  }
}
</style>
