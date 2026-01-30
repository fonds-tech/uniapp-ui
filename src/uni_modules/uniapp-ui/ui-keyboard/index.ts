import type Keyboard from "./ui-keyboard.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export interface KeyboardKeyItem {
  value: string
  type: "key" | "delete" | "close" | "switch"
}

const defaultProps = buildDefaultProps("keyboard", {
  show: false,
  title: "",
  mode: "number",
  maxlength: Infinity,
  zIndex: "",
  random: false,
  overlay: true,
  showDot: false,
  vibrate: false,
  modelValue: "",
  autoSwitch: true,
  showHeader: true,
  showCancel: true,
  cancelText: "取消",
  cancelTextSize: "",
  cancelTextColor: "error",
  cancelTextWeight: "",
  showConfirm: true,
  confirmText: "确定",
  confirmTextSize: "",
  confirmTextColor: "",
  confirmTextWeight: "",
  background: "#f2f3f5",
  safeAreaInsetBottom: true,
  closeOnClickOverlay: true,
  customClass: "",
  customStyle: "",
})

export const keyboardProps = {
  /**
   * 是否显示
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 标题
   */
  title: defaultProps("title", { type: String }),
  /**
   * 键盘类型，可选值car、card、number
   */
  mode: defaultProps("mode", { type: String, validator: (v: string) => ["car", "card", "number"].includes(v) }),
  /**
   * 最大输入长度
   */
  maxlength: defaultProps("maxlength", { type: [Number, String] }),
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 是否打乱键盘按键的顺序
   */
  random: defaultProps("random", { type: Boolean }),
  /**
   * 是否显示遮罩
   */
  overlay: defaultProps("overlay", { type: Boolean }),
  /**
   * 是否显示小数点按钮
   */
  showDot: defaultProps("showDot", { type: Boolean }),
  /**
   * 是否开启按键震动反馈
   */
  vibrate: defaultProps("vibrate", { type: Boolean }),
  /**
   * 当前输入值，用于 maxlength 限制和 change 事件
   */
  modelValue: defaultProps("modelValue", { type: String }),
  /**
   * 车牌键盘是否自动切换中英文（根据输入长度）
   */
  autoSwitch: defaultProps("autoSwitch", { type: Boolean }),
  /**
   * 是否显示顶部栏
   */
  showHeader: defaultProps("showHeader", { type: Boolean }),
  /**
   * 是否显示取消按钮
   */
  showCancel: defaultProps("showCancel", { type: Boolean }),
  /**
   * 关闭按钮文字
   */
  cancelText: defaultProps("cancelText", { type: String }),
  /**
   * 关闭按钮文字大小
   */
  cancelTextSize: defaultProps("cancelTextSize", { type: [Number, String] }),
  /**
   * 关闭按钮文字颜色
   */
  cancelTextColor: defaultProps("cancelTextColor", { type: String }),
  /**
   * 关闭按钮文字粗细
   */
  cancelTextWeight: defaultProps("cancelTextWeight", { type: [Number, String] }),
  /**
   * 是否显示确认按钮
   */
  showConfirm: defaultProps("showConfirm", { type: Boolean }),
  /**
   * 确认按钮文字
   */
  confirmText: defaultProps("confirmText", { type: String }),
  /**
   * 确认按钮文字大小
   */
  confirmTextSize: defaultProps("confirmTextSize", { type: [Number, String] }),
  /**
   * 确认按钮文字颜色
   */
  confirmTextColor: defaultProps("confirmTextColor", { type: String }),
  /**
   * 确认按钮文字粗细
   */
  confirmTextWeight: defaultProps("confirmTextWeight", { type: [Number, String] }),
  /**
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 是否开启底部安全区适配
   */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /**
   * 是否允许点击遮罩收起键盘
   */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const keyboardEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  cancel: () => true,
  confirm: () => true,
  input: (value: string) => typeof value === "string",
  delete: () => true,
  change: (value: string) => typeof value === "string",
  "update:show": (show: boolean) => typeof show === "boolean",
  "update:modelValue": (value: string) => typeof value === "string",
}

export type KeyboardEmits = typeof keyboardEmits
export type KeyboardProps = ExtractPropTypes<typeof keyboardProps>
export type KeyboardInstance = InstanceType<typeof Keyboard>
