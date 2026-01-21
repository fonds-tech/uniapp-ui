import type Keyboard from "./ui-keyboard.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export interface KeyboardKeyItem {
  value: string
  type: "key" | "delete" | "close" | "switch"
}

export const [keyboardProps, useKeyboardProps] = createProps("keyboard", {
  /**
   * 是否显示
   */
  show: Boolean,
  /**
   * 标题
   */
  title: makeStringProp(""),
  /**
   * 键盘类型，可选值car、card、number
   */
  mode: { type: String, default: "number", validator: (v: string) => ["car", "card", "number"].includes(v) },
  /**
   * 最大输入长度
   */
  maxlength: makeNumericProp(Infinity),
  /**
   * 元素层级
   */
  zIndex: makeNumericProp(""),
  /**
   * 是否打乱键盘按键的顺序
   */
  random: Boolean,
  /**
   * 是否显示遮罩
   */
  overlay: truthProp,
  /**
   * 是否显示小数点按钮
   */
  showDot: Boolean,
  /**
   * 是否开启按键震动反馈
   */
  vibrate: Boolean,
  /**
   * 当前输入值，用于 maxlength 限制和 change 事件
   */
  modelValue: makeStringProp(""),
  /**
   * 车牌键盘是否自动切换中英文（根据输入长度）
   */
  autoSwitch: truthProp,
  /**
   * 是否显示顶部栏
   */
  showHeader: truthProp,
  /**
   * 是否显示取消按钮
   */
  showCancel: truthProp,
  /**
   * 关闭按钮文字
   */
  cancelText: makeStringProp("取消"),
  /**
   * 关闭按钮文字大小
   */
  cancelTextSize: makeNumericProp(""),
  /**
   * 关闭按钮文字颜色
   */
  cancelTextColor: makeStringProp("error"),
  /**
   * 关闭按钮文字粗细
   */
  cancelTextWeight: makeNumericProp(""),
  /**
   * 是否显示确认按钮
   */
  showConfirm: truthProp,
  /**
   * 确认按钮文字
   */
  confirmText: makeStringProp("确定"),
  /**
   * 确认按钮文字大小
   */
  confirmTextSize: makeNumericProp(""),
  /**
   * 确认按钮文字颜色
   */
  confirmTextColor: makeStringProp(""),
  /**
   * 确认按钮文字粗细
   */
  confirmTextWeight: makeNumericProp(""),
  /**
   * 背景颜色
   */
  background: makeStringProp("#f2f3f5"),
  /**
   * 是否开启底部安全区适配
   */
  safeAreaInsetBottom: truthProp,
  /**
   * 是否允许点击遮罩收起键盘
   */
  closeOnClickOverlay: truthProp,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

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
