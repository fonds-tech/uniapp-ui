<template>
  <view class="page">
    <view v-if="totalCount > 0">
      <!-- 顶部摘要 -->
      <view class="summary">
        <view>
          <text class="summary__title">购物车</text>
          <text class="summary__count">{{ totalCount }} 件商品 · 已选 {{ selectedCount }} 件</text>
        </view>
        <text class="summary__manage" @click="editMode = !editMode">{{ editMode ? "完成" : "管理" }}</text>
      </view>

      <!-- 活动横幅 -->
      <view class="banner" @click="onBanner">
        <ui-icon name="gift" size="32rpx" color="warning" />
        <text class="banner__text">满 299 减 30 · 已凑单 ¥{{ formatMoney(totalPrice) }}</text>
        <text class="banner__action">去凑单 ›</text>
      </view>

      <!-- 按店铺分组 -->
      <view v-for="shop in shops" :key="shop.id" class="shop">
        <view class="shop__head">
          <view class="shop__head-left" @click="onToggleShop(shop)">
            <ui-checkbox :model-value="isShopAllSelected(shop)" @click.stop="onSelectShop(shop)" />
            <ui-icon name="shop" size="32rpx" color="warning" />
            <text class="shop__name">{{ shop.name }}</text>
            <ui-icon name="arrow" size="24rpx" color="text-tertiary" />
          </view>
          <ui-tag v-if="shop.coupon" type="danger" plain>店铺券 -{{ shop.coupon }}</ui-tag>
        </view>

        <ui-checkbox-group :model-value="selectedIds" @change="onChangeSelected">
          <ui-swipe-cell v-for="item in shop.items" :key="item.id">
            <view class="row">
              <ui-checkbox :name="item.id" />
              <view class="row__image">
                <ui-image :src="item.image" width="160rpx" height="160rpx" mode="aspectFill" radius="16rpx" />
                <view v-if="item.stock < 10" class="row__stock">仅剩 {{ item.stock }} 件</view>
              </view>
              <view class="row__detail">
                <ui-text-ellipsis :content="item.title" :rows="2" />
                <view class="row__sku" @click="onPickSku(item)">
                  <text class="row__sku-text">{{ item.sku }}</text>
                  <ui-icon name="arrow-down" size="20rpx" color="text-tertiary" />
                </view>
                <view v-if="item.promotion" class="row__promo">
                  <ui-tag :type="item.promotion.type">{{ item.promotion.label }}</ui-tag>
                  <text class="row__promo-text">{{ item.promotion.desc }}</text>
                </view>
                <view class="row__bottom">
                  <view class="row__price">
                    <text class="row__currency">¥</text>
                    <text class="row__amount">{{ formatMoney(item.price) }}</text>
                    <text v-if="item.origin" class="row__origin">¥{{ formatMoney(item.origin) }}</text>
                  </view>
                  <ui-stepper v-model="item.qty" :min="1" :max="item.stock" />
                </view>
              </view>
            </view>
            <template #right>
              <view class="swipe-act swipe-act--favor" @click="onMoveFavor(item)">
                <ui-icon name="like" color="text-inverse" size="36rpx" />
                <text class="swipe-act__text">收藏</text>
              </view>
              <view class="swipe-act swipe-act--del" @click="onRemove(item)">
                <ui-icon name="delete" color="text-inverse" size="36rpx" />
                <text class="swipe-act__text">删除</text>
              </view>
            </template>
          </ui-swipe-cell>
        </ui-checkbox-group>
      </view>

      <!-- 失效商品 -->
      <view v-if="invalidItems.length" class="invalid">
        <view class="invalid__head">
          <text class="invalid__title">失效商品 ({{ invalidItems.length }})</text>
          <text class="invalid__clear" @click="onClearInvalid">清空</text>
        </view>
        <view v-for="item in invalidItems" :key="item.id" class="invalid__item">
          <ui-tag type="info" plain>失效</ui-tag>
          <ui-image :src="item.image" width="120rpx" height="120rpx" mode="aspectFill" radius="12rpx" custom-style="opacity: 0.5" />
          <view class="invalid__info">
            <ui-text-ellipsis :content="item.title" :rows="2" custom-style="color: var(--ui-color-text-tertiary)" />
            <text class="invalid__reason">{{ item.reason }}</text>
          </view>
        </view>
      </view>

      <!-- 猜你喜欢 -->
      <view class="recommend">
        <view class="recommend__head">
          <view class="recommend__line" />
          <text class="recommend__title">猜你喜欢</text>
          <view class="recommend__line" />
        </view>
        <view class="recommend__grid">
          <view v-for="r in recommends" :key="r.id" class="recommend-item" @click="onPickRecommend(r)">
            <ui-image :src="r.image" width="100%" height="280rpx" mode="aspectFill" radius="20rpx 20rpx 0 0" />
            <view class="recommend-item__body">
              <ui-text-ellipsis :content="r.title" :rows="2" />
              <view class="recommend-item__price">
                <text class="recommend-item__currency">¥</text>
                <text class="recommend-item__amount">{{ r.price }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <ui-empty v-else description="购物车空空如也" image="default">
      <template #footer>
        <ui-button type="primary" radius="32rpx" @click="onGoShop">去逛逛</ui-button>
      </template>
    </ui-empty>

    <!-- 底部结算栏 -->
    <view v-if="totalCount > 0" class="footer">
      <view class="footer__all" @click="onToggleAll">
        <ui-checkbox v-model="selectAll" />
        <text class="footer__all-text">全选</text>
      </view>

      <view v-if="!editMode" class="footer__price">
        <view class="footer__total-row">
          <text class="footer__label">合计</text>
          <text class="footer__amount">¥{{ formatMoney(totalPrice) }}</text>
        </view>
        <text class="footer__discount">已优惠 ¥{{ formatMoney(totalDiscount) }}</text>
      </view>

      <ui-button v-if="!editMode" type="danger" radius="40rpx" size="large" :disabled="!selectedCount" @click="onCheckout">
        去结算 ({{ selectedCount }})
      </ui-button>

      <view v-else class="footer__edit">
        <ui-button size="small" plain @click="onMoveSelectedFavor">移入收藏</ui-button>
        <ui-button size="small" type="danger" plain @click="onDeleteSelected">删除</ui-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useToast, useDialog } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "购物车" },
})

const toast = useToast()
const dialog = useDialog()

const editMode = ref(false)

interface Item {
  id: number
  title: string
  sku: string
  price: number
  origin?: number
  qty: number
  stock: number
  image: string
  promotion?: { type: "danger" | "warning" | "primary"; label: string; desc: string }
}

interface Shop {
  id: number
  name: string
  coupon?: string
  items: Item[]
}

const shops = ref<Shop[]>([
  {
    id: 1,
    name: "Apple 官方旗舰店",
    coupon: "200",
    items: [
      { id: 1, title: "AirPods Pro 2 主动降噪 USB-C 接口", sku: "白色 · 标准版", price: 1899, origin: 1999, qty: 1, stock: 50, image: "https://picsum.photos/300?random=201", promotion: { type: "danger", label: "限时", desc: "-¥100 / 件" } },
      { id: 2, title: "MagSafe 充电器 1m 快充版", sku: "USB-C 接口 · 1m", price: 329, qty: 2, stock: 8, image: "https://picsum.photos/300?random=202" },
    ],
  },
  {
    id: 2,
    name: "Nike 官方店",
    coupon: "50",
    items: [
      { id: 3, title: "Air Force 1 经典低帮运动鞋 男士款", sku: "白色 · 42 码", price: 799, origin: 899, qty: 1, stock: 30, image: "https://picsum.photos/300?random=203", promotion: { type: "warning", label: "返券", desc: "下单返 30 积分" } },
    ],
  },
  {
    id: 3,
    name: "京东自营 · 数码精选",
    items: [
      { id: 4, title: "便携蓝牙音箱 重低音 防水户外", sku: "深空灰", price: 249, origin: 299, qty: 1, stock: 100, image: "https://picsum.photos/300?random=204" },
      { id: 5, title: "Type-C 转接头 三合一拓展坞", sku: "标准款", price: 89, qty: 3, stock: 200, image: "https://picsum.photos/300?random=205", promotion: { type: "primary", label: "凑单", desc: "再凑 ¥210 减 30" } },
    ],
  },
])

const invalidItems = ref([
  { id: 91, title: "无线机械键盘 RGB 背光 青轴游戏办公", image: "https://picsum.photos/200?random=210", reason: "该商品已下架" },
  { id: 92, title: "人体工学椅 久坐舒适 透气网布", image: "https://picsum.photos/200?random=211", reason: "暂时缺货" },
])

const recommends = [
  { id: 1, title: "DJI Osmo 手持云台稳定器", price: "1399", image: "https://picsum.photos/300?random=220" },
  { id: 2, title: "Bose 700 头戴式降噪耳机", price: "2299", image: "https://picsum.photos/300?random=221" },
  { id: 3, title: "iPad Pro 11 寸 2024 款 256G", price: "6299", image: "https://picsum.photos/300?random=222" },
  { id: 4, title: "Sony WH-1000XM5 旗舰耳机", price: "2599", image: "https://picsum.photos/300?random=223" },
]

const selectedIds = ref<number[]>([1, 3])

const allItems = computed(() => shops.value.flatMap((s) => s.items))
const totalCount = computed(() => allItems.value.reduce((sum, i) => sum + i.qty, 0))
const selectedCount = computed(() => allItems.value.filter((i) => selectedIds.value.includes(i.id)).reduce((sum, i) => sum + i.qty, 0))

const totalPrice = computed(() => allItems.value.filter((i) => selectedIds.value.includes(i.id)).reduce((sum, i) => sum + i.price * i.qty, 0))
const totalOrigin = computed(() => allItems.value.filter((i) => selectedIds.value.includes(i.id)).reduce((sum, i) => sum + (i.origin || i.price) * i.qty, 0))
const totalDiscount = computed(() => totalOrigin.value - totalPrice.value)

const selectAll = computed({
  get: () => allItems.value.length > 0 && selectedIds.value.length === allItems.value.length,
  set: (v) => {
    selectedIds.value = v ? allItems.value.map((i) => i.id) : []
  },
})

function formatMoney(v: number, d = 2) {
  return v.toLocaleString("zh-CN", { minimumFractionDigits: d, maximumFractionDigits: d })
}

function isShopAllSelected(shop: Shop) {
  return shop.items.every((i) => selectedIds.value.includes(i.id))
}

function onSelectShop(shop: Shop) {
  const all = isShopAllSelected(shop)
  const ids = new Set(selectedIds.value)
  shop.items.forEach((i) => (all ? ids.delete(i.id) : ids.add(i.id)))
  selectedIds.value = Array.from(ids)
}

function onToggleShop(shop: Shop) {
  toast.text(shop.name)
}

function onChangeSelected(v: (number | string)[]) {
  selectedIds.value = v as number[]
}

function onToggleAll() {
  selectAll.value = !selectAll.value
}

function onPickSku(item: Item) {
  toast.text(`修改规格: ${item.title}`)
}

function onBanner() {
  uni.switchTab({ url: "/pages/tabbar/home/index" })
}

async function onRemove(item: Item) {
  const ok = await dialog.confirm({ title: "移除商品", content: `确认移除「${item.title}」？` })
  if (!ok) return
  shops.value.forEach((s) => (s.items = s.items.filter((i) => i.id !== item.id)))
  selectedIds.value = selectedIds.value.filter((id) => id !== item.id)
  shops.value = shops.value.filter((s) => s.items.length > 0)
  toast.success("已移除")
}

function onMoveFavor(item: Item) {
  toast.success(`已收藏 ${item.title.slice(0, 6)}...`)
}

async function onDeleteSelected() {
  if (!selectedCount.value) return toast.fail("请先选择")
  const ok = await dialog.confirm({ title: "批量删除", content: `删除 ${selectedIds.value.length} 件商品？` })
  if (!ok) return
  shops.value.forEach((s) => (s.items = s.items.filter((i) => !selectedIds.value.includes(i.id))))
  shops.value = shops.value.filter((s) => s.items.length > 0)
  selectedIds.value = []
  toast.success("已删除")
}

function onMoveSelectedFavor() {
  if (!selectedCount.value) return toast.fail("请先选择")
  toast.success(`已收藏 ${selectedIds.value.length} 件`)
}

function onClearInvalid() {
  invalidItems.value = []
  toast.success("已清空")
}

function onPickRecommend(r: { id: number; title: string }) {
  uni.navigateTo({ url: "/pages/template/goods-detail/index" })
}

function onGoShop() {
  uni.switchTab({ url: "/pages/tabbar/home/index" })
}

function onCheckout() {
  if (!selectedCount.value) return
  uni.navigateTo({ url: "/pages/template/checkout/index" })
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
  padding-bottom: 200rpx;
}

.summary {
  display: flex;
  padding: var(--ui-spacing-lg) var(--ui-spacing-md);
  align-items: center;
  justify-content: space-between;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-xl);
    font-weight: var(--ui-font-weight-bold);
  }

  &__count {
    color: var(--ui-color-text-tertiary);
    display: block;
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xxs);
  }

  &__manage {
    color: var(--ui-color-primary);
    padding: var(--ui-spacing-xs) var(--ui-spacing-md);
    font-size: var(--ui-font-size-sm);
  }
}

.banner {
  gap: var(--ui-spacing-sm);
  margin: 0 var(--ui-spacing-md) var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-warning-light);
  align-items: center;
  border-left: 6rpx solid var(--ui-color-warning);
  border-radius: var(--ui-radius-md);

  &__text {
    flex: 1;
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-xs);
  }

  &__action {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-normal);
  }
}

.shop {
  margin: 0 var(--ui-spacing-md) var(--ui-spacing-md);
  overflow: hidden;
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);

  &__head {
    display: flex;
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
    align-items: center;
    border-bottom: 1rpx solid var(--ui-color-border-light);
    justify-content: space-between;
  }

  &__head-left {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
  }
}

.row {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  align-items: center;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: 0;
  }

  &__image {
    position: relative;
  }

  &__stock {
    left: 0;
    color: var(--ui-color-text-inverse);
    right: 0;
    bottom: 0;
    padding: var(--ui-spacing-xxs);
    position: absolute;
    font-size: 18rpx;
    background: var(--ui-color-danger);
    text-align: center;
    border-radius: 0 0 var(--ui-radius-md) var(--ui-radius-md);
  }

  &__detail {
    gap: var(--ui-spacing-xs);
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__sku {
    gap: var(--ui-spacing-xxs);
    display: flex;
    padding: var(--ui-spacing-xxs) var(--ui-spacing-sm);
    align-self: flex-start;
    background: var(--ui-color-background-section);
    align-items: center;
    border-radius: var(--ui-radius-sm);
  }

  &__sku-text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__promo {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
  }

  &__promo-text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__price {
    gap: var(--ui-spacing-xxs);
    color: var(--ui-color-danger);
    display: flex;
    align-items: baseline;
  }

  &__currency {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-bold);
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__origin {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
    margin-left: var(--ui-spacing-xs);
    text-decoration: line-through;
  }
}

.swipe-act {
  gap: var(--ui-spacing-xs);
  width: 140rpx;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &--favor {
    background: var(--ui-color-warning);
  }

  &--del {
    background: var(--ui-color-danger);
  }

  &__text {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-xs);
  }
}

.invalid {
  margin: 0 var(--ui-spacing-md) var(--ui-spacing-md);
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-sm);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }

  &__clear {
    color: var(--ui-color-primary);
    font-size: var(--ui-font-size-xs);
  }

  &__item {
    gap: var(--ui-spacing-md);
    display: flex;
    padding: var(--ui-spacing-sm) 0;
    align-items: center;
    border-bottom: 1rpx solid var(--ui-color-border-light);

    &:last-child {
      border-bottom: 0;
    }
  }

  &__info {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__reason {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.recommend {
  margin: var(--ui-spacing-xl) var(--ui-spacing-md) 0;

  &__head {
    gap: var(--ui-spacing-md);
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
  }

  &__line {
    flex: 1;
    height: 2rpx;
    background: var(--ui-color-border-light);
  }

  &__title {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__grid {
    gap: var(--ui-spacing-sm);
    display: flex;
    flex-wrap: wrap;
  }
}

.recommend-item {
  width: calc(50% - var(--ui-spacing-xs));
  overflow: hidden;
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-md);

  &__body {
    gap: var(--ui-spacing-sm);
    display: flex;
    padding: var(--ui-spacing-md);
    flex-direction: column;
  }

  &__price {
    gap: var(--ui-spacing-xxs);
    color: var(--ui-color-danger);
    display: flex;
    align-items: baseline;
  }

  &__currency {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-bold);
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-md);
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
  align-items: center;

  &__all {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
  }

  &__all-text {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-xs);
  }

  &__price {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }

  &__total-row {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: baseline;
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xl);
    font-weight: var(--ui-font-weight-bold);
  }

  &__discount {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__edit {
    gap: var(--ui-spacing-sm);
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
