<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-radio-group v-model="value1">
          <ui-radio name="1" label="选项一" />
          <ui-radio name="2" label="选项二" />
        </ui-radio-group>
      </view>
    </view>

    <!-- 水平排列 -->
    <view class="demo-section">
      <text class="section-title">水平排列</text>
      <view class="demo-block">
        <ui-radio-group v-model="value2">
          <ui-radio name="1" label="选项一" />
          <ui-radio name="2" label="选项二" />
          <ui-radio name="3" label="选项三" />
        </ui-radio-group>
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block-full">
        <ui-radio-group v-model="value3" disabled>
          <ui-radio name="1" label="选项一" />
          <ui-radio name="2" label="选项二" />
        </ui-radio-group>
      </view>
    </view>

    <!-- 圆形样式 -->
    <view class="demo-section">
      <text class="section-title">圆形样式</text>
      <view class="demo-block-full">
        <ui-radio-group v-model="value4" round>
          <ui-radio name="1" label="选项一" />
          <ui-radio name="2" label="选项二" />
        </ui-radio-group>
      </view>
    </view>

    <!-- 圆点样式 -->
    <view class="demo-section">
      <text class="section-title">圆点样式</text>
      <view class="demo-block-full">
        <ui-radio-group v-model="value5" shape="dot" round>
          <ui-radio name="1" label="选项一" />
          <ui-radio name="2" label="选项二" />
        </ui-radio-group>
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block-full">
        <ui-radio-group v-model="value6" checked-icon-color="#07c160">
          <ui-radio name="1" label="选项一" />
          <ui-radio name="2" label="选项二" />
        </ui-radio-group>
      </view>
    </view>

    <!-- 左侧文本 -->
    <view class="demo-section">
      <text class="section-title">左侧文本</text>
      <view class="demo-block-full">
        <ui-radio-group v-model="value7" label-left>
          <ui-radio name="1" label="选项一" />
          <ui-radio name="2" label="选项二" />
        </ui-radio-group>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Radio 单选框" },
})

const value1 = ref("1")
const value2 = ref("1")
const value3 = ref("1")
const value4 = ref("1")
const value5 = ref("1")
const value6 = ref("1")
const value7 = ref("1")
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
