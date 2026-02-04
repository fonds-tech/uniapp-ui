/**
 * 色彩映射配置 - 对应 variables.scss 中的色彩系统
 */
const colorMap: Record<string, string> = {
  // 品牌色彩
  primary: "--ui-color-primary",
  success: "--ui-color-success",
  warning: "--ui-color-warning",
  danger: "--ui-color-danger",
  info: "--ui-color-info",

  // 文本色彩（4 级梯度）
  "text-primary": "--ui-color-text",
  "text-main": "--ui-color-text", // 别名，兼容旧代码
  "text-secondary": "--ui-color-text-secondary",
  "text-tertiary": "--ui-color-text-tertiary",
  "text-placeholder": "--ui-color-text-placeholder",
  "text-disabled": "--ui-color-text-disabled",
  "text-inverse": "--ui-color-text-inverse",

  // 边框色彩
  border: "--ui-color-border",
  "border-light": "--ui-color-border-light",
  "border-dark": "--ui-color-border-dark",

  // 背景色彩
  background: "--ui-color-background",
  "background-base": "--ui-color-background",
  "background-page": "--ui-color-background-page",
  "background-section": "--ui-color-background-section",
  "background-input": "--ui-color-background-input",
  "background-hover": "--ui-color-background-hover",
  "background-disabled": "--ui-color-background-disabled",

  // 遮罩色彩
  mask: "--ui-color-mask",
  "mask-light": "--ui-color-mask-light",
  "mask-heavy": "--ui-color-mask-heavy",
}

/**
 * 使用颜色值，如果是内置色彩名称，返回对应的 CSS 变量，否则直接返回颜色值
 * @param color 颜色名称或颜色值（支持十六进制、rgb、rgba 等）
 * @returns CSS 颜色字符串
 *
 * @example
 * useColor('primary')        // -> var(--ui-color-primary)
 * useColor('text-primary')   // -> var(--ui-color-text)
 * useColor('text-main')      // -> var(--ui-color-text) // 别名
 * useColor('#ff0000')        // -> #ff0000
 * useColor('rgb(255,0,0)')   // -> rgb(255,0,0)
 */
export function useColor(color: string): string {
  if (!color) return ""

  // 检查是否是映射中的色彩名称
  const cssVar = colorMap[color]
  if (cssVar) {
    return `var(${cssVar})`
  }

  // 直接返回颜色值（支持十六进制、rgb、rgba、hsl 等）
  return color
}
