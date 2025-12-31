<template>
  <view class="ui-radio-group" :class="[classs, customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { RadioGroupValueType } from "./index"
import { useStyle, useChildren } from "../hooks"
import { radioGroupKey, radioGroupEmits, radioGroupProps } from "./index"

defineOptions({ name: "ui-radio-group" })

const props = defineProps(radioGroupProps)
const emits = defineEmits(radioGroupEmits)

const { linkChildren } = useChildren(radioGroupKey)

const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.vertical) list.push("ui-radio-group--vertical")
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

  &--vertical {
    flex-direction: column;
  }
}
</style>
