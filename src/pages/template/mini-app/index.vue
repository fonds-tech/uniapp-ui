<template>
  <view class="app">
    <ui-safe-area-top />
    <ui-navbar title="迷你应用" :show-back="true" :background="navBg" />

    <ui-notify v-model:show="showNotify" type="primary" message="您有 1 条新消息" />

    <ui-header title="今日推荐" subtitle="为您精选热门内容" />

    <view class="content">
      <ui-search v-model="keyword" placeholder="搜索内容" background="background-section" radius="36rpx" />

      <ui-space direction="vertical" :size="16" fill>
        <ui-row :gutter="20">
          <ui-col :span="12">
            <view class="stat-card stat-card--primary">
              <text class="stat-card__label">今日访问</text>
              <ui-number-roll :value="1234" font-size="48rpx" font-weight="bold" color="text-inverse" />
            </view>
          </ui-col>
          <ui-col :span="12">
            <view class="stat-card stat-card--success">
              <text class="stat-card__label">新增收藏</text>
              <ui-number-roll :value="89" font-size="48rpx" font-weight="bold" color="text-inverse" />
            </view>
          </ui-col>
        </ui-row>

        <view v-for="r in results" :key="r.id" class="result">
          <ui-text-highlight :text="r.title" :match="keyword" highlight-color="primary" font-weight="bold" />
          <ui-text :text="r.desc" color="text-secondary" size="24rpx" />
        </view>
      </ui-space>
    </view>

    <ui-footer text="©2026 Uniapp UI · 业务模板示例" />
    <ui-safe-area-bottom />
    <ui-resize @resize="onResize" />

    <ui-tabbar v-model="tab" fixed safe-area-inset-bottom>
      <ui-tabbar-item icon="home" name="home-o">首页</ui-tabbar-item>
      <ui-tabbar-item icon="search" name="discover">发现</ui-tabbar-item>
      <ui-tabbar-item icon="like" name="favor" badge="9">收藏</ui-tabbar-item>
      <ui-tabbar-item icon="user" name="me">我的</ui-tabbar-item>
    </ui-tabbar>

    <ui-overlay :show="showOverlay" @click="showOverlay = false">
      <view class="overlay-tip">
        <text class="overlay-tip__text">点击空白处关闭</text>
      </view>
    </ui-overlay>

    <ui-float-button icon="info" type="primary" :custom-style="{ bottom: '200rpx' }" @click="showOverlay = true" />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "迷你应用框架", navigationStyle: "custom" },
})

// 透明 navbar 背景，需要保留 95% alpha 让下方内容隐约可见
const navBg = "rgba(255, 255, 255, 0.95)"
const showNotify = ref(true)
const showOverlay = ref(false)
const tab = ref("home")
const keyword = ref("Uniapp")

function onResize() {
  // 监听窗口尺寸变化
}

const results = [
  { id: 1, title: "Uniapp 3 跨端开发指南", desc: "深入 Uniapp 3 + Vue 3 跨端开发实战" },
  { id: 2, title: "Uniapp 与小程序生态融合", desc: "对接微信、支付宝、抖音多端能力" },
  { id: 3, title: "Vue 组件库设计原则", desc: "学习如何设计 80+ 组件库" },
]
</script>

<style lang="scss" scoped>
.app {
  background: var(--ui-color-background-page);
  min-height: 100vh;
  padding-bottom: 140rpx;
}

.content {
  padding: var(--ui-spacing-lg);
}

.stat-card {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: var(--ui-spacing-lg);
  border-radius: var(--ui-radius-lg);
  flex-direction: column;

  &--primary {
    background: linear-gradient(135deg, var(--ui-color-primary), var(--ui-color-primary-active));
  }

  &--success {
    background: linear-gradient(135deg, var(--ui-color-success), var(--ui-color-primary));
  }

  &__label {
    color: rgba(255, 255, 255, 0.85);
    font-size: var(--ui-font-size-xs);
  }
}

.result {
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-md);
}

.overlay-tip {
  top: 50%;
  left: 50%;
  padding: var(--ui-spacing-xl);
  position: absolute;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  border-radius: var(--ui-radius-md);

  &__text {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-sm);
  }
}
</style>
