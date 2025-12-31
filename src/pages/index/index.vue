<route lang="json">
{
  "style": {
    "navigationBarTitleText": "UI 组件库"
  }
}
</route>

<template>
  <view class="page-container">
    <!-- 头部 Banner -->
    <view class="header-banner">
      <view class="banner-content">
        <text class="title">UniApp UI</text>
        <text class="subtitle">跨端 UI 组件库</text>
        <text class="desc">基于 Vue 3 + UniApp，支持 H5、小程序、App 多端适配</text>
      </view>
    </view>

    <!-- 功能入口 -->
    <view class="feature-grid">
      <view class="feature-card" @click="navigateTo('/pages/demo/index')">
        <view class="feature-icon">🎨</view>
        <text class="feature-title">组件演示</text>
        <text class="feature-desc">查看所有组件的实时效果</text>
      </view>

      <view class="feature-card" @click="openDocs">
        <view class="feature-icon">📖</view>
        <text class="feature-title">开发文档</text>
        <text class="feature-desc">API 文档与使用指南</text>
      </view>

      <view class="feature-card">
        <view class="feature-icon">🧪</view>
        <text class="feature-title">测试报告</text>
        <text class="feature-desc">组件单元测试覆盖</text>
      </view>

      <view class="feature-card">
        <view class="feature-icon">⚡</view>
        <text class="feature-title">快速开始</text>
        <text class="feature-desc">5 分钟快速上手</text>
      </view>
    </view>

    <!-- 组件统计 -->
    <view class="stats-section">
      <text class="section-title">组件概览</text>
      <view class="stats-grid">
        <view class="stat-item">
          <text class="stat-number">80+</text>
          <text class="stat-label">UI 组件</text>
        </view>
        <view class="stat-item">
          <text class="stat-number">20+</text>
          <text class="stat-label">Hooks</text>
        </view>
        <view class="stat-item">
          <text class="stat-number">3</text>
          <text class="stat-label">端适配</text>
        </view>
      </view>
    </view>

    <!-- 组件分类快速入口 -->
    <view class="category-section">
      <text class="section-title">组件分类</text>
      <view class="category-list">
        <view
          v-for="category in categories"
          :key="category.name"
          class="category-item"
          @click="navigateTo(`/pages/demo/index?category=${category.key}`)"
        >
          <text class="category-icon">{{ category.icon }}</text>
          <text class="category-name">{{ category.name }}</text>
          <text class="category-count">{{ category.count }} 个</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const categories = [
  { key: "basic", name: "基础组件", icon: "📦", count: 12 },
  { key: "form", name: "表单组件", icon: "📝", count: 15 },
  { key: "feedback", name: "反馈组件", icon: "💬", count: 10 },
  { key: "display", name: "展示组件", icon: "🖼️", count: 18 },
  { key: "navigation", name: "导航组件", icon: "🧭", count: 8 },
  { key: "layout", name: "布局组件", icon: "📐", count: 6 },
]

function navigateTo(url: string) {
  uni.navigateTo({ url })
}

function openDocs() {
  // #ifdef H5
  window.open("/docs/", "_blank")
  // #endif
  // #ifndef H5
  uni.showToast({ title: "请在 H5 端查看文档", icon: "none" })
  // #endif
}
</script>

<style lang="scss" scoped>
.page-container {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding-bottom: 40rpx;
}

.header-banner {
  padding: 80rpx 40rpx;
  text-align: center;

  .banner-content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .title {
    color: #fff;
    font-size: 64rpx;
    font-weight: 700;
    margin-bottom: 16rpx;
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 36rpx;
    margin-bottom: 20rpx;
  }

  .desc {
    color: rgba(255, 255, 255, 0.7);
    font-size: 26rpx;
    max-width: 600rpx;
    line-height: 1.6;
  }
}

.feature-grid {
  gap: 24rpx;
  display: grid;
  padding: 0 32rpx;
  margin-bottom: 40rpx;
  grid-template-columns: repeat(2, 1fr);
}

.feature-card {
  display: flex;
  padding: 32rpx;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  align-items: center;
  border-radius: 24rpx;
  flex-direction: column;

  &:active {
    transform: scale(0.98);
  }

  .feature-icon {
    font-size: 56rpx;
    margin-bottom: 16rpx;
  }

  .feature-title {
    color: #333;
    font-size: 30rpx;
    font-weight: 600;
    margin-bottom: 8rpx;
  }

  .feature-desc {
    color: #666;
    font-size: 24rpx;
    text-align: center;
  }
}

.stats-section {
  margin: 0 32rpx 40rpx;
  padding: 32rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24rpx;
}

.section-title {
  color: #333;
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 24rpx;
}

.stats-grid {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  align-items: center;
  flex-direction: column;

  .stat-number {
    color: #667eea;
    font-size: 48rpx;
    font-weight: 700;
    margin-bottom: 8rpx;
  }

  .stat-label {
    color: #666;
    font-size: 24rpx;
  }
}

.category-section {
  margin: 0 32rpx;
  padding: 32rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24rpx;
}

.category-list {
  gap: 16rpx;
  display: flex;
  flex-direction: column;
}

.category-item {
  display: flex;
  padding: 24rpx;
  background: #f8f9fa;
  transition: background 0.2s;
  align-items: center;
  border-radius: 16rpx;

  &:active {
    background: #eee;
  }

  .category-icon {
    font-size: 40rpx;
    margin-right: 20rpx;
  }

  .category-name {
    flex: 1;
    color: #333;
    font-size: 28rpx;
    font-weight: 500;
  }

  .category-count {
    color: #999;
    font-size: 24rpx;
  }
}
</style>
