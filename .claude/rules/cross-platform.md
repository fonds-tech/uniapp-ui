---
paths:
  - "src/uni_modules/uniapp-ui/**/*.{vue,ts}"
  - "src/pages/**/*.vue"
---

# 跨端兼容规则

H5 / 微信等小程序 / App 三端必须表现一致。

## 模板基本元素

- ✅ `<view>` `<text>` `<image>` `<button>` `<navigator>`
- ❌ `<div>` `<span>` `<p>` `<h1>` 等 HTML 标签（小程序不支持）
- ❌ DOM-only API：`document.querySelector` / `addEventListener` 等

## 事件名

小程序端事件名**必须全小写**（无连字符无驼峰）：

```ts
emits: {
  click: () => true,
  getphonenumber: () => true,    // ✅ 全小写
  launchapp: () => true,         // ✅
  // getPhoneNumber               ❌ 驼峰小程序不识别
  // get-phone-number             ❌ 连字符不识别
}
```

参考 `ui-button/index.ts` 的 emits 命名（开放能力事件全部小写）。

## 平台差异判断

```ts
// ✅ 用 @uni-helper/uni-env
import { isH5, isMp, isApp } from "@uni-helper/uni-env"

if (isH5) {
  // H5 only
}

// ❌ 不要直接判 process.env
if (process.env.UNI_PLATFORM === "h5") { ... }
```

## 条件编译（构建期）

需要彻底排除某平台代码时用条件编译注释：

```ts
// #ifdef MP
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

// #ifndef MP-TOUTIAO
virtualHost: true,
// #endif

// #ifdef H5
window.addEventListener(...)
// #endif
```

| 平台标识                                    | 含义        |
| ------------------------------------------- | ----------- |
| `H5`                                        | H5 浏览器端 |
| `MP`                                        | 所有小程序  |
| `MP-WEIXIN` / `MP-ALIPAY` / `MP-TOUTIAO` 等 | 特定小程序  |
| `APP-PLUS` / `APP-NVUE`                     | App 端      |

## 节流 / 防抖 / DOM 测量

组件库内 hooks 优先（已做小程序适配）：

| 场景     | 用                             | 不用                                    |
| -------- | ------------------------------ | --------------------------------------- |
| 节流     | `useThrottle`                  | lodash throttle                         |
| 防抖     | `useDebounce`                  | lodash debounce                         |
| DOM 测量 | `useRect` / `useRects`         | `getBoundingClientRect`                 |
| RAF 模拟 | `useTransition`                | `requestAnimationFrame`（小程序不支持） |
| 锁滚动   | `useLockScroll`                | DOM body overflow                       |
| 拖拽     | `useDraggable`                 | 自己写 touch 事件                       |
| 单位转换 | `useUnitToPx` / `useUnitToRpx` | 手算                                    |
| 系统信息 | `useSystemInfo`                | `uni.getSystemInfoSync` 直调            |

新需求若 `@vueuse/core` 与组件 hooks 都能解，**优先组件 hooks**。

## 小程序虚拟节点

组件根 `options: { virtualHost: true }` 必备，否则外层多一层 wrapper 影响布局。

```ts
<script lang="ts">
export default {
  name: "ui-xxx",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>
```

`MP-TOUTIAO`（字节小程序）不支持 virtualHost，必须用条件编译排除。

## 胶囊按钮（小程序专用）

小程序顶部右侧固定有"胶囊按钮"。设计 navbar / 顶部组件需让出胶囊宽度：

```ts
// #ifdef MP
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// 右 padding = 屏幕宽 - 胶囊左边距 + 自定义 padding
const menuOffset = systemInfo.windowWidth - menuButtonInfo.left
const paddingPx = props.padding ? useUnitToPx(props.padding) || 0 : 0
style.paddingRight = `${menuOffset + paddingPx}px`
// #endif
```

参考 `ui-navbar` 实现。

## 状态栏

```ts
const systemInfo = useSystemInfo()
const statusBarHeight = computed(() => systemInfo.statusBarHeight)
```

fixed 顶部组件需手动撑开状态栏（小程序 `navigationStyle: "custom"` 时）。

## 安全区域

底部 / 顶部安全区（iOS 全面屏刘海 / 底部小条）：

- 顶部：`safe-area-inset-top` / `<ui-safe-area-top />`
- 底部：`safe-area-inset-bottom` / `<ui-safe-area-bottom />`
- 用 `env(safe-area-inset-*)` CSS 函数

## MP 特定坑（详见 mp-pitfalls.md）

- slot 静态注册（`v-if="slots.x"` 永远 truthy）
- 跨组件 color 继承不可靠
- WXSS 不支持 `*` 通用选择器与 `:deep()` 穿透
- uni-mp-vue 不导出 `Text` / `Comment` Symbol

参考独立规则文件 `mp-pitfalls.md`。
