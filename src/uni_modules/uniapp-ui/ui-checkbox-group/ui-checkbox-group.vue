<template>
  <view class="ui-checkbox-group" :class="[rootClass, customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isEmpty } from "../utils/check"
import { toRaw, toRef, watch, computed } from "vue"
import { useUnit, useStyle, useChildren } from "../hooks"
import { checkboxGroupKey, checkboxGroupEmits, checkboxGroupProps } from "./index"

defineOptions({ name: "ui-checkbox-group" })

const props = defineProps(checkboxGroupProps)
const emits = defineEmits(checkboxGroupEmits)
const { childrens, linkChildren } = useChildren(checkboxGroupKey)

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.gap) style.gap = useUnit(props.gap)
  if (props.columns) {
    style.display = "grid"
    style.gridTemplateColumns = `repeat(${props.columns}, 1fr)`
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const rootClass = computed(() => {
  const list: string[] = []
  return list
})

watch(
  () => props.modelValue,
  (value) => emits("change", value),
  { deep: true },
)

function toggleAll(checked?: boolean) {
  const checkeds = childrens.filter((children) => {
    if (isEmpty(children.exposed?.props?.bindGroup)) return false
    return checked ?? !toRef(children.exposed?.checked).value
  })

  let value = checkeds.map((children) => toRef(children.exposed?.name).value)

  if (checked === true && props.max && props.max !== Infinity) {
    value = value.slice(0, +props.max)
  }

  if (checked === false && props.min && +props.min > 0) {
    const currentValue = [...props.modelValue]
    value = currentValue.slice(0, +props.min)
  }

  updateValue(value)
}

function getCheckedCount(): number {
  return props.modelValue.length
}

function isAtMinimum(): boolean {
  const min = props.min ?? 0
  return props.modelValue.length <= +min
}

function isAtMaximum(): boolean {
  const max = props.max ?? Infinity
  return props.modelValue.length >= +max
}

async function updateValue(value: unknown[]) {
  emits("update:modelValue", toRaw(value))
}

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
}
</style>
