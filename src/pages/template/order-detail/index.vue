<template>
  <view class="page">
    <view class="status">
      <view>
        <text class="status__title">商家已发货</text>
        <text class="status__hint">还剩 <ui-count-down :time="hours6 * 3600 * 1000" format="DD 天 HH 时 mm 分 ss 秒" color="rgba(255,255,255,0.9)" inline /> 自动确认收货</text>
      </view>
      <ui-icon name="cart" size="64rpx" color="rgba(255, 255, 255, 0.8)" />
    </view>

    <view class="content">
      <view class="card">
        <ui-cell title="已到达 深圳市南山区集散中心" label="2024-05-20 14:30:25" is-link>
          <template #icon>
            <view class="card__icon card__icon--primary">
              <ui-icon name="location" color="primary" size="32rpx" />
            </view>
          </template>
        </ui-cell>
      </view>

      <view class="card">
        <ui-cell title="张三丰  138****8888" label="广东省深圳市南山区粤海街道科技园南区虚拟大学园R3-A栋">
          <template #icon>
            <view class="card__icon card__icon--warning">
              <ui-icon name="user-o" color="warning" size="32rpx" />
            </view>
          </template>
        </ui-cell>
      </view>

      <view class="card card--goods">
        <view class="card__store">
          <ui-icon name="shop" size="32rpx" color="text" />
          <text class="card__store-name">官方旗舰店</text>
        </view>
        <view class="card__goods">
          <ui-image src="https://picsum.photos/200?random=41" width="160rpx" height="160rpx" mode="aspectFill" radius="12rpx" />
          <view class="card__detail">
            <ui-text-ellipsis content="2024 新款智能手表运动手环监测心率血氧防水长续航" :rows="2" />
            <view class="card__price-row">
              <text class="card__price">¥299.00</text>
              <text class="card__qty">x1</text>
            </view>
          </view>
        </view>
        <ui-divider />
        <view class="card__row"><text class="card__label">商品总价</text><text class="card__value">¥299.00</text></view>
        <view class="card__row"><text class="card__label">运费</text><text class="card__value">¥0.00</text></view>
        <view class="card__row card__row--total"><text class="card__pay-label">实付款</text><text class="card__pay">¥299.00</text></view>
      </view>

      <view class="card">
        <ui-cell title="物流时间线">
          <template #value>
            <ui-icon name="arrow" size="28rpx" color="text-tertiary" />
          </template>
        </ui-cell>
        <ui-timeline>
          <ui-timeline-item type="success" icon="check" time="2024-05-20 14:32" title="已到达派送站" description="本人签收" />
          <ui-timeline-item type="primary" time="2024-05-20 09:10" title="派送中" description="快递员配送" />
          <ui-timeline-item time="2024-05-19 18:45" title="到达集散中心" description="上海闸北区站" />
          <ui-timeline-item hollow time="2024-05-18 10:00" title="商家已发货" description="顺丰快递" />
        </ui-timeline>
      </view>
    </view>

    <view class="footer">
      <ui-button size="large" plain radius="36rpx" @click="onClickAction('物流')">查看物流</ui-button>
      <ui-button size="large" type="primary" radius="36rpx" @click="onClickAction('确认')">确认收货</ui-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "订单详情" },
})

const toast = useToast()
const hours6 = 6 * 24 + 12 // 6 天 12 小时

function onClickAction(name: string) {
  toast.text(name)
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
  padding-bottom: 160rpx;
}

.status {
  display: flex;
  padding: var(--ui-spacing-xl) var(--ui-spacing-lg) var(--ui-spacing-xxl);
  background: var(--ui-color-primary);
  align-items: center;
  justify-content: space-between;

  &__title {
    color: var(--ui-color-text-inverse);
    display: block;
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__hint {
    color: rgba(255, 255, 255, 0.8);
    display: block;
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xs);
  }
}

.content {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: 0 var(--ui-spacing-md);
  position: relative;
  margin-top: -40rpx;
  flex-direction: column;
}

.card {
  padding: var(--ui-spacing-md) 0;
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);

  &--goods {
    padding: var(--ui-spacing-md);
  }

  &__icon {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    margin-right: var(--ui-spacing-md);
    border-radius: 50%;
    justify-content: center;

    &--primary {
      background: var(--ui-color-primary-light);
    }

    &--warning {
      background: var(--ui-color-warning-light);
    }
  }

  &__store {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
  }

  &__store-name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
  }

  &__goods {
    gap: var(--ui-spacing-md);
    display: flex;
    margin-bottom: var(--ui-spacing-md);
  }

  &__detail {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: space-between;
  }

  &__price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__price {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__qty {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__row {
    display: flex;
    margin-top: var(--ui-spacing-xs);
    justify-content: space-between;

    &--total {
      align-items: center;
      padding-top: var(--ui-spacing-sm);
    }
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__value {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-xs);
  }

  &__pay-label {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
  }

  &__pay {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }
}

.footer {
  gap: var(--ui-spacing-md);
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
  padding: var(--ui-spacing-md) var(--ui-spacing-md) calc(var(--ui-spacing-md) + env(safe-area-inset-bottom));
  position: fixed;
  background: var(--ui-color-background);
  border-top: 1rpx solid var(--ui-color-border-light);
  justify-content: flex-end;
}
</style>
