<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Icon 图标"
  }
}
</route>

<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-icon name="check" />
        <ui-icon name="close" />
        <ui-icon name="plus" />
        <ui-icon name="minus" />
        <ui-icon name="search" />
        <ui-icon name="arrow-right" />
        <ui-icon name="arrow-left" />
        <ui-icon name="arrow-up" />
        <ui-icon name="arrow-down" />
      </view>
    </view>

    <!-- 图标颜色 -->
    <view class="demo-section">
      <text class="section-title">图标颜色</text>
      <view class="demo-block">
        <ui-icon name="star" color="#1989fa" />
        <ui-icon name="star" color="#07c160" />
        <ui-icon name="star" color="#ee0a24" />
        <ui-icon name="star" color="#ff976a" />
        <ui-icon name="star" color="#7232dd" />
      </view>
    </view>

    <!-- 图标大小 -->
    <view class="demo-section">
      <text class="section-title">图标大小</text>
      <view class="demo-block">
        <ui-icon name="heart" size="32rpx" />
        <ui-icon name="heart" size="48rpx" />
        <ui-icon name="heart" size="64rpx" />
        <ui-icon name="heart" size="80rpx" />
      </view>
    </view>

    <!-- 常用图标 -->
    <view class="demo-section">
      <text class="section-title">常用图标</text>
      <view class="icon-grid">
        <view v-for="icon in commonIcons" :key="icon" class="icon-item">
          <ui-icon :name="icon" size="48rpx" />
          <text class="icon-name">{{ icon }}</text>
        </view>
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
          <text class="api-cell">name</text>
          <text class="api-cell">图标名称</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">color</text>
          <text class="api-cell">图标颜色</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">size</text>
          <text class="api-cell">图标大小</text>
          <text class="api-cell">string/number</text>
        </view>
        <view class="api-row">
          <text class="api-cell">weight</text>
          <text class="api-cell">图标粗细</text>
          <text class="api-cell">string/number</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const commonIcons = [
  "check",
  "close",
  "plus",
  "minus",
  "search",
  "star",
  "heart",
  "home",
  "user",
  "setting",
  "phone",
  "location",
  "cart",
  "share",
  "delete",
  "edit",
  "eye",
  "eye-off",
  "lock",
  "unlock",
]
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

.icon-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24rpx;
}

.icon-item {
  display: flex;
  padding: 16rpx;
  align-items: center;
  flex-direction: column;
  border-radius: 8rpx;
  background: #f8f9fa;
}

.icon-name {
  color: #666;
  font-size: 20rpx;
  margin-top: 8rpx;
  text-align: center;
  word-break: break-all;
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
