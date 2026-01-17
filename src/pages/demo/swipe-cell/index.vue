<template>
  <demo-page>
    <!-- 基础用法 -->
    <demo-section title="基础用法" desc="左滑显示操作按钮">
      <ui-swipe-cell @open="onOpen" @close="onClose">
        <ui-cell title="单元格" value="内容" :border="false" />
        <template #right>
          <view class="action-btn action-btn--danger" @click="onDelete">删除</view>
        </template>
      </ui-swipe-cell>
    </demo-section>

    <!-- 左右滑动 -->
    <demo-section title="左右滑动" desc="同时设置左右操作按钮">
      <ui-swipe-cell>
        <ui-cell title="单元格" value="左右滑动试试" :border="false" />
        <template #left>
          <view class="action-btn action-btn--primary">选择</view>
        </template>
        <template #right>
          <view class="action-btn action-btn--warning">收藏</view>
          <view class="action-btn action-btn--danger">删除</view>
        </template>
      </ui-swipe-cell>
    </demo-section>

    <!-- 自定义内容 -->
    <demo-section title="自定义内容" desc="自定义单元格和操作按钮样式">
      <ui-swipe-cell>
        <view class="custom-cell">
          <ui-image src="https://img.yzcdn.cn/vant/cat.jpeg" width="80rpx" height="80rpx" radius="8rpx" />
          <view class="custom-cell__content">
            <text class="custom-cell__title">商品名称</text>
            <text class="custom-cell__desc">描述信息</text>
          </view>
          <text class="custom-cell__price">¥99.00</text>
        </view>
        <template #right>
          <view class="action-btn action-btn--danger action-btn--large">删除</view>
        </template>
      </ui-swipe-cell>
    </demo-section>

    <!-- 异步关闭 -->
    <demo-section title="异步关闭" desc="通过 beforeClose 控制关闭行为">
      <ui-swipe-cell :before-close="beforeClose">
        <ui-cell title="异步关闭" value="点击删除按钮" :border="false" />
        <template #right>
          <view class="action-btn action-btn--danger">删除</view>
        </template>
      </ui-swipe-cell>
    </demo-section>

    <!-- 禁用滑动 -->
    <demo-section title="禁用滑动" desc="设置 disabled 禁用滑动">
      <ui-swipe-cell disabled>
        <ui-cell title="禁用滑动" value="无法滑动" :border="false" />
        <template #right>
          <view class="action-btn action-btn--danger">删除</view>
        </template>
      </ui-swipe-cell>
    </demo-section>

    <!-- 列表场景 -->
    <demo-section title="列表场景" desc="在列表中使用滑动单元格">
      <view class="list-container">
        <ui-swipe-cell v-for="(item, index) in listData" :key="item.id" :name="item.id" @click="onItemClick">
          <ui-cell :title="item.title" :value="item.value" :border="index !== listData.length - 1" />
          <template #right>
            <view class="action-btn action-btn--primary" @click.stop="onEdit(item)">编辑</view>
            <view class="action-btn action-btn--danger" @click.stop="onDeleteItem(item)">删除</view>
          </template>
        </ui-swipe-cell>
      </view>
    </demo-section>

    <!-- 事件回调展示 -->
    <demo-section title="事件回调" desc="展示各种事件的触发情况">
      <ui-swipe-cell name="event-demo" @open="onEventOpen" @close="onEventClose" @click="onEventClick">
        <ui-cell title="事件演示" :value="eventStatus" :border="false" />
        <template #right>
          <view class="action-btn action-btn--danger">操作</view>
        </template>
      </ui-swipe-cell>
      <view v-if="eventLog.length > 0" class="event-log">
        <text class="event-log__title">事件日志：</text>
        <text v-for="(log, index) in eventLog" :key="index" class="event-log__item">{{ log }}</text>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { SwipeCellBeforeCloseParams } from "@/uni_modules/uniapp-ui/ui-swipe-cell"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "SwipeCell 滑动单元格" },
})

// 列表数据
const listData = ref([
  { id: 1, title: "列表项 1", value: "内容" },
  { id: 2, title: "列表项 2", value: "内容" },
  { id: 3, title: "列表项 3", value: "内容" },
])

// 事件状态
const eventStatus = ref("等待操作...")
const eventLog = ref<string[]>([])

// 基础事件
function onOpen(params: { name: string | number; position: string }) {
  uni.showToast({ title: `打开: ${params.position}`, icon: "none" })
}

function onClose(params: { name: string | number; position: string }) {
  uni.showToast({ title: `关闭: ${params.position}`, icon: "none" })
}

function onDelete() {
  uni.showModal({
    title: "提示",
    content: "确定删除吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: "删除成功", icon: "success" })
      }
    },
  })
}

// 异步关闭
function beforeClose(params: SwipeCellBeforeCloseParams): Promise<boolean> {
  return new Promise((resolve) => {
    uni.showModal({
      title: "提示",
      content: "确定删除吗？",
      success: (res) => {
        if (res.confirm) {
          uni.showToast({ title: "删除成功", icon: "success" })
          resolve(true)
        } else {
          resolve(false)
        }
      },
    })
  })
}

// 列表操作
function onItemClick(position: string) {
  console.log("点击位置:", position)
}

function onEdit(item: { id: number; title: string }) {
  uni.showToast({ title: `编辑: ${item.title}`, icon: "none" })
}

function onDeleteItem(item: { id: number; title: string }) {
  uni.showModal({
    title: "提示",
    content: `确定删除 ${item.title} 吗？`,
    success: (res) => {
      if (res.confirm) {
        const index = listData.value.findIndex((i) => i.id === item.id)
        if (index > -1) {
          listData.value.splice(index, 1)
          uni.showToast({ title: "删除成功", icon: "success" })
        }
      }
    },
  })
}

// 事件演示
function onEventOpen(params: { name: string | number; position: string }) {
  eventStatus.value = `已打开 (${params.position})`
  addEventLog(`open: position=${params.position}`)
}

function onEventClose(params: { name: string | number; position: string }) {
  eventStatus.value = "已关闭"
  addEventLog(`close: position=${params.position}`)
}

function onEventClick(position: string) {
  addEventLog(`click: position=${position}`)
}

function addEventLog(log: string) {
  const now = new Date()
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  eventLog.value.unshift(`[${time}] ${log}`)
  // 只保留最近 5 条记录
  if (eventLog.value.length > 5) {
    eventLog.value.pop()
  }
}
</script>

<style lang="scss" scoped>
.action-btn {
  color: #fff;
  height: 100%;
  display: flex;
  padding: 0 32rpx;
  font-size: 28rpx;
  align-items: center;
  white-space: nowrap;
  justify-content: center;

  &--primary {
    background: #1989fa;
  }

  &--warning {
    background: #ff976a;
  }

  &--danger {
    background: #ee0a24;
  }

  &--large {
    padding: 0 48rpx;
  }
}

.custom-cell {
  display: flex;
  padding: 24rpx 32rpx;
  background: #fff;
  align-items: center;

  &__content {
    flex: 1;
    display: flex;
    margin-left: 24rpx;
    flex-direction: column;
  }

  &__title {
    color: #323233;
    font-size: 28rpx;
    font-weight: 500;
  }

  &__desc {
    color: #969799;
    font-size: 24rpx;
    margin-top: 8rpx;
  }

  &__price {
    color: #ee0a24;
    font-size: 32rpx;
    font-weight: 600;
  }
}

.list-container {
  overflow: hidden;
  border-radius: 16rpx;
}

.event-log {
  padding: 24rpx;
  background: #f7f8fa;
  margin-top: 24rpx;
  border-radius: 12rpx;

  &__title {
    color: #323233;
    display: block;
    font-size: 26rpx;
    font-weight: 500;
    margin-bottom: 16rpx;
  }

  &__item {
    color: #969799;
    display: block;
    font-size: 24rpx;
    line-height: 1.8;
  }
}
</style>
