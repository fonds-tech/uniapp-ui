import type Button from "./ui-button.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, truthProp, buildProps, numericProp, makeNumberProp, makeStringProp, makeNumericProp } from "../utils/props"

export type ButtonType = "primary" | "success" | "warning" | "error" | "info" | "default"
export type ButtonSize = "mini" | "small" | "normal" | "medium" | "large"
export type ButtonFormType = "submit" | "reset"
export type ButtonIconPosition = "left" | "right"
export type ButtonOpenType =
  | "contact"
  | "share"
  | "getPhoneNumber"
  | "getUserInfo"
  | "launchApp"
  | "openSetting"
  | "feedback"
  | "chooseAvatar"
  | "agreePrivacyAuthorization"
export type ButtonLang = "zh_CN" | "zh_TW" | "en"

export const buttonProps = buildProps("button", {
  /**
   * 按钮类型
   */
  type: makeStringProp<ButtonType>("primary"),
  /**
   * 按钮大小
   */
  size: makeStringProp<ButtonSize>("normal"),
  /**
   * 是否圆形的
   */
  round: Boolean,
  /**
   * 是否文本按钮
   */
  text: Boolean,
  /**
   * 是否镂空的
   */
  plain: Boolean,
  /**
   * 是否块级的
   */
  block: Boolean,
  /**
   * 按钮颜色
   */
  color: String,
  /**
   * 按钮宽度
   */
  width: numericProp,
  /**
   * 按钮高度
   */
  height: numericProp,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否加载中
   */
  loading: Boolean,
  /**
   * 按钮阴影
   */
  shadow: String,
  /**
   * 加载中文本
   */
  loadingText: String,
  /**
   * 加载中图标大小
   */
  loadingIconSize: numericProp,
  /**
   * 按钮文本大小
   */
  textSize: numericProp,
  /**
   * 按钮文本颜色
   */
  textColor: String,
  /**
   * 按钮文本粗细
   */
  textWeight: numericProp,
  /**
   * 按钮图标
   */
  icon: makeStringProp(""),
  /**
   * 按钮图标位置
   */
  iconPosition: makeStringProp<ButtonIconPosition>("left"),
  /**
   * 按钮图标大小
   */
  iconSize: numericProp,
  /**
   * 按钮图标颜色
   */
  iconColor: makeStringProp(""),
  /**
   * 按钮图标粗细
   */
  iconWeight: numericProp,
  /**
   * 按钮圆角大小
   */
  borderRadius: numericProp,
  /**
   * 按钮边框宽度
   */
  borderWidth: numericProp,
  /**
   * 按钮边框颜色
   */
  borderColor: String,
  /**
   * 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
   */
  formType: String as PropType<ButtonFormType>,
  /**
   * 开放能力
   */
  openType: String as PropType<ButtonOpenType>,
  /**
   * 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
   */
  appParameter: String,
  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   */
  hoverStopPropagation: truthProp,
  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
   */
  lang: makeStringProp<ButtonLang>("zh_CN"),
  /**
   * 会话来源，open-type="contact"时有效
   */
  sessionFrom: String,
  /**
   * 会话内消息卡片标题，open-type="contact"时有效
   */
  sendMessageTitle: String,
  /**
   * 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
   */
  sendMessagePath: String,
  /**
   * 会话内消息卡片图片，open-type="contact"时有效
   */
  sendMessageImg: String,
  /**
   * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
   */
  showMessageCard: Boolean,
  /**
   * 节流，一定时间内只能触发一次，默认为 200
   */
  throttle: makeNumericProp(200),
  /**
   * 按住后多久出现点击态，单位毫秒
   */
  hoverStartTime: makeNumberProp(0),
  /**
   * 手指松开后点击态保留时间，单位毫秒
   */
  hoverStayTime: makeNumberProp(50),
  /**
   * 左外边距
   */
  marginLeft: numericProp,
  /**
   * 右外边距
   */
  marginRight: numericProp,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

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
