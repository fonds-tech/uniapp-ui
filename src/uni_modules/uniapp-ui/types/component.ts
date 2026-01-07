import type { EmptyProps } from "../ui-empty"
import type { InputProps } from "../ui-input"
import type { NavbarProps } from "../ui-navbar"
import type { PickerProps } from "../ui-picker"
import type { SelectProps } from "../ui-select"
import type { ActionSheetProps } from "../ui-action-sheet"

/**
 * 组件默认值配置
 */
export interface Components {
  /**
   * navbar 组件默认值
   */
  navbar?: Partial<NavbarProps>
  /**
   * action-sheet 组件默认值
   */
  "action-sheet"?: Partial<ActionSheetProps>
  /**
   * input 组件默认值
   */
  input?: Partial<InputProps>
  /**
   * picker 组件默认值
   */
  picker?: Partial<PickerProps>
  /**
   * select 组件默认值
   */
  select?: Partial<SelectProps>
  /**
   * empty 组件默认值
   */
  empty?: Partial<EmptyProps>
}

// 重新导出组件类型
export type { ActionSheetProps, InputProps, NavbarProps, SelectProps }
