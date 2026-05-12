<template>
  <view class="ui-circle" :class="[props.customClass]" :style="[rootStyle]" role="progressbar" :aria-valuenow="ariaValueNow" aria-valuemin="0" aria-valuemax="100">
    <!-- #ifdef MP-WEIXIN -->
    <canvas :id="canvasId" type="2d" class="ui-circle__canvas" :style="canvasStyle" />
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <canvas :id="canvasId" :canvas-id="canvasId" class="ui-circle__canvas" :width="canvasAttrSize" :height="canvasAttrSize" :style="canvasStyle" />
    <!-- #endif -->

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
import { useUnit, useColor, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, onUnmounted, onBeforeMount, getCurrentInstance } from "vue"

defineOptions({ name: "ui-circle" })

const props = defineProps(circleProps)
const emits = defineEmits(circleEmits)

const instance = getCurrentInstance()
const canvasId = ref(`ui-circle-${uuid()}`)

// 内部资源
let ctx: any = null
let animationTimer: ReturnType<typeof setTimeout> | null = null

// 起始角度查表
const BEGIN_ANGLE = -Math.PI / 2
const PERIMETER = 2 * Math.PI
const startAngleMap: Record<string, number> = {
  top: -Math.PI / 2,
  right: 0,
  bottom: Math.PI / 2,
  left: Math.PI,
}

// 主题色 fallback：canvas 不能渲染 var()，token 名映射回硬编码（与 variables.scss 同步）
const tokenFallbacks: Record<string, string> = {
  primary: "#1989fa",
  success: "#07c160",
  warning: "#ff976a",
  danger: "#ee0a24",
  info: "#909399",
  "border-light": "#ebedf0",
  "background-section": "#f2f3f5",
}

// 设备 dpr
const pixelRatio = ref(1)
// 当前动画进度值（独立于 props.modelValue）
const currentRate = ref(0)

// 单行 computed
const sizePx = computed(() => safePx(props.size, 100))
const startAngle = computed(() => startAngleMap[props.startPosition] ?? BEGIN_ANGLE)
const ariaValueNow = computed(() => Math.round(currentRate.value))

// 根容器尺寸样式（同时把 size 推为 CSS var 供 SCSS 计算文字字号）
const rootStyle = computed<CSSProperties>(() => {
  const sizeVal = useUnit(props.size)
  const result: Record<string, any> = {
    width: sizeVal,
    height: sizeVal,
    "--ui-circle-size": sizeVal,
  }
  if (props.textColor) result["--ui-circle-text-color"] = useColor(props.textColor)
  if (props.textSize !== undefined) result["--ui-circle-text-size"] = useUnit(props.textSize)
  return useStyle({ ...result, ...(useStyle(props.customStyle) || {}) }) as CSSProperties
})
// 是否显示文字
const displayText = computed(() => {
  if (props.text === false) return ""
  if (typeof props.text === "string") return props.text
  return `${Math.round(currentRate.value)}%`
})
// canvas 视觉尺寸（与容器一致，CSS 单位）
const canvasStyle = computed(() => ({
  width: useUnit(props.size),
  height: useUnit(props.size),
}))
// 进度条线宽：用户指定 → 直传；否则按 size/20 自适应
const strokeWidthPx = computed(() => {
  if (props.strokeWidth !== undefined) return safePx(props.strokeWidth, 4)
  return Math.max(2, sizePx.value / 20)
})
// 非 MP-WEIXIN 路径：canvas 内部分辨率作为 HTML attr 注入；MP-ALIPAY 需 dpr 倍以保证清晰
const canvasAttrSize = computed(() => {
  // #ifdef MP-ALIPAY
  return sizePx.value * pixelRatio.value
  // #endif
  // #ifndef MP-ALIPAY
  return sizePx.value
  // #endif
})

// 监听 modelValue：动画过渡到目标值
watch(
  () => props.modelValue,
  (val) => animateTo(val),
)

// 监听尺寸 / 线宽：重置 ctx 后重绘
watch(
  () => [props.size, props.strokeWidth],
  () => {
    resetContext()
    nextTick(() => draw(currentRate.value))
  },
)

// 监听其他视觉属性：直接重绘
watch(
  () => [props.color, props.layerColor, props.fill, props.strokeLinecap, props.clockwise, props.startPosition],
  () => draw(currentRate.value),
  { deep: true },
)

// 转 px 数值，无效兜底
function safePx(value: number | string, fallback: number) {
  try {
    return useUnitToPx(value)
  } catch {
    return fallback
  }
}

// 解析颜色：var()/token 名映射回硬编码
function resolveColor(color?: string): string {
  if (!color) return ""
  if (color in tokenFallbacks) return tokenFallbacks[color]
  return color
}

// 微信小程序 type="2d" 新 API → 旧 API 形态适配，让绘制代码全端共用
function canvas2dAdapter(c: CanvasRenderingContext2D) {
  return {
    setStrokeStyle: (v: any) => (c.strokeStyle = v),
    setLineWidth: (v: number) => (c.lineWidth = v),
    setLineCap: (v: CanvasLineCap) => (c.lineCap = v),
    setFillStyle: (v: any) => (c.fillStyle = v),
    beginPath: () => c.beginPath(),
    arc: (x: number, y: number, r: number, sa: number, ea: number, ccw?: boolean) => c.arc(x, y, r, sa, ea, ccw),
    stroke: () => c.stroke(),
    fill: () => c.fill(),
    clearRect: (x: number, y: number, w: number, h: number) => c.clearRect(x, y, w, h),
    createLinearGradient: (x0: number, y0: number, x1: number, y1: number) => c.createLinearGradient(x0, y0, x1, y1),
    scale: (x: number, y: number) => c.scale(x, y),
    draw: () => undefined,
  }
}

// 拿 canvas 上下文：MP-WEIXIN 用现代 2d API + dpr 适配；其他端用 uni.createCanvasContext 旧 API
function getContext(): Promise<any> {
  if (ctx) return Promise.resolve(ctx)
  // #ifndef MP-WEIXIN
  ctx = uni.createCanvasContext(canvasId.value, instance as any)
  return Promise.resolve(ctx)
  // #endif
  // #ifdef MP-WEIXIN
  return new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .in(instance)
      .select(`#${canvasId.value}`)
      .fields({ node: true, size: true } as any, () => undefined)
      .exec((res: any) => {
        const node = res?.[0]?.node
        if (!node) return reject(new Error("ui-circle: canvas node not found"))
        const dpr = pixelRatio.value
        node.width = sizePx.value * dpr
        node.height = sizePx.value * dpr
        const c2d = node.getContext("2d") as CanvasRenderingContext2D
        c2d.scale(dpr, dpr)
        ctx = canvas2dAdapter(c2d)
        resolve(ctx)
      })
  })
  // #endif
}

// 绘制轨道
function renderLayer(c: any) {
  const center = sizePx.value / 2
  const lw = strokeWidthPx.value
  const radius = center - lw / 2

  if (props.fill) {
    c.beginPath()
    c.arc(center, center, radius - lw / 2, 0, PERIMETER)
    c.setFillStyle(resolveColor(props.fill))
    c.fill()
  }

  c.beginPath()
  c.arc(center, center, radius, 0, PERIMETER)
  c.setStrokeStyle(resolveColor(props.layerColor) || tokenFallbacks["border-light"])
  c.setLineWidth(lw)
  c.setLineCap(props.strokeLinecap)
  c.stroke()
}

// 绘制进度
function renderProgress(c: any, value: number) {
  const progress = Math.min(Math.max(value, 0), 100) / 100
  if (progress <= 0) return

  const center = sizePx.value / 2
  const lw = strokeWidthPx.value
  const radius = center - lw / 2
  const sweep = PERIMETER * progress
  const start = startAngle.value
  const end = props.clockwise ? start + sweep : start - sweep

  let stroke: any
  if (props.color && typeof props.color === "object") {
    const stops = props.color as CircleGradientColor
    const gradient = c.createLinearGradient(sizePx.value, 0, 0, 0)
    Object.keys(stops)
      .sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
      .forEach((k) => gradient.addColorStop(Number.parseFloat(k) / 100, stops[k]))
    stroke = gradient
  } else {
    stroke = resolveColor(props.color as string | undefined) || tokenFallbacks.primary
  }

  c.beginPath()
  c.arc(center, center, radius, start, end, !props.clockwise)
  c.setStrokeStyle(stroke)
  c.setLineWidth(lw)
  c.setLineCap(props.strokeLinecap)
  c.stroke()
}

// 完整重绘一帧
function draw(value: number) {
  getContext()
    .then((c) => {
      c.clearRect(0, 0, sizePx.value, sizePx.value)
      renderLayer(c)
      renderProgress(c, value)
      c.draw()
    })
    .catch((err) => console.warn(err))
}

// 重置 ctx（尺寸变化等场景下旧 ctx 失效）
function resetContext() {
  ctx = null
}

// 时间驱动动画：currentRate → target，duration ms 内完成
function animateTo(target: number) {
  cancelAnimation()
  const clamped = Math.min(Math.max(target, 0), 100)
  const from = currentRate.value
  const dur = Math.max(0, +props.duration)

  if (!props.animated || dur === 0 || from === clamped) {
    currentRate.value = clamped
    draw(currentRate.value)
    emits("finish")
    return
  }

  const startTime = Date.now()
  const tick = () => {
    const elapsed = Date.now() - startTime
    const t = Math.min(1, elapsed / dur)
    currentRate.value = from + (clamped - from) * t
    draw(currentRate.value)
    if (t < 1) {
      animationTimer = setTimeout(tick, 1000 / 60)
    } else {
      emits("finish")
    }
  }
  tick()
}

// 取消动画
function cancelAnimation() {
  if (animationTimer) {
    clearTimeout(animationTimer)
    animationTimer = null
  }
}

onBeforeMount(() => {
  try {
    pixelRatio.value = uni.getSystemInfoSync().pixelRatio || 1
  } catch {
    pixelRatio.value = 1
  }
})

onMounted(() => {
  // 初始进度：动画模式从 0 起步过渡到目标，否则直显
  currentRate.value = props.animated ? 0 : props.modelValue
  nextTick(() => {
    draw(currentRate.value)
    if (props.animated && props.modelValue !== 0) animateTo(props.modelValue)
  })
})

onUnmounted(() => {
  cancelAnimation()
  resetContext()
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
  --ui-circle-text-size: calc(var(--ui-circle-size) * 0.2);
  --ui-circle-text-color: var(--ui-color-text);
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
    color: var(--ui-circle-text-color);
    font-size: var(--ui-circle-text-size);
    font-weight: var(--ui-font-weight-normal);
  }
}
</style>
