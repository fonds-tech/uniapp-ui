---
name: platform-compat-check
description: 检查代码的跨平台兼容性。在审查或重构涉及平台特定 API 的代码时应用。
---

# 平台兼容性检查规范

检查代码的跨平台兼容性问题，确保组件在 H5、小程序、App 等平台正常运行。

---

## 检查范围

### 1. Web API 使用检测

以下 API 在小程序/App 中**不可用**：

```typescript
// ❌ 禁止直接使用
document              // DOM 操作
window                // 全局对象
localStorage          // 本地存储
sessionStorage        // 会话存储
location              // URL 操作
history               // 历史记录
navigator             // 浏览器信息
fetch                 // 网络请求
XMLHttpRequest        // 网络请求
addEventListener      // 事件监听（全局）
querySelector         // DOM 查询
getElementById        // DOM 查询
createElement         // DOM 创建
```

### 2. 替代方案

| Web API | UniApp 替代方案 |
|---------|-----------------|
| `localStorage` | `uni.setStorageSync` / `uni.getStorageSync` |
| `fetch` | `uni.request` |
| `location.href` | `uni.navigateTo` / `uni.redirectTo` |
| `navigator.userAgent` | `uni.getSystemInfoSync()` |
| `document.querySelector` | `uni.createSelectorQuery()` |
| `window.scrollTo` | `uni.pageScrollTo` |
| `alert` | `uni.showToast` / `uni.showModal` |
| `confirm` | `uni.showModal` |

---

## 条件编译检查

### 正确使用条件编译

```vue
<template>
  <!-- #ifdef H5 -->
  <div class="web-only">Web 专属内容</div>
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN -->
  <view class="mp-only">微信小程序专属</view>
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <view class="non-web">非 H5 平台内容</view>
  <!-- #endif -->
</template>

<script setup lang="ts">
// #ifdef H5
import { webOnlyFunction } from "web-library"
// #endif

// #ifdef MP-WEIXIN
const wxApi = wx.getSystemInfoSync()
// #endif
</script>

<style lang="scss">
/* #ifdef H5 */
.web-specific {
  cursor: pointer;
}
/* #endif */

/* #ifdef MP-WEIXIN */
.mp-specific {
  /* 小程序特定样式 */
}
/* #endif */
</style>
```

### 条件编译语法

| 语法 | 说明 |
|------|------|
| `#ifdef PLATFORM` | 仅在指定平台编译 |
| `#ifndef PLATFORM` | 在指定平台外编译 |
| `#endif` | 结束条件 |

### 平台标识符

| 标识符 | 平台 |
|--------|------|
| `H5` | Web |
| `MP-WEIXIN` | 微信小程序 |
| `MP-ALIPAY` | 支付宝小程序 |
| `MP-BAIDU` | 百度小程序 |
| `MP-TOUTIAO` | 字节小程序 |
| `APP-PLUS` | App (iOS/Android) |
| `APP-NVUE` | App nvue 页面 |

---

## 常见兼容性问题

### 1. CSS 兼容性

```scss
// ❌ 小程序不支持
.item {
  cursor: pointer;           // 小程序无效
  user-select: none;         // 需要前缀
  position: sticky;          // 部分小程序不支持
  backdrop-filter: blur();   // 兼容性差
}

// ✅ 使用条件编译
.item {
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */

  -webkit-user-select: none;
  user-select: none;
}
```

### 2. 事件兼容性

```vue
<!-- ❌ 小程序不支持 -->
<div @mouseenter="onEnter" @mouseleave="onLeave">

<!-- ✅ 使用条件编译 -->
<!-- #ifdef H5 -->
<div @mouseenter="onEnter" @mouseleave="onLeave">
<!-- #endif -->
<!-- #ifndef H5 -->
<view @longpress="onLongPress">
<!-- #endif -->
```

### 3. 组件标签兼容性

```vue
<!-- ❌ 混用标签 -->
<div class="container">      <!-- H5 标签 -->
  <view class="item" />      <!-- 小程序标签 -->
</div>

<!-- ✅ 统一使用 view/text 等通用标签 -->
<view class="container">
  <view class="item" />
</view>
```

---

## 检查清单

代码审查时确保：

- [ ] 无直接使用 Web API（document, window 等）
- [ ] Web API 已用条件编译包裹或使用 UniApp 替代
- [ ] 条件编译语法正确（#ifdef/#ifndef/#endif 配对）
- [ ] CSS 属性跨平台兼容
- [ ] 事件处理跨平台兼容
- [ ] 使用通用标签（view, text, image 等）

---

## 自动检测命令

```bash
# 搜索可能的兼容性问题
grep -rn "document\." src/uni_modules/
grep -rn "window\." src/uni_modules/
grep -rn "localStorage" src/uni_modules/
```

---

## 测试建议

1. **H5 测试**：`pnpm dev`
2. **微信小程序测试**：`pnpm dev:mp-weixin`
3. **多平台验证**：核心功能需在至少 2 个平台验证
