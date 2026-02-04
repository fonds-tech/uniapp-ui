import type { ArcProps } from "../ui-arc"
import type { ColProps } from "../ui-col"
import type { RowProps } from "../ui-row"
import type { TabProps } from "../ui-tab"
import type { TagProps } from "../ui-tag"
import type { CellProps } from "../ui-cell"
import type { FormProps } from "../ui-form"
import type { IconProps } from "../ui-icon"
import type { RateProps } from "../ui-rate"
import type { StepProps } from "../ui-step"
import type { TabsProps } from "../ui-tabs"
import type { TextProps } from "../ui-text"
import type { BadgeProps } from "../ui-badge"
import type { EmptyProps } from "../ui-empty"
import type { ImageProps } from "../ui-image"
import type { InputProps } from "../ui-input"
import type { PopupProps } from "../ui-popup"
import type { RadioProps } from "../ui-radio"
import type { StepsProps } from "../ui-steps"
import type { ToastProps } from "../ui-toast"
import type { AvatarProps } from "../ui-avatar"
import type { ButtonProps } from "../ui-button"
import type { DialogProps } from "../ui-dialog"
import type { FooterProps } from "../ui-footer"
import type { HeaderProps } from "../ui-header"
import type { NavbarProps } from "../ui-navbar"
import type { NotifyProps } from "../ui-notify"
import type { PickerProps } from "../ui-picker"
import type { QrcodeProps } from "../ui-qrcode"
import type { ResizeProps } from "../ui-resize"
import type { SearchProps } from "../ui-search"
import type { SelectProps } from "../ui-select"
import type { SliderProps } from "../ui-slider"
import type { StickyProps } from "../ui-sticky"
import type { SwiperProps } from "../ui-swiper"
import type { SwitchProps } from "../ui-switch"
import type { TabbarProps } from "../ui-tabbar"
import type { UploadProps } from "../ui-upload"
import type { BackTopProps } from "../ui-back-top"
import type { LoadingProps } from "../ui-loading"
import type { OverlayProps } from "../ui-overlay"
import type { SidebarProps } from "../ui-sidebar"
import type { StepperProps } from "../ui-stepper"
import type { CalendarProps } from "../ui-calendar"
import type { CascaderProps } from "../ui-cascader"
import type { CheckboxProps } from "../ui-checkbox"
import type { FormItemProps } from "../ui-form-item"
import type { IndexBarProps } from "../ui-index-bar"
import type { KeyboardProps } from "../ui-keyboard"
import type { ProgressProps } from "../ui-progress"
import type { SkeletonProps } from "../ui-skeleton"
import type { TextareaProps } from "../ui-textarea"
import type { CellGroupProps } from "../ui-cell-group"
import type { CountDownProps } from "../ui-count-down"
import type { NoticeBarProps } from "../ui-notice-bar"
import type { SwipeCellProps } from "../ui-swipe-cell"
import type { DatePickerProps } from "../ui-date-picker"
import type { DateSelectProps } from "../ui-date-select"
import type { NumberRollProps } from "../ui-number-roll"
import type { PaginationProps } from "../ui-pagination"
import type { RadioGroupProps } from "../ui-radio-group"
import type { TabbarItemProps } from "../ui-tabbar-item"
import type { TransitionProps } from "../ui-transition"
import type { ActionSheetProps } from "../ui-action-sheet"
import type { AvatarGroupProps } from "../ui-avatar-group"
import type { FloatButtonProps } from "../ui-float-button"
import type { IndexAnchorProps } from "../ui-index-anchor"
import type { PickerPanelProps } from "../ui-picker-panel"
import type { PullRefreshProps } from "../ui-pull-refresh"
import type { SafeAreaTopProps } from "../ui-safe-area-top"
import type { SidebarItemProps } from "../ui-sidebar-item"
import type { DropdownItemProps } from "../ui-dropdown-item"
import type { DropdownMenuProps } from "../ui-dropdown-menu"
import type { TextEllipsisProps } from "../ui-text-ellipsis"
import type { CheckboxGroupProps } from "../ui-checkbox-group"
import type { SkeletonImageProps } from "../ui-skeleton-image"
import type { SkeletonTitleProps } from "../ui-skeleton-title"
import type { TextHighlightProps } from "../ui-text-highlight"
import type { ConfigProviderProps } from "../ui-config-provider"
import type { SafeAreaBottomProps } from "../ui-safe-area-bottom"
import type { SkeletonAvatarProps } from "../ui-skeleton-avatar"
import type { DateRangeSelectProps } from "../ui-date-range-select"
import type { SkeletonParagraphProps } from "../ui-skeleton-paragraph"

export interface Components {
  "action-sheet": Partial<ActionSheetProps>
  arc: Partial<ArcProps>
  avatar: Partial<AvatarProps>
  "avatar-group": Partial<AvatarGroupProps>
  "back-top": Partial<BackTopProps>
  badge: Partial<BadgeProps>
  button: Partial<ButtonProps>
  calendar: Partial<CalendarProps>
  cascader: Partial<CascaderProps>
  cell: Partial<CellProps>
  "cell-group": Partial<CellGroupProps>
  checkbox: Partial<CheckboxProps>
  "checkbox-group": Partial<CheckboxGroupProps>
  col: Partial<ColProps>
  "config-provider": Partial<ConfigProviderProps>
  "count-down": Partial<CountDownProps>
  "date-picker": Partial<DatePickerProps>
  "date-range-select": Partial<DateRangeSelectProps>
  "date-select": Partial<DateSelectProps>
  dialog: Partial<DialogProps>
  "dropdown-item": Partial<DropdownItemProps>
  "dropdown-menu": Partial<DropdownMenuProps>
  empty: Partial<EmptyProps>
  "float-button": Partial<FloatButtonProps>
  footer: Partial<FooterProps>
  form: Partial<FormProps>
  "form-item": Partial<FormItemProps>
  header: Partial<HeaderProps>
  icon: Partial<IconProps>
  image: Partial<ImageProps>
  "index-anchor": Partial<IndexAnchorProps>
  "index-bar": Partial<IndexBarProps>
  input: Partial<InputProps>
  keyboard: Partial<KeyboardProps>
  loading: Partial<LoadingProps>
  navbar: Partial<NavbarProps>
  "notice-bar": Partial<NoticeBarProps>
  notify: Partial<NotifyProps>
  "number-roll": Partial<NumberRollProps>
  overlay: Partial<OverlayProps>
  pagination: Partial<PaginationProps>
  picker: Partial<PickerProps>
  "picker-panel": Partial<PickerPanelProps>
  popup: Partial<PopupProps>
  progress: Partial<ProgressProps>
  "pull-refresh": Partial<PullRefreshProps>
  qrcode: Partial<QrcodeProps>
  radio: Partial<RadioProps>
  "radio-group": Partial<RadioGroupProps>
  rate: Partial<RateProps>
  resize: Partial<ResizeProps>
  row: Partial<RowProps>
  "safe-area-bottom": Partial<SafeAreaBottomProps>
  "safe-area-top": Partial<SafeAreaTopProps>
  search: Partial<SearchProps>
  select: Partial<SelectProps>
  sidebar: Partial<SidebarProps>
  "sidebar-item": Partial<SidebarItemProps>
  skeleton: Partial<SkeletonProps>
  "skeleton-avatar": Partial<SkeletonAvatarProps>
  "skeleton-image": Partial<SkeletonImageProps>
  "skeleton-paragraph": Partial<SkeletonParagraphProps>
  "skeleton-title": Partial<SkeletonTitleProps>
  slider: Partial<SliderProps>
  step: Partial<StepProps>
  stepper: Partial<StepperProps>
  steps: Partial<StepsProps>
  sticky: Partial<StickyProps>
  "swipe-cell": Partial<SwipeCellProps>
  swiper: Partial<SwiperProps>
  switch: Partial<SwitchProps>
  tab: Partial<TabProps>
  tabbar: Partial<TabbarProps>
  "tabbar-item": Partial<TabbarItemProps>
  tabs: Partial<TabsProps>
  tag: Partial<TagProps>
  text: Partial<TextProps>
  "text-ellipsis": Partial<TextEllipsisProps>
  "text-highlight": Partial<TextHighlightProps>
  textarea: Partial<TextareaProps>
  toast: Partial<ToastProps>
  transition: Partial<TransitionProps>
  upload: Partial<UploadProps>
}
