import type FloatButton from "./ui-float-button.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const floatButtonProps = {
  /**
   * 是否显示
   */
  show: truthProp,
  /**
   * 图标名称
   */
  icon: makeStringProp("plus"),
  /**
   * 按钮文本
   */
  text: { type: String, default: "" },
  /**
   * 按钮类型
   */
  type: {
    type: String,
    default: "primary",
    validator: (v: string) => ["primary", "success", "warning", "danger", "default"].includes(v),
  },
  /**
   * 按钮尺寸
   */
  size: makeNumericProp("100rpx"),
  /**
   * 位置
   */
  position: {
    type: String,
    default: "right-bottom",
    validator: (v: string) => ["left-bottom", "right-bottom", "left-top", "right-top"].includes(v),
  },
  /**
   * 横向偏移
   */
  offsetX: makeNumericProp("24rpx"),
  /**
   * 纵向偏移
   */
  offsetY: makeNumericProp("100rpx"),
  /**
   * 元素层级
   */
  zIndex: makeNumericProp(100),
  /**
   * 自定义背景色
   */
  color: { type: String, default: "" },
  /**
   * 前景色（图标和文字颜色）
   */
  foregroundColor: makeStringProp("#fff"),
  /**
   * 图标大小
   */
  iconSize: makeNumericProp("40rpx"),
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否可拖拽
   */
  draggable: Boolean,
  /**
   * 拖拽边界（是否限制在屏幕内）
   */
  dragBoundary: truthProp,
  /**
   * 拖拽结束后是否吸附屏幕边缘
   */
  magnetic: {
    type: [Boolean, String],
    default: false,
    validator: (v: boolean | string) => typeof v === "boolean" || ["x", "y", "both"].includes(v),
  },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
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
