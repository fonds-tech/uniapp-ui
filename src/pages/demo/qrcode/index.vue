<template>
  <demo-page>
    <demo-section title="基础用法" desc="value 自动生成二维码">
      <demo-block justify="center">
        <ui-qrcode value="https://uniapp-ui.com" />
      </demo-block>
    </demo-section>

    <demo-section title="尺寸切换" desc="size 控制大小">
      <demo-block direction="column" align="center" :gap="16">
        <ui-qrcode value="https://uniapp-ui.com" :size="currentSize" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="s in sizes" :key="s" size="small" :type="currentSize === s ? 'primary' : 'default'" @click="currentSize = s">{{ s }}</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色" desc="foreground 改前景色">
      <demo-block :cols="4" :gap="16" justify="center">
        <ui-qrcode v-for="c in colors" :key="c" value="https://uniapp-ui.com" size="160rpx" :foreground="c" />
      </demo-block>
    </demo-section>

    <demo-section title="背景 + 前景搭配" desc="background + foreground">
      <demo-block :cols="3" :gap="16" justify="center">
        <ui-qrcode v-for="p in colorPairs" :key="p.label" value="https://uniapp-ui.com" size="180rpx" :background="p.bg" :foreground="p.fg" />
      </demo-block>
    </demo-section>

    <demo-section title="容错级别" desc="lv 0/1/2/3 (L/M/Q/H 7%/15%/25%/30%)">
      <demo-block :cols="4" :gap="16" justify="center">
        <view v-for="lv in lvList" :key="lv" class="lv-item">
          <ui-qrcode value="https://uniapp-ui.com" size="160rpx" :lv="lv" />
          <text class="lv-item__label">{{ lvLabels[lv] }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="条形码 (CODE128)" desc="type=barcode">
      <demo-block direction="column" align="center" :gap="16">
        <ui-qrcode type="barcode" :value="barcodeValue" barcode-width="500rpx" barcode-height="120rpx" />
        <ui-input v-model="barcodeValue" placeholder="输入条形码内容" />
      </demo-block>
    </demo-section>

    <demo-section title="动态生成" desc="输入框联动二维码">
      <demo-block direction="column" align="center" :gap="16">
        <ui-qrcode :value="inputValue || 'Hello UniApp UI'" size="200rpx" />
        <ui-input v-model="inputValue" placeholder="输入内容生成二维码" />
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:支付收款码" desc="深色品牌 + 标题 + 金额">
      <demo-block justify="center">
        <view class="pay-card">
          <text class="pay-card__title">收款</text>
          <text class="pay-card__amount">¥ {{ payAmount.toFixed(2) }}</text>
          <ui-qrcode :value="`pay://${payAmount}`" size="320rpx" foreground="#1f1f1f" />
          <text class="pay-card__hint">扫码支付</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:活动名片" desc="带 Logo + 信息">
      <demo-block justify="center">
        <view class="card">
          <view class="card__head">
            <text class="card__name">UniApp UI</text>
            <text class="card__role">跨端 UI 组件库</text>
          </view>
          <ui-qrcode value="https://uniapp-ui.com" size="280rpx" foreground="#6366f1" />
          <text class="card__hint">扫码访问官网</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="success / error 事件">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-qrcode value="https://uniapp-ui.com" size="160rpx" @success="onSuccess" @error="onError" @click="onClickQr" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { QrcodeCorrectLevel } from "@/uni_modules/uniapp-ui/ui-qrcode"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "QRCode 二维码" },
})

const toast = useToast()

const sizes = ["120rpx", "200rpx", "280rpx", "360rpx"]
const colors = ["#000000", "#1989fa", "#10b981", "#ef4444"]
const colorPairs = [
  { label: "经典", bg: "#ffffff", fg: "#000000" },
  { label: "蓝调", bg: "#e0f2fe", fg: "#0369a1" },
  { label: "暖橙", bg: "#fff7ed", fg: "#c2410c" },
]
const lvLabels = ["L 7%", "M 15%", "Q 25%", "H 30%"]
const lvList: QrcodeCorrectLevel[] = [0, 1, 2, 3]

const currentSize = ref("200rpx")
const inputValue = ref("")
const barcodeValue = ref("UNIAPP-UI-2026")
const payAmount = ref(99.0)
const eventLog = ref("等待事件...")

function onSuccess(url: string) {
  eventLog.value = `[success] ${url.slice(0, 30)}...`
}

function onError(err: unknown) {
  eventLog.value = `[error] ${String(err)}`
}

function onClickQr() {
  eventLog.value = `[click] @ ${new Date().toLocaleTimeString()}`
  toast.text("点击二维码")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.lv-item {
  gap: 8rpx;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: 22rpx;
  }
}

.pay-card {
  gap: 16rpx;
  width: 480rpx;
  display: flex;
  padding: 40rpx;
  background: var(--ui-color-background);
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.08);
  align-items: center;
  border-radius: var(--ui-radius-lg);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text-secondary);
    font-size: 26rpx;
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: 56rpx;
    font-weight: bold;
  }

  &__hint {
    color: var(--ui-color-text-tertiary);
    font-size: 22rpx;
  }
}

.card {
  gap: 16rpx;
  width: 480rpx;
  display: flex;
  padding: 40rpx;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  align-items: center;
  border-radius: var(--ui-radius-lg);
  flex-direction: column;

  &__head {
    gap: 4rpx;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text-inverse);
    font-size: 36rpx;
    font-weight: bold;
  }

  &__role {
    color: rgba(255, 255, 255, 0.8);
    font-size: 22rpx;
  }

  &__hint {
    color: rgba(255, 255, 255, 0.7);
    font-size: 22rpx;
  }
}
</style>
