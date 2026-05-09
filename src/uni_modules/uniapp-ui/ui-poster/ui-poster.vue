<template>
  <canvas :id="canvasId" :canvas-id="canvasId" class="ui-poster" :style="[rootStyle]" />
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { PosterDrawItem, PosterLineStyle, PosterRectStyle, PosterTextStyle, PosterImageStyle } from "./index"
import { uuid } from "../utils/utils"
import { isArray } from "../utils/check"
import { posterEmits, posterProps } from "./index"
import { useUnitToPx, useSystemInfo } from "../hooks"
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-poster" })

const props = defineProps(posterProps)
const emits = defineEmits(posterEmits)

const instance = getCurrentInstance()

// 每个组件实例独立 canvasId，否则同页面多实例画布串扰
const canvasId = `ui-poster-${uuid()}`
const ctx = ref<UniApp.CanvasContext | null>(null)
const canvasWidth = ref(0)
const canvasHeight = ref(0)

const rootStyle = computed<CSSProperties>(() => ({ width: `${canvasWidth.value}px`, height: `${canvasHeight.value}px` }))

watch(
  () => [props.width, props.height, props.pixel],
  () => {
    canvasWidth.value = usePixel(props.width)
    canvasHeight.value = usePixel(props.height)
  },
  { immediate: true },
)

// rpx → px → 乘像素比，得 canvas 物理像素
function usePixel(val: number | string) {
  return useUnitToPx(val) * Number(props.pixel)
}

function showToast(msg: string) {
  uni.showToast({ title: msg, icon: "none" })
}

// 是否四角等圆角且非 0
function isEqualBorderRadius(r: unknown): boolean {
  if (typeof r === "number") return r > 0
  if (typeof r === "string") return Number(r) > 0
  if (isArray<number>(r)) return r.every((v, _, a) => v === a[0] && v !== 0)
  return false
}

// 测量文字宽度 (支付宝/百度小程序 measureText 不可用，用字符宽度估算)
function measure(c: UniApp.CanvasContext, text: string, fontSize: number) {
  let width = 0
  // #ifndef MP-ALIPAY || MP-BAIDU
  width = c.measureText(text).width
  // #endif
  // #ifdef MP-ALIPAY || MP-BAIDU
  let sum = 0
  for (let i = 0; i < text.length; i++) {
    sum += text.charCodeAt(i) >= 0 && text.charCodeAt(i) <= 255 ? 1 : 2
  }
  width = (sum / 2) * usePixel(fontSize)
  // #endif
  return width
}

// 文本超宽换行 (支持指定行数，超出末行加 ...)
function wrapText(c: UniApp.CanvasContext, text: string, fontSize: number, textWidth: number, maxWidth: number, rows = 1) {
  const lines: string[] = []
  if (textWidth <= maxWidth) return [text]
  let buf = ""
  let lineNo = 1
  const chars = text.split("")
  for (let i = 0; i < chars.length; i++) {
    buf += chars[i]
    if (measure(c, buf, fontSize) >= maxWidth) {
      if (lineNo === rows && rows !== -1) {
        if (i !== chars.length - 1) buf = `${buf.slice(0, -1)}...`
        lines.push(buf)
        break
      }
      lines.push(buf)
      buf = ""
      lineNo++
    } else if (i === chars.length - 1) {
      lines.push(buf)
    }
  }
  return lines
}

function drawText(c: UniApp.CanvasContext, item: Extract<PosterDrawItem, { type: "text" }>) {
  const s = item.style
  const {
    fontSize,
    color,
    baseLine = "normal",
    textAlign = "left",
    spacing = 0,
    opacity = 1,
    lineThrough = false,
    rows = 1,
    lineHeight = 0,
    fontWeight = "normal",
    fontStyle = "normal",
    fontFamily = "sans-serif",
  } = s as PosterTextStyle
  let { left, top, width = 600, frontSize } = s
  c.save()
  c.beginPath()
  c.font = `${fontStyle} ${fontWeight} ${usePixel(fontSize)}px ${fontFamily}`
  c.setGlobalAlpha(opacity)
  c.setFillStyle(color)
  c.setTextBaseline(baseLine)
  c.setTextAlign(textAlign)
  const textWidth = measure(c, item.text, fontSize)
  width = usePixel(width)
  const lines = wrapText(c, item.text, fontSize, textWidth, width, rows)
  if (item.frontText) {
    c.setFontSize(usePixel(frontSize ?? fontSize))
    left = measure(c, item.frontText, frontSize ?? fontSize) + usePixel(left + spacing)
    c.setFontSize(usePixel(fontSize))
  } else {
    left = usePixel(left)
  }
  lines.forEach((line, i) => c.fillText(line, left as number, usePixel(top + (lineHeight || fontSize) * i)))
  c.restore()
  if (lineThrough) {
    let lineY = top
    switch (baseLine) {
      case "top":
        lineY += fontSize / 2 + 4
        break
      case "middle":
        break
      case "bottom":
        lineY -= fontSize / 2 + 4
        break
      default:
        // #ifdef MP-WEIXIN
        lineY -= fontSize / 2 - 3
        // #endif
        // #ifndef MP-WEIXIN
        lineY -= fontSize / 2 - 4
        // #endif
        break
    }
    c.save()
    c.moveTo(left as number, usePixel(lineY))
    c.lineTo((left as number) + textWidth + 2, usePixel(lineY))
    c.setStrokeStyle(color)
    c.stroke()
    c.restore()
  }
}

function drawImage(c: UniApp.CanvasContext, item: Extract<PosterDrawItem, { type: "image" }>) {
  const { left, top, width, height, borderRadius = 0, borderWidth = 0, borderColor } = item.style as PosterImageStyle
  c.save()
  if ((typeof borderRadius === "number" && borderRadius > 0) || isArray(borderRadius)) {
    drawRoundedRectPath(c, item.style)
    c.strokeStyle = "rgba(0,0,0,0)"
    // #ifndef MP-BAIDU || MP-TOUTIAO
    c.stroke()
    // #endif
    c.clip()
  }
  c.drawImage(item.src, usePixel(left), usePixel(top), usePixel(width), usePixel(height))
  if (borderWidth && borderWidth > 0 && borderColor) {
    c.setStrokeStyle(borderColor)
    c.setLineWidth(usePixel(borderWidth))
    c.stroke()
  }
  c.restore()
}

// 等圆角矩形路径 (用于 fill / clip)
function drawEqualRoundedRectPath(c: UniApp.CanvasContext, s: PosterRectStyle | PosterImageStyle) {
  const br = (s as PosterRectStyle).borderRadius
  const radii = isArray<number>(br) ? br.map((r) => usePixel(r)) : [usePixel(br as number)]
  const r = (radii[0] ?? 0) / 2
  const top = usePixel(s.top)
  const left = usePixel(s.left)
  const width = usePixel(s.width)
  const height = usePixel(s.height)
  c.beginPath()
  c.arc(left + r, top + r, r, Math.PI, Math.PI * 1.5)
  c.moveTo(left + r, top)
  c.lineTo(left + width - r, top)
  c.lineTo(left + width, top + r)
  c.arc(left + width - r, top + r, r, Math.PI * 1.5, Math.PI * 2)
  c.lineTo(left + width, top + height - r)
  c.lineTo(left + width - r, top + height)
  c.arc(left + width - r, top + height - r, r, 0, Math.PI * 0.5)
  c.lineTo(left + r, top + height)
  c.lineTo(left, top + height - r)
  c.arc(left + r, top + height - r, r, Math.PI * 0.5, Math.PI)
  c.lineTo(left, top + r)
  c.lineTo(left + r, top)
}

// 任意圆角矩形路径 (4 角可不同)
function drawRoundedRectPath(c: UniApp.CanvasContext, s: PosterRectStyle | PosterImageStyle) {
  const br = (s as PosterRectStyle).borderRadius
  const radii = isArray<number>(br) ? br.map((r) => usePixel(r)) : Array.from({ length: 4 }).fill(usePixel(br as number))
  const [tl, tr, br2, bl] = radii as [number, number, number, number]
  const top = usePixel(s.top)
  const left = usePixel(s.left)
  const width = usePixel(s.width)
  const height = usePixel(s.height)
  c.beginPath()
  c.moveTo(left + tl, top)
  c.lineTo(left + width - tr, top)
  c.quadraticCurveTo(left + width, top, left + width, top + tr)
  c.lineTo(left + width, top + height - br2)
  c.quadraticCurveTo(left + width, top + height, left + width - br2, top + height)
  c.lineTo(left + bl, top + height)
  c.quadraticCurveTo(left, top + height, left, top + height - bl)
  c.lineTo(left, top + tl)
  c.quadraticCurveTo(left, top, left + tl, top)
  c.closePath()
  c.strokeStyle = "transparent"
  c.stroke()
}

function drawRect(c: UniApp.CanvasContext, item: Extract<PosterDrawItem, { type: "rect" }>) {
  const s = item.style
  const {
    width,
    height,
    left,
    top,
    borderWidth,
    backgroundColor,
    gradientColor,
    gradientType = 1,
    borderColor,
    borderRadius = 0,
    opacity = 1,
    globalCompositeOperation = "source-over",
    shadow,
  } = s
  c.save()
  c.setGlobalAlpha(opacity)
  c.globalCompositeOperation = globalCompositeOperation as GlobalCompositeOperation
  if (gradientColor && backgroundColor) {
    // gradientType 1 横向 / 2 纵向
    const params = gradientType === 1 ? [0, 0, usePixel(width), usePixel(height)] : [0, usePixel(width), usePixel(height), 0]
    const grad = c.createLinearGradient(...(params as [number, number, number, number]))
    grad.addColorStop(0, backgroundColor)
    grad.addColorStop(1, gradientColor)
    c.setFillStyle(grad)
  } else if (backgroundColor) {
    c.setFillStyle(backgroundColor)
  }
  if (shadow) {
    c.shadowOffsetX = usePixel(shadow.offsetX)
    c.shadowOffsetY = usePixel(shadow.offsetY)
    c.shadowBlur = shadow.blur
    c.shadowColor = shadow.color
  }
  if (isEqualBorderRadius(borderRadius)) {
    drawEqualRoundedRectPath(c, s)
    c.fill()
  } else if (isArray(borderRadius)) {
    drawRoundedRectPath(c, s)
    c.fill()
  } else {
    c.fillRect(usePixel(left), usePixel(top), usePixel(width), usePixel(height))
  }
  c.restore()
  if (borderWidth && borderColor) {
    c.save()
    c.setGlobalAlpha(opacity)
    c.setStrokeStyle(borderColor)
    c.setLineWidth(usePixel(borderWidth))
    if ((typeof borderRadius === "number" && borderRadius > 0) || isArray(borderRadius)) {
      drawRoundedRectPath(c, s)
      c.stroke()
    } else {
      c.strokeRect(usePixel(left), usePixel(top), usePixel(width), usePixel(height))
    }
    c.restore()
  }
}

function drawLine(c: UniApp.CanvasContext, item: Extract<PosterDrawItem, { type: "line" }>) {
  const { left, top, endLeft, endTop, color, width = 1, lineDash } = item.style as PosterLineStyle
  c.save()
  c.beginPath()
  c.setStrokeStyle(color)
  c.setLineWidth(usePixel(width))
  if (isArray<number>(lineDash)) {
    c.setLineDash(
      lineDash.map((d) => usePixel(d)),
      0,
    )
  }
  c.moveTo(usePixel(left), usePixel(top))
  c.lineTo(usePixel(endLeft), usePixel(endTop))
  c.stroke()
  c.closePath()
  c.restore()
}

// 网络图下载到本地临时路径
function downloadImage(url: string) {
  return new Promise<string>((resolve, reject) => {
    uni.downloadFile({
      url,
      success: (res) => resolve(res.tempFilePath),
      fail: () => reject(new Error("download failed")),
    })
  })
}

// base64 → 可绘制路径 (各端实现差异较大)
function base64ToImage(base64: string) {
  const id = `poster_${Math.ceil(Math.random() * 10e5).toString(36)}`
  return new Promise<string>((resolve, reject) => {
    // #ifdef MP-WEIXIN
    const match = /data:image\/(\w+);base64,(.*)/.exec(base64) || []
    const [, format, body] = match
    if (!format || !body) return reject(new Error("invalid base64"))
    const buffer = wx.base64ToArrayBuffer(body)
    const filePath = `${wx.env.USER_DATA_PATH}/${id}.${format}`
    wx.getFileSystemManager().writeFile({
      filePath,
      data: buffer,
      encoding: "binary",
      success: () => resolve(filePath),
      fail: () => reject(new Error("write failed")),
    })
    // #endif
    // #ifdef APP-PLUS
    const bitmap = new plus.nativeObj.Bitmap(id)
    bitmap.loadBase64Data(
      base64,
      () =>
        bitmap.save(
          `_doc/${id}.png`,
          {},
          (e: { target: string }) => resolve(e.target),
          () => reject(new Error("save failed")),
        ),
      () => reject(new Error("load failed")),
    )
    // #endif
    // #ifdef H5
    resolve(base64)
    // #endif
    // #ifndef MP-WEIXIN || APP-PLUS || H5
    reject(new Error("base64 not supported on this platform"))
    // #endif
  })
}

// 渲染所有 item 后调用 ctx.draw → toTempFilePath
function renderAndExport(items: PosterDrawItem[]) {
  return new Promise<string>((resolve, reject) => {
    const c = ctx.value
    if (!c) return reject(new Error("canvas context not ready"))
    c.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    items.forEach((item) => {
      if (item.type === "text") drawText(c, item)
      else if (item.type === "image") drawImage(c, item)
      else if (item.type === "rect") drawRect(c, item)
      else if (item.type === "line") drawLine(c, item)
    })
    // Android draw 回调延迟较大；80ms 是经验值，确保画完
    const sysInfo = useSystemInfo()
    const delay = sysInfo.platform === "android" ? 300 : 80
    setTimeout(() => {
      c.draw(false, () => {
        setTimeout(() => {
          // #ifdef MP-ALIPAY
          // @ts-expect-error 支付宝小程序专用 API
          c.toTempFilePath({
            success: (res: { apFilePath: string }) => resolve(res.apFilePath),
            fail: () => reject(new Error("toTempFilePath failed")),
          })
          // #endif
          // #ifndef MP-ALIPAY
          uni.canvasToTempFilePath(
            {
              x: 0,
              y: 0,
              canvasId,
              fileType: "png",
              quality: 1,
              success: (res) => resolve(res.tempFilePath),
              fail: () => reject(new Error("toTempFilePath failed")),
            },
            instance?.proxy as never,
          )
          // #endif
        }, delay)
      })
    }, 50)
  })
}

// 公共方法: 加载远程/base64 图片，再渲染并导出 tempFilePath
async function draw(items: PosterDrawItem[]): Promise<string> {
  if (!items?.length) throw new Error("draw items required")
  const tasks: Array<{ index: number; promise: Promise<string> }> = []
  items.forEach((item, index) => {
    if (item.type !== "image") return
    if (item.imgType === 2) tasks.push({ index, promise: downloadImage(item.src) })
    // #ifdef APP-PLUS || H5 || MP-WEIXIN
    if (item.imgType === 3) tasks.push({ index, promise: base64ToImage(item.src) })
    // #endif
  })
  if (tasks.length) {
    try {
      const results = await Promise.all(tasks.map((t) => t.promise))
      tasks.forEach((t, i) => {
        const item = items[t.index]
        if (item.type === "image") item.src = results[i]
      })
    } catch {
      showToast("图片处理失败")
      throw new Error("image preprocessing failed")
    }
  }
  return renderAndExport(items)
}

// 保存图片到相册
async function save(file: string): Promise<void> {
  // #ifdef H5
  // H5 无相册概念，预览方式让用户长按保存
  uni.previewImage({ urls: [file] })
  // #endif
  // #ifndef H5
  return new Promise((resolve, reject) => {
    uni.saveImageToPhotosAlbum({
      filePath: file,
      success: () => {
        showToast("已保存到相册")
        resolve()
      },
      fail: () => {
        // 多为权限被拒，提示用户去系统设置开启
        uni.showModal({ title: "提示", content: "保存失败，请在系统设置中开启相册权限", showCancel: false })
        reject(new Error("save failed"))
      },
    })
  })
  // #endif
}

onMounted(() => {
  // setTimeout 给 canvas 元素挂载时间，否则 createCanvasContext 拿不到 ctx
  setTimeout(() => {
    ctx.value = uni.createCanvasContext(canvasId, instance?.proxy as never)
    emits("ready")
  }, 50)
})

defineExpose({ draw, save, canvasId })
</script>

<script lang="ts">
export default {
  name: "ui-poster",
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
// 移出可视区域：海报渲染过程不打扰用户，导出成图片后由调用方决定如何展示
.ui-poster {
  top: -9999px;
  left: -9999px;
  position: fixed;
}
</style>
