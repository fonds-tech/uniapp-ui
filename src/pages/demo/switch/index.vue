<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-switch v-model="value1" />
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block">
        <ui-switch v-model="value2" disabled />
        <ui-switch :model-value="true" disabled />
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="demo-section">
      <text class="section-title">加载状态</text>
      <view class="demo-block">
        <ui-switch v-model="value3" loading />
      </view>
    </view>

    <!-- 自定义大小 -->
    <view class="demo-section">
      <text class="section-title">自定义大小</text>
      <view class="demo-block">
        <ui-switch v-model="value4" size="40rpx" />
        <ui-switch v-model="value5" size="50rpx" />
        <ui-switch v-model="value6" size="60rpx" />
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block">
        <ui-switch v-model="value7" active-color="#ee0a24" />
        <ui-switch v-model="value8" active-color="#7232dd" />
        <ui-switch v-model="value9" active-color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
      </view>
    </view>

    <!-- 异步控制 -->
    <view class="demo-section">
      <text class="section-title">异步控制</text>
      <view class="demo-block">
        <ui-switch v-model="asyncValue" :loading="asyncLoading" @change="onAsyncChange" />
        <text class="demo-text">点击后延迟1秒切换</text>
      </view>
    </view>

    <!-- API 说明 -->
    <view class="api-section">
      <text class="section-title">常用属性</text>
      <view class="api-table">
        <view class="api-row api-header">
          <text class="api-cell">属性</text>
          <text class="api-cell">说明</text>
          <text class="api-cell">类型</text>
        </view>
        <view class="api-row">
          <text class="api-cell">v-model</text>
          <text class="api-cell">开关状态</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">disabled</text>
          <text class="api-cell">是否禁用</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">loading</text>
          <text class="api-cell">是否加载中</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">size</text>
          <text class="api-cell">开关大小</text>
          <text class="api-cell">string/number</text>
        </view>
        <view class="api-row">
          <text class="api-cell">active-color</text>
          <text class="api-cell">打开时的颜色</text>
          <text class="api-cell">string</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Switch 开关" },
})

import { ref } from "vue"

const value1 = ref(false)
const value2 = ref(false)
const value3 = ref(true)
const value4 = ref(true)
const value5 = ref(true)
const value6 = ref(true)
const value7 = ref(true)
const value8 = ref(true)
const value9 = ref(true)

const asyncValue = ref(false)
const asyncLoading = ref(false)

function onAsyncChange() {
  asyncLoading.value = true
  setTimeout(() => {
    asyncValue.value = !asyncValue.value
    asyncLoading.value = false
  }, 1000)
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
  gap: 24rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.demo-text {
  color: #999;
  font-size: 24rpx;
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
