<template>
  <view class="ui-tree-select" :class="[customClass]" :style="[rootStyle]">
    <!-- 左侧分类导航 -->
    <scroll-view class="ui-tree-select__nav" scroll-y :scroll-into-view="scrollIntoView">
      <view v-for="(item, index) in items" :id="`nav-item-${index}`" :key="index" class="ui-tree-select__nav-item" :class="[navItemClass(index)]" @click="onClickNav(index)">
        <slot name="nav-text" :item="item" :index="index" :active="isNavActive(index)">
          <text class="ui-tree-select__nav-item-text">{{ item.text }}</text>
        </slot>
      </view>
    </scroll-view>

    <!-- 右侧内容区域 -->
    <scroll-view class="ui-tree-select__content" scroll-y>
      <slot name="content">
        <view v-for="child in currentChildren" :key="child.id" class="ui-tree-select__item" :class="[itemClass(child)]" @click="onClickItem(child)">
          <slot name="item" :item="child" :active="isItemActive(child)">
            <text class="ui-tree-select__item-text">{{ child.text }}</text>
            <ui-icon v-if="isItemActive(child)" class="ui-tree-select__item-icon" :name="selectedIcon" size="32rpx" :color="activeColor || 'var(--ui-tree-select-active-color)'" />
          </slot>
        </view>
      </slot>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { ActiveIdType, TreeSelectChild } from "./index"
import { ref, watch, computed } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { treeSelectEmits, treeSelectProps } from "./index"

defineOptions({ name: "ui-tree-select" })

const props = defineProps(treeSelectProps)
const emits = defineEmits(treeSelectEmits)

// 滚动定位 id
const scrollIntoView = ref("")

// 当前主索引（容错 NaN）
const currentMainIndex = computed(() => {
  const index = Number(props.mainActiveIndex)
  return Number.isNaN(index) ? 0 : index
})
// 当前分类下的子项
const currentChildren = computed(() => props.items[currentMainIndex.value]?.children || [])
// activeId 归一化为数组
const activeIds = computed<(number | string)[]>(() => {
  const id = props.activeId
  if (id === undefined || id === null) return []
  return Array.isArray(id) ? id : [id]
})
// 多选模式：activeId 为数组
const isMultiple = computed(() => Array.isArray(props.activeId))
// 多选上限（0 表示无上限）
const maxCount = computed(() => {
  const max = Number(props.max)
  return Number.isNaN(max) || max <= 0 ? Infinity : max
})

// 根节点样式（CSS var 注入）
const rootStyle = computed(() => {
  const vars: CSSProperties = {}
  if (props.height !== undefined) vars.height = useUnit(props.height)
  if (props.navWidth !== undefined) vars["--ui-tree-select-nav-width" as keyof CSSProperties] = useUnit(props.navWidth) as never
  if (props.navBg) vars["--ui-tree-select-nav-bg" as keyof CSSProperties] = useColor(props.navBg) as never
  if (props.activeColor) vars["--ui-tree-select-active-color" as keyof CSSProperties] = useColor(props.activeColor) as never
  if (props.indicatorWidth !== undefined) vars["--ui-tree-select-indicator-width" as keyof CSSProperties] = useUnit(props.indicatorWidth) as never
  if (props.indicatorHeight !== undefined) vars["--ui-tree-select-indicator-height" as keyof CSSProperties] = useUnit(props.indicatorHeight) as never
  if (props.itemFontSize !== undefined) vars["--ui-tree-select-item-font-size" as keyof CSSProperties] = useUnit(props.itemFontSize) as never
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

watch(
  () => props.mainActiveIndex,
  (index) => {
    scrollIntoView.value = `nav-item-${index}`
  },
  { immediate: true },
)

// nav 项激活
function isNavActive(index: number): boolean {
  return currentMainIndex.value === index
}

// nav 项类名
function navItemClass(index: number): string[] {
  const list: string[] = []
  const item = props.items[index]
  if (isNavActive(index)) list.push("ui-tree-select__nav-item--active")
  if (item?.disabled) list.push("ui-tree-select__nav-item--disabled")
  return list
}

// 子项激活
function isItemActive(child: TreeSelectChild): boolean {
  return activeIds.value.includes(child.id)
}

// 子项类名
function itemClass(child: TreeSelectChild): string[] {
  const list: string[] = []
  if (isItemActive(child)) list.push("ui-tree-select__item--active")
  if (child.disabled) list.push("ui-tree-select__item--disabled")
  return list
}

// 点击 nav
function onClickNav(index: number) {
  const item = props.items[index]
  if (item?.disabled) return
  emits("update:mainActiveIndex", index)
  emits("clickNav", index)
  scrollIntoView.value = `nav-item-${index}`
}

// 点击子项
function onClickItem(child: TreeSelectChild) {
  if (child.disabled) return
  emits("clickItem", child)
  let newActiveId: ActiveIdType
  if (isMultiple.value) {
    const ids = [...activeIds.value]
    const idx = ids.indexOf(child.id)
    if (idx > -1) {
      ids.splice(idx, 1)
    } else if (ids.length < maxCount.value) {
      ids.push(child.id)
    } else {
      emits("maxReached", maxCount.value === Infinity ? 0 : maxCount.value)
      return
    }
    newActiveId = ids
  } else {
    newActiveId = child.id
  }
  emits("update:activeId", newActiveId)
}
</script>

<script lang="ts">
export default {
  name: "ui-tree-select",
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
.ui-tree-select {
  --ui-tree-select-nav-bg: var(--ui-color-background-page);
  --ui-tree-select-nav-width: 200rpx;
  --ui-tree-select-content-bg: var(--ui-color-background);
  --ui-tree-select-active-color: var(--ui-color-primary);
  --ui-tree-select-nav-font-size: var(--ui-font-size-md);
  --ui-tree-select-item-font-size: var(--ui-font-size-md);
  --ui-tree-select-indicator-width: 6rpx;
  --ui-tree-select-indicator-height: 40rpx;

  display: flex;
  position: relative;
  background: var(--ui-tree-select-content-bg);
  flex-direction: row;

  &__nav {
    width: var(--ui-tree-select-nav-width);
    height: 100%;
    overflow: hidden;
    background: var(--ui-tree-select-nav-bg);
    flex-shrink: 0;
  }

  &__nav-item {
    display: flex;
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
    position: relative;
    background: var(--ui-tree-select-nav-bg);
    align-items: center;
    justify-content: flex-start;

    &--active {
      background: var(--ui-tree-select-content-bg);
      font-weight: var(--ui-font-weight-bold);

      &::before {
        top: 50%;
        left: 0;
        width: var(--ui-tree-select-indicator-width);
        height: var(--ui-tree-select-indicator-height);
        content: "";
        position: absolute;
        transform: translateY(-50%);
        background: var(--ui-tree-select-active-color);
        border-radius: var(--ui-radius-round);
      }
    }

    &--disabled {
      cursor: not-allowed;
      opacity: var(--ui-opacity-disabled);
      pointer-events: none;
    }
  }

  &__nav-item-text {
    flex: 1;
    overflow: hidden;
    font-size: var(--ui-tree-select-nav-font-size);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__content {
    flex: 1;
    height: 100%;
    overflow: hidden;
    background: var(--ui-tree-select-content-bg);
  }

  &__item {
    display: flex;
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
    align-items: center;
    justify-content: space-between;

    &--active {
      color: var(--ui-tree-select-active-color);
    }

    &--disabled {
      cursor: not-allowed;
      opacity: var(--ui-opacity-disabled);
      pointer-events: none;
    }
  }

  &__item-text {
    flex: 1;
    overflow: hidden;
    font-size: var(--ui-tree-select-item-font-size);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__item-icon {
    color: var(--ui-tree-select-active-color);
    flex-shrink: 0;
    margin-left: var(--ui-spacing-sm);
  }
}
</style>
