<template>
  <view class="ui-sticky" :style="[style]">
    <ui-resize width="100%" :disabled="sticky" @resize="onResize">
      <view class="ui-sticky__body" :style="[bodyStyle]" :class="[customClass]">
        <slot />
      </view>
    </ui-resize>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { stickyEmits, stickyProps } from "./index"
import { useRect, useColor, useStyle, useUnitToPx } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-sticky" })

// 定义props和emits
const props = defineProps(stickyProps)
const emits = defineEmits(stickyEmits)

// 响应式状态
const sticky = ref(false) // 是否处于粘性状态
const bodyHeight = ref("auto") // 主体高度
const navbarHeight = ref<number>(0) // 导航栏高度
const instance = getCurrentInstance()

// 计算样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex
  style.minHeight = bodyHeight.value
  return useStyle(style)
})

// 计算主体样式
const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  style.top = `${useUnitToPx(props.offsetTop) + navbarHeight.value}px`
  style.minHeight = bodyHeight.value
  style.background = useColor(props.background)
  if (sticky.value) style.position = "fixed"
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 监听粘性状态变化
watch(
  () => sticky.value,
  (val) => emits("change", val),
  { immediate: true },
)

// 处理大小调整
function onResize(rect: any) {
  bodyHeight.value = `${rect.height}px`
}

// 处理滚动
function onScroll() {
  useRect(".ui-sticky", instance).then((rect: any) => {
    if (rect) {
      sticky.value = rect.top < useUnitToPx(props.offsetTop)
    }
  })
}

// 调整大小
async function resize() {
  await nextTick()
  // #ifdef WEB
  const head: HTMLElement = document.querySelector(".uni-page-head")
  if (head) {
    navbarHeight.value = head.offsetHeight
  }
  // #endif
}

onMounted(resize)
onPageScroll(onScroll)
defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-sticky",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-sticky {
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  position: sticky;

  &__body {
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
