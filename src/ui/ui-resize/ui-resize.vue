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

defineOptions({ name: "ui-resize" })

const props = defineProps(resizeProps)
const emits = defineEmits(resizeEmits)

const width = ref(0)
const height = ref(0)
const oldWidth = ref(0)
const oldHeight = ref(0)
const expandScrollTop = ref(0)
const shrinkScrollTop = ref(0)
const expandScrollLeft = ref(0)
const shrinkScrollLeft = ref(0)
const scrollEventCount = ref(0)

const id = ref<string>(`resize-${uuid()}`)
const instance = getCurrentInstance()

const style = computed(() => {
  const style: CSSProperties = {}
  style.width = props.width ? useUnit(props.width) : `${width.value}px`
  style.height = props.height ? useUnit(props.height) : `${height.value}px`
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = props.width ?? useUnit(props.width)
  style.height = props.height ?? useUnit(props.height)
  return useStyle(style)
})

async function init() {
  const rect = await useRect(`#${id.value}`, instance)
  width.value = rect.width
  height.value = rect.height
  oldWidth.value = rect.width
  oldHeight.value = rect.height
  scrollToBottom()
}

async function resize() {
  if (props.disabled) return
  const rect = await useRect(`#${id.value}`, instance)
  let isEmit = false

  if (scrollEventCount.value++ === 0) isEmit = true

  if (rect.width !== oldWidth.value) {
    isEmit = true
    oldWidth.value = rect.width
  }

  if (rect.height !== oldHeight.value) {
    isEmit = true
    oldHeight.value = rect.height
  }

  if (isEmit) {
    width.value = rect.width
    height.value = rect.height
    emits("resize", pick(rect, ["top", "left", "right", "bottom", "width", "height"]))
  }

  scrollToBottom()
}

function scrollToBottom() {
  expandScrollTop.value = 100000 + oldHeight.value
  shrinkScrollTop.value = 3 * height.value + oldHeight.value
  expandScrollLeft.value = 100000 + oldWidth.value
  shrinkScrollLeft.value = 3 * width.value + oldWidth.value
}

function onExpandScroll(e: any) {
  resize()
}

function onShrinkScroll(e: any) {
  resize()
}

onMounted(init)
</script>

<script lang="ts">
export default {
  name: "ui-resize",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style scoped lang="scss">
.ui-resize {
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
