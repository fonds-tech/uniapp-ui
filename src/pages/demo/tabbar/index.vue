<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full tabbar-wrap">
        <ui-tabbar v-model="active1" :fixed="false" :safe-area="false">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="person" text="我的" />
        </ui-tabbar>
      </view>
    </view>

    <!-- 徽标提示 -->
    <view class="demo-section">
      <text class="section-title">徽标提示</text>
      <view class="demo-block-full tabbar-wrap">
        <ui-tabbar v-model="active2" :fixed="false" :safe-area="false">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" dot />
          <ui-tabbar-item icon="message" text="消息" badge="5" />
          <ui-tabbar-item icon="person" text="我的" badge="99+" />
        </ui-tabbar>
      </view>
    </view>

    <!-- 自定义图标 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block-full tabbar-wrap">
        <ui-tabbar v-model="active3" :fixed="false" :safe-area="false" active-color="#07c160" inactive-color="#969799">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="person" text="我的" />
        </ui-tabbar>
      </view>
    </view>

    <!-- 切换事件 -->
    <view class="demo-section">
      <text class="section-title">切换事件</text>
      <view class="demo-block-full tabbar-wrap">
        <ui-tabbar v-model="active4" :fixed="false" :safe-area="false" @change="onChange">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="person" text="我的" />
        </ui-tabbar>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Tabbar 标签栏" },
})

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)

function onChange(index: number) {
  uni.showToast({ title: `切换到第 ${index + 1} 项`, icon: "none" })
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.tabbar-wrap {
  border: 1rpx solid var(--ui-color-border-light);
  overflow: hidden;
  border-radius: 12rpx;
}
</style>
