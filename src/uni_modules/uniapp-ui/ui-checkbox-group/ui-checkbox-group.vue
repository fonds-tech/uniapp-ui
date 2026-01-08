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
import { checkboxGroupKey, checkboxGroupEmits, checkboxGroupProps, useCheckboxGroupProps } from "./index"

defineOptions({ name: "ui-checkbox-group" })

const props = defineProps(checkboxGroupProps)
const emits = defineEmits(checkboxGroupEmits)
const useProps = useCheckboxGroupProps(props)
const { childrens, linkChildren } = useChildren(checkboxGroupKey)

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (useProps.gap) style.gap = useUnit(useProps.gap)
  if (useProps.columns) {
    style.display = "grid"
    style.gridTemplateColumns = `repeat(${useProps.columns}, 1fr)`
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const rootClass = computed(() => {
  const list: string[] = []
  return list
})

watch(
  () => useProps.modelValue,
  (value) => emits("change", value),
  { deep: true },
)

function toggleAll(checked?: boolean) {
  const checkeds = childrens.filter((children) => {
    if (isEmpty(children.exposed?.useProps?.bindGroup)) return false
    return checked ?? !toRef(children.exposed?.checked).value
  })

  let value = checkeds.map((children) => toRef(children.exposed?.name).value)

  if (checked === true && useProps.max && useProps.max !== Infinity) {
    value = value.slice(0, +useProps.max)
  }

  if (checked === false && useProps.min && +useProps.min > 0) {
    const currentValue = [...useProps.modelValue]
    value = currentValue.slice(0, +useProps.min)
  }

  updateValue(value)
}

function getCheckedCount(): number {
  return useProps.modelValue.length
}

function isAtMinimum(): boolean {
  const min = useProps.min ?? 0
  return useProps.modelValue.length <= +min
}

function isAtMaximum(): boolean {
  const max = useProps.max ?? Infinity
  return useProps.modelValue.length >= +max
}

async function updateValue(value: unknown[]) {
  emits("update:modelValue", toRaw(value))
}

linkChildren({ props, useProps, updateValue })

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
