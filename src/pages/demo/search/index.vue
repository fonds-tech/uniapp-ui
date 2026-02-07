<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-search v-model="keyword" placeholder="请输入搜索关键词" />
    </demo-section>

    <demo-section title="圆角搜索框">
      <ui-search v-model="roundKeyword" round placeholder="圆角搜索框" />
    </demo-section>

    <demo-section title="自定义图标">
      <ui-search v-model="scanKeyword" icon="scan" placeholder="扫描搜索" />
      <ui-search v-model="noIconKeyword" icon="" placeholder="隐藏图标" />
    </demo-section>

    <demo-section title="自定义背景">
      <ui-search v-model="bgKeyword" background="#f5f5f5" placeholder="灰色背景" />
    </demo-section>

    <demo-section title="隐藏按钮">
      <ui-search v-model="noActionKeyword" :action="false" placeholder="隐藏搜索按钮" />
    </demo-section>

    <demo-section title="禁用状态">
      <ui-search v-model="disabledKeyword" disabled placeholder="禁用状态" />
    </demo-section>

    <demo-section title="事件监听">
      <ui-search v-model="eventKeyword" placeholder="输入后查看事件" @search="onSearch" @clear="onClear" />
      <view v-if="eventLogs.length" class="event-list">
        <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
          <text class="event-text">{{ log }}</text>
        </view>
      </view>
    </demo-section>

    <ui-toast ref="toastRef" />
  </demo-page>
</template>

<script setup lang="ts">
import type { ToastInstance } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Search 搜索" },
})

const toastRef = ref<ToastInstance>()

const keyword = ref("")
const roundKeyword = ref("")
const scanKeyword = ref("")
const noIconKeyword = ref("")
const bgKeyword = ref("")
const actionKeyword = ref("")
const noActionKeyword = ref("")
const disabledKeyword = ref("禁用内容")
const eventKeyword = ref("")

const eventLogs = ref<string[]>([])

function addLog(msg: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${msg}`)
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

function onSearch(value: string) {
  addLog(`搜索: ${value}`)
  toastRef.value?.success(`搜索: ${value}`)
}

function onClear() {
  addLog("清空内容")
}
</script>

<style lang="scss" scoped>
.event-list {
  width: 100%;
  padding: 16rpx;
  background: var(--ui-color-background-page);
  max-height: 250rpx;
  overflow-y: auto;
  border-radius: 8rpx;
}

.event-item {
  padding: 8rpx 0;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }
}

.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 22rpx;
}
</style>
