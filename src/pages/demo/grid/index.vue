<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-row>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="不同比例">
      <demo-block direction="column">
        <ui-row>
          <ui-col :span="4">
            <view class="grid-item dark">span: 4</view>
          </ui-col>
          <ui-col :span="20">
            <view class="grid-item light">span: 20</view>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="6">
            <view class="grid-item dark">span: 6</view>
          </ui-col>
          <ui-col :span="18">
            <view class="grid-item light">span: 18</view>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="12">
            <view class="grid-item dark">span: 12</view>
          </ui-col>
          <ui-col :span="12">
            <view class="grid-item light">span: 12</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="列间距">
      <demo-block direction="column">
        <ui-row gutter="20rpx">
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="列偏移">
      <demo-block direction="column">
        <ui-row>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8" :offset="8">
            <view class="grid-item dark">offset: 8</view>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="6" :offset="6">
            <view class="grid-item dark">offset: 6</view>
          </ui-col>
          <ui-col :span="6" :offset="6">
            <view class="grid-item dark">offset: 6</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="对齐方式">
      <demo-block direction="column">
        <ui-row justify="center">
          <ui-col :span="6">
            <view class="grid-item dark">居中</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">居中</view>
          </ui-col>
        </ui-row>
        <ui-row justify="end">
          <ui-col :span="6">
            <view class="grid-item dark">右对齐</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">右对齐</view>
          </ui-col>
        </ui-row>
        <ui-row justify="space-between">
          <ui-col :span="6">
            <view class="grid-item dark">两端对齐</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">两端对齐</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Row/Col 栅格" },
})
</script>

<style lang="scss" scoped>
.grid-item {
  height: 60rpx;
  display: flex;
  font-size: 24rpx;
  align-items: center;
  border-radius: 8rpx;
  justify-content: center;

  &.dark {
    color: #fff;
    background: var(--ui-color-primary);
  }

  &.light {
    color: var(--ui-color-primary);
    background: rgba(25, 137, 250, 0.2);
  }
}

:deep(.ui-row + .ui-row) {
  margin-top: 16rpx;
}
</style>
