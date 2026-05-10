import type Resize from "./ui-resize.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** resize 事件回调数据 */
export interface ResizeRect {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}

const defaultProps = buildDefaultProps("resize", {
  width: undefined,
  height: undefined,
  disabled: false,
  customClass: "",
  customContainerClass: "",
  customStyle: "",
})

export const resizeProps = {
  /** 初始宽度 (传值则锁宽，否则跟随子元素) */
  width: defaultProps("width", { type: [Number, String] }),
  /** 初始高度 (传值则锁高，否则跟随子元素) */
  height: defaultProps("height", { type: [Number, String] }),
  /** 禁用尺寸监听 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 自定义类名 (外层) */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义类名 (内层 content 容器) */
  customContainerClass: defaultProps("customContainerClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const resizeEmits = {
  /** 子元素尺寸变化时触发 */
  resize: (rect: ResizeRect) => !!rect && typeof rect.width === "number",
}

export type ResizeEmits = typeof resizeEmits
export type ResizeProps = ExtractPropTypes<typeof resizeProps>
export type ResizeInstance = InstanceType<typeof Resize>
