<template>
  <view class="ui-qrcode" :class="[useProps.customClass]" :style="[style]" @click="onClick">
    <!-- #ifndef MP-ALIPAY -->
    <canvas class="ui-qrcode-canvas" :canvas-id="id" :style="{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }" />
    <!-- #endif -->
    <!-- #ifdef MP-ALIPAY -->
    <canvas :id="id" class="ui-qrcode-canvas" :width="canvasSize.width" :height="canvasSize.height" />
    <!-- #endif -->

    <text v-if="show && isError" class="ui-qrcode__fail" @click="makeCode">{{ type === "qrcode" ? "二维码" : "条形码" }}生成失败,点击重试</text>
    <text v-else-if="show && isLoading" class="ui-qrcode__loading">{{ loadingText }}</text>
    <image v-else-if="show && isSuccess" :src="result" :style="{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }" />
    <text v-if="type === 'barcode'" class="code-text">{{ value }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, ref, watch } from "vue"

import QRCode from "./qrcode"
import { uuid } from "../utils/utils"
import { CODE128AUTO } from "./code128/index"
import { useUnit, useStyle, useUnitToPx } from "../hooks"
import { qrcodeEmits, qrcodeProps, useQrcodeProps } from "./index"

defineOptions({ name: "ui-qrcode" })

const props = defineProps(qrcodeProps)
const emits = defineEmits(qrcodeEmits)
const useProps = useQrcodeProps(props)
const id = ref(uuid())
const result = ref()
const isError = ref(false)
const isSuccess = ref(false)
const isLoading = ref(false)
const instance = getCurrentInstance()

const size = computed(() => {
  return useUnitToPx(useProps.size)
})

const style = computed(() => {
  const style: any = {}
  style.width = useProps.type === "qrcode" ? useUnit(useProps.size) : useUnit(useProps.barcodeWidth)
  style.height = useProps.type === "qrcode" ? useUnit(useProps.size) : useUnit(useProps.barcodeHeight)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 条形码高度计算
const barcodeHeight = computed(() => {
  return useUnitToPx(useProps.barcodeHeight)
})

// 条形码宽度
const barcodeWidth = computed(() => {
  return useUnitToPx(useProps.barcodeWidth)
})

// 动态画布尺寸（根据类型切换）
const canvasSize = computed(() => {
  return useProps.type === "barcode" ? { width: barcodeWidth.value, height: barcodeHeight.value } : { width: size.value, height: size.value }
})
watch(
  () => props,
  () => {
    if (useProps.auto && useProps.value) makeCode()
  },
  { deep: true, immediate: true },
)

async function makeCode() {
  isError.value = false
  isLoading.value = true
  await nextTick()
  setTimeout(() => {
    if (useProps.type === "barcode") {
      // 条形码生成逻辑
      try {
        const barcode = new CODE128AUTO(String(useProps.value), {})
        const barcodeResult = barcode.encode()
        const pattern = barcodeResult.data
        if (!pattern) throw new Error("Invalid barcode content")

        // 获取Canvas上下文
        const ctx = uni.createCanvasContext(id.value, instance)
        const width = barcodeWidth.value
        const height = barcodeHeight.value
        const moduleWidth = width / pattern.length

        // 绘制背景
        ctx.setFillStyle(useProps.background)
        ctx.fillRect(0, 0, width, height)

        // 绘制条形码
        ctx.setFillStyle(useProps.foreground)

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
    } else if (useProps.type === "qrcode") {
      // @ts-expect-error 注释错误
      const qrcode = new QRCode({
        context: instance, // 上下文环境
        canvasId: id.value, // canvas-id
        usingComponents: true, // 是否是自定义组件
        showLoading: false, // 是否显示loading
        text: useProps.value, // 生成内容
        size: useUnitToPx(useProps.size), // 二维码大小
        background: useProps.background, // 背景色
        foreground: useProps.foreground, // 前景色
        pdground: useProps.pdground, // 定位角点颜色
        correctLevel: useProps.lv, // 容错级别
        image: useProps.icon, // 二维码图标
        imageSize: useUnitToPx(useProps.iconSize), // 二维码图标大小
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
