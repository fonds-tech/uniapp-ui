<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-button type="primary" @click="show1 = true">显示遮罩层</ui-button>
      </view>
    </view>

    <!-- 嵌入内容 -->
    <view class="demo-section">
      <text class="section-title">嵌入内容</text>
      <view class="demo-block">
        <ui-button type="primary" @click="show2 = true">嵌入内容</ui-button>
      </view>
    </view>

    <!-- 自定义透明度 -->
    <view class="demo-section">
      <text class="section-title">自定义透明度</text>
      <view class="demo-block">
        <ui-button type="primary" @click="show3 = true">透明度 0.3</ui-button>
        <ui-button type="primary" @click="show4 = true">透明度 0.7</ui-button>
      </view>
    </view>

    <!-- 点击不关闭 -->
    <view class="demo-section">
      <text class="section-title">点击不关闭</text>
      <view class="demo-block">
        <ui-button type="primary" @click="show5 = true">点击不关闭</ui-button>
      </view>
    </view>

    <!-- 遮罩层 -->
    <ui-overlay :show="show1" @click="show1 = false" />

    <ui-overlay :show="show2" @click="show2 = false">
      <view class="overlay-content">
        <text class="overlay-text">嵌入内容</text>
      </view>
    </ui-overlay>

    <ui-overlay :show="show3" :opacity="0.3" @click="show3 = false" />

    <ui-overlay :show="show4" :opacity="0.7" @click="show4 = false" />

    <ui-overlay :show="show5" :close-on-click="false">
      <view class="overlay-content" @click="show5 = false">
        <text class="overlay-text">点击此处关闭</text>
      </view>
    </ui-overlay>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Overlay 遮罩层" },
})

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.overlay-content {
  width: 300rpx;
  height: 300rpx;
  display: flex;
  background: var(--ui-color-background);
  align-items: center;
  border-radius: 16rpx;
  justify-content: center;
}

.overlay-text {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
}
</style>
