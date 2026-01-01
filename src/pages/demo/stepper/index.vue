<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-stepper v-model="value1" />
      </demo-block>
    </demo-section>

    <demo-section title="步长设置">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value2" :step="2" />
          <text class="stepper-label">步长 2</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value2b" :step="5" />
          <text class="stepper-label">步长 5</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="限制范围">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value3" :min="5" :max="10" />
          <text class="stepper-label">5 - 10</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value3b" :min="0" :max="100" />
          <text class="stepper-label">0 - 100</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value4" disabled />
          <text class="stepper-label">禁用</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value5" disabled-input />
          <text class="stepper-label">禁用输入</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="小数位数">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value6" :step="0.1" :decimal-length="1" />
          <text class="stepper-label">1 位小数</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value6b" :step="0.01" :decimal-length="2" />
          <text class="stepper-label">2 位小数</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="主题风格">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value7" />
          <text class="stepper-label">默认</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value7b" theme="round" />
          <text class="stepper-label">圆角</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="长按快速加减">
      <demo-block direction="column" align="start" :gap="16">
        <ui-stepper v-model="value8" long-press />
        <text class="demo-text">长按按钮快速增减</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义尺寸">
      <demo-block :cols="2" :gap="32">
        <view class="stepper-item">
          <ui-stepper v-model="value9" height="56rpx" input-width="72rpx" />
          <text class="stepper-label">小</text>
        </view>
        <view class="stepper-item">
          <ui-stepper v-model="value9b" height="72rpx" input-width="100rpx" />
          <text class="stepper-label">大</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Stepper 步进器" },
})

const value1 = ref(1)
const value2 = ref(0)
const value2b = ref(0)
const value3 = ref(5)
const value3b = ref(50)
const value4 = ref(1)
const value5 = ref(1)
const value6 = ref(0.5)
const value6b = ref(0.05)
const value7 = ref(1)
const value7b = ref(1)
const value8 = ref(1)
const value9 = ref(1)
const value9b = ref(1)
</script>

<style lang="scss" scoped>
.stepper-item {
  gap: 12rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.stepper-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
