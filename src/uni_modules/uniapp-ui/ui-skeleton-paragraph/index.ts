import type SkeletonParagraph from "./ui-skeleton-paragraph.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { makeNumericProp } from "../utils/props"

export const [skeletonParagraphProps, useSkeletonParagraphProps] = createProps("skeletonParagraph", {
  /**
   * 段落占位图行数
   */
  row: makeNumericProp(3),
  /**
   * 段落占位图宽度，可传数组来设置每一行的宽度
   */
  rowWidth: { type: [Number, String, Array] as PropType<SkeletonParagraphRowWidth>, default: "100%" },
  /**
   * 段落占位图行高
   */
  rowHeight: makeNumericProp("32rpx"),
  /**
   * 段落占位图行间距
   */
  rowGap: makeNumericProp("24rpx"),
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})
export type SkeletonParagraphRowWidth = (number | string) | (number | string)[]
export type SkeletonParagraphProps = ExtractPropTypes<typeof skeletonParagraphProps>
export type SkeletonParagraphInstance = InstanceType<typeof SkeletonParagraph>
