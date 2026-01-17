<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-button type="primary" @click="show1 = true">显示遮罩层</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="嵌入内容">
      <demo-block>
        <ui-button type="primary" @click="show2 = true">嵌入内容</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义透明度">
      <demo-block :cols="3" :gap="16">
        <ui-button size="small" @click="showOpacity(0.3)">0.3</ui-button>
        <ui-button size="small" @click="showOpacity(0.5)">0.5</ui-button>
        <ui-button size="small" @click="showOpacity(0.9)">0.9</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：动画时长 -->
    <demo-section title="动画时长">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 duration 设置过渡时间</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="showDuration(100)">100ms</ui-button>
          <ui-button size="small" @click="showDuration(300)">300ms</ui-button>
          <ui-button size="small" @click="showDuration(600)">600ms</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：动画缓动函数 -->
    <demo-section title="动画缓动函数">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">enter-timing-function: 进入动画</text>
        <text class="demo-text">leave-timing-function: 离开动画</text>
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="showTiming('ease')">ease</ui-button>
          <ui-button size="small" @click="showTiming('linear')">linear</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：层级设置 -->
    <demo-section title="层级设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 z-index 设置元素层级</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="showZIndex(100)">z-index: 100</ui-button>
          <ui-button size="small" @click="showZIndex(500)">z-index: 500</ui-button>
          <ui-button size="small" @click="showZIndex(1000)">z-index: 1000</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：懒渲染 -->
    <demo-section title="懒渲染">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">lazy-render 控制是否在显示时才渲染节点</text>
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="showLazy(true)">开启懒渲染</ui-button>
          <ui-button size="small" @click="showLazy(false)">关闭懒渲染</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-button type="primary" @click="showEvent = true">监听事件</ui-button>
        <text class="demo-text">{{ eventLog }}</text>
        <view class="event-list">
          <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
            <text class="event-text">{{ log }}</text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block :cols="2" :gap="24">
        <ui-button size="small" @click="showCustomClass = true">自定义类名</ui-button>
        <ui-button size="small" @click="showCustomStyle = true">自定义样式</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 加载遮罩 -->
    <demo-section title="综合示例 - 加载遮罩">
      <demo-block>
        <ui-button type="primary" @click="showLoading">加载中遮罩</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 确认弹窗 -->
    <demo-section title="综合示例 - 确认弹窗">
      <demo-block>
        <ui-button type="primary" @click="showConfirm = true">确认弹窗</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 图片预览 -->
    <demo-section title="综合示例 - 图片预览">
      <demo-block>
        <ui-button type="primary" @click="showPreview = true">图片预览</ui-button>
      </demo-block>
    </demo-section>

    <!-- Overlay Components -->
    <!-- 基础遮罩 -->
    <ui-overlay v-model:show="show1" @click="show1 = false" />

    <!-- 嵌入内容 -->
    <ui-overlay v-model:show="show2" @click="show2 = false">
      <view class="overlay-content" @click.stop>
        <text class="overlay-text">嵌入内容</text>
        <text class="overlay-text overlay-text--sub">点击遮罩关闭</text>
      </view>
    </ui-overlay>

    <!-- 自定义透明度 -->
    <ui-overlay v-model:show="showOpacityOverlay" :opacity="currentOpacity" @click="showOpacityOverlay = false">
      <view class="overlay-content" @click.stop>
        <text class="overlay-text">透明度: {{ currentOpacity }}</text>
      </view>
    </ui-overlay>

    <!-- 动画时长 -->
    <ui-overlay v-model:show="showDurationOverlay" :duration="currentDuration" @click="showDurationOverlay = false">
      <view class="overlay-content" @click.stop>
        <text class="overlay-text">时长: {{ currentDuration }}ms</text>
      </view>
    </ui-overlay>

    <!-- 动画缓动 -->
    <ui-overlay v-model:show="showTimingOverlay" :duration="500" :enter-timing-function="currentTiming" :leave-timing-function="currentTiming" @click="showTimingOverlay = false">
      <view class="overlay-content" @click.stop>
        <text class="overlay-text">缓动: {{ currentTiming }}</text>
      </view>
    </ui-overlay>

    <!-- 层级设置 -->
    <ui-overlay v-model:show="showZIndexOverlay" :z-index="currentZIndex" @click="showZIndexOverlay = false">
      <view class="overlay-content" @click.stop>
        <text class="overlay-text">z-index: {{ currentZIndex }}</text>
      </view>
    </ui-overlay>

    <!-- 懒渲染 -->
    <ui-overlay v-model:show="showLazyOverlay" :lazy-render="currentLazyRender" @click="showLazyOverlay = false">
      <view class="overlay-content" @click.stop>
        <text class="overlay-text">lazy-render: {{ currentLazyRender }}</text>
      </view>
    </ui-overlay>

    <!-- 事件处理 -->
    <ui-overlay v-model:show="showEvent" :duration="400" @open="onOverlayOpen" @opened="onOverlayOpened" @close="onOverlayClose" @closed="onOverlayClosed" @click="onOverlayClick">
      <view class="overlay-content" @click.stop>
        <text class="overlay-text">点击遮罩查看事件</text>
        <ui-button size="small" type="primary" @click="showEvent = false">关闭</ui-button>
      </view>
    </ui-overlay>

    <!-- 自定义类名 -->
    <ui-overlay v-model:show="showCustomClass" custom-class="my-overlay" @click="showCustomClass = false">
      <view class="overlay-content" @click.stop>
        <text class="overlay-text">自定义类名</text>
        <text class="overlay-text overlay-text--sub">背景色渐变</text>
      </view>
    </ui-overlay>

    <!-- 自定义样式 -->
    <ui-overlay v-model:show="showCustomStyle" :custom-style="{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.3)' }" @click="showCustomStyle = false">
      <view class="overlay-content overlay-content--dark" @click.stop>
        <text class="overlay-text overlay-text--dark">毛玻璃效果</text>
      </view>
    </ui-overlay>

    <!-- 加载遮罩 -->
    <ui-overlay v-model:show="showLoadingOverlay" :opacity="0.5">
      <view class="loading-content">
        <ui-loading size="48rpx" color="#fff" />
        <text class="loading-text">加载中...</text>
      </view>
    </ui-overlay>

    <!-- 确认弹窗 -->
    <ui-overlay v-model:show="showConfirm" :opacity="0.6">
      <view class="confirm-dialog" @click.stop>
        <view class="confirm-header">
          <text class="confirm-title">确认提示</text>
        </view>
        <view class="confirm-body">
          <text class="confirm-text">确定要执行此操作吗？</text>
        </view>
        <view class="confirm-footer">
          <ui-button size="small" @click="onConfirmCancel">取消</ui-button>
          <ui-button size="small" type="primary" @click="onConfirmOk">确定</ui-button>
        </view>
      </view>
    </ui-overlay>

    <!-- 图片预览 -->
    <ui-overlay v-model:show="showPreview" :opacity="0.9" @click="showPreview = false">
      <view class="preview-content">
        <image class="preview-image" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" mode="aspectFit" />
        <text class="preview-tip">点击任意位置关闭</text>
      </view>
    </ui-overlay>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Overlay 遮罩层" },
})

const toast = useToast()

// 基础示例
const show1 = ref(false)
const show2 = ref(false)

// 透明度
const showOpacityOverlay = ref(false)
const currentOpacity = ref(0.7)

function showOpacity(opacity: number) {
  currentOpacity.value = opacity
  showOpacityOverlay.value = true
}

// 动画时长
const showDurationOverlay = ref(false)
const currentDuration = ref(300)

function showDuration(duration: number) {
  currentDuration.value = duration
  showDurationOverlay.value = true
}

// 动画缓动
const showTimingOverlay = ref(false)
const currentTiming = ref("ease-out")

function showTiming(timing: string) {
  currentTiming.value = timing
  showTimingOverlay.value = true
}

// 层级
const showZIndexOverlay = ref(false)
const currentZIndex = ref(100)

function showZIndex(zIndex: number) {
  currentZIndex.value = zIndex
  showZIndexOverlay.value = true
}

// 懒渲染
const showLazyOverlay = ref(false)
const currentLazyRender = ref(true)

function showLazy(lazy: boolean) {
  currentLazyRender.value = lazy
  showLazyOverlay.value = true
}

// 事件处理
const showEvent = ref(false)
const eventLog = ref("点击按钮触发事件")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
  eventLog.value = log
}

function onOverlayOpen() {
  addEventLog("触发 open 事件")
}

function onOverlayOpened() {
  addEventLog("触发 opened 事件 - 动画结束")
}

function onOverlayClose() {
  addEventLog("触发 close 事件")
}

function onOverlayClosed() {
  addEventLog("触发 closed 事件 - 动画结束")
}

function onOverlayClick() {
  addEventLog("触发 click 事件")
  showEvent.value = false
}

// 自定义样式
const showCustomClass = ref(false)
const showCustomStyle = ref(false)

// 加载遮罩
const showLoadingOverlay = ref(false)

function showLoading() {
  showLoadingOverlay.value = true
  setTimeout(() => {
    showLoadingOverlay.value = false
    toast.success("加载完成")
  }, 2000)
}

// 确认弹窗
const showConfirm = ref(false)

function onConfirmCancel() {
  showConfirm.value = false
  toast.text("已取消")
}

function onConfirmOk() {
  showConfirm.value = false
  toast.success("已确认")
}

// 图片预览
const showPreview = ref(false)
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.event-list {
  width: 100%;
  padding: 16rpx;
  background: var(--ui-color-background-light);
  max-height: 250rpx;
  overflow-y: auto;
  border-radius: 8rpx;
}

.event-item {
  padding: 8rpx 0;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }
}

.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 22rpx;
}

.overlay-content {
  gap: 16rpx;
  width: 300rpx;
  height: 300rpx;
  display: flex;
  background: var(--ui-color-background);
  align-items: center;
  border-radius: 16rpx;
  flex-direction: column;
  justify-content: center;

  &--dark {
    background: rgba(0, 0, 0, 0.8);
  }
}

.overlay-text {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;

  &--sub {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }

  &--dark {
    color: #fff;
  }
}

.loading-content {
  gap: 24rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.loading-text {
  color: #fff;
  font-size: 28rpx;
}

.confirm-dialog {
  width: 560rpx;
  overflow: hidden;
  background: #fff;
  border-radius: 24rpx;
}

.confirm-header {
  padding: 32rpx;
  text-align: center;
  border-bottom: 1rpx solid var(--ui-color-border-light);
}

.confirm-title {
  color: var(--ui-color-text-primary);
  font-size: 32rpx;
  font-weight: 600;
}

.confirm-body {
  padding: 40rpx 32rpx;
  text-align: center;
}

.confirm-text {
  color: var(--ui-color-text-secondary);
  font-size: 28rpx;
}

.confirm-footer {
  gap: 24rpx;
  display: flex;
  padding: 24rpx 32rpx;
  border-top: 1rpx solid var(--ui-color-border-light);
  justify-content: center;
}

.preview-content {
  gap: 32rpx;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.preview-image {
  width: 600rpx;
  height: 600rpx;
  border-radius: 16rpx;
}

.preview-tip {
  color: rgba(255, 255, 255, 0.7);
  font-size: 26rpx;
}

:deep(.my-overlay) {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%) !important;
}
</style>
