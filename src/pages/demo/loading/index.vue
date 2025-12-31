<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-loading />
      </view>
    </view>

    <!-- 加载类型 -->
    <view class="demo-section">
      <text class="section-title">加载类型</text>
      <view class="demo-block">
        <ui-loading type="circular" />
        <ui-loading type="spinner" />
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block">
        <ui-loading color="#1989fa" />
        <ui-loading color="#07c160" />
        <ui-loading color="#ee0a24" />
        <ui-loading color="#7232dd" />
      </view>
    </view>

    <!-- 自定义大小 -->
    <view class="demo-section">
      <text class="section-title">自定义大小</text>
      <view class="demo-block">
        <ui-loading size="24rpx" />
        <ui-loading size="36rpx" />
        <ui-loading size="48rpx" />
        <ui-loading size="64rpx" />
      </view>
    </view>

    <!-- 加载文案 -->
    <view class="demo-section">
      <text class="section-title">加载文案</text>
      <view class="demo-block-vertical">
        <ui-loading text="加载中..." />
        <ui-loading text="请稍候..." vertical />
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
          <text class="api-cell">type</text>
          <text class="api-cell">类型</text>
          <text class="api-cell">circular/spinner</text>
        </view>
        <view class="api-row">
          <text class="api-cell">color</text>
          <text class="api-cell">颜色</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">size</text>
          <text class="api-cell">大小</text>
          <text class="api-cell">string/number</text>
        </view>
        <view class="api-row">
          <text class="api-cell">text</text>
          <text class="api-cell">加载文案</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">vertical</text>
          <text class="api-cell">是否垂直排列</text>
          <text class="api-cell">boolean</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Loading 加载" },
})

// Loading 演示页面
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
  gap: 32rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.demo-block-vertical {
  gap: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
