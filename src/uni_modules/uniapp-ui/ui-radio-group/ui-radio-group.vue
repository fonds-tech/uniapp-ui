<template>
  <view class="ui-radio-group" :class="[rootClass, customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { RadioGroupValueType } from "./index"
import { toRaw, watch, computed } from "vue"
import { useUnit, useStyle, useChildren } from "../hooks"
import { radioGroupKey, radioGroupEmits, radioGroupProps } from "./index"

defineOptions({ name: "ui-radio-group" })

// 组件 props 和 emits
const props = defineProps(radioGroupProps)
const emits = defineEmits(radioGroupEmits)

// 收集子组件（ui-radio），建立父子通信关系
const { linkChildren } = useChildren(radioGroupKey)

// 根节点样式，设置间距和列布局
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  // 设置子元素间距
  if (props.gap) style.gap = useUnit(props.gap)
  // 设置列布局
  if (props.columns) {
    style.display = "grid"
    style.gridTemplateColumns = `repeat(${props.columns}, 1fr)`
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 根节点类名
const rootClass = computed(() => {
  const list: string[] = []
  return list
})

// 监听 modelValue 变化，触发 change 事件
watch(
  () => props.modelValue,
  (value) => emits("change", value),
)

// 更新选中值
async function updateValue(value: RadioGroupValueType) {
  emits("update:modelValue", toRaw(value))
}

// 建立父子组件关联
linkChildren({ props, updateValue })
</script>

<script lang="ts">
export default {
  name: "ui-radio-group",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style scoped lang="scss">
.ui-radio-group {
  display: flex;
  flex-wrap: wrap;
}
</style>
