<template>
  <view class="ui-qrcode" :class="[props.customClass]" :style="[rootStyle]" @click="onClick">
    <!-- 离屏 canvas: 真正绘制目标，移出可视区域 (双重 canvas 是 uni-app H5 与小程序 canvas-id / id 行为差异兼容) -->
    <canvas class="ui-qrcode__canvas" :canvas-id="id" :style="hiddenCanvasStyle" />
    <canvas :id="id" class="ui-qrcode__canvas" :width="canvasSize.width" :height="canvasSize.height" />

    <text v-if="show && isError" class="ui-qrcode__fail" @click="makeCode">{{ props.type === "qrcode" ? "二维码" : "条形码" }}生成失败,点击重试</text>
    <text v-else-if="show && isLoading" class="ui-qrcode__loading">{{ props.loadingText }}</text>
    <image v-else-if="show && isSuccess" :src="result" :style="hiddenCanvasStyle" />
    <text v-if="props.type === 'barcode'" class="ui-qrcode__code-text">{{ props.value }}</text>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import QRCode from "./qrcode"
import { uuid } from "../utils/utils"
import { CODE128AUTO } from "./code128/index"
import { qrcodeEmits, qrcodeProps } from "./index"
import { useUnit, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, nextTick, getCurrentInstance } from "vue"

defineOptions({ name: "ui-qrcode" })

const props = defineProps(qrcodeProps)
const emits = defineEmits(qrcodeEmits)

const instance = getCurrentInstance()

const id = ref(uuid())
const result = ref("")
const isError = ref(false)
const isSuccess = ref(false)
const isLoading = ref(false)

// 物理像素尺寸 (canvas 必须 px)
const sizePx = computed(() => useUnitToPx(props.size) || 0)
const barcodeWidthPx = computed(() => useUnitToPx(props.barcodeWidth) || 0)
const barcodeHeightPx = computed(() => useUnitToPx(props.barcodeHeight) || 0)
const canvasSize = computed(() => (props.type === "barcode" ? { width: barcodeWidthPx.value, height: barcodeHeightPx.value } : { width: sizePx.value, height: sizePx.value }))

const hiddenCanvasStyle = computed<CSSProperties>(() => ({ width: `${canvasSize.value.width}px`, height: `${canvasSize.value.height}px` }))
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = props.type === "qrcode" ? useUnit(props.size) : useUnit(props.barcodeWidth)
  style.height = props.type === "qrcode" ? useUnit(props.size) : useUnit(props.barcodeHeight)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

watch(
  () => props,
  () => {
    if (props.auto && props.value) makeCode()
  },
  { deep: true, immediate: true },
)

async function makeCode() {
  isError.value = false
  isLoading.value = true
  await nextTick()
  // 200ms 留时间给 canvas 元素上屏 + uni 内部 createCanvasContext 跨端 ready
  setTimeout(() => {
    if (props.type === "barcode") drawBarcode()
    else drawQrcode()
  }, 200)
}

function drawBarcode() {
  try {
    const barcode = new CODE128AUTO(String(props.value), {})
    const pattern = barcode.encode().data
    if (!pattern) throw new Error("Invalid barcode content")

    const ctx = uni.createCanvasContext(id.value, instance as never)
    const width = barcodeWidthPx.value
    const height = barcodeHeightPx.value
    const moduleWidth = width / pattern.length

    ctx.setFillStyle(props.background)
    ctx.fillRect(0, 0, width, height)
    ctx.setFillStyle(props.foreground)
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === "1") ctx.fillRect(i * moduleWidth, 0, moduleWidth, height)
    }
    ctx.draw(false, () => {
      uni.canvasToTempFilePath(
        {
          canvasId: id.value,
          success: (res) => {
            result.value = res.tempFilePath
            isSuccess.value = true
            emits("success", res.tempFilePath)
          },
          fail: (err) => {
            isError.value = true
            emits("error", err)
          },
          complete: () => {
            isLoading.value = false
          },
        },
        instance as never,
      )
    })
  } catch (err) {
    isError.value = true
    emits("error", err)
    isLoading.value = false
  }
}

function drawQrcode() {
  // QRCode 类无 TS 类型，构造参数动态校验
  // eslint-disable-next-line @typescript-eslint/no-new
  new (QRCode as unknown as new (opts: Record<string, unknown>) => unknown)({
    context: instance,
    canvasId: id.value,
    usingComponents: true,
    showLoading: false,
    text: props.value,
    size: sizePx.value,
    background: props.background,
    foreground: props.foreground,
    pdground: props.pdground,
    correctLevel: props.lv,
    image: props.icon,
    imageSize: useUnitToPx(props.iconSize),
    success: (res: string) => {
      result.value = res
      isSuccess.value = true
      emits("success", res)
    },
    fail: (err: unknown) => {
      isError.value = true
      emits("error", err)
    },
    complete: () => {
      isLoading.value = false
    },
  })
}

function saveCode() {
  if (!result.value) return
  uni.saveImageToPhotosAlbum({
    filePath: result.value,
    success: () => uni.showToast({ title: "保存成功", icon: "success", duration: 2000 }),
    fail: () => uni.showModal({ title: "提示", content: "保存失败，请检查相册权限", showCancel: false }),
  })
}

function onClick() {
  emits("click")
}

defineExpose({ makeCode, saveCode })
</script>

<script lang="ts">
export default {
  name: "ui-qrcode",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
.ui-qrcode {
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__canvas {
    top: -99999rpx;
    left: -99999rpx;
    z-index: -99999;
    position: fixed !important;
  }

  &__fail,
  &__loading {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: var(--ui-color-text-secondary);
    display: flex;
    position: absolute;
    font-size: var(--ui-font-size-sm);
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  &__code-text {
    color: var(--ui-color-text);
    padding-top: 10rpx;
    font-size: var(--ui-font-size-lg);
    box-sizing: border-box;
    letter-spacing: 8rpx;
  }
}
</style>
