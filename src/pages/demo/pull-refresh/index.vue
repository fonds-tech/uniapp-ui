<template>
  <demo-page class="pull-refresh-demo">
    <demo-section title="基础用法">
      <demo-block>
        <text class="demo-tip">在列表区域下拉即可触发刷新</text>
        <ui-pull-refresh v-model="loading1" @refresh="onRefresh1">
          <view class="demo-list">
            <view v-for="item in list1" :key="item" class="demo-list-item">
              <text>{{ item }}</text>
            </view>
          </view>
        </ui-pull-refresh>
      </demo-block>
    </demo-section>

    <demo-section title="成功提示">
      <demo-block>
        <text class="demo-tip">刷新成功后展示成功提示</text>
        <ui-pull-refresh v-model="loading2" success-text="刷新成功" :success-duration="1000" @refresh="onRefresh2">
          <view class="demo-list">
            <view v-for="item in list2" :key="item" class="demo-list-item">
              <text>{{ item }}</text>
            </view>
          </view>
        </ui-pull-refresh>
      </demo-block>
    </demo-section>

    <demo-section title="自定义文案">
      <demo-block>
        <text class="demo-tip">可自定义各状态的提示文案</text>
        <ui-pull-refresh v-model="loading3" pulling-text="继续下拉..." loosing-text="松开刷新" loading-text="正在刷新数据..." success-text="数据已更新" @refresh="onRefresh3">
          <view class="demo-list">
            <view v-for="item in list3" :key="item" class="demo-list-item">
              <text>{{ item }}</text>
            </view>
          </view>
        </ui-pull-refresh>
      </demo-block>
    </demo-section>

    <demo-section title="自定义插槽">
      <demo-block>
        <text class="demo-tip">使用插槽自定义下拉刷新的各个状态</text>
        <ui-pull-refresh v-model="loading4" @refresh="onRefresh4">
          <template #pulling="{ distance }">
            <view class="custom-tip">
              <view class="custom-icon" :style="{ transform: `rotate(${Math.min(distance * 2, 180)}deg)` }"> ↓ </view>
              <text>下拉距离: {{ Math.round(distance) }}px</text>
            </view>
          </template>
          <template #loosing>
            <view class="custom-tip custom-tip--active">
              <view class="custom-icon" style="transform: rotate(180deg)">↓</view>
              <text>释放刷新</text>
            </view>
          </template>
          <template #loading>
            <view class="custom-tip custom-tip--loading">
              <ui-loading size="32rpx" color="primary" />
              <text>努力加载中...</text>
            </view>
          </template>
          <template #success>
            <view class="custom-tip custom-tip--success">
              <text>加载成功</text>
            </view>
          </template>
          <view class="demo-list">
            <view v-for="item in list4" :key="item" class="demo-list-item">
              <text>{{ item }}</text>
            </view>
          </view>
        </ui-pull-refresh>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <text class="demo-tip">设置 disabled 禁用下拉刷新</text>
        <ui-pull-refresh v-model="loading5" disabled @refresh="onRefresh5">
          <view class="demo-list demo-list--disabled">
            <view v-for="item in list5" :key="item" class="demo-list-item">
              <text>{{ item }}</text>
            </view>
          </view>
        </ui-pull-refresh>
      </demo-block>
    </demo-section>

    <!-- 回调信息展示 -->
    <demo-section title="回调信息">
      <demo-block>
        <view class="callback-info">
          <text class="callback-title">状态变化记录：</text>
          <scroll-view scroll-y class="callback-list">
            <text v-for="(log, index) in callbackLogs" :key="index" class="callback-item">
              {{ log }}
            </text>
          </scroll-view>
          <ui-button size="small" @click="clearLogs">清除记录</ui-button>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "PullRefresh 下拉刷新" },
})

// 基础用法
const loading1 = ref(false)
const list1 = ref(["项目 1", "项目 2", "项目 3", "项目 4", "项目 5"])

// 成功提示
const loading2 = ref(false)
const list2 = ref(["项目 A", "项目 B", "项目 C", "项目 D", "项目 E"])

// 自定义文案
const loading3 = ref(false)
const list3 = ref(["数据 1", "数据 2", "数据 3", "数据 4", "数据 5"])

// 自定义插槽
const loading4 = ref(false)
const list4 = ref(["记录 1", "记录 2", "记录 3", "记录 4", "记录 5"])

// 禁用状态
const loading5 = ref(false)
const list5 = ref(["禁用 1", "禁用 2", "禁用 3", "禁用 4", "禁用 5"])

// 回调日志
const callbackLogs = ref<string[]>([])

function addLog(message: string) {
  const time = new Date().toLocaleTimeString()
  callbackLogs.value.unshift(`[${time}] ${message}`)
  // 最多保留 20 条记录
  if (callbackLogs.value.length > 20) {
    callbackLogs.value.pop()
  }
}

function clearLogs() {
  callbackLogs.value = []
}

// 模拟刷新操作
function simulateRefresh(callback: () => void, delay = 1500) {
  setTimeout(() => {
    callback()
  }, delay)
}

function onRefresh1() {
  addLog("基础用法 - 开始刷新")
  simulateRefresh(() => {
    list1.value = list1.value.map((_, i) => `项目 ${i + 1} (已刷新)`)
    loading1.value = false
    addLog("基础用法 - 刷新完成")
  })
}

function onRefresh2() {
  addLog("成功提示 - 开始刷新")
  simulateRefresh(() => {
    list2.value = list2.value.map((_, i) => `项目 ${String.fromCharCode(65 + i)} (已刷新)`)
    loading2.value = false
    addLog("成功提示 - 刷新完成")
  })
}

function onRefresh3() {
  addLog("自定义文案 - 开始刷新")
  simulateRefresh(() => {
    list3.value = list3.value.map((_, i) => `数据 ${i + 1} (已刷新)`)
    loading3.value = false
    addLog("自定义文案 - 刷新完成")
  })
}

function onRefresh4() {
  addLog("自定义插槽 - 开始刷新")
  simulateRefresh(() => {
    list4.value = list4.value.map((_, i) => `记录 ${i + 1} (已刷新)`)
    loading4.value = false
    addLog("自定义插槽 - 刷新完成")
  })
}

function onRefresh5() {
  addLog("禁用状态 - 不应触发刷新")
  loading5.value = false
}
</script>

<style lang="scss" scoped>
.pull-refresh-demo {
  background: var(--ui-color-background, #f7f8fa);
}

.demo-tip {
  color: var(--ui-color-text-secondary, #969799);
  display: block;
  font-size: 24rpx;
  margin-bottom: 20rpx;
}

.demo-list {
  padding: 0 24rpx;
  background: var(--ui-color-background-2, #fff);
  border-radius: 16rpx;

  &--disabled {
    opacity: 0.6;
  }
}

.demo-list-item {
  color: var(--ui-color-text, #323233);
  height: 100rpx;
  display: flex;
  font-size: 28rpx;
  align-items: center;
  border-bottom: 1rpx solid var(--ui-color-border, #ebedf0);

  &:last-child {
    border-bottom: none;
  }
}

.custom-tip {
  gap: 16rpx;
  color: var(--ui-color-text-secondary, #969799);
  display: flex;
  font-size: 26rpx;
  align-items: center;
  justify-content: center;

  &--active {
    color: var(--ui-color-primary, #1989fa);
  }

  &--loading {
    color: var(--ui-color-primary, #1989fa);
  }

  &--success {
    color: var(--ui-color-success, #07c160);
  }
}

.custom-icon {
  font-size: 32rpx;
  transition: transform 0.3s;
}

.callback-info {
  padding: 20rpx;
  background: var(--ui-color-background-2, #fff);
  border-radius: 16rpx;
}

.callback-title {
  color: var(--ui-color-text, #323233);
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.callback-list {
  padding: 16rpx;
  background: var(--ui-color-background, #f7f8fa);
  max-height: 300rpx;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.callback-item {
  color: var(--ui-color-text-secondary, #969799);
  display: block;
  padding: 8rpx 0;
  font-size: 24rpx;
  line-height: 1.6;
  border-bottom: 1rpx solid var(--ui-color-border, #ebedf0);

  &:last-child {
    border-bottom: none;
  }
}
</style>
