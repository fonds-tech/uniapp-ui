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
import { useRect, useUnit, useColor, useStyle, useChildren } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-dropdown-menu" })

// 定义props
const props = defineProps(dropdownMenuProps)

// 使用useChildren hook获取子组件
const { childrens, linkChildren } = useChildren(dropdownMenuKey)

// 定义rect和instance
const rect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()

// 链接子组件
linkChildren({ props, rect, close, resize })

// 计算元素样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 计算菜单项类名
const itemClass = computed(() => (item: any) => {
  const list: string[] = []
  if (item.props.disabled) list.push("is-disabled")
  if (toRef(item.exposed.visible).value) list.push("is-active")
  return list
})

// 计算标题样式
const titleStyle = computed(() => {
  return (item: any) => {
    const style: CSSProperties = {}
    style.color = toRef(item.exposed.visible).value ? useColor(prop(item, "activeTitleColor")) : useColor(prop(item, "titleColor"))
    style.fontSize = useUnit(prop(item, "titleSize"))
    style.fontWeight = prop(item, "titleWeight")
    return useStyle(style)
  }
})

// 计算图标样式，包括旋转
const iconStyle = computed(() => (item: any) => {
  const style: CSSProperties = {}
  if (toRef(item.exposed.visible).value) style.transform = "rotate(180deg)"
  return useStyle(style)
})

const itemTitle = computed(() => (item: any) => toRef(item.exposed.title).value)
// 计算是否有显示的子项
const isVisible = computed(() => childrens.some((item: any) => toRef(item.exposed.visible).value))
// 根据状态获取菜单图标颜色
const iconColor = computed(() => (item: any) => (toRef(item.exposed.visible).value ? useColor(prop(item, "activeIconColor")) : useColor(prop(item, "iconColor"))))

// 获取指定菜单实例prop值
function prop(item: any, name: string) {
  return item.props[name] ?? props[name]
}

// 获取节点信息
async function resize() {
  rect.value = await useRect(".ui-dropdown-menu", instance)
}

// 点击菜单处理函数
function onClick(item: any, index: number) {
  if (item.props.disabled) return
  toggleItem(index)
}

// 关闭所有菜单
function close() {
  childrens?.forEach((item: any) => item.exposed.toggle(false))
}

// 切换菜单展开状态
async function toggleItem(index: number) {
  await resize()
  childrens?.forEach((item, childrenIndex) => {
    if (index === childrenIndex) {
      item.exposed.toggle()
    } else if (toRef(item.exposed.visible).value) {
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
