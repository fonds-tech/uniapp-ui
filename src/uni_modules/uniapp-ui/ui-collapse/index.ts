import type Collapse from "./ui-collapse.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, makeStringProp } from "../utils/props"

/**
 * 折叠面板 Props 定义
 */
export const [collapseProps, useCollapseProps] = createProps("collapse", {
  /**
   * 当前展开的面板名称，多选模式下为数组，手风琴模式下为字符串或数字
   */
  modelValue: {
    type: [Array, String, Number] as PropType<(string | number)[] | string | number>,
    default: () => [],
  },
  /**
   * 是否开启手风琴模式，开启后同时只能展开一个面板
   */
  accordion: Boolean,
  /**
   * 是否显示边框
   */
  border: truthProp,
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
 * 折叠面板事件定义
 */
export const collapseEmits = {
  /**
   * 切换面板时触发
   */
  change: (activeNames: (string | number)[] | string | number) => true,
  /**
   * 双向绑定更新
   */
  "update:modelValue": (value: (string | number)[] | string | number) => true,
}

/**
 * 折叠面板提供给子组件的数据
 */
export interface CollapseProvide {
  /** 原始 props */
  props: CollapseProps
  /** 合并全局配置后的 props */
  useProps: CollapseProps
  /** 切换面板展开状态 */
  toggle: (name: string | number, expanded: boolean) => void
  /** 判断面板是否展开 */
  isExpanded: (name: string | number) => boolean
}

/**
 * 折叠面板 InjectionKey
 */
export const collapseKey: InjectionKey<CollapseProvide> = Symbol("ui-collapse")

/**
 * 折叠面板暴露的方法
 */
export interface CollapseExpose {
  /** 组件名称 */
  name: "ui-collapse"
  /** 切换所有面板的展开状态 */
  toggleAll: (expanded?: boolean) => void
}

export type CollapseEmits = typeof collapseEmits
export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseInstance = InstanceType<typeof Collapse>
