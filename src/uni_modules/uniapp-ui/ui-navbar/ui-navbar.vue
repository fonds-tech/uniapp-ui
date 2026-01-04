<template>
  <view class="ui-navbar" :class="[useProps.customClass]">
    <view class="ui-navbar__content" :style="[contentStyle]" :class="[contentClass]">
      <view class="ui-navbar__status-bar" :style="[statusBarStyle]" />
      <view class="ui-navbar__body" :style="[bodyStyle]">
        <view v-if="slots.left" class="ui-navbar__left">
          <slot name="left" />
        </view>
        <view v-else-if="useProps.isBack" class="ui-navbar__back" @click="onClickBack">
          <slot name="back">
            <ui-icon :name="backIcon" :color="useProps.backIconColor" :size="useProps.backIconSize" />
          </slot>
          <view v-if="useProps.backText" class="ui-navbar__back__text" :style="[backTextStyle]">
            {{ useProps.backText }}
          </view>
        </view>
        <view v-if="useProps.title || slots.title" class="ui-navbar__title" :style="[titleStyle]">
          <slot name="title">
            {{ useProps.title }}
          </slot>
        </view>
        <view v-else-if="slots.default" class="ui-navbar__default">
          <slot />
        </view>
        <view v-if="slots.right" class="ui-navbar__right">
          <slot name="right" />
        </view>
      </view>
    </view>
    <view class="ui-navbar__placeholder" :style="[placeholderStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isNumber } from "../utils/check"
import { navbarEmits, navbarProps, useNavbarProps } from "./index"
import { useRgb, useRect, useUnit, useColor, useStyle, usePxToRpx, useUnitToPx, useUnitToRpx, useSystemInfo } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-navbar" })

// 定义组件的 props 和 emits
const props = defineProps(navbarProps)
const emits = defineEmits(navbarEmits)
const useProps = useNavbarProps(props)
const slots = useSlots()

// 获取系统信息，用于后续计算
const systemInfo = useSystemInfo()
// #ifdef MP
// 获取胶囊按钮信息（仅在特定小程序平台可用）
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

// 定义响应式变量，用于存储导航栏的尺寸信息
const rect = ref<UniApp.NodeInfo>({})
// 存储当前路由信息
const routes = ref([])
// 存储滚动位置，用于渐变效果
const innerScrollTop = ref(0)
// IntersectionObserver 观察器列表
const observerList = ref<UniApp.IntersectionObserver[]>([])

const instance = getCurrentInstance()

// 计算导航栏内容的样式
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = useProps.zIndex
  style.background = useColor(useProps.background)
  // 如果启用了渐变效果，根据滚动位置计算背景颜色
  if (useProps.gradient && useProps.background) {
    const { r, g, b } = useRgb(useProps.background)
    style.background = `rgba(${r},${g},${b},${innerScrollTop.value / useUnitToPx(useProps.gradientHeight)})`
  }
  return useStyle(style)
})

// 计算导航栏内容的类名
const contentClass = computed(() => {
  const list: string[] = []
  if (useProps.fixed) list.push("is-fixed")
  if (useProps.borderBottom) list.push("is-border")
  return list
})

// 计算状态栏样式
const statusBarStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${statusBarHeight.value}px`
  return useStyle(style)
})

// 计算导航栏主体样式
const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${navbarHeight.value}rpx`
  style.paddingLeft = useUnit(useProps.padding)
  style.paddingRight = useUnit(useProps.padding)

  // #ifdef MP
  // 在小程序中，调整右侧边距以适应胶囊按钮
  style.marginRight = `${systemInfo.windowWidth - (menuButtonInfo.left || 0)}px`

  // #endif
  if (useProps.height) style.alignItems = "flex-start"
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 计算返回按钮文本样式
const backTextStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.backTextColor)
  style.fontSize = useUnit(useProps.backTextSize)
  style.fontWeight = useProps.backTextWeight
  return useStyle(style)
})

// 计算标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  if (useProps.titleCenter) {
    // #ifndef MP
    const titleWidth = useUnitToPx(useProps.titleWidth ?? "376rpx")
    // 非小程序平台的居中逻辑
    style.left = `${(systemInfo.windowWidth - titleWidth) / 2}px`
    style.right = `${(systemInfo.windowWidth - titleWidth) / 2}px`
    style.width = `${titleWidth}px`
    // #endif
    // #ifdef MP
    // 小程序平台的居中逻辑，考虑胶囊按钮的位置
    const mpTitleWidth = useUnitToPx(useProps.titleWidth ?? 300)
    const rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
    style.left = `${(systemInfo.windowWidth - mpTitleWidth) / 2}px`
    style.right = `${rightButtonWidth - (systemInfo.windowWidth - mpTitleWidth) / 2 + rightButtonWidth}px`
    style.width = `${mpTitleWidth}px`
    // #endif
    style.position = "absolute"
    style.justifyContent = "center"
  }

  style.color = useProps.titleColor
  style.fontSize = useProps.titleSize
  style.fontWeight = useProps.titleWeight
  return useStyle(style)
})

// 计算占位符样式，用于固定定位时
const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = 0
  if (useProps.fixed && !useProps.immersive) style.height = `${navbarHeight.value + usePxToRpx(statusBarHeight.value)}rpx`
  return useStyle(style)
})

// 计算导航栏高度
const navbarHeight = computed(() => {
  let height = 88
  // #ifdef MP
  // 小程序中，根据胶囊按钮高度计算
  height = usePxToRpx(menuButtonInfo.height + 1) + 24
  // #endif
  return useProps.height ? useUnitToRpx(useProps.height) : height
})

// 计算状态栏高度
const statusBarHeight = computed(() => {
  let height = systemInfo.statusBarHeight
  // #ifdef MP
  // 小程序中，根据胶囊按钮位置计算
  height = menuButtonInfo.top - 1 - useUnitToPx(12)
  // #endif
  return height
})

// 计算返回图标，根据路由层级决定显示首页图标还是返回图标
const backIcon = computed(() => (routes.value.length === 1 ? "home" : useProps.backIconName))

watch(
  () => useProps.scrollTop,
  (val) => {
    if (isNumber(val)) {
      innerScrollTop.value = val
      if (useProps.gradient) {
        emits("gradient", val)
      }
    }
  },
  { immediate: true },
)

// 清除所有观察器
function clearObserver() {
  while (observerList.value.length > 0) {
    observerList.value.pop()?.disconnect()
  }
}

// 创建观察器
function createObserver(thresholds: number[] = [0, 1]) {
  const observer = uni.createIntersectionObserver(instance, { thresholds })
  observerList.value.push(observer)
  return observer
}

/**
 * 使用 IntersectionObserver 监听滚动，实现渐变效果
 * 通过监听一个虚拟区域与视口的交叉比例来估算滚动进度
 */
function observeGradient() {
  if (!useProps.gradient || isNumber(useProps.scrollTop)) return

  clearObserver()

  const gradientHeightPx = useUnitToPx(useProps.gradientHeight)
  // 创建多个阈值点，实现平滑渐变（0, 0.05, 0.1, ..., 1）
  const thresholds = Array.from({ length: 21 }, (_, i) => i / 20)

  createObserver(thresholds)
    .relativeToViewport({ bottom: -(systemInfo.windowHeight - gradientHeightPx) })
    .observe(".ui-navbar__placeholder", (result) => {
      // 根据交叉比例计算滚动进度
      // intersectionRatio: 1 表示完全可见（未滚动），0 表示完全不可见（已滚动过渐变区域）
      const ratio = 1 - (result.intersectionRatio ?? 1)
      const scrollTop = ratio * gradientHeightPx
      innerScrollTop.value = Math.max(0, Math.min(scrollTop, gradientHeightPx))
      emits("gradient", innerScrollTop.value)
    })
}

// 设置事件监听
function onEvent() {
  // 监听获取导航栏尺寸的事件（保留 mitt 用于组件间通信）
  // 初始化渐变监听
  if (useProps.gradient) {
    nextTick(() => observeGradient())
  }
}

// 重新计算尺寸
async function resize() {
  await nextTick()
  routes.value = getCurrentPages()
  rect.value = await useRect(".ui-navbar__content", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
}

// 处理返回按钮点击
function onClickBack() {
  emits("back")
  if (typeof useProps.customBack === "function") {
    // 如果有自定义返回函数，则调用它
    useProps.customBack()
  } else {
    if (routes.value.length === 1) {
      // 如果只有一个页面，则跳转到首页
      const homePath = useProps.homePath
      const homeType = useProps.homeType

      // 根据类型选择跳转方式
      if (homeType === "tab") {
        uni.switchTab({ url: homePath })
      } else {
        uni.reLaunch({ url: homePath })
      }
    } else {
      // 否则返回上一页
      uni.navigateBack()
    }
  }
}

onEvent()
onMounted(resize)
onUnmounted(() => clearObserver())
defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-navbar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-navbar {
  width: 100%;
  display: flex;
  z-index: var(--ui-z-index-fixed);
  position: relative;
  flex-direction: column;

  &__content {
    flex: 1;
    display: flex;
    position: relative;
    flex-direction: column;

    &.is-fixed {
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--ui-z-index-content);
      position: fixed;
    }

    &.is-border::before {
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      position: absolute;
      border-bottom: var(--ui-border-width) solid var(--ui-color-border);
    }
  }

  &__left {
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  &__body {
    height: 100%;
    display: flex;
    padding: 0 var(--ui-spacing-md);
    position: relative;
    align-items: center;
    justify-content: space-between;
  }

  &__default {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__back {
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: var(--ui-spacing-md);

    &--hover {
      opacity: 0.6;
    }

    &__text {
      padding-left: var(--ui-spacing-xs);
    }
  }

  &__title {
    flex: 1;
    overflow: hidden;
    text-align: center;
    flex-shrink: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__right {
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: flex-end;
  }

  &__placeholder {
    width: 100%;
    flex-shrink: 0;
  }
}
</style>
