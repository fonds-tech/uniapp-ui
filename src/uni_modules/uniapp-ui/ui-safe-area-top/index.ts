import type SafeAreaTop from "./ui-safe-area-top.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("safe-area-top", {
  background: undefined,
  customClass: "",
  customStyle: "",
})

export const safeAreaTopProps = {
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const safeAreaTopEmits = {}

export type SafeAreaTopEmits = typeof safeAreaTopEmits
export type SafeAreaTopProps = ExtractPropTypes<typeof safeAreaTopProps>
export type SafeAreaTopInstance = InstanceType<typeof SafeAreaTop>
