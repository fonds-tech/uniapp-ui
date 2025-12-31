# UiIconText 组件

## 介绍

UiIconText 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-icon-text />
</template>
```

## Props

| 参数         | 说明                   | 类型             | 默认值        | 可选值 |
| ------------ | ---------------------- | ---------------- | ------------- | ------ |
| name         | 图标名称或者图片地址   | string           | ""            | -      |
| size         | 图标大小               | string \| number | ""            | -      |
| color        | 图标颜色               | string           | ""            | -      |
| radius       | 图标圆角               | string \| number | ""            | -      |
| weight       | 图标粗细               | string           | ""            | -      |
| text         | 文本内容               | string \| number | ""            | -      |
| textSize     | 文本大小               | string \| number | ""            | -      |
| textColor    | 文本颜色               | string           | ""            | -      |
| textWeight   | 文本粗细               | string           | ""            | -      |
| textGap      | 文本和图标的间隔       | string \| number | ""            | -      |
| textLeft     | 文本在图标左边         | boolean          | false         | -      |
| width        | 图标为图片时的宽度     | string \| number | ""            | -      |
| height       | 图标为图片时的高度     | string \| number | ""            | -      |
| imageMode    | 图标为图片时的显示模式 | string           | "scaleToFill" | -      |
| background   | 背景颜色               | string           | ""            | -      |
| customPrefix | 自定义图标名称前缀     | string           | "ui-icon"     | -      |
| customClass  | 激活时的样式           | string           | ""            | -      |
| customStyle  | 自定义样式             | string \| object | ""            | -      |

## Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| click  | -    | -        |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
