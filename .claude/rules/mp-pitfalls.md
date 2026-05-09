---
paths:
  - "src/uni_modules/uniapp-ui/**/*.{vue,ts}"
  - "src/pages/**/*.vue"
---

# UniApp / 小程序踩坑规则

跨端项目（H5 / 微信小程序 / App）反复踩到的陷阱集合。新组件 / 新 hook 写之前先扫一遍。

## Slot 内容检测

**禁用** `v-if="slots.xxx"` / `!!slots.xxx` 判断 slot 是否提供内容。

**原因:**

- MP 编译期 slot 静态注册，slot 函数引用永远存在
- `<template v-if="cond" #x>` 在 MP 下 v-if=false 时 slot 函数仍挂载
- `slots.xxx` 永远 truthy → 配套的 `v-else-if` 永不触发

**正确做法:** 用项目封装的 `useHasSlot` hook：

```ts
import { useHasSlot } from "../hooks"

const hasFooter = useHasSlot("footer")
// template: <view v-if="hasFooter">...</view>
```

模板用 `v-if="hasXxxSlot"` 替代 `v-if="slots.xxx"`。

Hook 实现位于 `src/uni_modules/uniapp-ui/hooks/useHasSlot.ts`，内部调 slot 函数取 VNode 数组并过滤占位节点：

- HTML 标签 / 组件：`typeof n.type` 是 `"string"` / `"object"` / `"function"` → 有内容
- 占位节点：`typeof n.type === "symbol"` 含三种子情况：
  - **Text VNode**（纯文本 slot 如 `<x>hello</x>`）：`children` 是**字符串**，非空即有内容
  - **Fragment**（v-for 包裹）：`children` 是数组，递归
  - **Comment**（v-if=false 占位）：`children` 既非数组也非字符串 → 无内容

**禁止再写 inline helper**。已有 8 个组件统一改用 hook，新组件直接走 hook。

**易错点：** 不要漏 Text VNode 分支。早期错误模板 `Array.isArray(n.children) && check(n.children)` 会把字符串 children 误判为空，导致纯文本 slot（如 `<ui-button>点击</ui-button>`）渲染失败。Hook 内已正确处理。

## 跨组件 color 继承

子组件 + `<style scoped>` + `virtualHost: true` 三件套下，父级 `color` 通过 CSS cascade 传到子组件内 `<text>` / `<text>::before` **不稳定**（MP 表现尤甚）。

**正确做法:**

- 组件需要默认色时，给子组件**传 CSS var 字符串作 prop**，显式落 inline 样式
  ```vue
  <ui-icon :color="props.iconColor || 'var(--ui-xxx-icon-color)'" />
  ```
- 不要在父 SCSS 写 `color: var(...)` 后期望子组件 inherit 拿到
- ui-icon 等用 `:before` content + iconfont 的组件尤其敏感（pseudo 元素继承链可能断在 scoped 边界）

## uni-mp-vue 运行时缺导出

`vue` 包的 `Text` / `Comment` Symbol 在 MP 端**不导出**，`import { Text, Comment } from "vue"` 触发 rollup 编译报错。

**正确做法:**

- 判 VNode 类型用 `typeof n.type === "symbol"` 替代具名 Symbol 引用
- Fragment / Comment / Static 等占位节点 type 都是 Symbol；业务节点 type 是 string（HTML 标签）或 object（组件）
- 写运行时检测代码前对 `vue` 公开 API 留意 MP 兼容性，遇到 import 报错优先查 uni-mp-vue 的导出列表

## WXSS 选择器限制

WeChat MP WXSS **不支持** 通用选择器 `*` 与样式穿透 `:deep()` / `>>>` / `/deep/`。

**正确做法:**

- 需要选直接子元素时枚举常见标签：`> view, > text, > image, > button, > navigator, > scroll-view, > swiper, > input, > textarea, > label`
- 跨组件定制走子组件暴露的 `customClass` / `customStyle` / CSS var props
- ESLint 已对 :deep 类语法报错，忽视会导致小程序与 H5 行为分裂

## VNode `typeof type` 判定速查

| `typeof n.type`              | 含义                          | 算"有内容"?    |
| ---------------------------- | ----------------------------- | -------------- |
| `"string"`                   | HTML 标签（如 `view`/`text`） | ✓              |
| `"object"` / `"function"`    | 组件定义                      | ✓              |
| `"symbol"` + string children | Text VNode（纯文本 slot）     | 非空字符串 → ✓ |
| `"symbol"` + array children  | Fragment                      | 递归 children  |
| `"symbol"` + 其他            | Comment / Static 占位         | ✗              |
