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
import { isEmpty } from "../utils/check"
import { useUnit, useColor, useStyle, useChildren } from "../hooks"
import { tabsKey, tabsEmits, tabsProps, useTabsProps } from "./index"

defineOptions({ name: "ui-tabs" })

const props = defineProps(tabsProps)
const emits = defineEmits(tabsEmits)
const useProps = useTabsProps(props)
const { childrens, linkChildren } = useChildren(tabsKey)

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
  return childrens.find((tab) => toRef(tab.exposed.name).value === name) || childrens.find((tab) => isEmpty(tab.exposed.useProps.disabled))
}

async function setCurrentName(name: string | number) {
  const tab = findTabByName(name)
  if (tab) {
    const name = toRef(tab.exposed.name).value
    if (name !== currentName.value) {
      currentName.value = name
      emits("update:modelValue", name)
      emits("change", name)
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
