<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <text class="demo-text">上方内容</text>
        <ui-line />
        <text class="demo-text">下方内容</text>
      </view>
    </view>

    <!-- 虚线 -->
    <view class="demo-section">
      <text class="section-title">虚线</text>
      <view class="demo-block">
        <text class="demo-text">上方内容</text>
        <ui-line type="dashed" />
        <text class="demo-text">下方内容</text>
      </view>
    </view>

    <!-- 点线 -->
    <view class="demo-section">
      <text class="section-title">点线</text>
      <view class="demo-block">
        <text class="demo-text">上方内容</text>
        <ui-line type="dotted" />
        <text class="demo-text">下方内容</text>
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block">
        <ui-line color="#ff4757" />
        <ui-line color="#2ed573" margin="20rpx 0" />
        <ui-line color="#1e90ff" />
      </view>
    </view>

    <!-- 自定义高度 -->
    <view class="demo-section">
      <text class="section-title">自定义高度</text>
      <view class="demo-block">
        <ui-line height="4rpx" />
        <ui-line height="8rpx" margin="20rpx 0" />
        <ui-line height="12rpx" />
      </view>
    </view>

    <!-- 垂直线条 -->
    <view class="demo-section">
      <text class="section-title">垂直线条</text>
      <view class="demo-block vertical-demo">
        <text class="demo-text">左边</text>
        <ui-line vertical height="40rpx" margin="0 20rpx" />
        <text class="demo-text">中间</text>
        <ui-line vertical height="40rpx" margin="0 20rpx" />
        <text class="demo-text">右边</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Line 分割线" },
})

// Line demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.demo-text {
  display: block;
  font-size: 28rpx;
  padding: 16rpx 0;
  color: var(--ui-color-text-primary);
}

.vertical-demo {
  display: flex;
  align-items: center;

  .demo-text {
    padding: 0;
  }
}
</style>
