import type Step from "./ui-step.vue"
import type { StepStatus } from "../ui-steps"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type { StepStatus }

const defaultProps = buildDefaultProps("step", {
  title: undefined,
  description: undefined,
  icon: undefined,
  status: undefined,
  iconSize: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const stepProps = {
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 描述 */
  description: defaultProps("description", { type: String }),
  /** 自定义图标，覆盖父级 active/inactive/finish/errorIcon */
  icon: defaultProps("icon", { type: String }),
  /** 显式状态，覆盖按 active 派生的状态 */
  status: defaultProps("status", { type: String as PropType<StepStatus> }),
  /** 图标大小，覆盖父级 iconSize */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const stepEmits = {
  click: (_index: number) => true,
}

export type StepEmits = typeof stepEmits
export type StepProps = ExtractPropTypes<typeof stepProps>
export type StepInstance = InstanceType<typeof Step>
