<template>
  <demo-page>
    <demo-section title="基础用法 (fade)">
      <demo-block direction="column">
        <ui-button size="small" @click="show1 = !show1">{{ show1 ? "隐藏" : "显示" }}</ui-button>
        <view class="transition-box">
          <ui-transition :show="show1">
            <view class="demo-content">Fade 淡入淡出</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="缩放动画 (zoom-in)">
      <demo-block direction="column">
        <ui-button size="small" @click="show2 = !show2">{{ show2 ? "隐藏" : "显示" }}</ui-button>
        <view class="transition-box">
          <ui-transition :show="show2" name="zoom-in">
            <view class="demo-content">Zoom In 缩放</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="滑动动画">
      <demo-block direction="column">
        <demo-block :cols="4" :gap="24">
          <ui-button size="small" @click="toggleSlide('up')">上滑</ui-button>
          <ui-button size="small" @click="toggleSlide('down')">下滑</ui-button>
          <ui-button size="small" @click="toggleSlide('left')">左滑</ui-button>
          <ui-button size="small" @click="toggleSlide('right')">右滑</ui-button>
        </demo-block>
        <view class="transition-box">
          <ui-transition :show="show3" :name="slideName">
            <view class="demo-content">Slide {{ slideDirection }}</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="淡入动画">
      <demo-block direction="column">
        <demo-block :cols="4" :gap="24">
          <ui-button size="small" @click="toggleFade('up')">上淡入</ui-button>
          <ui-button size="small" @click="toggleFade('down')">下淡入</ui-button>
          <ui-button size="small" @click="toggleFade('left')">左淡入</ui-button>
          <ui-button size="small" @click="toggleFade('right')">右淡入</ui-button>
        </demo-block>
        <view class="transition-box">
          <ui-transition :show="show4" :name="fadeName">
            <view class="demo-content">Fade {{ fadeDirection }}</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义时长">
      <demo-block direction="column">
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="show5 = !show5">100ms</ui-button>
          <ui-button size="small" @click="show6 = !show6">300ms</ui-button>
          <ui-button size="small" @click="show7 = !show7">800ms</ui-button>
        </demo-block>
        <view class="transition-row">
          <ui-transition :show="show5" :duration="100">
            <view class="demo-content small">快速</view>
          </ui-transition>
          <ui-transition :show="show6" :duration="300">
            <view class="demo-content small">正常</view>
          </ui-transition>
          <ui-transition :show="show7" :duration="800">
            <view class="demo-content small">慢速</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：动画缓动函数 -->
    <demo-section title="动画缓动函数">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">enter-timing-function: 进入动画函数</text>
        <text class="demo-text">leave-timing-function: 离开动画函数</text>
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="showEase1 = !showEase1">ease (默认)</ui-button>
          <ui-button size="small" @click="showEase2 = !showEase2">linear</ui-button>
          <ui-button size="small" @click="showEase3 = !showEase3">ease-in-out</ui-button>
          <ui-button size="small" @click="showEase4 = !showEase4">贝塞尔曲线</ui-button>
        </demo-block>
        <view class="transition-row">
          <ui-transition :show="showEase1" :duration="500" enter-timing-function="ease-out" leave-timing-function="ease-in">
            <view class="demo-content small">ease</view>
          </ui-transition>
          <ui-transition :show="showEase2" :duration="500" enter-timing-function="linear" leave-timing-function="linear">
            <view class="demo-content small">linear</view>
          </ui-transition>
        </view>
        <view class="transition-row">
          <ui-transition :show="showEase3" :duration="500" enter-timing-function="ease-in-out" leave-timing-function="ease-in-out">
            <view class="demo-content small">ease-in-out</view>
          </ui-transition>
          <ui-transition
            :show="showEase4"
            :duration="500"
            enter-timing-function="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            leave-timing-function="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
          >
            <view class="demo-content small">弹性效果</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：懒渲染 -->
    <demo-section title="懒渲染">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">lazy-render: 是否在显示时才渲染节点 (默认 true)</text>
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="showLazy1 = !showLazy1">开启懒渲染</ui-button>
          <ui-button size="small" @click="showLazy2 = !showLazy2">关闭懒渲染</ui-button>
        </demo-block>
        <view class="transition-row">
          <ui-transition :show="showLazy1" :lazy-render="true">
            <view class="demo-content small">lazy-render: true</view>
          </ui-transition>
          <ui-transition :show="showLazy2" :lazy-render="false">
            <view class="demo-content small">lazy-render: false</view>
          </ui-transition>
        </view>
        <text class="demo-text demo-text--tip">关闭懒渲染时，节点会在初始时就被渲染</text>
      </demo-block>
    </demo-section>

    <!-- 新增：元素层级 -->
    <demo-section title="元素层级">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 z-index 设置元素层级</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentZIndex = 1">z-index: 1</ui-button>
          <ui-button size="small" @click="currentZIndex = 10">z-index: 10</ui-button>
          <ui-button size="small" @click="currentZIndex = 100">z-index: 100</ui-button>
        </demo-block>
        <ui-button size="small" type="primary" @click="showZIndex = !showZIndex">
          {{ showZIndex ? "隐藏" : "显示" }}
        </ui-button>
        <view class="transition-box transition-box--overlay">
          <view class="overlay-box">遮罩层 z-index: 5</view>
          <ui-transition :show="showZIndex" name="zoom-in" :z-index="currentZIndex">
            <view class="demo-content demo-content--zindex">当前 z-index: {{ currentZIndex }}</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-button type="primary" size="small" @click="showEvent = !showEvent">
          {{ showEvent ? "隐藏" : "显示" }}
        </ui-button>
        <text class="demo-text">{{ eventLog }}</text>
        <view class="transition-box">
          <ui-transition
            :show="showEvent"
            name="zoom-in"
            :duration="500"
            @click="onTransitionClick"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
            @after-leave="onAfterLeave"
          >
            <view class="demo-content" @click.stop>点击区域查看事件</view>
          </ui-transition>
        </view>
        <view class="event-list">
          <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
            <text class="event-text">{{ log }}</text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="24">
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="showCustom1 = !showCustom1">自定义类名</ui-button>
          <ui-button size="small" @click="showCustom2 = !showCustom2">自定义样式</ui-button>
        </demo-block>
        <view class="transition-row">
          <ui-transition :show="showCustom1" custom-class="my-transition">
            <view class="demo-content small">自定义类名</view>
          </ui-transition>
          <ui-transition :show="showCustom2" :custom-style="{ transform: 'rotate(5deg)', boxShadow: '0 8rpx 32rpx rgba(0,0,0,0.2)' }">
            <view class="demo-content small">自定义样式</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 轮播切换效果 -->
    <demo-section title="综合示例 - 图片切换">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="4" :gap="16">
          <ui-button v-for="(anim, index) in animations" :key="anim.name" size="small" :type="currentAnim === index ? 'primary' : 'default'" @click="switchAnimation(index)">
            {{ anim.label }}
          </ui-button>
        </demo-block>
        <view class="carousel-box">
          <ui-transition :show="showImage" :name="animations[currentAnim].name" :duration="400" enter-timing-function="ease-out" leave-timing-function="ease-in">
            <view class="carousel-item" :style="{ background: carouselColors[currentImage] }">
              <text class="carousel-text">图片 {{ currentImage + 1 }}</text>
            </view>
          </ui-transition>
        </view>
        <demo-block :cols="2" :gap="24">
          <ui-button type="primary" size="small" @click="prevImage">上一张</ui-button>
          <ui-button type="primary" size="small" @click="nextImage">下一张</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 弹窗效果 -->
    <demo-section title="综合示例 - 弹窗效果">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="showModal('fade')">淡入弹窗</ui-button>
          <ui-button size="small" @click="showModal('zoom-in')">缩放弹窗</ui-button>
          <ui-button size="small" @click="showModal('slide-up')">上滑弹窗</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 弹窗：使用 Flexbox 居中，避免 transform 冲突 -->
    <ui-transition :show="showModalOverlay" :duration="300">
      <view class="modal-overlay" @click="closeModal">
        <!-- 弹窗内容嵌套在遮罩内，由遮罩的 flexbox 负责居中 -->
        <ui-transition :show="showModalContent" :name="modalAnimation" :duration="300" enter-timing-function="ease-out" leave-timing-function="ease-in">
          <view class="modal-content" @click.stop>
            <view class="modal-header">
              <text class="modal-title">弹窗标题</text>
            </view>
            <view class="modal-body">
              <text class="modal-text">这是一个使用 {{ modalAnimation }} 动画的弹窗示例。</text>
              <text class="modal-text">Transition 组件可以为任意内容添加进入/离开动画。</text>
            </view>
            <view class="modal-footer">
              <ui-button type="primary" size="small" @click="closeModal">关闭</ui-button>
            </view>
          </view>
        </ui-transition>
      </view>
    </ui-transition>

    <demo-section title="动画类型说明">
      <demo-block direction="column" align="start">
        <text class="tip-text">1. fade - 淡入淡出</text>
        <text class="tip-text">2. zoom-in - 缩放</text>
        <text class="tip-text">3. fade-up/down/left/right - 方向淡入</text>
        <text class="tip-text">4. slide-up/down/left/right - 方向滑动</text>
        <text class="tip-text">5. duration - 控制动画时长</text>
        <text class="tip-text">6. timing-function - 控制动画缓动曲线</text>
        <text class="tip-text">7. lazy-render - 控制是否懒渲染</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TransitionName } from "@/uni_modules/uniapp-ui/ui-transition"
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Transition 过渡动画" },
})

const toast = useToast()

// 基础示例
const show1 = ref(true)
const show2 = ref(true)
const show3 = ref(true)
const show4 = ref(true)
const show5 = ref(true)
const show6 = ref(true)
const show7 = ref(true)

const slideDirection = ref("up")
const fadeDirection = ref("up")

const slideName = computed(() => `slide-${slideDirection.value}` as TransitionName)
const fadeName = computed(() => `fade-${fadeDirection.value}` as TransitionName)

function toggleSlide(direction: string) {
  slideDirection.value = direction
  show3.value = false
  setTimeout(() => {
    show3.value = true
  }, 100)
}

function toggleFade(direction: string) {
  fadeDirection.value = direction
  show4.value = false
  setTimeout(() => {
    show4.value = true
  }, 100)
}

// 缓动函数
const showEase1 = ref(true)
const showEase2 = ref(true)
const showEase3 = ref(true)
const showEase4 = ref(true)

// 懒渲染
const showLazy1 = ref(true)
const showLazy2 = ref(true)

// z-index
const showZIndex = ref(true)
const currentZIndex = ref(10)

// 事件处理
const showEvent = ref(false)
const eventLog = ref("点击按钮触发事件")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 6) {
    eventLogs.value.pop()
  }
  eventLog.value = log
}

function onTransitionClick() {
  addEventLog("触发 click 事件")
}

function onBeforeEnter() {
  addEventLog("触发 before-enter 事件")
}

function onEnter() {
  addEventLog("触发 enter 事件")
}

function onAfterEnter() {
  addEventLog("触发 after-enter 事件")
  toast.success("进入动画完成")
}

function onBeforeLeave() {
  addEventLog("触发 before-leave 事件")
}

function onLeave() {
  addEventLog("触发 leave 事件")
}

function onAfterLeave() {
  addEventLog("触发 after-leave 事件")
  toast.text("离开动画完成")
}

// 自定义样式
const showCustom1 = ref(true)
const showCustom2 = ref(true)

// 综合示例 - 图片切换
const showImage = ref(true)
const currentImage = ref(0)
const currentAnim = ref(0)

const animations: Array<{ name: TransitionName; label: string }> = [
  { name: "fade", label: "淡入" },
  { name: "zoom-in", label: "缩放" },
  { name: "slide-left", label: "左滑" },
  { name: "fade-up", label: "上淡入" },
]

const carouselColors = ["#1989fa", "#07c160", "#ee0a24", "#ff9500"]

function switchAnimation(index: number) {
  currentAnim.value = index
}

function prevImage() {
  showImage.value = false
  setTimeout(() => {
    currentImage.value = (currentImage.value - 1 + carouselColors.length) % carouselColors.length
    showImage.value = true
  }, 200)
}

function nextImage() {
  showImage.value = false
  setTimeout(() => {
    currentImage.value = (currentImage.value + 1) % carouselColors.length
    showImage.value = true
  }, 200)
}

// 综合示例 - 弹窗
const showModalOverlay = ref(false)
const showModalContent = ref(false)
const modalAnimation = ref<TransitionName>("fade")

function showModal(animation: TransitionName) {
  modalAnimation.value = animation
  showModalOverlay.value = true
  setTimeout(() => {
    showModalContent.value = true
  }, 50)
}

function closeModal() {
  showModalContent.value = false
  setTimeout(() => {
    showModalOverlay.value = false
  }, 300)
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;

  &--tip {
    color: var(--ui-color-text-tertiary);
    font-size: 22rpx;
  }
}

.transition-box {
  margin-top: 16rpx;
  min-height: 120rpx;

  &--overlay {
    position: relative;

    .overlay-box {
      top: 0;
      left: 0;
      color: #fff;
      right: 0;
      bottom: 0;
      display: flex;
      z-index: 5;
      position: absolute;
      font-size: 24rpx;
      background: rgba(0, 0, 0, 0.3);
      align-items: center;
      border-radius: 12rpx;
      justify-content: center;
    }
  }
}

.transition-row {
  gap: 20rpx;
  display: flex;
  margin-top: 16rpx;
  min-height: 100rpx;
}

.demo-content {
  color: #fff;
  padding: 32rpx;
  font-size: 28rpx;
  background: var(--ui-color-primary);
  text-align: center;
  border-radius: 12rpx;

  &.small {
    flex: 1;
    padding: 24rpx;
  }

  &--zindex {
    position: relative;
  }
}

.event-list {
  width: 100%;
  padding: 16rpx;
  background: var(--ui-color-background-light);
  max-height: 300rpx;
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

.carousel-box {
  width: 100%;
  height: 300rpx;
  overflow: hidden;
  position: relative;
  border-radius: 16rpx;
}

.carousel-item {
  width: 100%;
  height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-text {
  color: #fff;
  font-size: 36rpx;
  font-weight: 600;
}

.modal-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 1000;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
}

.modal-content {
  width: 600rpx;
  overflow: hidden;
  background: #fff;
  border-radius: 24rpx;
}

.modal-header {
  padding: 32rpx;
  text-align: center;
  border-bottom: 1rpx solid var(--ui-color-border-light);
}

.modal-title {
  color: var(--ui-color-text-main);
  font-size: 32rpx;
  font-weight: 600;
}

.modal-body {
  padding: 32rpx;
}

.modal-text {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 28rpx;
  line-height: 1.6;
  margin-bottom: 16rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.modal-footer {
  display: flex;
  padding: 24rpx 32rpx;
  border-top: 1rpx solid var(--ui-color-border-light);
  justify-content: center;
}

.tip-text {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
  line-height: 1.8;
}

:deep(.my-transition) {
  border: 4rpx dashed #1989fa;
  border-radius: 16rpx;
}
</style>
