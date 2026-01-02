<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-text>拖动下方滑块改变盒子尺寸，观察尺寸变化回调</ui-text>
        <view class="resize-demo">
          <ui-resize :width="boxWidth" :height="boxHeight" @resize="onResize">
            <view class="resize-box">
              <ui-text color="#fff" size="small">宽：{{ currentSize.width }}px</ui-text>
              <ui-text color="#fff" size="small">高：{{ currentSize.height }}px</ui-text>
            </view>
          </ui-resize>
        </view>
        <view class="slider-group">
          <view class="slider-item">
            <ui-text size="small">宽度：{{ boxWidth }}px</ui-text>
            <slider :value="boxWidth" :min="100" :max="300" @change="onWidthChange" />
          </view>
          <view class="slider-item">
            <ui-text size="small">高度：{{ boxHeight }}px</ui-text>
            <slider :value="boxHeight" :min="80" :max="200" @change="onHeightChange" />
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自适应尺寸监听">
      <demo-block direction="column">
        <ui-text>下方容器宽度自适应父容器，点击按钮切换宽度</ui-text>
        <view class="adaptive-demo" :style="{ width: containerWidth }">
          <ui-resize @resize="onAdaptiveResize">
            <view class="adaptive-box">
              <ui-text color="#fff">当前宽度：{{ adaptiveSize.width }}px</ui-text>
            </view>
          </ui-resize>
        </view>
        <view class="button-group">
          <ui-button size="small" @click="containerWidth = '100%'">100%</ui-button>
          <ui-button size="small" @click="containerWidth = '75%'">75%</ui-button>
          <ui-button size="small" @click="containerWidth = '50%'">50%</ui-button>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column">
        <view class="disabled-demo">
          <ui-resize disabled :width="150" :height="100" @resize="onDisabledResize">
            <view class="disabled-box">
              <ui-text color="#999">禁用监听</ui-text>
              <ui-text color="#999" size="small">回调次数：{{ disabledCount }}</ui-text>
            </view>
          </ui-resize>
        </view>
        <ui-text size="small" color="secondary">禁用状态下不会触发 resize 事件</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="应用场景">
      <demo-block direction="column">
        <ui-text bold>场景：响应式图表容器</ui-text>
        <ui-text size="small" color="secondary">当容器尺寸变化时，可以重新渲染图表</ui-text>
        <view class="chart-demo">
          <ui-resize @resize="onChartResize">
            <view class="chart-container">
              <view class="chart-placeholder">
                <ui-icon name="chart" size="32" color="#1989fa" />
                <ui-text size="small">图表区域</ui-text>
                <ui-text size="mini" color="secondary">{{ chartSize.width }} x {{ chartSize.height }}</ui-text>
              </view>
            </view>
          </ui-resize>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="回调数据">
      <demo-block direction="column">
        <ui-text size="small">resize 事件返回的数据结构：</ui-text>
        <view class="code-block">
          <ui-text size="small" color="secondary">{{ JSON.stringify(lastResizeData, null, 2) }}</ui-text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Resize 尺寸监听" },
})

// 基础用法
const boxWidth = ref(200)
const boxHeight = ref(120)
const currentSize = ref({ width: 0, height: 0 })
const lastResizeData = ref({})

function onResize(data: any) {
  currentSize.value = { width: Math.round(data.width), height: Math.round(data.height) }
  lastResizeData.value = data
}

function onWidthChange(e: any) {
  boxWidth.value = e.detail.value
}

function onHeightChange(e: any) {
  boxHeight.value = e.detail.value
}

// 自适应尺寸
const containerWidth = ref("100%")
const adaptiveSize = ref({ width: 0 })

function onAdaptiveResize(data: any) {
  adaptiveSize.value = { width: Math.round(data.width) }
}

// 禁用状态
const disabledCount = ref(0)

function onDisabledResize() {
  disabledCount.value++
}

// 图表场景
const chartSize = ref({ width: 0, height: 0 })

function onChartResize(data: any) {
  chartSize.value = { width: Math.round(data.width), height: Math.round(data.height) }
}
</script>

<style scoped lang="scss">
.resize-demo {
  display: flex;
  padding: 20px;
  background: #f5f6fa;
  border-radius: 8px;
  justify-content: center;
}

.resize-box {
  gap: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  background: linear-gradient(135deg, #1989fa, #07c160);
  align-items: center;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
}

.slider-group {
  gap: 12px;
  display: flex;
  margin-top: 16px;
  flex-direction: column;
}

.slider-item {
  gap: 12px;
  display: flex;
  align-items: center;

  slider {
    flex: 1;
  }
}

.adaptive-demo {
  padding: 20px;
  background: #f5f6fa;
  transition: width 0.3s ease;
  border-radius: 8px;
}

.adaptive-box {
  width: 100%;
  height: 80px;
  display: flex;
  background: linear-gradient(135deg, #7232dd, #ff6b6b);
  align-items: center;
  border-radius: 8px;
  justify-content: center;
}

.button-group {
  gap: 12px;
  display: flex;
  margin-top: 16px;
}

.disabled-demo {
  display: flex;
  padding: 20px;
  background: #f5f6fa;
  border-radius: 8px;
  justify-content: center;
}

.disabled-box {
  gap: 4px;
  width: 100%;
  border: 2px dashed #ccc;
  height: 100%;
  display: flex;
  background: #eee;
  align-items: center;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
}

.chart-demo {
  padding: 16px;
  background: #f5f6fa;
  margin-top: 12px;
  border-radius: 8px;
}

.chart-container {
  width: 100%;
  height: 150px;
}

.chart-placeholder {
  gap: 8px;
  width: 100%;
  border: 1px dashed #1989fa;
  height: 100%;
  display: flex;
  background: #fff;
  align-items: center;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
}

.code-block {
  padding: 12px;
  background: #f5f6fa;
  margin-top: 12px;
  word-break: break-all;
  font-family: monospace;
  white-space: pre-wrap;
  border-radius: 8px;
}
</style>
