import type TreeSelect from "./ui-tree-select.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * 树形选择子项数据结构
 */
export interface TreeSelectChild {
  /** 子项唯一标识 */
  id: number | string
  /** 子项文本 */
  text: string
  /** 是否禁用 */
  disabled?: boolean
}

/**
 * 树形选择分类数据结构
 */
export interface TreeSelectItem {
  /** 分类文本 */
  text: string
  /** 是否禁用 */
  disabled?: boolean
  /** 分类下的子项列表 */
  children: TreeSelectChild[]
}

/** 选中项 ID 类型（单选为单值，多选为数组） */
export type ActiveIdType = number | string | (number | string)[]

const defaultProps = buildDefaultProps("tree-select", {
  items: () => [],
  mainActiveIndex: 0,
  activeId: undefined,
  max: Infinity,
  height: "600rpx",
  selectedIcon: "check",
  customClass: undefined,
  customStyle: undefined,
})

export const treeSelectProps = {
  /** 分类数据数组 */
  items: defaultProps("items", { type: Array as PropType<TreeSelectItem[]> }),
  /** 左侧选中项索引，支持 v-model:mainActiveIndex */
  mainActiveIndex: defaultProps("mainActiveIndex", { type: [Number, String] }),
  /** 右侧选中项 id，支持 v-model:activeId，可以是数组表示多选 */
  activeId: defaultProps("activeId", { type: [Number, String, Array] as PropType<ActiveIdType> }),
  /** 右侧最多选中个数 */
  max: defaultProps("max", { type: [Number, String] }),
  /** 组件高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 选中图标 */
  selectedIcon: defaultProps("selectedIcon", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const treeSelectEmits = {
  /** 左侧导航索引变化事件 */
  "update:mainActiveIndex": (index: number | string) => true,
  /** 右侧选中项变化事件 */
  "update:activeId": (id: ActiveIdType) => true,
  /** 点击左侧导航事件 */
  clickNav: (index: number) => true,
  /** 点击右侧选项事件 */
  clickItem: (item: TreeSelectChild) => true,
}

export type TreeSelectEmits = typeof treeSelectEmits
export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
export type TreeSelectInstance = InstanceType<typeof TreeSelect>
