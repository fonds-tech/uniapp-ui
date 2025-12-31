<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="数字指示器">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" indicator-type="number" />
      </demo-block>
    </demo-section>

    <demo-section title="指示器位置">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" indicator-position="bottom" />
      </demo-block>
    </demo-section>

    <demo-section title="垂直滚动">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" vertical indicator-position="right" />
      </demo-block>
    </demo-section>

    <demo-section title="关闭自动播放">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" :autoplay="false" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义间隔 (5s)">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" :interval="5000" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

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
