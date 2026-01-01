import type SkeletonParagraph from "./ui-skeleton-paragraph.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { makeNumericProp } from "../utils/props"

export const [skeletonParagraphProps, useSkeletonParagraphProps] = createProps("skeletonParagraph", {
  /**
   * 段落占位图行数
   */
  row: makeNumericProp(1),
  /**
   * 段落占位图宽度，可传数组来设置每一行的宽度
   */
  rowWidth: { type: [Number, String, Array] as PropType<SkeletonParagraphRowWidth>, default: "100%" },
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})
export const skeletonParagraphEmits = {}

export type SkeletonParagraphRowWidth = (number | string) | (number | string)[]
export type SkeletonParagraphEmits = typeof skeletonParagraphEmits
export type SkeletonParagraphProps = ExtractPropTypes<typeof skeletonParagraphProps>
export type SkeletonParagraphInstance = InstanceType<typeof SkeletonParagraph>
