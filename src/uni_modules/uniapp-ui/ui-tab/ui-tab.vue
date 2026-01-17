<template>
  <view class="ui-tab" :class="[classes, useProps.customClass]" :style="[style]" @click="onClick">
    <slot :active="active" :disabled="useProps.disabled">
      <text class="ui-tab__title" :style="[titleStyle]">{{ titleText }}</text>
    </slot>
    <view v-if="resolveProp('showIndicator') && active" class="ui-tab__indicator" :style="[indicatorStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { tabsKey } from "../ui-tabs"
import { computed } from "vue"
import { tabEmits, tabProps, useTabProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-tab" })

const props = defineProps(tabProps)
const emits = defineEmits(tabEmits)
const useProps = useTabProps(props)
const { parent, index } = useParent(tabsKey)

const style = computed(() => {
  const style: CSSProperties = {}
  style.flex = resolveProp("scrollable") ? "" : "1"
  style.width = useUnit(resolveProp("itemWidth"))
  style.maxWidth = useUnit(resolveProp("itemMaxWidth"))
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classes = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-tab--active")
  if (useProps.disabled) list.push("ui-tab--disabled")
  return list
})

const titleStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(resolveProp("inactiveColor"))
  style.fontSize = useUnit(resolveProp("inactiveFontSize"))
  style.fontWeight = resolveProp("inactiveFontWeight")
  if (active.value) {
    style.color = useColor(resolveProp("activeColor"))
    style.fontSize = useUnit(resolveProp("activeFontSize"))
    style.fontWeight = resolveProp("activeFontWeight")
  }
  return useStyle(style)
})

const titleText = computed(() => {
  return isDef(useProps.title) ? String(useProps.title) : ""
})

const indicatorStyle = computed(() => {
  const style: CSSProperties = {}
  const duration = resolveProp("duration")
  style.width = useUnit(resolveProp("indicatorWidth"))
  style.height = useUnit(resolveProp("indicatorHeight"))
  style.background = useColor(resolveProp("indicatorColor"))
  style.borderRadius = useUnit(resolveProp("indicatorRadius"))
  style.transition = `all ${duration}ms`
  return useStyle(style)
})

const name = computed(() => useProps.name ?? index.value)
const active = computed(() => parent?.currentName.value === name.value)

function resolveProp(name: string) {
  if (isDef((useProps as Record<string, any>)[name])) return (useProps as Record<string, any>)[name]
  if (parent?.useProps && isDef((parent.useProps as Record<string, any>)[name])) return (parent.useProps as Record<string, any>)[name]
  if (parent?.props && isDef((parent.props as Record<string, any>)[name])) return (parent.props as Record<string, any>)[name]
  if (isDef((props as Record<string, any>)[name])) return (props as Record<string, any>)[name]
  return ""
}

async function onClick() {
  emits("click", name.value)
  if (useProps.disabled || !parent) return
  parent.clickTab(name.value)
  parent.setCurrentName(name.value)
}

defineExpose({ useProps, name, index })
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

  &__indicator {
    left: 50%;
    bottom: 0;
    height: 6rpx;
    position: absolute;
    transform: translateX(-50%);
    border-radius: 9999rpx;
    background-color: var(--ui-color-primary);
  }
}
</style>
