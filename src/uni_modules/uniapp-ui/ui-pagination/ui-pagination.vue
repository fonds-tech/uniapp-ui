<template>
  <view class="ui-pagination" :style="[style]">
    <slot />
    <view v-if="isShowEmpty" class="ui-pagination__empty">
      <slot name="empty">
        <ui-empty :icon="props.emptyIcon" :text="props.emptyText" />
      </slot>
    </view>
    <view v-else class="ui-pagination__loading">
      <view v-if="loading" class="loading-icon">
        <ui-loading type="spinner" size="32rpx" color="#999" />
      </view>
      <text class="loading-text">
        {{ text }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useStyle } from "../hooks"
import { ref, watch, computed } from "vue"
import { isArray, isEmpty, isNoEmpty } from "../utils/check"
import { paginationEmits, paginationProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-pagination" })

// 定义 props 和 emits
const props = defineProps(paginationProps)
const emits = defineEmits(paginationEmits)

// 是否已初始化
const init = ref(false)

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 加载提示文本
const text = computed(() => {
  let text = ""
  if (loading.value) text = "正在加载..."
  else if (isArray(list.value) && list.value.length >= +total.value && init.value) text = "没有更多了"
  return text
})

// 数据列表
const list = computed(() => (isPagination.value ? props.pagination.data.value : props.list))
// 当前页码
const page = computed(() => (isPagination.value ? props.pagination.page.value : props.page))
// 数据总数
const total = computed(() => (isPagination.value ? props.pagination.total.value : props.total))
// 是否加载中
const loading = computed(() => (isPagination.value ? props.pagination.loading.value : props.loading))
// 每页条数
const pageSize = computed(() => (isPagination.value ? props.pagination.pageSize.value : props.pageSize))
// 是否是最后一页
const isLastPage = computed(() => (isPagination.value ? list.value.length >= total.value : true))
// 是否显示空状态
const isShowEmpty = computed(() => init.value && isEmpty(loading.value) && isEmpty(list.value))
// 是否使用分页对象
const isPagination = computed(() => isNoEmpty(props.pagination))

// 监听加载状态变化
watch(
  () => loading.value,
  (value) => {
    if (value) init.value = true
    else uni.stopPullDownRefresh()
  },
  { immediate: true },
)

// 初始化事件监听
function onEvent() {
  const { onComplete } = props.pagination
  if (onComplete) {
    onComplete(() => {
      init.value = true
      uni.stopPullDownRefresh()
    })
  }
}

// 触底加载更多
onReachBottom(() => {
  if (isEmpty(isLastPage.value)) {
    if (isPagination.value) {
      const { page } = props.pagination
      page.value++
    }
    emits("load", page.value, pageSize.value)
  }
})

// 下拉刷新
onPullDownRefresh(() => {
  if (isPagination.value) {
    const { reload } = props.pagination
    if (reload) reload()
  }
  emits("refresh", 1, pageSize.value)
})

onEvent()
</script>

<script lang="ts">
export default {
  name: "ui-pagination",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-pagination {
  flex: 1;
  display: flex;
  position: relative;
  min-height: max-content;
  flex-direction: column;
  &__empty {
    width: 100%;
    margin: auto 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  &__loading {
    width: 100%;
    margin: 24rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .loading-icon {
      display: flex;
      margin-right: 12rpx;
    }
    .loading-text {
      color: #999;
    }
  }
}
</style>
