<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-button type="primary" @click="showCenter = true">居中弹出</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="弹出位置">
      <demo-block :cols="4" :gap="24">
        <ui-button @click="showTop = true">顶部</ui-button>
        <ui-button @click="showBottom = true">底部</ui-button>
        <ui-button @click="showLeft = true">左侧</ui-button>
        <ui-button @click="showRight = true">右侧</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="关闭图标">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showClose = true">显示关闭图标</ui-button>
        <ui-button type="primary" @click="showCloseTop = true">顶部关闭图标</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：关闭图标位置 -->
    <demo-section title="图标位置">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showCloseTopLeft = true">左上角</ui-button>
        <ui-button @click="showCloseTopRight = true">右上角</ui-button>
        <ui-button @click="showCloseBottomLeft = true">左下角</ui-button>
        <ui-button @click="showCloseBottomRight = true">右下角</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="圆角弹窗">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showRound = true">圆角弹窗</ui-button>
        <ui-button type="primary" @click="showRoundTop = true">顶部圆角</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义尺寸 -->
    <demo-section title="自定义尺寸">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showCustomSize = true">自定义宽高</ui-button>
        <ui-button @click="showMaxSize = true">最大尺寸限制</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：动画时长 -->
    <demo-section title="动画时长">
      <demo-block :cols="3" :gap="16">
        <ui-button size="small" @click="showDuration(100)">100ms</ui-button>
        <ui-button size="small" @click="showDuration(300)">300ms</ui-button>
        <ui-button size="small" @click="showDuration(500)">500ms</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：遮罩层配置 -->
    <demo-section title="遮罩层配置">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showNoOverlay = true">无遮罩层</ui-button>
        <ui-button @click="showOverlayStyle = true">自定义遮罩</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：禁止点击遮罩关闭 -->
    <demo-section title="禁止点击遮罩关闭">
      <demo-block>
        <ui-button type="warning" @click="showNoCloseOnOverlay = true">禁止点击遮罩关闭</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义背景 -->
    <demo-section title="自定义背景">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showCustomBg = true">自定义背景色</ui-button>
        <ui-button @click="showGradientBg = true">渐变背景</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：安全区域 -->
    <demo-section title="安全区域">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showSafeTop = true">顶部安全区</ui-button>
        <ui-button @click="showSafeBottom = true">底部安全区</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-button type="primary" @click="showEvent = true">监听事件</ui-button>
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block>
        <ui-button type="primary" @click="showCustomStyle = true">自定义样式</ui-button>
      </demo-block>
    </demo-section>

    <!-- Popup Components -->
    <!-- 基础弹窗 -->
    <ui-popup v-model:show="showCenter" position="center">
      <view class="popup-content center-content">
        <text>居中弹出内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showTop" position="top">
      <view class="popup-content top-content">
        <text>顶部弹出内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showBottom" position="bottom">
      <view class="popup-content bottom-content">
        <text>底部弹出内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showLeft" position="left">
      <view class="popup-content left-content">
        <text>左侧弹出</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showRight" position="right">
      <view class="popup-content right-content">
        <text>右侧弹出</text>
      </view>
    </ui-popup>

    <!-- 关闭图标 -->
    <ui-popup v-model:show="showClose" position="bottom" closeable>
      <view class="popup-content bottom-content">
        <text>带关闭图标的弹窗</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showCloseTop" position="top" closeable>
      <view class="popup-content top-content">
        <text>顶部带关闭图标</text>
      </view>
    </ui-popup>

    <!-- 关闭图标位置 -->
    <ui-popup v-model:show="showCloseTopLeft" position="center" closeable close-icon-position="top-left">
      <view class="popup-content center-content">
        <text>左上角关闭图标</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showCloseTopRight" position="center" closeable close-icon-position="top-right">
      <view class="popup-content center-content">
        <text>右上角关闭图标</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showCloseBottomLeft" position="center" closeable close-icon-position="bottom-left">
      <view class="popup-content center-content">
        <text>左下角关闭图标</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showCloseBottomRight" position="center" closeable close-icon-position="bottom-right">
      <view class="popup-content center-content">
        <text>右下角关闭图标</text>
      </view>
    </ui-popup>

    <!-- 圆角弹窗 -->
    <ui-popup v-model:show="showRound" position="bottom" round>
      <view class="popup-content bottom-content">
        <text>圆角弹窗内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showRoundTop" position="top" round>
      <view class="popup-content top-content">
        <text>顶部圆角弹窗</text>
      </view>
    </ui-popup>

    <!-- 自定义尺寸 -->
    <ui-popup v-model:show="showCustomSize" position="center" width="600rpx" height="400rpx">
      <view class="popup-content" style="width: 100%; height: 100%">
        <text>自定义宽高 600rpx × 400rpx</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showMaxSize" position="bottom" max-height="50vh">
      <view class="popup-content" style="height: 800rpx">
        <text>最大高度 50vh，内容高度 800rpx</text>
      </view>
    </ui-popup>

    <!-- 动画时长 -->
    <ui-popup v-model:show="showDurationPopup" position="center" :duration="currentDuration">
      <view class="popup-content center-content">
        <text>动画时长: {{ currentDuration }}ms</text>
      </view>
    </ui-popup>

    <!-- 遮罩层配置 -->
    <ui-popup v-model:show="showNoOverlay" position="bottom" :overlay="false" closeable>
      <view class="popup-content bottom-content">
        <text>无遮罩层弹窗</text>
      </view>
    </ui-popup>

    <ui-popup
      v-model:show="showOverlayStyle"
      position="center"
      :overlay-style="{ background: 'rgba(25, 137, 250, 0.3)' }"
    >
      <view class="popup-content center-content">
        <text>自定义遮罩层颜色</text>
      </view>
    </ui-popup>

    <!-- 禁止点击遮罩关闭 -->
    <ui-popup v-model:show="showNoCloseOnOverlay" position="center" :close-on-click-overlay="false" closeable>
      <view class="popup-content center-content">
        <text>只能点击关闭图标关闭</text>
      </view>
    </ui-popup>

    <!-- 自定义背景 -->
    <ui-popup v-model:show="showCustomBg" position="center" background="#e8f4ff">
      <view class="popup-content center-content" style="background: transparent">
        <text>浅蓝色背景</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showGradientBg" position="center" background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <view class="popup-content center-content" style="background: transparent; color: #fff">
        <text>渐变背景</text>
      </view>
    </ui-popup>

    <!-- 安全区域 -->
    <ui-popup v-model:show="showSafeTop" position="top" safe-area-inset-top closeable>
      <view class="popup-content top-content">
        <text>顶部安全区域</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showSafeBottom" position="bottom" safe-area-inset-bottom closeable>
      <view class="popup-content bottom-content">
        <text>底部安全区域</text>
      </view>
    </ui-popup>

    <!-- 事件处理 -->
    <ui-popup
      v-model:show="showEvent"
      position="center"
      closeable
      @open="onPopupOpen"
      @opened="onPopupOpened"
      @close="onPopupClose"
      @closed="onPopupClosed"
      @click="onPopupClick"
      @click-close="onPopupClickClose"
      @click-overlay="onPopupClickOverlay"
    >
      <view class="popup-content center-content">
        <text>点击区域查看事件</text>
      </view>
    </ui-popup>

    <!-- 自定义样式 -->
    <ui-popup
      v-model:show="showCustomStyle"
      position="center"
      custom-class="my-popup"
      :custom-style="{ boxShadow: '0 8rpx 32rpx rgba(0,0,0,0.2)' }"
      :border-radius="32"
      :z-index="1000"
    >
      <view class="popup-content center-content">
        <text>自定义样式弹窗</text>
      </view>
    </ui-popup>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Popup 弹出层" },
})

const { showToast } = useToast()

// 基础示例
const showCenter = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
const showClose = ref(false)
const showCloseTop = ref(false)
const showRound = ref(false)
const showRoundTop = ref(false)

// 新增示例
const showCloseTopLeft = ref(false)
const showCloseTopRight = ref(false)
const showCloseBottomLeft = ref(false)
const showCloseBottomRight = ref(false)
const showCustomSize = ref(false)
const showMaxSize = ref(false)
const showDurationPopup = ref(false)
const currentDuration = ref(300)
const showNoOverlay = ref(false)
const showOverlayStyle = ref(false)
const showNoCloseOnOverlay = ref(false)
const showCustomBg = ref(false)
const showGradientBg = ref(false)
const showSafeTop = ref(false)
const showSafeBottom = ref(false)
const showEvent = ref(false)
const showCustomStyle = ref(false)

// 事件日志
const eventLog = ref("点击弹窗触发事件")

// 动画时长
function showDuration(duration: number) {
  currentDuration.value = duration
  showDurationPopup.value = true
}

// 事件处理
function onPopupOpen() {
  eventLog.value = "触发 open 事件"
}

function onPopupOpened() {
  eventLog.value = "触发 opened 事件 - 动画结束"
  showToast({ message: "弹窗已打开", type: "success" })
}

function onPopupClose(action: string) {
  eventLog.value = `触发 close 事件, action: ${action}`
}

function onPopupClosed(action: string) {
  eventLog.value = `触发 closed 事件, action: ${action}`
  showToast({ message: "弹窗已关闭" })
}

function onPopupClick() {
  eventLog.value = "触发 click 事件"
}

function onPopupClickClose() {
  eventLog.value = "触发 click-close 事件"
}

function onPopupClickOverlay() {
  eventLog.value = "触发 click-overlay 事件"
}
</script>

<style lang="scss" scoped>
.demo-text {
  font-size: 24rpx;
  color: var(--ui-color-text-secondary);
}

.popup-content {
  display: flex;
  padding: 48rpx;
  background: #fff;
  align-items: center;
  justify-content: center;
}

.center-content {
  width: 500rpx;
  height: 300rpx;
  border-radius: 16rpx;
}

.top-content,
.bottom-content {
  width: 100%;
  min-height: 400rpx;
}

.left-content,
.right-content {
  width: 50vw;
  height: 100vh;
}

:deep(.my-popup) {
  border: 4rpx solid #1989fa;
}
</style>
