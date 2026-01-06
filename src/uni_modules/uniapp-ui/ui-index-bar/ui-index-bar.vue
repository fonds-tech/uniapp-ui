<template>
  <view class="ui-index-bar" :class="[customClass]" :style="[style]">
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
import { computed, getCurrentInstance, ref, toRef, watch } from "vue"

import { debounce } from "../utils/utils"
import { useRect, useRects, useStyle, useChildren } from "../hooks"
import { indexBarKey, indexBarEmits, indexBarProps, useIndexBarProps } from "../ui-index-bar"

defineOptions({ name: "ui-index-bar" })

const props = defineProps(indexBarProps)
const emits = defineEmits(indexBarEmits)
const useProps = useIndexBarProps(props)
const instance = getCurrentInstance()
const { childrens, linkChildren } = useChildren(indexBarKey)

const init = ref(false)
const rect = ref<UniApp.NodeInfo>(null)
const itemsRect = ref<UniApp.NodeInfo[]>([])
const animating = ref(false)
const scrollTop = ref(0.01)
const currentScrollTop = ref(0.01)
const currentName = ref(null)

const style = computed(() => {
  const style: any = {}
  style.zIndex = useProps.zIndex
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const itemClass = computed(() => (item: string | number) => (currentName.value === item ? "is-active" : ""))

watch(() => childrens.length, resize)

async function resize() {
  debounce(async () => {
    rect.value = await useRect(".ui-index-bar", instance)
    itemsRect.value = await useRects(".ui-index-bar__index", instance)
    childrens?.forEach((child) => child.exposed.resize())
    init.value = true
  }, 100)
}

function onClick(name: number | string) {
  if (currentName.value === name) return
  const children = childrens.find((children) => toRef(children.exposed.name).value === name)
  if (children) {
    animating.value = true
    currentScrollTop.value = toRef(children.exposed.rect).value.top - rect.value.top + 1
    currentName.value = toRef(children.exposed.name).value
    emits("select", name)
    setTimeout(() => (animating.value = false), 30)
  }
}

function onTouchMove(event: any) {
  const y = event.changedTouches[0].pageY
  itemsRect.value?.forEach((item, index) => {
    const { top, bottom } = item
    if (y >= top && y <= bottom) {
      onClick(useProps.indexs[index])
    }
  })
}

function onScroll(event: any) {
  if (animating.value) return
  if (init.value) {
    scrollTop.value = event.detail.scrollTop

    const children = childrens.find((children, index) => {
      if (children.exposed.rect) {
        const next = childrens[Math.min(index + 1, childrens.length - 1)].exposed.rect
        const currentTop = toRef(children.exposed.rect).value.top - rect.value.top
        const nextTop = toRef(next).value.top - rect.value.top
        return scrollTop.value >= currentTop && scrollTop.value < nextTop
      }
      return false
    })

    if (children) currentName.value = toRef(children.exposed.name).value
    if (scrollTop.value === 0) currentName.value = ""
  }
}

linkChildren({ props, useProps, currentName })
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
    padding: 4rpx 8rpx;
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
