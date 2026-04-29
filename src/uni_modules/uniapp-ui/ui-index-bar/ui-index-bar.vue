<template>
  <view class="ui-index-bar" :class="[customClass]" :style="[rootStyle]">
    <view class="ui-index-bar__list">
      <view v-for="(item, index) in indexs" :key="index" class="ui-index-bar__index" :class="[itemClass(item)]" @click.stop="onClick(item)" @touchmove.stop.prevent="onTouchMove">
        {{ item }}
      </view>
    </view>
    <scroll-view class="ui-index-bar__scroll" scroll-y :scroll-top="currentScrollTop" @scroll="onScroll">
      <slot />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { debounce } from "../utils/utils"
import { useRect, useRects, useStyle, useChildren } from "../hooks"
import { indexBarKey, indexBarEmits, indexBarProps } from "../ui-index-bar"
import { ref, toRef, watch, computed, getCurrentInstance } from "vue"

defineOptions({ name: "ui-index-bar" })

const props = defineProps(indexBarProps)
const emits = defineEmits(indexBarEmits)

const { childrens, linkChildren } = useChildren(indexBarKey)

const instance = getCurrentInstance()

const init = ref(false)
const animating = ref(false)
const rect = ref<UniApp.NodeInfo | null>(null)
const itemsRect = ref<UniApp.NodeInfo[]>([])
const currentName = ref<string | number | null>(null)
// scroll-view 不响应相同值，初始 0.01 用作 sentinel 触发首次滚动
const currentScrollTop = ref(0.01)

const rootStyle = computed(() => useStyle({ zIndex: props.zIndex, ...useStyle(props.customStyle) } as CSSProperties))

watch(() => childrens.length, resize)

const debouncedResize = debounce(async () => {
  rect.value = await useRect(".ui-index-bar", instance)
  itemsRect.value = await useRects(".ui-index-bar__index", instance)
  childrens?.forEach((child) => child.exposed.resize())
  init.value = true
}, 100)

function resize() {
  debouncedResize()
}

function itemClass(item: string | number) {
  return currentName.value === item ? "is-active" : ""
}

function onClick(name: number | string) {
  if (currentName.value === name) return
  // exposed 经 Vue 自动 unwrap，再 toRef 包回访问最新 reactive 值
  const child = childrens.find((c) => toRef(c.exposed!, "name").value === name)
  if (!child) return
  animating.value = true
  currentName.value = toRef(child.exposed!, "name").value
  const childRect = toRef(child.exposed!, "rect").value
  // rect 未测量好时跳过滚动，仅切换激活态并 emit
  if (rect.value && childRect) {
    currentScrollTop.value = childRect.top - rect.value.top + 1
  }
  emits("select", name)
  // 等 scroll-view 滚动稳定后再放开 onScroll 抢回 currentName
  setTimeout(() => (animating.value = false), 30)
}

function onTouchMove(event: any) {
  const y = event.changedTouches[0].pageY
  itemsRect.value?.forEach((item, index) => {
    const { top, bottom } = item
    if (y >= top && y <= bottom) onClick(props.indexs[index])
  })
}

function onScroll(event: any) {
  if (animating.value || !init.value || !rect.value) return
  const top = event.detail.scrollTop
  const child = childrens.find((c, index) => {
    const cur = toRef(c.exposed!, "rect").value
    if (!cur) return false
    const next = toRef(childrens[Math.min(index + 1, childrens.length - 1)].exposed!, "rect").value
    if (!next) return false
    const currentTop = cur.top - rect.value!.top
    const nextTop = next.top - rect.value!.top
    return top >= currentTop && top < nextTop
  })
  if (child) currentName.value = toRef(child.exposed!, "name").value
  if (top === 0) currentName.value = null
}

linkChildren({ props, currentName })

defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-index-bar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-index-bar {
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;

  &__list {
    top: 50%;
    right: 12rpx;
    display: flex;
    z-index: 3;
    position: absolute;
    transform: translateY(-50%);
    flex-direction: column;
  }

  &__index {
    display: flex;
    padding: var(--ui-spacing-xxs) var(--ui-spacing-xs);
    align-items: center;
    justify-content: center;

    &.is-active {
      color: var(--ui-color-primary);
    }
  }

  &__scroll {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
