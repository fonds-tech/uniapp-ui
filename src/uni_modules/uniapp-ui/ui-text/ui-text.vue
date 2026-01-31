<template>
  <text
    class="ui-text"
    :class="[classes, customClass]"
    :style="[style]"
    :decode="decode"
    :selectable="selectable"
    :user-select="selectable"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </text>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { textEmits, textProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-text" })

// 组件 props 和 emits
const props = defineProps(textProps)
const emits = defineEmits(textEmits)

// 根节点样式
const style = computed(() => {
  const style: any = {}
  // 字体粗细
  style.fontWeight = props.weight
  // 文本颜色
  style.color = useColor(props.color)
  // 字体大小
  style.fontSize = useUnit(props.size)
  // 文本对齐方式
  style.textAlign = props.align
  // 行高
  style.lineHeight = props.lineHeight
  // 文本装饰（下划线等）
  style.textDecoration = props.decoration
  // 多行省略时设置最大行数
  if (+props.rows > 1) {
    style["-webkit-line-clamp"] = props.rows
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 类名数组
const classes = computed(() => {
  const list: string[] = []
  // 可点击状态
  if (props.clickable) list.push("ui-text--clickable")
  // 单行省略
  if (+props.rows === 1) list.push("ui-text--ellipsis")
  // 多行省略
  if (+props.rows > 1) list.push("ui-text--clamp")
  return list
})

// 点击事件处理
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
