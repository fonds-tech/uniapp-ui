<template>
  <view class="demo-page">
    <ui-navbar title="标题" background="#ffffff" is-back />

    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-navbar title="标题" :fixed="false" />
      </view>
    </view>

    <!-- 返回按钮 -->
    <view class="demo-section">
      <text class="section-title">返回按钮</text>
      <view class="demo-block-full">
        <ui-navbar title="标题" :fixed="false" is-back />
      </view>
    </view>

    <!-- 返回文字 -->
    <view class="demo-section">
      <text class="section-title">返回文字</text>
      <view class="demo-block-full">
        <ui-navbar title="标题" :fixed="false" is-back back-text="返回" />
      </view>
    </view>

    <!-- 自定义左侧 -->
    <view class="demo-section">
      <text class="section-title">自定义左侧</text>
      <view class="demo-block-full">
        <ui-navbar title="标题" :fixed="false">
          <template #left>
            <ui-icon name="close" size="40rpx" />
          </template>
        </ui-navbar>
      </view>
    </view>

    <!-- 自定义右侧 -->
    <view class="demo-section">
      <text class="section-title">自定义右侧</text>
      <view class="demo-block-full">
        <ui-navbar title="标题" :fixed="false" is-back>
          <template #right>
            <ui-icon name="search" size="40rpx" />
          </template>
        </ui-navbar>
      </view>
    </view>

    <!-- 自定义背景 -->
    <view class="demo-section">
      <text class="section-title">自定义背景</text>
      <view class="demo-block-full">
        <ui-navbar title="标题" :fixed="false" background="primary" title-color="#ffffff" is-back back-icon-color="#ffffff" />
      </view>
    </view>

    <!-- 标题居中 -->
    <view class="demo-section">
      <text class="section-title">标题居中</text>
      <view class="demo-block-full">
        <ui-navbar title="标题居中" :fixed="false" is-back title-center />
      </view>
    </view>

    <!-- 底部边框 -->
    <view class="demo-section">
      <text class="section-title">底部边框</text>
      <view class="demo-block-full">
        <ui-navbar title="底部边框" :fixed="false" border-bottom />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Navbar 导航栏" },
})

// Navbar demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.demo-page {
  padding-top: 0;
}
</style>
