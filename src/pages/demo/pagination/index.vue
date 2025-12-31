<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <text class="section-desc">分页组件用于列表数据的分页加载</text>
    </view>

    <view class="demo-section">
      <text class="section-title">模拟列表</text>
      <view class="demo-block">
        <ui-pagination :list="list" :page="page" :page-size="pageSize" :total="total" :loading="loading" @load="onLoad" @refresh="onRefresh">
          <template #default="{ data }">
            <view v-for="item in data" :key="item.id" class="list-item">
              <text class="item-title">{{ item.title }}</text>
              <text class="item-desc">{{ item.desc }}</text>
            </view>
          </template>
        </ui-pagination>
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="demo-section">
      <text class="section-title">当前状态</text>
      <view class="demo-block status-info">
        <text>当前页: {{ page }}</text>
        <text>每页数量: {{ pageSize }}</text>
        <text>总数: {{ total }}</text>
        <text>加载中: {{ loading ? "是" : "否" }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Pagination 分页" },
})

interface ListItem {
  id: number
  title: string
  desc: string
}

const list = ref<ListItem[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(35)
const loading = ref(false)

function generateItems(pageNum: number, size: number): ListItem[] {
  const start = (pageNum - 1) * size
  return Array.from({ length: Math.min(size, total.value - start) }, (_, i) => ({
    id: start + i + 1,
    title: `列表项 ${start + i + 1}`,
    desc: `这是第 ${start + i + 1} 条数据的描述`,
  }))
}

function onLoad(pageNum: number, size: number) {
  loading.value = true
  setTimeout(() => {
    const newItems = generateItems(pageNum, size)
    list.value = [...list.value, ...newItems]
    page.value = pageNum
    loading.value = false
  }, 1000)
}

function onRefresh(pageNum: number, size: number) {
  loading.value = true
  setTimeout(() => {
    list.value = generateItems(pageNum, size)
    page.value = pageNum
    loading.value = false
  }, 1000)
}

onMounted(() => {
  onLoad(1, pageSize.value)
})
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.section-desc {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 8rpx;
}

.list-item {
  padding: 24rpx;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }
}

.item-title {
  display: block;
  font-size: 30rpx;
  color: var(--ui-color-text-primary);
}

.item-desc {
  display: block;
  font-size: 24rpx;
  margin-top: 8rpx;
  color: var(--ui-color-text-secondary);
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  font-size: 26rpx;
  color: var(--ui-color-text-secondary);
}
</style>
