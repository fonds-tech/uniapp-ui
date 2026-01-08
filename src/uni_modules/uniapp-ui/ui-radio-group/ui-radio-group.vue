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
import { radioGroupKey, radioGroupEmits, radioGroupProps, useRadioGroupProps } from "./index"

defineOptions({ name: "ui-radio-group" })

const props = defineProps(radioGroupProps)
const emits = defineEmits(radioGroupEmits)
const useProps = useRadioGroupProps(props)
const { linkChildren } = useChildren(radioGroupKey)

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
)

async function updateValue(value: RadioGroupValueType) {
  emits("update:modelValue", toRaw(value))
}

linkChildren({ props, useProps, updateValue })
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
