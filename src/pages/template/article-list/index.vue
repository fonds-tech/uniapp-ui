<template>
  <view class="page">
    <ui-notice-bar text="社区公告：每日更新精选科技、生活、设计深度内容" icon="bell" mode="closeable" />

    <view class="tabs">
      <ui-tabs v-model="cate" type="card">
        <ui-tab v-for="c in cates" :key="c.value" :name="c.value" :title="c.label" />
      </ui-tabs>
    </view>

    <!-- 骨架屏：首次加载时显示 -->
    <view v-if="loading" class="skeleton">
      <view v-for="i in 3" :key="i" class="item">
        <view class="item__main">
          <ui-skeleton-title :width="500" />
          <ui-skeleton-paragraph :rows="1" :custom-style="{ marginTop: 'var(--ui-spacing-sm)' }" />
          <view class="item__meta">
            <ui-skeleton :width="120" :height="32" />
            <ui-skeleton :width="80" :height="28" />
          </view>
        </view>
        <ui-skeleton-image width="220rpx" height="160rpx" />
      </view>
    </view>

    <ui-list v-else v-model:loading="loadMore" :finished="finished" finished-text="没有更多了" @load="onLoadMore">
      <view v-for="a in list" :key="a.id" class="item" @click="onClick(a)">
        <view class="item__main">
          <ui-text-ellipsis :content="a.title" :rows="2" :custom-style="{ fontWeight: 'var(--ui-font-weight-normal)', lineHeight: '1.5' }" />
          <view class="item__meta">
            <ui-tag :type="a.tagType" plain>{{ a.tag }}</ui-tag>
            <text class="item__dot">·</text>
            <text class="item__time">{{ a.time }}</text>
            <text class="item__dot">·</text>
            <text class="item__views">{{ a.views }} 阅读</text>
          </view>
        </view>
        <ui-image :src="a.image" width="220rpx" height="160rpx" mode="aspectFill" radius="12rpx" />
      </view>
    </ui-list>
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, onMounted } from "vue"

definePage({
  style: { navigationBarTitleText: "资讯列表" },
})

const toast = useToast()

const cates = [
  { label: "推荐", value: "all" },
  { label: "科技", value: "tech" },
  { label: "设计", value: "design" },
  { label: "生活", value: "life" },
]
const cate = ref("all")

const loading = ref(true)
const loadMore = ref(false)
const finished = ref(false)

onMounted(() => {
  setTimeout(() => (loading.value = false), 800)
})

function onLoadMore() {
  loadMore.value = true
  setTimeout(() => {
    loadMore.value = false
    finished.value = true
  }, 800)
}

const list = ref([
  { id: 1, title: "2024 年最值得期待的科技产品发布会前瞻，AI 将重塑生活", tag: "科技前沿", tagType: "primary" as const, time: "3 小时前", views: "2.3k", image: "https://picsum.photos/400/300?random=51" },
  { id: 2, title: "Vue 3 + TypeScript 最佳实践指南：从入门到精通", tag: "前端开发", tagType: "info" as const, time: "5 小时前", views: "1.5k", image: "https://picsum.photos/400/300?random=52" },
  { id: 3, title: "极简主义设计美学：少即是多的真正含义", tag: "设计", tagType: "success" as const, time: "昨天", views: "892", image: "https://picsum.photos/400/300?random=53" },
  { id: 4, title: "如何打造高效的远程工作环境？", tag: "生活", tagType: "warning" as const, time: "2 天前", views: "650", image: "https://picsum.photos/400/300?random=54" },
  { id: 5, title: "iOS 18 新功能深度盘点：通知中心革新", tag: "科技前沿", tagType: "primary" as const, time: "3 天前", views: "3.2k", image: "https://picsum.photos/400/300?random=55" },
])

function onClick(a: { id: number }) {
  toast.text(`打开 #${a.id}`)
  uni.navigateTo({ url: `/pages/template/article-detail/index?id=${a.id}` })
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background);
  min-height: 100vh;
}

.tabs {
  padding: var(--ui-spacing-sm) var(--ui-spacing-md);
  background: var(--ui-color-background);
  border-bottom: 1rpx solid var(--ui-color-border-light);
}

.item {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-lg);
  position: relative;
  align-items: flex-start;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &__main {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: space-between;
  }

  &__meta {
    gap: var(--ui-spacing-xs);
    color: var(--ui-color-text-tertiary);
    display: flex;
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-md);
    align-items: center;
  }

  &__dot {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__time,
  &__views {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
