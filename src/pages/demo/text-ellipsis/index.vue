<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法 (默认2行)</text>
      <view class="demo-block">
        <ui-text-ellipsis :text="longText" />
      </view>
    </view>

    <!-- 自定义行数 -->
    <view class="demo-section">
      <text class="section-title">自定义行数 (1行)</text>
      <view class="demo-block">
        <ui-text-ellipsis :text="longText" :rows="1" />
      </view>
    </view>

    <!-- 3行展示 -->
    <view class="demo-section">
      <text class="section-title">自定义行数 (3行)</text>
      <view class="demo-block">
        <ui-text-ellipsis :text="longText" :rows="3" />
      </view>
    </view>

    <!-- 自定义展开收起文案 -->
    <view class="demo-section">
      <text class="section-title">自定义展开收起文案</text>
      <view class="demo-block">
        <ui-text-ellipsis :text="longText" expand-text="查看更多" collapse-text="收起内容" expand-text-color="#1e90ff" collapse-text-color="#999" />
      </view>
    </view>

    <!-- 自定义省略号 -->
    <view class="demo-section">
      <text class="section-title">自定义省略号</text>
      <view class="demo-block">
        <ui-text-ellipsis :text="longText" dots="……" />
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="demo-section">
      <text class="section-title">自定义样式</text>
      <view class="demo-block">
        <ui-text-ellipsis :text="longText" color="#666" line-height="1.8" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "TextEllipsis 文本省略" },
})

const longText =
  "Vue.js 是一款用于构建用户界面的渐进式 JavaScript 框架。与其他大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。它具有响应式数据绑定、组件化、虚拟DOM等特性，使得前端开发变得更加高效和灵活。"
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
