# Footer 页脚

固定在页面底部的页脚组件，自动计算高度并生成占位元素，避免内容被遮挡。

## 基础用法

```vue
<template>
  <ui-footer background="#f5f5f5">
    <view class="footer-content">
      <text>页脚内容</text>
    </view>
  </ui-footer>
</template>
```

## 应用场景

Footer 组件适用于多种业务场景，以下是常见的使用方式。

### 商品详情栏

包含客服、收藏、购物车图标，加入购物车和立即购买按钮，适用于商品详情页。

```vue
<template>
  <ui-footer background="#fff">
    <view class="product-footer">
      <view class="product-footer__left">
        <view class="product-footer__item">
          <ui-icon name="message" size="36rpx" color="#666" />
          <text class="product-footer__text">客服</text>
        </view>
        <view class="product-footer__item" @click="toggleFavorite">
          <ui-icon :name="isFavorite ? 'heart-fill' : 'heart'" size="36rpx" :color="isFavorite ? '#ee0a24' : '#666'" />
          <text class="product-footer__text">{{ isFavorite ? '已收藏' : '收藏' }}</text>
        </view>
        <view class="product-footer__item">
          <ui-icon name="shopping" size="36rpx" color="#666" />
          <text class="product-footer__text">购物车</text>
          <view class="product-footer__badge">{{ cartCount }}</view>
        </view>
      </view>
      <view class="product-footer__right">
        <ui-button type="warning" size="small">加入购物车</ui-button>
        <ui-button type="primary" size="small">立即购买</ui-button>
      </view>
    </view>
  </ui-footer>
</template>

<script setup>
const isFavorite = ref(false)
const cartCount = ref(2)

function toggleFavorite() {
  isFavorite.value = !isFavorite.value
}
</script>

<style>
.product-footer {
  display: flex;
  align-items: center;
  padding: 16rpx 24rpx;
  justify-content: space-between;
}
.product-footer__left {
  display: flex;
  gap: 28rpx;
}
.product-footer__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 4rpx;
}
.product-footer__text {
  font-size: 20rpx;
  color: #666;
}
.product-footer__badge {
  position: absolute;
  top: -8rpx;
  right: -16rpx;
  min-width: 28rpx;
  height: 28rpx;
  background: #ee0a24;
  border-radius: 14rpx;
  font-size: 18rpx;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6rpx;
}
.product-footer__right {
  display: flex;
  gap: 16rpx;
}
</style>
```

### 购物车结算

全选按钮、合计金额和结算按钮，适用于购物车页面底部。

```vue
<template>
  <ui-footer background="#fff">
    <view class="cart-footer">
      <view class="cart-footer__left" @click="isAllChecked = !isAllChecked">
        <ui-icon :name="isAllChecked ? 'check-circle-fill' : 'check-circle'" size="40rpx" :color="isAllChecked ? '#1989fa' : '#ccc'" />
        <text class="cart-footer__text">全选</text>
      </view>
      <view class="cart-footer__right">
        <view class="cart-footer__price">
          <text class="cart-footer__label">合计：</text>
          <text class="cart-footer__amount">¥{{ totalPrice.toFixed(2) }}</text>
        </view>
        <ui-button type="primary" size="small">结算({{ cartItems }})</ui-button>
      </view>
    </view>
  </ui-footer>
</template>

<script setup>
const isAllChecked = ref(true)
const totalPrice = ref(299.00)
const cartItems = ref(3)
</script>

<style>
.cart-footer {
  display: flex;
  align-items: center;
  padding: 16rpx 24rpx;
  justify-content: space-between;
}
.cart-footer__left {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.cart-footer__text {
  font-size: 26rpx;
  color: #333;
}
.cart-footer__right {
  display: flex;
  align-items: center;
  gap: 20rpx;
}
.cart-footer__price {
  text-align: right;
}
.cart-footer__label {
  font-size: 24rpx;
  color: #666;
}
.cart-footer__amount {
  font-size: 36rpx;
  font-weight: 600;
  color: #ee0a24;
}
</style>
```

### 评论输入栏

带输入框、表情和图片按钮的底部输入栏，适用于评论或聊天页面。

```vue
<template>
  <ui-footer background="#fff">
    <view class="input-footer">
      <view class="input-footer__box">
        <input v-model="inputText" class="input-footer__field" placeholder="说点什么..." />
      </view>
      <view class="input-footer__actions">
        <ui-icon name="image" size="40rpx" color="#666" />
        <ui-icon name="smile" size="40rpx" color="#666" />
        <ui-button v-if="inputText" type="primary" size="small" @click="onSend">发送</ui-button>
      </view>
    </view>
  </ui-footer>
</template>

<script setup>
const inputText = ref('')

function onSend() {
  if (inputText.value) {
    console.log('发送:', inputText.value)
    inputText.value = ''
  }
}
</script>

<style>
.input-footer {
  display: flex;
  align-items: center;
  padding: 16rpx 24rpx;
  gap: 20rpx;
}
.input-footer__box {
  flex: 1;
  height: 64rpx;
  background: #f5f7fa;
  border-radius: 32rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
}
.input-footer__field {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}
.input-footer__actions {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
</style>
```

### 表单提交栏

取消和提交双按钮布局，适用于表单填写页面底部。

```vue
<template>
  <ui-footer background="#fff">
    <view class="form-footer">
      <ui-button type="default" class="form-footer__btn">取消</ui-button>
      <ui-button type="primary" class="form-footer__btn">提交</ui-button>
    </view>
  </ui-footer>
</template>

<style>
.form-footer {
  display: flex;
  padding: 16rpx 24rpx;
  gap: 24rpx;
}
.form-footer__btn {
  flex: 1;
}
</style>
```

### 版权信息栏

快捷链接和版权声明，适用于关于页面或设置页面底部。

```vue
<template>
  <ui-footer background="#f8f9fa">
    <view class="copyright-footer">
      <view class="copyright-footer__links">
        <text class="copyright-footer__link">关于我们</text>
        <text class="copyright-footer__divider">|</text>
        <text class="copyright-footer__link">联系我们</text>
        <text class="copyright-footer__divider">|</text>
        <text class="copyright-footer__link">隐私政策</text>
      </view>
      <text class="copyright-footer__text">Copyright © 2024 UniApp UI</text>
    </view>
  </ui-footer>
</template>

<style>
.copyright-footer {
  padding: 24rpx;
  text-align: center;
}
.copyright-footer__links {
  display: flex;
  justify-content: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}
.copyright-footer__link {
  font-size: 24rpx;
  color: #666;
}
.copyright-footer__divider {
  font-size: 24rpx;
  color: #ddd;
}
.copyright-footer__text {
  font-size: 22rpx;
  color: #999;
}
</style>
```

### 快捷导航栏

类似 Tabbar 的快捷操作入口，适用于需要固定底部导航的页面。

```vue
<template>
  <ui-footer background="#fff">
    <view class="nav-footer">
      <view
        v-for="(item, index) in navItems"
        :key="item.icon"
        class="nav-footer__item"
        :class="{ active: activeNav === index }"
        @click="activeNav = index"
      >
        <ui-icon :name="item.icon" size="40rpx" :color="activeNav === index ? '#1989fa' : '#999'" />
        <text class="nav-footer__text" :class="{ active: activeNav === index }">{{ item.text }}</text>
      </view>
    </view>
  </ui-footer>
</template>

<script setup>
const activeNav = ref(0)
const navItems = [
  { icon: 'home', text: '首页' },
  { icon: 'compass', text: '发现' },
  { icon: 'plus-circle', text: '发布' },
  { icon: 'bell', text: '消息' },
  { icon: 'user', text: '我的' },
]
</script>

<style>
.nav-footer {
  display: flex;
  padding: 12rpx 0;
}
.nav-footer__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
  padding: 8rpx 0;
}
.nav-footer__text {
  font-size: 20rpx;
  color: #999;
}
.nav-footer__text.active {
  color: #1989fa;
  font-weight: 500;
}
</style>
```

## Props

| 参数                   | 说明                 | 类型               | 默认值 |
| ---------------------- | -------------------- | ------------------ | ------ |
| z-index                | 元素层级             | `string \| number` | -      |
| offset                 | 距离底部偏移         | `string \| number` | `0`    |
| background             | 背景颜色             | `string`           | -      |
| safe-area-inset-bottom | 是否开启底部安全区域 | `boolean`          | `true` |
| custom-class           | 自定义类名           | `string`           | -      |
| custom-style           | 自定义样式           | `string \| object` | -      |

## Events

| 事件名 | 说明               | 回调参数                |
| ------ | ------------------ | ----------------------- |
| rect   | 获取元素信息时触发 | `rect: UniApp.NodeInfo` |
| height | 获取元素高度时触发 | `height: number`        |

## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 页脚内容 |

<!-- AUTO-METHODS-SUPPLEMENT: ui-footer -->
## Footer Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `resize` |

