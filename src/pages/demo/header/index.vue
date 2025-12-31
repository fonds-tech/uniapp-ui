<template>
  <demo-page>
    <demo-section title="基础用法" desc="Header 组件用于固定在页面顶部" />

    <demo-section title="效果演示">
      <demo-block class="header-demo">
        <ui-header background="#1989fa">
          <view class="header-content">
            <text class="header-title">页头标题</text>
          </view>
        </ui-header>
        <view class="page-content">
          <text>页面内容区域</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景">
      <demo-block class="header-demo">
        <ui-header background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
          <view class="header-content">
            <text class="header-title">渐变背景</text>
          </view>
        </ui-header>
        <view class="page-content">
          <text>页面内容区域</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="带操作按钮">
      <demo-block class="header-demo">
        <ui-header background="#07c160">
          <view class="header-bar">
            <ui-icon name="arrow-left" color="#fff" size="40rpx" />
            <text class="header-title">标题</text>
            <ui-icon name="more" color="#fff" size="40rpx" />
          </view>
        </ui-header>
        <view class="page-content">
          <text>页面内容区域</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="使用说明">
      <demo-block direction="column" align="start">
        <text class="tip-text">1. Header 组件默认固定在页面顶部</text>
        <text class="tip-text">2. 支持自定义背景色和渐变背景</text>
        <text class="tip-text">3. 可配合 Navbar 组件使用</text>
        <text class="tip-text">4. 支持底部安全区域适配</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Header 页头" },
})
</script>

<style lang="scss" scoped>
.header-demo {
  height: 400rpx;
  overflow: hidden;
  position: relative;
  background: var(--ui-color-background-light);
  border-radius: 12rpx;

  :deep(.ui-header) {
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
  font-size: 26rpx;
  line-height: 1.8;
}
</style>
