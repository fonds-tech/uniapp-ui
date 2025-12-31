<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-progress :percentage="50" />
      </view>
    </view>

    <!-- 线条粗细 -->
    <view class="demo-section">
      <text class="section-title">线条粗细</text>
      <view class="demo-block-full">
        <ui-progress :percentage="50" stroke-width="12rpx" />
        <ui-progress :percentage="50" stroke-width="24rpx" />
      </view>
    </view>

    <!-- 置灰 -->
    <view class="demo-section">
      <text class="section-title">置灰</text>
      <view class="demo-block-full">
        <ui-progress :percentage="50" inactive />
      </view>
    </view>

    <!-- 不同颜色 -->
    <view class="demo-section">
      <text class="section-title">不同颜色</text>
      <view class="demo-block-full">
        <ui-progress :percentage="30" color="primary" />
        <ui-progress :percentage="50" color="success" />
        <ui-progress :percentage="70" color="warning" />
        <ui-progress :percentage="90" color="error" />
      </view>
    </view>

    <!-- 渐变色 -->
    <view class="demo-section">
      <text class="section-title">渐变色</text>
      <view class="demo-block-full">
        <ui-progress :percentage="percentage" :color="['#3b82f6', '#8b5cf6']" />
      </view>
    </view>

    <!-- 显示百分比 -->
    <view class="demo-section">
      <text class="section-title">显示百分比</text>
      <view class="demo-block-full">
        <ui-progress :percentage="percentage" show-text />
        <ui-progress :percentage="percentage" show-text text-inside />
      </view>
    </view>

    <!-- 动态演示 -->
    <view class="demo-section">
      <text class="section-title">动态演示</text>
      <view class="demo-block-full">
        <ui-progress :percentage="percentage" show-text />
        <view class="demo-block" style="margin-top: 24rpx">
          <ui-button size="small" @click="decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="increase">增加</ui-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Progress 进度条" },
})

const percentage = ref(50)

function increase() {
  percentage.value = Math.min(100, percentage.value + 10)
}

function decrease() {
  percentage.value = Math.max(0, percentage.value - 10)
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
