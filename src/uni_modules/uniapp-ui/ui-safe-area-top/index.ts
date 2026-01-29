import type SafeAreaTop from "./ui-safe-area-top.vue"
import type { ExtractPropTypes } from "vue"
import { isNumber } from "../utils/check"
import { styleProp, makeStringProp } from "../utils/props"

export const safeAreaTopProps = {
  /**
   * 背景色
   */
  background: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const safeAreaTopEmits = {
  height: (htight: number) => isNumber(htight),
}

export type SafeAreaTopEmits = typeof safeAreaTopEmits
export type SafeAreaTopProps = ExtractPropTypes<typeof safeAreaTopProps>
export interface SafeAreaTopExpose {
  name: "ui-safe-area-top"
}
export type SafeAreaTopInstance = InstanceType<typeof SafeAreaTop>
