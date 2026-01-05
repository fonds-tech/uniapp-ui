import type CollapseItem from "./ui-collapse-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeStringProp } from "../utils/props"

/**
 * 折叠面板项 Props 定义
 */
export const [collapseItemProps, useCollapseItemProps] = createProps("collapseItem", {
  /**
   * 唯一标识符，默认为索引值
   */
  name: numericProp,
  /**
   * 标题
   */
  title: makeStringProp(""),
  /**
   * 左侧图标名称
   */
  icon: makeStringProp(""),
  /**
   * 图标大小
   */
  iconSize: numericProp,
  /**
   * 图标颜色
   */
  iconColor: makeStringProp(""),
  /**
   * 图标粗细
   */
  iconWeight: numericProp,
  /**
   * 右侧箭头图标方向，可选值为 up、down、left、right
   */
  arrowIcon: makeStringProp("arrow"),
  /**
   * 是否显示右侧箭头
   */
  isLink: truthProp,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否显示边框
   */
  border: truthProp,
  /**
   * 是否只读
   */
  readonly: Boolean,
  /**
   * 标题右侧内容
   */
  value: makeStringProp(""),
  /**
   * 标题下方的描述信息
   */
  label: makeStringProp(""),
  /**
   * 内容区域的内边距
   */
  contentPadding: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: "",
  },
})

/**
 * 折叠面板项事件定义
 */
export const collapseItemEmits = {
  /**
   * 点击标题时触发
   */
  click: () => true,
  /**
   * 展开或收起时触发
   */
  change: (expanded: boolean) => true,
}

/**
 * 折叠面板项暴露的方法和属性
 */
export interface CollapseItemExpose {
  /** 组件名称 */
  componentName: "ui-collapse-item"
  /** 面板名称标识 */
  name: string | number
  /** 合并全局配置后的 props */
  useProps: CollapseItemProps
  /** 是否展开 */
  expanded: boolean
  /** 切换展开状态 */
  toggle: (expanded?: boolean) => void
}

export type CollapseItemEmits = typeof collapseItemEmits
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
export type CollapseItemInstance = InstanceType<typeof CollapseItem>
