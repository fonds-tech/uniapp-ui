import type CodeInput from "./ui-code-input.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 样式类型 */
export type CodeInputType = "box" | "underline" | "filled"

/** 输入数据类型（影响过滤规则） */
export type CodeInputMode = "number" | "text"

/** HTML inputmode 取值，控制 H5 移动端软键盘类型 */
export type CodeInputInputmode = "text" | "numeric" | "decimal" | "tel" | "email" | "url" | "search" | "none"

const defaultProps = buildDefaultProps("code-input", {
  modelValue: "",
  length: 6,
  autofocus: false,
  type: "box" as CodeInputType,
  mask: false,
  inputType: "number" as CodeInputMode,
  inputmode: undefined,
  disabled: false,
  readonly: false,
  error: false,
  errorColor: undefined,
  adjustPosition: true,
  gap: undefined,
  codeWidth: undefined,
  codeHeight: undefined,
  codeColor: undefined,
  codeActiveColor: undefined,
  codeBackground: undefined,
  codeActiveBackground: undefined,
  codeRadius: undefined,
  codeBorderWidth: undefined,
  textSize: undefined,
  textColor: undefined,
  textWeight: undefined,
  showCursor: true,
  cursorWidth: undefined,
  cursorHeight: undefined,
  cursorColor: undefined,
  dotSize: undefined,
  dotColor: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const codeInputProps = {
  /** 输入值 */
  modelValue: defaultProps("modelValue", { type: String }),
  /** 验证码长度 */
  length: defaultProps("length", { type: Number }),
  /** 自动聚焦 */
  autofocus: defaultProps("autofocus", { type: Boolean }),
  /** 样式类型 */
  type: defaultProps("type", { type: String as PropType<CodeInputType> }),
  /** 密码模式（显示圆点替代字符） */
  mask: defaultProps("mask", { type: Boolean }),
  /** 输入数据类型：number 仅数字 / text 任意 */
  inputType: defaultProps("inputType", { type: String as PropType<CodeInputMode> }),
  /** H5 移动端软键盘类型；不传时按 inputType 推（number→numeric，text→text） */
  inputmode: defaultProps("inputmode", { type: String as PropType<CodeInputInputmode> }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 是否错误状态 */
  error: defaultProps("error", { type: Boolean }),
  /** 错误状态色（覆盖默认 danger） */
  errorColor: defaultProps("errorColor", { type: String }),
  /** 键盘弹起时是否自动上推页面 */
  adjustPosition: defaultProps("adjustPosition", { type: Boolean }),
  /** 格子间距 */
  gap: defaultProps("gap", { type: [Number, String] }),
  /** 格子宽度 */
  codeWidth: defaultProps("codeWidth", { type: [Number, String] }),
  /** 格子高度 */
  codeHeight: defaultProps("codeHeight", { type: [Number, String] }),
  /** 边框 / 下划线颜色 */
  codeColor: defaultProps("codeColor", { type: String }),
  /** 聚焦时的边框 / 下划线颜色 */
  codeActiveColor: defaultProps("codeActiveColor", { type: String }),
  /** 背景色 */
  codeBackground: defaultProps("codeBackground", { type: String }),
  /** 聚焦时的背景色（filled 类型主用） */
  codeActiveBackground: defaultProps("codeActiveBackground", { type: String }),
  /** 圆角 */
  codeRadius: defaultProps("codeRadius", { type: [Number, String] }),
  /** 边框宽度 */
  codeBorderWidth: defaultProps("codeBorderWidth", { type: [Number, String] }),
  /** 文本字号 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 文本颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 文本字重 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /** 是否显示光标 */
  showCursor: defaultProps("showCursor", { type: Boolean }),
  /** 光标宽度 */
  cursorWidth: defaultProps("cursorWidth", { type: [Number, String] }),
  /** 光标高度，未传时跟随 textSize */
  cursorHeight: defaultProps("cursorHeight", { type: [Number, String] }),
  /** 光标颜色 */
  cursorColor: defaultProps("cursorColor", { type: String }),
  /** 圆点尺寸（密码模式），未传时按 codeWidth 比例自适应 */
  dotSize: defaultProps("dotSize", { type: [Number, String] }),
  /** 圆点颜色 */
  dotColor: defaultProps("dotColor", { type: String }),
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
  complete: (value: string) => typeof value === "string",
  /** 值变化事件 */
  change: (value: string) => typeof value === "string",
  /** 更新绑定值事件 */
  "update:modelValue": (value: string) => typeof value === "string",
}

export type CodeInputEmits = typeof codeInputEmits
export type CodeInputProps = ExtractPropTypes<typeof codeInputProps>
export type CodeInputInstance = InstanceType<typeof CodeInput>
