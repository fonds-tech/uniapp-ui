import { useUnitToPx } from "./useUnitToPx"
import { useUnitToRpx } from "./useUnitToRpx"
import { isDef, isNumber } from "../utils/check"

/**
 * 转换单位值
 * @description 将值转换为指定单位的值
 * @param value 值
 * @param unit 单位
 * @returns 转换值
 */
export function useUnit(value: string | number, unit: "px" | "rpx" = "rpx"): string {
  if (/\s+/.test(String(value))) {
    value = String(value)
    const values = value.trim().split(/\s+/)
    const isInvalid = values.some((val) => {
      if (val.includes("rpx")) return !isNumber(val.split("rpx")[0])
      if (val.includes("px")) return !isNumber(val.split("px")[0])
      return !isNumber(val)
    })
    if (isInvalid) return String(value)
    return values
      .map((val) => {
        if (val.includes("rpx")) return unit === "rpx" ? val : `${useUnitToPx(val)}px`
        if (val.includes("px")) return unit === "px" ? val : `${useUnitToRpx(val)}rpx`
        return unit === "rpx" ? `${val}rpx` : `${useUnitToPx(val)}px`
      })
      .join(" ")
  }
  if (String(value).includes("rpx")) {
    const val = String(value).split("rpx")[0]
    if (isNumber(val)) return unit === "rpx" ? String(value) : `${useUnitToPx(value)}px`
    else return String(value)
  }
  if (String(value).includes("px")) {
    const val = String(value).split("px")[0]
    if (isNumber(val)) return unit === "px" ? String(value) : `${useUnitToRpx(value)}rpx`
    else return String(value)
  }
  if (isNumber(value)) return unit === "rpx" ? `${value}rpx` : `${useUnitToPx(value)}px`
  return isDef(value) ? String(value) : ""
}
