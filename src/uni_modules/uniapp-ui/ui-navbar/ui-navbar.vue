<template>
  <view class="ui-navbar" :class="[useProps.customClass]">
    <view class="ui-navbar__content" :style="[contentStyle]" :class="[contentClass]">
      <view class="ui-navbar__status-bar" :style="[statusBarStyle]" />
      <view class="ui-navbar__body" :style="[bodyStyle]">
        <!-- 左侧区域 -->
        <view class="ui-navbar__left">
          <view v-if="slots.left">
            <slot name="left" />
          </view>
          <view v-else-if="useProps.showBack" class="ui-navbar__back" @click="onClickBack">
            <slot name="back">
              <ui-icon :name="backIcon" :color="useProps.backIconColor" :size="useProps.backIconSize" />
            </slot>
            <view v-if="useProps.backText" class="ui-navbar__back__text" :style="[backTextStyle]">
              {{ useProps.backText }}
            </view>
          </view>
        </view>
        <!-- 标题区域（始终居中） -->
        <view v-if="useProps.title || slots.title" class="ui-navbar__title" :class="[titleClass]" :style="[titleStyle]" @click="onTitleClick">
          <slot name="title">
            <text class="ui-navbar__title__text">{{ useProps.title }}</text>
          </slot>
        </view>
        <view v-else-if="slots.default" class="ui-navbar__default">
          <slot />
        </view>
        <!-- 右侧区域 -->
        <view class="ui-navbar__right">
          <slot name="right" />
        </view>
      </view>
    </view>
    <!-- 渐变监听触发区：独立于 placeholder，始终存在于文档流中 -->
    <view v-if="useProps.gradient && useProps.fixed && !isNumber(useProps.scrollTop)" class="ui-navbar__gradient-trigger" :style="[gradientTriggerStyle]" />
    <!-- 占位元素 -->
    <view v-if="useProps.fixed && useProps.placeholder && !useProps.immersive" class="ui-navbar__placeholder" :style="[placeholderStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isNumber } from "../utils/check"
import { configProviderKey } from "../ui-config-provider"
import { navbarEmits, navbarProps, useNavbarProps } from "./index"
import { ref, watch, computed, nextTick, useSlots, onMounted, onUnmounted, getCurrentInstance } from "vue"
import { useRgb, useRect, useUnit, useColor, useStyle, useParent, usePxToRpx, useUnitToPx, useUnitToRpx, useSystemInfo } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-navbar" })

// 定义组件的 props 和 emits
const props = defineProps(navbarProps)
const emits = defineEmits(navbarEmits)
const useProps = useNavbarProps(props)
const slots = useSlots()
const { parent } = useParent(configProviderKey)

// 获取系统信息，用于后续计算
const systemInfo = useSystemInfo()
// #ifdef MP
// 获取胶囊按钮信息（仅在特定小程序平台可用）
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

// 定义响应式变量，用于存储导航栏的尺寸信息
const rect = ref<UniApp.NodeInfo>({})
// 左右侧最大宽度，用于限制标题宽度避免重叠
const sideMaxWidth = ref(0)
// 存储当前路由信息
const routes = ref<Page.PageInstance[]>([])
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
    // 先将主题色键名转换为实际颜色值，再解析 RGB
    const colorValue = useColor(useProps.background)
    const rgb = useRgb(colorValue)
    if (rgb) {
      const { r, g, b } = rgb
      const gradientHeightPx = useUnitToPx(useProps.gradientHeight) || 1
      const opacity = Math.min(1, innerScrollTop.value / gradientHeightPx)
      style.background = `rgba(${r},${g},${b},${opacity})`
    }
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

// 计算标题类名
const titleClass = computed(() => {
  const list: string[] = []
  if (useProps.centerTitle) list.push("is-center")
  return list
})

// 计算标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  // 居中模式下，通过 left/right 限制标题区域避免与左右内容重叠
  if (useProps.centerTitle && sideMaxWidth.value > 0) {
    const paddingPx = useUnitToPx(useProps.padding) || 0
    const marginPx = useUnitToPx("16rpx") // 对应 --ui-spacing-sm
    const offset = sideMaxWidth.value + paddingPx + marginPx
    style.left = `${offset}px`
    style.right = `${offset}px`
  }
  style.color = useColor(useProps.titleColor)
  style.fontSize = useUnit(useProps.titleSize)
  style.fontWeight = useProps.titleWeight
  return useStyle(style)
})

// 计算占位符样式，用于固定定位时
const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${navbarHeight.value + usePxToRpx(statusBarHeight.value)}rpx`
  return useStyle(style)
})

// 计算渐变触发区样式
const gradientTriggerStyle = computed(() => {
  const style: CSSProperties = {}
  const gradientHeightPx = useUnitToPx(useProps.gradientHeight) || 200
  style.height = `${gradientHeightPx}px`
  // 使用负 margin 抵消高度，避免影响页面布局
  style.marginBottom = `-${gradientHeightPx}px`
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
const backIcon = computed(() => (routes.value.length === 1 ? useProps.homeIconName : useProps.backIconName))

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
 * 通过监听渐变触发区与视口的交叉比例来计算滚动进度
 */
function observeGradient() {
  // 如果已经通过 scrollTop prop 传入滚动值，则不需要 observer
  if (!useProps.gradient || !useProps.fixed || isNumber(useProps.scrollTop)) return

  clearObserver()

  const gradientHeightPx = useUnitToPx(useProps.gradientHeight) || 200
  // 创建更多阈值点实现平滑渐变（0, 0.01, 0.02, ..., 1）共 101 个点
  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100)

  createObserver(thresholds)
    .relativeToViewport({ top: 0 })
    .observe(".ui-navbar__gradient-trigger", (result) => {
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

// 更新左右区域最大宽度
async function updateSideWidth() {
  if (!useProps.centerTitle) return
  await nextTick()
  const [leftRect, rightRect] = await Promise.all([useRect(".ui-navbar__left", instance), useRect(".ui-navbar__right", instance)])
  sideMaxWidth.value = Math.max(leftRect?.width || 0, rightRect?.width || 0)
}

// 重新计算尺寸
async function resize() {
  await nextTick()
  routes.value = getCurrentPages()
  rect.value = await useRect(".ui-navbar__content", instance)
  await updateSideWidth()
  // 通过 mitt 广播尺寸信息，供 ui-header 等组件使用
  parent?.mitt.emit("navbar:rect", rect.value)
  emits("rect", rect.value)
  emits("height", rect.value.height)
}

// 处理标题点击
function onTitleClick() {
  emits("titleClick")
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

  &__body {
    height: 100%;
    display: flex;
    padding: 0 var(--ui-spacing-md);
    position: relative;
    align-items: center;
    justify-content: space-between;
  }

  &__left {
    height: 100%;
    display: flex;
    z-index: 1;
    position: relative;
    align-items: center;
    flex-shrink: 0;
    margin-right: var(--ui-spacing-sm);
  }

  &__default {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__back {
    display: flex;
    align-items: center;

    &__text {
      padding-left: var(--ui-spacing-xs);
    }
  }

  &__title {
    flex: 1;
    display: flex;
    overflow: hidden;
    text-align: center;
    align-items: center;

    // 标题文本样式
    &__text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    // 标题居中模式：使用绝对定位实现真正的屏幕居中
    &.is-center {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      position: absolute;
      pointer-events: none;
      justify-content: center;

      // 允许内部内容响应点击
      > * {
        pointer-events: auto;
      }
    }
  }

  &__right {
    height: 100%;
    display: flex;
    z-index: 1;
    position: relative;
    align-items: center;
    flex-shrink: 0;
    margin-left: var(--ui-spacing-sm);
    justify-content: flex-end;
  }

  &__placeholder {
    width: 100%;
    flex-shrink: 0;
  }

  &__gradient-trigger {
    width: 100%;
    flex-shrink: 0;
    pointer-events: none;
  }
}
</style>
