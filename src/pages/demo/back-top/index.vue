<template>
  <view class="demo-page">
    <view class="demo-section">
      <text class="section-title">返回顶部</text>
      <text class="section-desc">向下滚动页面，右下角会出现返回顶部按钮</text>
    </view>

    <!-- 占位内容 -->
    <view v-for="i in 30" :key="i" class="demo-section">
      <text class="section-title">占位内容 {{ i }}</text>
      <text class="section-desc">这是一段占位内容，用于演示滚动效果</text>
    </view>

    <!-- 返回顶部按钮 -->
    <ui-back-top />
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "BackTop 返回顶部" },
})

// BackTop demo page
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
