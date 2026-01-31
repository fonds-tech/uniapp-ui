import type SkeletonParagraph from "./ui-skeleton-paragraph.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("skeleton-paragraph", {
  row: 3,
  rowWidth: "100%",
  rowHeight: "32rpx",
  rowGap: "24rpx",
  customClass: undefined,
  customStyle: undefined,
})

export const skeletonParagraphProps = {
  /**
   * 段落占位图行数
   */
  row: defaultProps("row", { type: [Number, String] }),
  /**
   * 段落占位图宽度，可传数组来设置每一行的宽度
   */
  rowWidth: defaultProps("rowWidth", { type: [Number, String, Array] as PropType<SkeletonParagraphRowWidth> }),
  /**
   * 段落占位图行高
   */
  rowHeight: defaultProps("rowHeight", { type: [Number, String] }),
  /**
   * 段落占位图行间距
   */
  rowGap: defaultProps("rowGap", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export type SkeletonParagraphRowWidth = (number | string) | (number | string)[]
export type SkeletonParagraphProps = ExtractPropTypes<typeof skeletonParagraphProps>
export type SkeletonParagraphInstance = InstanceType<typeof SkeletonParagraph>
