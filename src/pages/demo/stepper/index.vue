<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-stepper v-model="basic" />
    </demo-section>

    <demo-section title="尺寸">
      <view class="demo-grid">
        <view class="demo-cell">
          <ui-stepper v-model="sizeSmall" size="small" />
          <text class="demo-label">small</text>
        </view>
        <view class="demo-cell">
          <ui-stepper v-model="sizeMedium" size="medium" />
          <text class="demo-label">medium</text>
        </view>
        <view class="demo-cell">
          <ui-stepper v-model="sizeLarge" size="large" />
          <text class="demo-label">large</text>
        </view>
      </view>
    </demo-section>

    <demo-section title="自定义尺寸">
      <view class="demo-grid demo-grid--2">
        <view class="demo-cell">
          <ui-stepper v-model="customSize1" height="48rpx" input-width="56rpx" />
          <text class="demo-label">紧凑型</text>
        </view>
        <view class="demo-cell">
          <ui-stepper v-model="customSize2" height="96rpx" input-width="120rpx" />
          <text class="demo-label">宽松型</text>
        </view>
      </view>
    </demo-section>

    <demo-section title="步长与范围">
      <view class="demo-grid demo-grid--2">
        <view class="demo-cell">
          <ui-stepper v-model="step" :step="2" />
          <text class="demo-label">步长 2</text>
        </view>
        <view class="demo-cell">
          <ui-stepper v-model="range" :min="1" :max="10" />
          <text class="demo-label">范围 1-10</text>
        </view>
      </view>
    </demo-section>

    <demo-section title="小数位数">
      <view class="demo-grid demo-grid--2">
        <view class="demo-cell">
          <ui-stepper v-model="decimal1" :step="0.1" :decimal-length="1" />
          <text class="demo-label">1 位小数</text>
        </view>
        <view class="demo-cell">
          <ui-stepper v-model="decimal2" :step="0.01" :decimal-length="2" />
          <text class="demo-label">2 位小数</text>
        </view>
      </view>
    </demo-section>

    <demo-section title="主题风格">
      <view class="demo-grid">
        <view class="demo-cell">
          <ui-stepper v-model="themeButton" theme="button" />
          <text class="demo-label">button</text>
        </view>
        <view class="demo-cell">
          <ui-stepper v-model="themeRound" theme="round" />
          <text class="demo-label">round</text>
        </view>
        <view class="demo-cell">
          <ui-stepper v-model="themeBorder" theme="border" />
          <text class="demo-label">border</text>
        </view>
      </view>
    </demo-section>

    <demo-section title="禁用状态">
      <view class="demo-grid demo-grid--2">
        <view class="demo-cell">
          <ui-stepper v-model="disabled" disabled />
          <text class="demo-label">禁用</text>
        </view>
        <view class="demo-cell">
          <ui-stepper v-model="disabledInput" disabled-input />
          <text class="demo-label">禁用输入</text>
        </view>
      </view>
    </demo-section>

    <demo-section title="长按快速加减">
      <ui-stepper v-model="longPress" long-press />
      <text class="demo-tip">长按按钮快速增减</text>
    </demo-section>

    <demo-section title="异步变更">
      <ui-stepper v-model="asyncValue" :before-change="onBeforeChange" />
      <text class="demo-tip">{{ asyncLog }}</text>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Stepper 步进器" },
})

const toast = useToast()

const basic = ref(1)
const sizeSmall = ref(1)
const sizeMedium = ref(1)
const sizeLarge = ref(1)
const customSize1 = ref(1)
const customSize2 = ref(1)
const step = ref(0)
const range = ref(5)
const decimal1 = ref(0.5)
const decimal2 = ref(0.05)
const themeButton = ref(1)
const themeRound = ref(1)
const themeBorder = ref(1)
const disabled = ref(1)
const disabledInput = ref(1)
const longPress = ref(1)
const asyncValue = ref(1)
const asyncLog = ref("值变更前会触发 beforeChange")

function onBeforeChange(value: number): Promise<boolean> {
  return new Promise((resolve) => {
    asyncLog.value = `正在验证值 ${value}...`
    setTimeout(() => {
      if (value > 5) {
        asyncLog.value = `值 ${value} 超过限制，已拒绝`
        toast.fail("最大只能设置 5")
        resolve(false)
      } else {
        asyncLog.value = `值 ${value} 验证通过`
        resolve(true)
      }
    }, 500)
  })
}
</script>

<style lang="scss" scoped>
.demo-grid {
  gap: 32rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  &--2 {
    justify-content: space-evenly;
  }
}

.demo-cell {
  gap: 12rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.demo-label {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.demo-tip {
  color: var(--ui-color-text-tertiary);
  display: block;
  font-size: var(--ui-font-size-xs);
  margin-top: 16rpx;
}
</style>
