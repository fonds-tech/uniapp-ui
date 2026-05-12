<template>
  <demo-page>
    <demo-section title="场景切换" desc="切换数据源观察列表分页加载行为">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="s in scenarios" :key="s.key" size="small" :type="currentKey === s.key ? 'primary' : 'default'" @click="switchScenario(s.key)">{{ s.label }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="状态" desc="实时显示当前页 / 加载状态 / 总数">
      <demo-block direction="column" class="status-info">
        <text>场景: {{ scenarios.find((s) => s.key === currentKey)?.label }}</text>
        <text>当前页: {{ page }} / 总条数 {{ total }}</text>
        <text>加载中: {{ loading ? "是" : "否" }}</text>
        <text>已加载条数: {{ list.length }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="数据列表" desc="下拉刷新 / 触底加载更多 / 加载完毕显示「没有更多了」">
      <ui-pagination :list="list" :page="page" :page-size="pageSize" :total="total" :loading="loading" empty-text="暂无数据" @load="onLoad" @refresh="onRefresh">
        <template #empty>
          <view class="custom-empty">
            <ui-icon name="info-circle" size="48rpx" color="text-tertiary" />
            <text class="custom-empty__text">{{ scenarios.find((s) => s.key === currentKey)?.emptyText }}</text>
          </view>
        </template>
        <view v-for="item in list" :key="item.id" class="list-item" :class="[`list-item--${currentKey}`]">
          <view class="list-item__main">
            <text class="list-item__title">{{ item.title }}</text>
            <text class="list-item__desc">{{ item.desc }}</text>
          </view>
          <text v-if="item.extra" class="list-item__extra">{{ item.extra }}</text>
        </view>
      </ui-pagination>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Pagination 分页", enablePullDownRefresh: true },
})

interface ListItem {
  id: number
  title: string
  desc: string
  extra?: string
}

type ScenarioKey = "goods" | "news" | "order" | "empty"

const scenarios: Array<{ key: ScenarioKey; label: string; total: number; emptyText: string }> = [
  { key: "goods", label: "商品列表", total: 28, emptyText: "暂无商品" },
  { key: "news", label: "资讯流", total: 42, emptyText: "暂无资讯" },
  { key: "order", label: "订单列表", total: 12, emptyText: "暂无订单" },
  { key: "empty", label: "空数据", total: 0, emptyText: "什么都没有" },
]

const currentKey = ref<ScenarioKey>("goods")
const list = ref<ListItem[]>([])
const page = ref(1)
const pageSize = ref(8)
const total = ref(28)
const loading = ref(false)
const eventLog = ref("初次加载中…")

function buildItems(scope: ScenarioKey, pageNum: number, size: number): ListItem[] {
  const cap = scenarios.find((s) => s.key === scope)?.total || 0
  const start = (pageNum - 1) * size
  const length = Math.max(0, Math.min(size, cap - start))
  return Array.from({ length }, (_, i) => {
    const id = start + i + 1
    if (scope === "goods") return { id, title: `商品 ${id} 号`, desc: "限时优惠 · 顺丰发货", extra: `¥${(id * 9.9).toFixed(2)}` }
    if (scope === "news") return { id, title: `资讯标题 ${id}`, desc: `这是第 ${id} 条快讯，了解更多详情`, extra: "刚刚" }
    if (scope === "order") return { id, title: `订单 SF${1000 + id}`, desc: "已发货 · 顺丰快递", extra: "查看物流" }
    return { id, title: `项 ${id}`, desc: "占位" }
  })
}

async function fetchPage(pageNum: number) {
  loading.value = true
  eventLog.value = `[${currentKey.value}] 拉取第 ${pageNum} 页`
  await new Promise((r) => setTimeout(r, 600))
  const items = buildItems(currentKey.value, pageNum, pageSize.value)
  list.value = pageNum === 1 ? items : [...list.value, ...items]
  page.value = pageNum
  loading.value = false
  eventLog.value = `[${currentKey.value}] 第 ${pageNum} 页加载完成 (${items.length} 条)`
}

function switchScenario(key: ScenarioKey) {
  currentKey.value = key
  total.value = scenarios.find((s) => s.key === key)?.total || 0
  list.value = []
  page.value = 1
  fetchPage(1)
}

function onLoad(pageNum: number) {
  fetchPage(pageNum)
}

function onRefresh() {
  list.value = []
  page.value = 1
  fetchPage(1)
}

onMounted(() => fetchPage(1))
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.status-info {
  gap: 8rpx;
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
}

.list-item {
  gap: 16rpx;
  display: flex;
  padding: 24rpx;
  background: var(--ui-color-background);
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &:last-of-type {
    border-bottom: none;
  }

  &__main {
    gap: 6rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: 30rpx;
    font-weight: var(--ui-font-weight-normal);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }

  &__extra {
    color: var(--ui-color-danger);
    font-size: 28rpx;
    font-weight: 600;
  }

  &--news .list-item__extra,
  &--order .list-item__extra {
    color: var(--ui-color-text-tertiary);
    font-size: 24rpx;
    font-weight: 400;
  }
}

.custom-empty {
  gap: 16rpx;
  display: flex;
  padding: 80rpx 0;
  align-items: center;
  flex-direction: column;

  &__text {
    color: var(--ui-color-text-tertiary);
    font-size: 28rpx;
  }
}
</style>
