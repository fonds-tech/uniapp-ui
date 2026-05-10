import type Segmented from "./ui-segmented.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 样式类型 */
export type SegmentedType = "filled" | "outline" | "block"

/** 选项 */
export interface SegmentedOption {
  label: string
  value: string | number
  icon?: string
  disabled?: boolean
}

/** 选中值类型 */
export type SegmentedValue = string | number

const defaultProps = buildDefaultProps("segmented", {
  modelValue: undefined,
  options: () => [] as SegmentedOption[],
  disabled: false,
  type: "filled" as SegmentedType,
  block: false,
  round: true,
  radius: undefined,
  scrollable: false,
  height: "56rpx",
  fontSize: "28rpx",
  itemPadding: "24rpx",
  indicatorGap: "4rpx",
  activeColor: undefined,
  activeTextColor: undefined,
  inactiveColor: undefined,
  inactiveTextColor: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const segmentedProps = {
  /** 当前选中值 */
  modelValue: defaultProps("modelValue", { type: [String, Number] }),
  /** 选项列表 */
  options: defaultProps("options", { type: Array as PropType<SegmentedOption[]> }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 样式类型 */
  type: defaultProps("type", { type: String as PropType<SegmentedType> }),
  /** 是否撑满父容器 */
  block: defaultProps("block", { type: Boolean }),
  /** 是否使用圆角（胶囊样式） */
  round: defaultProps("round", { type: Boolean }),
  /** 自定义圆角大小 */
  radius: defaultProps("radius", { type: [String, Number] }),
  /** 选项过多时是否支持横向滚动 */
  scrollable: defaultProps("scrollable", { type: Boolean }),
  /** 选项高度 */
  height: defaultProps("height", { type: [String, Number] }),
  /** 字体大小 */
  fontSize: defaultProps("fontSize", { type: [String, Number] }),
  /** 选项左右内边距 */
  itemPadding: defaultProps("itemPadding", { type: [String, Number] }),
  /** 滑块与容器边缘的间距 */
  indicatorGap: defaultProps("indicatorGap", { type: [String, Number] }),
  /** 激活项背景色（覆盖 indicator 默认色） */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 激活项文字颜色 */
  activeTextColor: defaultProps("activeTextColor", { type: String }),
  /** 未激活项背景色 */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /** 未激活项文字颜色 */
  inactiveTextColor: defaultProps("inactiveTextColor", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

const isVal = (v: unknown) => typeof v === "string" || typeof v === "number"

export const segmentedEmits = {
  /** 更新绑定值 */
  "update:modelValue": (value: SegmentedValue) => isVal(value),
  /** 值变化事件 */
  change: (value: SegmentedValue) => isVal(value),
  /** 点击选项事件 (含禁用项) */
  click: (option: SegmentedOption, index: number) => !!option && typeof index === "number",
}

export type SegmentedEmits = typeof segmentedEmits
export type SegmentedProps = ExtractPropTypes<typeof segmentedProps>
export type SegmentedInstance = InstanceType<typeof Segmented>
