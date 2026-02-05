<template>
  <view class="ui-resize" :style="rootStyle">
    <view :id="resizeId" class="ui-resize__content" :style="contentStyle" :class="customClass">
      <slot />
      <scroll-view
        v-for="type in ['expand', 'shrink']"
        :key="type"
        class="ui-resize__trigger"
        scroll-y
        scroll-x
        :scroll-top="scrollPos[type].top"
        :scroll-left="scrollPos[type].left"
        @scroll="handleScroll"
      >
        <view :style="type === 'expand' ? 'height:100000px;width:100000px' : 'height:250%;width:250%'" />
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { pick, uuid } from "../utils/utils"
import { resizeEmits, resizeProps } from "./index"
import { useRect, useUnit, useStyle } from "../hooks"
import { computed, reactive, onMounted, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-resize" })

const props = defineProps(resizeProps)
const emit = defineEmits(resizeEmits)

const resizeId = `resize-${uuid()}`
const instance = getCurrentInstance()

const size = reactive({ width: 0, height: 0 })
const lastSize = reactive({ width: 0, height: 0 })
const scrollPos = reactive({
  expand: { top: 0, left: 0 },
  shrink: { top: 0, left: 0 },
})

let scrollCount = 0
let unmounted = false

const rootStyle = computed(() => {
  const style: CSSProperties = {
    width: props.width ? useUnit(props.width) : `${size.width}px`,
    height: props.height ? useUnit(props.height) : `${size.height}px`,
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const contentStyle = computed(() =>
  useStyle({
    width: props.width ? useUnit(props.width) : undefined,
    height: props.height ? useUnit(props.height) : undefined,
  }),
)

function resetScrollPos(w: number, h: number) {
  scrollPos.expand.top = 100000 + h
  scrollPos.expand.left = 100000 + w
  scrollPos.shrink.top = 4 * h
  scrollPos.shrink.left = 4 * w
}

function emitResize(rect: UniApp.NodeInfo) {
  emit("resize", pick(rect, ["top", "left", "right", "bottom", "width", "height"]))
}

async function handleScroll() {
  if (props.disabled || unmounted) return

  const rect = await useRect(`#${resizeId}`, instance)
  if (unmounted) return

  scrollCount++

  // 首次触发时通知初始尺寸
  if (scrollCount === 1) {
    emitResize(rect)
  }

  // 跳过初始化阶段的事件
  if (scrollCount < 3) return

  const { width: newW, height: newH } = rect

  size.width = newW
  size.height = newH

  if (newW !== lastSize.width || newH !== lastSize.height) {
    lastSize.width = newW
    lastSize.height = newH
    emitResize(rect)
  }

  resetScrollPos(newW, newH)
}

async function refresh() {
  if (unmounted || props.disabled) return
  const rect = await useRect(`#${resizeId}`, instance)
  if (unmounted) return

  size.width = rect.width
  size.height = rect.height
  lastSize.width = rect.width
  lastSize.height = rect.height
  emitResize(rect)
  resetScrollPos(rect.width, rect.height)
}

onMounted(async () => {
  const rect = await useRect(`#${resizeId}`, instance)

  size.width = rect.width
  size.height = rect.height
  lastSize.width = rect.width
  lastSize.height = rect.height

  resetScrollPos(rect.width, rect.height)
})

onUnmounted(() => {
  unmounted = true
})

defineExpose({ refresh })
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
}
</style>
