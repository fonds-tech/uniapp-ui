<template>
  <view class="page">
    <view class="hero">
      <view class="hero__head">
        <view class="hero__intro">
          <text class="hero__title">数据概览</text>
          <text class="hero__time">{{ now }}</text>
        </view>
        <ui-segmented v-model="range" :options="rangeOptions" size="small" />
      </view>

      <view class="hero__metrics">
        <view class="metric">
          <text class="metric__label">今日营收</text>
          <view class="metric__value">
            <text class="metric__symbol">¥</text>
            <ui-number-roll :value="revenue" :decimal-length="2" font-size="56rpx" font-weight="bold" color="text-inverse" />
          </view>
          <view class="metric__delta">
            <ui-icon name="arrow-up" size="20rpx" color="success" />
            <text class="metric__delta-text metric__delta-text--up">+12.5%</text>
          </view>
        </view>

        <view class="metric">
          <text class="metric__label">新增用户</text>
          <view class="metric__value">
            <ui-number-roll :value="newUsers" font-size="56rpx" font-weight="bold" color="text-inverse" />
          </view>
          <view class="metric__delta">
            <ui-icon name="arrow-down" size="20rpx" color="danger" />
            <text class="metric__delta-text metric__delta-text--down">-3.2%</text>
          </view>
        </view>
      </view>
    </view>

    <view class="content">
      <view class="quick-grid">
        <ui-grid :column="4" :gap="0" border>
          <ui-grid-item v-for="q in quickActions" :key="q.label" :icon="q.icon" :text="q.label" :icon-color="q.color" />
        </ui-grid>
      </view>

      <view class="chart">
        <view class="chart__head">
          <text class="chart__title">关键指标</text>
          <ui-popover v-model:show="showInfo" placement="bottom-end">
            <ui-icon name="info" size="36rpx" color="text-tertiary" />
            <template #content>
              <view class="popover">
                <text class="popover__text">数据每小时刷新一次，统计自零点起。</text>
              </view>
            </template>
          </ui-popover>
        </view>

        <view v-if="chartLoading" class="chart__loading">
          <ui-loading size="60rpx" color="primary" />
          <text class="chart__loading-text">加载中...</text>
        </view>
        <view v-else>
          <view class="chart__row">
            <view class="circle">
              <ui-circle :percent="78" stroke-width="10" size="160rpx" color="primary" />
              <text class="circle__value">78%</text>
              <text class="circle__label">订单完成率</text>
            </view>
            <view class="circle">
              <ui-circle :percent="92" stroke-width="10" size="160rpx" color="success" />
              <text class="circle__value">92%</text>
              <text class="circle__label">用户满意度</text>
            </view>
            <view class="circle">
              <ui-circle :percent="45" stroke-width="10" size="160rpx" color="warning" />
              <text class="circle__value">45%</text>
              <text class="circle__label">库存预警</text>
            </view>
          </view>

          <view class="arc-row">
            <view class="arc-item">
              <ui-arc :percent="68" stroke-width="14" size="200rpx" color="primary" :start-angle="180" :end-angle="0" />
              <text class="arc-item__value">68 / 100</text>
              <text class="arc-item__label">日 KPI</text>
            </view>
            <view class="arc-item">
              <ui-arc :percent="42" stroke-width="14" size="200rpx" color="warning" :start-angle="180" :end-angle="0" />
              <text class="arc-item__value">42 / 100</text>
              <text class="arc-item__label">周 KPI</text>
            </view>
          </view>
        </view>
      </view>

      <view class="progress-list">
        <text class="progress-list__title">渠道分布</text>
        <view v-for="ch in channels" :key="ch.name" class="progress-row">
          <view class="progress-row__head">
            <text class="progress-row__name">{{ ch.name }}</text>
            <text class="progress-row__value">{{ ch.value }}%</text>
          </view>
          <ui-progress :percent="ch.value" :color="ch.color" stroke-width="10rpx" />
        </view>
      </view>

      <view class="countdown-card">
        <view class="countdown-card__head">
          <ui-icon name="clock" size="36rpx" color="warning" />
          <text class="countdown-card__title">大促活动倒计时</text>
        </view>
        <ui-count-down :time="36 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" color="danger" font-size="32rpx" font-weight="bold" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "数据看板" },
})

const rangeOptions = [
  { label: "今日", value: "today" },
  { label: "本周", value: "week" },
  { label: "本月", value: "month" },
]
const range = ref("today")

const revenue = computed(() => (range.value === "today" ? 12856.32 : range.value === "week" ? 89342.18 : 356812.54))
const newUsers = computed(() => (range.value === "today" ? 248 : range.value === "week" ? 1820 : 7654))

const now = new Date().toLocaleString("zh-CN")

const showInfo = ref(false)
const chartLoading = ref(true)
setTimeout(() => (chartLoading.value = false), 800)

const quickActions = [
  { icon: "orders-o", label: "订单", color: "primary" },
  { icon: "balance-o", label: "财务", color: "warning" },
  { icon: "user-circle-o", label: "客户", color: "success" },
  { icon: "chart-trending-o", label: "报表", color: "danger" },
  { icon: "shop", label: "店铺", color: "info" },
  { icon: "gift", label: "活动", color: "primary" },
  { icon: "comment", label: "消息", color: "warning" },
  { icon: "setting", label: "设置", color: "info" },
]

const channels = [
  { name: "微信小程序", value: 45, color: "success" },
  { name: "APP", value: 28, color: "primary" },
  { name: "H5 网页", value: 18, color: "warning" },
  { name: "其他", value: 9, color: "info" },
]
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

.hero {
  padding: var(--ui-spacing-xl) var(--ui-spacing-md);
  // 品牌渐变：primary → primary-active 营造层次
  background: linear-gradient(135deg, var(--ui-color-primary), var(--ui-color-primary-active));

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-lg);
    justify-content: space-between;
  }

  &__intro {
    gap: var(--ui-spacing-xxs);
    display: flex;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__time {
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--ui-font-size-xs);
  }

  &__metrics {
    gap: var(--ui-spacing-md);
    display: flex;
  }
}

.metric {
  flex: 1;
  padding: var(--ui-spacing-md);
  background: rgba(255, 255, 255, 0.12);
  border-radius: var(--ui-radius-md);

  &__label {
    color: rgba(255, 255, 255, 0.8);
    display: block;
    font-size: var(--ui-font-size-xs);
    margin-bottom: var(--ui-spacing-xs);
  }

  &__value {
    color: var(--ui-color-text-inverse);
    display: flex;
    align-items: baseline;
  }

  &__symbol {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
    margin-right: var(--ui-spacing-xxs);
  }

  &__delta {
    gap: var(--ui-spacing-xxs);
    display: flex;
    margin-top: var(--ui-spacing-xs);
    align-items: center;
  }

  &__delta-text {
    font-size: var(--ui-font-size-xs);

    &--up {
      color: var(--ui-color-success);
    }

    &--down {
      color: var(--ui-color-danger);
    }
  }
}

.content {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md);
  flex-direction: column;
}

.quick-grid {
  overflow: hidden;
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);
}

.chart {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-lg);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &__loading {
    gap: var(--ui-spacing-md);
    display: flex;
    padding: var(--ui-spacing-xl) 0;
    align-items: center;
    flex-direction: column;
  }

  &__loading-text {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.circle {
  gap: var(--ui-spacing-xs);
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;

  // 在圆环正中央覆盖百分比
  &__value {
    top: 50%;
    color: var(--ui-color-text);
    position: absolute;
    font-size: var(--ui-font-size-md);
    transform: translateY(-100%);
    font-weight: var(--ui-font-weight-bold);
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-sm);
  }
}

.arc-row {
  gap: var(--ui-spacing-md);
  display: flex;
  margin-top: var(--ui-spacing-xl);
  justify-content: space-around;
}

.arc-item {
  gap: var(--ui-spacing-xs);
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;

  &__value {
    top: 60%;
    color: var(--ui-color-text);
    position: absolute;
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.progress-list {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);

  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
    margin-bottom: var(--ui-spacing-md);
  }
}

.progress-row {
  margin-bottom: var(--ui-spacing-md);

  &:last-child {
    margin-bottom: 0;
  }

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-xs);
    justify-content: space-between;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
  }

  &__value {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.countdown-card {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);

  &__head {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }
}

.popover {
  padding: var(--ui-spacing-md);
  max-width: 360rpx;

  &__text {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-xs);
    line-height: 1.5;
  }
}
</style>
