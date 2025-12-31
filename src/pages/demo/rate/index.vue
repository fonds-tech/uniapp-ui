<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-rate v-model="value1" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标">
      <demo-block :cols="2" :gap="32">
        <view class="rate-item">
          <ui-rate v-model="value2" icon="heart-fill" void-icon="heart" color="#ee0a24" />
          <text class="rate-label">爱心</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="value2b" icon="star-fill" void-icon="star" color="#ffca28" />
          <text class="rate-label">星星</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="半星">
      <demo-block>
        <ui-rate v-model="value3" allow-half />
      </demo-block>
    </demo-section>

    <demo-section title="自定义数量">
      <demo-block :cols="2" :gap="32">
        <view class="rate-item">
          <ui-rate v-model="value4a" :count="4" />
          <text class="rate-label">4 个</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="value4" :count="6" />
          <text class="rate-label">6 个</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="3" :gap="24">
        <view class="rate-item">
          <ui-rate v-model="value5a" color="primary" />
          <text class="rate-label">主题色</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="value5" color="success" />
          <text class="rate-label">成功色</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="value5b" color="danger" />
          <text class="rate-label">危险色</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block :cols="3" :gap="24">
        <view class="rate-item">
          <ui-rate v-model="value6" size="32rpx" />
          <text class="rate-label">32rpx</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="value6" size="40rpx" />
          <text class="rate-label">40rpx</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="value6" size="48rpx" />
          <text class="rate-label">48rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用与只读">
      <demo-block :cols="2" :gap="32">
        <view class="rate-item">
          <ui-rate v-model="value7" disabled />
          <text class="rate-label">禁用状态</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="value8" readonly allow-half />
          <text class="rate-label">只读状态</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="可滑动选择">
      <demo-block direction="column" align="start" :gap="16">
        <ui-rate v-model="value9" touchable />
        <text class="demo-text">滑动手指选择评分</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Rate 评分" },
})

const value1 = ref(3)
const value2 = ref(3)
const value2b = ref(4)
const value3 = ref(2.5)
const value4 = ref(4)
const value4a = ref(3)
const value5 = ref(3)
const value5a = ref(3)
const value5b = ref(3)
const value6 = ref(3)
const value7 = ref(3)
const value8 = ref(3.5)
const value9 = ref(3)
</script>

<style lang="scss" scoped>
.rate-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12rpx;
}

.rate-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
