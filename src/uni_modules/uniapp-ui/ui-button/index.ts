import type Button from "./ui-button.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info" | "default" | "error"
export type ButtonSize = "mini" | "small" | "normal" | "large"
export type ButtonFormType = "submit" | "reset"
export type ButtonIconPosition = "left" | "right"
export type ButtonOpenType = "contact" | "share" | "getPhoneNumber" | "getUserInfo" | "launchApp" | "openSetting" | "feedback" | "chooseAvatar" | "agreePrivacyAuthorization"
export type ButtonLang = "zh_CN" | "zh_TW" | "en"

const defaultProps = buildDefaultProps("button", {
  type: "primary",
  size: "normal",
  round: false,
  text: false,
  plain: false,
  block: false,
  color: undefined,
  width: undefined,
  height: undefined,
  disabled: false,
  loading: false,
  shadow: undefined,
  loadingText: undefined,
  loadingIconSize: undefined,
  textSize: undefined,
  textColor: undefined,
  textWeight: undefined,
  icon: "",
  iconPosition: "left",
  iconSize: undefined,
  iconColor: "",
  iconWeight: undefined,
  borderRadius: undefined,
  borderWidth: undefined,
  borderColor: undefined,
  formType: undefined,
  openType: undefined,
  appParameter: undefined,
  hoverStopPropagation: true,
  lang: "zh_CN",
  sessionFrom: undefined,
  sendMessageTitle: undefined,
  sendMessagePath: undefined,
  sendMessageImg: undefined,
  showMessageCard: false,
  throttle: 200,
  hoverStartTime: 0,
  hoverStayTime: 50,
  marginLeft: undefined,
  marginRight: undefined,
  customClass: "",
  customStyle: "",
})

export const buttonProps = {
  /** 按钮类型 */
  type: defaultProps("type", { type: String as PropType<ButtonType> }),
  /** 按钮大小 */
  size: defaultProps("size", { type: String as PropType<ButtonSize> }),
  /** 是否圆形的 */
  round: defaultProps("round", { type: Boolean }),
  /** 是否文本按钮 */
  text: defaultProps("text", { type: Boolean }),
  /** 是否镂空的 */
  plain: defaultProps("plain", { type: Boolean }),
  /** 是否块级的 */
  block: defaultProps("block", { type: Boolean }),
  /** 按钮颜色 */
  color: defaultProps("color", { type: String }),
  /** 按钮宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 按钮高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否加载中 */
  loading: defaultProps("loading", { type: Boolean }),
  /** 按钮阴影 */
  shadow: defaultProps("shadow", { type: String }),
  /** 加载中文本 */
  loadingText: defaultProps("loadingText", { type: String }),
  /** 加载中图标大小 */
  loadingIconSize: defaultProps("loadingIconSize", { type: [Number, String] }),
  /** 按钮文本大小 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 按钮文本颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 按钮文本粗细 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /** 按钮图标 */
  icon: defaultProps("icon", { type: String }),
  /** 按钮图标位置 */
  iconPosition: defaultProps("iconPosition", { type: String as PropType<ButtonIconPosition> }),
  /** 按钮图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 按钮图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 按钮图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 按钮圆角大小 */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /** 按钮边框宽度 */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /** 按钮边框颜色 */
  borderColor: defaultProps("borderColor", { type: String }),
  /** 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件 */
  formType: defaultProps("formType", { type: String as PropType<ButtonFormType> }),
  /** 开放能力 */
  openType: defaultProps("openType", { type: String as PropType<ButtonOpenType> }),
  /** 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 */
  appParameter: defaultProps("appParameter", { type: String }),
  /** 指定是否阻止本节点的祖先节点出现点击态 */
  hoverStopPropagation: defaultProps("hoverStopPropagation", { type: Boolean }),
  /** 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文 */
  lang: defaultProps("lang", { type: String as PropType<ButtonLang> }),
  /** 会话来源，open-type="contact"时有效 */
  sessionFrom: defaultProps("sessionFrom", { type: String }),
  /** 会话内消息卡片标题，open-type="contact"时有效 */
  sendMessageTitle: defaultProps("sendMessageTitle", { type: String }),
  /** 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 */
  sendMessagePath: defaultProps("sendMessagePath", { type: String }),
  /** 会话内消息卡片图片，open-type="contact"时有效 */
  sendMessageImg: defaultProps("sendMessageImg", { type: String }),
  /** 是否显示会话内消息卡片，open-type="contact"时有效 */
  showMessageCard: defaultProps("showMessageCard", { type: Boolean }),
  /** 节流，一定时间内只能触发一次，默认为 200 */
  throttle: defaultProps("throttle", { type: Number }),
  /** 按住后多久出现点击态，单位毫秒 */
  hoverStartTime: defaultProps("hoverStartTime", { type: Number }),
  /** 手指松开后点击态保留时间，单位毫秒 */
  hoverStayTime: defaultProps("hoverStayTime", { type: Number }),
  /** 左外边距 */
  marginLeft: defaultProps("marginLeft", { type: [Number, String] }),
  /** 右外边距 */
  marginRight: defaultProps("marginRight", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const buttonEmits = {
  click: (event: any) => true,
  error: (event: any) => true,
  launchapp: (event: any) => true,
  getuserinfo: (event: any) => true,
  opensetting: (event: any) => true,
  getphonenumber: (event: any) => true,
}

export type ButtonEmits = typeof buttonEmits
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonInstance = InstanceType<typeof Button>
