<template>
  <view class="page">
    <ui-swiper :list="images" indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" height="750rpx" />

    <view class="info">
      <view class="info__price-row">
        <text class="info__currency">¥</text>
        <text class="info__price">299</text>
        <text class="info__origin">¥599</text>
        <ui-tag type="danger" :custom-style="{ marginLeft: 'var(--ui-spacing-sm)' }">5 折</ui-tag>
      </view>
      <text class="info__title">全新一代智能降噪耳机，超长续航，HiFi 音质体验</text>
      <view class="info__meta">
        <text>快递: 免运费</text>
        <text>月销 2000+</text>
        <text>广东深圳</text>
      </view>
      <view class="info__rate">
        <ui-rate :model-value="4.8" allow-half readonly size="28rpx" />
        <text class="info__rate-label">4.8 (1.2k 评价)</text>
      </view>
    </view>

    <ui-cell title="选择" :value="selectedSpec" is-link @click="showSku = true" />
    <ui-cell title="服务" value="7 天无理由 · 极速退款 · 假一赔十" />

    <view class="footer">
      <view class="footer__nav">
        <view v-for="item in navIcons" :key="item.label" class="footer__nav-item" @click="onNavClick(item)">
          <ui-icon :name="item.icon" size="40rpx" color="text-secondary" />
          <text class="footer__nav-label">{{ item.label }}</text>
        </view>
      </view>
      <ui-button type="primary" size="large" radius="40rpx 0 0 40rpx" :custom-style="{ flex: 1 }" @click="onAddCart">加入购物车</ui-button>
      <ui-button type="danger" size="large" radius="0 40rpx 40rpx 0" :custom-style="{ flex: 1 }" @click="onBuy">立即购买</ui-button>
    </view>

    <ui-action-sheet v-model:show="showSku" title="选择规格">
      <view class="sku">
        <view class="sku__group">
          <text class="sku__label">颜色</text>
          <view class="sku__options">
            <ui-tag v-for="c in colors" :key="c" :type="selectedColor === c ? 'primary' : 'default'" plain @click="selectedColor = c">
              {{ c }}
            </ui-tag>
          </view>
        </view>
        <view class="sku__group">
          <text class="sku__label">尺码</text>
          <view class="sku__options">
            <ui-tag v-for="s in sizes" :key="s" :type="selectedSize === s ? 'primary' : 'default'" plain @click="selectedSize = s">
              {{ s }}
            </ui-tag>
          </view>
        </view>
        <view class="sku__group">
          <text class="sku__label">数量</text>
          <ui-stepper v-model="quantity" :min="1" :max="99" />
        </view>
        <ui-button block type="primary" size="large" @click="onConfirmSku">确定</ui-button>
      </view>
    </ui-action-sheet>
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "商品详情" },
})

const toast = useToast()

const images = [
  "https://picsum.photos/750/750?random=21",
  "https://picsum.photos/750/750?random=22",
  "https://picsum.photos/750/750?random=23",
  "https://picsum.photos/750/750?random=24",
  "https://picsum.photos/750/750?random=25",
]

const colors = ["黑色", "白色", "蓝色"]
const sizes = ["S", "M", "L", "XL"]
const selectedColor = ref("黑色")
const selectedSize = ref("M")
const quantity = ref(1)

const showSku = ref(false)
const selectedSpec = computed(() => `${selectedColor.value} · ${selectedSize.value} · x${quantity.value}`)

const navIcons = [
  { icon: "shop", label: "店铺" },
  { icon: "chat", label: "客服" },
  { icon: "star", label: "收藏" },
]

function onNavClick(item: { label: string }) {
  toast.text(item.label)
}

function onAddCart() {
  toast.success("已加入购物车")
}

function onBuy() {
  uni.navigateTo({ url: "/pages/template/checkout/index" })
}

function onConfirmSku() {
  showSku.value = false
  toast.success(`已选: ${selectedSpec.value}`)
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
  padding-bottom: 160rpx;
}

.info {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  margin-bottom: var(--ui-spacing-md);

  &__price-row {
    display: flex;
    align-items: baseline;
    margin-bottom: var(--ui-spacing-sm);
  }

  &__currency {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: 56rpx;
    font-weight: var(--ui-font-weight-bold);
    margin-left: var(--ui-spacing-xxs);
  }

  &__origin {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
    margin-left: var(--ui-spacing-sm);
    text-decoration: line-through;
  }

  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
    line-height: 1.5;
    margin-bottom: var(--ui-spacing-sm);
  }

  &__meta {
    gap: var(--ui-spacing-md);
    color: var(--ui-color-text-tertiary);
    display: flex;
    font-size: var(--ui-font-size-xs);
    margin-bottom: var(--ui-spacing-sm);
  }

  &__rate {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;
  }

  &__rate-label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.footer {
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
  padding: var(--ui-spacing-sm) var(--ui-spacing-md) calc(var(--ui-spacing-sm) + env(safe-area-inset-bottom));
  position: fixed;
  background: var(--ui-color-background);
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: center;

  &__nav {
    gap: var(--ui-spacing-lg);
    display: flex;
    margin-right: var(--ui-spacing-lg);
  }

  &__nav-item {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__nav-label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xxs);
  }
}

.sku {
  gap: var(--ui-spacing-lg);
  display: flex;
  padding: var(--ui-spacing-lg);
  flex-direction: column;

  &__group {
    gap: var(--ui-spacing-sm);
    display: flex;
    flex-direction: column;
  }

  &__label {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }

  &__options {
    gap: var(--ui-spacing-sm);
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
