<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-button type="primary" @click="showCenter = true">居中弹出</ui-button>
      </view>
    </view>

    <!-- 弹出位置 -->
    <view class="demo-section">
      <text class="section-title">弹出位置</text>
      <view class="demo-block">
        <ui-button @click="showTop = true">顶部弹出</ui-button>
        <ui-button @click="showBottom = true">底部弹出</ui-button>
        <ui-button @click="showLeft = true">左侧弹出</ui-button>
        <ui-button @click="showRight = true">右侧弹出</ui-button>
      </view>
    </view>

    <!-- 关闭图标 -->
    <view class="demo-section">
      <text class="section-title">关闭图标</text>
      <view class="demo-block">
        <ui-button type="primary" @click="showClose = true">显示关闭图标</ui-button>
      </view>
    </view>

    <!-- 圆角弹窗 -->
    <view class="demo-section">
      <text class="section-title">圆角弹窗</text>
      <view class="demo-block">
        <ui-button type="primary" @click="showRound = true">圆角弹窗</ui-button>
      </view>
    </view>

    <!-- 弹出层组件 -->
    <ui-popup v-model:show="showCenter" position="center">
      <view class="popup-content center-content">
        <text>居中弹出内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showTop" position="top">
      <view class="popup-content top-content">
        <text>顶部弹出内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showBottom" position="bottom">
      <view class="popup-content bottom-content">
        <text>底部弹出内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showLeft" position="left">
      <view class="popup-content left-content">
        <text>左侧弹出</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showRight" position="right">
      <view class="popup-content right-content">
        <text>右侧弹出</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showClose" position="bottom" closeable>
      <view class="popup-content bottom-content">
        <text>带关闭图标的弹窗</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showRound" position="bottom" round>
      <view class="popup-content bottom-content">
        <text>圆角弹窗内容</text>
      </view>
    </ui-popup>

    <!-- API 说明 -->
    <view class="api-section">
      <text class="section-title">常用属性</text>
      <view class="api-table">
        <view class="api-row api-header">
          <text class="api-cell">属性</text>
          <text class="api-cell">说明</text>
          <text class="api-cell">类型</text>
        </view>
        <view class="api-row">
          <text class="api-cell">v-model:show</text>
          <text class="api-cell">是否显示弹出层</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">position</text>
          <text class="api-cell">弹出位置</text>
          <text class="api-cell">top/bottom/left/right/center</text>
        </view>
        <view class="api-row">
          <text class="api-cell">round</text>
          <text class="api-cell">是否圆角</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">closeable</text>
          <text class="api-cell">是否显示关闭图标</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">overlay</text>
          <text class="api-cell">是否显示遮罩层</text>
          <text class="api-cell">boolean</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Popup 弹出层" },
})

import { ref } from "vue"

const showCenter = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
const showClose = ref(false)
const showRound = ref(false)
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 24rpx 32rpx;
  background: #f5f6fa;
  min-height: 100vh;
  padding-bottom: 60rpx;
}

.demo-section {
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}

.section-title {
  color: #333;
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 24rpx;
}

.demo-block {
  gap: 16rpx;
  display: flex;
  flex-wrap: wrap;
}

.popup-content {
  display: flex;
  padding: 48rpx;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.center-content {
  width: 500rpx;
  height: 300rpx;
  border-radius: 16rpx;
}

.top-content,
.bottom-content {
  width: 100%;
  min-height: 400rpx;
}

.left-content,
.right-content {
  width: 50vw;
  height: 100vh;
}

.api-section {
  padding: 24rpx;
  background: #fff;
  overflow-x: auto;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}

.api-table {
  min-width: 500rpx;
}

.api-row {
  display: flex;
  border-bottom: 1rpx solid #eee;

  &.api-header {
    background: #f8f9fa;
    font-weight: 600;
  }
}

.api-cell {
  flex: 1;
  color: #333;
  padding: 16rpx 12rpx;
  font-size: 24rpx;
  word-break: break-all;
}
</style>
