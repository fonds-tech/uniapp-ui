import type AvatarGroup from "./ui-avatar-group.vue"
import type { AvatarShape } from "../ui-avatar"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * 头像组堆叠方向
 */
export type AvatarGroupDirection = "left" | "right"

const defaultProps = buildDefaultProps("avatar-group", {
  max: 5,
  size: "medium",
  shape: "circle",
  gap: -16,
  direction: "right",
  borderColor: "#fff",
  borderWidth: "4rpx",
  excessColor: "",
  excessBackground: "",
  customClass: "",
  customStyle: "",
})

export const avatarGroupProps = {
  /**
   * 最多显示的头像数量
   */
  max: defaultProps("max", { type: Number }),
  /**
   * 头像尺寸，可选值为 mini/small/medium/large 或具体数值
   */
  size: defaultProps("size", { type: [Number, String] }),
  /**
   * 头像形状，可选值为 circle/square
   */
  shape: defaultProps("shape", { type: String as PropType<AvatarShape> }),
  /**
   * 头像间距（负数表示重叠）
   */
  gap: defaultProps("gap", { type: [Number, String] }),
  /**
   * 堆叠方向，left 表示左侧头像在上，right 表示右侧头像在上
   */
  direction: defaultProps("direction", { type: String as PropType<AvatarGroupDirection> }),
  /**
   * 头像边框颜色（用于堆叠效果）
   */
  borderColor: defaultProps("borderColor", { type: String }),
  /**
   * 头像边框宽度
   */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /**
   * 超出数量文本颜色
   */
  excessColor: defaultProps("excessColor", { type: String }),
  /**
   * 超出数量背景颜色
   */
  excessBackground: defaultProps("excessBackground", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const avatarGroupEmits = {
  /**
   * 点击头像组时触发
   */
  click: (event: any) => true,
  /**
   * 点击超出数量时触发
   */
  clickExcess: (event: any) => true,
}

/**
 * 头像组提供给子组件的配置
 */
export interface AvatarGroupProvide {
  /** 组件原始 props */
  props: AvatarGroupProps
  /** 获取子头像在组内的索引 */
  getIndex: () => number
  /** 获取最大显示数量 */
  getMax: () => number
  /** 获取当前子头像总数 */
  getTotal: () => number
}

/**
 * 头像组 InjectionKey，用于父子组件通信
 */
export const avatarGroupKey: InjectionKey<AvatarGroupProvide> = Symbol("ui-avatar-group")

export type AvatarGroupEmits = typeof avatarGroupEmits
export type AvatarGroupProps = ExtractPropTypes<typeof avatarGroupProps>
export type AvatarGroupInstance = InstanceType<typeof AvatarGroup>
