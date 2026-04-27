<template>
  <view class="ui-collapse" :class="[classNames, props.customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { CollapseModelValue } from "./index"
import { ref, watch, computed } from "vue"
import { useStyle, useChildren } from "../hooks"
import { collapseKey, collapseEmits, collapseProps } from "./index"

defineOptions({ name: "ui-collapse" })

const props = defineProps(collapseProps)
const emits = defineEmits(collapseEmits)

// 收集子组件
const { childrens, linkChildren } = useChildren(collapseKey)

// 当前展开的 name 数组
const activeNames = ref<(string | number)[]>([])

// 根节点样式
const rootStyle = computed<CSSProperties>(() => useStyle({ ...(useStyle(props.customStyle) || {}) }) as CSSProperties)
// 根节点类名
const classNames = computed(() => ({ "ui-collapse--border": props.border }))

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (value) => initActiveNames(value),
  { immediate: true },
)

// 初始化 activeNames（统一为数组形态）
function initActiveNames(value: CollapseModelValue | undefined) {
  if (value === undefined || value === null) {
    activeNames.value = []
  } else if (Array.isArray(value)) {
    activeNames.value = [...value]
  } else {
    activeNames.value = [value]
  }
}

// 切换某项展开状态
function toggle(name: string | number, expanded: boolean) {
  if (props.accordion) {
    activeNames.value = expanded ? [name] : []
  } else {
    const idx = activeNames.value.indexOf(name)
    if (expanded && idx === -1) {
      activeNames.value = [...activeNames.value, name]
    } else if (!expanded && idx !== -1) {
      activeNames.value = activeNames.value.filter((v) => v !== name)
    }
  }
  const value = props.accordion ? (activeNames.value[0] ?? "") : [...activeNames.value]
  emits("update:modelValue", value)
  emits("change", value)
}

// 建立父子组件关联
linkChildren({ props, activeNames, toggle })

defineExpose({ activeNames, toggle })
</script>

<script lang="ts">
export default {
  name: "ui-collapse",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-collapse {
  position: relative;
  background-color: var(--ui-color-background);
}
</style>
