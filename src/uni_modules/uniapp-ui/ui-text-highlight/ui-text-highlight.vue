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
import { ref, watch, computed } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { textHighlightEmits, textHighlightProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-text-highlight" })

// 定义 props 和 emits
const props = defineProps(textHighlightProps)
const emits = defineEmits(textHighlightEmits)

// 分段文本列表，存储分割后的文本片段及其匹配状态
const list = ref([])

// 根节点样式，整合颜色、字体大小、字重、行高等样式
const style = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  style.lineHeight = props.lineHeight
  style["-webkit-line-clamp"] = props.textRow
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 文本样式（根据是否匹配返回不同高亮颜色）
const textStyle = computed(() => {
  return (val: any) => {
    const style: any = {}
    if (val.matched) style.color = useColor(props.highlightColor)
    return useStyle(style)
  }
})

// 监听文本变化，触发匹配
watch(() => props.text, match, { immediate: true })
// 监听匹配文本变化，触发匹配
watch(() => props.match, match, { immediate: true })

// 执行文本匹配，将文本分割为高亮和非高亮部分
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

// 点击文本事件处理（匹配文本触发 clickMatch，其他触发 click）
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
