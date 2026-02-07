import type CodeInput from "./ui-code-input.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

// 样式类型枚举
export type CodeInputType = "box" | "underline" | "filled"

// 输入类型枚举
export type CodeInputMode = "number" | "text"

const defaultProps = buildDefaultProps("codeInput", {
  modelValue: "",
  length: 6,
  autofocus: false,
  type: "box",
  mask: false,
  inputType: "number",
  disabled: false,
  readonly: false,
  error: false,
  errorColor: "",
  adjustPosition: true,
  gap: "20rpx",
  codeWidth: "80rpx",
  codeHeight: "80rpx",
  codeColor: "",
  codeActiveColor: "",
  codeBackground: "",
  codeActiveBackground: "",
  codeRadius: "",
  codeBorderWidth: "",
  textSize: "40rpx",
  textColor: "",
  textWeight: "",
  showCursor: true,
  cursorWidth: "2rpx",
  cursorHeight: "40rpx",
  cursorColor: "",
  dotSize: "20rpx",
  dotColor: "",
  customClass: "",
  customStyle: "",
})

export const codeInputProps = {
  // ===== 基础配置 =====
  /** 输入值 */
  modelValue: defaultProps("modelValue", { type: String }),
  /** 验证码长度 */
  length: defaultProps("length", { type: Number }),
  /** 自动聚焦 */
  autofocus: defaultProps("autofocus", { type: Boolean }),

  // ===== 模式配置 =====
  /** 样式类型 */
  type: defaultProps("type", { type: String as PropType<CodeInputType> }),
  /** 密码模式（显示圆点） */
  mask: defaultProps("mask", { type: Boolean }),
  /** 输入类型 */
  inputType: defaultProps("inputType", { type: String as PropType<CodeInputMode> }),

  // ===== 状态配置 =====
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 是否错误状态 */
  error: defaultProps("error", { type: Boolean }),
  /** 错误状态边框颜色 */
  errorColor: defaultProps("errorColor", { type: String }),
  /** 键盘弹起时是否自动上推页面 */
  adjustPosition: defaultProps("adjustPosition", { type: Boolean }),

  // ===== 根节点样式 =====
  /** 格子间距 */
  gap: defaultProps("gap", { type: [Number, String] }),

  // ===== Code 部件 =====
  /** 格子宽度 */
  codeWidth: defaultProps("codeWidth", { type: [Number, String] }),
  /** 格子高度 */
  codeHeight: defaultProps("codeHeight", { type: [Number, String] }),
  /** 边框/下划线颜色 */
  codeColor: defaultProps("codeColor", { type: String }),
  /** 聚焦时的边框/下划线颜色 */
  codeActiveColor: defaultProps("codeActiveColor", { type: String }),
  /** 背景色 */
  codeBackground: defaultProps("codeBackground", { type: String }),
  /** 聚焦时的背景色 */
  codeActiveBackground: defaultProps("codeActiveBackground", { type: String }),
  /** 圆角 */
  codeRadius: defaultProps("codeRadius", { type: [Number, String] }),
  /** 边框宽度 */
  codeBorderWidth: defaultProps("codeBorderWidth", { type: [Number, String] }),

  // ===== Text 部件 =====
  /** 文本字号 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 文本颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 文本粗细 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),

  // ===== Cursor 部件 =====
  /** 是否显示光标 */
  showCursor: defaultProps("showCursor", { type: Boolean }),
  /** 光标宽度 */
  cursorWidth: defaultProps("cursorWidth", { type: [Number, String] }),
  /** 光标高度 */
  cursorHeight: defaultProps("cursorHeight", { type: [Number, String] }),
  /** 光标颜色 */
  cursorColor: defaultProps("cursorColor", { type: String }),

  // ===== Dot 部件（密码模式）=====
  /** 圆点尺寸 */
  dotSize: defaultProps("dotSize", { type: [Number, String] }),
  /** 圆点颜色 */
  dotColor: defaultProps("dotColor", { type: String }),

  // ===== 通用 =====
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const codeInputEmits = {
  /** 点击事件 */
  click: () => true,
  /** 聚焦事件 */
  focus: () => true,
  /** 失焦事件 */
  blur: () => true,
  /** 输入完成事件 */
  complete: (_value: string) => true,
  /** 值变化事件 */
  change: (_value: string) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (_value: string) => true,
}

export type CodeInputEmits = typeof codeInputEmits
export type CodeInputProps = ExtractPropTypes<typeof codeInputProps>
export type CodeInputInstance = InstanceType<typeof CodeInput>
