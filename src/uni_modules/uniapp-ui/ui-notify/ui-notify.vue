<template>
  <view
    v-if="inited"
    class="ui-notify"
    :class="[`ui-notify--${useOptions.type || 'primary'}`, useOptions.customClass, { 'ui-notify--visible': visible }]"
    :style="[rootStyle]"
    @click="onClick"
    @touchmove.prevent.stop="() => {}"
  >
    <slot>
      <text class="ui-notify__content">{{ useOptions.content }}</text>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { NotifyOptions } from "./index"
import { merge } from "../utils/utils"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, onBeforeUnmount } from "vue"
import { notifyEmits, notifyProps, NOTIFY_DEFAULT_DURATION, NOTIFY_ANIMATION_DURATION } from "./index"

defineOptions({ name: "ui-notify" })

const props = defineProps(notifyProps)
const emits = defineEmits(notifyEmits)

const inited = ref(false)
const visible = ref(false)
const useOptions = ref<NotifyOptions>({})
let closeTimer: ReturnType<typeof setTimeout> | null = null
let animationTimer: ReturnType<typeof setTimeout> | null = null

// props 派生选项快照
const propOptions = computed<NotifyOptions>(() => ({ ...props }))
// 根节点 CSS var 注入
const rootStyle = computed(() => {
  const o = useOptions.value
  const vars: Record<string, string | number | undefined> = {}
  if (o.color) vars["--ui-notify-color"] = useColor(o.color)
  if (o.background) vars["--ui-notify-background"] = useColor(o.background)
  if (o.fontSize !== undefined) vars["--ui-notify-font-size"] = useUnit(o.fontSize)
  if (o.fontWeight !== undefined) vars["--ui-notify-font-weight"] = String(o.fontWeight)
  if (o.zIndex !== undefined) vars["--ui-notify-z-index"] = String(o.zIndex)
  if (o.offsetTop !== undefined) vars["--ui-notify-offset-top"] = useUnit(o.offsetTop)
  return useStyle({ ...vars, ...useStyle(o.customStyle) })
})

watch(
  () => props.show,
  (val) => {
    if (val) show()
    else close()
  },
  { immediate: true },
)

watch(visible, (val) => {
  emits("update:show", val)
})

onBeforeUnmount(() => {
  clearCloseTimer()
  clearAnimationTimer()
})

function clearCloseTimer() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

function clearAnimationTimer() {
  if (animationTimer) {
    clearTimeout(animationTimer)
    animationTimer = null
  }
}

// 显示通知
function show(options: NotifyOptions = {}) {
  clearCloseTimer()
  clearAnimationTimer()
  useOptions.value = merge({ ...propOptions.value }, options)

  // 已显示则只重置自动关闭定时器
  const duration = +(useOptions.value.duration || 0) || NOTIFY_DEFAULT_DURATION
  if (visible.value) {
    closeTimer = setTimeout(() => close(), duration)
    return
  }

  inited.value = true
  emits("open")

  setTimeout(() => {
    visible.value = true
    animationTimer = setTimeout(() => emits("opened"), NOTIFY_ANIMATION_DURATION)
  }, 20)

  closeTimer = setTimeout(() => close(), duration)
}

// 关闭通知
function close() {
  if (!visible.value) return
  clearCloseTimer()
  clearAnimationTimer()
  emits("close")
  visible.value = false
  animationTimer = setTimeout(() => emits("closed"), NOTIFY_ANIMATION_DURATION)
}

function onClick() {
  emits("click")
}

defineExpose({ show, close })
</script>

<script lang="ts">
export default {
  name: "ui-notify",
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
.ui-notify {
  --ui-notify-color: var(--ui-color-text-inverse);
  --ui-notify-padding: var(--ui-spacing-md);
  --ui-notify-z-index: 2000;
  --ui-notify-font-size: var(--ui-font-size-sm);
  --ui-notify-background: var(--ui-color-primary);
  --ui-notify-offset-top: 0;
  --ui-notify-font-weight: inherit;

  top: var(--ui-notify-offset-top);
  left: 0;
  right: 0;
  padding: var(--ui-notify-padding);
  z-index: var(--ui-notify-z-index);
  position: fixed;
  transform: translateY(-100%);
  background: var(--ui-notify-background);
  transition: transform var(--ui-transition-duration) var(--ui-transition-timing-ease-out);

  &--visible {
    transform: translateY(0);
  }

  &--success {
    --ui-notify-background: var(--ui-color-success);
  }

  &--warning {
    --ui-notify-background: var(--ui-color-warning);
  }

  &--danger {
    --ui-notify-background: var(--ui-color-danger);
  }

  &__content {
    color: var(--ui-notify-color);
    display: flex;
    font-size: var(--ui-notify-font-size);
    align-items: center;
    font-weight: var(--ui-notify-font-weight);
    justify-content: center;
  }
}
</style>
