import type ConfigProvider from "./ui-config-provider.vue"
import type { Mitt } from "../utils/mitt"
import type { PropType, InjectionKey, ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

/**
 * 主题色变量名称
 * 对应 variables.scss 中的 --ui-color-* 定义
 */
export type ThemeVarName =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "text-main"
  | "text-secondary"
  | "text-placeholder"
  | "text-disabled"
  | "border"
  | "border-light"
  | "border-dark"
  | "background"
  | "background-light"
  | "background-dark"
  | "mask"
  | "mask-light"
  | "mask-heavy"

/**
 * 主题变量类型定义
 * 仅覆盖色彩系统，非色彩变量请使用 cssVars
 */
export type ThemeVars = Partial<Record<ThemeVarName, string>>

/** 自定义 CSS 变量集合 */
export type CssVars = Record<string, string | number>

/** 主题模式 */
export type ThemeMode = "light" | "dark" | "auto"

export const configProviderKey: InjectionKey<ConfigProviderProvide> = Symbol("ui-config-provider")
const defaultProps = buildDefaultProps("config-provider", {
  theme: "light",
  themeVars: () => ({}),
  cssVars: () => ({}),
  height: "",
  background: "",
  customClass: "",
  customStyle: "",
})

export const configProviderProps = {
  /**
   * 主题模式
   * - light: 亮色模式
   * - dark: 暗色模式
   * - auto: 跟随系统
   */
  theme: defaultProps("theme", { type: String as PropType<ThemeMode> }),
  /**
   * 主题变量配置
   * 用于覆盖默认的主题颜色
   */
  themeVars: defaultProps("themeVars", { type: Object as PropType<ThemeVars> }),
  /**
   * 自定义 CSS 变量
   * 支持 "--ui-xxx" 或 "ui-xxx" 或 "xxx" 三种写法
   */
  cssVars: defaultProps("cssVars", { type: Object as PropType<CssVars> }),
  /**
   * 高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
}
export const configProviderEmits = {
  scroll: (options: Page.PageScrollOption) => options,
  reachTop: () => true,
  reachBottom: () => true,
  touchstart: (event: any) => event,
  touchend: (event: any) => event,
  touchmove: (event: any) => event,
}

export interface ConfigProviderProvide {
  props: ConfigProviderProps
  mitt: Mitt
  rect: UniApp.NodeInfo
  scrollTop: number
}
export type ConfigProviderEmits = typeof configProviderEmits
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>
