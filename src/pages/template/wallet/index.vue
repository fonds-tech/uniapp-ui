<template>
  <view class="page">
    <!-- 顶部：渐变 + 资产 + 趋势 -->
    <view class="hero" :style="{ paddingTop: `${statusBarHeight + 40}px` }">
      <view class="hero__bg" />

      <view class="hero__topbar">
        <view class="hero__icon-btn" @click="onBack">
          <ui-icon name="arrow-left" size="44rpx" color="text-inverse" />
        </view>
        <text class="hero__title">我的钱包</text>
        <view class="hero__icon-btn" @click="onMore">
          <ui-icon name="ellipsis" size="44rpx" color="text-inverse" />
        </view>
      </view>

      <view class="hero__main">
        <view class="hero__label-row">
          <text class="hero__label">总资产 (元)</text>
          <view class="hero__eye" @click="showAsset = !showAsset">
            <ui-icon :name="showAsset ? 'eye' : 'closed-eye'" size="32rpx" color="rgba(255,255,255,0.7)" />
          </view>
        </view>
        <view class="hero__amount">
          <text v-if="!showAsset" class="hero__amount-text">****</text>
          <ui-number-roll v-else :value="totalAssets" :decimal-length="2" font-size="80rpx" font-weight="bold" color="text-inverse" />
        </view>
        <view class="hero__delta">
          <ui-icon name="arrow-up" size="20rpx" color="success" />
          <text class="hero__delta-text">今日 +¥ {{ formatMoney(12.80) }} (+0.14%)</text>
        </view>
      </view>

      <!-- 资产分布迷你图 -->
      <view class="hero__chart">
        <view v-for="c in composition" :key="c.label" class="chart-item">
          <view class="chart-item__bar-bg">
            <view class="chart-item__bar" :class="[`chart-item__bar--${c.color}`]" :style="{ width: `${c.percent}%` }" />
          </view>
          <text class="chart-item__label">{{ c.label }}</text>
          <text class="chart-item__value">¥ {{ formatMoney(c.value) }}</text>
        </view>
      </view>
    </view>

    <view class="content">
      <!-- 收益概览 -->
      <view class="overview">
        <view class="overview__item">
          <text class="overview__label">今日收益</text>
          <text class="overview__value overview__value--up">+¥ {{ formatMoney(12.80) }}</text>
          <text class="overview__sub">较昨日 +5.2%</text>
        </view>
        <view class="overview__divider" />
        <view class="overview__item">
          <text class="overview__label">累计收益</text>
          <text class="overview__value">¥ {{ formatMoney(420.50) }}</text>
          <text class="overview__sub">年化 4.8%</text>
        </view>
        <view class="overview__divider" />
        <view class="overview__item">
          <text class="overview__label">可提现</text>
          <text class="overview__value">¥ {{ formatMoney(2842.50) }}</text>
          <text class="overview__sub">实时到账</text>
        </view>
      </view>

      <!-- 快捷入口 -->
      <view class="quick">
        <view v-for="q in quickEntries" :key="q.label" class="quick__item" @click="onQuick(q)">
          <view class="quick__icon" :class="[`quick__icon--${q.color}`]">
            <ui-icon :name="q.icon" size="44rpx" :color="q.color" />
          </view>
          <text class="quick__label">{{ q.label }}</text>
          <ui-tag v-if="q.tag" :type="q.tagType" :custom-style="{ marginTop: 'var(--ui-spacing-xs)' }">{{ q.tag }}</ui-tag>
        </view>
      </view>

      <!-- 理财推荐 -->
      <view class="invest">
        <view class="invest__head">
          <view>
            <text class="invest__title">理财推荐</text>
            <text class="invest__sub">精选稳健产品</text>
          </view>
          <view class="invest__more" @click="onInvestMore">
            <text class="invest__more-text">更多</text>
            <ui-icon name="arrow" size="24rpx" color="text-tertiary" />
          </view>
        </view>

        <view class="invest__list">
          <view v-for="p in products" :key="p.id" class="product" @click="onProduct(p)">
            <view class="product__rate">
              <text class="product__rate-num">{{ p.rate }}</text>
              <text class="product__rate-unit">%</text>
            </view>
            <view class="product__info">
              <view class="product__title-row">
                <text class="product__title">{{ p.name }}</text>
                <ui-tag :type="p.tagType" plain>{{ p.tag }}</ui-tag>
              </view>
              <text class="product__desc">{{ p.desc }}</text>
              <view class="product__meta">
                <text class="product__meta-item">期限 {{ p.term }}</text>
                <text class="product__meta-item">起投 ¥{{ p.min }}</text>
              </view>
            </view>
            <ui-icon name="arrow" size="32rpx" color="text-tertiary" />
          </view>
        </view>
      </view>

      <!-- 账单列表 -->
      <view class="bills">
        <view class="bills__head">
          <view class="bills__head-left">
            <text class="bills__title">交易明细</text>
            <text class="bills__count">共 {{ filteredBills.length }} 笔</text>
          </view>
          <ui-segmented v-model="filter" :options="filterOptions" size="small" />
        </view>

        <view v-for="(group, idx) in groupedBills" :key="idx" class="bills__group">
          <text class="bills__date">{{ group.date }}</text>
          <view v-for="bill in group.items" :key="bill.id" class="bill" @click="onBillClick(bill)">
            <view class="bill__icon" :class="[`bill__icon--${bill.color}`]">
              <ui-icon :name="bill.icon" size="36rpx" :color="bill.color" />
            </view>
            <view class="bill__info">
              <text class="bill__title">{{ bill.title }}</text>
              <view class="bill__sub">
                <text class="bill__merchant">{{ bill.merchant }}</text>
                <ui-tag v-if="bill.status === 'pending'" type="warning" plain>{{ bill.statusLabel }}</ui-tag>
                <ui-tag v-else-if="bill.status === 'fail'" type="danger" plain>{{ bill.statusLabel }}</ui-tag>
              </view>
            </view>
            <view class="bill__right">
              <text class="bill__amount" :class="[bill.amount > 0 ? 'bill__amount--up' : '']">
                {{ bill.amount > 0 ? "+" : "" }}{{ formatMoney(bill.amount) }}
              </text>
              <text class="bill__time">{{ bill.time }}</text>
            </view>
          </view>
        </view>

        <ui-empty v-if="!filteredBills.length" description="暂无相关账单" />
      </view>
    </view>

    <!-- 充值 / 提现 弹窗 -->
    <ui-popup v-model:show="showAction" position="bottom" round>
      <view class="action">
        <view class="action__head">
          <text class="action__title">{{ actionType === "topup" ? "充值" : "提现" }}</text>
          <view class="action__close" @click="showAction = false">
            <ui-icon name="cross" size="36rpx" color="text-secondary" />
          </view>
        </view>

        <view class="action__amount-row">
          <text class="action__symbol">¥</text>
          <ui-input v-model="amount" type="digit" :show-border="false" placeholder="0.00" :custom-style="{ flex: 1, background: 'transparent', fontSize: '64rpx', fontWeight: 'bold' }" />
        </view>

        <view class="action__quick">
          <view v-for="q in [100, 500, 1000, 5000]" :key="q" class="action__quick-item" @click="amount = String(q)">
            <text>¥ {{ formatMoney(q, 0) }}</text>
          </view>
        </view>

        <ui-cell title="支付方式" :value="actionType === 'topup' ? '微信支付' : '尾号 8888 招商银行'" is-link />

        <view class="action__footer">
          <ui-button block type="primary" size="large" radius="48rpx" @click="onConfirmAction">确认{{ actionType === "topup" ? "充值" : "提现" }}</ui-button>
        </view>
      </view>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { useSystemInfo } from "@/uni_modules/uniapp-ui/hooks"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "我的钱包", navigationStyle: "custom" },
})

const toast = useToast()
const systemInfo = useSystemInfo()
const statusBarHeight = computed(() => systemInfo.statusBarHeight || 0)

const showAsset = ref(true)
const showAction = ref(false)
const actionType = ref<"topup" | "withdraw">("topup")
const amount = ref("")

const totalAssets = 28942.50

const composition = [
  { label: "活期", value: 8942.5, percent: 31, color: "info" },
  { label: "定期", value: 12000.0, percent: 41, color: "primary" },
  { label: "基金", value: 5500.0, percent: 19, color: "warning" },
  { label: "股票", value: 2500.0, percent: 9, color: "danger" },
]

const quickEntries = [
  { key: "topup", label: "充值", icon: "arrow-down", color: "primary", tag: "免手续费", tagType: "primary" as const },
  { key: "withdraw", label: "提现", icon: "arrow-up", color: "warning" },
  { key: "transfer", label: "转账", icon: "exchange", color: "success" },
  { key: "card", label: "银行卡", icon: "card", color: "info", tag: "2 张", tagType: "info" as const },
  { key: "bill", label: "账单", icon: "orders-o", color: "danger" },
]

const products = [
  { id: 1, name: "余额宝", desc: "7 日年化 · 灵活存取", tag: "活期", tagType: "info" as const, rate: 4.85, term: "活期", min: "0.01" },
  { id: 2, name: "稳健 90 日", desc: "中低风险 · R2", tag: "热销", tagType: "danger" as const, rate: 5.12, term: "90 天", min: "100" },
  { id: 3, name: "精选指数基金", desc: "跟踪沪深 300 · R3", tag: "推荐", tagType: "warning" as const, rate: 8.42, term: "1 年", min: "10" },
]

const filterOptions = [
  { label: "全部", value: "all" },
  { label: "支出", value: "out" },
  { label: "收入", value: "in" },
]
const filter = ref("all")

const allBills = [
  { id: 1, title: "美团外卖", merchant: "麦当劳 · 万象天地店", icon: "bag", color: "warning", amount: -42.5, time: "12:18", date: "2026-05-12", status: "success", statusLabel: "" },
  { id: 2, title: "工资入账", merchant: "腾讯科技 · 月薪", icon: "balance-o", color: "success", amount: 18500.0, time: "09:00", date: "2026-05-12", status: "success", statusLabel: "" },
  { id: 3, title: "淘宝订单", merchant: "无线降噪耳机 599 元", icon: "cart", color: "primary", amount: -599.0, time: "20:42", date: "2026-05-11", status: "pending", statusLabel: "未确认" },
  { id: 4, title: "转账给王红", merchant: "尾号 8888", icon: "exchange", color: "info", amount: -500.0, time: "16:30", date: "2026-05-11", status: "success", statusLabel: "" },
  { id: 5, title: "话费充值", merchant: "138****8888", icon: "phone", color: "danger", amount: -100.0, time: "10:00", date: "2026-05-11", status: "fail", statusLabel: "失败" },
  { id: 6, title: "理财收益", merchant: "余额宝", icon: "arrow-up", color: "success", amount: 12.8, time: "00:05", date: "2026-05-11", status: "success", statusLabel: "" },
  { id: 7, title: "电费缴纳", merchant: "深圳供电局", icon: "bulb-o", color: "warning", amount: -189.5, time: "21:00", date: "2026-05-10", status: "success", statusLabel: "" },
  { id: 8, title: "退款", merchant: "京东订单 - 蓝牙音箱", icon: "refund-o", color: "success", amount: 249.0, time: "14:18", date: "2026-05-10", status: "success", statusLabel: "" },
  { id: 9, title: "信用卡还款", merchant: "招商银行 · 尾号 8888", icon: "card", color: "info", amount: -3280.0, time: "08:00", date: "2026-05-09", status: "success", statusLabel: "" },
  { id: 10, title: "滴滴出行", merchant: "深圳湾 → 南山", icon: "cart", color: "primary", amount: -28.5, time: "22:15", date: "2026-05-09", status: "success", statusLabel: "" },
]

const filteredBills = computed(() => {
  if (filter.value === "in") return allBills.filter((b) => b.amount > 0)
  if (filter.value === "out") return allBills.filter((b) => b.amount < 0)
  return allBills
})

const groupedBills = computed(() => {
  const map: Record<string, typeof allBills> = {}
  filteredBills.value.forEach((b) => {
    if (!map[b.date]) map[b.date] = []
    map[b.date].push(b)
  })
  return Object.keys(map).map((date) => ({ date: formatDate(date), items: map[date] }))
})

function formatMoney(v: number, decimals = 2) {
  return Math.abs(v).toLocaleString("zh-CN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function formatDate(d: string) {
  const today = new Date().toISOString().slice(0, 10)
  if (d === today) return "今天"
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (d === yesterday) return "昨天"
  return `${d.slice(5).replace("-", " 月 ")} 日`
}

function onBack() {
  uni.navigateBack()
}

function onMore() {
  toast.text("更多")
}

function onQuick(q: { key: string; label: string }) {
  if (q.key === "topup" || q.key === "withdraw") {
    actionType.value = q.key
    amount.value = ""
    showAction.value = true
  } else {
    toast.text(q.label)
  }
}

function onConfirmAction() {
  if (!amount.value || +amount.value <= 0) {
    toast.fail("请输入金额")
    return
  }
  showAction.value = false
  toast.success(`${actionType.value === "topup" ? "充值" : "提现"} ¥${amount.value} 成功`)
}

function onProduct(p: { name: string }) {
  toast.text(p.name)
}

function onInvestMore() {
  toast.text("查看全部理财")
}

function onBillClick(b: { title: string }) {
  toast.text(b.title)
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

.hero {
  padding: 0 var(--ui-spacing-md) var(--ui-spacing-xxl);
  overflow: hidden;
  position: relative;

  &__bg {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 0;
    position: absolute;
    background: linear-gradient(160deg, var(--ui-gray-8) 0%, var(--ui-color-primary) 100%);
  }

  &__topbar {
    display: flex;
    z-index: 1;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }

  &__icon-btn {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__main {
    z-index: 1;
    position: relative;
    margin-top: var(--ui-spacing-xxl);
  }

  &__label-row {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;
  }

  &__label {
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--ui-font-size-xs);
  }

  &__eye {
    padding: var(--ui-spacing-xxs);
  }

  &__amount {
    display: flex;
    margin-top: var(--ui-spacing-sm);
    align-items: baseline;
  }

  &__amount-text {
    color: var(--ui-color-text-inverse);
    font-size: 80rpx;
    font-weight: var(--ui-font-weight-bold);
  }

  &__delta {
    gap: var(--ui-spacing-xxs);
    display: flex;
    margin-top: var(--ui-spacing-sm);
    align-items: center;
  }

  &__delta-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: var(--ui-font-size-xs);
  }

  &__chart {
    padding: var(--ui-spacing-md);
    z-index: 1;
    position: relative;
    background: rgba(255, 255, 255, 0.12);
    margin-top: var(--ui-spacing-xl);
    border-radius: var(--ui-radius-lg);
    backdrop-filter: blur(20rpx);
  }
}

.chart-item {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-xs) 0;
  align-items: center;

  &__bar-bg {
    flex: 1;
    height: 12rpx;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.15);
    border-radius: var(--ui-radius-xs);
  }

  &__bar {
    height: 100%;
    transition: width 0.4s;
    border-radius: var(--ui-radius-xs);

    &--primary {
      background: var(--ui-color-primary);
    }

    &--success {
      background: var(--ui-color-success);
    }

    &--warning {
      background: var(--ui-color-warning);
    }

    &--danger {
      background: var(--ui-color-danger);
    }

    &--info {
      background: var(--ui-color-info);
    }
  }

  &__label {
    color: rgba(255, 255, 255, 0.85);
    width: 80rpx;
    font-size: var(--ui-font-size-xs);
  }

  &__value {
    color: var(--ui-color-text-inverse);
    width: 160rpx;
    font-size: var(--ui-font-size-xs);
    text-align: right;
    font-weight: var(--ui-font-weight-normal);
  }
}

.content {
  padding: 0 var(--ui-spacing-md) var(--ui-spacing-xl);
  z-index: 2;
  position: relative;
  margin-top: -40rpx;
}

.overview {
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);
  margin-bottom: var(--ui-spacing-md);

  &__item {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__label {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__value {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);

    &--up {
      color: var(--ui-color-danger);
    }
  }

  &__sub {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__divider {
    width: 2rpx;
    height: 80rpx;
    align-self: center;
    background: var(--ui-color-border-light);
  }
}

.quick {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-lg);
  flex-wrap: wrap;
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);
  margin-bottom: var(--ui-spacing-md);
  justify-content: space-around;

  &__item {
    gap: var(--ui-spacing-sm);
    width: 18%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__icon {
    width: 96rpx;
    height: 96rpx;
    display: flex;
    align-items: center;
    border-radius: var(--ui-radius-lg);
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

.invest {
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
    display: block;
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__sub {
    color: var(--ui-color-text-tertiary);
    display: block;
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xxs);
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

  &__list {
    gap: var(--ui-spacing-md);
    display: flex;
    flex-direction: column;
  }
}

.product {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  align-items: center;
  border-radius: var(--ui-radius-md);

  &__rate {
    gap: var(--ui-spacing-xxs);
    display: flex;
    align-items: baseline;
  }

  &__rate-num {
    color: var(--ui-color-danger);
    font-size: 44rpx;
    font-weight: var(--ui-font-weight-bold);
  }

  &__rate-unit {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xs);
  }

  &__info {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title-row {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }

  &__desc {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__meta {
    gap: var(--ui-spacing-md);
    display: flex;
    margin-top: var(--ui-spacing-xxs);
  }

  &__meta-item {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.bills {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
    justify-content: space-between;
  }

  &__head-left {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: baseline;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__count {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__group {
    margin-top: var(--ui-spacing-sm);
  }

  &__date {
    color: var(--ui-color-text-tertiary);
    display: block;
    padding: var(--ui-spacing-sm) 0;
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-normal);
  }
}

.bill {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md) 0;
  align-items: center;

  &__icon {
    width: 72rpx;
    height: 72rpx;
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

  &__info {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }

  &__sub {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
  }

  &__merchant {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__right {
    gap: var(--ui-spacing-xxs);
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }

  &__amount {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);

    &--up {
      color: var(--ui-color-danger);
    }
  }

  &__time {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.action {
  padding: var(--ui-spacing-lg);

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-lg);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__close {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__amount-row {
    gap: var(--ui-spacing-sm);
    display: flex;
    padding: var(--ui-spacing-lg) 0;
    align-items: center;
    border-bottom: 2rpx solid var(--ui-color-border-light);
  }

  &__symbol {
    color: var(--ui-color-text);
    font-size: 60rpx;
    font-weight: var(--ui-font-weight-bold);
  }

  &__quick {
    gap: var(--ui-spacing-sm);
    margin: var(--ui-spacing-md) 0 var(--ui-spacing-lg);
    display: flex;
  }

  &__quick-item {
    flex: 1;
    padding: var(--ui-spacing-sm) 0;
    background: var(--ui-color-background-section);
    text-align: center;
    border-radius: var(--ui-radius-md);
  }

  &__footer {
    margin-top: var(--ui-spacing-lg);
  }
}
</style>
