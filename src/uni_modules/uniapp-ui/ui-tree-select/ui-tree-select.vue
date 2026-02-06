<template>
  <view class="ui-tree-select" :class="[customClass]" :style="[style]">
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
            <ui-icon v-if="isItemActive(child)" class="ui-tree-select__item-icon" :name="selectedIcon" size="32rpx" />
          </slot>
        </view>
      </slot>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { ActiveIdType, TreeSelectChild } from "./index"
import { useUnit, useStyle } from "../hooks"
import { ref, watch, computed } from "vue"
import { treeSelectEmits, treeSelectProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-tree-select" })

// 定义 props 和 emits
const props = defineProps(treeSelectProps)
const emits = defineEmits(treeSelectEmits)

// 滚动到指定导航项
const scrollIntoView = ref("")

// 当前选中的主索引
const currentMainIndex = computed(() => {
  const index = Number(props.mainActiveIndex)
  return isNaN(index) ? 0 : index
})

// 当前分类下的子项列表
const currentChildren = computed(() => {
  const item = props.items[currentMainIndex.value]
  return item?.children || []
})

// 将 activeId 转换为数组格式（统一处理单选和多选）
const activeIds = computed<(number | string)[]>(() => {
  const id = props.activeId
  if (id === undefined || id === null) return []
  if (Array.isArray(id)) return id
  return [id]
})

// 是否为多选模式
const isMultiple = computed(() => Array.isArray(props.activeId))

// 最大选择数量
const maxCount = computed(() => {
  const max = Number(props.max)
  return isNaN(max) || max <= 0 ? Infinity : max
})

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.height = useUnit(props.height)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 判断导航项是否激活
function isNavActive(index: number): boolean {
  return currentMainIndex.value === index
}

// 导航项动态类名
function navItemClass(index: number): string[] {
  const classList: string[] = []
  const item = props.items[index]
  if (isNavActive(index)) classList.push("ui-tree-select__nav-item--active")
  if (item?.disabled) classList.push("ui-tree-select__nav-item--disabled")
  return classList
}

// 判断子项是否激活
function isItemActive(child: TreeSelectChild): boolean {
  return activeIds.value.includes(child.id)
}

// 子项动态类名
function itemClass(child: TreeSelectChild): string[] {
  const classList: string[] = []
  if (isItemActive(child)) classList.push("ui-tree-select__item--active")
  if (child.disabled) classList.push("ui-tree-select__item--disabled")
  return classList
}

// 点击左侧导航
function onClickNav(index: number) {
  const item = props.items[index]
  if (item?.disabled) return

  emits("update:mainActiveIndex", index)
  emits("clickNav", index)

  // 滚动到选中项
  scrollIntoView.value = `nav-item-${index}`
}

// 点击右侧选项
function onClickItem(child: TreeSelectChild) {
  if (child.disabled) return

  emits("clickItem", child)

  let newActiveId: ActiveIdType

  if (isMultiple.value) {
    // 多选模式
    const ids = [...activeIds.value]
    const index = ids.indexOf(child.id)

    if (index > -1) {
      // 已选中，取消选择
      ids.splice(index, 1)
    } else {
      // 未选中，添加选择（检查最大数量限制）
      if (ids.length < maxCount.value) {
        ids.push(child.id)
      }
    }
    newActiveId = ids
  } else {
    // 单选模式
    newActiveId = child.id
  }

  emits("update:activeId", newActiveId)
}

// 监听 mainActiveIndex 变化，滚动到对应导航项
watch(
  () => props.mainActiveIndex,
  (index) => {
    scrollIntoView.value = `nav-item-${index}`
  },
  { immediate: true },
)
</script>

<script lang="ts">
export default {
  name: "ui-tree-select",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-tree-select {
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: var(--ui-color-background);

  // 左侧导航
  &__nav {
    width: 200rpx;
    height: 100%;
    overflow: hidden;
    flex-shrink: 0;
    background-color: var(--ui-color-background-page);
  }

  &__nav-item {
    display: flex;
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
    position: relative;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--ui-color-background-page);

    // 激活状态
    &--active {
      font-weight: var(--ui-font-weight-bold);
      background-color: var(--ui-color-background);

      // 左侧激活指示条
      &::before {
        top: 50%;
        left: 0;
        width: 6rpx;
        height: 40rpx;
        content: "";
        position: absolute;
        transform: translateY(-50%);
        border-radius: var(--ui-radius-round);
        background-color: var(--ui-color-primary);
      }
    }

    // 禁用状态
    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__nav-item-text {
    flex: 1;
    overflow: hidden;
    font-size: var(--ui-font-size-md);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  // 右侧内容区域
  &__content {
    flex: 1;
    height: 100%;
    overflow: hidden;
    background-color: var(--ui-color-background);
  }

  &__item {
    display: flex;
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
    align-items: center;
    justify-content: space-between;

    // 激活状态
    &--active {
      color: var(--ui-color-primary);
    }

    // 禁用状态
    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__item-text {
    flex: 1;
    overflow: hidden;
    font-size: var(--ui-font-size-md);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__item-icon {
    color: var(--ui-color-primary);
    flex-shrink: 0;
    margin-left: var(--ui-spacing-sm);
  }
}
</style>
