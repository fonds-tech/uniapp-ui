<template>
  <view class="ui-checkbox-group" :class="[rootClass, props.customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { toRaw, toRef, watch, computed } from "vue"
import { useUnit, useStyle, useChildren } from "../hooks"
import { checkboxGroupKey, checkboxGroupEmits, checkboxGroupProps } from "./index"

defineOptions({ name: "ui-checkbox-group" })

const props = defineProps(checkboxGroupProps)
const emits = defineEmits(checkboxGroupEmits)

// 收集子 checkbox
const { childrens, linkChildren } = useChildren(checkboxGroupKey)

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
const rootClass = computed(() => {
  const list: string[] = []
  if (props.vertical) list.push("ui-checkbox-group--vertical")
  return list
})

// 监听值变化向外抛 change
watch(
  () => props.modelValue,
  (value) => emits("change", value),
  { deep: true },
)

// 全选 / 全不选 / 反选
function toggleAll(checked?: boolean) {
  const eligibles = childrens.filter((children) => {
    if (!children.exposed?.props?.bindGroup) return false
    if (children.exposed?.props?.disabled) return false
    return true
  })

  let value: unknown[]
  if (checked === true) {
    value = eligibles.map((child) => toRef(child.exposed?.name).value)
    if (isDef(props.max) && props.max !== Infinity) value = value.slice(0, +props.max)
  } else if (checked === false) {
    if (props.min && +props.min > 0) {
      value = [...props.modelValue].slice(0, +props.min)
    } else {
      value = []
    }
  } else {
    // 无参：取所有未选中
    value = eligibles
      .filter((child) => !toRef(child.exposed?.checked).value)
      .map((child) => toRef(child.exposed?.name).value)
  }

  updateValue(value)
}

// 已选数量
function getCheckedCount(): number {
  return props.modelValue.length
}
// 是否达到最小选中
function isAtMinimum(): boolean {
  const min = props.min ?? 0
  return props.modelValue.length <= +min
}
// 是否达到最大选中
function isAtMaximum(): boolean {
  const max = props.max ?? Infinity
  return props.modelValue.length >= +max
}

// 更新值
function updateValue(value: unknown[]) {
  emits("update:modelValue", toRaw(value))
}

// 建立父子关联
linkChildren({ props, updateValue })

defineExpose({
  toggleAll,
  getCheckedCount,
  isAtMinimum,
  isAtMaximum,
})
</script>

<script lang="ts">
export default {
  name: "ui-checkbox-group",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style scoped lang="scss">
.ui-checkbox-group {
  display: flex;
  flex-wrap: wrap;

  &--vertical {
    flex-wrap: nowrap;
    flex-direction: column;
  }
}
</style>
