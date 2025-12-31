<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="30" />
        <ui-progress :percentage="50" />
        <ui-progress :percentage="80" />
      </demo-block>
    </demo-section>

    <demo-section title="线条粗细">
      <demo-block direction="column" :gap="24">
        <view class="progress-item">
          <ui-progress :percentage="50" stroke-width="8rpx" />
          <text class="progress-label">8rpx</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="50" stroke-width="16rpx" />
          <text class="progress-label">16rpx</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="50" stroke-width="24rpx" />
          <text class="progress-label">24rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="不同颜色">
      <demo-block direction="column" :gap="24">
        <view class="progress-item">
          <ui-progress :percentage="30" color="primary" />
          <text class="progress-label">primary</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="50" color="success" />
          <text class="progress-label">success</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="70" color="warning" />
          <text class="progress-label">warning</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="90" color="danger" />
          <text class="progress-label">danger</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="渐变色">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="percentage" :color="['#3b82f6', '#8b5cf6']" />
        <ui-progress :percentage="percentage" :color="['#10b981', '#06b6d4']" />
      </demo-block>
    </demo-section>

    <demo-section title="置灰">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="50" inactive />
      </demo-block>
    </demo-section>

    <demo-section title="显示百分比">
      <demo-block direction="column" :gap="24">
        <view class="progress-item">
          <ui-progress :percentage="percentage" show-text />
          <text class="progress-label">外部显示</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="percentage" show-text text-inside stroke-width="32rpx" />
          <text class="progress-label">内部显示</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="动态演示">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="percentage" show-text />
        <demo-block :gap="24">
          <ui-button size="small" @click="decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="increase">增加</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

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

<style lang="scss" scoped>
.progress-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.progress-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  flex-shrink: 0;
  min-width: 100rpx;
}
</style>
