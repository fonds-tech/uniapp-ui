import type FloatButton from "./ui-float-button.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("float-button", {
  show: true,
  icon: "plus",
  text: "",
  type: "primary",
  size: "100rpx",
  position: "right-bottom",
  offsetX: "24rpx",
  offsetY: "100rpx",
  zIndex: 100,
  color: "",
  foregroundColor: "#fff",
  iconSize: "40rpx",
  disabled: false,
  draggable: false,
  dragBoundary: true,
  magnetic: false,
  customClass: "",
  customStyle: "",
})

export const floatButtonProps = {
  /**
   * 是否显示
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 图标名称
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 按钮文本
   */
  text: defaultProps("text", { type: String }),
  /**
   * 按钮类型
   */
  type: defaultProps("type", {
    type: String,
    validator: (v: string) => ["primary", "success", "warning", "danger", "default"].includes(v),
  }),
  /**
   * 按钮尺寸
   */
  size: defaultProps("size", { type: [Number, String] }),
  /**
   * 位置
   */
  position: defaultProps("position", {
    type: String,
    validator: (v: string) => ["left-bottom", "right-bottom", "left-top", "right-top"].includes(v),
  }),
  /**
   * 横向偏移
   */
  offsetX: defaultProps("offsetX", { type: [Number, String] }),
  /**
   * 纵向偏移
   */
  offsetY: defaultProps("offsetY", { type: [Number, String] }),
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 自定义背景色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 前景色（图标和文字颜色）
   */
  foregroundColor: defaultProps("foregroundColor", { type: String }),
  /**
   * 图标大小
   */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 是否可拖拽
   */
  draggable: defaultProps("draggable", { type: Boolean }),
  /**
   * 拖拽边界（是否限制在屏幕内）
   */
  dragBoundary: defaultProps("dragBoundary", { type: Boolean }),
  /**
   * 拖拽结束后是否吸附屏幕边缘
   */
  magnetic: defaultProps("magnetic", {
    type: [Boolean, String],
    validator: (v: boolean | string) => typeof v === "boolean" || ["x", "y", "both"].includes(v),
  }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export interface FloatButtonDragDetail {
  left: number
  top: number
  position: string
}

export const floatButtonEmits = {
  click: () => true,
  "update:show": (show: boolean) => typeof show === "boolean",
  dragStart: (_detail: FloatButtonDragDetail) => true,
  dragMove: (_detail: FloatButtonDragDetail) => true,
  dragEnd: (_detail: FloatButtonDragDetail) => true,
}

export type FloatButtonEmits = typeof floatButtonEmits
export type FloatButtonProps = ExtractPropTypes<typeof floatButtonProps>
export type FloatButtonInstance = InstanceType<typeof FloatButton>
