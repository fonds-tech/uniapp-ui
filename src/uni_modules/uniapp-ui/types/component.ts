import type { ArcProps } from "../ui-arc"
import type { ColProps } from "../ui-col"
import type { RowProps } from "../ui-row"
import type { TabProps } from "../ui-tab"
import type { TagProps } from "../ui-tag"
import type { CellProps } from "../ui-cell"
import type { FormProps } from "../ui-form"
import type { IconProps } from "../ui-icon"
import type { LineProps } from "../ui-line"
import type { RateProps } from "../ui-rate"
import type { StepProps } from "../ui-step"
import type { TabsProps } from "../ui-tabs"
import type { TextProps } from "../ui-text"
import type { BadgeProps } from "../ui-badge"
import type { EmptyProps } from "../ui-empty"
import type { FieldProps } from "../ui-field"
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
import type { CheckboxGroupProps } from "../ui-checkbox-group"
import type { SkeletonImageProps } from "../ui-skeleton-image"
import type { SkeletonTitleProps } from "../ui-skeleton-title"
import type { TextHighlightProps } from "../ui-text-highlight"
import type { ConfigProviderProps } from "../ui-config-provider"
import type { SafeAreaBottomProps } from "../ui-safe-area-bottom"
import type { SkeletonAvatarProps } from "../ui-skeleton-avatar"
import type { DateRangeSelectProps } from "../ui-date-range-select"
import type { SkeletonParagraphProps } from "../ui-skeleton-paragraph"

/**
 * 组件默认值配置
 */
export interface Components {
  /**
   * action-sheet 组件默认值
   */
  "action-sheet"?: Partial<ActionSheetProps>
  /**
   * arc 组件默认值
   */
  arc?: Partial<ArcProps>
  /**
   * avatar 组件默认值
   */
  avatar?: Partial<AvatarProps>
  /**
   * avatar-group 组件默认值
   */
  "avatar-group"?: Partial<AvatarGroupProps>
  /**
   * back-top 组件默认值
   */
  "back-top"?: Partial<BackTopProps>
  /**
   * badge 组件默认值
   */
  badge?: Partial<BadgeProps>
  /**
   * button 组件默认值
   */
  button?: Partial<ButtonProps>
  /**
   * calendar 组件默认值
   */
  calendar?: Partial<CalendarProps>
  /**
   * cascader 组件默认值
   */
  cascader?: Partial<CascaderProps>
  /**
   * cell 组件默认值
   */
  cell?: Partial<CellProps>
  /**
   * cell-group 组件默认值
   */
  "cell-group"?: Partial<CellGroupProps>
  /**
   * checkbox 组件默认值
   */
  checkbox?: Partial<CheckboxProps>
  /**
   * checkbox-group 组件默认值
   */
  "checkbox-group"?: Partial<CheckboxGroupProps>
  /**
   * col 组件默认值
   */
  col?: Partial<ColProps>
  /**
   * config-provider 组件默认值
   */
  "config-provider"?: Partial<ConfigProviderProps>
  /**
   * count-down 组件默认值
   */
  "count-down"?: Partial<CountDownProps>
  /**
   * date-picker 组件默认值
   */
  "date-picker"?: Partial<DatePickerProps>
  /**
   * date-range-select 组件默认值
   */
  "date-range-select"?: Partial<DateRangeSelectProps>
  /**
   * date-select 组件默认值
   */
  "date-select"?: Partial<DateSelectProps>
  /**
   * dialog 组件默认值
   */
  dialog?: Partial<DialogProps>
  /**
   * dropdown-item 组件默认值
   */
  "dropdown-item"?: Partial<DropdownItemProps>
  /**
   * dropdown-menu 组件默认值
   */
  "dropdown-menu"?: Partial<DropdownMenuProps>
  /**
   * empty 组件默认值
   */
  empty?: Partial<EmptyProps>
  /**
   * field 组件默认值
   */
  field?: Partial<FieldProps>
  /**
   * float-button 组件默认值
   */
  "float-button"?: Partial<FloatButtonProps>
  /**
   * footer 组件默认值
   */
  footer?: Partial<FooterProps>
  /**
   * form 组件默认值
   */
  form?: Partial<FormProps>
  /**
   * form-item 组件默认值
   */
  "form-item"?: Partial<FormItemProps>
  /**
   * header 组件默认值
   */
  header?: Partial<HeaderProps>
  /**
   * icon 组件默认值
   */
  icon?: Partial<IconProps>
  /**
   * image 组件默认值
   */
  image?: Partial<ImageProps>
  /**
   * index-anchor 组件默认值
   */
  "index-anchor"?: Partial<IndexAnchorProps>
  /**
   * index-bar 组件默认值
   */
  "index-bar"?: Partial<IndexBarProps>
  /**
   * input 组件默认值
   */
  input?: Partial<InputProps>
  /**
   * keyboard 组件默认值
   */
  keyboard?: Partial<KeyboardProps>
  /**
   * line 组件默认值
   */
  line?: Partial<LineProps>
  /**
   * loading 组件默认值
   */
  loading?: Partial<LoadingProps>
  /**
   * navbar 组件默认值
   */
  navbar?: Partial<NavbarProps>
  /**
   * notice-bar 组件默认值
   */
  "notice-bar"?: Partial<NoticeBarProps>
  /**
   * notify 组件默认值
   */
  notify?: Partial<NotifyProps>
  /**
   * number-roll 组件默认值
   */
  "number-roll"?: Partial<NumberRollProps>
  /**
   * overlay 组件默认值
   */
  overlay?: Partial<OverlayProps>
  /**
   * pagination 组件默认值
   */
  pagination?: Partial<PaginationProps>
  /**
   * picker 组件默认值
   */
  picker?: Partial<PickerProps>
  /**
   * picker-panel 组件默认值
   */
  "picker-panel"?: Partial<PickerPanelProps>
  /**
   * popup 组件默认值
   */
  popup?: Partial<PopupProps>
  /**
   * progress 组件默认值
   */
  progress?: Partial<ProgressProps>
  /**
   * pull-refresh 组件默认值
   */
  "pull-refresh"?: Partial<PullRefreshProps>
  /**
   * qrcode 组件默认值
   */
  qrcode?: Partial<QrcodeProps>
  /**
   * radio 组件默认值
   */
  radio?: Partial<RadioProps>
  /**
   * radio-group 组件默认值
   */
  "radio-group"?: Partial<RadioGroupProps>
  /**
   * rate 组件默认值
   */
  rate?: Partial<RateProps>
  /**
   * resize 组件默认值
   */
  resize?: Partial<ResizeProps>
  /**
   * row 组件默认值
   */
  row?: Partial<RowProps>
  /**
   * safe-area-bottom 组件默认值
   */
  "safe-area-bottom"?: Partial<SafeAreaBottomProps>
  /**
   * safe-area-top 组件默认值
   */
  "safe-area-top"?: Partial<SafeAreaTopProps>
  /**
   * search 组件默认值
   */
  search?: Partial<SearchProps>
  /**
   * select 组件默认值
   */
  select?: Partial<SelectProps>
  /**
   * sidebar 组件默认值
   */
  sidebar?: Partial<SidebarProps>
  /**
   * sidebar-item 组件默认值
   */
  "sidebar-item"?: Partial<SidebarItemProps>
  /**
   * skeleton 组件默认值
   */
  skeleton?: Partial<SkeletonProps>
  /**
   * skeleton-avatar 组件默认值
   */
  "skeleton-avatar"?: Partial<SkeletonAvatarProps>
  /**
   * skeleton-image 组件默认值
   */
  "skeleton-image"?: Partial<SkeletonImageProps>
  /**
   * skeleton-paragraph 组件默认值
   */
  "skeleton-paragraph"?: Partial<SkeletonParagraphProps>
  /**
   * skeleton-title 组件默认值
   */
  "skeleton-title"?: Partial<SkeletonTitleProps>
  /**
   * slider 组件默认值
   */
  slider?: Partial<SliderProps>
  /**
   * step 组件默认值
   */
  step?: Partial<StepProps>
  /**
   * stepper 组件默认值
   */
  stepper?: Partial<StepperProps>
  /**
   * steps 组件默认值
   */
  steps?: Partial<StepsProps>
  /**
   * sticky 组件默认值
   */
  sticky?: Partial<StickyProps>
  /**
   * swipe-cell 组件默认值
   */
  "swipe-cell"?: Partial<SwipeCellProps>
  /**
   * swiper 组件默认值
   */
  swiper?: Partial<SwiperProps>
  /**
   * switch 组件默认值
   */
  switch?: Partial<SwitchProps>
  /**
   * tab 组件默认值
   */
  tab?: Partial<TabProps>
  /**
   * tabbar 组件默认值
   */
  tabbar?: Partial<TabbarProps>
  /**
   * tabbar-item 组件默认值
   */
  "tabbar-item"?: Partial<TabbarItemProps>
  /**
   * tabs 组件默认值
   */
  tabs?: Partial<TabsProps>
  /**
   * tag 组件默认值
   */
  tag?: Partial<TagProps>
  /**
   * text 组件默认值
   */
  text?: Partial<TextProps>
  /**
   * text-highlight 组件默认值
   */
  "text-highlight"?: Partial<TextHighlightProps>
  /**
   * textarea 组件默认值
   */
  textarea?: Partial<TextareaProps>
  /**
   * toast 组件默认值
   */
  toast?: Partial<ToastProps>
  /**
   * transition 组件默认值
   */
  transition?: Partial<TransitionProps>
  /**
   * upload 组件默认值
   */
  upload?: Partial<UploadProps>
}

// 重新导出组件类型
export type {
  ActionSheetProps,
  ArcProps,
  AvatarGroupProps,
  AvatarProps,
  BackTopProps,
  BadgeProps,
  ButtonProps,
  CalendarProps,
  CascaderProps,
  CellGroupProps,
  CellProps,
  CheckboxGroupProps,
  CheckboxProps,
  ColProps,
  ConfigProviderProps,
  CountDownProps,
  DatePickerProps,
  DateRangeSelectProps,
  DateSelectProps,
  DialogProps,
  DropdownItemProps,
  DropdownMenuProps,
  EmptyProps,
  FieldProps,
  FloatButtonProps,
  FooterProps,
  FormItemProps,
  FormProps,
  HeaderProps,
  IconProps,
  ImageProps,
  IndexAnchorProps,
  IndexBarProps,
  InputProps,
  KeyboardProps,
  LineProps,
  LoadingProps,
  NavbarProps,
  NoticeBarProps,
  NotifyProps,
  NumberRollProps,
  OverlayProps,
  PaginationProps,
  PickerPanelProps,
  PickerProps,
  PopoverProps,
  PopupProps,
  ProgressProps,
  PullRefreshProps,
  QrcodeProps,
  RadioGroupProps,
  RadioProps,
  RateProps,
  ResizeProps,
  RowProps,
  SafeAreaBottomProps,
  SafeAreaTopProps,
  SearchProps,
  SelectProps,
  SidebarItemProps,
  SidebarProps,
  SkeletonAvatarProps,
  SkeletonImageProps,
  SkeletonParagraphProps,
  SkeletonProps,
  SkeletonTitleProps,
  SliderProps,
  StepperProps,
  StepProps,
  StepsProps,
  StickyProps,
  SwipeCellProps,
  SwiperProps,
  SwitchProps,
  TabbarItemProps,
  TabbarProps,
  TabProps,
  TabsProps,
  TagProps,
  TextareaProps,
  TextHighlightProps,
  TextProps,
  ToastProps,
  TransitionProps,
  UploadProps,
}
