<template>
  <view class="ui-header" :class="[customClass]">
    <view class="ui-header__content" :class="{ 'safe-area-inset-top': safeAreaInsetTop }" :style="[style]">
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
import { useMitt, useRect, useColor, useStyle, useUnitToPx } from "../hooks"
import { ref, toRefs, computed, nextTick, onMounted, onBeforeMount, getCurrentInstance } from "vue"

// 定义组件名称
defineOptions({ name: "ui-header" })

// 定义 props 和 emits
const props = defineProps(headerProps)
const emits = defineEmits(headerEmits)

// mitt 事件总线实例
const mitt = useMitt()

// 解构常用属性
const { customClass, safeAreaInsetTop } = toRefs(props)

// 内容区域布局信息
const rect = ref<UniApp.NodeInfo>({})
// 导航栏高度
const uiNavbarHeight = ref(0)
// H5 平台导航栏高度
const h5NavbarHeight = ref(0)

// 当前组件实例
const instance = getCurrentInstance()

// 内容区域样式，设置层级、定位和背景色
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex
  style.top = `calc(${uiNavbarHeight.value}px + ${h5NavbarHeight.value}px + ${useUnitToPx(props.offset)}px)`
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 占位元素样式，用于保持页面内容位置
const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  if (rect.value?.height) {
    style.height = `${rect.value.height}px`
  }
  return useStyle(style)
})

// 初始化，获取 H5 平台导航栏高度
function init() {
  // #ifdef WEB
  const { windowTop } = uni.getSystemInfoSync()
  h5NavbarHeight.value = windowTop
  // #endif
}

// 重新计算内容区域尺寸并触发事件
async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-header__content", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
}

// 监听导航栏尺寸变化事件
function onEvent() {
  mitt?.on("navbar:rect", (rect: UniApp.NodeInfo) => {
    if (rect.height) {
      uiNavbarHeight.value = rect.height
    }
  })
}

onMounted(() => {
  init()
  resize()
})
onBeforeMount(onEvent)

// 暴露方法供外部调用
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
