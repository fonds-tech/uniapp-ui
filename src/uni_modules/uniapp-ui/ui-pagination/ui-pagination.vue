<template>
  <view class="ui-pagination" :class="[props.customClass]" :style="[props.customStyle]">
    <slot />
    <view v-if="isShowEmpty" class="ui-pagination__empty">
      <slot name="empty">
        <ui-empty :icon="props.emptyIcon" :text="props.emptyText" />
      </slot>
    </view>
    <view v-else class="ui-pagination__loading">
      <view v-if="props.loading" class="ui-pagination__loading-icon">
        <ui-loading type="spinner" size="32rpx" color="text-tertiary" />
      </view>
      <text class="ui-pagination__loading-text">{{ text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { isArray, isEmpty } from "../utils/check"
import { ref, watch, computed } from "vue"
import { paginationEmits, paginationProps } from "./index"

defineOptions({ name: "ui-pagination" })

const props = defineProps(paginationProps)
const emits = defineEmits(paginationEmits)

const inited = ref(false)

// 是否最后一页
const isLastPage = computed(() => isArray(props.list) && props.list.length >= +props.total)
// 是否显示空状态
const isShowEmpty = computed(() => inited.value && !props.loading && isEmpty(props.list))
// 加载提示文本
const text = computed(() => {
  if (props.loading) return "正在加载..."
  if (isLastPage.value && inited.value) return "没有更多了"
  return ""
})

watch(
  () => props.loading,
  (val) => {
    if (val) inited.value = true
    else uni.stopPullDownRefresh()
  },
  { immediate: true },
)

onReachBottom(() => {
  if (!isLastPage.value) emits("load", +props.page, +props.pageSize)
})

onPullDownRefresh(() => {
  emits("refresh", 1, +props.pageSize)
})
</script>

<script lang="ts">
export default {
  name: "ui-pagination",
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
.ui-pagination {
  --ui-pagination-loading-gap: 12rpx;
  --ui-pagination-loading-color: var(--ui-color-text-tertiary);
  --ui-pagination-loading-margin: var(--ui-spacing-md);

  flex: 1;
  display: flex;
  position: relative;
  min-height: 100%;
  flex-direction: column;

  &__empty {
    width: 100%;
    margin: auto 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__loading {
    gap: var(--ui-pagination-loading-gap);
    width: 100%;
    margin: var(--ui-pagination-loading-margin) 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__loading-icon {
    display: flex;
    align-items: center;
  }

  &__loading-text {
    color: var(--ui-pagination-loading-color);
  }
}
</style>
