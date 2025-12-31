<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-button type="primary" @click="showBasicDialog">提示弹窗</ui-button>
        <ui-button type="primary" @click="showConfirmDialog">确认弹窗</ui-button>
      </view>
    </view>

    <!-- 圆角按钮 -->
    <view class="demo-section">
      <text class="section-title">圆角按钮</text>
      <view class="demo-block">
        <ui-button @click="showRoundDialog">圆角按钮</ui-button>
      </view>
    </view>

    <!-- 异步关闭 -->
    <view class="demo-section">
      <text class="section-title">异步关闭</text>
      <view class="demo-block">
        <ui-button @click="showAsyncDialog">异步关闭</ui-button>
      </view>
    </view>

    <!-- 组件调用 -->
    <view class="demo-section">
      <text class="section-title">组件调用</text>
      <view class="demo-block">
        <ui-button type="primary" @click="showComponentDialog = true">组件方式</ui-button>
      </view>
    </view>

    <!-- Dialog 组件 -->
    <ui-dialog v-model:show="showComponentDialog" title="标题" message="这是通过组件方式调用的对话框" show-cancel-button />

    <!-- API 说明 -->
    <view class="api-section">
      <text class="section-title">方法说明</text>
      <view class="api-table">
        <view class="api-row api-header">
          <text class="api-cell">方法</text>
          <text class="api-cell">说明</text>
        </view>
        <view class="api-row">
          <text class="api-cell">showDialog</text>
          <text class="api-cell">展示对话框</text>
        </view>
        <view class="api-row">
          <text class="api-cell">showConfirmDialog</text>
          <text class="api-cell">确认对话框</text>
        </view>
        <view class="api-row">
          <text class="api-cell">hideDialog</text>
          <text class="api-cell">关闭对话框</text>
        </view>
      </view>
    </view>

    <!-- 常用属性 -->
    <view class="api-section">
      <text class="section-title">常用属性</text>
      <view class="api-table">
        <view class="api-row api-header">
          <text class="api-cell">属性</text>
          <text class="api-cell">说明</text>
          <text class="api-cell">类型</text>
        </view>
        <view class="api-row">
          <text class="api-cell">title</text>
          <text class="api-cell">标题</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">message</text>
          <text class="api-cell">内容</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">show-cancel-button</text>
          <text class="api-cell">是否显示取消按钮</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">confirm-button-text</text>
          <text class="api-cell">确认按钮文字</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">cancel-button-text</text>
          <text class="api-cell">取消按钮文字</text>
          <text class="api-cell">string</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Dialog 对话框" },
})

import { ref } from "vue"
import { useDialog } from "@/ui"

const { showDialog } = useDialog()
const showComponentDialog = ref(false)

function showBasicDialog() {
  showDialog({
    title: "提示",
    message: "这是一个提示弹窗",
  })
}

function showConfirmDialog() {
  showDialog({
    title: "确认",
    message: "确定要执行此操作吗？",
    showCancelButton: true,
  })
}

function showRoundDialog() {
  showDialog({
    title: "提示",
    message: "这是圆角按钮弹窗",
    theme: "round-button",
  })
}

function showAsyncDialog() {
  showDialog({
    title: "异步关闭",
    message: "点击确认后延迟1秒关闭",
    showCancelButton: true,
    beforeClose: (action) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(action === "confirm")
        }, 1000)
      })
    },
  })
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
