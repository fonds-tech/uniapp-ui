<template>
  <view class="ui-qrcode" :class="[props.customClass]" :style="[style]" @click="onClick">
    <canvas class="ui-qrcode-canvas" :canvas-id="id" :style="{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }" />

    <canvas :id="id" class="ui-qrcode-canvas" :width="canvasSize.width" :height="canvasSize.height" />

    <text v-if="show && isError" class="ui-qrcode__fail" @click="makeCode">{{ type === "qrcode" ? "二维码" : "条形码" }}生成失败,点击重试</text>
    <text v-else-if="show && isLoading" class="ui-qrcode__loading">{{ loadingText }}</text>
    <image v-else-if="show && isSuccess" :src="result" :style="{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }" />
    <text v-if="type === 'barcode'" class="code-text">{{ value }}</text>
  </view>
</template>

<script setup lang="ts">
import QRCode from "./qrcode"
import { uuid } from "../utils/utils"
import { CODE128AUTO } from "./code128/index"
import { qrcodeEmits, qrcodeProps } from "./index"
import { useUnit, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, nextTick, getCurrentInstance } from "vue"

defineOptions({ name: "ui-qrcode" })

const props = defineProps(qrcodeProps)
const emits = defineEmits(qrcodeEmits)
const id = ref(uuid())
const result = ref()
const isError = ref(false)
const isSuccess = ref(false)
const isLoading = ref(false)
const instance = getCurrentInstance()

const size = computed(() => {
  return useUnitToPx(props.size)
})

const style = computed(() => {
  const style: any = {}
  style.width = props.type === "qrcode" ? useUnit(props.size) : useUnit(props.barcodeWidth)
  style.height = props.type === "qrcode" ? useUnit(props.size) : useUnit(props.barcodeHeight)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 条形码高度计算
const barcodeHeight = computed(() => {
  return useUnitToPx(props.barcodeHeight)
})

// 条形码宽度
const barcodeWidth = computed(() => {
  return useUnitToPx(props.barcodeWidth)
})

// 动态画布尺寸（根据类型切换）
const canvasSize = computed(() => {
  return props.type === "barcode" ? { width: barcodeWidth.value, height: barcodeHeight.value } : { width: size.value, height: size.value }
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
  setTimeout(() => {
    if (props.type === "barcode") {
      // 条形码生成逻辑
      try {
        const barcode = new CODE128AUTO(String(props.value), {})
        const barcodeResult = barcode.encode()
        const pattern = barcodeResult.data
        if (!pattern) throw new Error("Invalid barcode content")

        // 获取Canvas上下文
        const ctx = uni.createCanvasContext(id.value, instance)
        const width = barcodeWidth.value
        const height = barcodeHeight.value
        const moduleWidth = width / pattern.length

        // 绘制背景
        ctx.setFillStyle(props.background)
        ctx.fillRect(0, 0, width, height)

        // 绘制条形码
        ctx.setFillStyle(props.foreground)

        for (let i = 0; i < pattern.length; i++) {
          if (pattern[i] === "1") {
            ctx.fillRect(i * moduleWidth, 0, moduleWidth, height)
          }
        }

        // 绘制完成保存为图片
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
            instance,
          )
        })
      } catch (err) {
        isError.value = true
        emits("error", err)
        isLoading.value = false
      }
    } else if (props.type === "qrcode") {
      // @ts-expect-error 注释错误
      const qrcode = new QRCode({
        context: instance, // 上下文环境
        canvasId: id.value, // canvas-id
        usingComponents: true, // 是否是自定义组件
        showLoading: false, // 是否显示loading
        text: props.value, // 生成内容
        size: useUnitToPx(props.size), // 二维码大小
        background: props.background, // 背景色
        foreground: props.foreground, // 前景色
        pdground: props.pdground, // 定位角点颜色
        correctLevel: props.lv, // 容错级别
        image: props.icon, // 二维码图标
        imageSize: useUnitToPx(props.iconSize), // 二维码图标大小
        success: (res: any) => {
          result.value = res
          isSuccess.value = true
          emits("success", res)
        },
        fail: (err: any) => {
          isError.value = true
          emits("error", err)
        },
        complete: () => {
          isLoading.value = false
        },
      })
    }
  }, 200)
}

function saveCode() {
  if (result.value) {
    uni.saveImageToPhotosAlbum({
      filePath: result.value,
      success: () => {
        uni.showToast({ title: "二维码保存成功", icon: "success", duration: 2000 })
      },
    })
  }
}

function onClick() {
  emits("click")
}

defineExpose({ name: "ui-qrcode", makeCode, saveCode })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-qrcode {
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .ui-qrcode-canvas {
    top: -99999rpx;
    left: -99999rpx;
    z-index: -99999;
    position: fixed !important;
  }

  &__fail {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  &__barcode {
    object-fit: contain;
  }
  .code-text {
    font-size: 36rpx;
    box-sizing: border-box;
    padding-top: 10rpx;
    letter-spacing: 8rpx;
  }
}
</style>
