import type ColorPicker from "./ui-color-picker.vue"
import type { PopupMode } from "../ui-popup"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("color-picker", {
  modelValue: undefined,
  show: false,
  title: "选择颜色",
  cancelText: "取消",
  confirmText: "确定",
  showHeader: true,
  showInput: true,
  showPresets: true,
  showPreview: true,
  columns: 10,
  presetColors: undefined,
  panelHeight: undefined,
  disabled: false,
  readonly: false,
  // popup 透传
  mode: "bottom" as PopupMode,
  borderRadius: "16rpx",
  safeAreaInsetBottom: true,
  closeOnClickOverlay: true,
  overlay: true,
  zIndex: undefined,
  duration: 300,
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
  /** 取消按钮文案 */
  cancelText: defaultProps("cancelText", { type: String }),
  /** 确认按钮文案 */
  confirmText: defaultProps("confirmText", { type: String }),
  /** 是否显示头部 */
  showHeader: defaultProps("showHeader", { type: Boolean }),
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
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 弹窗位置 */
  mode: defaultProps("mode", { type: String as PropType<PopupMode> }),
  /** 弹窗圆角 */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /** 是否开启底部安全距离 */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /** 点击遮罩是否关闭 */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /** 是否显示遮罩层 */
  overlay: defaultProps("overlay", { type: Boolean }),
  /** 弹窗 z-index */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 弹窗动画时长（ms） */
  duration: defaultProps("duration", { type: Number }),
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
