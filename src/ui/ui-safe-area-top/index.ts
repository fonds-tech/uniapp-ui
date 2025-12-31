import type SafeAreaTop from "./ui-safe-area-top.vue"
import { isNumber } from "../utils/check"
import { styleProp, buildProps, makeStringProp } from "../utils/props"

export const safeAreaTopProps = buildProps("safeAreaTop", {
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
})
export const safeAreaTopEmits = {
  height: (htight: number) => isNumber(htight),
}

export type SafeAreaTopEmits = typeof safeAreaTopEmits
export interface SafeAreaTopExpose {
  name: "ui-safe-area-top"
}
export type SafeAreaTopInstance = InstanceType<typeof SafeAreaTop>
