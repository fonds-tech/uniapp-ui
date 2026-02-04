<template>
  <view class="ui-circle" :class="[props.customClass]" :style="[rootStyle]">
    <!-- 微信小程序使用 canvas 2d -->
    <!-- #ifdef MP-WEIXIN -->
    <canvas :id="canvasId" class="ui-circle__canvas" :canvas-id="canvasId" type="2d" :style="canvasStyle" />
    <!-- #endif -->
    <!-- 其他平台使用旧版 canvas -->
    <!-- #ifndef MP-WEIXIN -->
    <canvas :id="canvasId" class="ui-circle__canvas" :canvas-id="canvasId" :width="canvasSize" :height="canvasSize" :style="canvasStyle" />
    <!-- #endif -->

    <!-- 中心内容区域 -->
    <view class="ui-circle__content">
      <slot>
        <text v-if="displayText" class="ui-circle__text">{{ displayText }}</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { CircleGradientColor } from "./index"
import { uuid } from "../utils/utils"
import { circleEmits, circleProps } from "./index"
import { useColor, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, onMounted, onUnmounted, onBeforeMount, getCurrentInstance } from "vue"

defineOptions({ name: "ui-circle" })

const props = defineProps(circleProps)
const emit = defineEmits(circleEmits)

const instance = getCurrentInstance()
const canvasId = ref(`ui-circle-${uuid()}`)

let ctx: UniApp.CanvasContext | null = null
let animationTimer: ReturnType<typeof setTimeout> | null = null

const currentRate = ref(props.modelValue)
const pixelRatio = ref(1)

// 计算尺寸（转换为 px 数值）
const sizePx = computed(() => {
  try {
    return useUnitToPx(props.size)
  } catch {
    return 100
  }
})

// 计算线宽（转换为 px 数值）
const strokeWidthPx = computed(() => {
  try {
    return useUnitToPx(props.strokeWidth)
  } catch {
    return 4
  }
})

// Canvas 渲染尺寸
const canvasSize = computed(() => {
  // #ifdef MP-ALIPAY
  return sizePx.value * pixelRatio.value
  // #endif
  // #ifndef MP-ALIPAY
  return sizePx.value
  // #endif
})

// 进度条宽度
const sWidth = computed(() => {
  // #ifdef MP-ALIPAY
  return strokeWidthPx.value * pixelRatio.value
  // #endif
  // #ifndef MP-ALIPAY
  return strokeWidthPx.value
  // #endif
})

// 根容器样式
const rootStyle = computed<CSSProperties>(() => {
  const result: CSSProperties = {
    width: `${sizePx.value}px`,
    height: `${sizePx.value}px`,
  }
  return useStyle({ ...result, ...useStyle(props.customStyle) }) as CSSProperties
})

// Canvas 样式
const canvasStyle = computed(() => {
  return {
    width: `${sizePx.value}px`,
    height: `${sizePx.value}px`,
  }
})

// 显示文本
const displayText = computed(() => {
  if (props.text) return props.text
  return `${Math.round(currentRate.value)}%`
})

// 起始角度
const BEGIN_ANGLE = -Math.PI / 2
const PERIMETER = 2 * Math.PI

// 起始角度映射
const startAngleMap: Record<string, number> = {
  top: -Math.PI / 2,
  right: 0,
  bottom: Math.PI / 2,
  left: Math.PI,
}

const startAngle = computed(() => {
  return startAngleMap[props.startPosition] ?? BEGIN_ANGLE
})

// 解析颜色值
function resolveColor(color: string): string {
  if (!color) return ""
  const resolved = useColor(color)
  if (resolved.startsWith("var(")) {
    const colorFallbacks: Record<string, string> = {
      primary: "#1989fa",
      success: "#07c160",
      warning: "#ff976a",
      danger: "#ee0a24",
      info: "#909399",
      "border-light": "#ebedf0",
    }
    return colorFallbacks[color] || "#1989fa"
  }
  return resolved
}

// 获取轨道颜色
function getLayerColor(): string {
  if (props.layerColor) {
    return resolveColor(props.layerColor) || props.layerColor
  }
  return resolveColor("border-light") || "#ebedf0"
}

// 获取填充颜色
function getFillColor(): string {
  return props.fill || "transparent"
}

// 获取 Canvas 上下文
function getContext(): Promise<UniApp.CanvasContext> {
  return new Promise((resolve) => {
    if (ctx) {
      return resolve(ctx)
    }

    // #ifndef MP-WEIXIN
    ctx = uni.createCanvasContext(canvasId.value, instance)
    resolve(ctx)
    // #endif

    // #ifdef MP-WEIXIN
    uni
      .createSelectorQuery()
      .in(instance)
      .select(`#${canvasId.value}`)
      .node((res: any) => {
        if (res && res.node) {
          const canvas = res.node
          const context = canvas.getContext("2d")
          canvas.width = sizePx.value * pixelRatio.value
          canvas.height = sizePx.value * pixelRatio.value
          context.scale(pixelRatio.value, pixelRatio.value)
          // 适配器：让 2d context 兼容旧版 API
          ctx = canvas2dAdapter(context)
          resolve(ctx)
        }
      })
      .exec()
    // #endif
  })
}

// Canvas 2D 适配器（让新版 API 兼容旧版调用方式）
function canvas2dAdapter(ctx: CanvasRenderingContext2D): UniApp.CanvasContext {
  return {
    setStrokeStyle(color: string | CanvasGradient) {
      ctx.strokeStyle = color
    },
    setLineWidth(width: number) {
      ctx.lineWidth = width
    },
    setLineCap(cap: CanvasLineCap) {
      ctx.lineCap = cap
    },
    setFillStyle(color: string | CanvasGradient) {
      ctx.fillStyle = color
    },
    beginPath() {
      ctx.beginPath()
    },
    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise?: boolean) {
      ctx.arc(x, y, r, sAngle, eAngle, counterclockwise)
    },
    stroke() {
      ctx.stroke()
    },
    fill() {
      ctx.fill()
    },
    clearRect(x: number, y: number, width: number, height: number) {
      ctx.clearRect(x, y, width, height)
    },
    createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
      return ctx.createLinearGradient(x0, y0, x1, y1)
    },
    draw(reserve?: boolean, callback?: () => void) {
      // 2d canvas 不需要 draw，直接执行回调
      callback?.()
    },
  } as UniApp.CanvasContext
}

// 渲染轨道
function renderLayerCircle(context: UniApp.CanvasContext) {
  const position = canvasSize.value / 2
  const lineWidth = sWidth.value
  const radius = position - lineWidth / 2

  // 绘制填充
  const fillColor = getFillColor()
  if (fillColor && fillColor !== "transparent") {
    context.beginPath()
    context.arc(position, position, radius - lineWidth / 2, 0, PERIMETER)
    context.setFillStyle(fillColor)
    context.fill()
  }

  // 绘制轨道
  context.beginPath()
  context.arc(position, position, radius, 0, PERIMETER)
  context.setStrokeStyle(getLayerColor())
  context.setLineWidth(lineWidth)
  context.setLineCap(props.strokeLinecap as CanvasLineCap)
  context.stroke()
}

// 渲染进度条
function renderProgressCircle(context: UniApp.CanvasContext, value: number) {
  const progress = Math.min(Math.max(value, 0), 100) / 100
  if (progress <= 0) return

  const position = canvasSize.value / 2
  const lineWidth = sWidth.value
  const radius = position - lineWidth / 2

  const progressAngle = PERIMETER * progress
  const start = startAngle.value
  const end = props.clockwise ? start + progressAngle : start - progressAngle

  // 获取进度条颜色
  let strokeColor: string | CanvasGradient
  if (!props.color) {
    strokeColor = resolveColor("primary") || "#1989fa"
  } else if (typeof props.color === "string") {
    strokeColor = resolveColor(props.color) || props.color
  } else {
    // 渐变颜色
    const gradientColor = props.color as CircleGradientColor
    const gradient = context.createLinearGradient(canvasSize.value, 0, 0, 0)
    Object.keys(gradientColor)
      .sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
      .forEach((key) => {
        gradient.addColorStop(Number.parseFloat(key) / 100, gradientColor[key])
      })
    strokeColor = gradient
  }

  context.beginPath()
  context.arc(position, position, radius, start, end, !props.clockwise)
  context.setStrokeStyle(strokeColor as string)
  context.setLineWidth(lineWidth)
  context.setLineCap(props.strokeLinecap as CanvasLineCap)
  context.stroke()
}

// 绘制圆环
function drawCircle(value: number) {
  getContext().then((context) => {
    context.clearRect(0, 0, canvasSize.value, canvasSize.value)
    renderLayerCircle(context)
    renderProgressCircle(context, value)
    context.draw()
  })
}

// 开始动画
function startAnimation() {
  if (animationTimer) {
    clearTimeout(animationTimer)
    animationTimer = null
  }

  const targetRate = Math.min(Math.max(props.rate, 0), 100)
  const speed = props.speed > 0 ? props.speed : 50
  const step = speed / 60

  function animate() {
    const diff = targetRate - currentRate.value

    if (Math.abs(diff) < step) {
      currentRate.value = targetRate
      emit("update:modelValue", currentRate.value)
      drawCircle(currentRate.value)
      emit("finish")
      return
    }

    if (diff > 0) {
      currentRate.value = Math.min(currentRate.value + step, targetRate)
    } else {
      currentRate.value = Math.max(currentRate.value - step, targetRate)
    }

    emit("update:modelValue", currentRate.value)
    drawCircle(currentRate.value)

    animationTimer = setTimeout(animate, 1000 / 60)
  }

  animate()
}

// 监听 rate 变化
watch(
  () => props.rate,
  () => {
    startAnimation()
  },
)

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (Math.abs(newVal - currentRate.value) > 0.01) {
      currentRate.value = newVal
      drawCircle(currentRate.value)
    }
  },
)

// 监听尺寸变化
watch(
  () => [props.size, props.strokeWidth],
  () => {
    ctx = null // 重置上下文
    setTimeout(() => {
      drawCircle(currentRate.value)
    }, 50)
  },
)

// 监听样式相关属性变化
watch(
  () => [props.color, props.layerColor, props.fill, props.strokeLinecap, props.clockwise, props.startPosition],
  () => {
    drawCircle(currentRate.value)
  },
  { deep: true },
)

onBeforeMount(() => {
  const systemInfo = uni.getSystemInfoSync()
  pixelRatio.value = systemInfo.pixelRatio || 1
})

onMounted(() => {
  // 初始进度为 0，然后动画到目标进度
  currentRate.value = 0
  drawCircle(currentRate.value)
  // 延迟启动动画，确保 canvas 已初始化
  setTimeout(() => {
    startAnimation()
  }, 50)
})

onUnmounted(() => {
  if (animationTimer) {
    clearTimeout(animationTimer)
    animationTimer = null
  }
  ctx = null
})

defineExpose({ name: "ui-circle" })
</script>

<script lang="ts">
export default {
  name: "ui-circle",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-circle {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;

  &__canvas {
    display: block;
  }

  &__content {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
  }

  &__text {
    color: var(--ui-color-text-primary);
    font-size: var(--ui-font-size-md);
    font-weight: 500;
  }
}
</style>
