<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block arc-demo">
        <ui-arc background="#ff4757" />
      </view>
    </view>

    <!-- 自定义高度 -->
    <view class="demo-section">
      <text class="section-title">自定义高度</text>
      <view class="demo-block arc-demo">
        <ui-arc height="200rpx" background="#2ed573" />
      </view>
    </view>

    <!-- 自定义圆弧 -->
    <view class="demo-section">
      <text class="section-title">自定义圆弧弧度</text>
      <view class="demo-block arc-demo">
        <ui-arc height="150rpx" :percent="80" background="#1e90ff" />
      </view>
    </view>

    <!-- 渐变色 -->
    <view class="demo-section">
      <text class="section-title">渐变背景</text>
      <view class="demo-block arc-demo">
        <ui-arc height="180rpx" background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
      </view>
    </view>

    <!-- 组合使用 -->
    <view class="demo-section">
      <text class="section-title">组合使用</text>
      <view class="demo-block arc-combined">
        <ui-arc height="200rpx" :fixed="false" background="#ff6b6b">
          <view class="arc-content">
            <text class="arc-title">圆弧装饰</text>
            <text class="arc-desc">可用于页面顶部装饰</text>
          </view>
        </ui-arc>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Arc 圆弧进度" },
})

// Arc demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.arc-demo {
  height: 300rpx;
  overflow: hidden;
  position: relative;
  border-radius: 12rpx;
}

.arc-combined {
  overflow: hidden;
  border-radius: 12rpx;
}

.arc-content {
  display: flex;
  text-align: center;
  padding-top: 40rpx;
  flex-direction: column;
}

.arc-title {
  color: #fff;
  font-size: 36rpx;
  font-weight: 600;
}

.arc-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 26rpx;
  margin-top: 12rpx;
}
</style>
