<template>
  <view class="ui-dropdown-menu" :class="[customClass]" :style="[style]">
    <view v-for="(item, index) in childrens" :key="index" class="ui-dropdown-menu__item" :class="[itemClass(item)]" @click="onClick(item, index)">
      <text class="ui-dropdown-menu__item__title" :style="[titleStyle(item)]">{{ itemTitle(item) }}</text>
      <view v-if="prop(item, 'showIcon')" class="ui-dropdown-menu__item__icon" :style="[iconStyle(item)]">
        <ui-icon :name="prop(item, 'icon')" :size="prop(item, 'iconSize')" :weight="prop(item, 'iconWeight')" :color="iconColor(item)" />
      </view>
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { dropdownMenuKey, dropdownMenuProps } from "./index"
import { ref, computed, onMounted, getCurrentInstance } from "vue"
import { useRect, useUnit, useColor, useStyle, useChildren } from "../hooks"

defineOptions({ name: "ui-dropdown-menu" })

const props = defineProps(dropdownMenuProps)
const { childrens, linkChildren } = useChildren(dropdownMenuKey)

const rect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()

linkChildren({ props, rect, close, resize })

const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 是否有打开的子项（用于页面滚动时判断是否需要重新计算 rect）
const isVisible = computed(() => childrens.some((item: any) => item.exposed.visible))

// 子项类名（普通函数，避免 computed 包装单参数函数的反模式）
function itemClass(item: any): string[] {
  const list: string[] = []
  if (item.exposed.props.disabled) list.push("is-disabled")
  if (item.exposed.visible) list.push("is-active")
  return list
}

// 子项标题样式
function titleStyle(item: any) {
  const style: CSSProperties = {}
  style.color = item.exposed.visible ? useColor(prop(item, "activeTitleColor")) : useColor(prop(item, "titleColor"))
  style.fontSize = useUnit(prop(item, "titleSize"))
  style.fontWeight = prop(item, "titleWeight")
  return useStyle(style)
}

// 子项图标样式（打开时旋转 180）
function iconStyle(item: any) {
  const style: CSSProperties = {}
  if (item.exposed.visible) style.transform = "rotate(180deg)"
  return useStyle(style)
}

// 子项标题文本
function itemTitle(item: any) {
  return item.exposed.title
}

// 子项图标颜色
function iconColor(item: any) {
  return item.exposed.visible ? useColor(prop(item, "activeIconColor")) : useColor(prop(item, "iconColor"))
}

// 取子项 prop（自身 > 父级菜单回退）
function prop(item: any, name: string) {
  return item.props[name] ?? props[name as keyof typeof props]
}

// 测量菜单 rect（供子项计算定位）
async function resize() {
  rect.value = await useRect(".ui-dropdown-menu", instance)
}

// 点击菜单项
function onClick(item: any, index: number) {
  if (item.exposed.props.disabled) return
  toggleItem(index)
}

// 关闭所有子菜单
function close() {
  childrens?.forEach((item: any) => item.exposed.toggle(false))
}

async function toggleItem(index: number) {
  await resize()
  childrens?.forEach((item: any, childrenIndex) => {
    if (index === childrenIndex) {
      item.exposed.toggle()
    } else if (item.exposed.visible) {
      item.exposed.toggle(false)
    }
  })
}

onMounted(resize)
onPageScroll(() => isVisible.value && resize())
defineExpose({ close, resize })
</script>

<script lang="ts">
export default {
  name: "ui-dropdown-menu",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-dropdown-menu {
  width: 100%;
  height: 80rpx;
  display: flex;
  align-items: center;
  background-color: var(--ui-color-background);

  &__item {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;

    &__icon {
      display: flex;
      transition: transform var(--ui-transition-duration) ease-out;
      margin-left: var(--ui-spacing-sm);
    }

    &.is-active {
      color: var(--ui-color-primary);
    }

    &.is-disabled {
      opacity: var(--ui-opacity-disabled);
    }
  }
}
</style>
