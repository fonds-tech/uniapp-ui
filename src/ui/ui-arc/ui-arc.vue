<template>
  <view class="ui-arc" :class="[customClass]" :style="[style]" @click="onClick">
    <view class="ui-arc__inner" :style="[innerStyle]" />
  </view>
</template>

<script setup lang="ts">
import { arcEmits, arcProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-arc" })

// 定义组件的属性和事件
const props = defineProps(arcProps)
const emits = defineEmits(arcEmits)

// 计算宽度,确保至少为100%
// 这样可以保证弧形始终能覆盖整个容器宽度
const width = computed(() => {
  return Math.max(Number(props.percent), 100)
})

// 计算外层容器的样式
const style = computed(() => {
  const style: any = {}
  style.top = useUnit(props.top)
  style.left = useUnit(props.left)
  style.height = useUnit(props.height)
  style.zIndex = props.zIndex
  if (props.fixed) style.position = "fixed"
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 计算内层弧形的样式
const innerStyle = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.left = `-${(width.value - 100) / 2}%`
  style.right = `-${(width.value - 100) / 2}%`
  style.paddingLeft = `${(width.value - 100) / 2}%`
  style.paddingRight = `${(width.value - 100) / 2}%`
  style.background = useColor(props.background)
  return useStyle(style)
})

// 点击事件处理函数
function onClick() {
  emits("click")
}
</script>

<script lang="ts">
export default {
  name: "ui-arc",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-arc {
  width: 100%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  &__inner {
    top: 0;
    overflow: hidden;
    position: absolute;
    border-radius: 0 0 100% 100%;
    background-color: var(--ui-color-primary);
  }
}
</style>
