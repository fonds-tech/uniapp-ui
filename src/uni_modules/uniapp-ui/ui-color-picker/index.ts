import type ColorPicker from "./ui-color-picker.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"

import { buildDefaultProps } from "../utils/props"

// 颜色选择器尺寸
export type ColorPickerSize = "small" | "medium" | "large"

// 颜色格式
export type ColorFormat = "hex" | "rgb" | "hsl"

const defaultProps = buildDefaultProps("colorPicker", {
  modelValue: "",
  show: false,
  title: "",
  size: "medium",
  showAlpha: false,
  showInput: true,
  showPresets: true,
  columns: 10,
  presetColors: [],
  format: "hex",
  customClass: "",
  customStyle: "",
})

export const colorPickerProps = {
  // ===== 基础配置 =====
  /** 当前颜色值 */
  modelValue: defaultProps("modelValue", { type: String }),
  /** 是否显示弹窗 */
  show: defaultProps("show", { type: Boolean }),
  /** 弹窗标题 */
  title: defaultProps("title", { type: String }),
  /** 尺寸预设 */
  size: defaultProps("size", { type: String as PropType<ColorPickerSize> }),

  // ===== 功能配置 =====
  /** 是否支持透明度 */
  showAlpha: defaultProps("showAlpha", { type: Boolean }),
  /** 是否显示输入框 */
  showInput: defaultProps("showInput", { type: Boolean }),
  /** 是否显示预设色板 */
  showPresets: defaultProps("showPresets", { type: Boolean }),
  /** 预设色板每行列数 */
  columns: defaultProps("columns", { type: Number }),
  /** 预设颜色列表 */
  presetColors: defaultProps("presetColors", { type: Array as PropType<string[]> }),
  /** 输出颜色格式 */
  format: defaultProps("format", { type: String as PropType<ColorFormat> }),

  // ===== 通用 =====
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const colorPickerEmits = {
  /** 更新绑定值 */
  "update:modelValue": (_value: string) => true,
  /** 更新显示状态 */
  "update:show": (_value: boolean) => true,
  /** 值变化事件 */
  change: (_value: string) => true,
  /** 确认事件 */
  confirm: (_value: string) => true,
  /** 取消事件 */
  cancel: () => true,
  /** 关闭事件 */
  close: () => true,
}

export type ColorPickerEmits = typeof colorPickerEmits
export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerInstance = InstanceType<typeof ColorPicker>
