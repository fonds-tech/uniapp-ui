<template>
  <view class="ui-skeleton-image" :class="[classs, customClass]" :style="[style]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { skeletonKey } from "../ui-skeleton"
import { useRect, useUnit, useStyle, useParent } from "../hooks"
import { skeletonImageEmits, skeletonImageProps } from "./index"

defineOptions({ name: "ui-skeleton-image" })

const props = defineProps(skeletonImageProps)
const emits = defineEmits(skeletonImageEmits)
const { parent } = useParent(skeletonKey)

const instance = getCurrentInstance()

const rect = ref<UniApp.NodeInfo>({ width: 0, height: 0 })

const style = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width ?? props.size)
  style.height = useUnit(props.height ?? props.size)

  if (prop("square")) {
    style.height = `${rect.value.width}px`
  }
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (prop("square")) list.push("ui-skeleton-image--square")
  if (prop("animate")) list.push("ui-skeleton-image--animate")
  return list
})

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}

async function init() {
  rect.value = await useRect(".ui-skeleton-image", instance)
}

onMounted(init)
</script>

<script lang="ts">
export default {
  name: "ui-skeleton-image",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-skeleton-image {
  width: 100rpx;
  height: 100rpx;
  position: relative;
  border-radius: 16rpx;
  background-color: #f2f3f5;

  &--animate {
    animation: skeleton-blink 2s ease-in-out infinite;
  }

  @keyframes skeleton-blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 01;
    }
  }
}
</style>
