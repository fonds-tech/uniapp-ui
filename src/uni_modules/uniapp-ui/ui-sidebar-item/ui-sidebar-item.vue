<template>
  <view class="ui-sidebar-item" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <slot :active="active" :disabled="disabled">
      <view class="ui-sidebar-item__title" :style="[titleStyle]">
        {{ title }}
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { sidebarKey } from "../ui-sidebar"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"
import { sidebarItemEmits, sidebarItemProps, useSidebarItemProps } from "./index"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-sidebar-item" })

const props = defineProps(sidebarItemProps)
const emits = defineEmits(sidebarItemEmits)
const useProps = useSidebarItemProps(props)
const { index, parent } = useParent(sidebarKey)

const rect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()

const style = computed(() => {
  const style: CSSProperties = {}
  style.height = useUnit(useProps.height)
  style.background = useColor(useProps.background)
  if (active.value) {
    style.background = useColor(useProps.activeBackground)
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-sidebar-item--active")
  return list
})

const titleStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(prop("titleColor"))
  style.fontSize = useUnit(prop("titleSize"))
  style.textAlign = prop("titleAlign")
  style.fontWeight = prop("titleWeight")
  if (active.value) {
    style.color = useColor(prop("activeTitleColor"))
    style.fontSize = useColor(prop("activeTitleSize") || prop("titleSize"))
    style.fontWeight = useColor(prop("activeTitleWeight"))
  }
  return useStyle(style)
})

const name = computed(() => useProps.name ?? index.value)
const active = computed(() => parent?.currentName.value === name.value)

watch(() => props, resize, { deep: true })

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}

async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-sidebar-item", instance)
  if (active.value) {
    parent.setLine(name.value)
    parent.scrollIntoView(name.value)
  }
}

function onClick() {
  if (useProps.disabled) return
  parent.clickItem(name.value, index.value)
  parent.setCurrentName(name.value)
}

onMounted(resize)
defineExpose({ useProps, rect, name, index, resize })
</script>

<script lang="ts">
export default {
  name: "ui-sidebar-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-sidebar-item {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &--active {
    color: var(--ui-color-primary);
    background-color: var(--ui-color-background);
  }

  &__title {
    flex: 1;
    padding: 0 var(--ui-spacing-xl);
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
