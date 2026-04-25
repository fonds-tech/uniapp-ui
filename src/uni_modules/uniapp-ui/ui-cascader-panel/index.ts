import type CascaderPanel from "./ui-cascader-panel.vue"
import type { Interceptor } from "../utils/interceptor"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export interface CascaderPanelTab {
  options: CascaderPanelOption[]
  selected: CascaderPanelOption | null
}

export interface CascaderPanelOption {
  /** 支持自定义字段名 */
  [key: string]: unknown
  text?: string
  value?: string | number
  color?: string
  children?: CascaderPanelOption[]
  disabled?: boolean
  customClass?: string
  customStyle?: string | Record<string, string>
}

export interface CascaderPanelFieldKeys {
  text?: string
  value?: string
  children?: string
  disabled?: string
}

export interface CascaderPanelChangeData {
  value: string | number
  text: string
  selectedOptions: CascaderPanelOption[]
  index: number
}

const defaultProps = buildDefaultProps("cascader-panel", {
  modelValue: undefined,
  title: undefined,
  options: () => [],
  placeholder: "请选择",
  color: "#323233",
  activeColor: undefined,
  swipeable: true,
  closeable: false,
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

export const cascaderPanelProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 顶部标题 */
  title: defaultProps("title", { type: String }),
  /** 可选项数据源 */
  options: defaultProps("options", { type: Array as PropType<CascaderPanelOption[]> }),
  /** 未选中时的提示文案 */
  placeholder: defaultProps("placeholder", { type: String }),
  /** 选项文字颜色 */
  color: defaultProps("color", { type: String }),
  /** 选中选项文字颜色 */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 是否开启手势左右滑动切换 */
  swipeable: defaultProps("swipeable", { type: Boolean }),
  /** 是否显示关闭图标（外层 popup 使用） */
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
  fieldKeys: defaultProps("fieldKeys", { type: Object as PropType<CascaderPanelFieldKeys> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const cascaderPanelEmits = {
  /** 选项变化事件 */
  change: (data: CascaderPanelChangeData) => true,
  /** 选择完成事件（叶子节点选中） */
  finish: (data: CascaderPanelChangeData) => true,
  /** 点击标签页事件 */
  clickTab: (data: { index: number }) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (value: string | number) => true,
  /** 点击关闭按钮时触发 */
  close: () => true,
}

export type CascaderPanelEmits = typeof cascaderPanelEmits
export type CascaderPanelProps = ExtractPropTypes<typeof cascaderPanelProps>
export type CascaderPanelInstance = InstanceType<typeof CascaderPanel>
