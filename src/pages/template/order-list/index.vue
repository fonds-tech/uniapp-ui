<template>
  <view class="page">
    <view class="tabs">
      <ui-tabs v-model="status" type="line">
        <ui-tab v-for="opt in statusOptions" :key="opt.value" :name="opt.value" :title="opt.label" />
      </ui-tabs>
    </view>

    <scroll-view scroll-y class="scroll">
      <ui-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <view v-if="orders.length" class="list">
          <view v-for="order in orders" :key="order.id" class="order">
            <view class="order__header">
              <view class="order__store">
                <ui-icon name="shop" size="32rpx" color="text" />
                <text class="order__store-name">{{ order.store }}</text>
                <ui-icon name="arrow" size="28rpx" color="text-tertiary" />
              </view>
              <ui-tag :type="statusTagType(order.status)" plain>{{ statusLabel(order.status) }}</ui-tag>
            </view>

            <view class="order__goods">
              <ui-image :src="order.image" width="160rpx" height="160rpx" mode="aspectFill" radius="12rpx" />
              <view class="order__detail">
                <view>
                  <ui-text-ellipsis :content="order.title" :rows="2" />
                  <ui-tag type="info" plain :custom-style="{ marginTop: 'var(--ui-spacing-xs)' }">{{ order.sku }}</ui-tag>
                </view>
                <view class="order__price-row">
                  <text class="order__price">¥{{ order.price.toFixed(2) }}</text>
                  <text class="order__qty">x{{ order.qty }}</text>
                </view>
              </view>
            </view>

            <view class="order__total">
              <text class="order__total-label">共{{ order.qty }}件商品 合计:</text>
              <text class="order__total-amount">¥{{ (order.price * order.qty).toFixed(2) }}</text>
            </view>

            <view class="order__actions">
              <ui-button size="small" plain @click="onClickAction('物流', order)">查看物流</ui-button>
              <ui-button size="small" type="primary" plain @click="onClickAction('确认', order)">确认收货</ui-button>
            </view>
          </view>
        </view>

        <ui-empty v-else description="暂无相关订单" />
      </ui-pull-refresh>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "我的订单" },
})

const toast = useToast()

const statusOptions = [
  { label: "全部", value: "all" },
  { label: "待付款", value: "pending" },
  { label: "待发货", value: "shipping" },
  { label: "待收货", value: "receiving" },
  { label: "评价", value: "review" },
]
const status = ref("all")
const refreshing = ref(false)

const allOrders = [
  { id: 1, store: "官方旗舰店", title: "2024 新款智能手表运动手环监测心率血氧", sku: "黑色，标准版", price: 299, qty: 1, status: "shipping", image: "https://picsum.photos/200?random=31" },
  { id: 2, store: "数码精选", title: "无线降噪耳机 主动降噪 长续航 通话清晰", sku: "白色", price: 599, qty: 1, status: "pending", image: "https://picsum.photos/200?random=32" },
  { id: 3, store: "运动装备店", title: "便携跑步鞋 透气 减震 户外运动", sku: "黑色 42", price: 459, qty: 2, status: "receiving", image: "https://picsum.photos/200?random=33" },
  { id: 4, store: "家居优选", title: "记忆棉枕头 颈椎护理 慢回弹", sku: "标准款", price: 159, qty: 1, status: "review", image: "https://picsum.photos/200?random=34" },
]

const orders = computed(() => (status.value === "all" ? allOrders : allOrders.filter((o) => o.status === status.value)))

function statusLabel(s: string) {
  const map: Record<string, string> = { pending: "待付款", shipping: "待发货", receiving: "待收货", review: "待评价" }
  return map[s] || ""
}

function statusTagType(s: string) {
  const map: Record<string, string> = { pending: "warning", shipping: "primary", receiving: "success", review: "info" }
  return (map[s] || "info") as "warning" | "primary" | "success" | "info"
}

function onRefresh() {
  setTimeout(() => {
    refreshing.value = false
    toast.success("刷新成功")
  }, 800)
}

function onClickAction(name: string, order: { id: number }) {
  toast.text(`${name} #${order.id}`)
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  display: flex;
  background: var(--ui-color-background-page);
  flex-direction: column;
}

.tabs {
  background: var(--ui-color-background);
  border-bottom: 1rpx solid var(--ui-color-border-light);
}

.scroll {
  flex: 1;
  padding: var(--ui-spacing-md);
}

.list {
  gap: var(--ui-spacing-md);
  display: flex;
  flex-direction: column;
}

.order {
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
    justify-content: space-between;
  }

  &__store {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
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

  &__total {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: baseline;
    margin-bottom: var(--ui-spacing-md);
    justify-content: flex-end;
  }

  &__total-label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__total-amount {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__actions {
    gap: var(--ui-spacing-sm);
    display: flex;
    justify-content: flex-end;
  }
}
</style>
