import type SafeAreaTop from "./ui-safe-area-top.vue"
import type { ExtractPropTypes } from "vue"
import { isNumber } from "../utils/check"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("safe-area-top", {
  background: "",
  customClass: "",
  customStyle: "",
})

export const safeAreaTopProps = {
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
export const safeAreaTopEmits = {
  height: (htight: number) => isNumber(htight),
}

export type SafeAreaTopEmits = typeof safeAreaTopEmits
export type SafeAreaTopProps = ExtractPropTypes<typeof safeAreaTopProps>
export interface SafeAreaTopExpose {
  name: "ui-safe-area-top"
}
export type SafeAreaTopInstance = InstanceType<typeof SafeAreaTop>
