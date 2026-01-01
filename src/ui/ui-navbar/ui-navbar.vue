<template>
  <view class="ui-navbar" :class="[props.customClass]">
    <view class="ui-navbar__content" :style="[contentStyle]" :class="[contentClass]">
      <view class="ui-navbar__status-bar" :style="[statusBarStyle]" />
      <view class="ui-navbar__body" :style="[bodyStyle]">
        <view v-if="slots.left" class="ui-navbar__left">
          <slot name="left" />
        </view>
        <view v-else-if="props.isBack" class="ui-navbar__back" @click="onClickBack">
          <slot name="back">
            <ui-icon :name="backIcon" :color="props.backIconColor" :size="props.backIconSize" />
          </slot>
          <view v-if="props.backText" class="ui-navbar__back__text" :style="[backTextStyle]">
            {{ props.backText }}
          </view>
        </view>
        <view v-if="props.title || slots.title" class="ui-navbar__title" :style="[titleStyle]">
          <slot name="title">
            {{ props.title }}
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
import { navbarEmits, navbarProps } from "./index"
import { isEmpty, isNumber, isFunction } from "../utils/check"
import { useRgb, useMitt, useRect, useUnit, useColor, useStyle, usePxToRpx, useUnitToPx, useUnitToRpx, useSystemInfo } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-navbar" })

// 定义组件的 props 和 emits
const props = defineProps(navbarProps)
const emits = defineEmits(navbarEmits)
const slots = useSlots()

// 获取系统信息，用于后续计算
const systemInfo = useSystemInfo()
// #ifdef MP
// 获取胶囊按钮信息（仅在特定小程序平台可用）
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

// 使用 mitt 进行事件管理
const mitt = useMitt()
// 定义响应式变量，用于存储导航栏的尺寸信息
const rect = ref<UniApp.NodeInfo>({})
// 存储当前路由信息
const routes = ref([])
// 存储滚动位置，用于渐变效果
const innerScrollTop = ref(0)

const instance = getCurrentInstance()

// 计算导航栏内容的样式
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex
  style.background = useColor(props.background)
  // 如果启用了渐变效果，根据滚动位置计算背景颜色
  if (props.gradient && props.background) {
    const { r, g, b } = useRgb(props.background)
    style.background = `rgba(${r},${g},${b},${innerScrollTop.value / useUnitToPx(props.gradientHeight)})`
  }
  return useStyle(style)
})

// 计算导航栏内容的类名
const contentClass = computed(() => {
  const list: string[] = []
  if (props.fixed) list.push("is-fixed")
  if (props.borderBottom) list.push("is-border")
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
  style.paddingLeft = useUnit(props.padding)
  style.paddingRight = useUnit(props.padding)

  // #ifdef MP
  // 在小程序中，调整右侧边距以适应胶囊按钮
  style.marginRight = `${systemInfo.windowWidth - (menuButtonInfo.left || 0)}px`

  // #endif
  if (props.height) style.alignItems = "flex-start"
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 计算返回按钮文本样式
const backTextStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(props.backTextColor)
  style.fontSize = useUnit(props.backTextSize)
  style.fontWeight = props.backTextWeight
  return useStyle(style)
})

// 计算标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.titleCenter) {
    // #ifndef MP
    const titleWidth = useUnitToPx(props.titleWidth ?? "376rpx")
    // 非小程序平台的居中逻辑
    style.left = `${(systemInfo.windowWidth - titleWidth) / 2}px`
    style.right = `${(systemInfo.windowWidth - titleWidth) / 2}px`
    style.width = `${titleWidth}px`
    // #endif
    // #ifdef MP
    // 小程序平台的居中逻辑，考虑胶囊按钮的位置
    const mpTitleWidth = useUnitToPx(props.titleWidth ?? 300)
    const rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
    style.left = `${(systemInfo.windowWidth - mpTitleWidth) / 2}px`
    style.right = `${rightButtonWidth - (systemInfo.windowWidth - mpTitleWidth) / 2 + rightButtonWidth}px`
    style.width = `${mpTitleWidth}px`
    // #endif
    style.position = "absolute"
    style.justifyContent = "center"
  }

  style.color = props.titleColor
  style.fontSize = props.titleSize
  style.fontWeight = props.titleWeight
  return useStyle(style)
})

// 计算占位符样式，用于固定定位时
const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = 0
  if (props.fixed && !props.immersive) style.height = `${navbarHeight.value + usePxToRpx(statusBarHeight.value)}rpx`
  return useStyle(style)
})

// 计算导航栏高度
const navbarHeight = computed(() => {
  let height = 88
  // #ifdef MP
  // 小程序中，根据胶囊按钮高度计算
  height = usePxToRpx(menuButtonInfo.height + 1) + 24
  // #endif
  return props.height ? useUnitToRpx(props.height) : height
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
const backIcon = computed(() => (routes.value.length === 1 ? "wap-home-o" : props.backIconName))

watch(
  () => props.scrollTop,
  (val) => {
    if (isNumber(val)) {
      innerScrollTop.value = val
      if (props.gradient) {
        emits("gradient", val)
      }
    }
  },
  { immediate: true },
)

// 设置事件监听
function onEvent() {
  // 监听获取导航栏尺寸的事件
  mitt.on("navbar:rect:get", async (cb: any) => {
    const result = await useRect(".ui-navbar__content", instance)
    if (isFunction(cb)) cb(result)
  })

  const pages = getCurrentPages()
  const { route } = pages[pages.length - 1]

  // 监听滚动事件，用于渐变效果
  mitt.on(`scroll:${route}`, (options: { scrollTop: number }) => {
    if (props.gradient && isEmpty(props.scrollTop)) {
      innerScrollTop.value = options.scrollTop
      emits("gradient", options.scrollTop)
    }
  })
}

// 重新计算尺寸
async function resize() {
  await nextTick()
  routes.value = getCurrentPages()
  rect.value = await useRect(".ui-navbar__content", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
  mitt.emit("navbar:rect", rect.value)
}

// 处理返回按钮点击
function onClickBack() {
  emits("back")
  if (typeof props.customBack === "function") {
    // 如果有自定义返回函数，则调用它
    props.customBack()
  } else {
    if (routes.value.length === 1) {
      // 如果只有一个页面，则跳转到首页
      const homePath = props.homePath
      const homeType = props.homeType

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
