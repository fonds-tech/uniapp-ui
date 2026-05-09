<template>
  <demo-page>
    <demo-section title="基础用法" desc="带宽高 + 自动 loading/error 占位">
      <demo-block :cols="3" :gap="24">
        <ui-image v-for="i in 3" :key="i" :src="`https://picsum.photos/200?random=${i}`" width="200rpx" height="200rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="填充模式 (mode)">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="m in modes" :key="m" size="small" :type="mode === m ? 'primary' : 'default'" @click="mode = m">{{ m }}</ui-button>
      </demo-block>
      <demo-block :cols="2" :gap="24" custom-style="margin-top: 16rpx">
        <view class="cell">
          <ui-image src="https://picsum.photos/300/200?random=10" width="240rpx" height="240rpx" :mode="mode" />
          <text class="cell__label">横图 3:2</text>
        </view>
        <view class="cell">
          <ui-image src="https://picsum.photos/200/300?random=11" width="240rpx" height="240rpx" :mode="mode" />
          <text class="cell__label">竖图 2:3</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="形状" desc="默认 / round 圆 / square 1:1 自动撑高">
      <demo-block :cols="3" :gap="24">
        <view class="cell">
          <ui-image src="https://picsum.photos/200?random=20" width="180rpx" height="180rpx" radius="16rpx" />
          <text class="cell__label">默认</text>
        </view>
        <view class="cell">
          <ui-image src="https://picsum.photos/200?random=21" width="180rpx" height="180rpx" round />
          <text class="cell__label">round</text>
        </view>
        <view class="cell">
          <ui-image src="https://picsum.photos/200/300?random=22" width="180rpx" square radius="16rpx" />
          <text class="cell__label">square</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="圆角 (radius)">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="r in radii" :key="r" size="small" :type="radius === r ? 'primary' : 'default'" @click="radius = r">{{ r || "0" }}</ui-button>
      </demo-block>
      <demo-block custom-style="margin-top: 16rpx">
        <ui-image src="https://picsum.photos/300?random=30" width="200rpx" height="200rpx" :radius="radius" />
      </demo-block>
    </demo-section>

    <demo-section title="加载状态" desc="空 src 显加载占位 / 失败 src 显错误占位 / fade 淡入">
      <demo-block :cols="3" :gap="24">
        <view class="cell">
          <ui-image src="" width="180rpx" height="180rpx" radius="12rpx" />
          <text class="cell__label">加载中</text>
        </view>
        <view class="cell">
          <ui-image src="https://invalid.example.com/x.jpg" width="180rpx" height="180rpx" radius="12rpx" />
          <text class="cell__label">加载失败</text>
        </view>
        <view class="cell">
          <ui-image :key="fadeKey" :src="`https://picsum.photos/200?random=${fadeKey}`" width="180rpx" height="180rpx" radius="12rpx" fade />
          <ui-button size="small" custom-style="margin-top: 8rpx" @click="fadeKey++">重载淡入</ui-button>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义占位 (loading / error 插槽)">
      <demo-block :cols="2" :gap="24">
        <view class="cell">
          <ui-image src="" width="200rpx" height="200rpx" radius="12rpx">
            <template #loading>
              <ui-loading size="48rpx" />
            </template>
          </ui-image>
          <text class="cell__label">自定义 loading</text>
        </view>
        <view class="cell">
          <ui-image src="https://invalid.example.com/x.jpg" width="200rpx" height="200rpx" radius="12rpx">
            <template #error>
              <view class="placeholder-error">
                <ui-icon name="warning" size="40rpx" color="#999" />
                <text class="placeholder-error__text">加载失败</text>
              </view>
            </template>
          </ui-image>
          <text class="cell__label">自定义 error</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="背景色 (background)" desc="placeholder 占位时的底色">
      <demo-block :cols="3" :gap="24">
        <view v-for="b in bgColors" :key="b.value" class="cell">
          <ui-image src="" width="180rpx" height="180rpx" radius="12rpx" :background="b.value" />
          <text class="cell__label">{{ b.label }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="块级 (block)" desc="宽度撑满父容器">
      <ui-image src="https://picsum.photos/600/200?random=40" height="200rpx" block radius="12rpx" />
    </demo-section>

    <demo-section title="开关配置" desc="lazyLoad / draggable / webp / showMenuByLongpress">
      <demo-block direction="column" align="start" :gap="12">
        <demo-block align="center" :gap="20">
          <demo-block align="center" :gap="8">
            <ui-switch v-model="lazyLoad" />
            <text class="switch-label">lazyLoad</text>
          </demo-block>
          <demo-block align="center" :gap="8">
            <ui-switch v-model="draggable" />
            <text class="switch-label">draggable</text>
          </demo-block>
        </demo-block>
        <demo-block align="center" :gap="20">
          <demo-block align="center" :gap="8">
            <ui-switch v-model="webp" />
            <text class="switch-label">webp</text>
          </demo-block>
          <demo-block align="center" :gap="8">
            <ui-switch v-model="longpress" />
            <text class="switch-label">长按菜单</text>
          </demo-block>
        </demo-block>
      </demo-block>
      <ui-image
        src="https://picsum.photos/300?random=50"
        width="240rpx"
        height="240rpx"
        radius="12rpx"
        :lazy-load="lazyLoad"
        :draggable="draggable"
        :webp="webp"
        :show-menu-by-longpress="longpress"
        custom-style="margin-top: 16rpx"
      />
    </demo-section>

    <demo-section title="事件 (load / error / click)">
      <demo-block :cols="2" :gap="24">
        <ui-image src="https://picsum.photos/200?random=60" width="200rpx" height="200rpx" radius="12rpx" @load="onLoad" @click="onClick" />
        <ui-image src="https://invalid.example.com/x.jpg" width="200rpx" height="200rpx" radius="12rpx" @error="onError" />
      </demo-block>
      <text class="demo-text">{{ eventLog }}</text>
    </demo-section>

    <demo-section title="场景：用户头像" desc="round + 小尺寸，常见列表头像">
      <demo-block :gap="16">
        <ui-image v-for="i in 5" :key="i" :src="`https://picsum.photos/100?random=${100 + i}`" width="80rpx" height="80rpx" round />
      </demo-block>
    </demo-section>

    <demo-section title="场景：商品卡片" desc="square + radius，固定宽度自动撑高">
      <demo-block :cols="3" :gap="16">
        <view v-for="p in products" :key="p.id" class="product">
          <ui-image :src="p.img" width="100%" square radius="12rpx" />
          <text class="product__title">{{ p.title }}</text>
          <text class="product__price">¥{{ p.price }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="场景：相册九宫格" desc="3 列 square，类朋友圈">
      <demo-block :cols="3" :gap="8">
        <ui-image v-for="i in 9" :key="i" :src="`https://picsum.photos/200?random=${200 + i}`" width="100%" square radius="8rpx" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Image 图片" },
})

const toast = useToast()

const modes = ["scaleToFill", "aspectFit", "aspectFill", "widthFix", "heightFix", "center", "top", "bottom"] as const
const radii = ["", "8rpx", "16rpx", "32rpx"]
const bgColors = [
  { label: "默认", value: "" },
  { label: "浅蓝", value: "#e8f4ff" },
  { label: "浅粉", value: "#fff0f0" },
]

const products = [
  { id: 1, img: "https://picsum.photos/300?random=301", title: "无线耳机", price: "299" },
  { id: 2, img: "https://picsum.photos/300?random=302", title: "智能手表", price: "1299" },
  { id: 3, img: "https://picsum.photos/300?random=303", title: "蓝牙音箱", price: "499" },
]

const mode = ref<(typeof modes)[number]>("aspectFill")
const radius = ref("8rpx")
const fadeKey = ref(1)

const lazyLoad = ref(true)
const draggable = ref(false)
const webp = ref(false)
const longpress = ref(false)

const eventLog = ref("点击图片或等加载事件")

function onLoad() {
  eventLog.value = "load: 加载成功"
  toast.success("加载成功")
}

function onError() {
  eventLog.value = "error: 加载失败"
}

function onClick() {
  eventLog.value = `click: ${new Date().toLocaleTimeString()}`
  toast.text("点击图片")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 12rpx;
}

.switch-label {
  color: var(--ui-color-text);
  font-size: 26rpx;
}

.cell {
  gap: 8rpx;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: 22rpx;
  }
}

.placeholder-error {
  gap: 8rpx;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: 22rpx;
  }
}

.product {
  gap: 6rpx;
  display: flex;
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    overflow: hidden;
    font-size: 24rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: 26rpx;
    font-weight: 600;
  }
}
</style>
