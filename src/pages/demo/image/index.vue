<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-image src="https://picsum.photos/200" width="200rpx" height="200rpx" />
      </view>
    </view>

    <!-- 填充模式 -->
    <view class="demo-section">
      <text class="section-title">填充模式</text>
      <view class="demo-block image-grid">
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="scaleToFill" />
          <text class="image-label">scaleToFill</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="aspectFit" />
          <text class="image-label">aspectFit</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="aspectFill" />
          <text class="image-label">aspectFill</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="widthFix" />
          <text class="image-label">widthFix</text>
        </view>
      </view>
    </view>

    <!-- 圆形图片 -->
    <view class="demo-section">
      <text class="section-title">圆形图片</text>
      <view class="demo-block">
        <ui-image src="https://picsum.photos/200" width="160rpx" height="160rpx" round />
        <ui-image src="https://picsum.photos/201" width="160rpx" height="160rpx" round />
        <ui-image src="https://picsum.photos/202" width="160rpx" height="160rpx" round />
      </view>
    </view>

    <!-- 圆角图片 -->
    <view class="demo-section">
      <text class="section-title">圆角图片</text>
      <view class="demo-block">
        <ui-image src="https://picsum.photos/203" width="200rpx" height="200rpx" radius="8rpx" />
        <ui-image src="https://picsum.photos/204" width="200rpx" height="200rpx" radius="16rpx" />
        <ui-image src="https://picsum.photos/205" width="200rpx" height="200rpx" radius="32rpx" />
      </view>
    </view>

    <!-- 正方形图片 -->
    <view class="demo-section">
      <text class="section-title">正方形图片</text>
      <view class="demo-block">
        <ui-image src="https://picsum.photos/300/200" width="200rpx" square />
        <ui-image src="https://picsum.photos/200/300" width="200rpx" square />
      </view>
    </view>

    <!-- 懒加载 -->
    <view class="demo-section">
      <text class="section-title">懒加载</text>
      <view class="demo-block">
        <ui-image src="https://picsum.photos/206" width="200rpx" height="200rpx" lazy-load />
        <ui-image src="https://picsum.photos/207" width="200rpx" height="200rpx" lazy-load />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Image 图片" },
})

// Image demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.image-grid {
  gap: 24rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.image-item {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.image-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-top: 12rpx;
}
</style>
