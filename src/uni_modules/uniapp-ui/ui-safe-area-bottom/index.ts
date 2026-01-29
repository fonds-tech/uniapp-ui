import type SafeAreaBottom from "./ui-safe-area-bottom.vue"
import type { ExtractPropTypes } from "vue"
import { isNumber } from "../utils/check"
import { styleProp, makeStringProp } from "../utils/props"

export const safeAreaBottomProps = {
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
export const safeAreaBottomEmits = {
  height: (htight: number) => isNumber(htight),
}

export type SafeAreaBottomEmits = typeof safeAreaBottomEmits
export type SafeAreaBottomProps = ExtractPropTypes<typeof safeAreaBottomProps>
export interface SafeAreaBottomExpose {
  name: "ui-safe-area-bottom"
}
export type SafeAreaBottomInstance = InstanceType<typeof SafeAreaBottom>
