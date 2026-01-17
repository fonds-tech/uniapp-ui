<template>
  <demo-page padding="0">
    <ui-navbar title="渐变导航栏" show-back gradient immersive background="#1989fa" title-color="#ffffff" back-icon-color="#ffffff" />
    <view class="content">
      <view class="banner">
        <text class="banner-title">向下滚动查看效果</text>
        <text class="banner-desc">导航栏背景会随滚动渐变</text>
      </view>
      <view class="cards">
        <view v-for="i in 20" :key="i" class="card">
          <text class="card-title">卡片 {{ i }}</text>
          <text class="card-desc">这是一段示例内容，用于填充页面高度</text>
        </view>
      </view>
    </view>
  </demo-page>
</template>

<script setup lang="ts">
definePage({ style: { navigationStyle: "custom", navigationBarTitleText: "渐变导航栏" } })
</script>

<style lang="scss" scoped>
.content {
  min-height: 200vh;
}

.banner {
  height: 300px;
  display: flex;
  padding: 120rpx 32rpx 32rpx;
  background: linear-gradient(180deg, #1989fa 0%, #66b1ff 100%);
  flex-direction: column;
  justify-content: flex-end;
}

.banner-title {
  color: #ffffff;
  font-size: 44rpx;
  font-weight: 700;
}

.banner-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 28rpx;
  margin-top: 16rpx;
}

.cards {
  padding: 32rpx;
}

.card {
  padding: 32rpx;
  background: #ffffff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}

.card-title {
  color: #333;
  display: block;
  font-size: 32rpx;
  font-weight: 600;
}

.card-desc {
  color: #999;
  display: block;
  font-size: 26rpx;
  margin-top: 12rpx;
}
</style>
