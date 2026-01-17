<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-count-down :time="time" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义格式">
      <demo-block direction="column" align="start" :gap="16">
        <ui-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
        <ui-count-down :time="time" format="HH:mm:ss" />
        <ui-count-down :time="time" format="mm:ss:SSS" millisecond />
      </demo-block>
    </demo-section>

    <demo-section title="毫秒级渲染">
      <demo-block>
        <ui-count-down :time="time" millisecond format="HH:mm:ss:SSS" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block>
        <ui-count-down :time="time">
          <template #default="{ time: current }">
            <text class="countdown-block">{{ current.hours }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-block">{{ current.minutes }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-block">{{ current.seconds }}</text>
          </template>
        </ui-count-down>
      </demo-block>
    </demo-section>

    <!-- 新增：更多自定义样式 -->
    <demo-section title="样式变体">
      <demo-block direction="column" align="start" :gap="24">
        <view class="countdown-row">
          <text class="countdown-row__label">圆形样式:</text>
          <ui-count-down :time="time">
            <template #default="{ time: current }">
              <text class="countdown-circle">{{ current.hours }}</text>
              <text class="countdown-separator">:</text>
              <text class="countdown-circle">{{ current.minutes }}</text>
              <text class="countdown-separator">:</text>
              <text class="countdown-circle">{{ current.seconds }}</text>
            </template>
          </ui-count-down>
        </view>
        <view class="countdown-row">
          <text class="countdown-row__label">渐变样式:</text>
          <ui-count-down :time="time">
            <template #default="{ time: current }">
              <text class="countdown-gradient">{{ current.hours }}</text>
              <text class="countdown-gradient-separator">时</text>
              <text class="countdown-gradient">{{ current.minutes }}</text>
              <text class="countdown-gradient-separator">分</text>
              <text class="countdown-gradient">{{ current.seconds }}</text>
              <text class="countdown-gradient-separator">秒</text>
            </template>
          </ui-count-down>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="手动控制">
      <demo-block direction="column" :gap="16">
        <ui-count-down ref="countDownRef" :time="3000" :auto-start="false" format="ss:SSS" millisecond @finish="onFinish" />
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" type="primary" @click="start">开始</ui-button>
          <ui-button size="small" type="warning" @click="pause">暂停</ui-button>
          <ui-button size="small" type="default" @click="reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：change 事件 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-count-down :time="eventTime" @change="onCountDownChange" @finish="onEventFinish" />
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义类名和样式 -->
    <demo-section title="自定义类名样式">
      <demo-block :cols="2" :gap="24">
        <view class="countdown-item">
          <ui-count-down :time="time" custom-class="my-countdown" />
          <text class="countdown-label">自定义类名</text>
        </view>
        <view class="countdown-item">
          <ui-count-down :time="time" :custom-style="{ color: '#ee0a24', fontSize: '36rpx', fontWeight: '600' }" />
          <text class="countdown-label">自定义样式</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：应用场景 -->
    <demo-section title="应用场景">
      <demo-block direction="column" :gap="24">
        <!-- 秒杀倒计时 -->
        <view class="scene-card scene-card--sale">
          <view class="scene-card__header">
            <text class="scene-card__title">限时秒杀</text>
            <ui-count-down :time="saleTime">
              <template #default="{ time: current }">
                <text class="sale-countdown-block">{{ padZero(current.hours) }}</text>
                <text class="sale-countdown-colon">:</text>
                <text class="sale-countdown-block">{{ padZero(current.minutes) }}</text>
                <text class="sale-countdown-colon">:</text>
                <text class="sale-countdown-block">{{ padZero(current.seconds) }}</text>
              </template>
            </ui-count-down>
          </view>
          <text class="scene-card__desc">距离活动结束</text>
        </view>

        <!-- 验证码倒计时 -->
        <view class="scene-card scene-card--code">
          <text class="scene-card__code-title">验证码倒计时</text>
          <ui-button v-if="!codeCountingDown" type="primary" size="small" @click="sendCode">获取验证码</ui-button>
          <ui-count-down v-else ref="codeCountDownRef" :time="60000" format="ss" @finish="onCodeFinish">
            <template #default="{ time: current }">
              <ui-button type="default" size="small" disabled>{{ current.seconds }}s 后重新获取</ui-button>
            </template>
          </ui-count-down>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { CountDownTimeData } from "@/uni_modules/uniapp-ui/ui-count-down"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "CountDown 倒计时" },
})

const toast = useToast()

// 基础时间
const time = ref(30 * 60 * 60 * 1000)
const eventTime = ref(10 * 1000)
const saleTime = ref(2 * 60 * 60 * 1000 + 30 * 60 * 1000)

// 手动控制
const countDownRef = ref()

// 验证码倒计时
const codeCountDownRef = ref()
const codeCountingDown = ref(false)

// 事件日志
const eventLog = ref("等待 change 事件触发...")

// 手动控制方法
function start() {
  countDownRef.value?.start()
}

function pause() {
  countDownRef.value?.pause()
}

function reset() {
  countDownRef.value?.reset()
}

function onFinish() {
  toast.success("倒计时结束")
}

// change 事件处理
function onCountDownChange(timeData: CountDownTimeData) {
  eventLog.value = `剩余: ${timeData.hours}时${timeData.minutes}分${timeData.seconds}秒${timeData.milliseconds}毫秒`
}

function onEventFinish() {
  eventLog.value = "倒计时已结束"
  toast.success("倒计时结束")
}

// 验证码
function sendCode() {
  codeCountingDown.value = true
  toast.text("验证码已发送")
}

function onCodeFinish() {
  codeCountingDown.value = false
}

// 补零
function padZero(num: number): string {
  return num.toString().padStart(2, "0")
}
</script>

<style lang="scss" scoped>
.countdown-block {
  color: #fff;
  width: 44rpx;
  height: 44rpx;
  display: inline-flex;
  font-size: 24rpx;
  background: var(--ui-color-primary);
  align-items: center;
  border-radius: 8rpx;
  justify-content: center;
}

.countdown-colon {
  color: var(--ui-color-primary);
  padding: 0 8rpx;
  font-size: 24rpx;
  font-weight: bold;
}

.countdown-circle {
  color: #fff;
  width: 56rpx;
  height: 56rpx;
  display: inline-flex;
  font-size: 28rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  align-items: center;
  font-weight: 600;
  border-radius: 50%;
  justify-content: center;
}

.countdown-separator {
  color: #667eea;
  padding: 0 12rpx;
  font-size: 32rpx;
  font-weight: bold;
}

.countdown-gradient {
  color: #fff;
  padding: 8rpx 16rpx;
  font-size: 28rpx;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  font-weight: 600;
  border-radius: 8rpx;
}

.countdown-gradient-separator {
  color: #f5576c;
  padding: 0 8rpx;
  font-size: 24rpx;
}

.countdown-row {
  gap: 16rpx;
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text-main);
    width: 140rpx;
    font-size: 28rpx;
  }
}

.countdown-item {
  gap: 12rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.countdown-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.scene-card {
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;

  &--sale {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee0a24 100%);
  }

  &--code {
    border: 2rpx solid var(--ui-color-border-light);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__header {
    gap: 16rpx;
    display: flex;
    align-items: center;
  }

  &__title {
    color: #fff;
    font-size: 32rpx;
    font-weight: 600;
  }

  &__desc {
    color: rgba(255, 255, 255, 0.8);
    font-size: 24rpx;
    margin-top: 8rpx;
  }

  &__code-title {
    color: var(--ui-color-text-main);
    font-size: 28rpx;
  }
}

.sale-countdown-block {
  color: #ee0a24;
  width: 44rpx;
  height: 44rpx;
  display: inline-flex;
  font-size: 24rpx;
  background: #fff;
  align-items: center;
  font-weight: 600;
  border-radius: 6rpx;
  justify-content: center;
}

.sale-countdown-colon {
  color: #fff;
  padding: 0 6rpx;
  font-size: 24rpx;
  font-weight: bold;
}

:deep(.my-countdown) {
  color: #1989fa;
  padding: 8rpx 16rpx;
  font-size: 32rpx;
  background: #e8f4ff;
  font-weight: 500;
  border-radius: 8rpx;
}
</style>
