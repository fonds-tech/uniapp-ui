<template>
  <demo-page class="list-demo">
    <!-- 基础用法 -->
    <demo-section title="基础用法">
      <demo-block>
        <text class="demo-tip">滚动到底部自动加载更多数据</text>
        <ui-list
          v-model:loading="loading1"
          :finished="finished1"
          finished-text="没有更多了"
          custom-style="height: 600rpx"
          @load="onLoad1"
        >
          <view v-for="item in list1" :key="item" class="demo-list-item">
            <text>{{ item }}</text>
          </view>
        </ui-list>
      </demo-block>
    </demo-section>

    <!-- 错误提示 -->
    <demo-section title="错误提示">
      <demo-block>
        <text class="demo-tip">加载失败时显示错误提示，点击可重试</text>
        <ui-list
          v-model:loading="loading2"
          v-model:error="error2"
          :finished="finished2"
          error-text="加载失败，点击重试"
          custom-style="height: 600rpx"
          @load="onLoad2"
        >
          <view v-for="item in list2" :key="item" class="demo-list-item">
            <text>{{ item }}</text>
          </view>
        </ui-list>
        <view class="demo-actions">
          <ui-button size="small" @click="triggerError2">模拟加载失败</ui-button>
          <ui-button size="small" type="primary" @click="resetList2">重置列表</ui-button>
        </view>
      </demo-block>
    </demo-section>

    <!-- 加载完成 -->
    <demo-section title="加载完成">
      <demo-block>
        <text class="demo-tip">所有数据加载完成后显示提示文案</text>
        <ui-list
          v-model:loading="loading3"
          :finished="finished3"
          finished-text="- 我是有底线的 -"
          custom-style="height: 600rpx"
          @load="onLoad3"
        >
          <view v-for="item in list3" :key="item" class="demo-list-item">
            <text>{{ item }}</text>
          </view>
        </ui-list>
        <view class="demo-actions">
          <ui-button size="small" type="primary" @click="resetList3">重置列表</ui-button>
        </view>
      </demo-block>
    </demo-section>

    <!-- 自定义提示 -->
    <demo-section title="自定义提示">
      <demo-block>
        <text class="demo-tip">通过插槽自定义加载、完成、错误状态的提示内容</text>
        <ui-list
          v-model:loading="loading4"
          v-model:error="error4"
          :finished="finished4"
          custom-style="height: 600rpx"
          @load="onLoad4"
        >
          <view v-for="item in list4" :key="item" class="demo-list-item">
            <text>{{ item }}</text>
          </view>

          <!-- 自定义加载中状态 -->
          <template #loading>
            <view class="custom-loading">
              <ui-loading size="40rpx" color="primary" />
              <text class="custom-loading__text">正在努力加载中...</text>
            </view>
          </template>

          <!-- 自定义加载完成状态 -->
          <template #finished>
            <view class="custom-finished">
              <ui-icon name="check-circle" size="36rpx" color="#07c160" />
              <text class="custom-finished__text">全部加载完成</text>
            </view>
          </template>

          <!-- 自定义错误状态 -->
          <template #error>
            <view class="custom-error">
              <ui-icon name="close-circle" size="36rpx" color="#ee0a24" />
              <text class="custom-error__text">加载出错了，点我重试</text>
            </view>
          </template>
        </ui-list>
        <view class="demo-actions">
          <ui-button size="small" @click="triggerError4">模拟失败</ui-button>
          <ui-button size="small" type="primary" @click="resetList4">重置</ui-button>
        </view>
      </demo-block>
    </demo-section>

    <!-- 下拉刷新 -->
    <demo-section title="下拉刷新">
      <demo-block>
        <text class="demo-tip">结合 ui-pull-refresh 组件实现下拉刷新功能</text>
        <ui-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
          <ui-list
            v-model:loading="loading5"
            :finished="finished5"
            finished-text="没有更多了"
            custom-style="height: 600rpx"
            @load="onLoad5"
          >
            <view v-for="item in list5" :key="item" class="demo-list-item">
              <text>{{ item }}</text>
            </view>
          </ui-list>
        </ui-pull-refresh>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "List 列表" },
})

// 基础用法
const list1 = ref<string[]>([])
const loading1 = ref(false)
const finished1 = ref(false)

function onLoad1() {
  setTimeout(() => {
    const currentLength = list1.value.length
    for (let i = 0; i < 10; i++) {
      list1.value.push(`基础列表项 ${currentLength + i + 1}`)
    }
    loading1.value = false
    if (list1.value.length >= 30) {
      finished1.value = true
    }
  }, 1000)
}

// 错误提示
const list2 = ref<string[]>([])
const loading2 = ref(false)
const finished2 = ref(false)
const error2 = ref(false)
let shouldError2 = false

function onLoad2() {
  setTimeout(() => {
    if (shouldError2) {
      error2.value = true
      loading2.value = false
      shouldError2 = false
      return
    }
    const currentLength = list2.value.length
    for (let i = 0; i < 10; i++) {
      list2.value.push(`错误示例项 ${currentLength + i + 1}`)
    }
    loading2.value = false
    if (list2.value.length >= 30) {
      finished2.value = true
    }
  }, 1000)
}

function triggerError2() {
  shouldError2 = true
}

function resetList2() {
  list2.value = []
  loading2.value = false
  finished2.value = false
  error2.value = false
  shouldError2 = false
}

// 加载完成
const list3 = ref<string[]>([])
const loading3 = ref(false)
const finished3 = ref(false)

function onLoad3() {
  setTimeout(() => {
    const currentLength = list3.value.length
    for (let i = 0; i < 10; i++) {
      list3.value.push(`完成示例项 ${currentLength + i + 1}`)
    }
    loading3.value = false
    if (list3.value.length >= 30) {
      finished3.value = true
    }
  }, 1000)
}

function resetList3() {
  list3.value = []
  loading3.value = false
  finished3.value = false
}

// 自定义提示
const list4 = ref<string[]>([])
const loading4 = ref(false)
const finished4 = ref(false)
const error4 = ref(false)
let shouldError4 = false

function onLoad4() {
  setTimeout(() => {
    if (shouldError4) {
      error4.value = true
      loading4.value = false
      shouldError4 = false
      return
    }
    const currentLength = list4.value.length
    for (let i = 0; i < 10; i++) {
      list4.value.push(`自定义示例项 ${currentLength + i + 1}`)
    }
    loading4.value = false
    if (list4.value.length >= 30) {
      finished4.value = true
    }
  }, 1500)
}

function triggerError4() {
  shouldError4 = true
}

function resetList4() {
  list4.value = []
  loading4.value = false
  finished4.value = false
  error4.value = false
  shouldError4 = false
}

// 下拉刷新
const list5 = ref<string[]>([])
const loading5 = ref(false)
const finished5 = ref(false)
const refreshing = ref(false)

function onLoad5() {
  setTimeout(() => {
    const currentLength = list5.value.length
    for (let i = 0; i < 10; i++) {
      list5.value.push(`刷新列表项 ${currentLength + i + 1}`)
    }
    loading5.value = false
    if (list5.value.length >= 30) {
      finished5.value = true
    }
  }, 1000)
}

function onRefresh() {
  setTimeout(() => {
    // 重置列表状态
    finished5.value = false
    list5.value = []
    // 关闭刷新状态
    refreshing.value = false
    // 重新加载数据
    for (let i = 0; i < 10; i++) {
      list5.value.push(`刷新后列表项 ${i + 1}`)
    }
    if (list5.value.length >= 30) {
      finished5.value = true
    }
  }, 1500)
}
</script>

<style lang="scss" scoped>
.list-demo {
  background: var(--ui-color-background, #f7f8fa);
}

.demo-tip {
  color: var(--ui-color-text-secondary, #969799);
  display: block;
  font-size: 24rpx;
  margin-bottom: 20rpx;
}

.demo-list-item {
  color: var(--ui-color-text, #323233);
  height: 100rpx;
  display: flex;
  padding: 0 24rpx;
  font-size: 28rpx;
  background: var(--ui-color-background-2, #fff);
  align-items: center;
  border-bottom: 1rpx solid var(--ui-color-border, #ebedf0);

  &:last-child {
    border-bottom: none;
  }
}

.demo-actions {
  gap: 20rpx;
  display: flex;
  padding: 20rpx 0;
  justify-content: center;
}

// 自定义加载中状态
.custom-loading {
  gap: 12rpx;
  display: flex;
  padding: 20rpx 0;
  align-items: center;
  justify-content: center;

  &__text {
    color: var(--ui-color-primary, #1989fa);
    font-size: 26rpx;
  }
}

// 自定义加载完成状态
.custom-finished {
  gap: 8rpx;
  display: flex;
  padding: 20rpx 0;
  align-items: center;
  justify-content: center;

  &__text {
    color: var(--ui-color-success, #07c160);
    font-size: 26rpx;
  }
}

// 自定义错误状态
.custom-error {
  gap: 8rpx;
  display: flex;
  padding: 20rpx 0;
  align-items: center;
  justify-content: center;

  &__text {
    color: var(--ui-color-danger, #ee0a24);
    font-size: 26rpx;
  }
}
</style>
