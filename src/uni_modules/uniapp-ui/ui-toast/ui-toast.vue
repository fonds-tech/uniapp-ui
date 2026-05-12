<template>
  <view v-if="inited" class="ui-toast" :class="[rootClass, customClass]" :style="[rootStyle]">
    <slot>
      <view class="ui-toast__body" :class="[bodyClass]" :style="[bodyStyle]">
        <view v-if="hasIcon" class="ui-toast__icon" :style="[iconStyle]">
          <image v-if="isImage(mergedOptions.icon)" class="ui-toast__image" :src="mergedOptions.icon" mode="aspectFit" />
          <ui-icon v-else-if="mergedOptions.icon" :name="mergedOptions.icon" :size="iconRenderSize" color="text-inverse" />
          <view v-else-if="mergedOptions.type === 'loading'" class="ui-toast__loading" />
          <ui-icon v-else-if="builtInIcon" :name="builtInIcon" :size="iconRenderSize" color="text-inverse" />
        </view>
        <view v-if="mergedOptions.content" class="ui-toast__text">{{ mergedOptions.content }}</view>
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { ToastOptions } from "./index"
import type { CSSProperties } from "vue"
import { isImage, isString } from "../utils/check"
import { ref, watch, computed } from "vue"
import { toastEmits, toastProps, TOAST_TYPE_ICON_MAP } from "./index"
import { useUnit, useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-toast" })

const props = defineProps(toastProps)
const emits = defineEmits(toastEmits)

const transition = useTransition()

// 自动关闭定时器
const timer = ref<ReturnType<typeof setTimeout> | null>(null)
// 控制可见态（loading 状态机用）
const visible = ref(false)
// z-index 层级
const zIndex = ref<number>()
// 命令式调用入参（覆盖 props）
const commandOptions = ref<ToastOptions>({})

// 是否已初始化挂载
const inited = computed(() => (props.lazyRender ? transition.inited.value : true))
// 合并 props + commandOptions（commandOptions 优先）
const mergedOptions = computed(() => ({
  type: commandOptions.value.type ?? props.type,
  icon: commandOptions.value.icon ?? props.icon,
  mask: commandOptions.value.mask ?? props.mask,
  content: commandOptions.value.content ?? props.content,
  width: commandOptions.value.width ?? props.width,
  offset: commandOptions.value.offset ?? props.offset,
  iconSize: commandOptions.value.iconSize ?? props.iconSize,
  iconPrefix: commandOptions.value.iconPrefix ?? props.iconPrefix,
  duration: commandOptions.value.duration ?? props.duration,
  position: commandOptions.value.position ?? props.position,
  background: commandOptions.value.background ?? props.background,
}))
// 是否需要图标区
const hasIcon = computed(() => Boolean(mergedOptions.value.icon) || ["loading", "await", "success", "fail"].includes(mergedOptions.value.type as string))
// 内置 type 对应图标名
const builtInIcon = computed(() => {
  const t = mergedOptions.value.type as string
  return t in TOAST_TYPE_ICON_MAP ? TOAST_TYPE_ICON_MAP[t as keyof typeof TOAST_TYPE_ICON_MAP] : ""
})
// ui-icon 渲染尺寸（CSS var 兜底）
const iconRenderSize = computed(() => (mergedOptions.value.iconSize !== undefined ? useUnit(mergedOptions.value.iconSize) : "var(--ui-toast-icon-size)"))

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = zIndex.value
  style.display = transition.visible.value ? "flex" : "none"
  if (mergedOptions.value.position === "top") {
    style.alignItems = "flex-start"
    if (mergedOptions.value.offset !== undefined) style.paddingTop = useUnit(mergedOptions.value.offset)
  }
  if (mergedOptions.value.position === "bottom") {
    style.alignItems = "flex-end"
    if (mergedOptions.value.offset !== undefined) style.paddingBottom = useUnit(mergedOptions.value.offset)
  }
  return useStyle({ ...style, ...transition.styles.value })
})
// 根节点类名
const rootClass = computed(() => {
  const list = [transition.classs.value]
  if (mergedOptions.value.mask) list.push("ui-toast--mask")
  return list
})
// 主体样式
const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (mergedOptions.value.width !== undefined) style.maxWidth = useUnit(mergedOptions.value.width)
  if (mergedOptions.value.background) style.background = useColor(mergedOptions.value.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 主体类名（区分 type 与图标变体）
const bodyClass = computed(() => {
  const list: string[] = []
  if (visible.value) {
    list.push(`ui-toast__body--${mergedOptions.value.type}`)
    if (hasIcon.value) list.push("ui-toast__body--icon")
  }
  return list
})
// 图标容器尺寸
const iconStyle = computed(() => {
  const style: CSSProperties = {}
  if (mergedOptions.value.iconSize !== undefined) {
    const s = useUnit(mergedOptions.value.iconSize)
    style.width = s
    style.height = s
  }
  return useStyle(style)
})

transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", closed)

// props.show 双向绑定 → 内部 open/close
watch(
  () => props.show,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)

function initTransition() {
  transition.init({ name: "fade", duration: 300 })
}

// 启动自动关闭定时器
// loading 类型仅当 commandOptions 显式设了 duration 才启动；其他类型走 mergedOptions.duration
function startTimer() {
  clearTimer()
  const isLoading = mergedOptions.value.type === "loading"
  const explicitDuration = commandOptions.value.duration
  const useDuration = isLoading ? explicitDuration : mergedOptions.value.duration
  const duration = Number(useDuration) || 0
  if (duration > 0) {
    timer.value = setTimeout(() => close(), duration)
  }
}

// 清除定时器
function clearTimer() {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

// 打开
function open() {
  if (transition.visible.value) {
    startTimer()
    return
  }
  initTransition()
  zIndex.value = useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
  startTimer()
}

// 关闭
function close() {
  if (transition.visible.value) {
    clearTimer()
    transition.leave()
    emits("update:show", false)
  }
}

// 关闭动画结束
function closed() {
  visible.value = false
  commandOptions.value = {}
  emits("closed")
}

// 命令式 show（字符串作 content，对象作完整选项）
function show(options: string | ToastOptions = {}) {
  commandOptions.value = isString(options) ? { content: options } : { ...options }
  open()
}

// 命令式 hide
function hide() {
  close()
}

// 便捷方法
function success(options?: string | ToastOptions) {
  const opts = isString(options) ? { content: options } : options
  show({ ...opts, type: "success" })
}

function fail(options?: string | ToastOptions) {
  const opts = isString(options) ? { content: options } : options
  show({ ...opts, type: "fail" })
}

function loading(options?: string | ToastOptions) {
  const opts = isString(options) ? { content: options } : options
  show({ content: "加载中...", ...opts, type: "loading" })
}

function awaitFn(options?: string | ToastOptions) {
  const opts = isString(options) ? { content: options } : options
  show({ ...opts, type: "await" })
}

function text(options?: string | ToastOptions) {
  const opts = isString(options) ? { content: options } : options
  show({ ...opts, type: "default" })
}

defineExpose({ show, hide, open, close, success, fail, loading, await: awaitFn, text })
</script>

<script lang="ts">
export default {
  name: "ui-toast",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-toast {
  --ui-toast-bg: rgba(0, 0, 0, 0.7);
  --ui-toast-color: var(--ui-color-text-inverse);
  --ui-toast-radius: var(--ui-radius-md);
  --ui-toast-padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  --ui-toast-icon-size: 60rpx;
  --ui-toast-max-width: calc(100% - 160rpx);
  --ui-toast-icon-bg-size: 240rpx;
  --ui-toast-loading-color: var(--ui-color-text-inverse);
  --ui-toast-loading-track: var(--ui-color-mask-light);
  --ui-toast-icon-bg-padding: var(--ui-spacing-lg);

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  pointer-events: none;
  justify-content: center;

  &--mask {
    pointer-events: auto;
  }

  &__body {
    display: flex;
    padding: var(--ui-toast-padding);
    max-width: var(--ui-toast-max-width);
    background: var(--ui-toast-bg);
    align-items: center;
    border-radius: var(--ui-toast-radius);
    flex-direction: row;
    pointer-events: auto;
    justify-content: center;

    &--icon {
      width: var(--ui-toast-icon-bg-size);
      padding: var(--ui-toast-icon-bg-padding);
      min-height: var(--ui-toast-icon-bg-size);
      flex-direction: column;
    }
  }

  &__icon {
    width: var(--ui-toast-icon-size);
    height: var(--ui-toast-icon-size);
    display: flex;
    margin-bottom: var(--ui-spacing-sm);
    justify-content: center;
  }

  &__image {
    width: 100%;
    height: 100%;
  }

  &__loading {
    width: 100%;
    height: 100%;
    animation: rotate 1.2s linear infinite;
    border-color: var(--ui-toast-loading-color) var(--ui-toast-loading-track) var(--ui-toast-loading-track);
    border-style: solid;
    border-width: var(--ui-spacing-xs);
    border-radius: 50%;

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(1turn);
      }
    }
  }

  &__text {
    color: var(--ui-toast-color);
    max-width: 100%;
    word-wrap: break-word;
    text-align: center;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
}
</style>
