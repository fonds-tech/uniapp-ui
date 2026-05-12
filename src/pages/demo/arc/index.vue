<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block class="arc-demo">
        <ui-arc background="primary" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义高度">
      <demo-block class="arc-demo">
        <ui-arc height="200rpx" background="success" />
      </demo-block>
    </demo-section>

    <demo-section title="曲率控制">
      <demo-block direction="column" :gap="20">
        <view class="arc-item">
          <text class="arc-label">陡峭 (curvature: 80)</text>
          <view class="arc-demo arc-demo--small">
            <ui-arc height="100rpx" :curvature="80" background="primary" />
          </view>
        </view>
        <view class="arc-item">
          <text class="arc-label">标准 (curvature: 120)</text>
          <view class="arc-demo arc-demo--small">
            <ui-arc height="100rpx" :curvature="120" background="success" />
          </view>
        </view>
        <view class="arc-item">
          <text class="arc-label">平缓 (curvature: 200)</text>
          <view class="arc-demo arc-demo--small">
            <ui-arc height="100rpx" :curvature="200" background="warning" />
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="弧形方向">
      <demo-block direction="column" :gap="20">
        <view class="arc-item">
          <text class="arc-label">底部弧形 (direction: bottom)</text>
          <view class="arc-demo arc-demo--small">
            <ui-arc height="100rpx" direction="bottom" background="primary" />
          </view>
        </view>
        <view class="arc-item">
          <text class="arc-label">顶部弧形 (direction: top)</text>
          <view class="arc-demo arc-demo--small arc-demo--top">
            <ui-arc height="100rpx" direction="top" background="danger" />
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
  width: 100%;
  height: 200rpx;
  overflow: hidden;
  position: relative;
  border-radius: var(--ui-radius-sm);

  &--small {
    height: 120rpx;
  }

  &--top {
    display: flex;
    align-items: flex-end;
  }
}

.arc-item {
  gap: var(--ui-spacing-sm);
  width: 100%;
  display: flex;
  flex-direction: column;
}

.arc-label {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-sm);
}

.arc-combined,
.arc-header-demo {
  overflow: hidden;
  border-radius: var(--ui-radius-sm);
}

.arc-content {
  display: flex;
  text-align: center;
  padding-top: var(--ui-spacing-xl);
  flex-direction: column;
}

.arc-title {
  color: var(--ui-color-text-inverse);
  font-size: var(--ui-font-size-lg);
  font-weight: var(--ui-font-weight-normal);
}

.arc-desc {
  color: var(--ui-color-text-inverse);
  opacity: var(--ui-opacity-heavy);
  font-size: var(--ui-font-size-sm);
  margin-top: var(--ui-spacing-xs);
}

.header-content {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-lg) var(--ui-spacing-md);
  align-items: center;
}

.header-avatar {
  color: var(--ui-color-text-inverse);
  width: var(--ui-size-lg);
  height: var(--ui-size-lg);
  display: flex;
  font-size: var(--ui-font-size-lg);
  background: rgba(255, 255, 255, 0.2);
  align-items: center;
  font-weight: var(--ui-font-weight-normal);
  border-radius: var(--ui-radius-round);
  justify-content: center;
}

.header-info {
  gap: var(--ui-spacing-xxs);
  display: flex;
  flex-direction: column;
}

.header-name {
  color: var(--ui-color-text-inverse);
  font-size: var(--ui-font-size-md);
  font-weight: var(--ui-font-weight-normal);
}

.header-bio {
  color: var(--ui-color-text-inverse);
  opacity: var(--ui-opacity-heavy);
  font-size: var(--ui-font-size-sm);
}
</style>
