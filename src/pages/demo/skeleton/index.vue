<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-skeleton>
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </view>
    </view>

    <!-- 显示头像 -->
    <view class="demo-section">
      <text class="section-title">显示头像</text>
      <view class="demo-block">
        <ui-skeleton>
          <view class="skeleton-row">
            <ui-skeleton-avatar />
            <view class="skeleton-content">
              <ui-skeleton-title />
              <ui-skeleton-paragraph :rows="2" />
            </view>
          </view>
        </ui-skeleton>
      </view>
    </view>

    <!-- 显示图片 -->
    <view class="demo-section">
      <text class="section-title">显示图片</text>
      <view class="demo-block">
        <ui-skeleton>
          <ui-skeleton-image />
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </view>
    </view>

    <!-- 关闭动画 -->
    <view class="demo-section">
      <text class="section-title">关闭动画</text>
      <view class="demo-block">
        <ui-skeleton :animate="false">
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </view>
    </view>

    <!-- 自定义背景色 -->
    <view class="demo-section">
      <text class="section-title">自定义背景色</text>
      <view class="demo-block">
        <ui-skeleton background="#e0e0e0">
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Skeleton 骨架屏" },
})

// Skeleton demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.skeleton-row {
  display: flex;
  gap: 20rpx;
}

.skeleton-content {
  flex: 1;
}
</style>
