<template>
  <view class="ui-tab" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <slot :active="active" :disabled="disabled">
      <text class="ui-tab__title" :style="[titleStyle]">{{ title }}</text>
    </slot>
    <view v-if="prop('showLine') && active" class="ui-tab__line" :style="[lineStyle]" />
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
  style.flex = prop("scrollable") ? "" : "1"
  style.width = useUnit(prop("tabWidth"))
  style.maxWidth = useUnit(prop("tabMaxWidth"))
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-tab--active")
  if (useProps.disabled) list.push("ui-tab--disabled")
  return list
})

const titleStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(prop("inactiveColor"))
  style.fontSize = useUnit(prop("inactiveSize"))
  style.fontWeight = prop("inactiveWeight")
  if (active.value) {
    style.color = useColor(prop("activeColor"))
    style.fontSize = useUnit(prop("activeSize"))
    style.fontWeight = useUnit(prop("activeWeight"))
  }
  return useStyle(style)
})

const lineStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(prop("lineWidth"))
  style.height = useUnit(prop("lineHeight"))
  style.background = useColor(prop("lineColor"))
  style.borderRadius = useUnit(prop("lineRadius"))
  return useStyle(style)
})

const name = computed(() => useProps.name ?? index.value)
const active = computed(() => parent?.currentName.value === name.value)

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}

async function onClick() {
  emits("click", name.value)
  if (useProps.disabled) return
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

  &__title {
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  &__line {
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
