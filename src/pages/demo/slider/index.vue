<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-slider v-model="value1" />
        <text class="slider-value">当前值：{{ value1 }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="设置范围">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-slider v-model="value2" :min="0" :max="200" />
        <text class="slider-value">范围 0-200，当前值：{{ value2 }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="设置步长">
      <demo-block direction="column" align="stretch" :gap="24">
        <view class="slider-item">
          <ui-slider v-model="value3a" :step="10" />
          <text class="slider-value">步长 10，当前值：{{ value3a }}</text>
        </view>
        <view class="slider-item">
          <ui-slider v-model="value3b" :step="20" />
          <text class="slider-value">步长 20，当前值：{{ value3b }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="范围选择">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-slider v-model="rangeValue" range />
        <text class="slider-value">范围值：{{ rangeValue[0] }} - {{ rangeValue[1] }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="显示当前值">
      <demo-block direction="column" align="stretch" :gap="24">
        <view class="slider-item">
          <text class="slider-label">拖动时显示</text>
          <ui-slider v-model="value4a" show-value />
        </view>
        <view class="slider-item">
          <text class="slider-label">始终显示</text>
          <ui-slider v-model="value4b" show-value show-value-mode="always" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column" align="stretch" :gap="24">
        <view class="slider-item">
          <ui-slider v-model="value5a" active-color="#ee0a24" />
          <text class="slider-value">红色主题</text>
        </view>
        <view class="slider-item">
          <ui-slider v-model="value5b" active-color="#07c160" inactive-color="#ebedf0" />
          <text class="slider-value">绿色主题</text>
        </view>
        <view class="slider-item">
          <ui-slider v-model="value5c" active-color="#7232dd" button-color="#7232dd" />
          <text class="slider-value">紫色主题</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义尺寸">
      <demo-block direction="column" align="stretch" :gap="24">
        <view class="slider-item">
          <ui-slider v-model="value6a" :bar-height="2" :button-size="20" />
          <text class="slider-value">小尺寸</text>
        </view>
        <view class="slider-item">
          <ui-slider v-model="value6b" :bar-height="6" :button-size="28" />
          <text class="slider-value">大尺寸</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="刻度标记">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-slider
          v-model="value7"
          :marks="{
            0: '0%',
            25: '25%',
            50: '50%',
            75: '75%',
            100: '100%',
          }"
        />
        <text class="slider-value">当前值：{{ value7 }}%</text>
      </demo-block>
    </demo-section>

    <demo-section title="格式化显示">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-slider
          v-model="value8"
          show-value
          show-value-mode="always"
          :format-value="(val: number) => `${val}%`"
        />
      </demo-block>
    </demo-section>

    <demo-section title="垂直方向">
      <demo-block :gap="32">
        <view class="vertical-slider-item">
          <ui-slider v-model="value9a" vertical />
          <text class="slider-value">{{ value9a }}</text>
        </view>
        <view class="vertical-slider-item">
          <ui-slider v-model="value9b" vertical range />
          <text class="slider-value">{{ value9b[0] }}-{{ value9b[1] }}</text>
        </view>
        <view class="vertical-slider-item">
          <ui-slider v-model="value9c" vertical show-value show-value-mode="always" />
          <text class="slider-value">显示值</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column" align="stretch" :gap="24">
        <view class="slider-item">
          <ui-slider v-model="value10a" disabled />
          <text class="slider-value">禁用</text>
        </view>
        <view class="slider-item">
          <ui-slider v-model="value10b" readonly />
          <text class="slider-value">只读</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Slider 滑块" },
})

// 基础用法
const value1 = ref(50)

// 设置范围
const value2 = ref(100)

// 设置步长
const value3a = ref(30)
const value3b = ref(40)

// 范围选择
const rangeValue = ref<[number, number]>([20, 80])

// 显示当前值
const value4a = ref(50)
const value4b = ref(50)

// 自定义颜色
const value5a = ref(50)
const value5b = ref(50)
const value5c = ref(50)

// 自定义尺寸
const value6a = ref(50)
const value6b = ref(50)

// 刻度标记
const value7 = ref(50)

// 格式化显示
const value8 = ref(50)

// 垂直方向
const value9a = ref(50)
const value9b = ref<[number, number]>([30, 70])
const value9c = ref(50)

// 禁用状态
const value10a = ref(50)
const value10b = ref(50)
</script>

<style lang="scss" scoped>
.slider-item {
  gap: 8rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.slider-value {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  text-align: center;
}

.slider-label {
  color: var(--ui-color-text-main);
  font-size: 24rpx;
  margin-bottom: 8rpx;
}

.vertical-slider-item {
  gap: 16rpx;
  height: 300rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
