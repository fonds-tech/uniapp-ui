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

    <!-- 新增：未选中颜色 -->
    <demo-section title="未选中颜色">
      <demo-block :cols="2" :gap="32">
        <view class="rate-item">
          <ui-rate v-model="valueVoidColor1" void-color="#c8c9cc" />
          <text class="rate-label">默认灰色</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="valueVoidColor2" void-color="#ffe9c5" color="#ff9500" />
          <text class="rate-label">浅橙色</text>
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

    <!-- 新增：图标间距 -->
    <demo-section title="图标间距">
      <demo-block :cols="3" :gap="24">
        <view class="rate-item">
          <ui-rate v-model="valueGutter1" gutter="4rpx" />
          <text class="rate-label">4rpx</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="valueGutter2" gutter="16rpx" />
          <text class="rate-label">16rpx</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="valueGutter3" gutter="24rpx" />
          <text class="rate-label">24rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：图标粗细 -->
    <demo-section title="图标粗细">
      <demo-block :cols="2" :gap="32">
        <view class="rate-item">
          <ui-rate v-model="valueWeight1" icon-weight="400" />
          <text class="rate-label">细体</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="valueWeight2" icon-weight="600" />
          <text class="rate-label">粗体</text>
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

    <!-- 新增：禁用颜色 -->
    <demo-section title="禁用颜色">
      <demo-block :cols="2" :gap="32">
        <view class="rate-item">
          <ui-rate v-model="valueDisabledColor1" disabled disabled-color="#c8c9cc" />
          <text class="rate-label">默认禁用色</text>
        </view>
        <view class="rate-item">
          <ui-rate v-model="valueDisabledColor2" disabled disabled-color="#1989fa" />
          <text class="rate-label">蓝色禁用</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="可滑动选择">
      <demo-block direction="column" align="start" :gap="16">
        <ui-rate v-model="value9" touchable />
        <text class="demo-text">滑动手指选择评分</text>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-rate v-model="valueEvent" @change="onRateChange" />
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block :cols="2" :gap="32">
        <view class="rate-item">
          <ui-rate v-model="valueCustom1" custom-class="my-rate" />
          <text class="rate-label">自定义类名</text>
        </view>
        <view class="rate-item">
          <ui-rate
            v-model="valueCustom2"
            :custom-style="{ padding: '16rpx', background: '#fff7e6', borderRadius: '8rpx' }"
            color="#ff9500"
          />
          <text class="rate-label">自定义样式</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 -->
    <demo-section title="综合示例">
      <demo-block direction="column" align="start" :gap="24">
        <view class="rate-demo">
          <text class="rate-demo__label">商品评分:</text>
          <ui-rate v-model="valueDemo" allow-half color="#ff9500" size="44rpx" gutter="12rpx" @change="onDemoChange" />
          <text class="rate-demo__value">{{ valueDemo }} 分</text>
        </view>
        <view class="rate-demo">
          <text class="rate-demo__label">服务态度:</text>
          <ui-rate v-model="valueDemo2" icon="heart-fill" void-icon="heart" color="#ee0a24" />
          <text class="rate-demo__value">{{ valueDemo2 }} 分</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Rate 评分" },
})

const { showToast } = useToast()

// 基础示例
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

// 新增示例
const valueVoidColor1 = ref(2)
const valueVoidColor2 = ref(3)
const valueGutter1 = ref(3)
const valueGutter2 = ref(3)
const valueGutter3 = ref(3)
const valueWeight1 = ref(3)
const valueWeight2 = ref(3)
const valueDisabledColor1 = ref(3)
const valueDisabledColor2 = ref(4)
const valueEvent = ref(3)
const valueCustom1 = ref(3)
const valueCustom2 = ref(4)
const valueDemo = ref(4.5)
const valueDemo2 = ref(4)

// 事件日志
const eventLog = ref("点击评分触发 change 事件")

// 事件处理
function onRateChange(value: number) {
  eventLog.value = `触发 change 事件，当前评分: ${value} 分`
  showToast({ message: `评分: ${value} 分`, type: "success" })
}

function onDemoChange(value: number) {
  showToast({ message: `商品评分: ${value} 分` })
}
</script>

<style lang="scss" scoped>
.rate-item {
  gap: 12rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.rate-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.rate-demo {
  display: flex;
  align-items: center;
  gap: 16rpx;

  &__label {
    font-size: 28rpx;
    color: var(--ui-color-text-main);
    width: 140rpx;
  }

  &__value {
    font-size: 28rpx;
    color: var(--ui-color-text-secondary);
    margin-left: 16rpx;
  }
}

:deep(.my-rate) {
  background: linear-gradient(135deg, #fff5eb 0%, #fff0f0 100%);
  padding: 12rpx 16rpx;
  border-radius: 8rpx;
}
</style>
