<template>
  <view
    class="ui-pull-refresh"
    :class="[props.customClass]"
    :style="[useStyle(props.customStyle)]"
    @touchstart="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <!-- 下拉刷新头部 -->
    <view class="ui-pull-refresh__track" :style="[trackStyle]">
      <view class="ui-pull-refresh__head" :style="[headStyle]">
        <!-- 各状态的插槽 -->
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

      <!-- 内容区域 -->
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
const emit = defineEmits(pullRefreshEmits)
// 状态管理
const status = ref<PullRefreshStatus>("normal")
const distance = ref(0)

// 触摸相关变量
let startY = 0
let deltaY = 0
let touchable = true
let ceiling = false

// 定时器
let successTimer: ReturnType<typeof setTimeout> | null = null

/**
 * 获取触发刷新的阈值距离
 * 默认使用 headHeight
 */
const pullDistanceValue = computed(() => {
  const pd = props.pullDistance
  if (pd !== undefined && pd !== null && pd !== "") {
    return Number(pd)
  }
  return Number(props.headHeight)
})

/**
 * 头部高度（px）
 */
const headHeightValue = computed(() => {
  return Number(props.headHeight)
})

/**
 * 动画持续时间（ms）
 */
const animationDurationValue = computed(() => {
  return Number(props.animationDuration)
})

/**
 * 轨道样式
 */
const trackStyle = computed(() => {
  const style: CSSProperties = {}

  // 只有在非正常状态时才应用位移
  if (distance.value > 0) {
    style.transform = `translateY(${distance.value}px)`
  } else {
    style.transform = "translateY(0)"
  }

  // 过渡动画（触摸结束后）
  if (status.value !== "pulling" && status.value !== "loosing") {
    style.transition = `transform ${animationDurationValue.value}ms`
  } else {
    style.transition = "none"
  }

  return useStyle(style)
})

/**
 * 头部样式
 */
const headStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${headHeightValue.value}px`
  return useStyle(style)
})

/**
 * 更新状态
 */
function setStatus(value: PullRefreshStatus, isCheck = true) {
  if (isCheck && status.value === value) return
  status.value = value
  emit("change", value)
}

/**
 * 检测是否处于页面顶部
 * 用于判断是否可以触发下拉刷新
 */
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
      .scrollOffset((res: any) => {
        resolve(res.scrollTop <= 0)
      })
      .exec()
    // #endif
  })
}

/**
 * 处理触摸开始
 */
async function onTouchStart(event: TouchEvent) {
  if (props.disabled || props.modelValue) return

  // 检测是否在页面顶部
  ceiling = await checkPosition()
  if (!ceiling) return

  touchable = true
  startY = event.touches[0].clientY
  deltaY = 0
}

/**
 * 处理触摸移动
 */
function onTouchMove(event: TouchEvent) {
  if (props.disabled || !touchable || !ceiling) return

  const touch = event.touches[0]
  deltaY = touch.clientY - startY

  // 只处理下拉
  if (deltaY <= 0) {
    setStatus("normal")
    distance.value = 0
    return
  }

  // 阻止默认行为，防止页面滚动
  // #ifdef H5
  if (deltaY > 0 && ceiling) {
    event.preventDefault()
  }
  // #endif

  // 计算下拉距离，使用阻尼效果
  // 距离越大，阻力越大
  const dampingRatio = 0.5
  const actualDistance = deltaY * dampingRatio
  distance.value = Math.min(actualDistance, headHeightValue.value * 2)

  // 更新状态
  if (distance.value >= pullDistanceValue.value) {
    setStatus("loosing")
  } else {
    setStatus("pulling")
  }
}

/**
 * 处理触摸结束
 */
function onTouchEnd() {
  if (props.disabled || !touchable) return

  touchable = false

  // 如果达到刷新阈值
  if (status.value === "loosing") {
    // 设置为加载状态
    distance.value = headHeightValue.value
    setStatus("loading")
    emit("update:modelValue", true)
    emit("refresh")
  } else {
    // 未达到阈值，恢复原位
    distance.value = 0
    setStatus("normal")
  }
}

/**
 * 显示刷新成功状态
 */
function showSuccessTip() {
  const successDuration = Number(props.successDuration)

  if (successDuration > 0 && props.successText) {
    setStatus("success")

    // 清除之前的定时器
    if (successTimer) {
      clearTimeout(successTimer)
      successTimer = null
    }

    successTimer = setTimeout(() => {
      distance.value = 0
      setStatus("normal")
      successTimer = null
    }, successDuration)
  } else {
    distance.value = 0
    setStatus("normal")
  }
}

/**
 * 监听 modelValue 变化
 * 当父组件设置 modelValue 为 false 时，表示刷新完成
 */
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (oldVal && !newVal) {
      // 从 true 变为 false，表示刷新完成
      showSuccessTip()
    } else if (newVal) {
      // 从 false 变为 true，设置加载状态
      distance.value = headHeightValue.value
      setStatus("loading")
    }
  },
)

/**
 * 组件卸载时清理
 */
onBeforeUnmount(() => {
  if (successTimer) {
    clearTimeout(successTimer)
    successTimer = null
  }
})
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

<style scoped lang="scss">
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
    color: var(--ui-color-text-secondary, #999);
    width: 100%;
    display: flex;
    overflow: hidden;
    position: absolute;
    font-size: 28rpx;
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
    line-height: 1.5;

    &--loading {
      margin-left: 16rpx;
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
