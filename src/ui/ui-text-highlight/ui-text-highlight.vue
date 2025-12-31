<template>
  <view class="ui-text-highlight" :style="[style]" :class="[props.customClass]">
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
import { isNoEmpty } from "../utils/check"
import { useUnit, useColor, useStyle } from "../hooks"
import { textHighlightEmits, textHighlightProps } from "./index"

defineOptions({ name: "ui-text-highlight" })

const props = defineProps(textHighlightProps)
const emits = defineEmits(textHighlightEmits)

const list = ref([])

const style = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  style.lineHeight = props.lineHeight
  style["-webkit-line-clamp"] = props.textRow
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const textStyle = computed(() => {
  return (val: any) => {
    const style: any = {}
    if (val.matched) style.color = useColor(props.highlightColor)
    return useStyle(style)
  }
})

watch(() => props.text, match, { immediate: true })
watch(() => props.match, match, { immediate: true })

function match() {
  const escapeRegExp = (val: string) => {
    return val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }
  if (props.text && isNoEmpty(props.match)) {
    const escapedMatch = escapeRegExp(props.match)
    const parts = props.text.split(new RegExp(`(${escapedMatch})`)).filter(Boolean)
    list.value = parts.map((text: string) => {
      return { text, matched: text === props.match }
    })
  } else {
    list.value = [{ text: props.text, matched: false }]
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
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-text-highlight {
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  line-clamp: 1;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  &__text.is-matched {
    color: var(--ui-color-primary);
  }
}
</style>
