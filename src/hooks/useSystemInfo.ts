import { merge } from "@/utils/object"

/**
 * 获取系统信息
 * @returns 系统信息对象
 */
export function useSystemInfo() {
  let info = {} as any
  // #ifdef MP-WEIXIN
  const deviceInfo = (typeof uni.getDeviceInfo === "function" ? uni.getDeviceInfo() : {}) || {}
  const windowInfo = (typeof uni.getWindowInfo === "function" ? uni.getWindowInfo() : {}) || {}
  const appBaseInfo = (typeof uni.getAppBaseInfo === "function" ? uni.getAppBaseInfo() : {}) || {}

  info = merge(deviceInfo, windowInfo, appBaseInfo)
  // #endif

  // #ifndef MP-WEIXIN
  info = uni.getSystemInfoSync()
  // #endif

  return info
}
