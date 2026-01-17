<template>
  <demo-page>
    <demo-section title="加载类型">
      <demo-block :cols="2" :gap="32">
        <view class="loading-item">
          <ui-loading type="circular" />
          <text class="loading-label">circular</text>
        </view>
        <view class="loading-item">
          <ui-loading type="spinner" />
          <text class="loading-label">spinner</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="4" :gap="32">
        <view class="loading-item">
          <ui-loading color="primary" />
          <text class="loading-label">primary</text>
        </view>
        <view class="loading-item">
          <ui-loading color="success" />
          <text class="loading-label">success</text>
        </view>
        <view class="loading-item">
          <ui-loading color="warning" />
          <text class="loading-label">warning</text>
        </view>
        <view class="loading-item">
          <ui-loading color="danger" />
          <text class="loading-label">danger</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block :cols="4" :gap="32">
        <view class="loading-item">
          <ui-loading size="24rpx" />
          <text class="loading-label">24rpx</text>
        </view>
        <view class="loading-item">
          <ui-loading size="36rpx" />
          <text class="loading-label">36rpx</text>
        </view>
        <view class="loading-item">
          <ui-loading size="48rpx" />
          <text class="loading-label">48rpx</text>
        </view>
        <view class="loading-item">
          <ui-loading size="64rpx" />
          <text class="loading-label">64rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="加载文案">
      <demo-block :cols="2" :gap="32">
        <ui-loading text="加载中..." />
        <ui-loading text="请稍候..." vertical />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Loading 加载" },
})
</script>

<style lang="scss" scoped>
.loading-item {
  gap: 16rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.loading-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
