<template>
  <demo-page>
    <demo-section title="基础用法" desc="底部固定栏，自动避让 tabbar 与底部安全区域，提供占位防内容遮挡。下滑页面查看效果。" />

    <demo-section title="场景切换" desc="同一个 ui-footer 实例，按钮切换 slot 内容">
      <demo-block direction="column" align="start" :gap="12">
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="(s, i) in scenes" :key="s.key" size="small" :type="current === i ? 'primary' : 'default'" @click="current = i">{{ s.label }}</ui-button>
        </demo-block>
        <text class="demo-text">{{ scenes[current].desc }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="背景色 (background)">
      <demo-block :cols="4" :gap="12">
        <ui-button size="small" :type="background === '' ? 'primary' : 'default'" @click="background = ''">默认</ui-button>
        <ui-button size="small" :type="background === '#f5f7fa' ? 'primary' : 'default'" @click="background = '#f5f7fa'">浅灰</ui-button>
        <ui-button size="small" :type="background === '#1989fa' ? 'primary' : 'default'" @click="background = '#1989fa'">蓝色</ui-button>
        <ui-button size="small" :type="background.startsWith('linear') ? 'primary' : 'default'" @click="background = 'linear-gradient(135deg, #ff6b6b 0%, #ee0a24 100%)'">
          渐变
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="底部偏移 (offset)" desc="数字默认 px，字符串透传单位">
      <demo-block :cols="4" :gap="12">
        <ui-button size="small" :type="offset === 0 ? 'primary' : 'default'" @click="offset = 0">0</ui-button>
        <ui-button size="small" :type="offset === '20rpx' ? 'primary' : 'default'" @click="offset = '20rpx'">20rpx</ui-button>
        <ui-button size="small" :type="offset === '40rpx' ? 'primary' : 'default'" @click="offset = '40rpx'">40rpx</ui-button>
        <ui-button size="small" :type="offset === '80rpx' ? 'primary' : 'default'" @click="offset = '80rpx'">80rpx</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="层级 (z-index)">
      <demo-block :cols="3" :gap="12">
        <ui-button size="small" :type="zIndex === 50 ? 'primary' : 'default'" @click="zIndex = 50">50</ui-button>
        <ui-button size="small" :type="zIndex === 100 ? 'primary' : 'default'" @click="zIndex = 100">100</ui-button>
        <ui-button size="small" :type="zIndex === 999 ? 'primary' : 'default'" @click="zIndex = 999">999</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="安全区域 (safe-area-inset-bottom)" desc="iOS 全面屏底部小条避让">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="safe" />
        <text class="switch-label">{{ safe ? "启用" : "禁用" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式 (customStyle)" desc="常见用法：顶部阴影、顶部分割线">
      <demo-block :cols="3" :gap="12">
        <ui-button size="small" :type="customStyle === '' ? 'primary' : 'default'" @click="customStyle = ''">无</ui-button>
        <ui-button size="small" :type="customStyle.includes('shadow') ? 'primary' : 'default'" @click="customStyle = 'box-shadow: 0 -4rpx 16rpx rgba(0,0,0,0.08)'">
          顶部阴影
        </ui-button>
        <ui-button size="small" :type="customStyle.includes('border-top') ? 'primary' : 'default'" @click="customStyle = 'border-top: 1rpx solid #e5e7eb'">顶部分割线</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显 (rect / height)" desc="ui-resize 触发，slot 内容变化时高度自动上报">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">height: {{ footerHeight }} px</text>
        <text class="demo-text">rect: {{ rectText }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法 (resize)" desc="ref 调用，强制重算高度">
      <demo-block :gap="12">
        <ui-button size="small" @click="onResize">手动触发 resize()</ui-button>
      </demo-block>
    </demo-section>

    <demo-section v-for="i in 6" :key="i" :title="`占位内容 ${i}`" desc="滚动查看 footer 始终贴底" />

    <ui-footer
      ref="footerRef"
      :background="background"
      :offset="offset"
      :z-index="zIndex"
      :safe-area-inset-bottom="safe"
      :custom-style="customStyle"
      @rect="onRect"
      @height="onHeight"
    >
      <view v-if="current === 0" class="scene-product">
        <view class="scene-product__left">
          <view class="scene-product__item" @click="onTap('客服')">
            <ui-icon name="message" size="36rpx" color="#666" />
            <text class="scene-product__text">客服</text>
          </view>
          <view class="scene-product__item" @click="favorite = !favorite">
            <ui-icon :name="favorite ? 'heart-fill' : 'heart'" size="36rpx" :color="favorite ? '#ee0a24' : '#666'" />
            <text class="scene-product__text">{{ favorite ? "已收藏" : "收藏" }}</text>
          </view>
          <view class="scene-product__item">
            <ui-icon name="shopping" size="36rpx" color="#666" />
            <text class="scene-product__text">购物车</text>
            <view class="scene-product__badge">{{ cartCount }}</view>
          </view>
        </view>
        <view class="scene-product__right">
          <view class="scene-product__btn scene-product__btn--warning" @click="addCart">加入购物车</view>
          <view class="scene-product__btn scene-product__btn--primary" @click="onTap('立即购买')">立即购买</view>
        </view>
      </view>

      <view v-else-if="current === 1" class="scene-cart">
        <view class="scene-cart__left" @click="allChecked = !allChecked">
          <ui-icon :name="allChecked ? 'check-circle-fill' : 'check-circle'" size="40rpx" :color="allChecked ? '#1989fa' : '#ccc'" />
          <text class="scene-cart__text">全选</text>
        </view>
        <view class="scene-cart__right">
          <view class="scene-cart__price">
            <text class="scene-cart__label">合计：</text>
            <text class="scene-cart__amount">¥{{ totalPrice.toFixed(2) }}</text>
          </view>
          <view class="scene-cart__btn" @click="onTap(`结算 ${cartItems} 件`)">结算({{ cartItems }})</view>
        </view>
      </view>

      <view v-else-if="current === 2" class="scene-input">
        <view class="scene-input__box">
          <input v-model="inputText" class="scene-input__field" placeholder="说点什么..." />
        </view>
        <view class="scene-input__actions">
          <ui-icon name="image" size="40rpx" color="#666" />
          <ui-icon name="smile" size="40rpx" color="#666" />
          <view v-if="inputText" class="scene-input__send" @click="sendMsg">发送</view>
        </view>
      </view>

      <view v-else-if="current === 3" class="scene-form">
        <view class="scene-form__btn scene-form__btn--default" @click="onTap('取消')">取消</view>
        <view class="scene-form__btn scene-form__btn--primary" @click="onTap('提交')">提交</view>
      </view>

      <view v-else-if="current === 4" class="scene-copyright">
        <view class="scene-copyright__links">
          <text class="scene-copyright__link">关于</text>
          <text class="scene-copyright__divider">|</text>
          <text class="scene-copyright__link">联系</text>
          <text class="scene-copyright__divider">|</text>
          <text class="scene-copyright__link">隐私</text>
        </view>
        <text class="scene-copyright__text">© 2024 UniApp UI</text>
      </view>

      <view v-else class="scene-nav">
        <view v-for="(item, i) in navItems" :key="item.key" class="scene-nav__item" @click="activeNav = i">
          <ui-icon :name="item.icon" size="40rpx" :color="activeNav === i ? '#1989fa' : '#999'" />
          <text class="scene-nav__text" :class="{ active: activeNav === i }">{{ item.text }}</text>
        </view>
      </view>
    </ui-footer>
  </demo-page>
</template>

<script setup lang="ts">
import type { FooterInstance } from "@/uni_modules/uniapp-ui/ui-footer"
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Footer 页脚" },
})

const toast = useToast()

const scenes = [
  { key: "product", label: "商品详情栏", desc: "客服/收藏/购物车图标 + 加购/立即购买按钮，商品详情页" },
  { key: "cart", label: "购物车结算", desc: "全选 + 合计金额 + 结算按钮，购物车页底部" },
  { key: "input", label: "评论输入栏", desc: "输入框 + 表情/图片/发送，聊天评论页" },
  { key: "form", label: "表单提交栏", desc: "取消 + 提交双按钮，表单页" },
  { key: "copyright", label: "版权信息", desc: "快捷链接 + 版权声明，关于页/设置页" },
  { key: "nav", label: "快捷导航", desc: "类 tabbar 导航入口，需固定底部导航的页面" },
]

const navItems = [
  { key: "home", icon: "home", text: "首页" },
  { key: "compass", icon: "compass", text: "发现" },
  { key: "publish", icon: "plus-circle", text: "发布" },
  { key: "msg", icon: "bell", text: "消息" },
  { key: "me", icon: "user", text: "我的" },
]

const safe = ref(true)
const current = ref(0)
const zIndex = ref(100)
const favorite = ref(false)
const cartCount = ref(2)
const cartItems = ref(3)
const allChecked = ref(true)
const totalPrice = ref(299)
const inputText = ref("")
const activeNav = ref(0)
const background = ref("")
const customStyle = ref("")

const footerHeight = ref(0)
const rectText = ref("尚未触发")
const footerRef = ref<FooterInstance>()

const offset = ref<number | string>(0)

function onTap(label: string) {
  toast.text(label)
}

function addCart() {
  cartCount.value++
  toast.success("已加入购物车")
}

function sendMsg() {
  if (!inputText.value) return
  toast.success("已发送")
  inputText.value = ""
}

function onHeight(h: number) {
  footerHeight.value = h
}

function onRect(rect: UniApp.NodeInfo) {
  rectText.value = `top=${rect.top?.toFixed?.(0) ?? "?"}, height=${rect.height ?? 0}`
}

function onResize() {
  footerRef.value?.resize()
  toast.text("已触发 resize()")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.switch-label {
  color: var(--ui-color-text);
  font-size: 28rpx;
  margin-left: 16rpx;
}

// === 场景：商品详情栏 ===
.scene-product {
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
    color: var(--ui-color-text-secondary);
    font-size: 20rpx;
  }

  &__badge {
    top: -8rpx;
    color: var(--ui-color-text-inverse);
    right: -16rpx;
    height: 28rpx;
    display: flex;
    padding: 0 6rpx;
    position: absolute;
    font-size: 18rpx;
    min-width: 28rpx;
    background: var(--ui-color-danger);
    align-items: center;
    border-radius: 14rpx;
    justify-content: center;
  }

  &__right {
    gap: 16rpx;
    display: flex;
  }

  &__btn {
    color: var(--ui-color-text-inverse);
    padding: 16rpx 28rpx;
    font-size: 26rpx;
    font-weight: var(--ui-font-weight-normal);
    border-radius: 32rpx;

    &--warning {
      background: linear-gradient(135deg, #ffa940 0%, #ff7a00 100%);
    }

    &--primary {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee0a24 100%);
    }
  }
}

// === 场景：购物车结算 ===
.scene-cart {
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
    color: var(--ui-color-text);
    font-size: 26rpx;
  }

  &__right {
    gap: 20rpx;
    display: flex;
    align-items: center;
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: 36rpx;
    font-weight: 600;
  }

  &__btn {
    color: var(--ui-color-text-inverse);
    padding: 16rpx 36rpx;
    font-size: 26rpx;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee0a24 100%);
    font-weight: var(--ui-font-weight-normal);
    border-radius: 32rpx;
  }
}

// === 场景：评论输入栏 ===
.scene-input {
  gap: 20rpx;
  display: flex;
  padding: 16rpx 24rpx;
  align-items: center;

  &__box {
    flex: 1;
    height: 64rpx;
    display: flex;
    padding: 0 24rpx;
    background: var(--ui-color-background-page);
    align-items: center;
    border-radius: 32rpx;
  }

  &__field {
    flex: 1;
    color: var(--ui-color-text);
    font-size: 26rpx;
  }

  &__actions {
    gap: 16rpx;
    display: flex;
    align-items: center;
  }

  &__send {
    color: var(--ui-color-text-inverse);
    padding: 12rpx 28rpx;
    font-size: 26rpx;
    background: var(--ui-color-primary);
    border-radius: 24rpx;
  }
}

// === 场景：表单提交栏 ===
.scene-form {
  gap: 24rpx;
  display: flex;
  padding: 16rpx 24rpx;

  &__btn {
    flex: 1;
    height: 80rpx;
    display: flex;
    font-size: 28rpx;
    align-items: center;
    font-weight: var(--ui-font-weight-normal);
    border-radius: 40rpx;
    justify-content: center;

    &--default {
      color: var(--ui-color-text-secondary);
      background: var(--ui-color-background-page);
    }

    &--primary {
      color: var(--ui-color-text-inverse);
      background: linear-gradient(135deg, #4facfe 0%, #1989fa 100%);
    }
  }
}

// === 场景：版权信息 ===
.scene-copyright {
  padding: 24rpx;
  text-align: center;

  &__links {
    gap: 16rpx;
    display: flex;
    margin-bottom: 12rpx;
    justify-content: center;
  }

  &__link {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }

  &__divider {
    color: var(--ui-color-border-light);
    font-size: 24rpx;
  }

  &__text {
    color: var(--ui-color-text-tertiary);
    font-size: 22rpx;
  }
}

// === 场景：快捷导航 ===
.scene-nav {
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
    color: var(--ui-color-text-tertiary);
    font-size: 20rpx;

    &.active {
      color: var(--ui-color-primary);
      font-weight: var(--ui-font-weight-normal);
    }
  }
}
</style>
