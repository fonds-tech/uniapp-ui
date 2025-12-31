<template>
  <demo-page>
    <demo-section title="基础用法" desc="Footer 组件用于固定在页面底部" />

    <demo-section title="效果演示">
      <demo-block class="footer-demo">
        <view class="page-content">
          <text>页面内容区域</text>
        </view>
        <ui-footer background="#f5f5f5">
          <view class="footer-content">
            <text class="footer-text">页脚内容</text>
          </view>
        </ui-footer>
      </demo-block>
    </demo-section>

    <demo-section title="操作按钮">
      <demo-block class="footer-demo">
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
      </demo-block>
    </demo-section>

    <demo-section title="版权信息">
      <demo-block class="footer-demo">
        <view class="page-content">
          <text>关于我们页面</text>
        </view>
        <ui-footer background="transparent">
          <view class="footer-copyright">
            <text class="copyright-text">Copyright © 2024 UniApp UI</text>
            <text class="copyright-text">基于 MIT 许可发布</text>
          </view>
        </ui-footer>
      </demo-block>
    </demo-section>

    <demo-section title="使用说明">
      <demo-block direction="column" align="start">
        <text class="tip-text">1. Footer 组件默认固定在页面底部</text>
        <text class="tip-text">2. 支持自定义背景色</text>
        <text class="tip-text">3. 默认开启底部安全区域适配</text>
        <text class="tip-text">4. 可用于操作栏、版权信息等场景</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Footer 页脚" },
})
</script>

<style lang="scss" scoped>
.footer-demo {
  height: 400rpx;
  display: flex;
  overflow: hidden;
  position: relative;
  background: var(--ui-color-background-light);
  border-radius: 12rpx;
  flex-direction: column;

  :deep(.ui-footer) {
    position: relative !important;
  }
}

.page-content {
  flex: 1;
  color: var(--ui-color-text-secondary);
  padding: 32rpx;
}

.footer-content {
  padding: 24rpx 32rpx;
  text-align: center;
}

.footer-text {
  color: var(--ui-color-text-secondary);
  font-size: 28rpx;
}

.footer-bar {
  display: flex;
  padding: 16rpx 32rpx;
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: center;
  justify-content: space-between;
}

.footer-icons {
  gap: 40rpx;
  display: flex;
}

.footer-buttons {
  gap: 16rpx;
  display: flex;
}

.footer-copyright {
  padding: 24rpx;
  text-align: center;
}

.copyright-text {
  color: var(--ui-color-text-tertiary);
  display: block;
  font-size: 24rpx;
  line-height: 1.6;
}

.tip-text {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
  line-height: 1.8;
}
</style>
