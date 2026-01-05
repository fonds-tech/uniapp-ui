<template>
  <view class="ui-footer">
    <view class="ui-footer__inner" :style="[style]" :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }">
      <ui-resize width="100%" @resize="resize">
        <slot />
      </ui-resize>
    </view>
    <view class="ui-footer__placeholder" :style="[placeholderStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { footerEmits, footerProps, useFooterProps } from "./index"
import { useMitt, useRect, useColor, useStyle, usePxToRpx, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-footer" })

const props = defineProps(footerProps)
const emits = defineEmits(footerEmits)
const useProps = useFooterProps(props)
const mitt = useMitt()
const rect = ref<UniApp.NodeInfo>({ height: 0 })
const tabbarHeight = ref(0)
const instance = getCurrentInstance()

const style = computed(() => {
  const style: CSSProperties = {}
  style.position = "fixed"
  style.zIndex = useProps.zIndex
  style.bottom = `${tabbarHeight.value + useUnitToPx(useProps.offset)}px`
  style.background = useColor(useProps.background)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${usePxToRpx(rect.value.height)}rpx`
  return useStyle(style)
})

function onEvent() {
  mitt.on("ui-tabbar:rect", (rect: UniApp.NodeInfo) => {
    if (rect) tabbarHeight.value = rect.height
  })
}

async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-footer__inner", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
  mitt.emit("ui-tabbar:rect:get", (rect: UniApp.NodeInfo) => {
    if (rect) tabbarHeight.value = rect.height
  })
}

onEvent()
onMounted(resize)
defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-footer",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-footer {
  z-index: 100;
  position: relative;
  margin-top: auto;

  &__inner {
    left: 0;
    width: 100%;
    background-color: #ffffff;
  }
}
</style>
