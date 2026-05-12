<template>
  <view class="ui-timeline" :class="[classNames, customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { useUnit, useColor, useStyle, useChildren } from "../hooks"
import { timelineKey, timelineEmits, timelineProps } from "./index"

defineOptions({ name: "ui-timeline" })

const props = defineProps(timelineProps)
const emits = defineEmits(timelineEmits)

const { childrens, linkChildren } = useChildren(timelineKey)

// 子项数量
const count = computed(() => childrens.length)

// 根节点样式（CSS var 注入；item 通过 inherit 读取）
const rootStyle = computed(() => {
  const vars: CSSProperties = {}
  if (props.lineColor) vars["--ui-timeline-item-line-color" as keyof CSSProperties] = useColor(props.lineColor) as never
  if (props.lineWidth !== undefined) vars["--ui-timeline-item-line-width" as keyof CSSProperties] = useUnit(props.lineWidth) as never
  if (props.dotSize !== undefined) vars["--ui-timeline-item-dot-size" as keyof CSSProperties] = useUnit(props.dotSize) as never
  if (props.iconSize !== undefined) vars["--ui-timeline-item-icon-size" as keyof CSSProperties] = useUnit(props.iconSize) as never
  if (props.axisWidth !== undefined) vars["--ui-timeline-item-axis-width" as keyof CSSProperties] = useUnit(props.axisWidth) as never
  if (props.itemGap !== undefined) vars["--ui-timeline-item-gap" as keyof CSSProperties] = useUnit(props.itemGap) as never
  if (props.contentGap !== undefined) vars["--ui-timeline-item-content-gap" as keyof CSSProperties] = useUnit(props.contentGap) as never
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

// 根节点类名
const classNames = computed(() => {
  const list = [`ui-timeline--${props.mode}`]
  if (props.reverse) list.push("ui-timeline--reverse")
  return list
})

// 点击子项
function onClickItem(index: number) {
  emits("clickItem", index)
}

linkChildren({ props, count, onClickItem })
</script>

<script lang="ts">
export default {
  name: "ui-timeline",
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
.ui-timeline {
  display: flex;
  flex-direction: column;

  &--reverse {
    flex-direction: column-reverse;
  }
}
</style>
