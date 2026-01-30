<template>
  <view class="ui-tabs" :class="[classes, customClass]" :style="[style]">
    <scroll-view class="ui-tabs__scroll" :scroll-x="scrollable" enable-flex :scroll-with-animation="inited" :scroll-left="scrollLeft">
      <view class="ui-tabs__list" :style="[listStyle]">
        <slot />

        <view v-if="props.showIndicator" class="ui-tabs__indicator" :style="indicatorStyle" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import type { TabRect } from "./index"
import type { CSSProperties } from "vue"
import { tabsKey, tabsEmits, tabsProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useChildren } from "../hooks"
import { ref, toRef, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-tabs" })

const props = defineProps(tabsProps)
const emits = defineEmits(tabsEmits)
const { childrens, linkChildren } = useChildren(tabsKey)
const instance = getCurrentInstance()!

const inited = ref(false)
const scrollLeft = ref(0)
const currentName = ref<string | number | null>(null)
const indicatorStyle = ref("")
const indicatorInited = ref(false)
const tabRects = ref<Map<number, TabRect>>(new Map())

const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classes = computed(() => {
  const list = []
  if (props.borderBottom) list.push("ui-tabs--border")
  return list
})

const listStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = useUnit(props.height)
  return useStyle(style)
})

watch(() => props.modelValue, setCurrentName)
watch(
  () => childrens.length,
  () => setCurrentName(props.modelValue),
)

function findTabByName(name: string | number) {
  return childrens.find((tab) => toRef(tab.exposed.name).value === name) || childrens.find((tab) => !tab.exposed.props.disabled)
}

async function scrollToTab(index: number) {
  if (!props.scrollable) return
  await nextTick()
  const tabsRect = await useRect(".ui-tabs__scroll", instance)
  if (!tabsRect) return
  // 使用子组件上报的尺寸信息
  const rects = Array.from(tabRects.value.entries()).sort((a, b) => a[0] - b[0])
  if (!rects.length || !tabRects.value.has(index)) return
  const tabRect = tabRects.value.get(index)!
  const offset = rects.filter(([i]) => i < index).reduce((acc, [, r]) => acc + r.width, 0)
  const tabCenter = offset + tabRect.width / 2
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
      updateIndicatorStyle(true)
      setTimeout(() => (inited.value = true), 30)
    }
  }
}

function clickTab(name: string | number) {
  emits("tabClick", name)
}

/**
 * 子组件上报尺寸信息
 */
function updateTabRect(index: number, rect: TabRect) {
  tabRects.value.set(index, rect)
  // 如果是当前激活的 tab，更新指示器
  const activeTab = childrens.find((tab) => toRef(tab.exposed.name).value === currentName.value)
  if (activeTab && toRef(activeTab.exposed.index).value === index) {
    updateIndicatorStyle(indicatorInited.value)
  }
}

/**
 * 更新指示器样式
 * @param animate 是否启用动画
 */
function updateIndicatorStyle(animate: boolean = true) {
  if (!props.showIndicator || childrens.length === 0) return

  // 找到当前激活的 tab 索引
  const activeTab = childrens.find((tab) => toRef(tab.exposed.name).value === currentName.value)
  if (!activeTab) return
  const activeIndex = toRef(activeTab.exposed.index).value

  // 使用子组件上报的尺寸
  const rects = Array.from(tabRects.value.entries()).sort((a, b) => a[0] - b[0])
  if (!rects.length || !tabRects.value.has(activeIndex)) return

  const rect = tabRects.value.get(activeIndex)!
  const style: CSSProperties = {}

  // 1. 计算宽度
  if (props.autoIndicatorWidth) {
    style.width = `${rect.titleWidth}px`
  } else if (props.indicatorWidth) {
    style.width = useUnit(props.indicatorWidth)
  }

  // 2. 计算高度和圆角
  if (props.indicatorHeight) {
    style.height = useUnit(props.indicatorHeight)
  }
  if (props.indicatorRadius) {
    style.borderRadius = useUnit(props.indicatorRadius)
  }

  // 3. 计算水平偏移量（使用子组件上报的尺寸）
  const offsetLeft = rects.filter(([i]) => i < activeIndex).reduce((acc, [, r]) => acc + r.width, 0)
  const left = offsetLeft + rect.width / 2

  // 4. 设置 transform
  style.transform = `translateX(${left}px) translateX(-50%)`

  // 5. 设置颜色
  if (props.indicatorColor) {
    style.background = useColor(props.indicatorColor)
  }

  if (animate && indicatorInited.value) {
    const duration = props.duration || 300
    style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
  }

  indicatorStyle.value = useStyle(style)
  indicatorInited.value = true
}

onMounted(async () => {
  await nextTick()
  updateIndicatorStyle(false)
})

watch(
  () => childrens.length,
  async () => {
    await nextTick()
    updateIndicatorStyle(false)
  },
)

linkChildren({ props, currentName, tabRects, clickTab, setCurrentName, updateTabRect })
</script>

<script lang="ts">
export default {
  name: "ui-tabs",
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

  &__indicator {
    left: 0;
    width: 40rpx;
    bottom: 4rpx;
    height: 6rpx;
    position: absolute;
    background: var(--ui-color-primary);
    will-change: transform;
    border-radius: 9999rpx;
  }
}
</style>
