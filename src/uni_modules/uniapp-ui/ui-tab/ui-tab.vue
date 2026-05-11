<template>
  <view class="ui-tab" :class="[classNames, customClass]" :style="[rootStyle]" @click="onClick">
    <slot :active="active" :disabled="props.disabled">
      <text class="ui-tab__title" :style="[titleStyle]">{{ titleText }}</text>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { TabsProps } from "../ui-tabs"
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { tabsKey } from "../ui-tabs"
import { tabEmits, tabProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"
import { computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-tab" })

const props = defineProps(tabProps)
const emits = defineEmits(tabEmits)
const { parent, index } = useParent(tabsKey)
const instance = getCurrentInstance()!

// 取父级 tabs prop（仅父级有的字段）
function fromParent<K extends keyof TabsProps>(key: K): TabsProps[K] | undefined {
  return parent?.props?.[key]
}

const name = computed(() => props.name ?? index.value)
const active = computed(() => parent?.currentName.value === name.value)

const titleText = computed(() => (isDef(props.title) ? String(props.title) : ""))

const classNames = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-tab--active")
  if (props.disabled) list.push("ui-tab--disabled")
  return list
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  const scrollable = fromParent("scrollable")
  const itemWidth = fromParent("itemWidth")
  const itemMaxWidth = fromParent("itemMaxWidth")
  if (!scrollable) style.flex = "1"
  if (isDef(itemWidth)) style.width = useUnit(itemWidth as string | number)
  if (isDef(itemMaxWidth)) style.maxWidth = useUnit(itemMaxWidth as string | number)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// active / inactive 文字样式根据 active 状态切换
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  const activeSize = fromParent("activeSize")
  const activeColor = fromParent("activeColor")
  const activeWeight = fromParent("activeWeight")
  const inactiveSize = fromParent("inactiveSize")
  const inactiveColor = fromParent("inactiveColor")
  const inactiveWeight = fromParent("inactiveWeight")
  if (active.value) {
    if (isDef(activeColor)) style.color = useColor(activeColor as string)
    if (isDef(activeSize)) style.fontSize = useUnit(activeSize as string | number)
    if (isDef(activeWeight)) style.fontWeight = activeWeight as number | string
  } else {
    if (isDef(inactiveColor)) style.color = useColor(inactiveColor as string)
    if (isDef(inactiveSize)) style.fontSize = useUnit(inactiveSize as string | number)
    if (isDef(inactiveWeight)) style.fontWeight = inactiveWeight as number | string
  }
  return useStyle(style)
})

async function onClick() {
  emits("click", name.value)
  if (props.disabled || !parent) return
  await reportRect()
  parent.clickTab(name.value)
  parent.setCurrentName(name.value)
}

async function reportRect() {
  if (!parent) return
  await nextTick()
  const [tabRect, titleRect] = await Promise.all([useRect(".ui-tab", instance), useRect(".ui-tab__title", instance)])
  if (!tabRect) return
  parent.updateTabRect(index.value, {
    width: tabRect.width || 0,
    height: tabRect.height || 0,
    titleWidth: titleRect?.width || 0,
  })
}

onMounted(async () => {
  await nextTick()
  reportRect()
})

defineExpose({ name, index, reportRect })
</script>

<script lang="ts">
export default {
  name: "ui-tab",
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
.ui-tab {
  color: var(--ui-tabs-color-inactive, var(--ui-color-text-secondary));
  height: 100%;
  display: flex;
  padding: 0 var(--ui-spacing-xs);
  position: relative;
  font-size: var(--ui-font-size-md);
  align-items: center;
  justify-content: center;

  &--active {
    color: var(--ui-tabs-color-active, var(--ui-color-text));
    font-weight: var(--ui-font-weight-bold);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &__title {
    color: inherit;
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
</style>
