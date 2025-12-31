import type Cell from "./ui-cell.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { truthProp, buildProps, numericProp, makeStringProp } from "../utils/props"

export const cellProps = buildProps("cell", {
  /**
   * 图标
   */
  icon: String,
  /**
   * 标题
   */
  title: String,
  /**
   * 描述
   */
  label: String,
  /**
   * 内容
   */
  value: String,
  /**
   * 高度
   */
  height: numericProp,
  /**
   * 内边距
   */
  padding: numericProp,
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 图标和右侧内容间隔
   */
  iconGap: String,
  /**
   * 图标大小
   */
  iconSize: numericProp,
  /**
   * 图标颜色
   */
  iconColor: String,
  /**
   * 图标粗细
   */
  iconWeight: numericProp,
  /**
   * 标题大小
   */
  titleSize: numericProp,
  /**
   * 标题颜色
   */
  titleColor: String,
  /**
   * 标题粗细
   */
  titleWeight: numericProp,
  /**
   * 描述信息顶部间隔
   */
  labelGap: numericProp,
  /**
   * 描述信息大小
   */
  labelSize: numericProp,
  /**
   * 描述信息颜色
   */
  labelColor: String,
  /**
   * 描述信息粗细
   */
  labelWeight: numericProp,
  /**
   * 内容大小
   */
  valueSize: numericProp,
  /**
   * 内容颜色
   */
  valueColor: String,
  /**
   * 内容粗细
   */
  valueWeight: numericProp,
  /**
   * 右侧图标
   */
  rightIcon: makeStringProp("arrow"),
  /**
   * 右侧图标距离左边间隔
   */
  rightIconGap: String,
  /**
   * 右侧图标大小
   */
  rightIconSize: numericProp,
  /**
   * 右侧图标颜色
   */
  rightIconColor: String,
  /**
   * 右侧图标粗细
   */
  rightIconWeight: numericProp,
  /**
   * 跳转链接
   */
  url: String,
  /**
   * 跳转类型
   */
  linkType: String,
  /**
   * 是否显示边框
   */
  border: truthProp,
  /**
   * 边框颜色
   */
  borderColor: String,
  /**
   * 边框左侧位置
   */
  borderLeft: numericProp,
  /**
   * 边框右侧位置
   */
  borderRight: numericProp,
  /**
   * 边框宽度
   */
  borderWidth: numericProp,
  /**
   * 是否可点击的
   */
  clickable: truthProp,
  /**
   * 是否为链接
   */
  isLink: Boolean,
  /**
   * 是否居中对齐
   */
  center: Boolean,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})
export const cellEmits = {
  click: () => true,
}

export type CellEmits = typeof cellEmits
export type CellProps = ExtractPropTypes<typeof cellProps>
export type CellInstance = InstanceType<typeof Cell>
