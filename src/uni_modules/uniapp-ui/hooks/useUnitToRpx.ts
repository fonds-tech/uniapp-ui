import { isNumber } from "../utils/check"

/**
 * 单位值转换为 rpx 值
 * @description 将单位值转换为 rpx 值，值为纯数字时，默认为 rpx 值
 * @param value 单位值，支持纯数字、rpx、px
 * @returns 转换值
 */
export function useUnitToRpx(value: string | number): number {
  if (String(value).includes("rpx")) {
    const val = String(value).split("rpx")[0]
    if (isNumber(val)) return Number(val)
    else throw new Error(`${value} 不是有效值`)
  }
  if (String(value).includes("px")) {
    const val = String(value).split("px")[0]
    if (isNumber(val)) return Number(val) / (uni.upx2px(100) / 100)
    else throw new Error(`${value} 不是有效值`)
  }
  if (isNumber(value)) return Number(value) / (uni.upx2px(100) / 100)
  throw new Error(`${value} 不是有效值`)
}
