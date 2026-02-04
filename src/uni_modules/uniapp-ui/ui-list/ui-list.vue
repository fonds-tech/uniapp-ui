<template>
  <scroll-view
    class="ui-list"
    :class="[props.customClass]"
    :style="[rootStyle]"
    scroll-y
    :scroll-top="scrollTop"
    @scroll="onScroll"
    @scrolltolower="onScrollToLower"
  >
    <!-- 虚拟滚动容器 -->
    <view class="ui-list__phantom" :style="[phantomStyle]">
      <!-- 可视区域内容 -->
      <view class="ui-list__content" :style="[contentStyle]">
        <slot :visible-data="visibleData" :start-index="startIndex" :end-index="endIndex" />
      </view>
    </view>

    <!-- 底部状态区域 -->
    <view class="ui-list__placeholder" :style="[placeholderStyle]">
      <!-- 加载中状态 -->
      <view v-if="props.loading" class="ui-list__loading">
        <slot name="loading">
          <ui-loading size="36rpx" />
          <text class="ui-list__loading-text">{{ props.loadingText }}</text>
        </slot>
      </view>

      <!-- 加载完成状态 -->
      <view v-else-if="props.finished" class="ui-list__finished">
        <slot name="finished">
          <text class="ui-list__finished-text">{{ props.finishedText }}</text>
        </slot>
      </view>

      <!-- 加载失败状态 -->
      <view v-else-if="props.error" class="ui-list__error" @click="onErrorClick">
        <slot name="error">
          <text class="ui-list__error-text">{{ props.errorText }}</text>
        </slot>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useStyle } from "../hooks"
import { listEmits, listProps } from "./index"
import { ref, watch, computed, nextTick, onMounted, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-list" })

const props = defineProps(listProps)
const emit = defineEmits(listEmits)
const instance = getCurrentInstance()

// 滚动位置
const scrollTop = ref(0)
// 当前滚动位置（用于计算可视区域）
const currentScrollTop = ref(0)
// 容器高度
const containerHeight = ref(0)
// 列表总数据量（由外部传入，通过 slot 计算）
const totalCount = ref(0)

// 列表项高度（转换为数值）
const itemHeightValue = computed(() => Number(props.itemHeight) || 50)
// 缓冲区大小（转换为数值）
const bufferSizeValue = computed(() => Number(props.bufferSize) || 5)
// 偏移量（转换为数值）
const offsetValue = computed(() => Number(props.offset) || 300)

// 可视区域起始索引
const startIndex = computed(() => {
  const index = Math.floor(currentScrollTop.value / itemHeightValue.value)
  return Math.max(0, index - bufferSizeValue.value)
})

// 可视区域结束索引
const endIndex = computed(() => {
  const visibleCount = Math.ceil(containerHeight.value / itemHeightValue.value)
  const index = Math.floor(currentScrollTop.value / itemHeightValue.value) + visibleCount
  return Math.min(totalCount.value, index + bufferSizeValue.value)
})

// 可视区域数据范围
const visibleData = computed(() => ({
  start: startIndex.value,
  end: endIndex.value,
}))

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 虚拟占位容器样式（撑开滚动区域）
const phantomStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${totalCount.value * itemHeightValue.value}px`
  return useStyle(style)
})

// 可视区域内容样式（偏移定位）
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.transform = `translateY(${startIndex.value * itemHeightValue.value}px)`
  return useStyle(style)
})

// 占位区域样式
const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  if (!props.loading && !props.finished && !props.error) {
    style.display = "none"
  }
  return useStyle(style)
})

// 监听 loading 状态，加载完成后重新检查
watch(
  () => props.loading,
  (newVal, oldVal) => {
    if (oldVal && !newVal && !props.finished && !props.error) {
      nextTick(check)
    }
  },
)

// 组件挂载
onMounted(() => {
  nextTick(() => {
    getContainerHeight()
    if (props.immediateCheck) {
      check()
    }
  })
})

// 组件卸载
onUnmounted(() => {
  // 清理操作
})

/**
 * 获取容器高度
 */
function getContainerHeight() {
  if (!instance) return

  uni
    .createSelectorQuery()
    .in(instance)
    .select(".ui-list")
    .boundingClientRect((rect: UniApp.NodeInfo) => {
      if (rect) {
        containerHeight.value = rect.height || 0
      }
    })
    .exec()
}

/**
 * 滚动事件处理
 */
function onScroll(event: { detail: { scrollTop: number; scrollHeight: number } }) {
  const { scrollTop: top, scrollHeight } = event.detail
  currentScrollTop.value = top

  // 检查是否需要加载更多
  const bottomDistance = scrollHeight - top - containerHeight.value
  if (bottomDistance <= offsetValue.value) {
    check()
  }
}

/**
 * 滚动到底部事件处理
 */
function onScrollToLower() {
  check()
}

/**
 * 检查并触发加载
 */
function check() {
  // 如果正在加载、已加载完成或加载失败，则不触发
  if (props.loading || props.finished || props.error) {
    return
  }

  emit("update:loading", true)
  emit("load")
}

/**
 * 错误状态点击重试
 */
function onErrorClick() {
  emit("update:error", false)
  check()
}

/**
 * 设置列表总数据量（供外部调用）
 */
function setTotalCount(count: number) {
  totalCount.value = count
}

/**
 * 滚动到指定位置
 */
function scrollTo(top: number) {
  scrollTop.value = top
}

/**
 * 滚动到指定索引
 */
function scrollToIndex(index: number) {
  const top = index * itemHeightValue.value
  scrollTo(top)
}

// 暴露方法给外部调用
defineExpose({
  check,
  setTotalCount,
  scrollTo,
  scrollToIndex,
})
</script>

<script lang="ts">
export default {
  name: "ui-list",
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
.ui-list {
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__phantom {
    position: relative;
  }

  &__content {
    left: 0;
    right: 0;
    position: absolute;
  }

  &__placeholder {
    width: 100%;
  }

  &__loading {
    display: flex;
    padding: 20rpx 0;
    align-items: center;
    justify-content: center;
  }

  &__loading-text {
    color: var(--ui-color-text-secondary, #999);
    font-size: 28rpx;
    margin-left: 16rpx;
  }

  &__finished {
    display: flex;
    padding: 20rpx 0;
    align-items: center;
    justify-content: center;
  }

  &__finished-text {
    color: var(--ui-color-text-tertiary, #c8c9cc);
    font-size: 28rpx;
  }

  &__error {
    display: flex;
    padding: 20rpx 0;
    align-items: center;
    justify-content: center;
  }

  &__error-text {
    color: var(--ui-color-danger, #ee0a24);
    font-size: 28rpx;
  }
}
</style>
