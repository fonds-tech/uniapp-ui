<template>
  <view class="page">
    <!-- 顶部背景层（含状态栏） -->
    <view class="hero">
      <view class="hero__bg" />

      <ui-navbar show-back fixed placeholder background="primary" title-color="text-inverse" back-icon-color="#fff" :custom-back="onBack">
        <template #right>
          <view class="hero__top-actions">
            <view class="hero__icon-btn" @click="onQrcode">
              <ui-icon name="qrcode" size="40rpx" color="text-inverse" />
            </view>
            <view class="hero__icon-btn" @click="onSettings">
              <ui-icon name="setting" size="40rpx" color="text-inverse" />
            </view>
          </view>
        </template>
      </ui-navbar>

      <view class="hero__profile">
        <view class="hero__avatar-wrap">
          <ui-avatar :url="user.avatar" size="160rpx" :custom-style="{ border: '6rpx solid rgba(255,255,255,0.5)' }" />
          <view class="hero__level">
            <ui-icon name="diamond" size="20rpx" color="text-inverse" />
            <text class="hero__level-text">Lv.{{ user.level }}</text>
          </view>
        </view>

        <view class="hero__info">
          <view class="hero__name-row">
            <text class="hero__name">{{ user.name }}</text>
            <ui-tag v-if="user.vip" type="warning" :custom-style="{ marginLeft: 'var(--ui-spacing-xs)' }">VIP</ui-tag>
          </view>
          <text class="hero__bio">{{ user.bio }}</text>
          <view class="hero__meta">
            <view class="hero__meta-item">
              <ui-icon name="location" size="20rpx" color="text-inverse" />
              <text class="hero__meta-text">{{ user.location }}</text>
            </view>
            <view class="hero__meta-item">
              <ui-icon name="calendar" size="20rpx" color="text-inverse" />
              <text class="hero__meta-text">{{ user.joinDate }} 加入</text>
            </view>
          </view>
        </view>

        <ui-button size="small" :custom-style="{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: 'none' }" radius="32rpx" @click="onEdit"> 编辑资料 </ui-button>
      </view>

      <view class="hero__stats">
        <view v-for="(s, idx) in stats" :key="s.label" class="stat" @click="onStatClick(s)">
          <ui-number-roll :value="s.value" font-size="40rpx" font-weight="bold" color="text-inverse" />
          <text class="stat__label">{{ s.label }}</text>
          <ui-divider
            v-if="idx < stats.length - 1"
            direction="vertical"
            :custom-style="{ height: '56rpx', background: 'rgba(255,255,255,0.18)', position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }"
          />
        </view>
      </view>
    </view>

    <view class="content">
      <!-- 会员卡 -->
      <view class="vip-card">
        <view class="vip-card__head">
          <view>
            <text class="vip-card__title">尊享会员</text>
            <text class="vip-card__sub">已开通 · {{ user.vipExpiry }} 到期</text>
          </view>
          <ui-icon name="diamond" size="64rpx" color="rgba(255,255,255,0.4)" />
        </view>
        <view class="vip-card__perks">
          <view v-for="p in perks" :key="p" class="vip-card__perk">{{ p }}</view>
        </view>
        <view class="vip-card__footer">
          <text class="vip-card__hint">还有 {{ user.vipDays }} 天到期</text>
          <ui-button size="small" radius="32rpx" :custom-style="{ background: '#fff', color: '#b45309', border: 'none' }" @click="onRenew">续费</ui-button>
        </view>
      </view>

      <!-- 我的订单快捷区 -->
      <view class="orders-card">
        <view class="orders-card__head">
          <text class="orders-card__title">我的订单</text>
          <view class="orders-card__more" @click="onAllOrders">
            <text class="orders-card__more-text">全部订单</text>
            <ui-icon name="arrow" size="24rpx" color="text-tertiary" />
          </view>
        </view>
        <ui-grid :column="4" :gap="0" :border="false">
          <ui-grid-item v-for="o in orderTabs" :key="o.key" @click="onOrderTab(o)">
            <view class="order-tab">
              <ui-badge :value="o.count" :show="o.count > 0">
                <ui-icon :name="o.icon" size="48rpx" :color="o.color" />
              </ui-badge>
              <text class="order-tab__label">{{ o.label }}</text>
            </view>
          </ui-grid-item>
        </ui-grid>
      </view>

      <!-- 资产快览 -->
      <view class="assets">
        <view class="assets__item" @click="onAsset('wallet')">
          <view class="assets__icon assets__icon--amber">
            <ui-icon name="balance-o" size="36rpx" color="warning" />
          </view>
          <view class="assets__info">
            <text class="assets__label">钱包余额</text>
            <text class="assets__value">¥ {{ formatMoney(8942.5) }}</text>
          </view>
        </view>
        <view class="assets__item" @click="onAsset('coupon')">
          <view class="assets__icon assets__icon--rose">
            <ui-icon name="coupon" size="36rpx" color="danger" />
          </view>
          <view class="assets__info">
            <text class="assets__label">优惠券</text>
            <text class="assets__value">{{ 12 }} 张</text>
          </view>
        </view>
        <view class="assets__item" @click="onAsset('points')">
          <view class="assets__icon assets__icon--purple">
            <ui-icon name="gift" size="36rpx" color="primary" />
          </view>
          <view class="assets__info">
            <text class="assets__label">积分</text>
            <text class="assets__value">{{ formatMoney(28500, 0) }}</text>
          </view>
        </view>
      </view>

      <!-- 服务菜单 -->
      <view class="service">
        <text class="service__title">常用服务</text>
        <ui-grid :column="4" :gap="0" :border="false">
          <ui-grid-item v-for="m in services" :key="m.label" @click="onMenu(m)">
            <view class="service-item">
              <view class="service-item__icon" :class="[`service-item__icon--${m.color}`]">
                <ui-icon :name="m.icon" size="40rpx" :color="m.color" />
              </view>
              <text class="service-item__label">{{ m.label }}</text>
            </view>
          </ui-grid-item>
        </ui-grid>
      </view>

      <!-- 推广 / 工具 -->
      <ui-cell-group :custom-style="{ marginTop: 'var(--ui-spacing-md)', borderRadius: 'var(--ui-radius-lg)', overflow: 'hidden' }">
        <ui-cell v-for="t in tools" :key="t.title" :title="t.title" :label="t.desc" is-link @click="onTool(t)">
          <template #icon>
            <view class="tool-icon" :class="[`tool-icon--${t.color}`]">
              <ui-icon :name="t.icon" size="32rpx" :color="t.color" />
            </view>
          </template>
          <template v-if="t.badge" #value>
            <ui-tag :type="t.badgeType">{{ t.badge }}</ui-tag>
          </template>
        </ui-cell>
      </ui-cell-group>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "用户资料页", navigationStyle: "custom" },
})

const toast = useToast()

const user = {
  name: "Alex Chen",
  bio: "数字游民 · UI / UX 设计师 · 喜欢极简生活",
  avatar: "https://i.pravatar.cc/240?img=68",
  location: "深圳",
  joinDate: "2023-03",
  level: 18,
  vip: true,
  vipExpiry: "2026-08-12",
  vipDays: 92,
}

const stats = [
  { label: "关注", value: 128 },
  { label: "粉丝", value: 3456 },
  { label: "获赞", value: 892 },
  { label: "动态", value: 64 },
]

const perks = ["免邮特权", "积分翻倍", "客服优先", "专属客服"]

const orderTabs = [
  { key: "pending", label: "待付款", icon: "balance-o", color: "warning", count: 2 },
  { key: "shipping", label: "待发货", icon: "bag-o", color: "primary", count: 1 },
  { key: "receiving", label: "待收货", icon: "cart", color: "success", count: 3 },
  { key: "review", label: "待评价", icon: "edit", color: "info", count: 5 },
]

const services = [
  { label: "我的收藏", icon: "like", color: "danger" },
  { label: "浏览记录", icon: "eye", color: "primary" },
  { label: "地址管理", icon: "location", color: "success" },
  { label: "我的足迹", icon: "aim", color: "warning" },
  { label: "邀请好友", icon: "user-o", color: "primary" },
  { label: "退款 / 售后", icon: "refund-o", color: "danger" },
  { label: "意见反馈", icon: "chat", color: "info" },
  { label: "在线客服", icon: "service", color: "success" },
]

const tools = [
  { title: "成长中心", desc: "查看等级与积分进度", icon: "diamond", color: "warning", badge: `Lv.${user.level}`, badgeType: "warning" as const },
  { title: "签到领奖", desc: "已连续签到 7 天", icon: "calendar", color: "primary", badge: "+10", badgeType: "primary" as const },
  { title: "认证中心", desc: "实名认证 / 商家认证", icon: "award-o", color: "success" },
  { title: "我的店铺", desc: "管理商品与订单", icon: "shop", color: "danger" },
]

function formatMoney(v: number, decimals = 2) {
  return v.toLocaleString("zh-CN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function onBack() {
  uni.navigateBack()
}

function onQrcode() {
  uni.navigateTo({ url: "/pages/template/qrcode-share/index" })
}

function onSettings() {
  uni.navigateTo({ url: "/pages/template/settings/index" })
}

function onEdit() {
  toast.text("编辑资料")
}

function onRenew() {
  toast.success("跳转续费")
}

function onStatClick(s: { label: string }) {
  toast.text(s.label)
}

function onAllOrders() {
  uni.navigateTo({ url: "/pages/template/order-list/index" })
}

function onOrderTab(o: { label: string }) {
  toast.text(o.label)
}

function onAsset(type: string) {
  if (type === "wallet") uni.navigateTo({ url: "/pages/template/wallet/index" })
  else toast.text(type)
}

function onMenu(m: { label: string }) {
  toast.text(m.label)
}

function onTool(t: { title: string }) {
  toast.text(t.title)
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

/* 顶部 hero */
.hero {
  padding: 0 var(--ui-spacing-md) 60rpx;
  overflow: hidden;
  position: relative;

  &__bg {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 0;
    position: absolute;
    background: linear-gradient(160deg, var(--ui-color-primary) 0%, var(--ui-color-primary-active) 100%);
  }

  &__top-actions {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
  }

  &__icon-btn {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__profile {
    gap: var(--ui-spacing-md);
    display: flex;
    z-index: 1;
    position: relative;
    align-items: center;
  }

  &__avatar-wrap {
    position: relative;
  }

  &__level {
    gap: var(--ui-spacing-xxs);
    left: 50%;
    bottom: -8rpx;
    display: flex;
    padding: var(--ui-spacing-xxs) var(--ui-spacing-xs);
    position: absolute;
    transform: translateX(-50%);
    background: linear-gradient(90deg, var(--ui-color-warning), var(--ui-color-danger));
    align-items: center;
    white-space: nowrap;
    border-radius: var(--ui-radius-sm);
  }

  &__level-text {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-bold);
    white-space: nowrap;
  }

  &__info {
    gap: var(--ui-spacing-xs);
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__name-row {
    display: flex;
    align-items: center;
  }

  &__name {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-xl);
    font-weight: var(--ui-font-weight-bold);
  }

  &__bio {
    color: rgba(255, 255, 255, 0.85);
    overflow: hidden;
    font-size: var(--ui-font-size-xs);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__meta {
    gap: var(--ui-spacing-md);
    display: flex;
    margin-top: var(--ui-spacing-xxs);
  }

  &__meta-item {
    gap: var(--ui-spacing-xxs);
    display: flex;
    align-items: center;
  }

  &__meta-text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 20rpx;
  }

  &__stats {
    display: flex;
    padding: var(--ui-spacing-lg) 0;
    z-index: 1;
    position: relative;
    background: rgba(255, 255, 255, 0.12);
    margin-top: var(--ui-spacing-xl);
    border-radius: var(--ui-radius-lg);
    backdrop-filter: blur(20rpx);
  }
}

.stat {
  gap: var(--ui-spacing-xs);
  flex: 1;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;

  &__label {
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--ui-font-size-xs);
  }
}

/* 内容区 */
.content {
  padding: 0 var(--ui-spacing-md) var(--ui-spacing-xl);
  z-index: 2;
  position: relative;
  margin-top: -40rpx;
}

/* VIP 卡 */
.vip-card {
  padding: var(--ui-spacing-lg);
  margin-bottom: var(--ui-spacing-md);
  // VIP 卡保留深色品牌渐变以凸显尊享感
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, var(--ui-gray-8) 0%, var(--ui-gray-7) 100%);
  box-shadow: var(--ui-shadow-md);
  border-radius: var(--ui-radius-xl);

  &::before {
    top: -40rpx;
    right: -40rpx;
    width: 200rpx;
    height: 200rpx;
    content: "";
    position: absolute;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.3), transparent 70%);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    color: #fbbf24;
    display: block;
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__sub {
    color: rgba(255, 255, 255, 0.5);
    display: block;
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xxs);
  }

  &__perks {
    gap: var(--ui-spacing-sm);
    display: flex;
    flex-wrap: wrap;
    margin-top: var(--ui-spacing-md);
  }

  &__perk {
    color: rgba(255, 255, 255, 0.85);
    padding: var(--ui-spacing-xxs) var(--ui-spacing-sm);
    font-size: var(--ui-font-size-xs);
    background: rgba(255, 255, 255, 0.08);
    border-radius: var(--ui-radius-sm);
  }

  &__footer {
    display: flex;
    margin-top: var(--ui-spacing-md);
    align-items: center;
    justify-content: space-between;
  }

  &__hint {
    color: rgba(255, 255, 255, 0.5);
    font-size: var(--ui-font-size-xs);
  }
}

/* 订单快捷区 */
.orders-card {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);
  margin-bottom: var(--ui-spacing-md);

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__more {
    gap: var(--ui-spacing-xxs);
    display: flex;
    align-items: center;
  }

  &__more-text {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.order-tab {
  gap: var(--ui-spacing-sm);
  display: flex;
  padding: var(--ui-spacing-sm) 0;
  align-items: center;
  flex-direction: column;

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

/* 资产区 */
.assets {
  gap: var(--ui-spacing-xs);
  display: flex;
  margin-bottom: var(--ui-spacing-md);

  &__item {
    gap: var(--ui-spacing-xs);
    flex: 1;
    display: flex;
    padding: var(--ui-spacing-md) var(--ui-spacing-sm);
    min-width: 0;
    background: var(--ui-color-background);
    box-shadow: var(--ui-shadow-xs);
    align-items: center;
    border-radius: var(--ui-radius-lg);
  }

  &__icon {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;

    &--amber {
      background: var(--ui-color-warning-light);
    }

    &--rose {
      background: var(--ui-color-danger-light);
    }

    &--purple {
      background: var(--ui-color-primary-light);
    }
  }

  &__info {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__label {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__value {
    color: var(--ui-color-text);
    overflow: hidden;
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

/* 服务菜单 */
.service {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);
  margin-bottom: var(--ui-spacing-md);

  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
    margin-bottom: var(--ui-spacing-md);
  }
}

.service-item {
  gap: var(--ui-spacing-sm);
  display: flex;
  padding: var(--ui-spacing-md) 0;
  align-items: center;
  flex-direction: column;

  &__icon {
    width: 88rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    border-radius: var(--ui-radius-md);
    justify-content: center;

    &--primary {
      background: var(--ui-color-primary-light);
    }

    &--success {
      background: var(--ui-color-success-light);
    }

    &--warning {
      background: var(--ui-color-warning-light);
    }

    &--danger {
      background: var(--ui-color-danger-light);
    }

    &--info {
      background: var(--ui-color-info-light);
    }
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

/* 工具 cell icon */
.tool-icon {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  margin-right: var(--ui-spacing-md);
  border-radius: var(--ui-radius-md);
  justify-content: center;

  &--primary {
    background: var(--ui-color-primary-light);
  }

  &--success {
    background: var(--ui-color-success-light);
  }

  &--warning {
    background: var(--ui-color-warning-light);
  }

  &--danger {
    background: var(--ui-color-danger-light);
  }
}
</style>
