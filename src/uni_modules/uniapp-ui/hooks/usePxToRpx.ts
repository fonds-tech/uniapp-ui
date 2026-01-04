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
  // 处理 rpx 单位：使用 uni.upx2px 转换为 px
  if (String(value).includes("rpx")) {
    const val = String(value).split("rpx")[0]
    if (isNumber(val)) return uni.upx2px(Number(val))
    else throw new Error(`${value} 不是有效值`)
  }

  // 处理 px 单位：直接提取数值
  if (String(value).includes("px")) {
    const val = String(value).split("px")[0]
    if (isNumber(val)) return Number(val)
    else throw new Error(`${value} 不是有效值`)
  }

  // 处理纯数字：视为 px 值，转换为 rpx
  if (isNumber(value)) return Number(value) / (uni.upx2px(100) / 100)

  throw new Error(`${value} 不是有效值`)
}
