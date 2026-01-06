<template>
  <view v-if="inited" class="ui-toast" :style="[style]" :class="[classs]">
    <slot>
      <view class="ui-toast__body" :style="[bodyStyle]" :class="[bodyClass]">
        <view v-if="isShowIcon" class="ui-toast__icon" :style="[iconStyle]">
          <image v-if="isImage(mergedOptions.icon)" class="image" :src="mergedOptions.icon" mode="aspectFit" />
          <ui-icon v-else-if="mergedOptions.icon" :name="mergedOptions.icon" :size="mergedOptions.iconSize" color="#ffffff" />
          <view v-else-if="mergedOptions.type === 'loading'" class="loading" />
          <ui-icon v-else-if="['await', 'fail', 'success'].includes(mergedOptions.type)" :name="icons[mergedOptions.type]" :size="mergedOptions.iconSize" color="#ffffff" />
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
import { toastEmits, toastProps, useToastProps } from "./index"
import { useUnit, useStyle, useTransition, useGlobalZIndex } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-toast" })

// 定义props和emits
const props = defineProps(toastProps)
const emits = defineEmits(toastEmits)
const useProps = useToastProps(props)
// 使用transition hook
const transition = useTransition()

// 计算属性: 是否已初始化
const inited = computed(() => transition.inited.value)

// 定义响应式变量
const timer = ref<ReturnType<typeof setTimeout> | null>(null) // 用于存储定时器
const visible = ref(false) // 控制toast是否可见
const zIndex = ref<number>() // 存储z-index值
const icons: Record<string, string> = { await: "time-circle-fill", fail: "close-circle-fill", success: "check-circle-fill" } // 定义不同类型的图标
const commandOptions = ref<ToastOptions>({}) // 命令式调用时传入的选项

/**
 * 合并后的配置选项
 * 优先级：commandOptions > props
 * 命令式调用时 commandOptions 会覆盖 props
 */
const mergedOptions = computed(() => ({
  type: commandOptions.value.type ?? useProps.type,
  icon: commandOptions.value.icon ?? useProps.icon,
  mask: commandOptions.value.mask ?? useProps.mask,
  content: commandOptions.value.content ?? useProps.content,
  width: commandOptions.value.width ?? useProps.width,
  offset: commandOptions.value.offset ?? useProps.offset,
  iconSize: commandOptions.value.iconSize ?? useProps.iconSize,
  iconPrefix: commandOptions.value.iconPrefix ?? useProps.iconPrefix,
  duration: commandOptions.value.duration ?? useProps.duration,
  position: commandOptions.value.position ?? useProps.position,
  background: commandOptions.value.background ?? useProps.background,
}))

// 计算样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = zIndex.value
  style.display = transition.visible.value ? "flex" : "none"
  if (mergedOptions.value.position === "top") {
    style.alignItems = "flex-start"
    style.paddingTop = useUnit(mergedOptions.value.offset)
  }
  if (mergedOptions.value.position === "bottom") {
    style.alignItems = "flex-end"
    style.paddingBottom = useUnit(mergedOptions.value.offset)
  }
  return useStyle({ ...style, ...transition.styles.value })
})

// 计算class
const classs = computed(() => {
  const list: string[] = [transition.classs.value]
  if (mergedOptions.value.mask) list.push("ui-toast--mask")
  return list
})

// 计算body样式
const bodyStyle = computed(() => {
  const style: CSSProperties = {}
  style.maxWidth = useUnit(mergedOptions.value.width)
  style.background = mergedOptions.value.background
  if (isShowIcon.value) {
    style.padding = "32rpx"
    style.minWidth = "200rpx"
    style.maxWidth = useUnit(mergedOptions.value.width) || "250rpx"
    style.aspectRatio = "1 / 1"
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 计算body class
const bodyClass = computed(() => {
  const list: string[] = []
  if (visible.value) {
    list.push(`ui-toast__body--${mergedOptions.value.type}`)
    if (mergedOptions.value.icon) {
      list.push("ui-toast__body--icon")
    }
  }
  return list
})

// 计算图标样式
const iconStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(mergedOptions.value.iconSize)
  style.height = useUnit(mergedOptions.value.iconSize)
  return useStyle(style)
})

// 判断是否显示图标
const isShowIcon = computed(() => mergedOptions.value.icon || ["loading", "await", "success", "fail"].includes(mergedOptions.value.type))

// 监听transition的生命周期事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", closed)

// 监听 useProps.show 变化，支持声明式调用
watch(
  () => useProps.show,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)

// 初始化transition
function initTransition() {
  transition.init({ name: "fade", duration: 300 })
}

/**
 * 打开 toast
 * 内部方法，被 show() 和 useProps.show 监听调用
 */
function open() {
  if (transition.visible.value) return
  initTransition()
  zIndex.value = useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
  // 设置自动关闭定时器
  startTimer()
}

/**
 * 关闭 toast
 * 内部方法，被 hide() 和 useProps.show 监听调用
 */
function close() {
  if (transition.visible.value) {
    clearTimer()
    visible.value = false
    transition.leave()
    emits("update:show", false)
  }
}

/**
 * 启动自动关闭定时器
 */
function startTimer() {
  clearTimer()
  const duration = +mergedOptions.value.duration
  // loading 类型默认不自动关闭（除非显式设置了 duration）
  const isLoadingWithoutDuration = mergedOptions.value.type === "loading" && !commandOptions.value.duration && !useProps.duration
  if (duration > 0 && !isLoadingWithoutDuration) {
    timer.value = setTimeout(() => {
      close()
    }, duration)
  }
}

/**
 * 清除定时器
 */
function clearTimer() {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

/**
 * toast 关闭动画结束后的回调
 */
function closed() {
  // 清空命令式调用的选项
  commandOptions.value = {}
  emits("closed")
}

/**
 * 显示 toast（命令式调用）
 * @param options 显示选项，可以是字符串（作为 content）或配置对象
 *
 * @example
 * // 传入字符串
 * toast.show("操作成功")
 *
 * @example
 * // 传入配置对象
 * toast.show({ type: "success", content: "操作成功" })
 */
function show(options: string | ToastOptions = {}) {
  // 合并命令式调用的选项
  if (isString(options)) {
    commandOptions.value = { content: options }
  } else {
    commandOptions.value = { ...options }
  }
  open()
}

/**
 * 隐藏 toast（命令式调用）
 */
function hide() {
  close()
}

/**
 * 显示成功提示
 * @param content 提示内容
 * @param options 可选配置
 */
function success(options?: string | ToastOptions) {
  const opts = typeof options === "string" ? { content: options } : options
  show({ ...opts, type: "success" })
}

/**
 * 显示失败提示
 * @param content 提示内容
 * @param options 可选配置
 */
function fail(options?: string | ToastOptions) {
  const opts = typeof options === "string" ? { content: options } : options
  show({ ...opts, type: "fail" })
}

/**
 * 显示加载中提示
 * @param content 提示内容（可选，默认"加载中..."）
 * @param options 可选配置
 */
function loading(options?: string | ToastOptions) {
  const opts = typeof options === "string" ? { content: options } : options
  show({ content: "加载中...", ...opts, type: "loading" })
}

/**
 * 显示等待提示
 * @param content 提示内容
 * @param options 可选配置
 */
function awaitFn(options?: string | ToastOptions) {
  const opts = typeof options === "string" ? { content: options } : options
  show({ ...opts, type: "await" })
}

/**
 * 显示默认提示（纯文本）
 * @param content 提示内容
 * @param options 可选配置
 */
function text(options?: string | ToastOptions) {
  const opts = typeof options === "string" ? { content: options } : options
  show({ ...opts, type: "default" })
}

defineExpose({ show, hide, open, close, success, fail, loading, await: awaitFn, text })
</script>

<script lang="ts">
export default {
  name: "ui-toast",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-toast {
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
    padding: var(--ui-spacing-xxl) var(--ui-spacing-xxxl);
    max-width: calc(100% - 160rpx);
    align-items: center;
    border-radius: var(--ui-radius-lg);
    flex-direction: column;
    justify-content: center;
  }

  &__icon {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    margin-bottom: var(--ui-spacing-xl);
    justify-content: center;
    .image {
      width: 100%;
      height: 100%;
    }

    .loading {
      width: 100%;
      height: 100%;
      animation: rotate 1s linear infinite;
      border-color: #ffffff var(--ui-color-mask-light) var(--ui-color-mask-light);
      border-style: solid;
      border-width: var(--ui-spacing-xs);
      border-radius: 50%;
      animation-duration: 1200ms;
      animation-timing-function: linear;

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(1turn);
        }
      }
    }
  }

  &__text {
    color: #ffffff;
    text-align: center;
    white-space: pre-wrap;
  }
}
</style>
