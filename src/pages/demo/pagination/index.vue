<template>
  <demo-page>
    <demo-section title="基础用法" desc="分页组件用于列表数据的分页加载" />

    <demo-section title="模拟列表">
      <demo-block direction="column">
        <ui-pagination :list="list" :page="page" :page-size="pageSize" :total="total" :loading="loading" @load="onLoad" @refresh="onRefresh">
          <view v-for="item in list" :key="item.id" class="list-item">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-desc">{{ item.desc }}</text>
          </view>
        </ui-pagination>
      </demo-block>
    </demo-section>

    <demo-section title="当前状态">
      <demo-block direction="column" class="status-info">
        <text>当前页: {{ page }}</text>
        <text>每页数量: {{ pageSize }}</text>
        <text>总数: {{ total }}</text>
        <text>加载中: {{ loading ? "是" : "否" }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
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

<style lang="scss" scoped>
.list-item {
  padding: 24rpx;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }
}

.item-title {
  color: var(--ui-color-text-main);
  display: block;
  font-size: 30rpx;
}

.item-desc {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 8rpx;
}

.status-info {
  gap: 12rpx;
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
}
</style>
