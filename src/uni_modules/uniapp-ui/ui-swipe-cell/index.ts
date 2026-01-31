import type SwipeCell from "./ui-swipe-cell.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 滑动位置类型 */
export type SwipeCellPosition = "left" | "right" | ""

/** 关闭前回调参数 */
export interface SwipeCellBeforeCloseParams {
  /** 当前展开的位置 */
  position: SwipeCellPosition
  /** 关闭方法 */
  close: () => void
}

/** 关闭前回调函数类型 */
export type SwipeCellBeforeClose = (params: SwipeCellBeforeCloseParams) => boolean | void | Promise<boolean | void>

const defaultProps = buildDefaultProps("swipe-cell", {
  name: undefined,
  disabled: false,
  leftWidth: 0,
  rightWidth: 0,
  beforeClose: undefined,
  stopPropagation: true,
  threshold: 0.3,
  customClass: undefined,
  customStyle: undefined,
})

export const swipeCellProps = {
  /** 标识符，用于在点击事件中区分不同的滑动单元格 */
  name: defaultProps("name", { type: [String, Number] as PropType<string | number> }),
  /** 是否禁用滑动 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 左侧滑动区域宽度，单位为 px */
  leftWidth: defaultProps("leftWidth", { type: [Number, String] }),
  /** 右侧滑动区域宽度，单位为 px */
  rightWidth: defaultProps("rightWidth", { type: [Number, String] }),
  /** 关闭前的回调函数，返回 false 可阻止关闭 */
  beforeClose: defaultProps("beforeClose", { type: Function as PropType<SwipeCellBeforeClose> }),
  /** 是否阻止滑动事件冒泡 */
  stopPropagation: defaultProps("stopPropagation", { type: Boolean }),
  /** 打开时触发的阈值比例，超过此比例自动打开，范围 0-1 */
  threshold: defaultProps("threshold", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const swipeCellEmits = {
  /** 打开时触发 */
  open: (params: { name: string | number; position: SwipeCellPosition }) => true,
  /** 关闭时触发 */
  close: (params: { name: string | number; position: SwipeCellPosition }) => true,
  /** 点击时触发 */
  click: (position: "left" | "right" | "cell" | "outside") => true,
}

export type SwipeCellEmits = typeof swipeCellEmits
export type SwipeCellProps = ExtractPropTypes<typeof swipeCellProps>
export type SwipeCellInstance = InstanceType<typeof SwipeCell>
