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

const props = defineProps(radioGroupProps)
const emits = defineEmits(radioGroupEmits)
const { linkChildren } = useChildren(radioGroupKey)

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
)

async function updateValue(value: RadioGroupValueType) {
  emits("update:modelValue", toRaw(value))
}

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
