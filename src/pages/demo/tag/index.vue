<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Tag 标签"
  }
}
</route>

<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-tag text="标签" />
        <ui-tag type="primary" text="主要" />
        <ui-tag type="success" text="成功" />
        <ui-tag type="warning" text="警告" />
        <ui-tag type="error" text="错误" />
        <ui-tag type="info" text="信息" />
      </view>
    </view>

    <!-- 镂空样式 -->
    <view class="demo-section">
      <text class="section-title">镂空样式</text>
      <view class="demo-block">
        <ui-tag type="primary" plain text="主要" />
        <ui-tag type="success" plain text="成功" />
        <ui-tag type="warning" plain text="警告" />
        <ui-tag type="error" plain text="错误" />
        <ui-tag type="info" plain text="信息" />
      </view>
    </view>

    <!-- 圆角样式 -->
    <view class="demo-section">
      <text class="section-title">圆角样式</text>
      <view class="demo-block">
        <ui-tag type="primary" round text="圆角标签" />
        <ui-tag type="success" round text="圆角标签" />
        <ui-tag type="warning" round text="圆角标签" />
      </view>
    </view>

    <!-- 可关闭标签 -->
    <view class="demo-section">
      <text class="section-title">可关闭标签</text>
      <view class="demo-block">
        <ui-tag v-if="showTag1" type="primary" closeable text="点击关闭" @close="showTag1 = false" />
        <ui-tag v-if="showTag2" type="success" closeable text="点击关闭" @close="showTag2 = false" />
        <ui-tag v-if="showTag3" type="warning" closeable text="点击关闭" @close="showTag3 = false" />
        <ui-button v-if="!showTag1 || !showTag2 || !showTag3" type="primary" size="small" @click="resetTags"> 重置 </ui-button>
      </view>
    </view>

    <!-- 带图标 -->
    <view class="demo-section">
      <text class="section-title">带图标</text>
      <view class="demo-block">
        <ui-tag type="primary" icon="star" text="收藏" />
        <ui-tag type="success" icon="check" text="已完成" />
        <ui-tag type="error" icon="close" text="已删除" />
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block">
        <ui-tag background="#7232dd" text-color="#fff" text="自定义背景" />
        <ui-tag background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" text-color="#fff" text="渐变背景" />
      </view>
    </view>

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
          <text class="api-cell">text</text>
          <text class="api-cell">标签内容</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">type</text>
          <text class="api-cell">主题类型</text>
          <text class="api-cell">primary/success/warning/error/info</text>
        </view>
        <view class="api-row">
          <text class="api-cell">plain</text>
          <text class="api-cell">是否镂空</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">round</text>
          <text class="api-cell">是否圆角</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">closeable</text>
          <text class="api-cell">是否可关闭</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">icon</text>
          <text class="api-cell">图标名称</text>
          <text class="api-cell">string</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

const showTag1 = ref(true)
const showTag2 = ref(true)
const showTag3 = ref(true)

function resetTags() {
  showTag1.value = true
  showTag2.value = true
  showTag3.value = true
}
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
  align-items: center;
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
