/**
 * 测试环境配置文件
 * 在每个测试文件执行前运行
 */

import { vi } from "vitest"

// Mock UniApp 全局 API
const uniMock = {
  showToast: vi.fn(),
  hideToast: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  showModal: vi.fn(),
  showActionSheet: vi.fn(),
  navigateTo: vi.fn(),
  redirectTo: vi.fn(),
  navigateBack: vi.fn(),
  switchTab: vi.fn(),
  reLaunch: vi.fn(),
  getSystemInfoSync: vi.fn(() => ({
    platform: "devtools",
    windowWidth: 375,
    windowHeight: 667,
    statusBarHeight: 20,
    safeAreaInsets: { top: 20, bottom: 34, left: 0, right: 0 },
  })),
  createSelectorQuery: vi.fn(() => ({
    select: vi.fn(() => ({
      boundingClientRect: vi.fn(() => ({
        exec: vi.fn(),
      })),
    })),
    selectAll: vi.fn(() => ({
      boundingClientRect: vi.fn(() => ({
        exec: vi.fn(),
      })),
    })),
    in: vi.fn(() => ({
      select: vi.fn(() => ({
        boundingClientRect: vi.fn(() => ({
          exec: vi.fn(),
        })),
      })),
    })),
  })),
}

// 注入全局 uni 对象
globalThis.uni = uniMock

// Mock getCurrentPages
globalThis.getCurrentPages = vi.fn(() => [
  { route: "pages/index/index" },
])

// Mock console 方法（可选）
// vi.spyOn(console, 'warn').mockImplementation(() => {})
// vi.spyOn(console, 'error').mockImplementation(() => {})
