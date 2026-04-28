import type ColorPicker from "./ui-color-picker.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("color-picker", {
  modelValue: undefined,
  show: false,
  title: undefined,
  showInput: true,
  showPresets: true,
  showPreview: true,
  columns: 10,
  presetColors: undefined,
  panelHeight: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const colorPickerProps = {
  /** 当前颜色值（HEX） */
  modelValue: defaultProps("modelValue", { type: String }),
  /** 是否显示弹窗 */
  show: defaultProps("show", { type: Boolean }),
  /** 弹窗标题 */
  title: defaultProps("title", { type: String }),
  /** 是否显示输入区 */
  showInput: defaultProps("showInput", { type: Boolean }),
  /** 是否显示预设色板 */
  showPresets: defaultProps("showPresets", { type: Boolean }),
  /** 是否显示当前色预览块 */
  showPreview: defaultProps("showPreview", { type: Boolean }),
  /** 预设色板每行列数 */
  columns: defaultProps("columns", { type: [Number, String] }),
  /** 预设颜色列表 */
  presetColors: defaultProps("presetColors", { type: Array as PropType<string[]> }),
  /** 饱和度面板高度 */
  panelHeight: defaultProps("panelHeight", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const colorPickerEmits = {
  /** 更新绑定值 */
  "update:modelValue": (value: string) => typeof value === "string",
  /** 更新显示状态 */
  "update:show": (value: boolean) => typeof value === "boolean",
  /** 值变化 */
  change: (value: string) => typeof value === "string",
  /** 确认 */
  confirm: (value: string) => typeof value === "string",
  /** 取消 */
  cancel: () => true,
  /** 关闭 */
  close: () => true,
}

export type ColorPickerEmits = typeof colorPickerEmits
export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerInstance = InstanceType<typeof ColorPicker>
