import { isNumber } from "../utils/check"

/**
 * 将各种单位值进行转换
 *
 * @description 根据输入类型进行不同的转换处理
 * @param value 值，支持以下格式：
 *   - "100rpx" -> 转换为对应的 px 值（使用 uni.upx2px）
 *   - "100px"  -> 直接提取数值（px）
 *   - 100      -> 视为 px 值，转换为 rpx
 * @returns 转换后的数值
 *
 * @example
 * usePxToRpx("100rpx") // 在 375px 宽度屏幕上返回 50（px）
 * usePxToRpx("100px")  // 返回 100（px）
 * usePxToRpx(50)       // 在 375px 宽度屏幕上返回 100（rpx）
 */
export function usePxToRpx(value: string | number): number {
  if (value === null || value === undefined) return 0

  const raw = String(value).trim()
  if (!raw) return 0

  const normalized = raw.replace(/\s+/g, "")
  const warnInvalid = () => {
    console.warn(`[usePxToRpx] ${value} 不是有效值`)
  }

  // 处理 rpx 单位：使用 uni.upx2px 转换为 px
  if (normalized.includes("rpx")) {
    const val = normalized.split("rpx")[0]
    if (isNumber(val)) return uni.upx2px(Number(val))
    warnInvalid()
    return 0
  }

  // 处理 px 单位：直接提取数值
  if (normalized.includes("px")) {
    const val = normalized.split("px")[0]
    if (isNumber(val)) return Number(val)
    warnInvalid()
    return 0
  }

  // 处理纯数字：视为 rpx，转换为 px
  if (isNumber(normalized)) return uni.upx2px(Number(normalized))

  warnInvalid()
  return 0
}
