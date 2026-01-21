import { isNumber } from "../utils/check"

/**
 * 将各种单位值统一转换为 rpx 值
 * @param value 支持 "100rpx" | "100px" | 100 | "100"
 */
export function usePxToRpx(value: string | number): number {
  if (value === null || value === undefined) return 0

  const raw = String(value).trim()
  if (!raw) return 0

  const normalized = raw.replace(/\s+/g, "")
  const ratio = uni.upx2px(100) / 100
  const px2rpx = (px: number) => px / ratio

  if (normalized.includes("rpx")) {
    const val = normalized.split("rpx")[0]
    if (isNumber(val)) return Number(val)
    return 0
  }

  if (normalized.includes("px")) {
    const val = normalized.split("px")[0]
    if (isNumber(val)) return px2rpx(Number(val))
    return 0
  }

  if (isNumber(normalized)) return px2rpx(Number(normalized))

  return 0
}
