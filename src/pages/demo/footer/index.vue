<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <text class="section-desc">Footer 组件用于固定在页面底部</text>
    </view>

    <view class="demo-section">
      <text class="section-title">效果演示</text>
      <view class="demo-block footer-demo">
        <view class="page-content">
          <text>页面内容区域</text>
        </view>
        <ui-footer background="#f5f5f5">
          <view class="footer-content">
            <text class="footer-text">页脚内容</text>
          </view>
        </ui-footer>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="demo-section">
      <text class="section-title">操作按钮</text>
      <view class="demo-block footer-demo">
        <view class="page-content">
          <text>商品详情页面</text>
        </view>
        <ui-footer background="#fff">
          <view class="footer-bar">
            <view class="footer-icons">
              <ui-icon-text name="heart" text="收藏" size="40rpx" />
              <ui-icon-text name="cart" text="购物车" size="40rpx" />
            </view>
            <view class="footer-buttons">
              <ui-button type="warning" size="small">加入购物车</ui-button>
              <ui-button type="primary" size="small">立即购买</ui-button>
            </view>
          </view>
        </ui-footer>
      </view>
    </view>

    <!-- 版权信息 -->
    <view class="demo-section">
      <text class="section-title">版权信息</text>
      <view class="demo-block footer-demo">
        <view class="page-content">
          <text>关于我们页面</text>
        </view>
        <ui-footer background="transparent">
          <view class="footer-copyright">
            <text class="copyright-text">Copyright © 2024 UniApp UI</text>
            <text class="copyright-text">基于 MIT 许可发布</text>
          </view>
        </ui-footer>
      </view>
    </view>

    <!-- 使用说明 -->
    <view class="demo-section">
      <text class="section-title">使用说明</text>
      <view class="demo-block">
        <text class="tip-text">1. Footer 组件默认固定在页面底部</text>
        <text class="tip-text">2. 支持自定义背景色</text>
        <text class="tip-text">3. 默认开启底部安全区域适配</text>
        <text class="tip-text">4. 可用于操作栏、版权信息等场景</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Footer 页脚" },
})

// Footer demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.section-desc {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 8rpx;
}

.footer-demo {
  height: 400rpx;
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 12rpx;
  flex-direction: column;
  background: var(--ui-color-background-light);

  .ui-footer {
    position: relative !important;
  }
}

.page-content {
  flex: 1;
  padding: 32rpx;
  color: var(--ui-color-text-secondary);
}

.footer-content {
  padding: 24rpx 32rpx;
  text-align: center;
}

.footer-text {
  font-size: 28rpx;
  color: var(--ui-color-text-secondary);
}

.footer-bar {
  display: flex;
  align-items: center;
  padding: 16rpx 32rpx;
  justify-content: space-between;
  border-top: 1rpx solid var(--ui-color-border-light);
}

.footer-icons {
  display: flex;
  gap: 40rpx;
}

.footer-buttons {
  display: flex;
  gap: 16rpx;
}

.footer-copyright {
  padding: 24rpx;
  text-align: center;
}

.copyright-text {
  display: block;
  font-size: 24rpx;
  line-height: 1.6;
  color: var(--ui-color-text-tertiary);
}

.tip-text {
  display: block;
  font-size: 26rpx;
  line-height: 1.8;
  color: var(--ui-color-text-secondary);
}
</style>
