# UiTextHighlight 组件

## 介绍

UiTextHighlight 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-text-highlight />
</template>
```

## Props

| 参数           | 说明         | 类型             | 默认值 | 可选值 |
| -------------- | ------------ | ---------------- | ------ | ------ |
| text           | 文本内容     | string           | ""     | -      |
| match          | 匹配文本内容 | string           | ""     | -      |
| color          | 文本颜色     | string           | ""     | -      |
| textRow        | 文本行数     | string \| number | "2"    | -      |
| fontSize       | 文本大小     | string \| number | ""     | -      |
| fontWeight     | 文本粗细     | string \| number | ""     | -      |
| lineHeight     | 文本行高     | string \| number | ""     | -      |
| highlightColor | 文本高亮颜色 | string           | ""     | -      |
| customClass    | 自定义类名   | string           | ""     | -      |
| customStyle    | 自定义样式   | string \| object | ""     | -      |

## Events

| 事件名      | 说明 | 回调参数                |
| ----------- | ---- | ----------------------- |
| click       | -    | value: string \| number |
| click-match | -    | value: string \| number |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
