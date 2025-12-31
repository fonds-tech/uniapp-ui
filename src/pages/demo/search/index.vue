<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-search v-model="value1" placeholder="请输入搜索关键词" />
      </view>
    </view>

    <!-- 圆角搜索框 -->
    <view class="demo-section">
      <text class="section-title">圆角搜索框</text>
      <view class="demo-block-full">
        <ui-search v-model="value2" round placeholder="圆角搜索框" />
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block-full">
        <ui-search v-model="value3" disabled placeholder="禁用状态" />
      </view>
    </view>

    <!-- 自定义背景色 -->
    <view class="demo-section">
      <text class="section-title">自定义背景色</text>
      <view class="demo-block-full">
        <ui-search v-model="value4" background="#f5f5f5" placeholder="自定义背景色" />
      </view>
    </view>

    <!-- 自定义按钮文字 -->
    <view class="demo-section">
      <text class="section-title">自定义按钮文字</text>
      <view class="demo-block-full">
        <ui-search v-model="value5" action-text="确定" placeholder="自定义按钮文字" />
      </view>
    </view>

    <!-- 隐藏搜索按钮 -->
    <view class="demo-section">
      <text class="section-title">隐藏搜索按钮</text>
      <view class="demo-block-full">
        <ui-search v-model="value6" :action="false" placeholder="隐藏搜索按钮" />
      </view>
    </view>

    <!-- 搜索事件 -->
    <view class="demo-section">
      <text class="section-title">搜索事件</text>
      <view class="demo-block-full">
        <ui-search v-model="value7" placeholder="点击搜索按钮触发事件" @search="onSearch" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Search 搜索" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("禁用内容")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("")
const value7 = ref("")

function onSearch(value: string) {
  uni.showToast({ title: `搜索: ${value}`, icon: "none" })
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
