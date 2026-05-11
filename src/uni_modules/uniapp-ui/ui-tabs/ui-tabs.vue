<template>
  <view class="ui-tabs" :class="[classNames, customClass]" :style="[rootStyle]">
    <scroll-view class="ui-tabs__scroll" :scroll-x="scrollable" enable-flex :scroll-with-animation="inited" :scroll-left="scrollLeft">
      <view class="ui-tabs__list">
        <slot />
        <view v-if="props.showIndicator" class="ui-tabs__indicator" :style="[indicatorStyle]" />
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

// 首次定位完成后开启滚动/指示器动画
const inited = ref(false)
// scroll-view scroll-left
const scrollLeft = ref(0)
// 当前激活 name
const currentName = ref<string | number | null>(null)
// 指示器 inline 样式
const indicatorStyle = ref<CSSProperties>({})
// 指示器是否已首次定位
const indicatorInited = ref(false)
// 子 tab 测量信息
const tabRects = ref<Map<number, TabRect>>(new Map())

const classNames = computed(() => {
  const list: string[] = []
  if (props.borderBottom) list.push("ui-tabs--border")
  return list
})

// 根节点 CSS var 注入
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.height) vars["--ui-tabs-height"] = useUnit(props.height)
  if (props.background) vars["--ui-tabs-background"] = useColor(props.background)
  if (props.activeColor) vars["--ui-tabs-color-active"] = useColor(props.activeColor)
  if (props.inactiveColor) vars["--ui-tabs-color-inactive"] = useColor(props.inactiveColor)
  if (props.indicatorColor) vars["--ui-tabs-indicator-color"] = useColor(props.indicatorColor)
  if (props.indicatorHeight) vars["--ui-tabs-indicator-height"] = useUnit(props.indicatorHeight)
  if (props.indicatorRadius) vars["--ui-tabs-indicator-radius"] = useUnit(props.indicatorRadius)
  if (props.zIndex !== undefined) vars.zIndex = props.zIndex as number | string
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

watch(() => props.modelValue, setCurrentName)

// 子项数量变化：清空旧 cache（index 重排导致 stale）+ 重设当前 + 全量重测
watch(
  () => childrens.length,
  async () => {
    tabRects.value.clear()
    setCurrentName(props.modelValue)
    await refreshAllTabs()
  },
)

// 父级宽度/高度类 prop 变化：所有子 tab 重测后再刷新 indicator（避免半新半旧 cache）
watch(
  () => [props.itemWidth, props.itemMaxWidth, props.height, props.scrollable],
  () => refreshAllTabs(),
)

async function refreshAllTabs() {
  await nextTick()
  await Promise.all(childrens.map((c: any) => c.exposed?.reportRect?.()))
  updateIndicatorStyle(false)
}

// 按 name 精确查找；matched 区分精确匹配 vs 回退首项
function findTabByName(name: string | number | null | undefined) {
  if (name !== null && name !== undefined) {
    const exact = childrens.find((tab: any) => toRef(tab.exposed.name).value === name)
    if (exact) return { tab: exact, matched: true }
  }
  const fallback = childrens.find((tab: any) => !tab.exposed.props?.disabled)
  return fallback ? { tab: fallback, matched: false } : null
}

async function scrollToTab(index: number) {
  if (!props.scrollable) return
  await nextTick()
  const tabsRect = await useRect(".ui-tabs__scroll", instance)
  if (!tabsRect) return
  const rect = tabRects.value.get(index)
  if (!rect) return
  const offset = sumWidthBefore(index)
  const tabCenter = offset + rect.width / 2
  const scrollCenter = (tabsRect.width || 0) / 2
  scrollLeft.value = Math.max(0, tabCenter - scrollCenter)
}

async function setCurrentName(name: string | number) {
  const result = findTabByName(name)
  if (!result) return
  const { tab, matched } = result
  const tabName = toRef(tab.exposed.name).value
  // 外部传入了具体值但未精确命中 → 静默不强占 modelValue
  if (name !== null && name !== undefined && !matched) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[ui-tabs] modelValue "${name}" 未匹配任何子 tab，已忽略`)
    }
    return
  }
  if (tabName === currentName.value) return
  currentName.value = tabName
  emits("update:modelValue", tabName)
  emits("change", tabName)
  const tabIndex = toRef(tab.exposed.index).value
  scrollToTab(tabIndex)
  updateIndicatorStyle(true)
  setTimeout(() => (inited.value = true), 30)
}

function clickTab(name: string | number) {
  emits("tabClick", name)
}

function updateTabRect(index: number, rect: TabRect) {
  tabRects.value.set(index, rect)
  const activeTab = findActiveTab()
  if (activeTab && toRef(activeTab.exposed.index).value === index) {
    updateIndicatorStyle(indicatorInited.value)
  }
}

function findActiveTab() {
  return childrens.find((tab: any) => toRef(tab.exposed.name).value === currentName.value)
}

// 累加索引前所有 tab 宽度
function sumWidthBefore(index: number): number {
  let sum = 0
  tabRects.value.forEach((r, i) => {
    if (i < index) sum += r.width
  })
  return sum
}

function updateIndicatorStyle(animate: boolean = true) {
  if (!props.showIndicator || childrens.length === 0) return
  const activeTab = findActiveTab()
  if (!activeTab) return
  const activeIndex = toRef(activeTab.exposed.index).value
  const rect = tabRects.value.get(activeIndex)
  if (!rect) return

  const style: CSSProperties = {}

  if (props.autoIndicatorWidth) style.width = `${rect.titleWidth}px`
  else if (props.indicatorWidth) style.width = useUnit(props.indicatorWidth)

  const left = sumWidthBefore(activeIndex) + rect.width / 2
  style.transform = `translate(${left}px, 0) translate(-50%, 0)`

  if (animate && indicatorInited.value) {
    const duration = props.duration || 300
    style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
  }

  indicatorStyle.value = style
  indicatorInited.value = true
}

onMounted(async () => {
  await nextTick()
  updateIndicatorStyle(false)
})

linkChildren({ props, currentName, tabRects, clickTab, setCurrentName, updateTabRect })
</script>

<script lang="ts">
export default {
  name: "ui-tabs",
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
.ui-tabs {
  --ui-tabs-height: 88rpx;
  --ui-tabs-background: var(--ui-color-background);
  --ui-tabs-color-active: var(--ui-color-text);
  --ui-tabs-color-inactive: var(--ui-color-text-secondary);
  --ui-tabs-indicator-color: var(--ui-color-primary);
  --ui-tabs-indicator-bottom: var(--ui-spacing-xxs);
  --ui-tabs-indicator-height: 6rpx;
  --ui-tabs-indicator-radius: var(--ui-radius-round);

  width: 100%;
  height: var(--ui-tabs-height);
  display: flex;
  z-index: var(--ui-z-index-base);
  position: relative;
  background: var(--ui-tabs-background);

  &--border::after {
    left: 0;
    width: 100%;
    bottom: 0;
    content: "";
    position: absolute;
    border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
  }

  &__scroll {
    width: 100%;
    height: 100%;
  }

  &__list {
    width: 100%;
    height: var(--ui-tabs-height);
    display: flex;
    position: relative;
  }

  &__indicator {
    left: 0;
    width: 40rpx;
    bottom: var(--ui-tabs-indicator-bottom);
    height: var(--ui-tabs-indicator-height);
    position: absolute;
    background: var(--ui-tabs-indicator-color);
    will-change: transform;
    border-radius: var(--ui-tabs-indicator-radius);
  }
}
</style>
