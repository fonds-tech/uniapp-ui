<template>
  <view class="ui-header" role="banner" :class="[props.customClass]">
    <view class="ui-header__content" :class="{ 'safe-area-inset-top': props.safeAreaInsetTop }" :style="[innerStyle]">
      <ui-resize width="100%" @resize="resize">
        <slot />
      </ui-resize>
    </view>
    <view class="ui-header__placeholder" :style="[placeholderStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { headerEmits, headerProps } from "./index"
import { useMitt, useRect, useColor, useStyle, useUnitToPx, useSystemInfo } from "../hooks"
import { ref, computed, nextTick, onMounted, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-header" })

const props = defineProps(headerProps)
const emits = defineEmits(headerEmits)
const mitt = useMitt()
const sys = useSystemInfo()
const instance = getCurrentInstance()

const rect = ref<UniApp.NodeInfo>({})
const uiNavbarHeight = ref(0)
// H5 windowTop（顶部原生 navbar 高度，仅 H5 有意义）
const h5NavbarHeight = ref(0)

const innerStyle = computed(() => {
  const style: CSSProperties = {
    zIndex: props.zIndex,
    top: `calc(${uiNavbarHeight.value}px + ${h5NavbarHeight.value}px + ${useUnitToPx(props.offset)}px)`,
    background: useColor(props.background),
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const placeholderStyle = computed<CSSProperties>(() => ({
  height: rect.value?.height ? `${rect.value.height}px` : "",
}))

// 跨组件：navbar 高度变化 → header 自动避让
function onNavbarRect(r: UniApp.NodeInfo) {
  if (r?.height) uiNavbarHeight.value = r.height
}

async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-header__content", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
}

onMounted(() => {
  // #ifdef WEB
  h5NavbarHeight.value = sys.windowTop ?? 0
  // #endif
  mitt.on("navbar:rect", onNavbarRect)
  resize()
})

onUnmounted(() => {
  mitt.off("navbar:rect", onNavbarRect)
})

defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-header",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-header {
  width: 100%;
  position: relative;

  &__content {
    left: 0;
    width: 100%;
    z-index: var(--ui-z-index-fixed);
    position: fixed;
  }
}
</style>
