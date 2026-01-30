<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block class="arc-demo">
        <ui-arc background="#1989fa" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义高度">
      <demo-block class="arc-demo">
        <ui-arc height="200rpx" background="#07c160" />
      </demo-block>
    </demo-section>

    <demo-section title="曲率控制">
      <demo-block direction="column" :gap="20">
        <view class="arc-item">
          <text class="arc-label">陡峭 (curvature: 80)</text>
          <view class="arc-demo arc-demo--small">
            <ui-arc height="100rpx" :curvature="80" background="#1989fa" />
          </view>
        </view>
        <view class="arc-item">
          <text class="arc-label">标准 (curvature: 120)</text>
          <view class="arc-demo arc-demo--small">
            <ui-arc height="100rpx" :curvature="120" background="#07c160" />
          </view>
        </view>
        <view class="arc-item">
          <text class="arc-label">平缓 (curvature: 200)</text>
          <view class="arc-demo arc-demo--small">
            <ui-arc height="100rpx" :curvature="200" background="#ff976a" />
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="弧形方向">
      <demo-block direction="column" :gap="20">
        <view class="arc-item">
          <text class="arc-label">底部弧形 (direction: bottom)</text>
          <view class="arc-demo arc-demo--small">
            <ui-arc height="100rpx" direction="bottom" background="#1989fa" />
          </view>
        </view>
        <view class="arc-item">
          <text class="arc-label">顶部弧形 (direction: top)</text>
          <view class="arc-demo arc-demo--small arc-demo--top">
            <ui-arc height="100rpx" direction="top" background="#ee0a24" />
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="渐变背景">
      <demo-block class="arc-demo">
        <ui-arc height="180rpx" background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
      </demo-block>
    </demo-section>

    <demo-section title="内容嵌套">
      <demo-block class="arc-combined">
        <ui-arc height="200rpx" background="linear-gradient(135deg, #ee0a24 0%, #ff6b6b 100%)">
          <view class="arc-content">
            <text class="arc-title">圆弧装饰</text>
            <text class="arc-desc">支持内容嵌套，可用于页面头部</text>
          </view>
        </ui-arc>
      </demo-block>
    </demo-section>

    <demo-section title="页面头部示例">
      <demo-block class="arc-header-demo">
        <ui-arc height="240rpx" :curvature="150" background="linear-gradient(135deg, #1890ff 0%, #096dd9 100%)">
          <view class="header-content">
            <view class="header-avatar">头</view>
            <view class="header-info">
              <text class="header-name">用户昵称</text>
              <text class="header-bio">这是一段个性签名</text>
            </view>
          </view>
        </ui-arc>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Arc 圆弧" },
})
</script>

<style lang="scss" scoped>
.arc-demo {
  height: 200rpx;
  overflow: hidden;
  position: relative;
  border-radius: 12rpx;

  &--small {
    height: 120rpx;
  }

  &--top {
    display: flex;
    align-items: flex-end;
  }
}

.arc-item {
  gap: 12rpx;
  display: flex;
  flex-direction: column;
}

.arc-label {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
}

.arc-combined,
.arc-header-demo {
  overflow: hidden;
  border-radius: 12rpx;
}

.arc-content {
  display: flex;
  text-align: center;
  padding-top: 50rpx;
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

.header-content {
  gap: 24rpx;
  display: flex;
  padding: 40rpx 32rpx;
  align-items: center;
}

.header-avatar {
  color: #fff;
  width: 100rpx;
  height: 100rpx;
  display: flex;
  font-size: 36rpx;
  background: rgba(255, 255, 255, 0.2);
  align-items: center;
  font-weight: 600;
  border-radius: 50%;
  justify-content: center;
}

.header-info {
  gap: 8rpx;
  display: flex;
  flex-direction: column;
}

.header-name {
  color: #fff;
  font-size: 34rpx;
  font-weight: 600;
}

.header-bio {
  color: rgba(255, 255, 255, 0.8);
  font-size: 26rpx;
}
</style>
