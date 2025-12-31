<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-rate v-model="value1" />
      </view>
    </view>

    <!-- 自定义图标 -->
    <view class="demo-section">
      <text class="section-title">自定义图标</text>
      <view class="demo-block">
        <ui-rate v-model="value2" icon="heart-fill" void-icon="heart" color="#ee0a24" />
      </view>
    </view>

    <!-- 半星 -->
    <view class="demo-section">
      <text class="section-title">半星</text>
      <view class="demo-block">
        <ui-rate v-model="value3" allow-half />
      </view>
    </view>

    <!-- 自定义数量 -->
    <view class="demo-section">
      <text class="section-title">自定义数量</text>
      <view class="demo-block">
        <ui-rate v-model="value4" :count="6" />
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block">
        <ui-rate v-model="value5" color="#07c160" void-color="#e8e8e8" />
      </view>
    </view>

    <!-- 自定义大小 -->
    <view class="demo-section">
      <text class="section-title">自定义大小</text>
      <view class="demo-block-full">
        <ui-rate v-model="value6" size="40rpx" />
        <ui-rate v-model="value6" size="56rpx" />
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block">
        <ui-rate v-model="value7" disabled />
      </view>
    </view>

    <!-- 只读状态 -->
    <view class="demo-section">
      <text class="section-title">只读状态</text>
      <view class="demo-block">
        <ui-rate v-model="value8" readonly allow-half />
      </view>
    </view>

    <!-- 可滑动选择 -->
    <view class="demo-section">
      <text class="section-title">可滑动选择</text>
      <view class="demo-block">
        <ui-rate v-model="value9" touchable />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Rate 评分" },
})

const value1 = ref(3)
const value2 = ref(3)
const value3 = ref(2.5)
const value4 = ref(4)
const value5 = ref(3)
const value6 = ref(3)
const value7 = ref(3)
const value8 = ref(3.5)
const value9 = ref(3)
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
