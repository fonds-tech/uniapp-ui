<template>
  <view class="ui-text-highlight" :style="[style]" :class="[useProps.customClass]">
    <text
      v-for="(item, index) in list"
      :key="index"
      :style="[textStyle(item)]"
      class="ui-text-highlight__text"
      :class="{ 'is-matched': text && item.matched }"
      @click.stop="onClickMatch(item)"
    >
      {{ item.text }}
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"

import { isNoEmpty } from "../utils/check"
import { useUnit, useColor, useStyle } from "../hooks"
import { textHighlightEmits, textHighlightProps, useTextHighlightProps } from "./index"

defineOptions({ name: "ui-text-highlight" })

const props = defineProps(textHighlightProps)
const emits = defineEmits(textHighlightEmits)
const useProps = useTextHighlightProps(props)
const list = ref([])

const style = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.color)
  style.fontSize = useUnit(useProps.fontSize)
  style.fontWeight = useProps.fontWeight
  style.lineHeight = useProps.lineHeight
  style["-webkit-line-clamp"] = useProps.textRow
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const textStyle = computed(() => {
  return (val: any) => {
    const style: any = {}
    if (val.matched) style.color = useColor(useProps.highlightColor)
    return useStyle(style)
  }
})

watch(() => useProps.text, match, { immediate: true })
watch(() => useProps.match, match, { immediate: true })

function match() {
  const escapeRegExp = (val: string) => {
    return val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }
  if (useProps.text && isNoEmpty(useProps.match)) {
    const escapedMatch = escapeRegExp(useProps.match)
    const parts = useProps.text.split(new RegExp(`(${escapedMatch})`)).filter(Boolean)
    list.value = parts.map((text: string) => {
      return { text, matched: text === useProps.match }
    })
  } else {
    list.value = [{ text: useProps.text, matched: false }]
  }
}

function onClickMatch(item: any) {
  if (item.matched) {
    emits("clickMatch", item.text)
  } else {
    emits("click", item.text)
  }
}

defineExpose({ name: "ui-text-highlight", match })
</script>

<script lang="ts">
export default {
  name: "ui-text-highlight",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-text-highlight {
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;

  &__text {
    display: inline;
    word-break: break-all;

    &.is-matched {
      color: var(--ui-color-primary);
    }
  }
}
</style>
