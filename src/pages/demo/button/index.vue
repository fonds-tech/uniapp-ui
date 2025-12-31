<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-button type="primary">主要按钮</ui-button>
        <ui-button type="success">成功按钮</ui-button>
        <ui-button type="warning">警告按钮</ui-button>
        <ui-button type="error">错误按钮</ui-button>
        <ui-button type="default">默认按钮</ui-button>
      </view>
    </view>

    <!-- 朴素按钮 -->
    <view class="demo-section">
      <text class="section-title">朴素按钮</text>
      <view class="demo-block">
        <ui-button type="primary" plain>朴素按钮</ui-button>
        <ui-button type="success" plain>朴素按钮</ui-button>
        <ui-button type="warning" plain>朴素按钮</ui-button>
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block">
        <ui-button type="primary" disabled>禁用状态</ui-button>
        <ui-button type="success" disabled>禁用状态</ui-button>
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="demo-section">
      <text class="section-title">加载状态</text>
      <view class="demo-block">
        <ui-button type="primary" loading>加载中</ui-button>
        <ui-button type="success" loading loading-text="提交中...">加载中</ui-button>
      </view>
    </view>

    <!-- 按钮形状 -->
    <view class="demo-section">
      <text class="section-title">按钮形状</text>
      <view class="demo-block">
        <ui-button type="primary">默认</ui-button>
        <ui-button type="primary" round>圆角</ui-button>
        <ui-button type="primary" square>方形</ui-button>
      </view>
    </view>

    <!-- 按钮尺寸 -->
    <view class="demo-section">
      <text class="section-title">按钮尺寸</text>
      <view class="demo-block">
        <ui-button type="primary" size="large">大号按钮</ui-button>
        <ui-button type="primary" size="normal">普通按钮</ui-button>
        <ui-button type="primary" size="small">小型按钮</ui-button>
        <ui-button type="primary" size="mini">迷你按钮</ui-button>
      </view>
    </view>

    <!-- 块级按钮 -->
    <view class="demo-section">
      <text class="section-title">块级按钮</text>
      <view class="demo-block-full">
        <ui-button type="primary" block>块级按钮</ui-button>
        <ui-button type="success" block>块级按钮</ui-button>
      </view>
    </view>

    <!-- 图标按钮 -->
    <view class="demo-section">
      <text class="section-title">图标按钮</text>
      <view class="demo-block">
        <ui-button type="primary" icon="search">搜索</ui-button>
        <ui-button type="success" icon="plus">新增</ui-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Button 按钮" },
})
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
