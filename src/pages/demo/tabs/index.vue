<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-tabs v-model="active1">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </view>
    </view>

    <!-- 通过名称匹配 -->
    <view class="demo-section">
      <text class="section-title">通过名称匹配</text>
      <view class="demo-block-full">
        <ui-tabs v-model="active2">
          <ui-tab title="标签一" name="a" />
          <ui-tab title="标签二" name="b" />
          <ui-tab title="标签三" name="c" />
        </ui-tabs>
      </view>
    </view>

    <!-- 禁用标签 -->
    <view class="demo-section">
      <text class="section-title">禁用标签</text>
      <view class="demo-block-full">
        <ui-tabs v-model="active3">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" disabled />
          <ui-tab title="标签三" />
        </ui-tabs>
      </view>
    </view>

    <!-- 滑动标签 -->
    <view class="demo-section">
      <text class="section-title">滑动标签</text>
      <view class="demo-block-full">
        <ui-tabs v-model="active4" scrollable>
          <ui-tab v-for="i in 8" :key="i" :title="`标签 ${i}`" />
        </ui-tabs>
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="demo-section">
      <text class="section-title">自定义样式</text>
      <view class="demo-block-full">
        <ui-tabs v-model="active5" active-color="#07c160">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </view>
    </view>

    <!-- 底部边框 -->
    <view class="demo-section">
      <text class="section-title">底部边框</text>
      <view class="demo-block-full">
        <ui-tabs v-model="active6" border-bottom>
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Tabs 标签页" },
})

const active1 = ref(0)
const active2 = ref("a")
const active3 = ref(0)
const active4 = ref(0)
const active5 = ref(0)
const active6 = ref(0)
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
