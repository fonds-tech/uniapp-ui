<template>
  <view class="ui-checkbox-group" :class="[classs, customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isEmpty } from "../utils/check"
import { useStyle, useChildren } from "../hooks"
import { checkboxGroupKey, checkboxGroupEmits, checkboxGroupProps, useCheckboxGroupProps } from "./index"

defineOptions({ name: "ui-checkbox-group" })

const props = defineProps(checkboxGroupProps)
const emits = defineEmits(checkboxGroupEmits)
const useProps = useCheckboxGroupProps(props)
const { childrens, linkChildren } = useChildren(checkboxGroupKey)

const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (useProps.vertical) list.push("ui-checkbox-group--vertical")
  return list
})

watch(
  () => useProps.modelValue,
  (value) => emits("change", value),
)

function toggleAll(checked: boolean) {
  const checkeds = childrens.filter((children) => {
    if (isEmpty(children.exposed.useProps.bindGroup)) return false
    return checked ?? !toRef(children.exposed.checked).value
  })
  const value = checkeds.map((children) => toRef(children.exposed.name).value)
  updateValue(value)
}

async function updateValue(value: unknown[]) {
  emits("update:modelValue", toRaw(value))
}

linkChildren({ props, useProps, updateValue })
defineExpose({ toggleAll })
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

  &--vertical {
    flex-direction: column;
  }
}
</style>
