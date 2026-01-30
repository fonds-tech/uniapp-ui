import type ActionSheet from "./ui-action-sheet.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("action-sheet", {
  show: false,
  actions: () => [],
  height: undefined,
  maxHeight: undefined,
  title: "",
  titleSize: undefined,
  titleColor: "",
  titleWeight: undefined,
  description: "",
  descriptionSize: undefined,
  descriptionColor: "",
  descriptionWeight: undefined,
  showCancel: true,
  cancelText: "取消",
  cancelTextSize: undefined,
  cancelTextColor: "",
  cancelTextWeight: undefined,
  cancelBackground: "",
  actionTitleStyle: "",
  actionDescriptionStyle: "",
  duration: 300,
  borderRadius: undefined,
  zIndex: undefined,
  overlay: true,
  overlayStyle: "",
  lazyRender: true,
  beforeClose: undefined,
  closeOnClickAction: true,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
  customClass: "",
  customStyle: "",
})

export const actionSheetProps = {
  /**
   * 是否显示
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 操作项列表
   */
  actions: defaultProps("actions", { type: Array as PropType<ActionSheetAction[]> }),
  /**
   * 操作面板的高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 操作面板的最大高度
   */
  maxHeight: defaultProps("maxHeight", { type: [Number, String] }),
  /**
   * 标题文本
   */
  title: defaultProps("title", { type: String }),
  /**
   * 标题文本大小
   */
  titleSize: defaultProps("titleSize", { type: [Number, String] }),
  /**
   * 标题文本颜色
   */
  titleColor: defaultProps("titleColor", { type: String }),
  /**
   * 标题文本粗细
   */
  titleWeight: defaultProps("titleWeight", { type: [Number, String] }),
  /**
   * 描述文本
   */
  description: defaultProps("description", { type: String }),
  /**
   * 描述文本大小
   */
  descriptionSize: defaultProps("descriptionSize", { type: [Number, String] }),
  /**
   * 描述文本颜色
   */
  descriptionColor: defaultProps("descriptionColor", { type: String }),
  /**
   * 描述文本粗细
   */
  descriptionWeight: defaultProps("descriptionWeight", { type: [Number, String] }),
  /**
   * 是否显示取消按钮
   */
  showCancel: defaultProps("showCancel", { type: Boolean }),
  /**
   * 取消按钮文本
   */
  cancelText: defaultProps("cancelText", { type: String }),
  /**
   * 取消按钮文本大小
   */
  cancelTextSize: defaultProps("cancelTextSize", { type: [Number, String] }),
  /**
   * 取消按钮文本颜色
   */
  cancelTextColor: defaultProps("cancelTextColor", { type: String }),
  /**
   * 取消按钮文本粗细
   */
  cancelTextWeight: defaultProps("cancelTextWeight", { type: [Number, String] }),
  /**
   * 取消按钮背景颜色
   */
  cancelBackground: defaultProps("cancelBackground", { type: String }),
  /**
   * 操作项标题的样式
   */
  actionTitleStyle: defaultProps("actionTitleStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /**
   * 操作项描述的样式
   */
  actionDescriptionStyle: defaultProps("actionDescriptionStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /**
   * 动画过渡的时间
   */
  duration: defaultProps("duration", { type: Number }),
  /**
   * 操作面板的圆角大小
   */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 是否显示遮罩层
   */
  overlay: defaultProps("overlay", { type: Boolean }),
  /**
   * 遮罩层样式
   */
  overlayStyle: defaultProps("overlayStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /**
   * 是否在显示时才渲染节点
   */
  lazyRender: defaultProps("lazyRender", { type: Boolean }),
  /**
   * 点击action项关闭前的回调函数
   */
  beforeClose: defaultProps("beforeClose", { type: Function as PropType<(action: ActionSheetAction, index: number) => boolean | Promise<boolean>> }),
  /**
   * 点击操作项后是否关闭操作面板
   */
  closeOnClickAction: defaultProps("closeOnClickAction", { type: Boolean }),
  /**
   * 点击遮罩层后是否关闭操作面板
   */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /**
   * 是否显示底部安全区域
   */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
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
