<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block number-center">
        <ui-number-roll :value="value1" />
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="demo-section">
      <text class="section-title">自定义样式</text>
      <view class="demo-block number-center">
        <ui-number-roll :value="value2" color="#ff4757" :font-size="48" font-weight="600" />
      </view>
    </view>

    <!-- 千位分隔符 -->
    <view class="demo-section">
      <text class="section-title">千位分隔符</text>
      <view class="demo-block number-center">
        <ui-number-roll :value="value3" thousands-sep="," :font-size="36" />
      </view>
    </view>

    <!-- 小数位数 -->
    <view class="demo-section">
      <text class="section-title">小数位数</text>
      <view class="demo-block number-center">
        <ui-number-roll :value="value4" :decimal-places="2" :trim-zero="false" :font-size="36" />
      </view>
    </view>

    <!-- 动态更新 -->
    <view class="demo-section">
      <text class="section-title">动态更新</text>
      <view class="demo-block number-center">
        <ui-number-roll :value="dynamicValue" :font-size="48" color="#1e90ff" font-weight="600" />
      </view>
      <view class="demo-block button-group">
        <ui-button size="small" @click="addValue">+100</ui-button>
        <ui-button size="small" @click="subtractValue">-100</ui-button>
        <ui-button size="small" type="primary" @click="randomValue">随机</ui-button>
      </view>
    </view>

    <!-- 金额展示 -->
    <view class="demo-section">
      <text class="section-title">金额展示</text>
      <view class="demo-block money-display">
        <text class="money-symbol">¥</text>
        <ui-number-roll :value="moneyValue" thousands-sep="," :decimal-places="2" :trim-zero="false" :font-size="56" color="#ff4757" font-weight="600" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "NumberRoll 数字滚动" },
})

const value1 = ref(12345)
const value2 = ref(99999)
const value3 = ref(1234567)
const value4 = ref(123.5)
const dynamicValue = ref(1000)
const moneyValue = ref(88888.88)

function addValue() {
  dynamicValue.value += 100
}

function subtractValue() {
  dynamicValue.value = Math.max(0, dynamicValue.value - 100)
}

function randomValue() {
  dynamicValue.value = Math.floor(Math.random() * 100000)
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.number-center {
  display: flex;
  justify-content: center;
}

.button-group {
  display: flex;
  gap: 20rpx;
  justify-content: center;
}

.money-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.money-symbol {
  color: #ff4757;
  font-size: 36rpx;
  font-weight: 600;
  margin-right: 8rpx;
}
</style>
