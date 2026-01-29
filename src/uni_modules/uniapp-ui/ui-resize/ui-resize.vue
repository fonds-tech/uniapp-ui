<template>
  <view class="ui-resize" :style="[style]">
    <view :id="id" class="ui-resize__content" :style="[contentStyle]" :class="[customClass]">
      <slot />
      <scroll-view class="ui-resize__trigger" scroll-y scroll-x :scroll-top="expandScrollTop" :scroll-left="expandScrollLeft" @scroll="onExpandScroll">
        <view class="ui-resize__placeholder" style="height: 100000px; width: 100000px" />
      </scroll-view>
      <scroll-view class="ui-resize__trigger" scroll-y scroll-x :scroll-top="shrinkScrollTop" :scroll-left="shrinkScrollLeft" @scroll="onShrinkScroll">
        <view class="ui-resize__placeholder" style="height: 250%; width: 250%" />
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { pick, uuid } from "../utils/utils"
import { resizeEmits, resizeProps } from "./index"
import { useRect, useUnit, useStyle } from "../hooks"
import { ref, computed, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-resize" })

const props = defineProps(resizeProps)
const emits = defineEmits(resizeEmits)
// 响应式状态
const width = ref(0)
const height = ref(0)
const expandScrollTop = ref(0)
const shrinkScrollTop = ref(0)
const expandScrollLeft = ref(0)
const shrinkScrollLeft = ref(0)

const id = ref<string>(`resize-${uuid()}`)
const instance = getCurrentInstance()

// 根容器样式：设置动态宽高
const style = computed(() => {
  const style: CSSProperties = {}
  style.width = props.width ? useUnit(props.width) : `${width.value}px`
  style.height = props.height ? useUnit(props.height) : `${height.value}px`
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 内容容器样式：仅在有初始值时设置
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = props.width ? useUnit(props.width) : undefined
  style.height = props.height ? useUnit(props.height) : undefined
  return useStyle(style)
})

// 滚动处理函数（闭包方式，在 onMounted 中初始化）
let onScrollHandler = () => {}

// 滚动到底部，确保能检测到尺寸变化
function scrollToBottom(lastWidth: number, lastHeight: number) {
  expandScrollTop.value = 100000 + lastHeight
  shrinkScrollTop.value = 2.5 * height.value + lastHeight
  expandScrollLeft.value = 100000 + lastWidth
  shrinkScrollLeft.value = 2.5 * width.value + lastWidth
}

// 触发 resize 事件
function emitResize(rect: UniApp.NodeInfo) {
  emits("resize", pick(rect, ["top", "left", "right", "bottom", "width", "height"]))
}

onMounted(async () => {
  // 获取初始尺寸
  const rect = await useRect(`#${id.value}`, instance)

  // 闭包保存上次尺寸，避免额外的 ref 开销
  let lastWidth = rect.width
  let lastHeight = rect.height
  let scrollEventCount = 0

  // 立即填充容器宽高
  width.value = lastWidth
  height.value = lastHeight

  // 定义滚动处理函数（闭包方式）
  onScrollHandler = async () => {
    // 禁用状态下不处理
    if (props.disabled) return

    const rect = await useRect(`#${id.value}`, instance)

    // 首次滚动事件触发时，通知用户初始尺寸
    if (scrollEventCount++ === 0) {
      emitResize(rect)
    }

    // 前两次滚动事件是初始化触发的，跳过处理
    if (scrollEventCount < 3) return

    // 获取新尺寸
    const newWidth = rect.width
    const newHeight = rect.height

    // 更新容器宽高
    width.value = newWidth
    height.value = newHeight

    // 检测宽高是否变化，合并触发（宽高同时变化只触发一次）
    let hasChange = false
    if (newWidth !== lastWidth) {
      lastWidth = newWidth
      hasChange = true
    }
    if (newHeight !== lastHeight) {
      lastHeight = newHeight
      hasChange = true
    }

    // 有变化时触发 resize 事件
    if (hasChange) {
      emitResize(rect)
    }

    // 滚动到底部，准备下次检测
    scrollToBottom(lastWidth, lastHeight)
  }

  // 初始化：滚动到底部
  scrollToBottom(lastWidth, lastHeight)
})

function onExpandScroll() {
  onScrollHandler()
}

function onShrinkScroll() {
  onScrollHandler()
}
</script>

<script lang="ts">
export default {
  name: "ui-resize",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style scoped lang="scss">
.ui-resize {
  position: relative;
  &__content {
    position: absolute;
    min-width: 1px;
    min-height: 1px;
  }
  &__trigger {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -9999;
    overflow: hidden;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
  }
  &__placeholder {
    animation: none;
    transition: 0s;
  }
}
</style>
