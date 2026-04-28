import type ColorPanel from "./ui-color-panel.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 默认预设色 */
export const DEFAULT_PRESET_COLORS = [
  "#F44336",
  "#E91E63",
  "#FF5722",
  "#FF9800",
  "#FFC107",
  "#FFEB3B",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#607D8B",
  "#795548",
  "#9E9E9E",
  "#000000",
  "#FFFFFF",
]

const defaultProps = buildDefaultProps("color-panel", {
  modelValue: undefined,
  presetColors: DEFAULT_PRESET_COLORS,
  showInput: true,
  showPresets: true,
  showPreview: true,
  columns: 10,
  panelHeight: undefined,
  disabled: false,
  readonly: false,
  customClass: undefined,
  customStyle: undefined,
})

export const colorPanelProps = {
  /** 当前颜色值（HEX，#RRGGBB） */
  modelValue: defaultProps("modelValue", { type: String }),
  /** 预设色列表 */
  presetColors: defaultProps("presetColors", { type: Array as PropType<string[]> }),
  /** 是否显示 HEX/RGB 输入区 */
  showInput: defaultProps("showInput", { type: Boolean }),
  /** 是否显示预设色板 */
  showPresets: defaultProps("showPresets", { type: Boolean }),
  /** 是否显示当前色预览块 */
  showPreview: defaultProps("showPreview", { type: Boolean }),
  /** 预设色板每行列数 */
  columns: defaultProps("columns", { type: [Number, String] }),
  /** 饱和度面板高度 */
  panelHeight: defaultProps("panelHeight", { type: [Number, String] }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const colorPanelEmits = {
  /** 更新绑定值 */
  "update:modelValue": (value: string) => typeof value === "string",
  /** 值变化 */
  change: (value: string) => typeof value === "string",
}

export type ColorPanelEmits = typeof colorPanelEmits
export type ColorPanelProps = ExtractPropTypes<typeof colorPanelProps>
export type ColorPanelInstance = InstanceType<typeof ColorPanel>
