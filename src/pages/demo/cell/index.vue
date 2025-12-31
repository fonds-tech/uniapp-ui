<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <ui-cell-group>
        <ui-cell title="单元格" value="内容" />
        <ui-cell title="单元格" value="内容" label="描述信息" />
      </ui-cell-group>
    </view>

    <!-- 显示箭头 -->
    <view class="demo-section">
      <text class="section-title">展示箭头</text>
      <ui-cell-group>
        <ui-cell title="单元格" is-link />
        <ui-cell title="单元格" value="内容" is-link />
        <ui-cell title="单元格" value="内容" is-link arrow-direction="down" />
      </ui-cell-group>
    </view>

    <!-- 带图标 -->
    <view class="demo-section">
      <text class="section-title">带图标</text>
      <ui-cell-group>
        <ui-cell title="单元格" icon="location" />
        <ui-cell title="单元格" icon="phone" value="内容" />
      </ui-cell-group>
    </view>

    <!-- 分组标题 -->
    <view class="demo-section">
      <text class="section-title">分组标题</text>
      <ui-cell-group title="分组1">
        <ui-cell title="单元格" value="内容" />
        <ui-cell title="单元格" value="内容" />
      </ui-cell-group>
      <ui-cell-group title="分组2">
        <ui-cell title="单元格" value="内容" />
        <ui-cell title="单元格" value="内容" />
      </ui-cell-group>
    </view>

    <!-- 垂直居中 -->
    <view class="demo-section">
      <text class="section-title">垂直居中</text>
      <ui-cell-group>
        <ui-cell title="单元格" value="内容" label="描述信息" center />
      </ui-cell-group>
    </view>

    <!-- API 说明 -->
    <view class="api-section">
      <text class="section-title">Cell 属性</text>
      <view class="api-table">
        <view class="api-row api-header">
          <text class="api-cell">属性</text>
          <text class="api-cell">说明</text>
          <text class="api-cell">类型</text>
        </view>
        <view class="api-row">
          <text class="api-cell">title</text>
          <text class="api-cell">左侧标题</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">value</text>
          <text class="api-cell">右侧内容</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">label</text>
          <text class="api-cell">描述信息</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">icon</text>
          <text class="api-cell">左侧图标</text>
          <text class="api-cell">string</text>
        </view>
        <view class="api-row">
          <text class="api-cell">is-link</text>
          <text class="api-cell">是否展示右侧箭头</text>
          <text class="api-cell">boolean</text>
        </view>
        <view class="api-row">
          <text class="api-cell">center</text>
          <text class="api-cell">是否垂直居中</text>
          <text class="api-cell">boolean</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Cell 单元格" },
})

// Cell 演示页面
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 24rpx 32rpx;
  background: #f5f6fa;
  min-height: 100vh;
  padding-bottom: 60rpx;
}

.demo-section {
  margin-bottom: 24rpx;
}

.section-title {
  color: #333;
  display: block;
  padding: 0 8rpx;
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 24rpx;
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
