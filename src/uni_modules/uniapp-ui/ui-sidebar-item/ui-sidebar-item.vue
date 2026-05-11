<template>
  <view class="ui-sidebar-item" :class="[classNames, customClass]" :style="[rootStyle]" @click="onClick">
    <slot :active="active" :disabled="disabled">
      <view class="ui-sidebar-item__title">
        {{ title }}
        <view v-if="props.dot" class="ui-sidebar-item__dot" />
        <view v-else-if="isDef(props.badge)" class="ui-sidebar-item__badge">{{ props.badge }}</view>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { isDef } from "../utils/check"
import { sidebarKey } from "../ui-sidebar"
import { sidebarItemEmits, sidebarItemProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-sidebar-item" })

const props = defineProps(sidebarItemProps)
defineEmits(sidebarItemEmits)

const { index, parent } = useParent(sidebarKey)

const instance = getCurrentInstance()
// 元素位置信息
const rect = ref<UniApp.NodeInfo>({})

// 项目名称（优先 props.name，缺省时回退到 index，建议显式提供 name 避免中删时错位）
const name = computed(() => props.name ?? index.value)
const active = computed(() => parent?.currentName.value === name.value)

const classNames = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-sidebar-item--active")
  if (props.disabled) list.push("ui-sidebar-item--disabled")
  return list
})

// 根节点 CSS var 注入（高度 / 背景 / 标题色字号粗细对齐）
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  const height = getProp("height")
  const bg = getProp("background")
  const bgActive = getProp("activeBackground")
  const titleColor = getProp("titleColor")
  const titleSize = getProp("titleSize")
  const titleWeight = getProp("titleWeight")
  const titleAlign = getProp("titleAlign")
  const activeTitleColor = getProp("activeTitleColor") ?? titleColor
  const activeTitleSize = getProp("activeTitleSize") ?? titleSize
  const activeTitleWeight = getProp("activeTitleWeight") ?? titleWeight
  if (isDef(height)) vars["--ui-sidebar-item-height"] = useUnit(height as string | number)
  if (isDef(bg)) vars["--ui-sidebar-item-bg"] = useColor(bg as string)
  if (isDef(bgActive)) vars["--ui-sidebar-item-bg-active"] = useColor(bgActive as string)
  if (isDef(titleColor)) vars["--ui-sidebar-item-title-color"] = useColor(titleColor as string)
  if (isDef(titleSize)) vars["--ui-sidebar-item-title-size"] = useUnit(titleSize as string | number)
  if (isDef(titleWeight)) vars["--ui-sidebar-item-title-weight"] = titleWeight as string | number
  if (isDef(titleAlign)) vars["--ui-sidebar-item-title-align"] = titleAlign as string
  if (isDef(activeTitleColor)) vars["--ui-sidebar-item-title-color-active"] = useColor(activeTitleColor as string)
  if (isDef(activeTitleSize)) vars["--ui-sidebar-item-title-size-active"] = useUnit(activeTitleSize as string | number)
  if (isDef(activeTitleWeight)) vars["--ui-sidebar-item-title-weight-active"] = activeTitleWeight as string | number
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})

// 仅 layout 类 prop 改动触发 resize；样式类 prop 不需要重测
watch(() => [props.height, props.title, props.dot, props.badge, props.name, props.disabled], resize)

// 取属性值：优先自身 props，未定义则回退到父 sidebar 同名 prop
function getProp<K extends keyof typeof props>(key: K): (typeof props)[K] | undefined {
  if (isDef(props[key])) return props[key]
  const parentVal = (parent?.props as Record<string, unknown> | undefined)?.[key as string]
  return isDef(parentVal) ? (parentVal as (typeof props)[K]) : undefined
}

async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-sidebar-item", instance)
  if (active.value && parent) {
    parent.setLine(name.value)
    if (parent.props.autoScroll) parent.scrollIntoView(name.value)
  }
}

function onClick() {
  if (props.disabled || !parent) return
  parent.clickItem(name.value, index.value)
  parent.setCurrentName(name.value)
}

onMounted(resize)

defineExpose({ props, rect, name, index, resize })
</script>

<script lang="ts">
export default {
  name: "ui-sidebar-item",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-sidebar-item {
  --ui-sidebar-item-bg: transparent;
  --ui-sidebar-item-height: 100rpx;
  --ui-sidebar-item-bg-active: var(--ui-color-background);
  --ui-sidebar-item-title-size: var(--ui-font-size-md);
  --ui-sidebar-item-title-align: center;
  --ui-sidebar-item-title-color: var(--ui-color-text);
  --ui-sidebar-item-title-weight: var(--ui-font-weight-normal);
  --ui-sidebar-item-title-size-active: var(--ui-sidebar-item-title-size);
  --ui-sidebar-item-title-color-active: var(--ui-color-primary);
  --ui-sidebar-item-title-weight-active: var(--ui-sidebar-item-title-weight);

  height: var(--ui-sidebar-item-height);
  display: flex;
  background: var(--ui-sidebar-item-bg);
  align-items: center;
  justify-content: center;

  &--active {
    background: var(--ui-sidebar-item-bg-active);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);
  }

  &__title {
    flex: 1;
    color: var(--ui-sidebar-item-title-color);
    padding: 0 var(--ui-spacing-lg);
    overflow: hidden;
    position: relative;
    font-size: var(--ui-sidebar-item-title-size);
    text-align: var(--ui-sidebar-item-title-align);
    font-weight: var(--ui-sidebar-item-title-weight);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &--active &__title {
    color: var(--ui-sidebar-item-title-color-active);
    font-size: var(--ui-sidebar-item-title-size-active);
    font-weight: var(--ui-sidebar-item-title-weight-active);
  }

  &__dot {
    top: 50%;
    right: var(--ui-spacing-md);
    width: var(--ui-spacing-sm);
    height: var(--ui-spacing-sm);
    position: absolute;
    transform: translateY(-50%);
    background: var(--ui-color-danger);
    border-radius: var(--ui-radius-round);
  }

  &__badge {
    top: 50%;
    color: var(--ui-color-text-inverse);
    right: var(--ui-spacing-md);
    height: var(--ui-spacing-lg);
    display: flex;
    padding: 0 var(--ui-spacing-xs);
    position: absolute;
    font-size: var(--ui-font-size-xs);
    min-width: var(--ui-spacing-lg);
    transform: translateY(-50%);
    background: var(--ui-color-danger);
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
  }
}
</style>
