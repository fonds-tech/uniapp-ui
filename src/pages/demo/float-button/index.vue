<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <text class="section-desc">右下角显示一个浮动按钮</text>
    </view>

    <!-- 不同类型 -->
    <view class="demo-section">
      <text class="section-title">按钮类型</text>
      <view class="demo-block button-list">
        <ui-button type="primary" size="small" @click="currentType = 'primary'">Primary</ui-button>
        <ui-button type="success" size="small" @click="currentType = 'success'">Success</ui-button>
        <ui-button type="warning" size="small" @click="currentType = 'warning'">Warning</ui-button>
        <ui-button type="error" size="small" @click="currentType = 'error'">Error</ui-button>
      </view>
    </view>

    <!-- 不同图标 -->
    <view class="demo-section">
      <text class="section-title">自定义图标</text>
      <view class="demo-block button-list">
        <ui-button size="small" @click="currentIcon = 'plus'">Plus</ui-button>
        <ui-button size="small" @click="currentIcon = 'edit'">Edit</ui-button>
        <ui-button size="small" @click="currentIcon = 'message'">Message</ui-button>
        <ui-button size="small" @click="currentIcon = 'share'">Share</ui-button>
      </view>
    </view>

    <!-- 带文字 -->
    <view class="demo-section">
      <text class="section-title">带文字</text>
      <view class="demo-block">
        <ui-switch v-model="showText" />
        <text class="switch-label">{{ showText ? "显示文字" : "隐藏文字" }}</text>
      </view>
    </view>

    <!-- 占位内容 -->
    <view v-for="i in 10" :key="i" class="demo-section">
      <text class="section-title">占位内容 {{ i }}</text>
      <text class="section-desc">滚动页面查看浮动按钮效果</text>
    </view>

    <!-- 浮动按钮 -->
    <ui-float-button :type="currentType" :icon="currentIcon" :text="showText ? '添加' : ''" @click="onClick" />
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "FloatButton 浮动按钮" },
})

const currentType = ref("primary")
const currentIcon = ref("plus")
const showText = ref(false)

function onClick() {
  uni.showToast({ title: "点击了浮动按钮", icon: "none" })
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.section-desc {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 8rpx;
}

.button-list {
  gap: 16rpx;
  display: flex;
  flex-wrap: wrap;
}

.switch-label {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
  margin-left: 16rpx;
}
</style>
