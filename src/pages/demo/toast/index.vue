<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Toast 轻提示"
  }
}
</route>

<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-button type="primary" @click="showToast('文字提示')">文字提示</ui-button>
        <ui-button type="success" @click="showSuccessToast">成功提示</ui-button>
        <ui-button type="warning" @click="showFailToast">失败提示</ui-button>
      </view>
    </view>

    <!-- 加载提示 -->
    <view class="demo-section">
      <text class="section-title">加载提示</text>
      <view class="demo-block">
        <ui-button @click="showLoadingToast">加载提示</ui-button>
      </view>
    </view>

    <!-- 自定义图标 -->
    <view class="demo-section">
      <text class="section-title">自定义图标</text>
      <view class="demo-block">
        <ui-button @click="showIconToast('star', '收藏成功')">自定义图标</ui-button>
        <ui-button @click="showIconToast('heart', '已喜欢')">心形图标</ui-button>
      </view>
    </view>

    <!-- 自定义位置 -->
    <view class="demo-section">
      <text class="section-title">自定义位置</text>
      <view class="demo-block">
        <ui-button @click="showPositionToast('top')">顶部展示</ui-button>
        <ui-button @click="showPositionToast('center')">居中展示</ui-button>
        <ui-button @click="showPositionToast('bottom')">底部展示</ui-button>
      </view>
    </view>

    <!-- 自定义时长 -->
    <view class="demo-section">
      <text class="section-title">自定义时长</text>
      <view class="demo-block">
        <ui-button @click="showDurationToast(1000)">1秒后关闭</ui-button>
        <ui-button @click="showDurationToast(3000)">3秒后关闭</ui-button>
        <ui-button @click="showDurationToast(5000)">5秒后关闭</ui-button>
      </view>
    </view>

    <!-- API 说明 -->
    <view class="api-section">
      <text class="section-title">方法说明</text>
      <view class="api-table">
        <view class="api-row api-header">
          <text class="api-cell">方法</text>
          <text class="api-cell">说明</text>
          <text class="api-cell">参数</text>
        </view>
        <view class="api-row">
          <text class="api-cell">showToast</text>
          <text class="api-cell">展示提示</text>
          <text class="api-cell">options/message</text>
        </view>
        <view class="api-row">
          <text class="api-cell">showLoading</text>
          <text class="api-cell">展示加载</text>
          <text class="api-cell">options/message</text>
        </view>
        <view class="api-row">
          <text class="api-cell">hideToast</text>
          <text class="api-cell">关闭提示</text>
          <text class="api-cell">-</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"

const { showToast } = useToast()

function showSuccessToast() {
  showToast({ message: "操作成功", type: "success" })
}

function showFailToast() {
  showToast({ message: "操作失败", type: "fail" })
}

function showLoadingToast() {
  showToast({ message: "加载中...", type: "loading", duration: 2000 })
}

function showIconToast(icon: string, message: string) {
  showToast({ message, icon })
}

function showPositionToast(position: string) {
  showToast({ message: `${position} 位置`, position })
}

function showDurationToast(duration: number) {
  showToast({ message: `${duration / 1000}秒后关闭`, duration })
}
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 24rpx 32rpx;
  background: #f5f6fa;
  min-height: 100vh;
  padding-bottom: 60rpx;
}

.demo-section {
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}

.section-title {
  color: #333;
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 24rpx;
}

.demo-block {
  gap: 16rpx;
  display: flex;
  flex-wrap: wrap;
}

.api-section {
  padding: 24rpx;
  background: #fff;
  overflow-x: auto;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}

.api-table {
  min-width: 500rpx;
}

.api-row {
  display: flex;
  border-bottom: 1rpx solid #eee;

  &.api-header {
    background: #f8f9fa;
    font-weight: 600;
  }
}

.api-cell {
  flex: 1;
  color: #333;
  padding: 16rpx 12rpx;
  font-size: 24rpx;
  word-break: break-all;
}
</style>
