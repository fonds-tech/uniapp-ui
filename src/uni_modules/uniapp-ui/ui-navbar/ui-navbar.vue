<template>
  <view class="ui-navbar" :class="[props.customClass]" :style="[rootStyle]">
    <view class="ui-navbar__content" :class="{ 'is-fixed': props.fixed, 'is-border': props.borderBottom }" :style="[contentStyle]">
      <view class="ui-navbar__status-bar" :style="[statusBarStyle]" />
      <view class="ui-navbar__body" :style="[bodyStyle]">
        <view class="ui-navbar__left">
          <slot name="left">
            <view v-if="props.showBack" class="ui-navbar__back" @click="onClickBack">
              <slot name="back">
                <ui-icon :name="backIcon" :color="resolvedBackIconColor" :size="props.backIconSize" />
              </slot>
              <view v-if="props.backText" class="ui-navbar__back__text">
                {{ props.backText }}
              </view>
            </view>
          </slot>
        </view>

        <view class="ui-navbar__title" :class="{ 'is-center': props.centerTitle }" :style="[titleStyle]" @click="onTitleClick">
          <slot name="title">
            <text v-if="props.title" class="ui-navbar__title__text">{{ props.title }}</text>
          </slot>
        </view>

        <view class="ui-navbar__right">
          <slot name="right" />
        </view>
      </view>
    </view>

    <view v-if="props.gradient && props.fixed && !isNumber(props.scrollTop)" class="ui-navbar__gradient-trigger" :style="[gradientTriggerStyle]" />

    <view v-if="props.fixed && props.placeholder && !props.immersive" class="ui-navbar__placeholder" :style="[placeholderStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isNumber } from "../utils/check"
import { navbarEmits, navbarProps } from "./index"
import { ref, watch, computed, nextTick, onMounted, onUnmounted, getCurrentInstance } from "vue"
import { useRgb, useMitt, useRect, useUnit, useColor, useStyle, useUnitToPx, useUnitToRpx, useSystemInfo } from "../hooks"

defineOptions({ name: "ui-navbar" })

const props = defineProps(navbarProps)
const emits = defineEmits(navbarEmits)

const mitt = useMitt()
const systemInfo = useSystemInfo()

const instance = getCurrentInstance()

// #ifdef MP
// 胶囊按钮信息（小程序专用，setup 期单次取值）
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

// 导航栏内容尺寸缓存
const rect = ref<UniApp.NodeInfo>({})
// 标题居中模式下左侧偏移量
const leftOffset = ref(0)
// 标题居中模式下右侧偏移量
const rightOffset = ref(0)
// 当前页面栈
const routes = ref<Page.PageInstance[]>([])
// 内部滚动值（渐变联动）
const innerScrollTop = ref(0)
// IntersectionObserver 实例池
const observerList = ref<UniApp.IntersectionObserver[]>([])

// 状态栏高度
const statusBarHeight = computed(() => systemInfo.statusBarHeight)
// 返回图标：栈顶页用 home 图标，其余用返回图标
const backIcon = computed(() => (routes.value.length === 1 ? props.homeIconName : props.backIconName))
// 返回图标颜色：未传时回落到 CSS 变量（ui-icon 内部 inline，避免依赖 MP 跨组件 color 继承）
const resolvedBackIconColor = computed(() => props.backIconColor || "var(--ui-navbar-back-icon-color)")

// 导航栏 body 高度（小程序对齐胶囊；其他平台 44）
const navbarHeight = computed(() => {
  if (props.height) return useUnitToRpx(props.height)
  // #ifdef MP
  // 上下间隙对称：body 高度 = 胶囊高度 + 顶部间隙 * 2
  const gap = menuButtonInfo.top - statusBarHeight.value
  return menuButtonInfo.height + gap * 2
  // #endif
  // #ifndef MP
  return 44
  // #endif
})

// 根节点样式：所有可定制项通过 CSS var 注入
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.zIndex !== undefined) vars["--ui-navbar-z-index"] = props.zIndex
  if (props.padding !== undefined) vars["--ui-navbar-padding"] = useUnit(props.padding)
  if (props.titleColor) vars["--ui-navbar-title-color"] = useColor(props.titleColor)
  if (props.titleSize !== undefined) vars["--ui-navbar-title-size"] = useUnit(props.titleSize)
  if (props.titleWeight !== undefined) vars["--ui-navbar-title-weight"] = String(props.titleWeight)
  if (props.backIconColor) vars["--ui-navbar-back-icon-color"] = useColor(props.backIconColor)
  if (props.backTextColor) vars["--ui-navbar-back-text-color"] = useColor(props.backTextColor)
  if (props.backTextSize !== undefined) vars["--ui-navbar-back-text-size"] = useUnit(props.backTextSize)
  if (props.backTextWeight !== undefined) vars["--ui-navbar-back-text-weight"] = String(props.backTextWeight)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})

// content 背景：渐变模式下根据 scrollTop 计算 alpha
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.background) style.background = useColor(props.background)
  if (props.gradient && props.background) {
    const colorValue = useColor(props.background)
    const rgb = useRgb(colorValue)
    if (rgb) {
      const { r, g, b } = rgb
      const gradientHeightPx = useUnitToPx(props.gradientHeight) || 1
      const opacity = Math.min(1, innerScrollTop.value / gradientHeightPx)
      style.background = `rgba(${r},${g},${b},${opacity})`
    }
  }
  return useStyle(style)
})

// 状态栏占位高度（仅 fixed 时撑开）
const statusBarStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.fixed) style.height = `${statusBarHeight.value}px`
  return useStyle(style)
})

// body 高度 + 自定义高度时顶部对齐
const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${navbarHeight.value}px`
  // #ifdef MP
  // 小程序右侧需让出胶囊宽度：右 padding = 到胶囊距离 + 自定义 padding（与左侧对称）
  const menuOffset = systemInfo.windowWidth - menuButtonInfo.left
  const paddingPx = props.padding ? useUnitToPx(props.padding) || 0 : 0
  style.paddingRight = `${menuOffset + paddingPx}px`
  // #endif
  if (props.height) style.alignItems = "flex-start"
  return useStyle(style)
})

// 标题居中：通过左右偏移最大值定位，避免与左右内容重叠；垂直让出状态栏（fixed 时）
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.centerTitle) {
    const maxOffset = Math.max(leftOffset.value, rightOffset.value)
    if (maxOffset > 0) {
      style.left = `${maxOffset}px`
      style.right = `${maxOffset}px`
    }
    if (props.fixed) style.top = `${statusBarHeight.value}px`
  }
  return useStyle(style)
})

// 占位元素高度 = navbar + 状态栏
const placeholderStyle = computed(() => useStyle({ height: `${navbarHeight.value + statusBarHeight.value}px` }))

// 渐变触发区高度（用 IntersectionObserver 监测）：负 margin 抵消高度避免影响布局
const gradientTriggerStyle = computed(() => {
  const gradientHeightPx = useUnitToPx(props.gradientHeight)
  return useStyle({ height: `${gradientHeightPx}px`, marginBottom: `-${gradientHeightPx}px` })
})

watch(
  () => props.scrollTop,
  (val) => {
    if (isNumber(val)) {
      innerScrollTop.value = val
      if (props.gradient) emits("gradient", val)
    }
  },
  { immediate: true },
)

// 销毁所有 observer
function clearObserver() {
  while (observerList.value.length > 0) {
    observerList.value.pop()?.disconnect()
  }
}

// 创建 observer 并入池
function createObserver(thresholds: number[] = [0, 1]) {
  const observer = uni.createIntersectionObserver(instance, { thresholds })
  observerList.value.push(observer)
  return observer
}

// IntersectionObserver 监听渐变触发区，反推滚动比例
function observeGradient() {
  if (!props.gradient || !props.fixed || isNumber(props.scrollTop)) return

  clearObserver()

  const gradientHeightPx = useUnitToPx(props.gradientHeight) || 200
  // 0~1 共 101 个阈值点，确保渐变平滑
  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100)

  createObserver(thresholds)
    .relativeToViewport({ top: 0 })
    .observe(".ui-navbar__gradient-trigger", (result) => {
      const ratio = 1 - (result.intersectionRatio ?? 1)
      const scrollTop = ratio * gradientHeightPx
      innerScrollTop.value = Math.max(0, Math.min(scrollTop, gradientHeightPx))
      emits("gradient", innerScrollTop.value)
    })
}

// 重新测量并更新左右偏移、对外发尺寸事件
async function resize() {
  await nextTick()
  routes.value = getCurrentPages()
  rect.value = await useRect(".ui-navbar__content", instance)
  await updateSideWidth()
  mitt?.emit("navbar:rect", rect.value)
  emits("rect", rect.value)
  emits("height", rect.value.height)
}

// 标题居中模式下左右内容宽度测量
async function updateSideWidth() {
  if (!props.centerTitle) return
  await nextTick()

  const paddingPx = props.padding ? useUnitToPx(props.padding) || 0 : 0
  // --ui-spacing-sm 对应间距
  const marginPx = useUnitToPx("16rpx")

  const [leftRect, rightRect] = await Promise.all([useRect(".ui-navbar__left", instance), useRect(".ui-navbar__right", instance)])

  leftOffset.value = (leftRect?.width || 0) + paddingPx + marginPx

  // #ifdef MP
  // 小程序右侧含胶囊偏移
  const menuOffset = systemInfo.windowWidth - (menuButtonInfo.left || 0)
  rightOffset.value = menuOffset + paddingPx + (rightRect?.width || 0) + marginPx
  // #endif
  // #ifndef MP
  rightOffset.value = (rightRect?.width || 0) + paddingPx + marginPx
  // #endif
}

function onTitleClick() {
  emits("titleClick")
}

// 返回逻辑：自定义函数 > 栈顶时跳首页 > 普通后退
function onClickBack() {
  emits("back")
  if (typeof props.customBack === "function") {
    props.customBack()
    return
  }
  if (routes.value.length === 1) {
    if (!props.homePath) return
    if (props.homeType === "tab") {
      uni.switchTab({ url: props.homePath })
    } else {
      uni.reLaunch({ url: props.homePath })
    }
  } else {
    uni.navigateBack()
  }
}

onMounted(() => {
  resize()
  if (props.gradient) nextTick(() => observeGradient())
})
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
  --ui-navbar-padding: var(--ui-spacing-md);
  --ui-navbar-z-index: var(--ui-z-index-fixed);
  --ui-navbar-background: var(--ui-color-background);
  --ui-navbar-title-size: var(--ui-font-size-md);
  --ui-navbar-title-color: var(--ui-color-text);
  --ui-navbar-title-weight: var(--ui-font-weight-bold);
  --ui-navbar-back-text-size: var(--ui-font-size-md);
  --ui-navbar-back-icon-color: var(--ui-color-text);
  --ui-navbar-back-text-color: var(--ui-color-text);
  --ui-navbar-back-text-weight: inherit;

  width: 100%;
  display: flex;
  z-index: var(--ui-navbar-z-index);
  position: relative;
  flex-direction: column;

  &__content {
    flex: 1;
    display: flex;
    position: relative;
    background: var(--ui-navbar-background);
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
    padding: 0 var(--ui-navbar-padding);
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
    color: var(--ui-navbar-back-icon-color);
    display: flex;
    align-items: center;

    &__text {
      color: var(--ui-navbar-back-text-color);
      font-size: var(--ui-navbar-back-text-size);
      font-weight: var(--ui-navbar-back-text-weight);
      padding-left: var(--ui-spacing-xs);
    }
  }

  &__title {
    flex: 1;
    color: var(--ui-navbar-title-color);
    display: flex;
    overflow: hidden;
    font-size: var(--ui-navbar-title-size);
    text-align: center;
    align-items: center;
    font-weight: var(--ui-navbar-title-weight);

    &__text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    // 居中模式：绝对定位真居中，左右内容用 pointer-events 让出点击
    &.is-center {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      position: absolute;
      pointer-events: none;
      justify-content: center;

      .ui-navbar__title__text {
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
