/**
 * 测试环境配置文件
 * 在每个测试文件执行前运行
 * 参考 wot-design-uni 的测试配置最佳实践
 */

import { vi } from "vitest"
import { config } from "@vue/test-utils"

// ============================================
// 静默 Vue 警告（UniApp 组件名与 HTML 保留元素冲突）
// ============================================
const originalWarn = console.warn
console.warn = (...args: any[]) => {
  // 过滤 UniApp 内置组件的保留元素警告
  if (args[0] && typeof args[0] === "string" && args[0].includes("Do not use built-in or reserved HTML elements as component id")) {
    return
  }
  originalWarn.apply(console, args)
}

// 告诉 Vue 这些是自定义元素，避免警告
config.global.config = {
  ...config.global.config,
  compilerOptions: {
    ...config.global.config?.compilerOptions,
    isCustomElement: (tag) => ["view", "text", "image", "input", "textarea", "video", "button", "form", "label", "switch", "audio", "canvas", "map", "progress"].includes(tag),
  },
}

// ============================================
// UniApp 全局 API Mock（使用 vi.stubGlobal）
// ============================================
vi.stubGlobal("uni", {
  // 系统信息
  getSystemInfoSync: vi.fn().mockReturnValue({
    brand: "devtools",
    model: "iPhone",
    pixelRatio: 2,
    screenWidth: 375,
    screenHeight: 800,
    windowWidth: 375,
    windowHeight: 667,
    windowTop: 0,
    statusBarHeight: 20,
    language: "zh-CN",
    version: "1.0.0",
    platform: "ios",
    safeArea: { bottom: 780, height: 667, left: 0, right: 375, top: 20, width: 375 },
    safeAreaInsets: { bottom: 20, left: 0, right: 0, top: 20 },
    theme: "light",
  }),
  getWindowInfo: vi.fn().mockReturnValue({
    windowWidth: 375,
    windowHeight: 667,
    screenWidth: 375,
    screenHeight: 667,
    pixelRatio: 2,
  }),

  // SelectorQuery API
  createSelectorQuery: vi.fn().mockImplementation(() => {
    let currentSelector = ""
    let isSelectAll = false
    let boundingClientRectCallback: ((rect: any) => void) | null = null

    const mockNodeInfo = {
      id: "",
      dataset: {},
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
    }

    const mockQuery: any = {
      in: vi.fn(() => mockQuery),
      select: vi.fn((selector) => {
        currentSelector = selector
        isSelectAll = false
        return mockQuery
      }),
      selectAll: vi.fn((selector) => {
        currentSelector = selector
        isSelectAll = true
        return mockQuery
      }),
      selectViewport: vi.fn(() => mockQuery),
      boundingClientRect: vi.fn((callback) => {
        boundingClientRectCallback = callback
        return mockQuery
      }),
      scrollOffset: vi.fn(() => mockQuery),
      fields: vi.fn(() => mockQuery),
      exec: vi.fn((callback) => {
        const result = isSelectAll ? [mockNodeInfo, mockNodeInfo] : mockNodeInfo
        boundingClientRectCallback?.(result)
        callback?.([result])
        return Promise.resolve([result])
      }),
    }
    return mockQuery
  }),

  // IntersectionObserver API
  createIntersectionObserver: vi.fn().mockImplementation(() => ({
    relativeTo: vi.fn().mockReturnThis(),
    relativeToViewport: vi.fn().mockReturnThis(),
    observe: vi.fn((selector, callback) => {
      callback?.({
        intersectionRatio: 0.5,
        intersectionRect: { width: 100, height: 100, top: 0, left: 0 },
        boundingClientRect: { width: 100, height: 100, top: 0, left: 0 },
      })
    }),
    disconnect: vi.fn(),
  })),

  // Toast/Loading API
  showToast: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "showToast:ok" })
  }),
  hideToast: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "hideToast:ok" })
  }),
  showLoading: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "showLoading:ok" })
  }),
  hideLoading: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "hideLoading:ok" })
  }),
  showModal: vi.fn().mockImplementation((options) => {
    options?.success?.({ confirm: true, cancel: false })
    options?.complete?.()
    return Promise.resolve({ confirm: true, cancel: false, errMsg: "showModal:ok" })
  }),
  showActionSheet: vi.fn().mockImplementation((options) => {
    options?.success?.({ tapIndex: 0 })
    options?.complete?.()
    return Promise.resolve({ tapIndex: 0, errMsg: "showActionSheet:ok" })
  }),

  // 路由 API
  navigateTo: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "navigateTo:ok" })
  }),
  redirectTo: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "redirectTo:ok" })
  }),
  navigateBack: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "navigateBack:ok" })
  }),
  switchTab: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "switchTab:ok" })
  }),
  reLaunch: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "reLaunch:ok" })
  }),

  // 存储 API
  setStorageSync: vi.fn(),
  getStorageSync: vi.fn(() => ""),
  removeStorageSync: vi.fn(),
  setStorage: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "setStorage:ok" })
  }),
  getStorage: vi.fn().mockImplementation((options) => {
    options?.success?.({ data: "" })
    options?.complete?.()
    return Promise.resolve({ data: "", errMsg: "getStorage:ok" })
  }),

  // 图片 API
  chooseImage: vi.fn().mockImplementation((options) => {
    options?.success?.({
      tempFilePaths: ["https://example.com/image.jpg"],
      tempFiles: [{ path: "https://example.com/image.jpg", size: 1024 }],
    })
    options?.complete?.()
    return Promise.resolve({ tempFilePaths: ["https://example.com/image.jpg"] })
  }),
  previewImage: vi.fn().mockImplementation((options) => {
    options?.success?.({ errMsg: "previewImage:ok" })
    options?.complete?.()
    return Promise.resolve({ errMsg: "previewImage:ok" })
  }),
  getImageInfo: vi.fn().mockImplementation((options) => {
    options?.success?.({ width: 800, height: 600, path: options.src, type: "png" })
    options?.complete?.()
    return Promise.resolve({ width: 800, height: 600, path: options.src })
  }),
  saveImageToPhotosAlbum: vi.fn().mockImplementation((options) => {
    options?.success?.({ errMsg: "saveImageToPhotosAlbum:ok" })
    options?.complete?.()
    return Promise.resolve({ errMsg: "saveImageToPhotosAlbum:ok" })
  }),

  // 网络请求
  request: vi.fn().mockImplementation((options) => {
    options?.success?.({ data: {}, statusCode: 200 })
    options?.complete?.()
    return { abort: vi.fn() }
  }),
  uploadFile: vi.fn().mockImplementation((options) => {
    options?.success?.({ data: "{}", statusCode: 200 })
    options?.complete?.()
    return { onProgressUpdate: vi.fn(), abort: vi.fn() }
  }),
  downloadFile: vi.fn().mockImplementation((options) => {
    options?.success?.({ tempFilePath: "/temp/file.png", statusCode: 200 })
    options?.complete?.()
    return { onProgressUpdate: vi.fn(), abort: vi.fn() }
  }),

  // 页面滚动
  pageScrollTo: vi.fn().mockImplementation((options) => {
    options?.success?.({ errMsg: "pageScrollTo:ok" })
    options?.complete?.()
    return Promise.resolve({ errMsg: "pageScrollTo:ok" })
  }),
  stopPullDownRefresh: vi.fn(),

  // 振动反馈
  vibrateShort: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "vibrateShort:ok" })
  }),
  vibrateLong: vi.fn().mockImplementation((options) => {
    options?.success?.()
    options?.complete?.()
    return Promise.resolve({ errMsg: "vibrateLong:ok" })
  }),

  // 能力检测
  canIUse: vi.fn().mockReturnValue(true),

  // Canvas API
  createCanvasContext: vi.fn().mockReturnValue({
    setFillStyle: vi.fn(),
    setStrokeStyle: vi.fn(),
    setLineWidth: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    clearRect: vi.fn(),
    draw: vi.fn((_, callback) => callback?.()),
    scale: vi.fn(),
    fillRect: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
  }),
  canvasToTempFilePath: vi.fn().mockImplementation((options) => {
    options?.success?.({ tempFilePath: "temp-canvas.png" })
    options?.complete?.()
  }),
})

// 全局函数 Mock
vi.stubGlobal("getCurrentPages", vi.fn(() => [{ route: "pages/index/index", $vm: {}, $getAppWebview: vi.fn() }]))
vi.stubGlobal("getApp", vi.fn(() => ({ globalData: {} })))

// ============================================
// UniApp 生命周期 Mock
// ============================================
vi.stubGlobal("onLaunch", vi.fn())
vi.stubGlobal("onShow", vi.fn())
vi.stubGlobal("onHide", vi.fn())
vi.stubGlobal("onUnload", vi.fn())
vi.stubGlobal("onError", vi.fn())

// Mock @dcloudio/uni-app 生命周期钩子
vi.mock("@dcloudio/uni-app", () => ({
  onShow: vi.fn(),
  onHide: vi.fn(),
  onLaunch: vi.fn(),
  onUnload: vi.fn(),
  onError: vi.fn(),
  onPageScroll: vi.fn(),
  onReachBottom: vi.fn(),
  onPullDownRefresh: vi.fn(),
}))

// ============================================
// UniApp 内置组件配置
// ============================================
const uniappBuiltInComponents: Record<string, any> = {
  // 视图容器
  view: { name: "uni-view", template: "<div><slot></slot></div>" },
  "scroll-view": {
    name: "uni-scroll-view",
    template: "<div class=\"scroll-view\"><slot></slot></div>",
    props: ["scroll-y", "scroll-x", "scroll-top", "scroll-left", "scroll-into-view"],
  },
  swiper: {
    name: "uni-swiper",
    template: "<div class=\"swiper\"><slot></slot></div>",
    props: ["indicator-dots", "autoplay", "interval", "duration", "circular"],
  },
  "swiper-item": { name: "uni-swiper-item", template: "<div class=\"swiper-item\"><slot></slot></div>" },
  "cover-view": { name: "uni-cover-view", template: "<div class=\"cover-view\"><slot></slot></div>" },
  "cover-image": { name: "uni-cover-image", template: "<img class=\"cover-image\" />" },
  "movable-area": { name: "uni-movable-area", template: "<div class=\"movable-area\"><slot></slot></div>" },
  "movable-view": { name: "uni-movable-view", template: "<div class=\"movable-view\"><slot></slot></div>" },

  // 基础内容
  text: { name: "uni-text", template: "<span><slot></slot></span>" },
  "rich-text": { name: "uni-rich-text", template: "<div class=\"rich-text\"></div>" },
  icon: { name: "uni-icon", template: "<i class=\"icon\"></i>" },
  progress: { name: "uni-progress", template: "<div class=\"progress\"></div>" },

  // 表单组件
  button: { name: "uni-button", template: "<button><slot></slot></button>" },
  input: {
    name: "uni-input",
    template: "<input />",
    props: ["value", "type", "password", "placeholder", "disabled", "maxlength"],
    emits: ["input", "focus", "blur", "confirm"],
  },
  textarea: {
    name: "uni-textarea",
    template: "<textarea></textarea>",
    props: ["value", "placeholder", "disabled", "maxlength"],
    emits: ["input", "focus", "blur", "confirm"],
  },
  checkbox: { name: "uni-checkbox", template: "<input type=\"checkbox\" class=\"checkbox\" />" },
  "checkbox-group": { name: "uni-checkbox-group", template: "<div class=\"checkbox-group\"><slot></slot></div>" },
  radio: { name: "uni-radio", template: "<input type=\"radio\" class=\"radio\" />" },
  "radio-group": { name: "uni-radio-group", template: "<div class=\"radio-group\"><slot></slot></div>" },
  picker: { name: "uni-picker", template: "<div class=\"picker\"><slot></slot></div>" },
  "picker-view": {
    name: "uni-picker-view",
    template: "<div class=\"picker-view\"><slot></slot></div>",
    props: ["value", "range", "range-key"],
    emits: ["change"],
  },
  "picker-view-column": { name: "uni-picker-view-column", template: "<div class=\"picker-view-column\"><slot></slot></div>" },
  slider: { name: "uni-slider", template: "<input type=\"range\" class=\"slider\" />" },
  switch: { name: "uni-switch", template: "<input type=\"checkbox\" class=\"switch\" />" },
  label: { name: "uni-label", template: "<label><slot></slot></label>" },
  form: { name: "uni-form", template: "<form><slot></slot></form>" },
  editor: { name: "uni-editor", template: "<div class=\"editor\"></div>" },

  // 导航
  navigator: { name: "uni-navigator", template: "<a><slot></slot></a>" },

  // 媒体组件
  image: { name: "uni-image", template: "<img><slot></slot></img>", props: ["src", "mode", "lazy-load"] },
  video: {
    name: "uni-video",
    template: "<video></video>",
    props: ["src", "poster", "controls", "autoplay", "loop"],
    emits: ["play", "pause", "ended", "timeupdate"],
  },
  audio: { name: "uni-audio", template: "<audio></audio>" },
  camera: { name: "uni-camera", template: "<div class=\"camera\"></div>" },
  "live-player": { name: "uni-live-player", template: "<div class=\"live-player\"></div>" },
  "live-pusher": { name: "uni-live-pusher", template: "<div class=\"live-pusher\"></div>" },

  // 地图
  map: { name: "uni-map", template: "<div class=\"map\"></div>" },

  // 画布
  canvas: { name: "uni-canvas", template: "<canvas class=\"canvas\"></canvas>" },

  // 开放能力
  "web-view": { name: "uni-web-view", template: "<iframe class=\"web-view\"></iframe>" },
  "open-data": { name: "uni-open-data", template: "<div class=\"open-data\"></div>" },
  ad: { name: "uni-ad", template: "<div class=\"ad\"></div>" },

  // block 组件
  block: { name: "block", template: "<div><slot></slot></div>" },
}

// 使用 config.global.components 注册（wot-design-uni 的做法）
config.global.components = {
  ...uniappBuiltInComponents,
}

// 同时设置 stubs 以确保兼容性
config.global.stubs = {
  ...uniappBuiltInComponents,
  // UI 组件 stub
  "ui-icon": {
    name: "ui-icon",
    // eslint-disable-next-line no-template-curly-in-string
    template: "<i class=\"ui-icon\" :class=\"`ui-icon-${name}`\"></i>",
    props: ["name", "color", "size", "weight", "lineHeight", "radius", "background", "customClass", "customStyle"],
  },
  "ui-loading": {
    name: "ui-loading",
    template: "<span class=\"ui-loading\"><slot /></span>",
    props: ["show", "type", "size", "color", "text", "textColor", "textSize", "vertical", "customClass", "customStyle"],
  },
}

// ============================================
// 全局 provide/inject Mock
// ============================================
config.global.provide = {
  // 可在此添加全局 provide
}

// ============================================
// 触摸事件 Mock
// ============================================
class MockTouchEvent extends Event {
  touches: Array<{ clientX: number; clientY: number }>
  constructor(type: string, options: any = {}) {
    super(type, options)
    this.touches = options.touches || [{ clientX: 0, clientY: 0 }]
  }
}
vi.stubGlobal("TouchEvent", MockTouchEvent)

// ============================================
// CSS 变量注入
// ============================================
if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = `
    :root {
      --ui-color-primary: #1989fa;
      --ui-color-success: #07c160;
      --ui-color-warning: #ff976a;
      --ui-color-danger: #ee0a24;
      --ui-color-info: #909399;
      --ui-color-background: #ffffff;
      --ui-color-text-main: #323233;
      --ui-color-text-secondary: #969799;
      --ui-color-border: #ebedf0;
      --ui-size-mini: 48rpx;
      --ui-size-small: 64rpx;
      --ui-size-normal: 88rpx;
      --ui-size-medium: 96rpx;
      --ui-size-large: 104rpx;
      --ui-font-size-sm: 24rpx;
      --ui-font-size-md: 28rpx;
      --ui-font-size-lg: 32rpx;
      --ui-radius-md: 8rpx;
      --ui-radius-round: 9999px;
      --ui-spacing-sm: 8rpx;
      --ui-border-width: 1rpx;
      --ui-border-width-thick: 2rpx;
      --ui-transition-fast: 0.2s;
      --ui-transition-timing: ease-out;
      --ui-opacity-disabled: 0.5;
      --ui-opacity-active: 0.7;
      --ui-opacity-light: 0.1;
    }
  `
  document.head.appendChild(style)
}
