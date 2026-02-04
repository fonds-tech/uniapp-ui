<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-count-down :time="time" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义格式">
      <demo-block direction="column" align="start" :gap="20">
        <view class="format-item">
          <text class="format-label">天时分秒:</text>
          <ui-count-down :time="longTime" format="DD 天 HH 时 mm 分 ss 秒" />
        </view>
        <view class="format-item">
          <text class="format-label">时分秒:</text>
          <ui-count-down :time="time" format="HH:mm:ss" />
        </view>
        <view class="format-item">
          <text class="format-label">分秒毫秒:</text>
          <ui-count-down :time="time" format="mm:ss:SSS" millisecond />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="毫秒级渲染">
      <demo-block>
        <ui-count-down :time="time" millisecond format="HH:mm:ss:SSS" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式 - 方块">
      <demo-block>
        <ui-count-down :time="time">
          <template #default="{ time: current }">
            <text class="countdown-block">{{ padZero(current.hours) }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-block">{{ padZero(current.minutes) }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-block">{{ padZero(current.seconds) }}</text>
          </template>
        </ui-count-down>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式 - 圆形">
      <demo-block>
        <ui-count-down :time="time">
          <template #default="{ time: current }">
            <text class="countdown-circle">{{ padZero(current.hours) }}</text>
            <text class="countdown-separator">:</text>
            <text class="countdown-circle">{{ padZero(current.minutes) }}</text>
            <text class="countdown-separator">:</text>
            <text class="countdown-circle">{{ padZero(current.seconds) }}</text>
          </template>
        </ui-count-down>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式 - 渐变">
      <demo-block>
        <ui-count-down :time="time">
          <template #default="{ time: current }">
            <text class="countdown-gradient">{{ padZero(current.hours) }}</text>
            <text class="countdown-gradient-separator">时</text>
            <text class="countdown-gradient">{{ padZero(current.minutes) }}</text>
            <text class="countdown-gradient-separator">分</text>
            <text class="countdown-gradient">{{ padZero(current.seconds) }}</text>
            <text class="countdown-gradient-separator">秒</text>
          </template>
        </ui-count-down>
      </demo-block>
    </demo-section>

    <demo-section title="超长时间展示">
      <demo-block>
        <ui-count-down :time="longTime">
          <template #default="{ time: current }">
            <view class="long-time-countdown">
              <view class="long-time-item">
                <text class="long-time-value">{{ padZero(current.days) }}</text>
                <text class="long-time-label">天</text>
              </view>
              <view class="long-time-item">
                <text class="long-time-value">{{ padZero(current.hours) }}</text>
                <text class="long-time-label">时</text>
              </view>
              <view class="long-time-item">
                <text class="long-time-value">{{ padZero(current.minutes) }}</text>
                <text class="long-time-label">分</text>
              </view>
              <view class="long-time-item">
                <text class="long-time-value">{{ padZero(current.seconds) }}</text>
                <text class="long-time-label">秒</text>
              </view>
            </view>
          </template>
        </ui-count-down>
      </demo-block>
    </demo-section>

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

    <demo-section title="正计时模式">
      <demo-block direction="column" align="start" :gap="16">
        <ui-count-down :time="countUpTime" mode="countup" format="mm:ss:SSS" millisecond>
          <template #default="{ time: current }">
            <text class="countup-text">已用时: {{ padZero(current.minutes) }}:{{ padZero(current.seconds) }}.{{ padZero(current.milliseconds, 3) }}</text>
          </template>
        </ui-count-down>
        <text class="demo-hint">从 0 开始计时，到达设定时间后触发 finish 事件</text>
      </demo-block>
    </demo-section>

    <demo-section title="目标时间模式">
      <demo-block direction="column" align="start" :gap="16">
        <ui-count-down :target-time="targetTimestamp" format="DD天 HH:mm:ss" />
        <text class="demo-hint">目标时间: {{ formatTargetDate(targetTimestamp) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="进度条倒计时">
      <demo-block>
        <ui-count-down :time="progressTime">
          <template #default="{ time: current }">
            <view class="progress-countdown">
              <view class="progress-countdown__bar">
                <view class="progress-countdown__fill" :style="{ width: `${getProgress(current)}%` }" />
              </view>
              <text class="progress-countdown__text">{{ padZero(current.minutes) }}:{{ padZero(current.seconds) }}</text>
            </view>
          </template>
        </ui-count-down>
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

    <demo-section title="事件监听">
      <demo-block direction="column" align="start" :gap="16">
        <ui-count-down :time="eventTime" @change="onCountDownChange" @finish="onEventFinish" />
        <text class="demo-hint">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="秒杀倒计时">
      <demo-block>
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
      </demo-block>
    </demo-section>

    <demo-section title="验证码倒计时">
      <demo-block>
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
const time = ref(30 * 60 * 60 * 1000) // 30小时
const longTime = ref(3 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000) // 3天5小时
const eventTime = ref(10 * 1000)
const saleTime = ref(2 * 60 * 60 * 1000 + 30 * 60 * 1000)
const countUpTime = ref(60 * 1000)
const progressTime = ref(60 * 1000)
const targetTimestamp = ref(Date.now() + 2 * 24 * 60 * 60 * 1000)

// 手动控制
const countDownRef = ref()

// 验证码倒计时
const codeCountDownRef = ref()
const codeCountingDown = ref(false)

// 事件日志
const eventLog = ref("等待 change 事件触发...")

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

function onCountDownChange(timeData: CountDownTimeData) {
  eventLog.value = `剩余: ${timeData.hours}时${timeData.minutes}分${timeData.seconds}秒`
}

function onEventFinish() {
  eventLog.value = "倒计时已结束"
  toast.success("倒计时结束")
}

function sendCode() {
  codeCountingDown.value = true
  toast.text("验证码已发送")
}

function onCodeFinish() {
  codeCountingDown.value = false
}

function padZero(num: number, len = 2): string {
  return num.toString().padStart(len, "0")
}

function getProgress(current: CountDownTimeData): number {
  if (current.total === 0) return 0
  return Math.round((current.current / current.total) * 100)
}

function formatTargetDate(timestamp: number): string {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`
}
</script>

<style lang="scss" scoped>
.format-item {
  gap: 16rpx;
  display: flex;
  align-items: center;
}

.format-label {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
  min-width: 140rpx;
}

.countdown-block {
  color: #fff;
  width: 48rpx;
  height: 48rpx;
  display: inline-flex;
  font-size: 26rpx;
  background: var(--ui-color-primary);
  align-items: center;
  border-radius: 8rpx;
  justify-content: center;
}

.countdown-colon {
  color: var(--ui-color-primary);
  padding: 0 10rpx;
  font-size: 26rpx;
  font-weight: bold;
}

.countdown-circle {
  color: #fff;
  width: 60rpx;
  height: 60rpx;
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
  padding: 10rpx 18rpx;
  font-size: 28rpx;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  font-weight: 600;
  border-radius: 8rpx;
}

.countdown-gradient-separator {
  color: #f5576c;
  display: inline-flex;
  padding: 0 10rpx;
  font-size: 24rpx;
  align-items: center;
}

.long-time-countdown {
  gap: 8rpx;
  display: flex;
  align-items: center;
}

.long-time-item {
  gap: 4rpx;
  display: flex;
  align-items: baseline;
}

.long-time-value {
  color: #fff;
  width: 56rpx;
  height: 56rpx;
  display: inline-flex;
  font-size: 30rpx;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  align-items: center;
  font-weight: 600;
  border-radius: 10rpx;
  justify-content: center;
}

.long-time-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-left: 4rpx;
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

.demo-hint {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.countup-text {
  color: #07c160;
  font-size: 32rpx;
  font-weight: 600;
}

.progress-countdown {
  gap: 20rpx;
  width: 100%;
  display: flex;
  align-items: center;

  &__bar {
    flex: 1;
    height: 20rpx;
    overflow: hidden;
    background: #eee;
    border-radius: 10rpx;
  }

  &__fill {
    height: 100%;
    background: linear-gradient(90deg, #1989fa 0%, #07c160 100%);
    transition: width 0.3s ease;
    border-radius: 10rpx;
  }

  &__text {
    color: var(--ui-color-text);
    font-size: 30rpx;
    min-width: 120rpx;
    text-align: right;
    font-weight: 500;
  }
}

.scene-card {
  padding: 28rpx;
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
    gap: 20rpx;
    display: flex;
    align-items: center;
  }

  &__title {
    color: #fff;
    font-size: 34rpx;
    font-weight: 600;
  }

  &__desc {
    color: rgba(255, 255, 255, 0.8);
    font-size: 24rpx;
    margin-top: 12rpx;
  }

  &__code-title {
    color: var(--ui-color-text);
    font-size: 28rpx;
  }
}

.sale-countdown-block {
  color: #ee0a24;
  width: 48rpx;
  height: 48rpx;
  display: inline-flex;
  font-size: 26rpx;
  background: #fff;
  align-items: center;
  font-weight: 600;
  border-radius: 6rpx;
  justify-content: center;
}

.sale-countdown-colon {
  color: #fff;
  padding: 0 8rpx;
  font-size: 26rpx;
  font-weight: bold;
}

:deep(.my-countdown) {
  color: #1989fa;
  padding: 10rpx 18rpx;
  font-size: 32rpx;
  background: #e8f4ff;
  font-weight: 500;
  border-radius: 8rpx;
}
</style>
