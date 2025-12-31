<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-stepper v-model="value1" />
      </view>
    </view>

    <!-- 步长设置 -->
    <view class="demo-section">
      <text class="section-title">步长设置</text>
      <view class="demo-block">
        <ui-stepper v-model="value2" :step="2" />
      </view>
    </view>

    <!-- 限制范围 -->
    <view class="demo-section">
      <text class="section-title">限制范围</text>
      <view class="demo-block">
        <ui-stepper v-model="value3" :min="5" :max="10" />
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block">
        <ui-stepper v-model="value4" disabled />
      </view>
    </view>

    <!-- 禁用输入 -->
    <view class="demo-section">
      <text class="section-title">禁用输入</text>
      <view class="demo-block">
        <ui-stepper v-model="value5" disabled-input />
      </view>
    </view>

    <!-- 小数位数 -->
    <view class="demo-section">
      <text class="section-title">小数位数</text>
      <view class="demo-block">
        <ui-stepper v-model="value6" :step="0.1" :decimal-length="1" />
      </view>
    </view>

    <!-- 圆角风格 -->
    <view class="demo-section">
      <text class="section-title">圆角风格</text>
      <view class="demo-block">
        <ui-stepper v-model="value7" theme="round" />
      </view>
    </view>

    <!-- 长按快速加减 -->
    <view class="demo-section">
      <text class="section-title">长按快速加减</text>
      <view class="demo-block">
        <ui-stepper v-model="value8" long-press />
      </view>
    </view>

    <!-- 自定义尺寸 -->
    <view class="demo-section">
      <text class="section-title">自定义尺寸</text>
      <view class="demo-block">
        <ui-stepper v-model="value9" height="64rpx" input-width="80rpx" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Stepper 步进器" },
})

const value1 = ref(1)
const value2 = ref(0)
const value3 = ref(5)
const value4 = ref(1)
const value5 = ref(1)
const value6 = ref(0.5)
const value7 = ref(1)
const value8 = ref(1)
const value9 = ref(1)
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
