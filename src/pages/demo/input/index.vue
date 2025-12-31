<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-input v-model="value1" placeholder="请输入内容" />
      </view>
    </view>

    <!-- 自定义类型 -->
    <view class="demo-section">
      <text class="section-title">输入框类型</text>
      <view class="demo-block-full">
        <ui-input v-model="value2" type="text" placeholder="文本输入" />
        <ui-input v-model="value3" type="number" placeholder="数字输入" />
        <ui-input v-model="value4" type="digit" placeholder="带小数点数字" />
        <ui-input v-model="value5" password placeholder="密码输入" />
      </view>
    </view>

    <!-- 禁用和只读 -->
    <view class="demo-section">
      <text class="section-title">禁用和只读</text>
      <view class="demo-block-full">
        <ui-input model-value="禁用状态" disabled placeholder="禁用状态" />
        <ui-input model-value="只读状态" readonly placeholder="只读状态" />
      </view>
    </view>

    <!-- 清除按钮 -->
    <view class="demo-section">
      <text class="section-title">清除按钮</text>
      <view class="demo-block-full">
        <ui-input v-model="value6" clearable placeholder="可清除内容" />
        <ui-input v-model="value7" :clearable="false" placeholder="不可清除" />
      </view>
    </view>

    <!-- 输入框样式 -->
    <view class="demo-section">
      <text class="section-title">自定义样式</text>
      <view class="demo-block-full">
        <ui-input v-model="value8" background="#f5f6fa" radius="16rpx" placeholder="自定义背景和圆角" />
        <ui-input v-model="value9" input-align="center" placeholder="居中对齐" />
        <ui-input v-model="value10" input-align="right" placeholder="右对齐" />
      </view>
    </view>

    <!-- 最大长度 -->
    <view class="demo-section">
      <text class="section-title">限制输入长度</text>
      <view class="demo-block-full">
        <ui-input v-model="value11" :maxlength="10" placeholder="最多输入10个字符" />
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
          <text class="api-cell">输入值</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">type</text>
          <text class="api-cell">输入类型</text>
          <text class="api-cell">text/number/digit</text>
        </view>
        <view class="api-row">
          <text class="api-cell">placeholder</text>
          <text class="api-cell">占位符</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">clearable</text>
          <text class="api-cell">是否可清除</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">disabled</text>
          <text class="api-cell">是否禁用</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">readonly</text>
          <text class="api-cell">是否只读</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">maxlength</text>
          <text class="api-cell">最大长度</text>
          <text class="api-cell">number</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Input 输入框" },
})

import { ref } from "vue"

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("可以清除的内容")
const value7 = ref("")
const value8 = ref("")
const value9 = ref("")
const value10 = ref("")
const value11 = ref("")
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

.demo-block-full {
  gap: 16rpx;
  display: flex;
  flex-direction: column;
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
