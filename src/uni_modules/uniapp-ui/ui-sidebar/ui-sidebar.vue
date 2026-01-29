<template>
  <view class="ui-sidebar" :class="[customClass]" :style="[style]">
    <scroll-view class="ui-sidebar__scroll" scroll-y enable-flex :scroll-with-animation="inited" :scroll-top="scrollTop">
      <ui-resize height="100%" @resize="onResize">
        <view class="ui-sidebar__list" :style="[listStyle]">
          <slot />
          <view class="ui-sidebar__line" :style="[lineStyle]">
            <slot name="line">
              <view class="ui-sidebar__line-inner" :style="[lineInnerStyle]" />
            </slot>
          </view>
        </view>
      </ui-resize>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { debounce } from "../utils/utils"
import { sidebarKey, sidebarEmits, sidebarProps } from "./index"
import { ref, toRef, watch, computed, nextTick, getCurrentInstance } from "vue"
import { useRect, useUnit, useColor, useStyle, useChildren, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-sidebar" })

const props = defineProps(sidebarProps)
const emits = defineEmits(sidebarEmits)
const { childrens, linkChildren } = useChildren(sidebarKey)

const inited = ref(false)
const instance = getCurrentInstance()
const wrapRect = ref<UniApp.NodeInfo>({})
const listRect = ref<UniApp.NodeInfo>({})
const lineRect = ref<UniApp.NodeInfo>({})
const lineTop = ref(0)
const lineHeight = ref(0)
const scrollTop = ref(0)
const currentName = ref(null)

const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const listStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  return useStyle(style)
})

const lineStyle = computed(() => {
  const style: CSSProperties = {}
  style.transform = `translateY(${lineTop.value}px)`
  style.transitionDuration = inited.value ? `${props.duration}ms` : "0"
  style.visibility = props.showLine ? "visible" : "hidden"
  return useStyle(style)
})

const lineInnerStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.lineWidth)
  style.height = `${useUnitToPx(props.lineHeight)}px`
  style.background = useColor(props.lineColor)
  style.borderRadius = useUnit(props.lineRadius)
  return useStyle(style)
})

watch(() => props.modelValue, setCurrentName)
watch(
  () => childrens.length,
  () => setCurrentName(props.modelValue),
)

async function resize(isChildrensResize = true) {
  await nextTick()
  wrapRect.value = await useRect(".ui-sidebar", instance)
  lineRect.value = await useRect(".ui-sidebar__line", instance)
  listRect.value = await useRect(".ui-sidebar__list", instance)
  if (isChildrensResize) {
    await Promise.all(childrens.map((item) => item.exposed.resize()))
  }
}

function clickItem(name: string | number, index: number) {
  emits("clickItem", name, index)
}

function findItemByName(name: string | number) {
  return childrens.find((item) => toRef(item.exposed.name).value === name) || childrens.find((item) => !item.exposed.props.disabled)
}

async function setCurrentName(name: string | number) {
  const item = findItemByName(name)
  if (item) {
    const name = toRef(item.exposed.name).value
    if (name !== currentName.value) {
      await resize(false)
      setLine(name)
      scrollIntoView(name)
      currentName.value = name
      emits("update:modelValue", name)
      emits("change", name)
    }
  }
}

function setLine(name: string | number) {
  const item = findItemByName(name)
  if (item) {
    const rect = toRef(item.exposed.rect)
    const index = toRef(item.exposed.index)
    const height = childrens.slice(0, index.value).reduce((prev: any, curr: any) => prev + toRef(curr.exposed.rect).value.height, 0)
    if (props.lineHeight === "100%") {
      lineTop.value = height
      lineHeight.value = rect.value.height
    } else {
      lineHeight.value = props.lineHeight ? useUnitToPx(props.lineHeight) : lineRect.value.height
      lineTop.value = height + (rect.value.height - lineHeight.value) / 2
    }
    setTimeout(() => (inited.value = true), 30)
  }
}

function scrollIntoView(name: string | number) {
  const item = findItemByName(name)
  if (item) {
    const rect = toRef(item.exposed.rect)
    const index = toRef(item.exposed.index)
    const height = childrens.slice(0, index.value).reduce((prev: any, curr: any) => prev + toRef(curr.exposed.rect).value.height, 0)
    const top = height - listRect.value.height / 2 + rect.value.height / 2
    scrollTop.value = scrollTop.value === top ? top + Math.random() / 10000 : top
  }
}

function onResize(rect: any) {
  debounce(resize, 100)
  if (rect.height <= 1) console.error("ui-sidebar: 检测到高度可能不正常，请检查父容器高度是否正常")
}

linkChildren({ props, currentName, setLine, scrollIntoView, clickItem, setCurrentName })
defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-sidebar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-sidebar {
  width: 300rpx;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--ui-color-background-light);

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

  &__line-inner {
    width: var(--ui-spacing-sm);
    border-radius: var(--ui-radius-round);
    background-color: var(--ui-color-primary);
  }
}
</style>
