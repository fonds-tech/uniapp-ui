<template>
  <view class="page">
    <ui-cell title="收货地址" :label="address.detail" is-link @click="onPickAddress">
      <template #icon>
        <ui-icon name="location" size="40rpx" color="primary" :custom-style="{ marginRight: 'var(--ui-spacing-md)' }" />
      </template>
      <template #title>
        <view class="addr">
          <text class="addr__name">{{ address.name }}</text>
          <text class="addr__phone">{{ address.phone }}</text>
          <ui-tag v-if="address.isDefault" type="danger" :custom-style="{ marginLeft: 'var(--ui-spacing-xs)' }">默认</ui-tag>
        </view>
      </template>
    </ui-cell>

    <view class="goods">
      <text class="goods__title">商品清单</text>
      <view v-for="g in goods" :key="g.id" class="goods__item">
        <ui-image :src="g.image" width="120rpx" height="120rpx" mode="aspectFill" radius="12rpx" />
        <view class="goods__detail">
          <ui-text-ellipsis :content="g.title" :rows="2" />
          <text class="goods__sku">{{ g.sku }}</text>
        </view>
        <view class="goods__price">
          <text class="goods__amount">¥{{ g.price }}</text>
          <text class="goods__qty">x{{ g.qty }}</text>
        </view>
      </view>
    </view>

    <ui-cell-group>
      <ui-cell title="配送方式" value="顺丰快递 (免运费)" is-link />
      <ui-cell title="优惠券" :value="coupon ? `-¥${coupon}` : '暂无可用'" is-link @click="showCoupon = true" />
      <ui-cell title="备注">
        <template #value>
          <ui-input v-model="remark" placeholder="想对店家说点什么" input-align="right" :custom-style="{ background: 'transparent' }" />
        </template>
      </ui-cell>
    </ui-cell-group>

    <view class="pay-method">
      <text class="pay-method__title">支付方式</text>
      <ui-radio-group v-model="payMethod">
        <ui-cell v-for="p in payMethods" :key="p.value" :title="p.label" clickable>
          <template #icon>
            <ui-icon :name="p.icon" size="40rpx" :color="p.color" :custom-style="{ marginRight: 'var(--ui-spacing-md)' }" />
          </template>
          <template #value>
            <ui-radio :name="p.value" />
          </template>
        </ui-cell>
      </ui-radio-group>
    </view>

    <view class="footer">
      <view class="footer__total">
        <text class="footer__label">实付:</text>
        <text class="footer__amount">¥{{ payable.toFixed(2) }}</text>
      </view>
      <ui-button type="danger" radius="40rpx" size="large" @click="onPay">立即支付</ui-button>
    </view>

    <ui-popup v-model:show="showCoupon" position="bottom" round>
      <view class="coupon">
        <view class="coupon__header">
          <ui-button type="text" @click="showCoupon = false">取消</ui-button>
          <text class="coupon__title">优惠券</text>
          <ui-button type="text" :custom-style="{ visibility: 'hidden' }">确定</ui-button>
        </view>
        <view class="coupon__list">
          <view v-for="c in coupons" :key="c.amount" class="coupon__item" @click="onPickCoupon(c)">
            <view class="coupon__left">
              <text class="coupon__amount">¥{{ c.amount }}</text>
              <text class="coupon__limit">满 {{ c.minOrder }} 可用</text>
            </view>
            <view class="coupon__right">
              <text class="coupon__name">{{ c.name }}</text>
              <text class="coupon__expire">{{ c.expire }}</text>
            </view>
            <ui-button size="small" :type="coupon === c.amount ? 'primary' : 'default'" plain>{{ coupon === c.amount ? "已选" : "选择" }}</ui-button>
          </view>
        </view>
      </view>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useToast, useDialog } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "确认订单" },
})

const toast = useToast()
const dialog = useDialog()

const address = ref({
  name: "张三丰",
  phone: "138****8888",
  detail: "广东省深圳市南山区粤海街道科技园南区虚拟大学园 R3-A 栋",
  isDefault: true,
})

const goods = ref([
  { id: 1, title: "无线降噪耳机 主动降噪 长续航", sku: "黑色", price: 599, qty: 1, image: "https://picsum.photos/200?random=81" },
  { id: 2, title: "智能手表 心率监测 防水 蓝牙通话", sku: "标准款", price: 299, qty: 2, image: "https://picsum.photos/200?random=82" },
])

const remark = ref("")
const payMethod = ref("wechat")
const coupon = ref(0)
const showCoupon = ref(false)

const payMethods = [
  { label: "微信支付", value: "wechat", icon: "wechat", color: "success" },
  { label: "支付宝", value: "alipay", icon: "alipay", color: "primary" },
  { label: "余额支付", value: "balance", icon: "balance-o", color: "warning" },
]

const coupons = [
  { amount: 20, minOrder: 100, name: "新人专享", expire: "2026-12-31 到期" },
  { amount: 50, minOrder: 300, name: "全场满减", expire: "2026-06-30 到期" },
  { amount: 100, minOrder: 800, name: "大额优惠", expire: "2026-08-15 到期" },
]

const subtotal = computed(() => goods.value.reduce((sum, g) => sum + g.price * g.qty, 0))
const payable = computed(() => Math.max(0, subtotal.value - coupon.value))

function onPickAddress() {
  uni.navigateTo({ url: "/pages/template/address-list/index" })
}

function onPickCoupon(c: { amount: number }) {
  coupon.value = c.amount === coupon.value ? 0 : c.amount
  showCoupon.value = false
  toast.success("优惠券已选")
}

async function onPay() {
  const ok = await dialog.confirm({ title: "确认支付", content: `实付 ¥${payable.value.toFixed(2)}？` })
  if (!ok) return
  toast.loading("支付中...")
  setTimeout(() => toast.success("支付成功"), 1000)
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
  padding-bottom: 180rpx;
}

.addr {
  gap: var(--ui-spacing-xs);
  display: flex;
  align-items: center;

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
  }

  &__phone {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.goods {
  margin: var(--ui-spacing-md) 0;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);

  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
    margin-bottom: var(--ui-spacing-md);
  }

  &__item {
    gap: var(--ui-spacing-md);
    display: flex;
    padding: var(--ui-spacing-sm) 0;
    border-bottom: 1rpx solid var(--ui-color-border-light);

    &:last-child {
      border-bottom: 0;
    }
  }

  &__detail {
    gap: var(--ui-spacing-xs);
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__sku {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__price {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }

  &__amount {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
  }

  &__qty {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.pay-method {
  padding: var(--ui-spacing-lg) 0 0;
  background: var(--ui-color-background);
  margin-top: var(--ui-spacing-md);

  &__title {
    color: var(--ui-color-text);
    display: block;
    padding: 0 var(--ui-spacing-lg);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
    margin-bottom: var(--ui-spacing-md);
  }
}

.footer {
  gap: var(--ui-spacing-md);
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
  padding: var(--ui-spacing-sm) var(--ui-spacing-md) calc(var(--ui-spacing-sm) + env(safe-area-inset-bottom));
  position: fixed;
  background: var(--ui-color-background);
  border-top: 1rpx solid var(--ui-color-border-light);
  align-items: center;

  &__total {
    gap: var(--ui-spacing-xs);
    flex: 1;
    display: flex;
    align-items: baseline;
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xl);
    font-weight: var(--ui-font-weight-bold);
  }
}

.coupon {
  &__header {
    display: flex;
    padding: var(--ui-spacing-md);
    align-items: center;
    border-bottom: 1rpx solid var(--ui-color-border-light);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__list {
    gap: var(--ui-spacing-md);
    display: flex;
    padding: var(--ui-spacing-lg);
    max-height: 60vh;
    flex-direction: column;
  }

  &__item {
    gap: var(--ui-spacing-md);
    display: flex;
    padding: var(--ui-spacing-md);
    background: var(--ui-color-background-section);
    align-items: center;
    border-radius: var(--ui-radius-md);
  }

  &__left {
    gap: var(--ui-spacing-xxs);
    color: var(--ui-color-danger);
    width: 160rpx;
    display: flex;
    align-items: center;
    border-right: 1rpx dashed var(--ui-color-border);
    flex-direction: column;
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xl);
    font-weight: var(--ui-font-weight-bold);
  }

  &__limit {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xs);
  }

  &__right {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }

  &__expire {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
