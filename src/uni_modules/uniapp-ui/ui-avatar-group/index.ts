import type AvatarGroup from "./ui-avatar-group.vue"
import type { AvatarSize, AvatarShape } from "../ui-avatar"
import type { InjectionKey, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

/**
 * 头像组堆叠方向
 */
export type AvatarGroupDirection = "left" | "right"

export const [avatarGroupProps, useAvatarGroupProps] = createProps("avatarGroup", {
  /**
   * 最多显示的头像数量
   */
  max: makeNumericProp(5),
  /**
   * 头像尺寸，可选值为 mini/small/medium/large 或具体数值
   */
  size: makeNumericProp<AvatarSize>("medium"),
  /**
   * 头像形状，可选值为 circle/square
   */
  shape: makeStringProp<AvatarShape>("circle"),
  /**
   * 头像间距（负数表示重叠）
   */
  gap: makeNumericProp(-16),
  /**
   * 堆叠方向，left 表示左侧头像在上，right 表示右侧头像在上
   */
  direction: makeStringProp<AvatarGroupDirection>("right"),
  /**
   * 头像边框颜色（用于堆叠效果）
   */
  borderColor: makeStringProp("#fff"),
  /**
   * 头像边框宽度
   */
  borderWidth: makeNumericProp("4rpx"),
  /**
   * 超出数量文本颜色
   */
  excessColor: makeStringProp(""),
  /**
   * 超出数量背景颜色
   */
  excessBackground: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

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
  /** 经全局配置合并后的 props */
  useProps: AvatarGroupProps
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
