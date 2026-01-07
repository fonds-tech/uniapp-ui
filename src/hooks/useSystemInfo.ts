import { merge } from "@/utils/object"

/** 系统信息类型 */
export interface SystemInfo {
  /** 系统主题 light/dark */
  theme?: "light" | "dark"
  /** 设备品牌 */
  brand?: string
  /** 设备型号 */
  model?: string
  /** 操作系统及版本 */
  system?: string
  /** 客户端平台 */
  platform?: string
  /** 屏幕宽度 */
  screenWidth?: number
  /** 屏幕高度 */
  screenHeight?: number
  /** 可使用窗口宽度 */
  windowWidth?: number
  /** 可使用窗口高度 */
  windowHeight?: number
  /** 状态栏高度 */
  statusBarHeight?: number
  /** 安全区域 */
  safeArea?: {
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
  }
  /** 其他属性 */
  [key: string]: any
}

/**
 * 获取系统信息
 * @description 跨平台获取系统信息，微信小程序使用新版 API 避免警告
 * @returns 系统信息对象
 */
export function useSystemInfo(): SystemInfo {
  let info = {} as SystemInfo
  // #ifdef MP-WEIXIN
  // 微信小程序使用新版分离 API，避免 getSystemInfoSync 警告
  const deviceInfo = (typeof uni.getDeviceInfo === "function" ? uni.getDeviceInfo() : {}) || {}
  const windowInfo = (typeof uni.getWindowInfo === "function" ? uni.getWindowInfo() : {}) || {}
  const appBaseInfo = (typeof uni.getAppBaseInfo === "function" ? uni.getAppBaseInfo() : {}) || {}

  info = merge(deviceInfo, windowInfo, appBaseInfo) as SystemInfo
  // #endif

  // #ifndef MP-WEIXIN
  info = uni.getSystemInfoSync() as SystemInfo
  // #endif

  return info
}
