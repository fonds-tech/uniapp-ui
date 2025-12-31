<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <text class="section-desc">Header 组件用于固定在页面顶部</text>
    </view>

    <view class="demo-section">
      <text class="section-title">效果演示</text>
      <view class="demo-block header-demo">
        <ui-header background="#ff4757">
          <view class="header-content">
            <text class="header-title">页头标题</text>
          </view>
        </ui-header>
        <view class="page-content">
          <text>页面内容区域</text>
        </view>
      </view>
    </view>

    <!-- 自定义背景 -->
    <view class="demo-section">
      <text class="section-title">自定义背景</text>
      <view class="demo-block header-demo">
        <ui-header background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
          <view class="header-content">
            <text class="header-title">渐变背景</text>
          </view>
        </ui-header>
        <view class="page-content">
          <text>页面内容区域</text>
        </view>
      </view>
    </view>

    <!-- 带操作按钮 -->
    <view class="demo-section">
      <text class="section-title">带操作按钮</text>
      <view class="demo-block header-demo">
        <ui-header background="#1e90ff">
          <view class="header-bar">
            <ui-icon name="arrow-left" color="#fff" size="40rpx" />
            <text class="header-title">标题</text>
            <ui-icon name="more" color="#fff" size="40rpx" />
          </view>
        </ui-header>
        <view class="page-content">
          <text>页面内容区域</text>
        </view>
      </view>
    </view>

    <!-- 使用说明 -->
    <view class="demo-section">
      <text class="section-title">使用说明</text>
      <view class="demo-block">
        <text class="tip-text">1. Header 组件默认固定在页面顶部</text>
        <text class="tip-text">2. 支持自定义背景色和渐变背景</text>
        <text class="tip-text">3. 可配合 Navbar 组件使用</text>
        <text class="tip-text">4. 支持底部安全区域适配</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Header 页头" },
})

// Header demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.section-desc {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 8rpx;
}

.header-demo {
  height: 400rpx;
  overflow: hidden;
  position: relative;
  background: var(--ui-color-background-light);
  border-radius: 12rpx;

  .ui-header {
    position: relative !important;
  }
}

.header-content {
  padding: 24rpx 32rpx;
}

.header-bar {
  display: flex;
  padding: 24rpx 32rpx;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
}

.page-content {
  color: var(--ui-color-text-secondary);
  padding: 32rpx;
}

.tip-text {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 26rpx;
  line-height: 1.8;
}
</style>
