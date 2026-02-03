<template>
  <view class="ui-timeline" :class="[classes, customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { useStyle, useChildren } from "../hooks"
import { timelineKey, timelineEmits, timelineProps } from "./index"

defineOptions({ name: "ui-timeline" })

const props = defineProps(timelineProps)
const emits = defineEmits(timelineEmits)
const { childrens, linkChildren } = useChildren(timelineKey)

/**
 * 子组件数量
 */
const count = computed(() => childrens.length)

/**
 * 组件容器样式
 */
const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

/**
 * 组件容器类名
 */
const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-timeline--${props.mode}`)
  if (props.reverse) {
    list.push("ui-timeline--reverse")
  }
  return list
})

/**
 * 点击时间轴项事件处理
 */
function onClickItem(index: number) {
  emits("clickItem", index)
}

linkChildren({ props, count, onClickItem })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-timeline {
  display: flex;
  flex-direction: column;

  &--reverse {
    flex-direction: column-reverse;
  }
}
</style>
