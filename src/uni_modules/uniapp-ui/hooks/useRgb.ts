/**
 * CSS 颜色关键字映射表
 * 包含 CSS Level 4 规范中的基础颜色关键字
 */
const CSS_COLORS: Record<string, [number, number, number]> = {
  // 基础色
  black: [0, 0, 0],
  white: [255, 255, 255],
  red: [255, 0, 0],
  green: [0, 128, 0],
  blue: [0, 0, 255],
  yellow: [255, 255, 0],
  cyan: [0, 255, 255],
  magenta: [255, 0, 255],
  // 灰色系
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  silver: [192, 192, 192],
  // 常用扩展色
  orange: [255, 165, 0],
  pink: [255, 192, 203],
  purple: [128, 0, 128],
  brown: [165, 42, 42],
  navy: [0, 0, 128],
  teal: [0, 128, 128],
  olive: [128, 128, 0],
  maroon: [128, 0, 0],
  lime: [0, 255, 0],
  aqua: [0, 255, 255],
  fuchsia: [255, 0, 255],
  coral: [255, 127, 80],
  gold: [255, 215, 0],
  indigo: [75, 0, 130],
  violet: [238, 130, 238],
  tan: [210, 180, 140],
  skyblue: [135, 206, 235],
  tomato: [255, 99, 71],
  salmon: [250, 128, 114],
  turquoise: [64, 224, 208],
  transparent: [0, 0, 0],
}

export interface RgbResult {
  r: number
  g: number
  b: number
}

/**
 * 将颜色字符串转换为 RGB 值
 * 支持多种颜色格式：
 * - 十六进制：#RGB、#RRGGBB
 * - RGB 函数：rgb(r, g, b)、rgba(r, g, b, a)
 * - CSS 颜色关键字：red、blue、green 等
 *
 * @param color 颜色字符串
 * @returns 包含 RGB 值的对象，如果输入无效则返回 null
 */
export function useRgb(color: string): RgbResult | null {
  if (!color || typeof color !== "string") {
    return null
  }

  const trimmed = color.trim().toLowerCase()

  // 1. 尝试解析 CSS 颜色关键字
  if (CSS_COLORS[trimmed]) {
    const [r, g, b] = CSS_COLORS[trimmed]
    return { r, g, b }
  }

  // 2. 尝试解析十六进制颜色
  const hexResult = parseHex(trimmed)
  if (hexResult) {
    return hexResult
  }

  // 3. 尝试解析 rgb/rgba 格式
  const rgbResult = parseRgbFunction(trimmed)
  if (rgbResult) {
    return rgbResult
  }

  // 无法解析，返回 null 而非抛出错误
  console.warn(`[useRgb] 无法解析颜色值: ${color}`)
  return null
}

/**
 * 解析十六进制颜色
 * 支持 #RGB 和 #RRGGBB 格式
 */
function parseHex(hex: string): RgbResult | null {
  // 匹配 #RRGGBB 格式
  const hex6 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (hex6) {
    return {
      r: Number.parseInt(hex6[1], 16),
      g: Number.parseInt(hex6[2], 16),
      b: Number.parseInt(hex6[3], 16),
    }
  }

  // 匹配 #RGB 格式（简写）
  const hex3 = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex)
  if (hex3) {
    return {
      r: Number.parseInt(hex3[1] + hex3[1], 16),
      g: Number.parseInt(hex3[2] + hex3[2], 16),
      b: Number.parseInt(hex3[3] + hex3[3], 16),
    }
  }

  return null
}

/**
 * 解析 rgb() 和 rgba() 格式
 * 支持：rgb(255, 0, 0)、rgba(255, 0, 0, 0.5)
 */
function parseRgbFunction(color: string): RgbResult | null {
  // 匹配 rgb(r, g, b) 或 rgba(r, g, b, a)
  const rgbMatch = /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*[\d.]+)?\s*\)$/i.exec(color)
  if (rgbMatch) {
    const r = Number.parseInt(rgbMatch[1], 10)
    const g = Number.parseInt(rgbMatch[2], 10)
    const b = Number.parseInt(rgbMatch[3], 10)

    // 校验 RGB 值范围
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return { r, g, b }
    }
  }

  return null
}
