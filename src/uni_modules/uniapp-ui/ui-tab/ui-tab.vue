<template>
  <view class="ui-tab" :class="[classes, props.customClass]" :style="[style]" @click="onClick">
    <slot :active="active" :disabled="props.disabled">
      <text class="ui-tab__title" :style="[titleStyle]">{{ titleText }}</text>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { tabsKey } from "../ui-tabs"
import { tabEmits, tabProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"
import { computed, nextTick, onMounted, getCurrentInstance } from "vue"

// 定义组件名称
defineOptions({ name: "ui-tab" })

// 定义 props 和 emits
const props = defineProps(tabProps)
const emits = defineEmits(tabEmits)

// 获取父组件
const { parent, index } = useParent(tabsKey)

// 组件实例
const instance = getCurrentInstance()!

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.flex = resolveProp("scrollable") ? "" : "1"
  style.width = useUnit(resolveProp("itemWidth"))
  style.maxWidth = useUnit(resolveProp("itemMaxWidth"))
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 动态类名
const classes = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-tab--active")
  if (props.disabled) list.push("ui-tab--disabled")
  return list
})

// 标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(resolveProp("inactiveColor"))
  style.fontSize = useUnit(resolveProp("inactiveSize"))
  style.fontWeight = resolveProp("inactiveWeight")
  if (active.value) {
    style.color = useColor(resolveProp("activeColor"))
    style.fontSize = useUnit(resolveProp("activeSize"))
    style.fontWeight = resolveProp("activeWeight")
  }
  return useStyle(style)
})

// 标题文本
const titleText = computed(() => {
  return isDef(props.title) ? String(props.title) : ""
})

// 标签名称
const name = computed(() => props.name ?? index.value)
// 是否激活
const active = computed(() => parent?.currentName.value === name.value)

// 获取属性值（优先使用自身，未定义则使用父组件）
function resolveProp(name: string) {
  if (isDef((props as Record<string, any>)[name])) return (props as Record<string, any>)[name]
  if (parent?.props && isDef((parent.props as Record<string, any>)[name])) return (parent.props as Record<string, any>)[name]
  return ""
}

// 点击事件
async function onClick() {
  emits("click", name.value)
  if (props.disabled || !parent) return
  // 点击时更新尺寸信息，确保位置准确
  await reportRect()
  parent.clickTab(name.value)
  parent.setCurrentName(name.value)
}

// 获取并上报尺寸信息给父组件
async function reportRect() {
  if (!parent) return
  await nextTick()
  const [tabRect, titleRect] = await Promise.all([useRect(".ui-tab", instance), useRect(".ui-tab__title", instance)])
  if (tabRect) {
    parent.updateTabRect(index.value, {
      width: tabRect.width || 0,
      height: tabRect.height || 0,
      titleWidth: titleRect?.width || 0,
    })
  }
}

// 组件挂载时初始化
onMounted(async () => {
  await nextTick()
  reportRect()
})

defineExpose({ props, name, index })
</script>

<script lang="ts">
export default {
  name: "ui-tab",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-tab {
  height: 100%;
  display: flex;
  padding: 0 12rpx;
  position: relative;
  align-items: center;
  justify-content: center;

  &--active {
    color: var(--ui-color-text);
    font-weight: bold;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  &__title {
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
</style>
