# UiConfigProvider 组件

## 介绍

UiConfigProvider 组件，用于全局配置 UI 组件的主题变量。支持通过 `themeVars` 属性自定义颜色，覆盖默认主题色。

## 代码演示

### 基础用法

```vue
<template>
  <ui-config-provider />
</template>
```

### 自定义主题色

通过 `themeVars` 属性可以覆盖默认的主题颜色：

```vue
<template>
  <ui-config-provider :theme-vars="themeVars">
    <!-- 子组件将继承自定义的主题色 -->
  </ui-config-provider>
</template>

<script setup lang="ts">
import type { ThemeVars } from "@/uni_modules/uniapp-ui"

const themeVars: ThemeVars = {
  primary: "#FF6B6B",
  success: "#4CAF50",
  warning: "#FF9800",
}
</script>
```

## Props

| 参数        | 说明                           | 类型             | 默认值 | 可选值 |
| ----------- | ------------------------------ | ---------------- | ------ | ------ |
| themeVars   | 主题变量配置，用于覆盖默认主题 | ThemeVars        | {}     | -      |
| height      | 高度                           | string \| number | ""     | -      |
| background  | 背景色                         | string           | ""     | -      |
| customClass | 自定义类名                     | string           | ""     | -      |
| customStyle | 自定义样式                     | string \| object | ""     | -      |

### ThemeVars 类型

```typescript
interface ThemeVars {
  primary?: string // 主色调
  success?: string // 成功色
  warning?: string // 警告色
  error?: string // 错误色
  info?: string // 信息色
  background?: string // 背景色
}
```

## Events

| 事件名      | 说明 | 回调参数                       |
| ----------- | ---- | ------------------------------ |
| scroll      | -    | options: Page.PageScrollOption |
| reachTop    | -    | -                              |
| reachBottom | -    | -                              |
| touchstart  | -    | event: any                     |
| touchend    | -    | event: any                     |
| touchmove   | -    | event: any                     |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
