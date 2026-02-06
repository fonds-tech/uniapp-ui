<template>
  <view class="ui-watermark" :class="[props.customClass]" :style="[rootStyle]">
    <!-- 默认插槽：被水印覆盖的内容 -->
    <slot />

    <!-- 水印层 -->
    <view class="ui-watermark__layer" :style="[layerStyle]" />

    <!-- 离屏 Canvas（仅小程序平台需要） -->
    <!-- #ifndef H5 -->
    <canvas v-show="showCanvas" :id="canvasId" :canvas-id="canvasId" class="ui-watermark__canvas" :style="{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { uuid } from "../utils/utils"
import { watermarkProps } from "./index"
import { useColor, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-watermark" })

const props = defineProps(watermarkProps)

// 组件实例
const instance = getCurrentInstance()

// Canvas ID
const canvasId = ref(`watermark-${uuid()}`)

// 生成的水印背景图 base64
const watermarkUrl = ref("")

// 是否正在生成水印
const isGenerating = ref(false)

// 是否显示 canvas（小程序平台需要）
const showCanvas = ref(true)

// 单个水印宽度（px）
const watermarkWidth = computed(() => {
  return typeof props.width === "number" ? props.width : useUnitToPx(props.width)
})

// 单个水印高度（px）
const watermarkHeight = computed(() => {
  return typeof props.height === "number" ? props.height : useUnitToPx(props.height)
})

// 水平间距（px）
const gapXPx = computed(() => {
  return typeof props.gapX === "number" ? props.gapX : useUnitToPx(props.gapX)
})

// 垂直间距（px）
const gapYPx = computed(() => {
  return typeof props.gapY === "number" ? props.gapY : useUnitToPx(props.gapY)
})

// 字体大小（px）
const fontSizePx = computed(() => {
  return typeof props.fontSize === "number" ? props.fontSize : useUnitToPx(props.fontSize)
})

// Canvas 宽度（包含间距，用于平铺）
const canvasWidth = computed(() => {
  return (watermarkWidth.value + gapXPx.value) * 2
})

// Canvas 高度（包含间距，用于平铺）
const canvasHeight = computed(() => {
  return (watermarkHeight.value + gapYPx.value) * 2
})

// 根节点样式
const rootStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    position: "relative",
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 水印层样式
const layerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    zIndex: props.zIndex,
    opacity: props.opacity,
    backgroundImage: watermarkUrl.value ? `url(${watermarkUrl.value})` : "none",
    backgroundRepeat: "repeat",
    backgroundPosition: "0 0",
  }

  if (props.fullPage) {
    style.position = "fixed"
    style.top = "0"
    style.left = "0"
    style.right = "0"
    style.bottom = "0"
    style.width = "100vw"
    style.height = "100vh"
  } else {
    style.position = "absolute"
    style.top = "0"
    style.left = "0"
    style.right = "0"
    style.bottom = "0"
  }

  return style
})

/**
 * 生成水印
 */
async function generateWatermark() {
  if (isGenerating.value) return
  if (!props.content && !props.image) {
    watermarkUrl.value = ""
    return
  }

  showCanvas.value = true
  isGenerating.value = true
  await nextTick()

  // #ifdef H5
  // H5 平台：使用离屏 canvas
  drawWatermarkH5()
  // #endif

  // #ifndef H5
  // 小程序平台：延迟执行以确保 canvas 已渲染
  setTimeout(() => {
    drawWatermarkMP()
  }, 100)
  // #endif
}

// #ifdef H5
/**
 * H5 平台：使用离屏 canvas 绘制水印
 */
function drawWatermarkH5() {
  const width = canvasWidth.value
  const height = canvasHeight.value

  // 创建离屏 canvas
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    isGenerating.value = false
    return
  }

  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 绘制两个水印（错位排列形成更好的平铺效果）
  const positions = [
    { x: watermarkWidth.value / 2, y: watermarkHeight.value / 2 },
    {
      x: watermarkWidth.value / 2 + watermarkWidth.value + gapXPx.value,
      y: watermarkHeight.value / 2 + watermarkHeight.value + gapYPx.value,
    },
  ]

  if (props.image) {
    // 绘制图片水印
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      positions.forEach(({ x, y }) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((props.rotate * Math.PI) / 180)
        const imgWidth = watermarkWidth.value
        const imgHeight = watermarkHeight.value
        ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight)
        ctx.restore()
      })
      watermarkUrl.value = canvas.toDataURL("image/png")
      isGenerating.value = false
    }
    img.onerror = () => {
      watermarkUrl.value = ""
      isGenerating.value = false
    }
    img.src = props.image
  } else {
    // 绘制文字水印
    positions.forEach(({ x, y }) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((props.rotate * Math.PI) / 180)
      drawTextWatermarkH5(ctx)
      ctx.restore()
    })
    watermarkUrl.value = canvas.toDataURL("image/png")
    isGenerating.value = false
  }
}

/**
 * H5 平台：绘制文字水印
 */
function drawTextWatermarkH5(ctx: CanvasRenderingContext2D) {
  const fontWeight = props.fontWeight === "normal" ? "400" : props.fontWeight === "light" ? "300" : "700"
  const fontColor = useColor(props.fontColor)

  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = fontColor
  ctx.font = `${fontWeight} ${fontSizePx.value}px ${props.fontFamily}`

  const contents = Array.isArray(props.content) ? props.content : [props.content]
  const lineHeight = fontSizePx.value * 1.5
  const totalHeight = contents.length * lineHeight
  const startY = -totalHeight / 2 + lineHeight / 2

  contents.forEach((text, index) => {
    ctx.fillText(text, 0, startY + index * lineHeight)
  })
}
// #endif

// #ifndef H5
/**
 * 小程序平台：绘制水印到 Canvas
 */
function drawWatermarkMP() {
  const ctx = uni.createCanvasContext(canvasId.value, instance)
  const width = canvasWidth.value
  const height = canvasHeight.value

  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 绘制两个水印（错位排列形成更好的平铺效果）
  const positions = [
    { x: watermarkWidth.value / 2, y: watermarkHeight.value / 2 },
    {
      x: watermarkWidth.value / 2 + watermarkWidth.value + gapXPx.value,
      y: watermarkHeight.value / 2 + watermarkHeight.value + gapYPx.value,
    },
  ]

  positions.forEach(({ x, y }) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((props.rotate * Math.PI) / 180)

    if (props.image) {
      // 绘制图片水印
      const imgWidth = watermarkWidth.value
      const imgHeight = watermarkHeight.value
      ctx.drawImage(props.image, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight)
    } else {
      // 绘制文字水印
      drawTextWatermarkMP(ctx)
    }

    ctx.restore()
  })

  // 导出为图片
  ctx.draw(false, () => {
    uni.canvasToTempFilePath(
      {
        canvasId: canvasId.value,
        success: (res) => {
          showCanvas.value = false
          watermarkUrl.value = res.tempFilePath
        },
        fail: () => {
          watermarkUrl.value = ""
        },
        complete: () => {
          isGenerating.value = false
        },
      },
      instance,
    )
  })
}

/**
 * 小程序平台：绘制文字水印
 */
function drawTextWatermarkMP(ctx: UniApp.CanvasContext) {
  const fontWeight = props.fontWeight === "normal" ? "" : props.fontWeight === "light" ? "300" : "bold"
  const fontColor = useColor(props.fontColor)

  ctx.setTextAlign("center")
  ctx.setTextBaseline("middle")
  ctx.setFillStyle(fontColor)
  ctx.font = `${fontWeight} ${fontSizePx.value}px ${props.fontFamily}`.trim()

  const contents = Array.isArray(props.content) ? props.content : [props.content]
  const lineHeight = fontSizePx.value * 1.5
  const totalHeight = contents.length * lineHeight
  const startY = -totalHeight / 2 + lineHeight / 2

  contents.forEach((text, index) => {
    ctx.fillText(text, 0, startY + index * lineHeight)
  })
}
// #endif

// 监听属性变化，重新生成水印
watch(
  () => [props.content, props.image, props.width, props.height, props.rotate, props.gapX, props.gapY, props.fontSize, props.fontColor, props.fontFamily, props.fontWeight],
  () => {
    generateWatermark()
  },
  { deep: true },
)

// 组件挂载后生成水印
onMounted(() => {
  generateWatermark()
})

// 组件卸载时清理
onUnmounted(() => {
  watermarkUrl.value = ""
})

// 暴露方法
defineExpose({
  /** 重新生成水印 */
  regenerate: generateWatermark,
})
</script>

<script lang="ts">
export default {
  name: "ui-watermark",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-watermark {
  display: block;

  // 水印层
  &__layer {
    pointer-events: none;
  }

  // 离屏 Canvas（隐藏）
  &__canvas {
    top: -99999rpx;
    left: -99999rpx;
    opacity: 0;
    z-index: -99999;
    position: fixed !important;
    pointer-events: none;
  }
}
</style>
