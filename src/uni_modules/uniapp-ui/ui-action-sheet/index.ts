import type ActionSheet from "./ui-action-sheet.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { styleProp, truthProp, numericProp, makeArrayProp, makeStringProp, makeNumericProp } from "../utils/props"

export const actionSheetProps = {
  /**
   * 是否显示
   */
  show: Boolean,
  /**
   * 操作项列表
   */
  actions: makeArrayProp<ActionSheetAction>(),
  /**
   * 操作面板的高度
   */
  height: numericProp,
  /**
   * 操作面板的最大高度
   */
  maxHeight: numericProp,
  /**
   * 标题文本
   */
  title: makeStringProp(""),
  /**
   * 标题文本大小
   */
  titleSize: numericProp,
  /**
   * 标题文本颜色
   */
  titleColor: makeStringProp(""),
  /**
   * 标题文本粗细
   */
  titleWeight: numericProp,
  /**
   * 描述文本
   */
  description: makeStringProp(""),
  /**
   * 描述文本大小
   */
  descriptionSize: numericProp,
  /**
   * 描述文本颜色
   */
  descriptionColor: makeStringProp(""),
  /**
   * 描述文本粗细
   */
  descriptionWeight: numericProp,
  /**
   * 是否显示取消按钮
   */
  showCancel: truthProp,
  /**
   * 取消按钮文本
   */
  cancelText: makeStringProp("取消"),
  /**
   * 取消按钮文本大小
   */
  cancelTextSize: numericProp,
  /**
   * 取消按钮文本颜色
   */
  cancelTextColor: makeStringProp(""),
  /**
   * 取消按钮文本粗细
   */
  cancelTextWeight: numericProp,
  /**
   * 取消按钮背景颜色
   */
  cancelBackground: makeStringProp(""),
  /**
   * 操作项标题的样式
   */
  actionTitleStyle: styleProp,
  /**
   * 操作项描述的样式
   */
  actionDescriptionStyle: styleProp,
  /**
   * 动画过渡的时间
   */
  duration: makeNumericProp(300),
  /**
   * 操作面板的圆角大小
   */
  borderRadius: numericProp,
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 是否显示遮罩层
   */
  overlay: truthProp,
  /**
   * 遮罩层样式
   */
  overlayStyle: styleProp,
  /**
   * 是否在显示时才渲染节点
   */
  lazyRender: truthProp,
  /**
   * 点击action项关闭前的回调函数
   */
  beforeClose: Function as PropType<(action: ActionSheetAction, index: number) => boolean | Promise<boolean>>,
  /**
   * 点击操作项后是否关闭操作面板
   */
  closeOnClickAction: truthProp,
  /**
   * 点击遮罩层后是否关闭操作面板
   */
  closeOnClickOverlay: truthProp,
  /**
   * 是否显示底部安全区域
   */
  safeAreaInsetBottom: truthProp,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export interface ActionSheetAction {
  /** 选项标题 */
  title: string
  /** 选项描述 */
  description?: string
  /** 选项图标 */
  icon?: string
  /** 选项颜色 */
  color?: string
  /** 是否加载中 */
  loading?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 标题样式 */
  titleStyle?: string | CSSProperties
  /** 描述样式 */
  descriptionStyle?: string | CSSProperties
}

export const actionSheetEmits = {
  "update:show": (show: boolean) => true,
  clickOverlay: () => true,
  open: () => true,
  close: () => true,
  opened: () => true,
  closed: () => true,
  cancel: () => true,
  select: (action: ActionSheetAction, index: number) => true,
}
export type ActionSheetEmits = typeof actionSheetEmits
export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
export type ActionSheetInstance = InstanceType<typeof ActionSheet>
