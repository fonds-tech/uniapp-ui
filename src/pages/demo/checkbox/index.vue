<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-checkbox v-model="checked" label="复选框" />
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block">
        <ui-checkbox v-model="disabled1" disabled label="禁用状态" />
        <ui-checkbox :model-value="true" disabled label="禁用且选中" />
      </view>
    </view>

    <!-- 自定义形状 -->
    <view class="demo-section">
      <text class="section-title">自定义形状</text>
      <view class="demo-block">
        <ui-checkbox v-model="shape1" shape="square" label="方形" />
        <ui-checkbox v-model="shape2" shape="round" label="圆形" />
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block">
        <ui-checkbox v-model="color1" checked-color="#ee0a24" label="红色" />
        <ui-checkbox v-model="color2" checked-color="#07c160" label="绿色" />
        <ui-checkbox v-model="color3" checked-color="#7232dd" label="紫色" />
      </view>
    </view>

    <!-- 复选框组 -->
    <view class="demo-section">
      <text class="section-title">复选框组</text>
      <view class="demo-block-vertical">
        <ui-checkbox-group v-model="groupValue">
          <ui-checkbox name="a" label="选项 A" />
          <ui-checkbox name="b" label="选项 B" />
          <ui-checkbox name="c" label="选项 C" />
        </ui-checkbox-group>
        <text class="demo-text">当前选中: {{ groupValue.join(", ") || "无" }}</text>
      </view>
    </view>

    <!-- 限制最大可选数 -->
    <view class="demo-section">
      <text class="section-title">限制最大可选数</text>
      <view class="demo-block-vertical">
        <ui-checkbox-group v-model="maxValue" :max="2">
          <ui-checkbox name="a" label="选项 A" />
          <ui-checkbox name="b" label="选项 B" />
          <ui-checkbox name="c" label="选项 C" />
          <ui-checkbox name="d" label="选项 D" />
        </ui-checkbox-group>
        <text class="demo-text">最多选择 2 项</text>
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
          <text class="api-cell">v-model</text>
          <text class="api-cell">是否选中</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">label</text>
          <text class="api-cell">标签文本</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">name</text>
          <text class="api-cell">标识符（用于组）</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">shape</text>
          <text class="api-cell">形状</text>
          <text class="api-cell">square/round</text>
        </view>
        <view class="api-row">
          <text class="api-cell">disabled</text>
          <text class="api-cell">是否禁用</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">checked-color</text>
          <text class="api-cell">选中颜色</text>
          <text class="api-cell">string</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Checkbox 复选框" },
})

const checked = ref(true)
const disabled1 = ref(false)
const shape1 = ref(true)
const shape2 = ref(true)
const color1 = ref(true)
const color2 = ref(true)
const color3 = ref(true)
const groupValue = ref(["a"])
const maxValue = ref(["a"])
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
  gap: 24rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.demo-block-vertical {
  gap: 16rpx;
  display: flex;
  flex-direction: column;
}

.demo-text {
  color: #999;
  font-size: 24rpx;
  margin-top: 8rpx;
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
