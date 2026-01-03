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
              <view class="footer-icon-item">
                <ui-icon name="heart" size="40rpx" />
                <text class="footer-icon-text">收藏</text>
              </view>
              <view class="footer-icon-item">
                <ui-icon name="cart" size="40rpx" />
                <text class="footer-icon-text">购物车</text>
              </view>
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

    <!-- 新增：底部偏移 -->
    <demo-section title="底部偏移">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 offset 设置距离底部的偏移量</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentOffset = 0">0</ui-button>
          <ui-button size="small" @click="currentOffset = 50">50rpx</ui-button>
          <ui-button size="small" @click="currentOffset = 100">100rpx</ui-button>
        </demo-block>
        <text class="demo-text">当前偏移: {{ currentOffset }}rpx</text>
        <view class="footer-demo">
          <view class="page-content">
            <text>内容区域</text>
          </view>
          <ui-footer background="#1989fa" :offset="currentOffset">
            <view class="footer-content footer-content--primary">
              <text class="footer-text--white">底部偏移 {{ currentOffset }}rpx</text>
            </view>
          </ui-footer>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：层级设置 -->
    <demo-section title="层级设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 z-index 设置元素层级</text>
        <view class="footer-demo footer-demo--overlay">
          <view class="page-content">
            <text>内容区域</text>
            <view class="mock-overlay">模拟遮罩 z-index: 50</view>
          </view>
          <ui-footer background="#07c160" :z-index="100">
            <view class="footer-content footer-content--success">
              <text class="footer-text--white">z-index: 100</text>
            </view>
          </ui-footer>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：安全区域 -->
    <demo-section title="安全区域">
      <demo-block :cols="2" :gap="24">
        <view class="footer-demo footer-demo--small">
          <view class="page-content page-content--compact">
            <text>开启安全区域</text>
          </view>
          <ui-footer background="#f5f5f5" safe-area-inset-bottom>
            <view class="footer-content">
              <text class="footer-text">有底部安全区</text>
            </view>
          </ui-footer>
        </view>
        <view class="footer-demo footer-demo--small">
          <view class="page-content page-content--compact">
            <text>关闭安全区域</text>
          </view>
          <ui-footer background="#f5f5f5" :safe-area-inset-bottom="false">
            <view class="footer-content">
              <text class="footer-text">无底部安全区</text>
            </view>
          </ui-footer>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ heightLog }}</text>
        <view class="footer-demo">
          <view class="page-content">
            <text>监听 height 事件</text>
          </view>
          <ui-footer background="#ff9500" @height="onFooterHeight" @rect="onFooterRect">
            <view class="footer-content footer-content--warning">
              <text class="footer-text--white">触发高度事件</text>
            </view>
          </ui-footer>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block :cols="2" :gap="24">
        <view class="footer-demo footer-demo--small">
          <view class="page-content page-content--compact">
            <text>自定义类名</text>
          </view>
          <ui-footer custom-class="my-footer">
            <view class="footer-content">
              <text class="footer-text">渐变背景</text>
            </view>
          </ui-footer>
        </view>
        <view class="footer-demo footer-demo--small">
          <view class="page-content page-content--compact">
            <text>自定义样式</text>
          </view>
          <ui-footer
            :custom-style="{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '24rpx 24rpx 0 0',
            }"
          >
            <view class="footer-content">
              <text class="footer-text--white">圆角渐变</text>
            </view>
          </ui-footer>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：不同场景 -->
    <demo-section title="应用场景">
      <demo-block direction="column" :gap="24">
        <!-- 单按钮场景 -->
        <view class="footer-demo">
          <view class="page-content">
            <text>提交页面</text>
          </view>
          <ui-footer background="#fff">
            <view class="footer-submit">
              <ui-button type="primary" block>提交订单</ui-button>
            </view>
          </ui-footer>
        </view>

        <!-- 双按钮场景 -->
        <view class="footer-demo">
          <view class="page-content">
            <text>确认页面</text>
          </view>
          <ui-footer background="#fff">
            <view class="footer-double">
              <ui-button type="default" class="footer-double__btn">取消</ui-button>
              <ui-button type="primary" class="footer-double__btn">确认</ui-button>
            </view>
          </ui-footer>
        </view>

        <!-- 价格+按钮场景 -->
        <view class="footer-demo">
          <view class="page-content">
            <text>结算页面</text>
          </view>
          <ui-footer background="#fff">
            <view class="footer-checkout">
              <view class="footer-checkout__info">
                <text class="footer-checkout__label">合计:</text>
                <text class="footer-checkout__price">¥199.00</text>
              </view>
              <ui-button type="primary" size="small">去结算</ui-button>
            </view>
          </ui-footer>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 -->
    <demo-section title="综合示例">
      <demo-block class="footer-demo footer-demo--large">
        <view class="page-content">
          <text>商品详情页</text>
        </view>
        <ui-footer
          background="#fff"
          :z-index="99"
          custom-class="complex-footer"
          :custom-style="{ boxShadow: '0 -4rpx 16rpx rgba(0,0,0,0.08)' }"
          @height="onComplexHeight"
        >
          <view class="footer-complex">
            <view class="footer-complex__left">
              <view class="footer-complex__item" @click="onServiceClick">
                <ui-icon name="chat" size="40rpx" color="#666" />
                <text class="footer-complex__text">客服</text>
              </view>
              <view class="footer-complex__item" @click="onFavoriteClick">
                <ui-icon :name="isFavorite ? 'heart-fill' : 'heart'" size="40rpx" :color="isFavorite ? '#ee0a24' : '#666'" />
                <text class="footer-complex__text">{{ isFavorite ? '已收藏' : '收藏' }}</text>
              </view>
              <view class="footer-complex__item" @click="onCartClick">
                <ui-icon name="cart" size="40rpx" color="#666" />
                <text class="footer-complex__text">购物车</text>
                <view v-if="cartCount > 0" class="footer-complex__badge">{{ cartCount }}</view>
              </view>
            </view>
            <view class="footer-complex__right">
              <ui-button type="warning" size="small" @click="onAddCart">加入购物车</ui-button>
              <ui-button type="primary" size="small" @click="onBuyNow">立即购买</ui-button>
            </view>
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
        <text class="tip-text">5. 通过 offset 可调整距离底部的距离</text>
        <text class="tip-text">6. height 和 rect 事件可获取页脚尺寸信息</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Footer 页脚" },
})

const toast = useToast()

// 底部偏移
const currentOffset = ref(0)

// 事件日志
const heightLog = ref("等待 height 事件触发...")

// 综合示例状态
const isFavorite = ref(false)
const cartCount = ref(2)

// 事件处理
function onFooterHeight(height: number) {
  heightLog.value = `触发 height 事件，高度: ${height}px`
}

function onFooterRect(rect: UniApp.NodeInfo) {
  console.log("Footer rect:", rect)
}

function onComplexHeight(height: number) {
  console.log("Complex footer height:", height)
}

// 综合示例交互
function onServiceClick() {
  toast.text("联系客服")
}

function onFavoriteClick() {
  isFavorite.value = !isFavorite.value
  toast.success(isFavorite.value ? "已收藏" : "已取消收藏")
}

function onCartClick() {
  toast.text("查看购物车")
}

function onAddCart() {
  cartCount.value++
  toast.success("已加入购物车")
}

function onBuyNow() {
  toast.success("立即购买")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.footer-demo {
  height: 400rpx;
  display: flex;
  overflow: hidden;
  position: relative;
  background: var(--ui-color-background-light);
  border-radius: 12rpx;
  flex-direction: column;

  &--small {
    height: 280rpx;
  }

  &--large {
    height: 480rpx;
  }

  &--overlay {
    .mock-overlay {
      left: 0;
      color: #fff;
      right: 0;
      bottom: 0;
      height: 120rpx;
      display: flex;
      z-index: 50;
      position: absolute;
      font-size: 24rpx;
      background: rgba(0, 0, 0, 0.5);
      align-items: center;
      justify-content: center;
    }
  }

  :deep(.ui-footer) {
    position: relative !important;
  }
}

.page-content {
  flex: 1;
  color: var(--ui-color-text-secondary);
  padding: 32rpx;
  position: relative;

  &--compact {
    padding: 16rpx;
  }
}

.footer-content {
  padding: 24rpx 32rpx;
  text-align: center;

  &--primary {
    background: #1989fa;
  }

  &--success {
    background: #07c160;
  }

  &--warning {
    background: #ff9500;
  }
}

.footer-text {
  color: var(--ui-color-text-secondary);
  font-size: 28rpx;

  &--white {
    color: #fff;
    font-size: 28rpx;
  }
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

.footer-icon-item {
  gap: 4rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.footer-icon-text {
  color: #666;
  font-size: 20rpx;
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

.footer-submit {
  padding: 16rpx 32rpx;
}

.footer-double {
  gap: 24rpx;
  display: flex;
  padding: 16rpx 32rpx;

  &__btn {
    flex: 1;
  }
}

.footer-checkout {
  display: flex;
  padding: 16rpx 32rpx;
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: center;
  justify-content: space-between;

  &__info {
    gap: 8rpx;
    display: flex;
    align-items: baseline;
  }

  &__label {
    color: var(--ui-color-text-main);
    font-size: 26rpx;
  }

  &__price {
    color: #ee0a24;
    font-size: 36rpx;
    font-weight: 600;
  }
}

.footer-complex {
  display: flex;
  padding: 16rpx 32rpx;
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: center;
  justify-content: space-between;

  &__left {
    gap: 32rpx;
    display: flex;
  }

  &__item {
    gap: 4rpx;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
  }

  &__text {
    color: #666;
    font-size: 20rpx;
  }

  &__badge {
    top: -8rpx;
    color: #fff;
    right: -16rpx;
    height: 28rpx;
    display: flex;
    padding: 0 6rpx;
    position: absolute;
    font-size: 18rpx;
    min-width: 28rpx;
    background: #ee0a24;
    align-items: center;
    border-radius: 28rpx;
    justify-content: center;
  }

  &__right {
    gap: 16rpx;
    display: flex;
  }
}

:deep(.my-footer) {
  background: linear-gradient(90deg, #1989fa 0%, #07c160 100%);
}

:deep(.complex-footer) {
  border-radius: 16rpx 16rpx 0 0;
}
</style>
