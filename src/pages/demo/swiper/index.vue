<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="双向绑定">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前索引: {{ currentIndex }}</text>
        <demo-block :cols="4" :gap="16">
          <ui-button v-for="i in 4" :key="i" size="small" :type="currentIndex === i - 1 ? 'primary' : 'default'" @click="currentIndex = i - 1">
            {{ i }}
          </ui-button>
        </demo-block>
        <ui-swiper v-model:current="currentIndex" :list="images" height="300rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="数字指示器">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" indicator-type="number" />
      </demo-block>
    </demo-section>

    <demo-section title="隐藏指示器">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" :indicator="false" />
      </demo-block>
    </demo-section>

    <demo-section title="指示器位置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前位置: {{ currentPosition }}</text>
        <demo-block :cols="4" :gap="16">
          <ui-button size="small" @click="currentPosition = 'bottom-left'">左下</ui-button>
          <ui-button size="small" @click="currentPosition = 'bottom'">底部</ui-button>
          <ui-button size="small" @click="currentPosition = 'bottom-right'">右下</ui-button>
          <ui-button size="small" @click="currentPosition = 'top'">顶部</ui-button>
        </demo-block>
        <ui-swiper :list="images" height="300rpx" :indicator-position="currentPosition" />
      </demo-block>
    </demo-section>

    <demo-section title="垂直滚动">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前位置: {{ verticalPosition }}</text>
        <demo-block :cols="4" :gap="16">
          <ui-button size="small" @click="verticalPosition = 'left'">左侧</ui-button>
          <ui-button size="small" @click="verticalPosition = 'right'">右侧</ui-button>
          <ui-button size="small" @click="verticalPosition = 'top'">顶部</ui-button>
          <ui-button size="small" @click="verticalPosition = 'bottom'">底部</ui-button>
        </demo-block>
        <ui-swiper :list="images" height="300rpx" vertical :indicator-position="verticalPosition" />
      </demo-block>
    </demo-section>

    <demo-section title="关闭自动播放">
      <demo-block direction="column">
        <ui-swiper :list="images" height="300rpx" :autoplay="false" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义间隔">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前间隔: {{ currentInterval }}ms</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentInterval = 2000">2s</ui-button>
          <ui-button size="small" @click="currentInterval = 3000">3s</ui-button>
          <ui-button size="small" @click="currentInterval = 5000">5s</ui-button>
        </demo-block>
        <ui-swiper :list="images" height="300rpx" :interval="currentInterval" />
      </demo-block>
    </demo-section>

    <demo-section title="动画时长">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 duration 设置滑动动画时长</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentDuration = 300">300ms</ui-button>
          <ui-button size="small" @click="currentDuration = 500">500ms</ui-button>
          <ui-button size="small" @click="currentDuration = 1000">1000ms</ui-button>
        </demo-block>
        <ui-swiper :list="images" height="300rpx" :duration="currentDuration" :autoplay="false" />
      </demo-block>
    </demo-section>

    <demo-section title="缓动函数">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">easing-function: 指定切换缓动动画类型</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentEasing = 'default'">default</ui-button>
          <ui-button size="small" @click="currentEasing = 'linear'">linear</ui-button>
          <ui-button size="small" @click="currentEasing = 'easeInOutCubic'">easeInOut</ui-button>
        </demo-block>
        <ui-swiper :list="images" height="300rpx" :easing-function="currentEasing" :autoplay="false" />
      </demo-block>
    </demo-section>

    <demo-section title="循环播放">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block align="center" :gap="16">
          <ui-switch v-model="isCircular" />
          <text class="switch-label">{{ isCircular ? "循环播放" : "不循环" }}</text>
        </demo-block>
        <ui-swiper :list="images" height="300rpx" :circular="isCircular" :autoplay="false" />
      </demo-block>
    </demo-section>

    <demo-section title="禁止触摸">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block align="center" :gap="16">
          <ui-switch v-model="isDisableTouch" />
          <text class="switch-label">{{ isDisableTouch ? "禁止触摸" : "允许触摸" }}</text>
        </demo-block>
        <ui-swiper :list="images" height="300rpx" :disable-touch="isDisableTouch" />
      </demo-block>
    </demo-section>

    <demo-section title="圆角设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 radius 设置圆角大小</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentRadius = 0">无圆角</ui-button>
          <ui-button size="small" @click="currentRadius = 16">16rpx</ui-button>
          <ui-button size="small" @click="currentRadius = 32">32rpx</ui-button>
        </demo-block>
        <ui-swiper :list="images" height="300rpx" :radius="currentRadius" />
      </demo-block>
    </demo-section>

    <demo-section title="前后露出">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 prev-gap/next-gap 露出前后项</text>
        <ui-swiper :list="images" height="300rpx" prev-gap="40rpx" next-gap="40rpx" :circular="false" />
      </demo-block>
    </demo-section>

    <demo-section title="图片模式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">image-mode 设置图片裁剪、缩放模式</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentImageMode = 'scaleToFill'">scaleToFill</ui-button>
          <ui-button size="small" @click="currentImageMode = 'aspectFit'">aspectFit</ui-button>
          <ui-button size="small" @click="currentImageMode = 'aspectFill'">aspectFill</ui-button>
        </demo-block>
        <ui-swiper :list="images" height="300rpx" :image-mode="currentImageMode" />
      </demo-block>
    </demo-section>

    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-swiper :list="images" height="300rpx" :autoplay="false" @click="onSwiperClick" @change="onSwiperChange" @animationfinish="onSwiperAnimationfinish" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="16">
        <ui-swiper :list="images" height="300rpx" custom-class="my-swiper" :custom-style="{ boxShadow: '0 8rpx 32rpx rgba(0,0,0,0.15)' }" />
      </demo-block>
    </demo-section>

    <demo-section title="综合示例 - 商品轮播">
      <demo-block direction="column">
        <ui-swiper
          v-model:current="productIndex"
          :list="images"
          height="400rpx"
          radius="24rpx"
          indicator-type="number"
          indicator-position="bottom-right"
          :duration="300"
          easing-function="easeInOutCubic"
          image-mode="aspectFill"
          @click="onProductClick"
        />
        <view class="product-info">
          <text class="product-name">商品名称 {{ productIndex + 1 }}</text>
          <text class="product-price">¥{{ (productIndex + 1) * 99 }}.00</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { SwiperEasingFunction, SwiperIndicatorPosition } from "@/uni_modules/uniapp-ui/ui-swiper"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Swiper 轮播" },
})

const toast = useToast()

// 基础数据 - 使用稳定的图片源
const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=750&h=300&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=750&h=300&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=750&h=300&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=750&h=300&fit=crop",
]

// 双向绑定
const currentIndex = ref(0)

// 指示器位置
const currentPosition = ref<SwiperIndicatorPosition>("bottom-right")

// 垂直滚动指示器位置
const verticalPosition = ref<SwiperIndicatorPosition>("right")

// 自定义间隔
const currentInterval = ref(3000)

// 动画时长
const currentDuration = ref(500)

// 缓动函数
const currentEasing = ref<SwiperEasingFunction>("default")

// 循环播放
const isCircular = ref(true)

// 禁止触摸
const isDisableTouch = ref(false)

// 圆角
const currentRadius = ref(0)

// 图片模式
const currentImageMode = ref<UniHelper.ImageProps["mode"]>("scaleToFill")

// 事件处理
const eventLog = ref("滑动轮播图触发事件")

function onSwiperClick(index: number) {
  eventLog.value = `触发 click 事件，索引: ${index}`
  toast.text(`点击了第 ${index + 1} 张图片`)
}

function onSwiperChange(index: number) {
  eventLog.value = `触发 change 事件，切换到: ${index}`
}

function onSwiperAnimationfinish(index: number) {
  eventLog.value = `触发 animationfinish 事件，索引: ${index}`
}

// 商品轮播
const productIndex = ref(0)

function onProductClick(index: number) {
  toast.success(`查看商品 ${index + 1} 详情`)
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.switch-label {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
}

.product-info {
  display: flex;
  padding: 24rpx 0;
  align-items: center;
  justify-content: space-between;
}

.product-name {
  color: var(--ui-color-text-primary);
  font-size: 30rpx;
  font-weight: 600;
}

.product-price {
  color: #ee0a24;
  font-size: 32rpx;
  font-weight: 600;
}

:deep(.my-swiper) {
  border: 4rpx solid #1989fa;
  border-radius: 24rpx;
}
</style>
