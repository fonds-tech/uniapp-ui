import type ColorPanel from "./ui-color-panel.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"

import { buildDefaultProps } from "../utils/props"

// 颜色面板尺寸
export type ColorPanelSize = "small" | "medium" | "large"

// 颜色格式
export type ColorFormat = "hex" | "rgb" | "hsl"

// 默认预设颜色
export const DEFAULT_PRESET_COLORS = [
  // 红色系
  "#F44336",
  "#E91E63",
  "#FF5722",
  // 橙黄系
  "#FF9800",
  "#FFC107",
  "#FFEB3B",
  // 绿色系
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  // 蓝色系
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  // 紫色系
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  // 中性色
  "#607D8B",
  "#795548",
  "#9E9E9E",
  // 黑白
  "#000000",
  "#FFFFFF",
]

const defaultProps = buildDefaultProps("colorPanel", {
  modelValue: "",
  size: "medium",
  presetColors: DEFAULT_PRESET_COLORS,
  showAlpha: false,
  showInput: true,
  showPresets: true,
  columns: 10,
  panelHeight: "",
  disabled: false,
  readonly: false,
  format: "hex",
  customClass: "",
  customStyle: "",
})

export const colorPanelProps = {
  // ===== 基础配置 =====
  /** 当前颜色值 */
  modelValue: defaultProps("modelValue", { type: String }),
  /** 尺寸预设 */
  size: defaultProps("size", { type: String as PropType<ColorPanelSize> }),
  /** 预设颜色列表 */
  presetColors: defaultProps("presetColors", { type: Array as PropType<string[]> }),

  // ===== 功能配置 =====
  /** 是否支持透明度 */
  showAlpha: defaultProps("showAlpha", { type: Boolean }),
  /** 是否显示输入框 */
  showInput: defaultProps("showInput", { type: Boolean }),
  /** 是否显示预设色板 */
  showPresets: defaultProps("showPresets", { type: Boolean }),
  /** 预设色板每行列数 */
  columns: defaultProps("columns", { type: Number }),
  /** 饱和度面板高度 */
  panelHeight: defaultProps("panelHeight", { type: [Number, String] }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 输出颜色格式 */
  format: defaultProps("format", { type: String as PropType<ColorFormat> }),

  // ===== 通用 =====
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const colorPanelEmits = {
  /** 更新绑定值 */
  "update:modelValue": (_value: string) => true,
  /** 值变化事件 */
  change: (_value: string) => true,
}

export type ColorPanelEmits = typeof colorPanelEmits
export type ColorPanelProps = ExtractPropTypes<typeof colorPanelProps>
export type ColorPanelInstance = InstanceType<typeof ColorPanel>
