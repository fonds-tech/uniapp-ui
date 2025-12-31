<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block icon-row">
        <ui-icon-text name="home" text="首页" />
        <ui-icon-text name="search" text="搜索" />
        <ui-icon-text name="heart" text="收藏" />
        <ui-icon-text name="person" text="我的" />
      </view>
    </view>

    <!-- 自定义大小 -->
    <view class="demo-section">
      <text class="section-title">自定义大小</text>
      <view class="demo-block icon-row">
        <ui-icon-text name="star" text="小" size="32rpx" text-size="24rpx" />
        <ui-icon-text name="star" text="中" size="48rpx" text-size="28rpx" />
        <ui-icon-text name="star" text="大" size="64rpx" text-size="32rpx" />
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block icon-row">
        <ui-icon-text name="heart-fill" text="红色" color="#ff4757" text-color="#ff4757" />
        <ui-icon-text name="check-circle-fill" text="绿色" color="#2ed573" text-color="#2ed573" />
        <ui-icon-text name="info-circle-fill" text="蓝色" color="#1e90ff" text-color="#1e90ff" />
      </view>
    </view>

    <!-- 文字在左边 -->
    <view class="demo-section">
      <text class="section-title">文字在左边</text>
      <view class="demo-block icon-row">
        <ui-icon-text name="arrow-right" text="更多" text-left />
        <ui-icon-text name="arrow-right" text="查看详情" text-left />
      </view>
    </view>

    <!-- 自定义间距 -->
    <view class="demo-section">
      <text class="section-title">自定义间距</text>
      <view class="demo-block icon-row">
        <ui-icon-text name="location" text="位置" text-gap="8rpx" />
        <ui-icon-text name="location" text="位置" text-gap="16rpx" />
        <ui-icon-text name="location" text="位置" text-gap="24rpx" />
      </view>
    </view>

    <!-- 使用图片 -->
    <view class="demo-section">
      <text class="section-title">使用图片</text>
      <view class="demo-block icon-row">
        <ui-icon-text name="https://picsum.photos/40" text="图片1" width="40rpx" height="40rpx" radius="8rpx" />
        <ui-icon-text name="https://picsum.photos/40?2" text="图片2" width="40rpx" height="40rpx" radius="20rpx" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "IconText 图标文字" },
})

// IconText demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.icon-row {
  display: flex;
  gap: 40rpx;
  flex-wrap: wrap;
}
</style>
