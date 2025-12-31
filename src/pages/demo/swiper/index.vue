<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-swiper :list="images" height="300rpx" />
      </view>
    </view>

    <!-- 数字指示器 -->
    <view class="demo-section">
      <text class="section-title">数字指示器</text>
      <view class="demo-block-full">
        <ui-swiper :list="images" height="300rpx" indicator-type="number" />
      </view>
    </view>

    <!-- 指示器位置 -->
    <view class="demo-section">
      <text class="section-title">指示器位置</text>
      <view class="demo-block-full">
        <ui-swiper :list="images" height="300rpx" indicator-position="bottom" />
      </view>
    </view>

    <!-- 垂直滚动 -->
    <view class="demo-section">
      <text class="section-title">垂直滚动</text>
      <view class="demo-block-full">
        <ui-swiper :list="images" height="300rpx" vertical indicator-position="right" />
      </view>
    </view>

    <!-- 关闭自动播放 -->
    <view class="demo-section">
      <text class="section-title">关闭自动播放</text>
      <view class="demo-block-full">
        <ui-swiper :list="images" height="300rpx" :autoplay="false" />
      </view>
    </view>

    <!-- 自定义间隔 -->
    <view class="demo-section">
      <text class="section-title">自定义间隔 (5s)</text>
      <view class="demo-block-full">
        <ui-swiper :list="images" height="300rpx" :interval="5000" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Swiper 轮播" },
})

const images = [
  "https://picsum.photos/750/300?random=1",
  "https://picsum.photos/750/300?random=2",
  "https://picsum.photos/750/300?random=3",
  "https://picsum.photos/750/300?random=4",
]
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
