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
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="show5 = !show5">快速 (200ms)</ui-button>
          <ui-button size="small" @click="show6 = !show6">慢速 (800ms)</ui-button>
        </demo-block>
        <view class="transition-row">
          <ui-transition :show="show5" :duration="200">
            <view class="demo-content small">快速</view>
          </ui-transition>
          <ui-transition :show="show6" :duration="800">
            <view class="demo-content small">慢速</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Transition 过渡动画" },
})

const show1 = ref(true)
const show2 = ref(true)
const show3 = ref(true)
const show4 = ref(true)
const show5 = ref(true)
const show6 = ref(true)

const slideDirection = ref("up")
const fadeDirection = ref("up")

const slideName = computed(() => `slide-${slideDirection.value}`)
const fadeName = computed(() => `fade-${fadeDirection.value}`)

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
</script>

<style lang="scss" scoped>
.transition-box {
  margin-top: 16rpx;
  min-height: 120rpx;
}

.transition-row {
  gap: 20rpx;
  display: flex;
  margin-top: 16rpx;
  min-height: 120rpx;
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
}
</style>
