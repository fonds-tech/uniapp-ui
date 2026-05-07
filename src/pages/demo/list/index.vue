<template>
  <demo-page>
    <demo-section title="基础用法" desc="滚动到底自动触发 load">
      <view class="list-wrap">
        <ui-list v-model:loading="basic.loading" :finished="basic.finished" @load="basic.load">
          <view v-for="item in basic.list" :key="item" class="list-item">{{ item }}</view>
        </ui-list>
      </view>
    </demo-section>

    <demo-section title="加载失败 / 重试" desc="点击错误提示触发重新加载">
      <view class="list-wrap">
        <ui-list v-model:loading="errorCase.loading" v-model:error="errorCase.error" :finished="errorCase.finished" @load="errorCase.load">
          <view v-for="item in errorCase.list" :key="item" class="list-item">{{ item }}</view>
        </ui-list>
      </view>
      <demo-block :gap="12" custom-style="margin-top: 16rpx">
        <ui-button size="small" @click="errorCase.triggerError">下次失败</ui-button>
        <ui-button size="small" type="primary" @click="errorCase.reset">重置</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="加载完成" desc="finished=true 显示底线文案">
      <view class="list-wrap">
        <ui-list v-model:loading="finishCase.loading" :finished="finishCase.finished" finished-text="- 我是有底线的 -" @load="finishCase.load">
          <view v-for="item in finishCase.list" :key="item" class="list-item">{{ item }}</view>
        </ui-list>
      </view>
      <demo-block :gap="12" custom-style="margin-top: 16rpx">
        <ui-button size="small" type="primary" @click="finishCase.reset">重置</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义占位 (loading / finished / error 插槽)">
      <view class="list-wrap">
        <ui-list v-model:loading="customCase.loading" v-model:error="customCase.error" :finished="customCase.finished" @load="customCase.load">
          <view v-for="item in customCase.list" :key="item" class="list-item">{{ item }}</view>
          <template #loading>
            <view class="custom-state">
              <ui-loading size="40rpx" color="primary" />
              <text class="custom-state__text custom-state__text--info">加载中...</text>
            </view>
          </template>
          <template #finished>
            <view class="custom-state">
              <ui-icon name="check-circle" size="36rpx" color="#07c160" />
              <text class="custom-state__text custom-state__text--success">全部加载完成</text>
            </view>
          </template>
          <template #error>
            <view class="custom-state">
              <ui-icon name="close-circle" size="36rpx" color="#ee0a24" />
              <text class="custom-state__text custom-state__text--danger">加载出错，点我重试</text>
            </view>
          </template>
        </ui-list>
      </view>
      <demo-block :gap="12" custom-style="margin-top: 16rpx">
        <ui-button size="small" @click="customCase.triggerError">下次失败</ui-button>
        <ui-button size="small" type="primary" @click="customCase.reset">重置</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="场景：商品列表 + 下拉刷新" desc="搭配 ui-pull-refresh 实现下拉刷新 + 触底加载">
      <view class="list-wrap">
        <ui-pull-refresh v-model="product.refreshing" success-text="刷新成功" @refresh="product.refresh">
          <ui-list v-model:loading="product.loading" :finished="product.finished" @load="product.load">
            <view v-for="item in product.list" :key="item.id" class="product">
              <view class="product__cover">{{ item.id }}</view>
              <view class="product__info">
                <text class="product__title">{{ item.title }}</text>
                <text class="product__price">¥{{ item.price }}</text>
              </view>
            </view>
          </ui-list>
        </ui-pull-refresh>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "List 列表" },
})

const toast = useToast()

// 通用 mock 列表工厂：每页 10 条，30 条到底，1s 模拟网络
function useList(prefix: string, opts: { max?: number; delay?: number } = {}) {
  const max = opts.max ?? 30
  const delay = opts.delay ?? 1000
  const state = reactive({
    list: [] as string[],
    loading: false,
    finished: false,
    error: false,
    nextFail: false,
    load() {
      setTimeout(() => {
        if (state.nextFail) {
          state.error = true
          state.loading = false
          state.nextFail = false
          return
        }
        const start = state.list.length
        for (let i = 0; i < 10; i++) state.list.push(`${prefix} ${start + i + 1}`)
        state.loading = false
        if (state.list.length >= max) state.finished = true
      }, delay)
    },
    triggerError() {
      state.nextFail = true
      toast.text("下次加载将失败")
    },
    reset() {
      state.list = []
      state.loading = false
      state.finished = false
      state.error = false
      state.nextFail = false
    },
  })
  return state
}

const basic = useList("基础项")
const errorCase = useList("错误项")
const finishCase = useList("完成项")
const customCase = useList("自定义项", { delay: 1500 })

// 商品列表
interface Product { id: number; title: string; price: number }
const product = reactive({
  list: [] as Product[],
  loading: false,
  finished: false,
  refreshing: false,
  load() {
    setTimeout(() => {
      const start = product.list.length
      for (let i = 0; i < 8; i++) {
        const id = start + i + 1
        product.list.push({ id, title: `商品 ${id} - 优质好货推荐`, price: Math.floor(Math.random() * 900 + 100) })
      }
      product.loading = false
      if (product.list.length >= 24) product.finished = true
    }, 1000)
  },
  refresh() {
    setTimeout(() => {
      product.list = []
      product.finished = false
      product.refreshing = false
      for (let i = 0; i < 8; i++) {
        product.list.push({ id: i + 1, title: `刷新后商品 ${i + 1}`, price: Math.floor(Math.random() * 900 + 100) })
      }
    }, 1500)
  },
})
</script>

<style lang="scss" scoped>
.list-wrap {
  border: 2rpx solid var(--ui-color-border-light);
  height: 600rpx;
  overflow: hidden;
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-md);
}

.list-item {
  color: var(--ui-color-text);
  height: 100rpx;
  display: flex;
  padding: 0 24rpx;
  font-size: var(--ui-font-size-md);
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);
}

.custom-state {
  gap: 12rpx;
  display: flex;
  padding: 24rpx 0;
  align-items: center;
  justify-content: center;

  &__text {
    font-size: var(--ui-font-size-sm);

    &--info {
      color: var(--ui-color-primary);
    }
    &--success {
      color: var(--ui-color-success);
    }
    &--danger {
      color: var(--ui-color-danger);
    }
  }
}

.product {
  gap: 16rpx;
  display: flex;
  padding: 16rpx 24rpx;
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &__cover {
    color: var(--ui-color-text-inverse);
    width: 96rpx;
    height: 96rpx;
    display: flex;
    background: var(--ui-color-primary);
    align-items: center;
    font-weight: 600;
    border-radius: var(--ui-radius-sm);
    justify-content: center;
  }

  &__info {
    gap: 6rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    overflow: hidden;
    font-size: var(--ui-font-size-md);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-md);
    font-weight: 600;
  }
}
</style>
