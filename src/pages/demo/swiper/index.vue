<template>
  <demo-page>
    <demo-section title="基础用法" desc="字符串数组直接渲染">
      <ui-swiper :list="images" height="300rpx" />
    </demo-section>

    <demo-section title="双向绑定 v-model:current" desc="按钮组切换索引">
      <demo-block direction="column" :gap="16">
        <ui-swiper v-model:current="currentIndex" :list="images" height="300rpx" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="i in images.length" :key="i" size="small" :type="currentIndex === i - 1 ? 'primary' : 'default'" @click="currentIndex = i - 1">
            {{ i }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="指示器类型" desc="dot / number / 隐藏 切换">
      <demo-block direction="column" :gap="16">
        <ui-swiper :list="images" height="300rpx" :indicator="indicator.show" :indicator-type="indicator.type" />
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" :type="indicator.show && indicator.type === 'dot' ? 'primary' : 'default'" @click="setIndicator(true, 'dot')">圆点</ui-button>
          <ui-button size="small" :type="indicator.show && indicator.type === 'number' ? 'primary' : 'default'" @click="setIndicator(true, 'number')">数字</ui-button>
          <ui-button size="small" :type="!indicator.show ? 'primary' : 'default'" @click="setIndicator(false, indicator.type)">隐藏</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="指示器位置" desc="8 个方位切换">
      <demo-block direction="column" :gap="16">
        <ui-swiper :list="images" height="300rpx" :indicator-position="position" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="p in positions" :key="p" size="small" :type="position === p ? 'primary' : 'default'" @click="position = p">
            {{ p }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="垂直滚动" desc="vertical + 适用于纵向 banner">
      <ui-swiper :list="images" height="300rpx" vertical indicator-position="right" />
    </demo-section>

    <demo-section title="自动播放 / 循环 / 触摸" desc="3 个布尔开关组合">
      <demo-block direction="column" :gap="16">
        <ui-swiper :list="images" height="300rpx" :autoplay="ap.autoplay" :circular="ap.circular" :disable-touch="ap.disableTouch" />
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" :type="ap.autoplay ? 'primary' : 'default'" @click="ap.autoplay = !ap.autoplay">{{ ap.autoplay ? "自动开" : "自动关" }}</ui-button>
          <ui-button size="small" :type="ap.circular ? 'primary' : 'default'" @click="ap.circular = !ap.circular">{{ ap.circular ? "循环" : "不循环" }}</ui-button>
          <ui-button size="small" :type="ap.disableTouch ? 'primary' : 'default'" @click="ap.disableTouch = !ap.disableTouch">{{ ap.disableTouch ? "禁触摸" : "允触摸" }}</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="间隔 / 时长 / 缓动" desc="动画参数切换">
      <demo-block direction="column" :gap="16">
        <ui-swiper :list="images" height="300rpx" :interval="anim.interval" :duration="anim.duration" :easing-function="anim.easing" />
        <text class="demo-label">interval {{ anim.interval }} / duration {{ anim.duration }} / {{ anim.easing }}</text>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="t in intervalPresets" :key="t" size="small" :type="anim.interval === t ? 'primary' : 'default'" @click="anim.interval = t">{{ t }}ms</ui-button>
        </demo-block>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="d in durationPresets" :key="d" size="small" :type="anim.duration === d ? 'primary' : 'default'" @click="anim.duration = d">{{ d }}ms</ui-button>
        </demo-block>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="e in easingPresets" :key="e" size="small" :type="anim.easing === e ? 'primary' : 'default'" @click="anim.easing = e">{{ e }}</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="圆角 / 前后露出" desc="radius + prev-gap + next-gap 组合">
      <demo-block direction="column" :gap="16">
        <ui-swiper :list="images" height="300rpx" :radius="shape.radius" :prev-gap="shape.gap" :next-gap="shape.gap" :circular="false" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="r in radiusPresets" :key="r" size="small" :type="shape.radius === r ? 'primary' : 'default'" @click="shape.radius = r">圆角 {{ r }}</ui-button>
        </demo-block>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="g in gapPresets" :key="g" size="small" :type="shape.gap === g ? 'primary' : 'default'" @click="shape.gap = g">露出 {{ g }}</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="图片模式 image-mode" desc="scaleToFill / aspectFit / aspectFill 切换">
      <demo-block direction="column" :gap="16">
        <ui-swiper :list="images" height="300rpx" :image-mode="imageMode" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="m in imageModes" :key="m" size="small" :type="imageMode === m ? 'primary' : 'default'" @click="imageMode = m">{{ m }}</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="对象数组 + fieldKeys" desc="非标准字段映射">
      <ui-swiper :list="customList" :field-keys="{ url: 'src', type: 'kind' }" height="300rpx" />
    </demo-section>

    <demo-section title="视频类型" desc="自动识别 .mp4 扩展名渲染 video 标签">
      <ui-swiper :list="mediaList" height="400rpx" :autoplay="false" :circular="false" />
    </demo-section>

    <demo-section title="自定义 indicator slot" desc="slot 完全替代默认指示器">
      <ui-swiper :list="images" height="300rpx">
        <template #indicator="{ index, total }">
          <view class="custom-indicator">
            <text>{{ index + 1 }} · {{ total }}</text>
          </view>
        </template>
      </ui-swiper>
    </demo-section>

    <demo-section title="实例方法 prev / next / swiperTo" desc="编程式控制">
      <demo-block direction="column" :gap="16">
        <ui-swiper ref="ctrlRef" :list="images" height="300rpx" :autoplay="false" />
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" @click="ctrlRef?.prev()">上一张</ui-button>
          <ui-button size="small" @click="ctrlRef?.next()">下一张</ui-button>
          <ui-button size="small" @click="ctrlRef?.swiperTo(2)">第 3 张</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="change / click / animationfinish 实时日志">
      <demo-block direction="column" :gap="12">
        <ui-swiper :list="images" height="300rpx" :autoplay="false" @click="onClick" @change="onChange" @animationfinish="onAnimationFinish" />
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 商品轮播" desc="数字指示器 + 商品信息卡">
      <demo-block direction="column" :gap="16">
        <ui-swiper v-model:current="productIndex" :list="images" height="400rpx" radius="24rpx" indicator-type="number" image-mode="aspectFill" />
        <view class="product">
          <text class="product__name">商品 {{ productIndex + 1 }}</text>
          <text class="product__price">¥{{ (productIndex + 1) * 99 }}.00</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · Banner 多类型" desc="混合图片 + 视频，点击跳转">
      <ui-swiper :list="bannerList" height="320rpx" radius="16rpx" indicator-position="bottom" :duration="600" @click="onBannerClick" />
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { SwiperInstance, SwiperIndicatorType, SwiperEasingFunction, SwiperIndicatorPosition } from "@/uni_modules/uniapp-ui/ui-swiper"
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Swiper 轮播" },
})

const toast = useToast()

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=750&h=300&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=750&h=300&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=750&h=300&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=750&h=300&fit=crop",
]

const currentIndex = ref(0)

const indicator = reactive<{ show: boolean; type: SwiperIndicatorType }>({ show: true, type: "dot" })
function setIndicator(show: boolean, type: SwiperIndicatorType) {
  indicator.show = show
  indicator.type = type
}

const positions: SwiperIndicatorPosition[] = ["top-left", "top", "top-right", "left", "right", "bottom-left", "bottom", "bottom-right"]
const position = ref<SwiperIndicatorPosition>("bottom-right")

const ap = reactive({ autoplay: true, circular: true, disableTouch: false })

const intervalPresets = [2000, 3000, 5000]
const durationPresets = [300, 500, 1000]
const easingPresets: SwiperEasingFunction[] = ["default", "linear", "easeInOutCubic"]
const anim = reactive<{ interval: number; duration: number; easing: SwiperEasingFunction }>({ interval: 3000, duration: 500, easing: "default" })

const radiusPresets = [0, 16, 32]
const gapPresets = [0, 40, 80]
const shape = reactive({ radius: 16, gap: 40 })

const imageModes: UniHelper.ImageProps["mode"][] = ["scaleToFill", "aspectFit", "aspectFill"]
const imageMode = ref<UniHelper.ImageProps["mode"]>("scaleToFill")

// fieldKeys 演示
const customList = [
  { src: images[0], kind: "image", title: "图一" },
  { src: images[1], kind: "image", title: "图二" },
  { src: images[2], kind: "image", title: "图三" },
]

// 视频类型演示
const mediaList = [
  { url: images[0] },
  { url: "https://media.w3.org/2010/05/sintel/trailer.mp4", poster: images[1] },
  { url: images[2] },
]

const ctrlRef = ref<SwiperInstance>()

const eventLog = ref("等待事件...")
function onClick(idx: number) {
  eventLog.value = `[click] index=${idx}`
}
function onChange(idx: number) {
  eventLog.value = `[change] index=${idx}`
}
function onAnimationFinish(idx: number) {
  eventLog.value = `[animationfinish] index=${idx}`
}

const productIndex = ref(0)

// banner mixed
const bannerList = [
  { url: images[0], title: "新品上市" },
  { url: "https://media.w3.org/2010/05/sintel/trailer.mp4", poster: images[1], title: "视频" },
  { url: images[2], title: "活动" },
]
function onBannerClick(idx: number) {
  toast.text(`点击 banner ${idx + 1}`)
}
</script>

<style lang="scss" scoped>
.demo-label {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.custom-indicator {
  top: var(--ui-spacing-md);
  color: var(--ui-color-text-inverse);
  right: var(--ui-spacing-md);
  padding: var(--ui-spacing-xxs) var(--ui-spacing-sm);
  position: absolute;
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-primary);
  border-radius: var(--ui-radius-round);
}

.product {
  display: flex;
  padding: var(--ui-spacing-md) 0;
  align-items: center;
  justify-content: space-between;

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }
}
</style>
