<template>
  <view class="ui-pagination" :style="[style]">
    <slot />
    <view v-if="isShowEmpty" class="ui-pagination__empty">
      <ui-empty :text="emptyText" />
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
import { isArray, isEmpty, isNoEmpty } from "../utils/check"
import { paginationEmits, paginationProps, usePaginationProps } from "./index"

defineOptions({ name: "ui-pagination" })

const props = defineProps(paginationProps)
const emits = defineEmits(paginationEmits)
const useProps = usePaginationProps(props)
const init = ref(false)

const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const text = computed(() => {
  let text = ""
  if (loading.value) text = "正在加载..."
  else if (isArray(list.value) && list.value.length >= +total.value && init.value) text = "没有更多了"
  return text
})

const list = computed(() => (isPagination.value ? useProps.pagination.data.value : useProps.list))
const page = computed(() => (isPagination.value ? useProps.pagination.page.value : useProps.page))
const total = computed(() => (isPagination.value ? useProps.pagination.total.value : useProps.total))
const loading = computed(() => (isPagination.value ? useProps.pagination.loading.value : useProps.loading))
const pageSize = computed(() => (isPagination.value ? useProps.pagination.pageSize.value : useProps.pageSize))
const isLastPage = computed(() => (isPagination.value ? list.value.length >= total.value : true))
const isShowEmpty = computed(() => init.value && isEmpty(loading.value) && isEmpty(list.value))
const isPagination = computed(() => isNoEmpty(useProps.pagination))

watch(
  () => loading.value,
  (value) => {
    if (value) init.value = true
    else uni.stopPullDownRefresh()
  },
  { immediate: true },
)

function onEvent() {
  const { onComplete } = useProps.pagination
  if (onComplete) {
    onComplete(() => {
      init.value = true
      uni.stopPullDownRefresh()
    })
  }
}

onReachBottom(() => {
  if (isEmpty(isLastPage.value)) {
    if (isPagination.value) {
      const { page } = useProps.pagination
      page.value++
    }
    emits("load", page.value, pageSize.value)
  }
})

onPullDownRefresh(() => {
  if (isPagination.value) {
    const { reload } = useProps.pagination
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
