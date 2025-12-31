<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <text class="section-desc">向下滚动页面，按钮会吸顶</text>
    </view>

    <ui-sticky>
      <ui-button type="primary" block>基础用法</ui-button>
    </ui-sticky>

    <view class="demo-section">
      <text class="section-title">吸顶距离</text>
      <text class="section-desc">offset-top 可设置吸顶距离</text>
    </view>

    <ui-sticky :offset-top="100">
      <ui-button type="success" block>吸顶距离 100rpx</ui-button>
    </ui-sticky>

    <!-- 占位内容 -->
    <view v-for="i in 20" :key="i" class="demo-section">
      <text class="section-title">占位内容 {{ i }}</text>
      <text class="section-desc">这是一段占位内容，用于演示滚动效果</text>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Sticky 粘性布局" },
})

// Sticky demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.section-desc {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 8rpx;
}
</style>
