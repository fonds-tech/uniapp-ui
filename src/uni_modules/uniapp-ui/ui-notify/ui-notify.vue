<template>
  <view
    v-if="inited"
    class="ui-notify"
    :class="[typeClass, useOptions.customClass, { 'ui-notify--visible': visible }]"
    :style="[panelStyle]"
    @click="onClick"
    @touchmove.prevent.stop="noop"
  >
    <slot>
      <text class="ui-notify__content" :style="[contentStyle]">{{ useOptions.content }}</text>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { NotifyOptions } from "./index"
import { merge } from "../utils/utils"
import { notifyEmits, notifyProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, onBeforeUnmount } from "vue"

defineOptions({ name: "ui-notify" })

const props = defineProps(notifyProps)
const emits = defineEmits(notifyEmits)
// 状态
const inited = ref(false)
const visible = ref(false)
const useOptions = ref<NotifyOptions>({})
const propOptions = ref<NotifyOptions>({})
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const animationTimer = ref<ReturnType<typeof setTimeout> | null>(null)

// 动画时长（毫秒）
const ANIMATION_DURATION = 300

// 默认配置
const baseOptions = ref<NotifyOptions>({
  type: "primary",
  content: "",
  color: "",
  zIndex: 2000,
  duration: 3000,
  fontSize: "",
  fontWeight: "",
  background: "",
  offsetTop: "",
  customClass: "",
  customStyle: "",
})

// 类型类名
const typeClass = computed(() => `ui-notify--${useOptions.value.type || "primary"}`)

// 面板样式
const panelStyle = computed(() => {
  const styles: Record<string, any> = {}
  styles.zIndex = useOptions.value.zIndex
  styles.top = useUnit(useOptions.value.offsetTop)
  styles.background = useColor(useOptions.value.background)
  return useStyle({ ...styles, ...useStyle(useOptions.value.customStyle) })
})

// 内容样式
const contentStyle = computed(() => {
  const styles: Record<string, any> = {}
  styles.color = useColor(useOptions.value.color)
  styles.fontSize = useUnit(useOptions.value.fontSize)
  styles.fontWeight = useOptions.value.fontWeight
  return useStyle(styles)
})

// 监听 props 变化
watch(
  () => props,
  (options) => {
    propOptions.value = merge(baseOptions.value, options)
  },
  { deep: true, immediate: true },
)

// 监听 show 属性
watch(
  () => props.show,
  (val) => {
    if (val) show()
    else close()
  },
  { immediate: true },
)

// 监听 visible 变化
watch(visible, (val) => {
  emits("update:show", val)
})

// 清理定时器
function clearCloseTimer() {
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
    closeTimer.value = null
  }
}

function clearAnimationTimer() {
  if (animationTimer.value) {
    clearTimeout(animationTimer.value)
    animationTimer.value = null
  }
}

// 显示通知
function show(options: NotifyOptions = {}) {
  clearCloseTimer()
  clearAnimationTimer()

  useOptions.value = merge(merge(baseOptions.value, propOptions.value), options)

  // 已显示时仅更新内容和重置定时器
  if (visible.value) {
    const duration = +useOptions.value.duration || 3000
    closeTimer.value = setTimeout(() => close(), duration)
    return
  }

  // 初始化
  inited.value = true

  // 触发 open 事件
  emits("open")

  // 下一帧开始进入动画
  setTimeout(() => {
    visible.value = true

    // 动画结束后触发 opened
    animationTimer.value = setTimeout(() => {
      emits("opened")
    }, ANIMATION_DURATION)
  }, 20)

  // 设置自动关闭定时器
  const duration = +useOptions.value.duration || 3000
  closeTimer.value = setTimeout(() => close(), duration)
}

// 关闭通知
function close() {
  if (!visible.value) return

  clearCloseTimer()
  clearAnimationTimer()

  // 触发 close 事件
  emits("close")

  // 开始离开动画
  visible.value = false

  // 动画结束后触发 closed
  animationTimer.value = setTimeout(() => {
    emits("closed")
  }, ANIMATION_DURATION)
}

function onClick() {
  emits("click")
}

function noop() {
  return false
}

// 组件卸载时清理
onBeforeUnmount(() => {
  clearCloseTimer()
  clearAnimationTimer()
})

defineExpose({ name: "ui-notify", show, close })
</script>

<script lang="ts">
export default {
  name: "ui-notify",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-notify {
  top: 0;
  left: 0;
  right: 0;
  padding: var(--ui-spacing-md);
  position: fixed;
  transform: translateY(-100%);
  transition: transform 0.3s ease-out;

  &--visible {
    transform: translateY(0);
  }

  &--primary {
    background-color: var(--ui-color-primary);
  }

  &--success {
    background-color: var(--ui-color-success);
  }

  &--warning {
    background-color: var(--ui-color-warning);
  }

  &--danger {
    background-color: var(--ui-color-danger);
  }

  &__content {
    color: var(--ui-color-background);
    display: flex;
    font-size: var(--ui-font-size-sm);
    align-items: center;
    justify-content: center;
  }
}
</style>
