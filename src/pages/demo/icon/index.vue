<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="5" :gap="24">
        <view class="icon-item">
          <ui-icon name="check" />
          <text class="icon-label">check</text>
        </view>
        <view class="icon-item">
          <ui-icon name="close" />
          <text class="icon-label">close</text>
        </view>
        <view class="icon-item">
          <ui-icon name="plus" />
          <text class="icon-label">plus</text>
        </view>
        <view class="icon-item">
          <ui-icon name="minus" />
          <text class="icon-label">minus</text>
        </view>
        <view class="icon-item">
          <ui-icon name="search" />
          <text class="icon-label">search</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="图标颜色">
      <demo-block :cols="5" :gap="24">
        <view class="icon-item">
          <ui-icon name="star" color="primary" />
          <text class="icon-label">primary</text>
        </view>
        <view class="icon-item">
          <ui-icon name="star" color="success" />
          <text class="icon-label">success</text>
        </view>
        <view class="icon-item">
          <ui-icon name="star" color="warning" />
          <text class="icon-label">warning</text>
        </view>
        <view class="icon-item">
          <ui-icon name="star" color="danger" />
          <text class="icon-label">danger</text>
        </view>
        <view class="icon-item">
          <ui-icon name="star" color="#7232dd" />
          <text class="icon-label">custom</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="图标大小">
      <demo-block :cols="4" :gap="24">
        <view class="icon-item">
          <ui-icon name="like" size="32rpx" />
          <text class="icon-label">32rpx</text>
        </view>
        <view class="icon-item">
          <ui-icon name="like" size="48rpx" />
          <text class="icon-label">48rpx</text>
        </view>
        <view class="icon-item">
          <ui-icon name="like" size="64rpx" />
          <text class="icon-label">64rpx</text>
        </view>
        <view class="icon-item">
          <ui-icon name="like" size="80rpx" />
          <text class="icon-label">80rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="常用图标">
      <demo-block :cols="5" :gap="24">
        <view v-for="icon in commonIcons" :key="icon" class="icon-item">
          <ui-icon :name="icon" size="48rpx" />
          <text class="icon-label">{{ icon }}</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Icon 图标" },
})

const commonIcons = [
  "check",
  "close",
  "plus",
  "minus",
  "search",
  "star",
  "like",
  "home-o",
  "user-o",
  "setting",
  "phone",
  "location",
  "cart",
  "share",
  "delete",
  "edit",
  "eye",
  "closed-eye",
  "lock",
]
</script>

<style lang="scss" scoped>
.icon-item {
  display: flex;
  padding: 16rpx;
  background: var(--ui-color-background-light);
  align-items: center;
  border-radius: 8rpx;
  flex-direction: column;
  gap: 8rpx;
}

.icon-label {
  color: var(--ui-color-text-secondary);
  font-size: 20rpx;
  text-align: center;
  word-break: break-all;
}
</style>
