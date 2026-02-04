import type Cascader from "./ui-cascader.vue"
import type { Interceptor } from "../utils/interceptor"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** Popup 模式类型 */
export type PopupMode = "top" | "bottom" | "left" | "right" | "center"

const defaultProps = buildDefaultProps("cascader", {
  show: false,
  mode: "bottom",
  borderRadius: undefined,
  closeOnClickOverlay: true,
  overlay: true,
  duration: 300,
  zIndex: undefined,
  background: undefined,
  safeAreaInsetBottom: true,
  lazyRender: true,
  modelValue: undefined,
  title: undefined,
  options: () => [],
  placeholder: "请选择",
  color: "#323233",
  activeColor: undefined,
  swipeable: true,
  closeable: true,
  showHeader: true,
  titleSize: undefined,
  titleColor: undefined,
  titleWeight: undefined,
  closeIcon: "cross",
  closeIconSize: "32rpx",
  closeIconColor: "#333333",
  closeIconWeight: undefined,
  beforeChange: undefined,
  fieldKeys: () => ({}),
  customClass: undefined,
  customStyle: undefined,
})

export const cascaderProps = {
  /** 是否显示弹窗 */
  show: defaultProps("show", { type: Boolean }),
  /** 弹窗位置 */
  mode: defaultProps("mode", { type: String as PropType<PopupMode> }),
  /** 圆角大小 */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /** 点击遮罩是否关闭 */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /** 是否显示遮罩 */
  overlay: defaultProps("overlay", { type: Boolean }),
  /** 动画时长 */
  duration: defaultProps("duration", { type: Number }),
  /** 弹窗层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 底部安全区 */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /** 是否在显示时才渲染 */
  lazyRender: defaultProps("lazyRender", { type: Boolean }),
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 顶部标题 */
  title: defaultProps("title", { type: String }),
  /** 可选项数据源 */
  options: defaultProps("options", { type: Array as PropType<CascaderOption[]> }),
  /** 未选中时的提示文案 */
  placeholder: defaultProps("placeholder", { type: String }),
  /** 选项文字颜色 */
  color: defaultProps("color", { type: String }),
  /** 选中选项文字颜色 */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 是否开启手势左右滑动切换 */
  swipeable: defaultProps("swipeable", { type: Boolean }),
  /** 是否显示关闭图标 */
  closeable: defaultProps("closeable", { type: Boolean }),
  /** 是否展示头部栏 */
  showHeader: defaultProps("showHeader", { type: Boolean }),
  /** 标题大小 */
  titleSize: defaultProps("titleSize", { type: [Number, String] }),
  /** 标题颜色 */
  titleColor: defaultProps("titleColor", { type: String }),
  /** 标题字重 */
  titleWeight: defaultProps("titleWeight", { type: [Number, String] }),
  /** 关闭图标名称或图片链接 */
  closeIcon: defaultProps("closeIcon", { type: String }),
  /** 关闭图标大小 */
  closeIconSize: defaultProps("closeIconSize", { type: [Number, String] }),
  /** 关闭图标颜色 */
  closeIconColor: defaultProps("closeIconColor", { type: String }),
  /** 关闭图标粗细 */
  closeIconWeight: defaultProps("closeIconWeight", { type: [Number, String] }),
  /** 输入值变化前的回调函数，返回 false 可阻止输入 */
  beforeChange: defaultProps("beforeChange", { type: Function as PropType<Interceptor> }),
  /** 数据字段 */
  fieldKeys: defaultProps("fieldKeys", { type: Object as PropType<CascaderFieldKeys> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const cascaderEmits = {
  /** 关闭事件 */
  close: () => true,
  /** 选项变化事件 */
  change: (data: { value: string | number; text: string; selectedOptions: CascaderOption[]; index: number }) => true,
  /** 选择完成事件 */
  finish: (data: { value: string | number; text: string; selectedOptions: CascaderOption[]; index: number }) => true,
  /** 点击标签页事件 */
  clickTab: (data: { index: number }) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (value: string | number) => true,
  /** 更新显示状态事件 */
  "update:show": (show: boolean) => typeof show === "boolean",
}

export interface CascaderTab {
  options: CascaderOption[]
  selected: CascaderOption | null
}

export interface CascaderOption {
  /** 支持自定义字段名 */
  [key: string]: unknown
  text?: string
  value?: string | number
  color?: string
  children?: CascaderOption[]
  disabled?: boolean
  customClass?: string
  customStyle?: string | Record<string, string>
}

export interface CascaderFieldKeys {
  text?: string
  value?: string
  children?: string
  disabled?: string
}

export type CascaderNameType = string | number
export type CascaderEmits = typeof cascaderEmits
export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
export type CascaderInstance = InstanceType<typeof Cascader>
