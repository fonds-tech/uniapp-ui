<template>
  <view class="ui-footer" role="contentinfo" :class="[props.customClass]">
    <view class="ui-footer__inner" :style="[innerStyle]">
      <ui-resize width="100%" @resize="resize">
        <slot />
      </ui-resize>
    </view>
    <view class="ui-footer__placeholder" :style="[placeholderStyle]" />
    <ui-safe-area-bottom v-if="props.safeAreaInsetBottom" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { footerEmits, footerProps } from "./index"
import { useMitt, useRect, useColor, useStyle, usePxToRpx, useUnitToPx } from "../hooks"
import { ref, computed, nextTick, onMounted, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-footer" })

const props = defineProps(footerProps)
const emits = defineEmits(footerEmits)
const mitt = useMitt()
const instance = getCurrentInstance()

const rect = ref<UniApp.NodeInfo>({ height: 0 })
const tabbarHeight = ref(0)

const innerStyle = computed(() => {
  const style: CSSProperties = {
    position: "fixed",
    zIndex: props.zIndex,
    bottom: `${tabbarHeight.value + useUnitToPx(props.offset)}px`,
    background: useColor(props.background),
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const placeholderStyle = computed<CSSProperties>(() => ({
  height: `${usePxToRpx(rect.value.height)}rpx`,
}))

// 跨组件：tabbar 高度变化广播 → footer 自动避让
function onTabbarRect(r: UniApp.NodeInfo) {
  if (r) tabbarHeight.value = r.height
}

async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-footer__inner", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
  // 主动询问 tabbar 当前 rect（callback 风格）
  mitt.emit("ui-tabbar:rect:get", onTabbarRect)
}

onMounted(() => {
  mitt.on("ui-tabbar:rect", onTabbarRect)
  resize()
})

onUnmounted(() => {
  mitt.off("ui-tabbar:rect", onTabbarRect)
})

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
  position: relative;
  margin-top: auto;

  &__inner {
    left: 0;
    width: 100%;
    background-color: var(--ui-color-text-inverse);
  }
}
</style>
