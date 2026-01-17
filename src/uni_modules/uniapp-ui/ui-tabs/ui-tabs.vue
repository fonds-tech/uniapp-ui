<template>
  <view class="ui-tabs" :class="[classs, customClass]" :style="[style]">
    <scroll-view class="ui-tabs__scroll" :scroll-x="scrollable" enable-flex :scroll-with-animation="inited" :scroll-left="scrollLeft">
      <view class="ui-tabs__list" :style="[listStyle]">
        <slot />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { tabsKey, tabsEmits, tabsProps, useTabsProps } from "./index"
import { ref, toRef, watch, computed, nextTick, getCurrentInstance } from "vue"
import { useRect, useUnit, useColor, useRects, useStyle, useChildren } from "../hooks"

defineOptions({ name: "ui-tabs" })

const props = defineProps(tabsProps)
const emits = defineEmits(tabsEmits)
const useProps = useTabsProps(props)
const { childrens, linkChildren } = useChildren(tabsKey)
const instance = getCurrentInstance()!

const inited = ref(false)
const scrollLeft = ref(0)
const currentName = ref<string | number | null>(null)

const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = useProps.zIndex
  style.height = useUnit(useProps.height)
  style.background = useColor(useProps.background)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (useProps.borderBottom) list.push("ui-tabs--border")
  return list
})

const listStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = useUnit(useProps.height)
  return useStyle(style)
})

watch(() => useProps.modelValue, setCurrentName)
watch(
  () => childrens.length,
  () => setCurrentName(useProps.modelValue),
)

function findTabByName(name: string | number) {
  return childrens.find((tab) => toRef(tab.exposed.name).value === name) || childrens.find((tab) => !tab.exposed.useProps.disabled)
}

async function scrollToTab(index: number) {
  if (!useProps.scrollable) return
  await nextTick()
  const [tabsRect, tabRects] = await Promise.all([useRect(".ui-tabs__scroll", instance), useRects(".ui-tab", instance)])
  if (!tabsRect || !tabRects.length || !tabRects[index]) return
  const tabRect = tabRects[index]
  const offset = tabRects.slice(0, index).reduce((acc, rect) => acc + (rect.width || 0), 0)
  const tabCenter = offset + (tabRect.width || 0) / 2
  const scrollCenter = (tabsRect.width || 0) / 2
  scrollLeft.value = Math.max(0, tabCenter - scrollCenter)
}

async function setCurrentName(name: string | number) {
  const tab = findTabByName(name)
  if (tab) {
    const tabName = toRef(tab.exposed.name).value
    if (tabName !== currentName.value) {
      currentName.value = tabName
      emits("update:modelValue", tabName)
      emits("change", tabName)
      const tabIndex = toRef(tab.exposed.index).value
      scrollToTab(tabIndex)
      setTimeout(() => (inited.value = true), 30)
    }
  }
}

function clickTab(name: string | number) {
  emits("clickTab", name)
}

linkChildren({ props, useProps, currentName, clickTab, setCurrentName })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-tabs {
  width: 100%;
  height: 88rpx;
  display: flex;
  z-index: var(--ui-z-index-base);
  position: relative;
  background-color: var(--ui-color-background);

  &--border::after {
    left: 0;
    width: 100%;
    bottom: 0;
    content: "";
    position: absolute;
    border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
  }

  &__list {
    width: 100%;
    height: 88rpx;
    display: flex;
    position: relative;
  }
}
</style>
