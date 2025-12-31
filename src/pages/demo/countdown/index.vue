<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-count-down :time="time" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义格式">
      <demo-block direction="column" align="start">
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
          <template #default="{ current }">
            <text class="countdown-block">{{ current.hours }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-block">{{ current.minutes }}</text>
            <text class="countdown-colon">:</text>
            <text class="countdown-block">{{ current.seconds }}</text>
          </template>
        </ui-count-down>
      </demo-block>
    </demo-section>

    <demo-section title="手动控制">
      <demo-block direction="column">
        <ui-count-down ref="countDownRef" :time="3000" :auto-start="false" format="ss:SSS" millisecond @finish="onFinish" />
        <demo-block>
          <ui-button size="small" @click="start">开始</ui-button>
          <ui-button size="small" @click="pause">暂停</ui-button>
          <ui-button size="small" @click="reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

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
</style>
