<template>
  <view class="demo-footer">
    <!-- 上半部分：预览区 -->
    <view class="preview-area">
      <view class="preview-box">
        <!-- 模拟内容区 -->
        <view class="preview-content">
          <view class="preview-content__placeholder">
            <text>页面内容区域</text>
          </view>
        </view>

        <!-- 场景1: 商品详情栏 -->
        <view v-if="currentScene === 0" class="preview-footer" style="background: #fff">
          <view class="footer-product">
            <view class="footer-product__left">
              <view class="footer-product__item" @click="onServiceClick">
                <ui-icon name="message" size="36rpx" color="#666" />
                <text class="footer-product__text">客服</text>
              </view>
              <view class="footer-product__item" @click="toggleFavorite">
                <ui-icon :name="isFavorite ? 'heart-fill' : 'heart'" size="36rpx" :color="isFavorite ? '#ee0a24' : '#666'" />
                <text class="footer-product__text">{{ isFavorite ? "已收藏" : "收藏" }}</text>
              </view>
              <view class="footer-product__item">
                <ui-icon name="shopping" size="36rpx" color="#666" />
                <text class="footer-product__text">购物车</text>
                <view class="footer-product__badge">{{ cartCount }}</view>
              </view>
            </view>
            <view class="footer-product__right">
              <view class="footer-product__btn footer-product__btn--warning" @click="onAddCart">加入购物车</view>
              <view class="footer-product__btn footer-product__btn--primary">立即购买</view>
            </view>
          </view>
        </view>

        <!-- 场景2: 购物车结算 -->
        <view v-else-if="currentScene === 1" class="preview-footer" style="background: #fff">
          <view class="footer-cart">
            <view class="footer-cart__left" @click="isAllChecked = !isAllChecked">
              <ui-icon :name="isAllChecked ? 'check-circle-fill' : 'check-circle'" size="40rpx" :color="isAllChecked ? '#1989fa' : '#ccc'" />
              <text class="footer-cart__text">全选</text>
            </view>
            <view class="footer-cart__right">
              <view class="footer-cart__price">
                <text class="footer-cart__label">合计：</text>
                <text class="footer-cart__amount">¥{{ totalPrice.toFixed(2) }}</text>
              </view>
              <view class="footer-cart__btn">结算({{ cartItems }})</view>
            </view>
          </view>
        </view>

        <!-- 场景3: 评论输入 -->
        <view v-else-if="currentScene === 2" class="preview-footer" style="background: #fff">
          <view class="footer-input">
            <view class="footer-input__box">
              <input v-model="inputText" class="footer-input__field" placeholder="说点什么..." />
            </view>
            <view class="footer-input__actions">
              <ui-icon name="image" size="40rpx" color="#666" />
              <ui-icon name="smile" size="40rpx" color="#666" />
              <view v-if="inputText" class="footer-input__send" @click="onSend">发送</view>
            </view>
          </view>
        </view>

        <!-- 场景4: 表单提交 -->
        <view v-else-if="currentScene === 3" class="preview-footer" style="background: #fff">
          <view class="footer-form">
            <view class="footer-form__btn footer-form__btn--default">取消</view>
            <view class="footer-form__btn footer-form__btn--primary">提交</view>
          </view>
        </view>

        <!-- 场景5: 版权信息 -->
        <view v-else-if="currentScene === 4" class="preview-footer" style="background: #f8f9fa">
          <view class="footer-copyright">
            <view class="footer-copyright__links">
              <text class="footer-copyright__link">关于我们</text>
              <text class="footer-copyright__divider">|</text>
              <text class="footer-copyright__link">联系我们</text>
              <text class="footer-copyright__divider">|</text>
              <text class="footer-copyright__link">隐私政策</text>
            </view>
            <text class="footer-copyright__text">Copyright © 2024 UniApp UI</text>
          </view>
        </view>

        <!-- 场景6: 快捷导航 -->
        <view v-else-if="currentScene === 5" class="preview-footer" style="background: #fff">
          <view class="footer-nav">
            <view v-for="(item, index) in navItems" :key="item.icon" class="footer-nav__item" :class="{ active: activeNav === index }" @click="activeNav = index">
              <ui-icon :name="activeNav === index ? item.activeIcon : item.icon" size="40rpx" :color="activeNav === index ? '#1989fa' : '#999'" />
              <text class="footer-nav__text" :class="{ active: activeNav === index }">{{ item.text }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 下半部分：场景列表 -->
    <scroll-view scroll-y class="scene-list">
      <view class="scene-list__header">
        <text class="scene-list__title">选择场景</text>
        <text class="scene-list__subtitle">点击切换上方预览效果</text>
      </view>

      <view class="scene-list__grid">
        <view v-for="(scene, index) in scenes" :key="scene.title" class="scene-item" :class="{ active: currentScene === index }" @click="currentScene = index">
          <view class="scene-item__icon" :style="{ background: scene.color }">
            <ui-icon :name="scene.icon" size="36rpx" color="#fff" />
          </view>
          <text class="scene-item__title">{{ scene.title }}</text>
        </view>
      </view>

      <view class="scene-info">
        <text class="scene-info__title">{{ scenes[currentScene].title }}</text>
        <text class="scene-info__desc">{{ scenes[currentScene].desc }}</text>
        <view class="scene-info__props">
          <text class="scene-info__label">常用属性：</text>
          <view class="scene-info__tags">
            <text v-for="prop in scenes[currentScene].props" :key="prop" class="scene-info__tag">{{ prop }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- Toast -->
    <ui-toast ref="toast" />
  </view>
</template>

<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: "Footer 页脚",
  },
})

const toast = ref()
const currentScene = ref(0)

// 场景配置
const scenes = [
  {
    title: "商品详情栏",
    desc: "包含客服、收藏、购物车图标，加入购物车和立即购买按钮，适用于商品详情页。",
    icon: "shop",
    color: "#1989fa",
    props: ["background", "safe-area-inset-bottom"],
  },
  {
    title: "购物车结算",
    desc: "全选按钮、合计金额和结算按钮，适用于购物车页面底部。",
    icon: "shopping",
    color: "#07c160",
    props: ["background", "z-index"],
  },
  {
    title: "评论输入栏",
    desc: "带输入框、表情和图片按钮的底部输入栏，适用于评论或聊天页面。",
    icon: "message",
    color: "#ff976a",
    props: ["background", "offset"],
  },
  {
    title: "表单提交栏",
    desc: "取消和提交双按钮布局，适用于表单填写页面底部。",
    icon: "check-square",
    color: "#722ed1",
    props: ["background", "custom-style"],
  },
  {
    title: "版权信息栏",
    desc: "快捷链接和版权声明，适用于关于页面或设置页面底部。",
    icon: "info-circle",
    color: "#eb2f96",
    props: ["background", "safe-area-inset-bottom"],
  },
  {
    title: "快捷导航栏",
    desc: "类似 Tabbar 的快捷操作入口，适用于需要固定底部导航的页面。",
    icon: "appstore",
    color: "#fa8c16",
    props: ["background", "z-index"],
  },
]

// 场景1: 商品详情
const isFavorite = ref(false)
const cartCount = ref(2)

function toggleFavorite() {
  isFavorite.value = !isFavorite.value
  toast.value?.success(isFavorite.value ? "已收藏" : "已取消收藏")
}

function onServiceClick() {
  toast.value?.text("联系客服")
}

function onAddCart() {
  cartCount.value++
  toast.value?.success("已加入购物车")
}

// 场景2: 购物车
const isAllChecked = ref(true)
const totalPrice = ref(299.0)
const cartItems = ref(3)

// 场景3: 评论输入
const inputText = ref("")

function onSend() {
  if (inputText.value) {
    toast.value?.success("发送成功")
    inputText.value = ""
  }
}

// 场景6: 快捷导航
const activeNav = ref(0)
const navItems = [
  { icon: "home", activeIcon: "home", text: "首页" },
  { icon: "compass", activeIcon: "compass", text: "发现" },
  { icon: "plus-circle", activeIcon: "plus-circle", text: "发布" },
  { icon: "bell", activeIcon: "bell", text: "消息" },
  { icon: "user", activeIcon: "user", text: "我的" },
]
</script>

<style lang="scss" scoped>
.demo-footer {
  height: 100vh;
  display: flex;
  background: #f5f7fa;
  flex-direction: column;
}

// 上半部分：预览区
.preview-area {
  padding: 24rpx;
  background: linear-gradient(180deg, #e8ecf3 0%, #f5f7fa 100%);
  flex-shrink: 0;
}

.preview-box {
  display: flex;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.12);
  border-radius: 32rpx;
  flex-direction: column;
}

.preview-content {
  height: 340rpx;
  background: #f8f9fa;

  &__placeholder {
    color: #ccc;
    height: 100%;
    display: flex;
    font-size: 28rpx;
    align-items: center;
    justify-content: center;
  }
}

.preview-footer {
  border-top: 1rpx solid #f0f0f0;
  transition: all 0.3s ease;
}

// 下半部分：场景列表
.scene-list {
  flex: 1;
  overflow-x: hidden;

  &__header {
    padding: 24rpx 24rpx 0;
    margin-bottom: 24rpx;
  }

  &__title {
    color: #1a1a1a;
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 8rpx;
  }

  &__subtitle {
    color: #999;
    font-size: 24rpx;
  }

  &__grid {
    gap: 20rpx;
    display: grid;
    padding: 0 24rpx;
    margin-bottom: 32rpx;
    grid-template-columns: repeat(3, 1fr);
  }
}

.scene-item {
  border: 2rpx solid transparent;
  display: flex;
  padding: 24rpx 16rpx;
  background: #fff;
  transition: all 0.2s;
  align-items: center;
  border-radius: 20rpx;
  flex-direction: column;

  &.active {
    background: #f0f9ff;
    border-color: #1989fa;
  }

  &__icon {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    border-radius: 20rpx;
    margin-bottom: 12rpx;
    justify-content: center;
  }

  &__title {
    color: #666;
    font-size: 22rpx;
    text-align: center;
  }
}

.scene-info {
  margin: 0 24rpx 24rpx;
  padding: 28rpx;
  background: #fff;
  border-radius: 20rpx;

  &__title {
    color: #333;
    display: block;
    font-size: 30rpx;
    font-weight: 600;
    margin-bottom: 12rpx;
  }

  &__desc {
    color: #666;
    display: block;
    font-size: 26rpx;
    line-height: 1.6;
    margin-bottom: 20rpx;
  }

  &__label {
    color: #999;
    font-size: 24rpx;
    margin-right: 12rpx;
  }

  &__props {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__tags {
    gap: 12rpx;
    display: flex;
    flex-wrap: wrap;
  }

  &__tag {
    color: #1989fa;
    padding: 6rpx 16rpx;
    font-size: 22rpx;
    background: #e6f4ff;
    border-radius: 8rpx;
  }
}

// Footer 场景样式
.footer-product {
  display: flex;
  padding: 16rpx 24rpx;
  align-items: center;
  justify-content: space-between;

  &__left {
    gap: 28rpx;
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
    border-radius: 14rpx;
    justify-content: center;
  }

  &__right {
    gap: 16rpx;
    display: flex;
  }

  &__btn {
    padding: 16rpx 28rpx;
    font-size: 26rpx;
    font-weight: 500;
    border-radius: 32rpx;

    &--warning {
      color: #fff;
      background: linear-gradient(135deg, #ffa940 0%, #ff7a00 100%);
    }

    &--primary {
      color: #fff;
      background: linear-gradient(135deg, #ff6b6b 0%, #ee0a24 100%);
    }
  }
}

.footer-cart {
  display: flex;
  padding: 16rpx 24rpx;
  align-items: center;
  justify-content: space-between;

  &__left {
    gap: 12rpx;
    display: flex;
    align-items: center;
  }

  &__text {
    color: #333;
    font-size: 26rpx;
  }

  &__right {
    gap: 20rpx;
    display: flex;
    align-items: center;
  }

  &__price {
    text-align: right;
  }

  &__label {
    color: #666;
    font-size: 24rpx;
  }

  &__amount {
    color: #ee0a24;
    font-size: 36rpx;
    font-weight: 600;
  }

  &__btn {
    color: #fff;
    padding: 16rpx 36rpx;
    font-size: 26rpx;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee0a24 100%);
    font-weight: 500;
    border-radius: 32rpx;
  }
}

.footer-input {
  gap: 20rpx;
  display: flex;
  padding: 16rpx 24rpx;
  align-items: center;

  &__box {
    flex: 1;
    height: 64rpx;
    display: flex;
    padding: 0 24rpx;
    background: #f5f7fa;
    align-items: center;
    border-radius: 32rpx;
  }

  &__field {
    flex: 1;
    color: #333;
    font-size: 26rpx;
  }

  &__actions {
    gap: 16rpx;
    display: flex;
    align-items: center;
  }

  &__send {
    color: #fff;
    padding: 12rpx 28rpx;
    font-size: 26rpx;
    background: #1989fa;
    border-radius: 24rpx;
  }
}

.footer-form {
  gap: 24rpx;
  display: flex;
  padding: 16rpx 24rpx;

  &__btn {
    flex: 1;
    height: 80rpx;
    display: flex;
    font-size: 28rpx;
    align-items: center;
    font-weight: 500;
    border-radius: 40rpx;
    justify-content: center;

    &--default {
      color: #666;
      background: #f5f7fa;
    }

    &--primary {
      color: #fff;
      background: linear-gradient(135deg, #4facfe 0%, #1989fa 100%);
    }
  }
}

.footer-copyright {
  padding: 24rpx;
  text-align: center;

  &__links {
    gap: 16rpx;
    display: flex;
    margin-bottom: 16rpx;
    justify-content: center;
  }

  &__link {
    color: #666;
    font-size: 24rpx;
  }

  &__divider {
    color: #ddd;
    font-size: 24rpx;
  }

  &__text {
    color: #999;
    font-size: 22rpx;
  }
}

.footer-nav {
  display: flex;
  padding: 12rpx 0;

  &__item {
    gap: 4rpx;
    flex: 1;
    display: flex;
    padding: 8rpx 0;
    align-items: center;
    flex-direction: column;
  }

  &__text {
    color: #999;
    font-size: 20rpx;

    &.active {
      color: #1989fa;
      font-weight: 500;
    }
  }
}
</style>
