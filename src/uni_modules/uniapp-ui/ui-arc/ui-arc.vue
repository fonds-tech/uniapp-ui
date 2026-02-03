<template>
  <view class="ui-arc" :class="[customClass, directionClass]" :style="[style]" @click="onClick">
    <view class="ui-arc__inner" :style="[innerStyle]" />
    <view v-if="$slots.default" class="ui-arc__content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { arcEmits, arcProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-arc" })

// 定义 props 和 emits
const props = defineProps(arcProps)
const emits = defineEmits(arcEmits)

// 曲率校验，限制在 50-500 范围内
const validCurvature = computed(() => {
  const value = Number(props.curvature)
  if (Number.isNaN(value)) return 120
  return Math.max(50, Math.min(500, value))
})

// 宽度偏移量
const widthOffset = computed(() => (validCurvature.value - 100) / 2)
// 方向类名
const directionClass = computed(() => `ui-arc--${props.direction}`)

// 容器样式
const style = computed(() => {
  const result: CSSProperties = {
    top: useUnit(props.top),
    left: useUnit(props.left),
    height: useUnit(props.height),
    zIndex: props.zIndex,
  }
  if (props.fixed) result.position = "fixed"
  return useStyle({ ...result, ...useStyle(props.customStyle) })
})

// 内部弧形样式
const innerStyle = computed(() => {
  const offset = `${Math.max(0, widthOffset.value)}%`
  const result: CSSProperties = {
    height: useUnit(props.height),
    left: `-${offset}`,
    right: `-${offset}`,
    paddingLeft: offset,
    paddingRight: offset,
    background: useColor(props.background),
  }
  return useStyle(result)
})

// 点击事件处理
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
    overflow: hidden;
    position: absolute;
    background-color: var(--ui-color-primary);
  }

  &__content {
    z-index: 1;
    position: relative;
  }

  // 底部弧形（默认）
  &--bottom &__inner {
    top: 0;
    border-radius: 0 0 100% 100%;
  }

  // 顶部弧形
  &--top &__inner {
    bottom: 0;
    border-radius: 100% 100% 0 0;
  }
}
</style>
