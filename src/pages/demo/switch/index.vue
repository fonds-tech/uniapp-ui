<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-switch v-model="value1" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block :cols="2" :gap="32">
        <ui-switch v-model="value2" disabled />
        <ui-switch :model-value="true" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block :cols="2" :gap="32">
        <ui-switch v-model="value3" loading />
        <ui-switch :model-value="true" loading />
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block :cols="4" :gap="32" align="center">
        <view class="switch-item">
          <ui-switch v-model="value4" size="40rpx" />
          <text class="switch-label">40rpx</text>
        </view>
        <view class="switch-item">
          <ui-switch v-model="value5" size="50rpx" />
          <text class="switch-label">50rpx</text>
        </view>
        <view class="switch-item">
          <ui-switch v-model="value6" size="60rpx" />
          <text class="switch-label">60rpx</text>
        </view>
        <view class="switch-item">
          <ui-switch v-model="value10" size="70rpx" />
          <text class="switch-label">70rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="3" :gap="32">
        <view class="switch-item">
          <ui-switch v-model="value7" active-color="#ee0a24" />
          <text class="switch-label">红色</text>
        </view>
        <view class="switch-item">
          <ui-switch v-model="value8" active-color="#7232dd" />
          <text class="switch-label">紫色</text>
        </view>
        <view class="switch-item">
          <ui-switch v-model="value9" active-color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
          <text class="switch-label">渐变</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="异步控制">
      <demo-block direction="column" align="start" :gap="16">
        <ui-switch v-model="asyncValue" :loading="asyncLoading" @change="onAsyncChange" />
        <text class="demo-text">点击后延迟1秒切换</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Switch 开关" },
})

const value1 = ref(false)
const value2 = ref(false)
const value3 = ref(true)
const value4 = ref(true)
const value5 = ref(true)
const value6 = ref(true)
const value7 = ref(true)
const value8 = ref(true)
const value9 = ref(true)
const value10 = ref(true)

const asyncValue = ref(false)
const asyncLoading = ref(false)

function onAsyncChange() {
  asyncLoading.value = true
  setTimeout(() => {
    asyncValue.value = !asyncValue.value
    asyncLoading.value = false
  }, 1000)
}
</script>

<style lang="scss" scoped>
.switch-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12rpx;
}

.switch-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
