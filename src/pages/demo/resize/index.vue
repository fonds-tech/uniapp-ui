<template>
  <demo-page>
    <!-- 基础用法 -->
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">组件自动检测子元素尺寸并触发 resize 事件</ui-text>
        <view class="demo-box">
          <ui-resize @resize="onBasicResize">
            <view class="fixed-box fixed-box--primary">
              <ui-text color="#fff" bold>固定尺寸盒子</ui-text>
              <ui-text color="#fff" size="small">{{ basicSize.width }} × {{ basicSize.height }}</ui-text>
            </view>
          </ui-resize>
        </view>
      </demo-block>
    </demo-section>

    <!-- 动态内容尺寸 -->
    <demo-section title="动态内容尺寸">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">拖动滑块改变子元素尺寸，组件自动检测变化</ui-text>
        <view class="demo-box demo-box--center">
          <ui-resize @resize="onDynamicResize">
            <view class="dynamic-box" :style="{ width: `${dynamicWidth}px`, height: `${dynamicHeight}px` }">
              <ui-text color="#fff" size="large" bold>{{ dynamicSize.width }}</ui-text>
              <ui-text color="#fff" size="small">× {{ dynamicSize.height }} px</ui-text>
            </view>
          </ui-resize>
        </view>
        <view class="slider-group">
          <view class="slider-item">
            <ui-text size="small">宽度</ui-text>
            <slider class="slider" :value="dynamicWidth" :min="100" :max="300" active-color="#1989fa" @change="onWidthChange" />
            <ui-text size="small" color="secondary">{{ dynamicWidth }}px</ui-text>
          </view>
          <view class="slider-item">
            <ui-text size="small">高度</ui-text>
            <slider class="slider" :value="dynamicHeight" :min="80" :max="200" active-color="#07c160" @change="onHeightChange" />
            <ui-text size="small" color="secondary">{{ dynamicHeight }}px</ui-text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <!-- 动态内容 -->
    <demo-section title="动态内容">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">子元素内容变化导致尺寸变化时触发 resize</ui-text>
        <view class="demo-box">
          <ui-resize @resize="onContentResize">
            <view class="content-box">
              <ui-text v-for="i in lineCount" :key="i">第 {{ i }} 行内容</ui-text>
            </view>
          </ui-resize>
        </view>
        <view class="button-group">
          <ui-button size="small" @click="lineCount = Math.max(1, lineCount - 1)">减少一行</ui-button>
          <ui-button size="small" type="primary" @click="lineCount++">增加一行</ui-button>
        </view>
        <ui-text size="small" color="secondary">检测到尺寸：{{ contentSize.width }} × {{ contentSize.height }}</ui-text>
      </demo-block>
    </demo-section>

    <!-- 禁用状态 -->
    <demo-section title="禁用状态">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">禁用后不会触发 resize 事件</ui-text>
        <view class="demo-box">
          <ui-resize disabled @resize="onDisabledResize">
            <view class="disabled-box">
              <ui-text color="secondary">已禁用监听</ui-text>
              <ui-text size="small" color="secondary">回调次数：{{ disabledCount }}</ui-text>
            </view>
          </ui-resize>
        </view>
      </demo-block>
    </demo-section>

    <!-- 回调数据 -->
    <demo-section title="回调数据">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">resize 事件返回完整的位置和尺寸信息</ui-text>
        <view class="data-grid">
          <view class="data-item">
            <ui-text size="small" color="secondary">width</ui-text>
            <ui-text bold>{{ lastData.width || 0 }}</ui-text>
          </view>
          <view class="data-item">
            <ui-text size="small" color="secondary">height</ui-text>
            <ui-text bold>{{ lastData.height || 0 }}</ui-text>
          </view>
          <view class="data-item">
            <ui-text size="small" color="secondary">top</ui-text>
            <ui-text>{{ lastData.top?.toFixed(1) || 0 }}</ui-text>
          </view>
          <view class="data-item">
            <ui-text size="small" color="secondary">left</ui-text>
            <ui-text>{{ lastData.left?.toFixed(1) || 0 }}</ui-text>
          </view>
          <view class="data-item">
            <ui-text size="small" color="secondary">right</ui-text>
            <ui-text>{{ lastData.right?.toFixed(1) || 0 }}</ui-text>
          </view>
          <view class="data-item">
            <ui-text size="small" color="secondary">bottom</ui-text>
            <ui-text>{{ lastData.bottom?.toFixed(1) || 0 }}</ui-text>
          </view>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Resize 尺寸监听" },
})

// 基础用法
const basicSize = ref({ width: 0, height: 0 })
function onBasicResize(data: Record<string, number>) {
  basicSize.value = { width: Math.round(data.width), height: Math.round(data.height) }
  lastData.value = data
}

// 动态尺寸
const dynamicWidth = ref(200)
const dynamicHeight = ref(120)
const dynamicSize = ref({ width: 0, height: 0 })

function onDynamicResize(data: Record<string, number>) {
  dynamicSize.value = { width: Math.round(data.width), height: Math.round(data.height) }
  lastData.value = data
}

function onWidthChange(e: { detail: { value: number } }) {
  dynamicWidth.value = e.detail.value
}

function onHeightChange(e: { detail: { value: number } }) {
  dynamicHeight.value = e.detail.value
}

// 动态内容
const lineCount = ref(3)
const contentSize = ref({ width: 0, height: 0 })

function onContentResize(data: Record<string, number>) {
  contentSize.value = { width: Math.round(data.width), height: Math.round(data.height) }
  lastData.value = data
}

// 禁用状态
const disabledCount = ref(0)
function onDisabledResize() {
  disabledCount.value++
}

// 回调数据
const lastData = ref<Record<string, number>>({})
</script>

<style lang="scss" scoped>
.demo-box {
  padding: 32rpx;
  background: var(--ui-color-bg);
  border-radius: 16rpx;

  &--center {
    display: flex;
    justify-content: center;
  }
}

// 固定尺寸盒子
.fixed-box {
  gap: 8rpx;
  width: 240px;
  height: 100px;
  display: flex;
  align-items: center;
  border-radius: 12rpx;
  flex-direction: column;
  justify-content: center;

  &--primary {
    background: var(--ui-color-primary);
  }
}

// 动态尺寸盒子
.dynamic-box {
  gap: 8rpx;
  display: flex;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  align-items: center;
  border-radius: 12rpx;
  flex-direction: column;
  justify-content: center;
}

// 动态内容盒子
.content-box {
  gap: 8rpx;
  width: 280px;
  display: flex;
  padding: 24rpx;
  background: var(--ui-color-bg-2);
  align-items: center;
  border-radius: 12rpx;
  flex-direction: column;
}

// 禁用盒子
.disabled-box {
  gap: 8rpx;
  width: 160px;
  border: 2rpx dashed var(--ui-color-border);
  height: 100px;
  display: flex;
  background: var(--ui-color-bg);
  align-items: center;
  border-radius: 12rpx;
  flex-direction: column;
  justify-content: center;
}

.slider-group {
  gap: 16rpx;
  width: 100%;
  display: flex;
  margin-top: 24rpx;
  flex-direction: column;
}

.slider-item {
  gap: 16rpx;
  width: 100%;
  display: flex;
  align-items: center;

  .slider {
    flex: 1;
  }
}

.button-group {
  gap: 16rpx;
  display: flex;
  margin-top: 24rpx;
}

.data-grid {
  gap: 16rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.data-item {
  gap: 8rpx;
  display: flex;
  padding: 20rpx;
  background: var(--ui-color-bg);
  text-align: center;
  border-radius: 12rpx;
  flex-direction: column;
}
</style>
