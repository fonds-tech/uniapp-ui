<template>
  <view class="ui-collapse" :class="[rootClass, customClass]" :style="[rootStyle]">
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
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 根节点类名
const rootClass = computed(() => {
  const list: string[] = []
  if (props.border) list.push("ui-collapse--border")
  return list
})

// 初始化 activeNames
function initActiveNames(value: CollapseModelValue | undefined) {
  if (value === undefined || value === null) {
    activeNames.value = []
  } else if (Array.isArray(value)) {
    activeNames.value = [...value]
  } else {
    activeNames.value = [value]
  }
}

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (value) => initActiveNames(value),
  { immediate: true },
)

// 切换展开状态
function toggle(name: string | number, expanded: boolean) {
  if (props.accordion) {
    // 手风琴模式：只允许展开一个
    if (expanded) {
      activeNames.value = [name]
    } else {
      activeNames.value = []
    }
  } else {
    // 普通模式：可以展开多个
    const index = activeNames.value.indexOf(name)
    if (expanded && index === -1) {
      activeNames.value.push(name)
    } else if (!expanded && index !== -1) {
      activeNames.value.splice(index, 1)
    }
  }

  // 发射事件
  const value = props.accordion ? (activeNames.value[0] ?? "") : [...activeNames.value]
  emits("update:modelValue", value)
  emits("change", value)
}

// 建立父子组件关联
linkChildren({ props, activeNames, toggle })

defineExpose({
  activeNames,
  toggle,
})
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

  &--border {
    &::after {
      top: 0;
      left: 0;
      right: 0;
      content: "";
      position: absolute;
      border-top: var(--ui-border-width) solid var(--ui-color-border-light);
      pointer-events: none;
    }
  }
}
</style>
