<template>
  <view class="ui-sidebar-item" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <slot :active="active" :disabled="disabled">
      <view class="ui-sidebar-item__title" :style="[titleStyle]">
        {{ title }}
        <view v-if="props.dot" class="ui-sidebar-item__dot" />
        <view v-else-if="isDef(props.badge)" class="ui-sidebar-item__badge">{{ props.badge }}</view>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { sidebarKey } from "../ui-sidebar"
import { sidebarItemEmits, sidebarItemProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

// 定义组件名称
defineOptions({ name: "ui-sidebar-item" })

// 定义 props 和 emits
const props = defineProps(sidebarItemProps)
const emits = defineEmits(sidebarItemEmits)

// 获取父组件
const { index, parent } = useParent(sidebarKey)

// 元素位置信息
const rect = ref<UniApp.NodeInfo>({})
// 组件实例
const instance = getCurrentInstance()

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  if (active.value) {
    style.background = useColor(props.activeBackground)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 动态类名
const classs = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-sidebar-item--active")
  if (props.disabled) list.push("ui-sidebar-item--disabled")
  return list
})

// 标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(prop("titleColor"))
  style.fontSize = useUnit(prop("titleSize"))
  style.textAlign = prop("titleAlign")
  style.fontWeight = prop("titleWeight")
  if (active.value) {
    style.color = useColor(prop("activeTitleColor"))
    style.fontSize = useUnit(prop("activeTitleSize") || prop("titleSize"))
    style.fontWeight = prop("activeTitleWeight") || prop("titleWeight")
  }
  return useStyle(style)
})

// 项目名称
const name = computed(() => props.name ?? index.value)
// 是否激活
const active = computed(() => parent?.currentName.value === name.value)

// 监听 props 变化
watch(() => props, resize, { deep: true })

// 获取属性值（优先使用自身，未定义则使用父组件）
function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}

// 重新计算布局
async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-sidebar-item", instance)
  if (active.value) {
    parent.setLine(name.value)
    parent.scrollIntoView(name.value)
  }
}

// 点击事件
function onClick() {
  if (props.disabled) return
  parent.clickItem(name.value, index.value)
  parent.setCurrentName(name.value)
}

// 组件挂载时初始化
onMounted(resize)

defineExpose({ props, rect, name, index, resize })
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

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__title {
    flex: 1;
    padding: 0 var(--ui-spacing-lg);
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__dot {
    top: 50%;
    right: var(--ui-spacing-md);
    width: 16rpx;
    height: 16rpx;
    position: absolute;
    transform: translateY(-50%);
    background: var(--ui-color-danger);
    border-radius: 50%;
  }

  &__badge {
    top: 50%;
    color: #fff;
    right: var(--ui-spacing-md);
    height: 32rpx;
    display: flex;
    padding: 0 8rpx;
    position: absolute;
    font-size: 20rpx;
    min-width: 32rpx;
    transform: translateY(-50%);
    background: var(--ui-color-danger);
    align-items: center;
    border-radius: 32rpx;
    justify-content: center;
  }
}
</style>
