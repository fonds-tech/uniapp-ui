import type Cascader from "./ui-cascader.vue"
import type { Interceptor } from "../utils/interceptor"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [cascaderProps, useCascaderProps] = createProps("cascader", {
  /**
   * 绑定值
   */
  modelValue: numericProp,
  /**
   * 顶部标题
   */
  title: String,
  /**
   * 可选项数据源
   */
  options: { type: Array as PropType<CascaderOption[]>, default: () => [] },
  /**
   * 未选中时的提示文案
   */
  placeholder: makeStringProp("请选择"),
  /**
   * 选项文字颜色
   */
  color: makeStringProp("#323233"),
  /**
   * 选中选项文字颜色
   */
  activeColor: String,
  /**
   * 是否开启手势左右滑动切换
   */
  swipeable: truthProp,
  /**
   * 是否显示关闭图标
   */
  closeable: truthProp,
  /**
   * 是否展示头部栏
   */
  showHeader: truthProp,
  /**
   * 标题大小
   */
  titleSize: numericProp,
  /**
   * 标题大小
   */
  titleColor: numericProp,
  /**
   * 标题大小
   */
  titleWeight: numericProp,
  /**
   * 关闭图标名称或图片链接，等同于 Icon 组件的 name 属性
   */
  closeIcon: makeStringProp("cross"),
  /**
   * 关闭图标大小
   */
  closeIconSize: makeNumericProp("32rpx"),
  /**
   * 关闭图标颜色
   */
  closeIconColor: makeStringProp("#333333"),
  /**
   * 关闭图标粗细
   */
  closeIconWeight: numericProp,
  /**
   * 输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise
   */
  beforeChange: Function as PropType<Interceptor>,
  /**
   * 数据字段
   */
  fieldKeys: { type: Object as PropType<CascaderFieldKeys>, default: () => ({}) },
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})
export const cascaderEmits = {
  close: () => true,
  change: (data: { value: string | number; selectedOptions: CascaderOption[]; index: number }) => true,
  finish: (data: { value: string | number; selectedOptions: CascaderOption[]; index: number }) => true,
  clickTab: (data: { index: number }) => true,
  "update:modelValue": (value: string | number) => true,
}

export interface CascaderTab {
  options: CascaderOption[]
  selected: CascaderOption | null
}
export interface CascaderOption {
  text: string
  value: string | number
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
