import type TreeSelect from "./ui-tree-select.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export interface TreeSelectChild {
  /** 唯一标识 */
  id: number | string
  /** 文本 */
  text: string
  /** 禁用 */
  disabled?: boolean
}

export interface TreeSelectItem {
  /** 分类文本 */
  text: string
  /** 分类禁用 */
  disabled?: boolean
  /** 子项列表 */
  children: TreeSelectChild[]
}

/** activeId 类型（单值 = 单选，数组 = 多选） */
export type ActiveIdType = number | string | (number | string)[]

const defaultProps = buildDefaultProps("treeSelect", {
  items: () => [],
  mainActiveIndex: 0,
  activeId: undefined,
  max: 0,
  height: "600rpx",
  selectedIcon: "check",
  navWidth: undefined,
  navBg: undefined,
  activeColor: undefined,
  indicatorWidth: undefined,
  indicatorHeight: undefined,
  itemFontSize: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const treeSelectProps = {
  /** 分类数据 */
  items: defaultProps("items", { type: Array as PropType<TreeSelectItem[]> }),
  /** 左侧分类索引（v-model:mainActiveIndex） */
  mainActiveIndex: defaultProps("mainActiveIndex", { type: [Number, String] }),
  /** 选中项 id（v-model:activeId；数组开启多选） */
  activeId: defaultProps("activeId", { type: [Number, String, Array] as PropType<ActiveIdType> }),
  /** 多选最多个数；`0` 表示无上限 */
  max: defaultProps("max", { type: [Number, String] }),
  /** 组件高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 选中图标 */
  selectedIcon: defaultProps("selectedIcon", { type: String }),
  /** 左侧 nav 宽度 */
  navWidth: defaultProps("navWidth", { type: [Number, String] }),
  /** 左侧 nav 背景色 */
  navBg: defaultProps("navBg", { type: String }),
  /** 选中态主色（影响指示条、选中图标、选中文字） */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 激活指示条宽度 */
  indicatorWidth: defaultProps("indicatorWidth", { type: [Number, String] }),
  /** 激活指示条高度 */
  indicatorHeight: defaultProps("indicatorHeight", { type: [Number, String] }),
  /** 子项字号 */
  itemFontSize: defaultProps("itemFontSize", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const treeSelectEmits = {
  "update:mainActiveIndex": (_index: number | string) => true,
  "update:activeId": (_id: ActiveIdType) => true,
  clickNav: (_index: number) => true,
  clickItem: (_item: TreeSelectChild) => true,
  /** 多选达上限再点击触发 */
  maxReached: (_max: number) => true,
}

export type TreeSelectEmits = typeof treeSelectEmits
export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
export type TreeSelectInstance = InstanceType<typeof TreeSelect>
