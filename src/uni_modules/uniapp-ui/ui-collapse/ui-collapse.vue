<template>
  <view class="ui-collapse" :class="[classs, customClass]" :style="[style]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { toRaw, computed } from "vue"
import { useStyle, useChildren } from "../hooks"
import { collapseKey, collapseEmits, collapseProps, useCollapseProps } from "./index"

defineOptions({ name: "ui-collapse" })

const props = defineProps(collapseProps)
const emits = defineEmits(collapseEmits)
const useProps = useCollapseProps(props)
const { childrens, linkChildren } = useChildren(collapseKey)

/**
 * 计算组件样式
 */
const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

/**
 * 计算组件类名
 */
const classs = computed(() => {
  const list: string[] = []
  if (useProps.border) list.push("ui-collapse--border")
  return list
})

/**
 * 判断面板是否展开
 * @param name 面板名称
 */
function isExpanded(name: string | number): boolean {
  const value = useProps.modelValue
  if (useProps.accordion) {
    // 手风琴模式：直接比较值
    return value === name
  } else {
    // 多选模式：检查数组中是否包含
    return Array.isArray(value) && value.includes(name)
  }
}

/**
 * 切换面板展开状态
 * @param name 面板名称
 * @param expanded 是否展开
 */
function toggle(name: string | number, expanded: boolean) {
  if (useProps.accordion) {
    // 手风琴模式：设置当前值或清空
    const newValue = expanded ? name : ""
    updateValue(newValue)
  } else {
    // 多选模式：添加或移除
    const currentValue = Array.isArray(useProps.modelValue) ? [...useProps.modelValue] : []
    const index = currentValue.indexOf(name)

    if (expanded && index === -1) {
      currentValue.push(name)
    } else if (!expanded && index > -1) {
      currentValue.splice(index, 1)
    }
    updateValue(currentValue)
  }
}

/**
 * 切换所有面板的展开状态
 * @param expanded 是否全部展开，不传则切换状态
 */
function toggleAll(expanded?: boolean) {
  if (useProps.accordion) {
    // 手风琴模式不支持全部展开
    console.warn("[ui-collapse] 手风琴模式不支持 toggleAll")
    return
  }

  // 获取所有非禁用子面板的 name
  const names = childrens
    .filter((child) => {
      const childProps = child.exposed?.useProps
      return childProps && !childProps.disabled
    })
    .map((child) => child.exposed?.name)
    .filter((name) => name !== undefined)

  if (expanded === undefined) {
    // 切换状态：如果全部展开则全部收起，否则全部展开
    const currentValue = Array.isArray(useProps.modelValue) ? useProps.modelValue : []
    const allExpanded = names.every((name) => currentValue.includes(name))
    updateValue(allExpanded ? [] : names)
  } else {
    updateValue(expanded ? names : [])
  }
}

/**
 * 更新值并触发事件
 * @param value 新的值
 */
function updateValue(value: (string | number)[] | string | number) {
  emits("update:modelValue", toRaw(value))
  emits("change", toRaw(value))
}

// 提供数据给子组件
linkChildren({ props, useProps, toggle, isExpanded })

// 暴露方法
defineExpose({ name: "ui-collapse", toggleAll })
</script>

<script lang="ts">
export default {
  name: "ui-collapse",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style scoped lang="scss">
.ui-collapse {
  --ui-collapse-border-color: var(--ui-color-border-light);
  --ui-collapse-border-width: var(--ui-border-width);
  background: var(--ui-color-background);

  &--border {
    border-top: var(--ui-collapse-border-width) solid var(--ui-collapse-border-color);
    border-bottom: var(--ui-collapse-border-width) solid var(--ui-collapse-border-color);
  }
}
</style>
