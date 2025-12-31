<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-text text="这是一段普通文本" />
      </view>
    </view>

    <!-- 文本大小 -->
    <view class="demo-section">
      <text class="section-title">文本大小</text>
      <view class="demo-block-full">
        <ui-text text="特小文本 20rpx" size="20rpx" />
        <ui-text text="小号文本 24rpx" size="24rpx" />
        <ui-text text="中号文本 28rpx" size="28rpx" />
        <ui-text text="大号文本 32rpx" size="32rpx" />
        <ui-text text="特大文本 36rpx" size="36rpx" />
      </view>
    </view>

    <!-- 文本颜色 -->
    <view class="demo-section">
      <text class="section-title">文本颜色</text>
      <view class="demo-block-full">
        <ui-text text="主要文本" color="text-primary" />
        <ui-text text="次要文本" color="text-secondary" />
        <ui-text text="占位文本" color="text-placeholder" />
        <ui-text text="主题色文本" color="primary" />
        <ui-text text="成功色文本" color="success" />
        <ui-text text="警告色文本" color="warning" />
        <ui-text text="错误色文本" color="error" />
      </view>
    </view>

    <!-- 文本粗细 -->
    <view class="demo-section">
      <text class="section-title">文本粗细</text>
      <view class="demo-block-full">
        <ui-text text="正常粗细 400" weight="400" />
        <ui-text text="中等粗细 500" weight="500" />
        <ui-text text="粗体文本 600" weight="600" />
        <ui-text text="特粗文本 700" weight="700" />
      </view>
    </view>

    <!-- 文本行数限制 -->
    <view class="demo-section">
      <text class="section-title">文本行数限制</text>
      <view class="demo-block-full">
        <ui-text :rows="1" text="这是一段很长的文本，用于测试文本行数限制功能，当文本超过指定行数时会自动截断并显示省略号" />
        <ui-text :rows="2" text="这是一段很长的文本，用于测试文本行数限制功能，当文本超过指定行数时会自动截断并显示省略号，这是第二行的内容，可能会被截断" />
      </view>
    </view>

    <!-- 前后缀 -->
    <view class="demo-section">
      <text class="section-title">前后缀</text>
      <view class="demo-block-full">
        <ui-text text="99.00" prefix="¥" prefix-size="24rpx" prefix-color="error" />
        <ui-text text="128" suffix="元/月" suffix-size="24rpx" suffix-color="text-secondary" />
        <ui-text text="1000" prefix="¥" suffix=".00" color="error" size="40rpx" weight="600" />
      </view>
    </view>

    <!-- 文本装饰 -->
    <view class="demo-section">
      <text class="section-title">文本装饰</text>
      <view class="demo-block-full">
        <ui-text text="下划线文本" decoration="underline" />
        <ui-text text="删除线文本" decoration="line-through" />
        <ui-text text="上划线文本" decoration="overline" />
      </view>
    </view>

    <!-- 可选择文本 -->
    <view class="demo-section">
      <text class="section-title">可选择文本</text>
      <view class="demo-block-full">
        <ui-text text="长按可以选择复制这段文本" selectable />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Text 文本" },
})

// Text demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
