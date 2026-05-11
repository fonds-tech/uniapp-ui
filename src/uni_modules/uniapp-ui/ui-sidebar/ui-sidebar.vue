<template>
  <view class="ui-sidebar" :class="[showLine && 'ui-sidebar--show-line', customClass]" :style="[rootStyle]">
    <scroll-view class="ui-sidebar__scroll" scroll-y :scroll-with-animation="inited" :scroll-top="scrollTop">
      <view class="ui-sidebar__list">
        <slot />
        <view class="ui-sidebar__line" :style="[lineStyle]">
          <slot name="line">
            <view class="ui-sidebar__line-inner" />
          </slot>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { sidebarKey, sidebarEmits, sidebarProps } from "./index"
import { ref, toRef, watch, computed, nextTick, getCurrentInstance } from "vue"
import { useRect, useUnit, useColor, useStyle, useChildren, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-sidebar" })

const props = defineProps(sidebarProps)
const emits = defineEmits(sidebarEmits)
const { childrens, linkChildren } = useChildren(sidebarKey)

const instance = getCurrentInstance()
// 是否完成首次定位，开启 scroll/line 动画
const inited = ref(false)
// 列表容器布局信息
const listRect = ref<UniApp.NodeInfo>({})
// 指示线垂直偏移
const lineTop = ref(0)
// 指示线滚动位置
const scrollTop = ref(0)
// 当前选中项名称
const currentName = ref<string | number | null>(null)
// 暴露的 showLine 提取给模板使用
const showLine = computed(() => props.showLine)

// 根节点样式：宽高 / 背景 / line var 注入
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (isDef(props.width)) vars["--ui-sidebar-width"] = useUnit(props.width)
  if (isDef(props.height)) vars["--ui-sidebar-height"] = useUnit(props.height)
  if (props.background) vars["--ui-sidebar-background"] = useColor(props.background)
  if (props.lineColor) vars["--ui-sidebar-line-color"] = useColor(props.lineColor)
  if (isDef(props.lineWidth)) vars["--ui-sidebar-line-width"] = useUnit(props.lineWidth)
  if (isDef(props.lineRadius)) vars["--ui-sidebar-line-radius"] = useUnit(props.lineRadius)
  if (isDef(props.zIndex)) vars.zIndex = props.zIndex as string | number
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})

// 指示线外层动态样式（位置/动画/高度）
const lineStyle = computed(() => {
  const style: CSSProperties = {}
  style.transform = `translateY(${lineTop.value}px)`
  style.transitionDuration = inited.value ? `${props.duration}ms` : "0s"
  return useStyle(style)
})

watch(() => props.modelValue, setCurrentName)

// 子项挂载/卸载触发；同长度的整体替换由 modelValue 不变下保持现状（用户应换 modelValue 同步）
watch(
  () => childrens.length,
  () => setCurrentName(props.modelValue),
)

// 重算布局
async function resize(isChildrensResize = true) {
  await nextTick()
  listRect.value = await useRect(".ui-sidebar__list", instance)
  if (isChildrensResize) {
    await Promise.all(childrens.map((item: any) => item.exposed.resize()))
  }
}

function clickItem(name: string | number, index: number) {
  emits("clickItem", name, index)
}

// 按 name 查 item；未传或没匹配时返回首个非禁用项作为回退候选
function findItemByName(name: string | number | null | undefined) {
  if (isDef(name)) {
    const found = childrens.find((item: any) => toRef(item.exposed.name).value === name)
    if (found) return { item: found, matched: true }
  }
  const fallback = childrens.find((item: any) => !item.exposed.props.disabled)
  return fallback ? { item: fallback, matched: false } : null
}

// 设置当前选中项；传入值未匹配时不强占 modelValue
async function setCurrentName(name: string | number | null | undefined) {
  const result = findItemByName(name)
  if (!result) return
  const { item, matched } = result
  const itemName = toRef(item.exposed.name).value
  // 外部传了具体值但未命中 → 静默警告，不修改 modelValue
  if (isDef(name) && !matched) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[ui-sidebar] modelValue "${name}" 未匹配任何子项，已忽略`)
    }
    return
  }
  if (itemName === currentName.value) return
  await resize(false)
  setLine(itemName)
  if (props.autoScroll) scrollIntoView(itemName)
  currentName.value = itemName
  emits("update:modelValue", itemName)
  emits("change", itemName)
}

function setLine(name: string | number) {
  const result = findItemByName(name)
  if (!result) return
  const { item } = result
  const idx = toRef(item.exposed.index).value
  const rectH = toRef(item.exposed.rect).value?.height || 0
  const offset = childrens.slice(0, idx).reduce((sum: number, curr: any) => sum + (toRef(curr.exposed.rect).value?.height || 0), 0)
  // "100%": line 拉满当前项高度
  if (props.lineHeight === "100%") {
    lineTop.value = offset
    setLineHeight(rectH)
  } else {
    const h = props.lineHeight ? useUnitToPx(props.lineHeight) || 0 : 0
    lineTop.value = offset + (rectH - h) / 2
    setLineHeight(h)
  }
  // 首次定位后再开启动画，避免初始位置即触发 transition
  setTimeout(() => (inited.value = true), 30)
}

function setLineHeight(h: number) {
  const root = instance?.proxy?.$el as HTMLElement | undefined
  root?.style?.setProperty?.("--ui-sidebar-line-height", `${h}px`)
}

function scrollIntoView(name: string | number) {
  const result = findItemByName(name)
  if (!result) return
  const { item } = result
  const idx = toRef(item.exposed.index).value
  const rectH = toRef(item.exposed.rect).value?.height || 0
  const offset = childrens.slice(0, idx).reduce((sum: number, curr: any) => sum + (toRef(curr.exposed.rect).value?.height || 0), 0)
  const listH = listRect.value.height || 0
  const top = offset - listH / 2 + rectH / 2
  // 小程序 scroll-view 同值不会重滚，加微扰强制响应
  scrollTop.value = scrollTop.value === top ? top + Math.random() / 10000 : top
}

linkChildren({ props, currentName, setLine, scrollIntoView, clickItem, setCurrentName })

defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-sidebar",
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
.ui-sidebar {
  --ui-sidebar-width: 300rpx;
  --ui-sidebar-height: 100%;
  --ui-sidebar-background: var(--ui-color-background-page);
  --ui-sidebar-line-color: var(--ui-color-primary);
  --ui-sidebar-line-width: 6rpx;
  --ui-sidebar-line-height: 40rpx;
  --ui-sidebar-line-radius: var(--ui-radius-round);

  width: var(--ui-sidebar-width);
  height: var(--ui-sidebar-height);
  display: flex;
  position: relative;
  background: var(--ui-sidebar-background);
  flex-direction: column;
  justify-content: space-between;

  &__scroll {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
  }

  &__list {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
  }

  &__line {
    left: 0;
    z-index: var(--ui-z-index-base);
    position: absolute;
    transition: all 0s ease-out;
    visibility: hidden;
  }

  &--show-line &__line {
    visibility: visible;
  }

  &__line-inner {
    width: var(--ui-sidebar-line-width);
    height: var(--ui-sidebar-line-height);
    background: var(--ui-sidebar-line-color);
    border-radius: var(--ui-sidebar-line-radius);
  }
}
</style>
