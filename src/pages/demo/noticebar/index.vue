<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-notice-bar text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </view>
    </view>

    <!-- 滚动播放 -->
    <view class="demo-section">
      <text class="section-title">滚动播放</text>
      <view class="demo-block-full">
        <ui-notice-bar scrollable text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </view>
    </view>

    <!-- 多行展示 -->
    <view class="demo-section">
      <text class="section-title">多行展示</text>
      <view class="demo-block-full">
        <ui-notice-bar wrapable :scrollable="false" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </view>
    </view>

    <!-- 左侧图标 -->
    <view class="demo-section">
      <text class="section-title">左侧图标</text>
      <view class="demo-block-full">
        <ui-notice-bar left-icon="volume-up" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </view>
    </view>

    <!-- 通知模式 -->
    <view class="demo-section">
      <text class="section-title">通知模式</text>
      <view class="demo-block-full">
        <ui-notice-bar mode="closeable" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
        <ui-notice-bar mode="link" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="demo-section">
      <text class="section-title">自定义样式</text>
      <view class="demo-block-full">
        <ui-notice-bar background="#ecf9ff" color="#1989fa" left-icon="info" text="技术是开发它的人的共同灵魂。" />
      </view>
    </view>

    <!-- 垂直滚动 -->
    <view class="demo-section">
      <text class="section-title">垂直滚动</text>
      <view class="demo-block-full">
        <ui-notice-bar :text="notices" vertical left-icon="volume-up" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "NoticeBar 通知栏" },
})

const notices = ["通知内容一", "通知内容二", "通知内容三"]
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
