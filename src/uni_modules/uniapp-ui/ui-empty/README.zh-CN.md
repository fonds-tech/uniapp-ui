# UiEmpty 组件

## 介绍

UiEmpty 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-empty />
</template>
```

## Props

| 参数        | 说明                                                                    | 类型             | 默认值     | 可选值 |
| ----------- | ----------------------------------------------------------------------- | ---------------- | ---------- | ------ |
| show        | 是否显示                                                                | boolean          | true       | -      |
| icon        | 图标内容（含 `/` 或 `.` 视为图片 URL，否则视为 ui-icon 名；空走默认图） | string           | ""         | -      |
| text        | 文本内容                                                                | string           | "暂无数据" | -      |
| textSize    | 文本大小                                                                | string \| number | ""         | -      |
| textColor   | 文本颜色                                                                | string           | ""         | -      |
| textWeight  | 文本粗细                                                                | string \| number | ""         | -      |
| iconSize    | 图标大小（image 模式下为宽度，高度由 widthFix 自适应）                  | string \| number | "300rpx"   | -      |
| iconColor   | 图标颜色（仅 ui-icon 模式生效）                                         | string           | ""         | -      |
| iconWeight  | 图标粗细（仅 ui-icon 模式生效）                                         | string \| number | ""         | -      |
| margin      | 外边距                                                                  | string \| number | ""         | -      |
| padding     | 内边距                                                                  | string \| number | ""         | -      |
| customClass | 自定义类名                                                              | string           | ""         | -      |
| customStyle | 自定义样式                                                              | string \| object | ""         | -      |

## Slots

| 名称   | 说明               |
| ------ | ------------------ |
| icon   | 替换图标           |
| text   | 替换文本           |
| footer | 底部内容（按钮等） |
