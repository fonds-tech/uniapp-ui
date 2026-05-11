<template>
  <view class="ui-text-highlight" :class="[customClass]" :style="[rootStyle]">
    <text
      v-for="(item, index) in list"
      :key="index"
      class="ui-text-highlight__text"
      :class="{ 'ui-text-highlight__text--matched': item.matched }"
      @click.stop="onClickMatch(item)"
    >
      {{ item.text }}
    </text>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isNoEmpty } from "../utils/check"
import { ref, watch, computed } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { textHighlightEmits, textHighlightProps } from "./index"

defineOptions({ name: "ui-text-highlight" })

const props = defineProps(textHighlightProps)
const emits = defineEmits(textHighlightEmits)

interface Segment {
  text: string
  matched: boolean
}

const list = ref<Segment[]>([])

// 根节点 CSS var 注入
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.color) vars["--ui-text-highlight-color"] = useColor(props.color)
  if (props.fontSize) vars["--ui-text-highlight-font-size"] = useUnit(props.fontSize)
  if (props.fontWeight) vars["--ui-text-highlight-font-weight"] = String(props.fontWeight)
  if (props.lineHeight) vars["--ui-text-highlight-line-height"] = String(props.lineHeight)
  if (props.highlightColor) vars["--ui-text-highlight-match-color"] = useColor(props.highlightColor)
  if (props.textRow) (vars as Record<string, unknown>)["-webkit-line-clamp"] = String(props.textRow)
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

watch(() => props.text, match, { immediate: true })
watch(() => props.match, match)

// 拆分文本为匹配/非匹配片段
function match() {
  if (!props.text) {
    list.value = []
    return
  }
  if (!isNoEmpty(props.match)) {
    list.value = [{ text: props.text, matched: false }]
    return
  }
  const escaped = props.match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = props.text.split(new RegExp(`(${escaped})`)).filter(Boolean)
  list.value = parts.map<Segment>((text) => ({ text, matched: text === props.match }))
}

function onClickMatch(item: Segment) {
  if (item.matched) emits("clickMatch", item.text)
  else emits("click", item.text)
}

defineExpose({ match })
</script>

<script lang="ts">
export default {
  name: "ui-text-highlight",
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
.ui-text-highlight {
  --ui-text-highlight-color: var(--ui-color-text);
  --ui-text-highlight-font-size: var(--ui-font-size-md);
  --ui-text-highlight-font-weight: var(--ui-font-weight-normal);
  --ui-text-highlight-line-height: var(--ui-line-height-normal);
  --ui-text-highlight-match-color: var(--ui-color-primary);
  color: var(--ui-text-highlight-color);

  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  font-size: var(--ui-text-highlight-font-size);
  font-weight: var(--ui-text-highlight-font-weight);
  line-height: var(--ui-text-highlight-line-height);
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;

  &__text {
    color: inherit;
    display: inline;
    font-size: inherit;
    word-break: break-all;
    font-weight: inherit;

    &--matched {
      color: var(--ui-text-highlight-match-color);
    }
  }
}
</style>
