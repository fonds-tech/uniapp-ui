<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block gap="40rpx">
        <ui-icon-text name="home" text="首页" />
        <ui-icon-text name="search" text="搜索" />
        <ui-icon-text name="heart" text="收藏" />
        <ui-icon-text name="person" text="我的" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block gap="40rpx">
        <ui-icon-text name="star" text="小" size="32rpx" text-size="24rpx" />
        <ui-icon-text name="star" text="中" size="48rpx" text-size="28rpx" />
        <ui-icon-text name="star" text="大" size="64rpx" text-size="32rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block gap="40rpx">
        <ui-icon-text name="heart-fill" text="红色" color="#ee0a24" text-color="#ee0a24" />
        <ui-icon-text name="check-circle-fill" text="绿色" color="#07c160" text-color="#07c160" />
        <ui-icon-text name="info-circle-fill" text="蓝色" color="#1989fa" text-color="#1989fa" />
      </demo-block>
    </demo-section>

    <demo-section title="文字在左边">
      <demo-block gap="40rpx">
        <ui-icon-text name="arrow-right" text="更多" text-left />
        <ui-icon-text name="arrow-right" text="查看详情" text-left />
      </demo-block>
    </demo-section>

    <demo-section title="自定义间距">
      <demo-block gap="40rpx">
        <ui-icon-text name="location" text="位置" text-gap="8rpx" />
        <ui-icon-text name="location" text="位置" text-gap="16rpx" />
        <ui-icon-text name="location" text="位置" text-gap="24rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="使用图片">
      <demo-block gap="40rpx">
        <ui-icon-text name="https://picsum.photos/40" text="图片1" width="40rpx" height="40rpx" radius="8rpx" />
        <ui-icon-text name="https://picsum.photos/40?2" text="图片2" width="40rpx" height="40rpx" radius="20rpx" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "IconText 图标文字" },
})
</script>
