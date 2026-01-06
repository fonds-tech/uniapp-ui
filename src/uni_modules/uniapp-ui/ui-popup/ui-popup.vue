<template>
  <view>
    <ui-overlay v-if="overlay" :show="visible" :duration="duration" :z-index="zIndex" :lazy-render="lazyRender" :custom-style="overlayStyle" @click="onClickOverlay" />
    <view v-if="inited" class="ui-popup" :style="[style]" :class="[classs, customClass]" @transitionend="transition.end" @touchmove.prevent.stop="noop">
      <view v-if="closeable" class="ui-popup__close" :class="[closeClass]" @click.stop="onClickClose">
        <slot name="close">
          <ui-icon :name="closeIcon" size="36rpx" color="#333333" hover-class="active-opacity" />
        </slot>
      </view>
      <ui-safe-area-top v-if="safeAreaInsetTop" />
      <slot name="header" />
      <scroll-view class="ui-popup__scroll" enable-flex scroll-y :style="[scrollViewStyle]" @click.stop="onClickBody">
        <slot />
      </scroll-view>
      <slot name="footer" />
      <ui-safe-area-bottom v-if="safeAreaInsetBottom" />
      <slot name="outside" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { TransitionName } from "../hooks"
import { noop } from "../utils/utils"
import { isNumber } from "../utils/check"
import { popupEmits, popupProps, usePopupProps } from "./index"
import { useUnit, useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-popup" })

// 定义props和emits
const props = defineProps(popupProps)
const emits = defineEmits(popupEmits)
const useProps = usePopupProps(props)
// 使用transition hook
const transition = useTransition()

// 定义响应式变量
const zIndex = ref<number>() // 弹出层的z-index
const action = ref("show") // 当前动作,用于关闭时的事件传递
const visible = ref(false) // 控制弹出层的可见性
const windowBottom = ref(0) // 窗口底部安全区域高度

// 计算属性: 是否已初始化
const inited = computed(() => !useProps.lazyRender || transition.inited.value)

// 为transition的各个阶段绑定事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close", action.value))
transition.on("after-leave", () => emits("closed", action.value))

// 计算弹出层的样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = zIndex.value
  style.background = useColor(useProps.background)
  style["--ui-popup-border-radius"] = useUnit(useProps.borderRadius)
  // 当mode为bottom时，设置底部偏移以避免被系统底部状态栏遮挡
  // #ifdef WEB
  if (useProps.mode === "bottom" && windowBottom.value > 0) {
    style.bottom = `${windowBottom.value}px`
  }
  // #endif
  return useStyle({ ...style, ...useStyle(useProps.customStyle), ...transition.styles.value })
})

// 计算弹出层的类名
const classs = computed(() => {
  const list: string[] = [`ui-popup--${useProps.mode}`, transition.classs.value]
  return list
})

// 计算关闭图标的类名
const closeClass = computed(() => {
  const list: string[] = []
  const positions = { top: "top-right", right: "top-left", bottom: "top-right", left: "top-right" }
  if (useProps.closeIconPosition) list.push(`ui-popup__close--${useProps.closeIconPosition}`)
  else list.push(`ui-popup__close--${positions[useProps.mode]}`)
  return list
})

// 计算滚动视图的样式
const scrollViewStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(useProps.width)
  style.height = useUnit(useProps.height)
  style.maxWidth = useUnit(useProps.maxWidth)
  style.maxHeight = useUnit(useProps.maxHeight)
  return useStyle(style)
})

// 监听show属性变化,控制弹出层的显示和隐藏
watch(
  () => useProps.show,
  (val) => {
    if (val) open()
    else close("show")
  },
  { immediate: true },
)

// 监听mode和duration属性变化,重新初始化transition
watch(() => [useProps.mode, useProps.duration], initTransition, { immediate: true })

// 初始化transition
function initTransition() {
  const modes = { top: "slide-down", left: "slide-left", right: "slide-right", bottom: "slide-up", center: "fade" }
  transition.init({ name: modes[useProps.mode] as TransitionName, duration: useProps.duration })
}

// 打开弹出层
function open() {
  if (transition.visible.value) return
  initTransition()
  zIndex.value = isNumber(useProps.zIndex) ? +useProps.zIndex : useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
}

// 关闭弹出层
function close(a = "show") {
  if (transition.visible.value) {
    action.value = a
    visible.value = false
    transition.leave()
    emits("update:show", false)
  }
}

// 点击关闭图标时的处理函数
function onClickClose() {
  close("close")
  emits("clickClose")
}

// 点击弹出层主体时的处理函数
function onClickBody() {
  emits("click")
}

// 点击遮罩层时的处理函数
function onClickOverlay() {
  if (useProps.closeOnClickOverlay) {
    close("overlay")
  }
  emits("clickOverlay")
}

// 获取窗口底部安全区域高度
function getWindowBottom() {
  if (useProps.mode !== "bottom") return
  // #ifdef MP-WEIXIN
  try {
    const windowInfo = uni.getWindowInfo()
    windowBottom.value = windowInfo.windowBottom || 0
  } catch (e) {
    windowBottom.value = 0
  }
  // #endif
  // #ifndef MP-WEIXIN
  uni.getSystemInfo({
    success: (res) => {
      windowBottom.value = res.windowBottom || 0
    },
    fail: () => {
      windowBottom.value = 0
    },
  })
  // #endif
}

onMounted(() => {
  getWindowBottom()
})

defineExpose({ open, close })
</script>

<script lang="ts">
export default {
  name: "ui-popup",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-popup {
  --ui-popup-border-radius: var(--ui-radius-xl);
  overflow: hidden;
  position: fixed;
  max-width: 100vw;
  max-height: 100vh;
  background-color: var(--ui-color-background);
  transition-duration: var(--ui-transition-duration);

  &__scroll {
    max-height: 80vh;
  }

  &__close {
    z-index: var(--ui-z-index-absolute);
    position: absolute;

    &--top-left {
      top: var(--ui-spacing-xl);
      left: var(--ui-spacing-xl);
    }

    &--top-right {
      top: var(--ui-spacing-xl);
      right: var(--ui-spacing-xl);
    }

    &--bottom-left {
      left: var(--ui-spacing-xl);
      bottom: var(--ui-spacing-xl);
    }

    &--bottom-right {
      right: var(--ui-spacing-xl);
      bottom: var(--ui-spacing-xl);
    }
  }

  &--top {
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: var(--ui-popup-border-radius);
    border-bottom-right-radius: var(--ui-popup-border-radius);
  }

  &--left {
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    border-top-right-radius: var(--ui-popup-border-radius);
    border-bottom-right-radius: var(--ui-popup-border-radius);
  }

  &--right {
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    border-top-left-radius: var(--ui-popup-border-radius);
    border-bottom-left-radius: var(--ui-popup-border-radius);
  }

  &--bottom {
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    border-top-left-radius: var(--ui-popup-border-radius);
    border-top-right-radius: var(--ui-popup-border-radius);
  }

  &--center {
    top: 50%;
    left: 0;
    right: 0;
    width: fit-content;
    margin: 0 auto;
    transform: translateY(-50%);
    border-radius: var(--ui-popup-border-radius);
  }
}
</style>
