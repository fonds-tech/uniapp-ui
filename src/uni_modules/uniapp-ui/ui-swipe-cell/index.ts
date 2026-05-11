import type SwipeCell from "./ui-swipe-cell.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type SwipeCellPosition = "left" | "right" | ""

export interface SwipeCellBeforeCloseParams {
  /** 当前展开位置 */
  position: SwipeCellPosition
  /** 强制关闭（跳过 beforeClose 二次拦截） */
  close: () => void
}

export type SwipeCellBeforeClose = (params: SwipeCellBeforeCloseParams) => boolean | void | Promise<boolean | void>

/** 方向判定阈值（px）：水平/垂直方向判定 + click 锁定 */
export const SWIPE_CELL_DIRECTION_THRESHOLD = 10

const defaultProps = buildDefaultProps("swipe-cell", {
  name: undefined,
  disabled: false,
  leftWidth: undefined,
  rightWidth: undefined,
  beforeClose: undefined,
  stopPropagation: true,
  threshold: 0.3,
  customClass: undefined,
  customStyle: undefined,
})

export const swipeCellProps = {
  /** 标识符；用于点击事件中区分多个单元格 */
  name: defaultProps("name", { type: [String, Number] as PropType<string | number> }),
  /** 禁用滑动 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 左侧区域宽度（px / rpx），未传时自动取插槽宽度 */
  leftWidth: defaultProps("leftWidth", { type: [Number, String] }),
  /** 右侧区域宽度（px / rpx），未传时自动取插槽宽度 */
  rightWidth: defaultProps("rightWidth", { type: [Number, String] }),
  /** 关闭前回调，返回 false 阻止关闭 */
  beforeClose: defaultProps("beforeClose", { type: Function as PropType<SwipeCellBeforeClose> }),
  /** H5 端阻止滑动事件冒泡（MP 端无效，依赖模板修饰符） */
  stopPropagation: defaultProps("stopPropagation", { type: Boolean }),
  /** 打开阈值（0-1）；超过此比例自动打开 */
  threshold: defaultProps("threshold", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const swipeCellEmits = {
  open: (_params: { name: string | number; position: SwipeCellPosition }) => true,
  close: (_params: { name: string | number; position: SwipeCellPosition }) => true,
  click: (_position: "left" | "right" | "cell") => true,
}

export type SwipeCellEmits = typeof swipeCellEmits
export type SwipeCellProps = ExtractPropTypes<typeof swipeCellProps>
export type SwipeCellInstance = InstanceType<typeof SwipeCell>
