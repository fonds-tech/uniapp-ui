<template>
  <view class="ui-image" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <image
      class="ui-image__image"
      :src="src"
      :mode="mode"
      :webp="webp"
      :lazy-load="lazyLoad"
      :draggable="draggable"
      :show-menu-by-longpress="showMenuByLongpress"
      @load="onImageLoad"
      @error="onImageError"
    />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { osName } from "../utils/platform"
import { ref, watch, computed } from "vue"
import { imageEmits, imageProps } from "./index"
import { useRect, useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-image" })

const props = defineProps(imageProps)
const emits = defineEmits(imageEmits)

const error = ref(false)
const loading = ref(true)
const maxSize = ref(0)

const instance = getCurrentInstance()

const style = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  // #ifdef MP-WEIXIN
  if (osName === "ios" && props.square && maxSize.value > 0) {
    style.width = `${maxSize.value}px`
    style.height = `${maxSize.value}px`
  }
  // #endif
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list = []
  if (props.round) list.push("ui-image--round")
  if (props.block) list.push("ui-image--block")
  if (props.square) list.push("ui-image--square")
  return list
})

watch(() => [props.width, props.height, props.mode, props.src, props.square], resize)

async function resize() {
  if (osName === "ios" && props.square) {
    const size = await useRect(".ui-image", instance)
    maxSize.value = Math.max(size.width, size.height, 0)
  }
}

function onImageLoad(event: any) {
  loading.value = false
  emits("load", event)
}

function onImageError(event: any) {
  error.value = true
  emits("error", event)
}

function onClick(event: any) {
  emits("click", event)
}

onMounted(() => {
  resize()
})

defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-image",
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
.ui-image {
  display: flex;
  overflow: hidden;
  position: relative;

  &__image {
    width: 100%;
    height: 100%;
  }

  &--block {
    display: block;
  }

  &--round {
    border-radius: 9999px;
  }

  &--square {
    aspect-ratio: 1 / 1;
  }
}
</style>
