<template>
  <view class="ui-radio-group" :class="[classNames, props.customClass]" :style="[rootStyle]">
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

const props = defineProps(radioGroupProps)
const emits = defineEmits(radioGroupEmits)

const { linkChildren } = useChildren(radioGroupKey)

// 根节点样式：gap / 网格 经由内联样式（独立于子级 CSS var）
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.gap !== undefined) style.gap = useUnit(props.gap)
  if (props.columns !== undefined) {
    style.display = "grid"
    style.gridTemplateColumns = `repeat(${props.columns}, 1fr)`
  }
  return useStyle({ ...style, ...(useStyle(props.customStyle) || {}) })
})
// 根节点类名
const classNames = computed(() => {
  const list: string[] = []
  if (props.vertical) list.push("ui-radio-group--vertical")
  return list
})

// 监听值变化向外抛 change
watch(
  () => props.modelValue,
  (value) => emits("change", value as RadioGroupValueType),
)

// 更新值
function updateValue(value: RadioGroupValueType) {
  emits("update:modelValue", toRaw(value))
}

// 建立父子关联
linkChildren({ props, updateValue })
</script>

<script lang="ts">
export default {
  name: "ui-radio-group",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style scoped lang="scss">
.ui-radio-group {
  display: flex;
  flex-wrap: wrap;

  &--vertical {
    flex-wrap: nowrap;
    flex-direction: column;
  }
}
</style>
