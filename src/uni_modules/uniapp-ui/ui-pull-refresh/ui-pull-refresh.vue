<template>
  <view
    class="ui-pull-refresh"
    :class="[props.customClass]"
    :style="[rootStyle]"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view class="ui-pull-refresh__track" :style="[trackStyle]">
      <view class="ui-pull-refresh__head" :style="[headStyle]">
        <slot v-if="status === 'pulling'" name="pulling" :distance="distance">
          <text class="ui-pull-refresh__text">{{ props.pullingText }}</text>
        </slot>
        <slot v-else-if="status === 'loosing'" name="loosing" :distance="distance">
          <text class="ui-pull-refresh__text">{{ props.loosingText }}</text>
        </slot>
        <slot v-else-if="status === 'loading'" name="loading">
          <view class="ui-pull-refresh__loading">
            <ui-loading size="36rpx" />
            <text class="ui-pull-refresh__text ui-pull-refresh__text--loading">{{ props.loadingText }}</text>
          </view>
        </slot>
        <slot v-else-if="status === 'success'" name="success">
          <text class="ui-pull-refresh__text">{{ props.successText }}</text>
        </slot>
        <slot v-else name="normal" />
      </view>

      <view class="ui-pull-refresh__content">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { PullRefreshStatus } from "./index"
import { useStyle } from "../hooks"
import { pullRefreshEmits, pullRefreshProps } from "./index"
import { ref, watch, computed, onBeforeUnmount } from "vue"

defineOptions({ name: "ui-pull-refresh" })

const props = defineProps(pullRefreshProps)
const emits = defineEmits(pullRefreshEmits)

const status = ref<PullRefreshStatus>("normal")
const distance = ref(0)

// 触摸状态闭包变量 (无需响应式)
let startY = 0
let touchable = true
let ceiling = false
let successTimer: ReturnType<typeof setTimeout> | null = null

// 头部默认高度兜底 (未传 props.headHeight 时与 SCSS 默认保持一致)
const DEFAULT_HEAD_HEIGHT = 50

const headHeightPx = computed(() => (props.headHeight !== undefined ? Number(props.headHeight) : DEFAULT_HEAD_HEIGHT))
const triggerDistance = computed(() => (props.pullDistance !== undefined && props.pullDistance !== "" ? Number(props.pullDistance) : headHeightPx.value))

const rootStyle = computed(() => useStyle(props.customStyle))
const trackStyle = computed<CSSProperties>(() => ({
  transform: distance.value > 0 ? `translateY(${distance.value}px)` : "translateY(0)",
  // pulling/loosing 跟手动 → 关动画；其他状态有过渡
  transition: status.value === "pulling" || status.value === "loosing" ? "none" : `transform ${props.animationDuration}ms`,
}))
const headStyle = computed(() => {
  const style: CSSProperties = {}
  // headHeight 单位约定 px (与原实现一致：用户传数值或带单位字符串都按 px 处理)
  if (props.headHeight !== undefined) style.height = `${headHeightPx.value}px`
  return useStyle(style)
})

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (oldVal && !newVal) {
      showSuccessTip()
    } else if (newVal) {
      distance.value = headHeightPx.value
      setStatus("loading")
    }
  },
)

onBeforeUnmount(() => {
  if (successTimer) clearTimeout(successTimer)
})

function setStatus(value: PullRefreshStatus, isCheck = true) {
  if (isCheck && status.value === value) return
  status.value = value
  emits("change", value)
}

// 仅 page 级 scrollTop=0 时才允许触发下拉（嵌套 scroll-view 内部不可用）
function checkPosition(): Promise<boolean> {
  return new Promise((resolve) => {
    // #ifdef H5
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    resolve(scrollTop <= 0)
    // #endif
    // #ifndef H5
    uni
      .createSelectorQuery()
      .selectViewport()
      .scrollOffset((res: UniApp.NodeInfo) => resolve((res.scrollTop ?? 0) <= 0))
      .exec()
    // #endif
  })
}

async function onTouchStart(event: TouchEvent) {
  if (props.disabled || props.modelValue) return
  ceiling = await checkPosition()
  if (!ceiling) return
  touchable = true
  startY = event.touches[0].clientY
}

function onTouchMove(event: TouchEvent) {
  if (props.disabled || !touchable || !ceiling) return
  const deltaY = event.touches[0].clientY - startY
  if (deltaY <= 0) {
    setStatus("normal")
    distance.value = 0
    return
  }
  // #ifdef H5
  // 阻止页面跟手滚动
  event.preventDefault()
  // #endif
  // 阻尼系数 0.5：手指拉 100px 头部展开 50px，符合主流交互手感
  distance.value = Math.min(deltaY * 0.5, headHeightPx.value * 2)
  setStatus(distance.value >= triggerDistance.value ? "loosing" : "pulling")
}

function onTouchEnd() {
  if (props.disabled || !touchable) return
  touchable = false
  if (status.value === "loosing") {
    distance.value = headHeightPx.value
    setStatus("loading")
    emits("update:modelValue", true)
    emits("refresh")
  } else {
    distance.value = 0
    setStatus("normal")
  }
}

function showSuccessTip() {
  if (props.successDuration > 0 && props.successText) {
    setStatus("success")
    if (successTimer) clearTimeout(successTimer)
    successTimer = setTimeout(() => {
      distance.value = 0
      setStatus("normal")
      successTimer = null
    }, props.successDuration)
  } else {
    distance.value = 0
    setStatus("normal")
  }
}
</script>

<script lang="ts">
export default {
  name: "ui-pull-refresh",
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
.ui-pull-refresh {
  width: 100%;
  overflow: hidden;
  user-select: none;

  &__track {
    position: relative;
    will-change: transform;
  }

  &__head {
    top: 0;
    left: 0;
    color: var(--ui-color-text-secondary);
    width: 100%;
    height: 50px;
    display: flex;
    overflow: hidden;
    position: absolute;
    font-size: var(--ui-font-size-sm);
    transform: translateY(-100%);
    align-items: center;
    justify-content: center;
  }

  &__content {
    z-index: 1;
    position: relative;
  }

  &__text {
    color: inherit;
    font-size: inherit;
    line-height: var(--ui-line-height-normal);

    &--loading {
      margin-left: var(--ui-spacing-sm);
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
