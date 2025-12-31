<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-row>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
        </ui-row>
      </view>
    </view>

    <!-- 不同比例 -->
    <view class="demo-section">
      <text class="section-title">不同比例</text>
      <view class="demo-block-full">
        <ui-row>
          <ui-col :span="4">
            <view class="grid-item dark">span: 4</view>
          </ui-col>
          <ui-col :span="20">
            <view class="grid-item light">span: 20</view>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="6">
            <view class="grid-item dark">span: 6</view>
          </ui-col>
          <ui-col :span="18">
            <view class="grid-item light">span: 18</view>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="12">
            <view class="grid-item dark">span: 12</view>
          </ui-col>
          <ui-col :span="12">
            <view class="grid-item light">span: 12</view>
          </ui-col>
        </ui-row>
      </view>
    </view>

    <!-- 列间距 -->
    <view class="demo-section">
      <text class="section-title">列间距</text>
      <view class="demo-block-full">
        <ui-row gutter="20rpx">
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
        </ui-row>
      </view>
    </view>

    <!-- 列偏移 -->
    <view class="demo-section">
      <text class="section-title">列偏移</text>
      <view class="demo-block-full">
        <ui-row>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8" :offset="8">
            <view class="grid-item dark">offset: 8</view>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="6" :offset="6">
            <view class="grid-item dark">offset: 6</view>
          </ui-col>
          <ui-col :span="6" :offset="6">
            <view class="grid-item dark">offset: 6</view>
          </ui-col>
        </ui-row>
      </view>
    </view>

    <!-- 对齐方式 -->
    <view class="demo-section">
      <text class="section-title">对齐方式</text>
      <view class="demo-block-full">
        <ui-row justify="center">
          <ui-col :span="6">
            <view class="grid-item dark">居中</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">居中</view>
          </ui-col>
        </ui-row>
        <ui-row justify="end">
          <ui-col :span="6">
            <view class="grid-item dark">右对齐</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">右对齐</view>
          </ui-col>
        </ui-row>
        <ui-row justify="space-between">
          <ui-col :span="6">
            <view class="grid-item dark">两端对齐</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">两端对齐</view>
          </ui-col>
        </ui-row>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Row/Col 栅格" },
})

// Grid demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.grid-item {
  height: 60rpx;
  display: flex;
  font-size: 24rpx;
  align-items: center;
  border-radius: 8rpx;
  justify-content: center;

  &.dark {
    color: #fff;
    background: var(--ui-color-primary);
  }

  &.light {
    color: var(--ui-color-primary);
    background: rgba(255, 71, 87, 0.2);
  }
}

.demo-block-full > .ui-row + .ui-row {
  margin-top: 16rpx;
}
</style>
