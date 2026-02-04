<template>
  <demo-page>
    <!-- 基础用法 -->
    <demo-section title="基础用法">
      <demo-block :gap="32">
        <ui-circle :rate="70" />
      </demo-block>
    </demo-section>

    <!-- 样式定制 -->
    <demo-section title="样式定制">
      <demo-block :gap="32">
        <ui-circle :rate="70" color="#07c160" />
        <ui-circle :rate="70" color="#ee0a24" layer-color="#fce8eb" />
        <ui-circle :rate="70" color="#1989fa" fill="#e8f4ff" />
      </demo-block>
    </demo-section>

    <!-- 渐变色 -->
    <demo-section title="渐变色">
      <demo-block :gap="32">
        <ui-circle :rate="70" :color="gradientColor" />
      </demo-block>
    </demo-section>

    <!-- 进度条宽度 -->
    <demo-section title="进度条宽度">
      <demo-block :gap="32">
        <ui-circle :rate="70" stroke-width="4rpx" text="4rpx" />
        <ui-circle :rate="70" stroke-width="8rpx" text="8rpx" />
        <ui-circle :rate="70" stroke-width="16rpx" text="16rpx" />
      </demo-block>
    </demo-section>

    <!-- 大小 -->
    <demo-section title="大小">
      <demo-block :gap="32" align="center">
        <ui-circle :rate="70" size="120rpx" text="小" />
        <ui-circle :rate="70" size="200rpx" text="中" />
        <ui-circle :rate="70" size="280rpx" text="大" />
      </demo-block>
    </demo-section>

    <!-- 起始位置 -->
    <demo-section title="起始位置">
      <demo-block :gap="24">
        <view class="position-grid">
          <view v-for="item in startPositions" :key="item.position" class="position-item">
            <ui-circle :rate="70" size="140rpx" :start-position="item.position" :text="item.label" />
          </view>
        </view>
      </demo-block>
    </demo-section>

    <!-- 逆时针 -->
    <demo-section title="逆时针">
      <demo-block :gap="32">
        <ui-circle :rate="70" text="顺时针" />
        <ui-circle :rate="70" :clockwise="false" text="逆时针" />
      </demo-block>
    </demo-section>

    <!-- 显示文字 -->
    <demo-section title="显示文字">
      <demo-block :gap="32">
        <ui-circle :rate="70" />
        <ui-circle :rate="70" text="自定义" />
        <ui-circle :rate="slotRate">
          <view class="custom-content">
            <text class="custom-value">{{ slotRate }}</text>
            <text class="custom-unit">分</text>
          </view>
        </ui-circle>
      </demo-block>
    </demo-section>

    <!-- 动态控制 -->
    <demo-section title="动态控制">
      <demo-block direction="column" :gap="24">
        <view class="dynamic-demo">
          <ui-circle :rate="dynamicRate" :color="dynamicColor" />
        </view>
        <demo-block :gap="16">
          <ui-button size="small" @click="decreaseRate">减少</ui-button>
          <ui-button size="small" type="primary" @click="increaseRate">增加</ui-button>
          <ui-button size="small" type="success" @click="completeRate">完成</ui-button>
          <ui-button size="small" type="warning" @click="resetRate">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">当进度动画完成时触发 finish 事件</text>
        <view class="event-demo">
          <ui-circle :rate="eventRate" @finish="onFinish" />
        </view>
        <demo-block :gap="16">
          <ui-button size="small" @click="eventDecrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="eventIncrease">增加</ui-button>
          <ui-button size="small" type="warning" @click="eventReset">重置</ui-button>
        </demo-block>
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "Circle 环形进度条" },
})

const toast = useToast()

// 渐变色配置
const gradientColor = {
  "0%": "#3fecff",
  "100%": "#6149f6",
}

// 起始位置配置
const startPositions = [
  { position: "top", label: "顶部" },
  { position: "right", label: "右侧" },
  { position: "bottom", label: "底部" },
  { position: "left", label: "左侧" },
] as const

// 插槽示例进度
const slotRate = ref(85)

// 动态控制
const dynamicRate = ref(50)

const dynamicColor = computed(() => {
  if (dynamicRate.value < 30) return "#ee0a24"
  if (dynamicRate.value < 70) return "#ff976a"
  return "#07c160"
})

function decreaseRate() {
  dynamicRate.value = Math.max(0, dynamicRate.value - 10)
}

function increaseRate() {
  dynamicRate.value = Math.min(100, dynamicRate.value + 10)
}

function completeRate() {
  dynamicRate.value = 100
}

function resetRate() {
  dynamicRate.value = 0
}

// 事件处理
const eventRate = ref(40)
const eventLog = ref("进度动画完成时将触发 finish 事件")

function eventDecrease() {
  eventRate.value = Math.max(0, eventRate.value - 20)
}

function eventIncrease() {
  eventRate.value = Math.min(100, eventRate.value + 20)
}

function eventReset() {
  eventRate.value = 40
  eventLog.value = "进度动画完成时将触发 finish 事件"
}

function onFinish() {
  eventLog.value = "触发 finish 事件 - 进度动画已完成!"
  toast.success("动画完成!")
}
</script>

<style lang="scss" scoped>
.position-grid {
  gap: 24rpx;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.position-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-content {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.custom-value {
  color: var(--ui-color-primary);
  font-size: 40rpx;
  font-weight: 600;
}

.custom-unit {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-left: 4rpx;
}

.dynamic-demo,
.event-demo {
  display: flex;
  justify-content: center;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
