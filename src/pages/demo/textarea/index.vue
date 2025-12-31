<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-textarea v-model="value1" placeholder="请输入内容" />
      </view>
    </view>

    <!-- 字数统计 -->
    <view class="demo-section">
      <text class="section-title">字数统计</text>
      <view class="demo-block-full">
        <ui-textarea v-model="value2" placeholder="请输入内容" :maxlength="100" show-count />
      </view>
    </view>

    <!-- 自动高度 -->
    <view class="demo-section">
      <text class="section-title">自动高度</text>
      <view class="demo-block-full">
        <ui-textarea v-model="value3" placeholder="高度自动增加" auto-height />
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block-full">
        <ui-textarea v-model="value4" placeholder="禁用状态" disabled />
      </view>
    </view>

    <!-- 可清除 -->
    <view class="demo-section">
      <text class="section-title">可清除</text>
      <view class="demo-block-full">
        <ui-textarea v-model="value5" placeholder="可清除内容" clearable />
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="demo-section">
      <text class="section-title">自定义样式</text>
      <view class="demo-block-full">
        <ui-textarea v-model="value6" placeholder="自定义边框和圆角" border="1rpx solid #dcdee0" radius="16rpx" padding="24rpx" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Textarea 文本域" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("这是禁用状态的文本")
const value5 = ref("点击右侧图标清除")
const value6 = ref("")
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
