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

    <demo-section title="显示文字">
      <demo-block direction="column" :gap="32" :cols="3">
        <ui-switch v-model="textValue1" size="56rpx" active-text="开" inactive-text="关" />
        <ui-switch v-model="textValue2" size="70rpx" active-text="ON" inactive-text="OFF" />
        <ui-switch v-model="textValue3" size="80rpx" active-text="启用" inactive-text="禁用" text-size="24rpx" text-weight="600" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义值">
      <demo-block direction="column" align="start" :gap="16">
        <ui-switch v-model="customValue" active-value="1" inactive-value="0" />
        <text class="demo-text">当前值: {{ customValue }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义节点">
      <demo-block :cols="2" :gap="32">
        <ui-switch v-model="nodeValue1" size="50rpx">
          <template #node="{ checked }">
            <ui-icon :name="checked ? 'check' : 'close'" size="24rpx" :color="checked ? '#07c160' : '#999'" />
          </template>
        </ui-switch>
        <ui-switch v-model="nodeValue2" size="50rpx">
          <template #node="{ checked }">
            <text class="node-emoji">{{ checked ? "🌙" : "☀️" }}</text>
          </template>
        </ui-switch>
      </demo-block>
    </demo-section>

    <demo-section title="异步控制">
      <demo-block direction="column" align="start" :gap="16">
        <ui-switch v-model="asyncValue" :loading="asyncLoading" :before-change="onBeforeChange" />
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

const textValue1 = ref(true)
const textValue2 = ref(false)
const textValue3 = ref(true)

const customValue = ref("0")

const nodeValue1 = ref(true)
const nodeValue2 = ref(false)

const asyncValue = ref(false)
const asyncLoading = ref(false)

function onBeforeChange(value: boolean, next: (val?: boolean) => void) {
  asyncLoading.value = true
  setTimeout(() => {
    asyncLoading.value = false
    next()
  }, 1000)
}
</script>

<style lang="scss" scoped>
.switch-item {
  gap: 12rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.switch-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.node-emoji {
  font-size: 20rpx;
}
</style>
