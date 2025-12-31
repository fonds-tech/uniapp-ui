<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-icon name="check" />
        <ui-icon name="close" />
        <ui-icon name="plus" />
        <ui-icon name="minus" />
        <ui-icon name="search" />
        <ui-icon name="arrow-right" />
        <ui-icon name="arrow-left" />
        <ui-icon name="arrow-up" />
        <ui-icon name="arrow-down" />
      </demo-block>
    </demo-section>

    <demo-section title="图标颜色">
      <demo-block>
        <ui-icon name="star" color="#1989fa" />
        <ui-icon name="star" color="#07c160" />
        <ui-icon name="star" color="#ee0a24" />
        <ui-icon name="star" color="#ff976a" />
        <ui-icon name="star" color="#7232dd" />
      </demo-block>
    </demo-section>

    <demo-section title="图标大小">
      <demo-block>
        <ui-icon name="heart" size="32rpx" />
        <ui-icon name="heart" size="48rpx" />
        <ui-icon name="heart" size="64rpx" />
        <ui-icon name="heart" size="80rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="常用图标">
      <view class="icon-grid">
        <view v-for="icon in commonIcons" :key="icon" class="icon-item">
          <ui-icon :name="icon" size="48rpx" />
          <text class="icon-name">{{ icon }}</text>
        </view>
      </view>
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
  "heart",
  "home",
  "user",
  "setting",
  "phone",
  "location",
  "cart",
  "share",
  "delete",
  "edit",
  "eye",
  "eye-off",
  "lock",
  "unlock",
]
</script>

<style lang="scss" scoped>
.icon-grid {
  gap: 24rpx;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.icon-item {
  display: flex;
  padding: 16rpx;
  background: var(--ui-color-background-light);
  align-items: center;
  border-radius: 8rpx;
  flex-direction: column;
}

.icon-name {
  color: var(--ui-color-text-secondary);
  font-size: 20rpx;
  margin-top: 8rpx;
  text-align: center;
  word-break: break-all;
}
</style>
