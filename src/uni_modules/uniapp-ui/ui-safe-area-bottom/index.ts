import type SafeAreaBottom from "./ui-safe-area-bottom.vue"
import type { ExtractPropTypes } from "vue"
import { isNumber } from "../utils/check"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("safe-area-bottom", {
  background: "",
  customClass: "",
  customStyle: "",
})

export const safeAreaBottomProps = {
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
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
