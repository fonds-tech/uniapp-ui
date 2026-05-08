# UniApp / 小程序踩坑规则

跨端项目（H5 / 微信小程序 / App）反复踩到的陷阱集合。新组件 / 新 hook 写之前先扫一遍。

## Slot 内容检测

**禁用** `v-if="slots.xxx"` / `!!slots.xxx` 判断 slot 是否提供内容。

**原因:**
- MP 编译期 slot 静态注册，slot 函数引用永远存在
- `<template v-if="cond" #x>` 在 MP 下 v-if=false 时 slot 函数仍挂载
- `slots.xxx` 永远 truthy → 配套的 `v-else-if` 永不触发

**正确做法:** 调用 slot 函数取 VNode 数组，过滤占位节点（Fragment 递归 children）：

```ts
function hasSlotContent(name: string) {
  const fn = slots[name]
  if (typeof fn !== "function") return false
  const check = (nodes: any): boolean =>
    Array.isArray(nodes) &&
    nodes.some((n) =>
      typeof n.type === "symbol"
        ? Array.isArray(n.children) && check(n.children)
        : true,
    )
  return check(fn())
}
```

模板用 `v-if="hasXxxSlot"` 替代 `v-if="slots.xxx"`。

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

| `typeof n.type` | 含义 | 算"有内容"? |
|---|---|---|
| `"string"` | HTML 标签（如 `view`/`text`） | ✓ |
| `"object"` / `"function"` | 组件定义 | ✓ |
| `"symbol"` | Fragment / Comment / Static 占位 | 仅 Fragment 递归 children；Comment 等视作空 |
