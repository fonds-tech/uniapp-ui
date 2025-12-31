<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block qrcode-center">
        <ui-qrcode value="https://example.com" />
      </view>
    </view>

    <!-- 自定义大小 -->
    <view class="demo-section">
      <text class="section-title">自定义大小</text>
      <view class="demo-block qrcode-center">
        <ui-qrcode value="https://example.com" size="300rpx" />
      </view>
    </view>

    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="section-title">自定义颜色</text>
      <view class="demo-block qrcode-row">
        <ui-qrcode value="https://example.com" size="160rpx" foreground="#ff4757" />
        <ui-qrcode value="https://example.com" size="160rpx" foreground="#2ed573" />
        <ui-qrcode value="https://example.com" size="160rpx" foreground="#1e90ff" />
      </view>
    </view>

    <!-- 带Logo -->
    <view class="demo-section">
      <text class="section-title">带Logo</text>
      <view class="demo-block qrcode-center">
        <ui-qrcode value="https://example.com" size="250rpx" icon="https://picsum.photos/60" icon-size="60rpx" />
      </view>
    </view>

    <!-- 条形码 -->
    <view class="demo-section">
      <text class="section-title">条形码</text>
      <view class="demo-block qrcode-center">
        <ui-qrcode type="barcode" value="1234567890" barcode-width="500rpx" barcode-height="120rpx" />
      </view>
    </view>

    <!-- 动态生成 -->
    <view class="demo-section">
      <text class="section-title">动态生成</text>
      <view class="demo-block">
        <ui-input v-model="inputValue" placeholder="输入内容生成二维码" />
      </view>
      <view class="demo-block qrcode-center">
        <ui-qrcode :value="inputValue || 'Hello World'" size="200rpx" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "QRCode 二维码" },
})

const inputValue = ref("")
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.qrcode-center {
  display: flex;
  justify-content: center;
}

.qrcode-row {
  display: flex;
  gap: 24rpx;
  justify-content: center;
}
</style>
