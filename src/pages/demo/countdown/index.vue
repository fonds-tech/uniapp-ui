<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-count-down :time="time" />
      </view>
    </view>

    <!-- 自定义格式 -->
    <view class="demo-section">
      <text class="section-title">自定义格式</text>
      <view class="demo-block-full">
        <ui-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
        <ui-count-down :time="time" format="HH:mm:ss" />
        <ui-count-down :time="time" format="mm:ss:SSS" millisecond />
      </view>
    </view>

    <!-- 毫秒级渲染 -->
    <view class="demo-section">
      <text class="section-title">毫秒级渲染</text>
      <view class="demo-block">
        <ui-count-down :time="time" millisecond format="HH:mm:ss:SSS" />
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="demo-section">
      <text class="section-title">自定义样式</text>
      <view class="demo-block">
        <ui-count-down :time="time">
          <template #default="{ current }">
            <text class="countdown-block">{{ current.hours }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-block">{{ current.minutes }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-block">{{ current.seconds }}</text>
          </template>
        </ui-count-down>
      </view>
    </view>

    <!-- 手动控制 -->
    <view class="demo-section">
      <text class="section-title">手动控制</text>
      <view class="demo-block-full">
        <ui-count-down ref="countDownRef" :time="3000" :auto-start="false" format="ss:SSS" millisecond @finish="onFinish" />
        <view class="demo-block" style="margin-top: 24rpx">
          <ui-button size="small" @click="start">开始</ui-button>
          <ui-button size="small" @click="pause">暂停</ui-button>
          <ui-button size="small" @click="reset">重置</ui-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "CountDown 倒计时" },
})

const time = ref(30 * 60 * 60 * 1000)
const countDownRef = ref()

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
  uni.showToast({ title: "倒计时结束", icon: "none" })
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

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
</style>
