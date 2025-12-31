<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block-full">
        <ui-field v-model="value1" label="用户名" placeholder="请输入用户名" />
        <ui-field v-model="value2" label="密码" type="password" placeholder="请输入密码" />
      </view>
    </view>

    <!-- 必填项 -->
    <view class="demo-section">
      <text class="section-title">必填项</text>
      <view class="demo-block-full">
        <ui-field v-model="value3" label="手机号" placeholder="请输入手机号" required />
      </view>
    </view>

    <!-- 禁用与只读 -->
    <view class="demo-section">
      <text class="section-title">禁用与只读</text>
      <view class="demo-block-full">
        <ui-field v-model="value4" label="禁用" placeholder="禁用状态" disabled />
        <ui-field v-model="value5" label="只读" placeholder="只读状态" readonly />
      </view>
    </view>

    <!-- 带图标 -->
    <view class="demo-section">
      <text class="section-title">带图标</text>
      <view class="demo-block-full">
        <ui-field v-model="value6" label="用户名" placeholder="请输入" prefix-icon="person" />
        <ui-field v-model="value7" label="密码" type="password" placeholder="请输入" suffix-icon="eye" />
      </view>
    </view>

    <!-- 可清除 -->
    <view class="demo-section">
      <text class="section-title">可清除</text>
      <view class="demo-block-full">
        <ui-field v-model="value8" label="内容" placeholder="输入后显示清除按钮" clearable />
      </view>
    </view>

    <!-- 多行文本 -->
    <view class="demo-section">
      <text class="section-title">多行文本</text>
      <view class="demo-block-full">
        <ui-field v-model="value9" label="留言" type="textarea" placeholder="请输入留言" :maxlength="200" autosize />
      </view>
    </view>

    <!-- 输入对齐 -->
    <view class="demo-section">
      <text class="section-title">输入对齐</text>
      <view class="demo-block-full">
        <ui-field v-model="value10" label="左对齐" placeholder="请输入" input-align="left" />
        <ui-field v-model="value11" label="居中" placeholder="请输入" input-align="center" />
        <ui-field v-model="value12" label="右对齐" placeholder="请输入" input-align="right" />
      </view>
    </view>

    <!-- 标签位置 -->
    <view class="demo-section">
      <text class="section-title">标签位置 (顶部)</text>
      <view class="demo-block-full">
        <ui-field v-model="value13" label="详细地址" type="textarea" placeholder="请输入详细地址" label-align="top" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Field 输入域" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("禁用内容")
const value5 = ref("只读内容")
const value6 = ref("")
const value7 = ref("")
const value8 = ref("")
const value9 = ref("")
const value10 = ref("")
const value11 = ref("")
const value12 = ref("")
const value13 = ref("")
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
