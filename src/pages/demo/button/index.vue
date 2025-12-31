<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Button 按钮"
  }
}
</route>

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

    <!-- API 说明 -->
    <view class="api-section">
      <text class="section-title">API</text>
      <view class="api-table">
        <view class="api-row api-header">
          <text class="api-cell">属性</text>
          <text class="api-cell">说明</text>
          <text class="api-cell">类型</text>
          <text class="api-cell">默认值</text>
        </view>
        <view class="api-row">
          <text class="api-cell">type</text>
          <text class="api-cell">按钮类型</text>
          <text class="api-cell">string</text>
          <text class="api-cell">default</text>
        </view>
        <view class="api-row">
          <text class="api-cell">size</text>
          <text class="api-cell">按钮尺寸</text>
          <text class="api-cell">string</text>
          <text class="api-cell">normal</text>
        </view>
        <view class="api-row">
          <text class="api-cell">plain</text>
          <text class="api-cell">是否朴素按钮</text>
          <text class="api-cell">boolean</text>
          <text class="api-cell">false</text>
        </view>
        <view class="api-row">
          <text class="api-cell">disabled</text>
          <text class="api-cell">是否禁用</text>
          <text class="api-cell">boolean</text>
          <text class="api-cell">false</text>
        </view>
        <view class="api-row">
          <text class="api-cell">loading</text>
          <text class="api-cell">是否加载中</text>
          <text class="api-cell">boolean</text>
          <text class="api-cell">false</text>
        </view>
        <view class="api-row">
          <text class="api-cell">block</text>
          <text class="api-cell">是否块级</text>
          <text class="api-cell">boolean</text>
          <text class="api-cell">false</text>
        </view>
        <view class="api-row">
          <text class="api-cell">round</text>
          <text class="api-cell">是否圆角</text>
          <text class="api-cell">boolean</text>
          <text class="api-cell">false</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// Button demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
