import { useSystemInfo } from "../hooks/useSystemInfo"

const systemInfo = useSystemInfo()
// #ifdef MP-WEIXIN
const accountInfo = uni.getAccountInfoSync()
export const appid = accountInfo.miniProgram?.appId
// #endif

// 系统名称
export const { osName } = systemInfo
// 客户端平台名称
export const { platform } = systemInfo
// 运行平台名称
export const { uniPlatform } = systemInfo
