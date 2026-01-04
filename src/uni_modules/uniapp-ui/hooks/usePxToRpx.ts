import { isNumber } from "../utils/check"

/**
 * 将各种单位值统一转换为 px 像素值
 *
 * 注意：函数名 usePxToRpx 具有历史遗留原因，实际功能是将输入值转换为 px 值
 *
 * @description 将带单位的值（rpx、px）或纯数字转换为 px 像素值
 * @param value 值，支持以下格式：
 *   - "100rpx" -> 转换为对应的 px 值
 *   - "100px"  -> 直接提取数值
 *   - 100      -> 视为 rpx 值进行转换
 * @returns 转换后的 px 像素值
 *
 * @example
 * usePxToRpx("100rpx") // 在 375px 宽度屏幕上返回 50
 * usePxToRpx("100px")  // 返回 100
 * usePxToRpx(100)      // 视为 rpx，在 375px 宽度屏幕上返回 50
 */
export function usePxToRpx(value: string | number): number {
  // 空值或无效值检查
  if (value === null || value === undefined || value === "") {
    return 0
  }

  const strValue = String(value).trim()

  // 处理 rpx 单位：使用 uni.upx2px 转换为 px
  if (strValue.includes("rpx")) {
    const numPart = strValue.replace("rpx", "").trim()
    if (isNumber(numPart)) {
      return uni.upx2px(Number(numPart))
    }
    console.warn(`[usePxToRpx] "${value}" 不是有效的 rpx 值，返回 0`)
    return 0
  }

  // 处理 px 单位：直接提取数值
  if (strValue.includes("px")) {
    const numPart = strValue.replace("px", "").trim()
    if (isNumber(numPart)) {
      return Number(numPart)
    }
    console.warn(`[usePxToRpx] "${value}" 不是有效的 px 值，返回 0`)
    return 0
  }

  // 处理纯数字：视为 rpx 值进行转换
  if (isNumber(value)) {
    return uni.upx2px(Number(value))
  }

  console.warn(`[usePxToRpx] "${value}" 不是有效值，返回 0`)
  return 0
}
