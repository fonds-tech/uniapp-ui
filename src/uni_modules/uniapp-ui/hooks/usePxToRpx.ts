import { isNumber } from "../utils/check"
import { useSystemInfo } from "./useSystemInfo"

/**
 * 将 px 值转换为 rpx 值
 *
 * @param px - px 值
 * @returns rpx 值
 *
 * @example
 * usePx2Rpx(50) // 在 375px 宽度屏幕上返回 100（rpx）
 */
export function usePx2Rpx(px: number): number {
  const systemInfo = useSystemInfo()
  const screenWidth = systemInfo.screenWidth
  return px * (750 / screenWidth)
}

/**
 * 将 rpx 值转换为 px 值
 *
 * @param rpx - rpx 值
 * @returns px 值
 *
 * @example
 * useRpx2Px(100) // 在 375px 宽度屏幕上返回 50（px）
 */
export function useRpx2Px(rpx: number): number {
  return uni.upx2px(rpx)
}

/**
 * 将各种单位值统一转换为 rpx 值
 *
 * @description 根据输入类型进行不同的转换处理
 * @param value 值，支持以下格式：
 *   - "100rpx" -> 直接返回数值 100（已经是 rpx）
 *   - "100px"  -> 将 px 转换为 rpx
 *   - 100      -> 视为 px 值，转换为 rpx
 *   - "100"    -> 视为 px 值，转换为 rpx
 * @returns 转换后的 rpx 数值
 *
 * @example
 * usePxToRpx("100rpx") // 返回 100（rpx）
 * usePxToRpx("100px")  // 在 375px 宽度屏幕上返回 200（rpx）
 * usePxToRpx(50)       // 在 375px 宽度屏幕上返回 100（rpx）
 * usePxToRpx("50")     // 在 375px 宽度屏幕上返回 100（rpx）
 */
export function usePxToRpx(value: string | number): number {
  if (value === null || value === undefined) return 0

  const raw = String(value).trim()
  if (!raw) return 0

  const normalized = raw.replace(/\s+/g, "")
  const warnInvalid = () => {
    console.warn(`[usePxToRpx] ${value} 不是有效值`)
  }

  // 处理 rpx 单位：直接返回数值
  if (normalized.includes("rpx")) {
    const val = normalized.split("rpx")[0]
    if (isNumber(val)) return Number(val)
    warnInvalid()
    return 0
  }

  // 处理 px 单位：转换为 rpx
  if (normalized.includes("px")) {
    const val = normalized.split("px")[0]
    if (isNumber(val)) return usePx2Rpx(Number(val))
    warnInvalid()
    return 0
  }

  // 处理纯数字：视为 px 值，转换为 rpx
  if (isNumber(normalized)) return usePx2Rpx(Number(normalized))

  warnInvalid()
  return 0
}
