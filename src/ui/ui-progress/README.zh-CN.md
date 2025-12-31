# UiProgress 组件

## 介绍

UiProgress 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-progress />
</template>
```

## Props

| 参数        | 说明                 | 类型             | 默认值  | 可选值 |
| ----------- | -------------------- | ---------------- | ------- | ------ |
| percentage  | 进度百分比           | number \| string | 0       | -      |
| color       | 进度条的颜色         | string           | ""      | -      |
| background  | 进度条背景色         | string           | ""      | -      |
| text        | 进度文本内容         | string           | ""      | -      |
| showText    | 是否显示进度文本内容 | boolean          | true    | -      |
| textColor   | 进度文本颜色         | string           | ""      | -      |
| textSize    | 进度文本大小         | string \| number | ""      | -      |
| textWeight  | 进度文本粗细         | string \| number | ""      | -      |
| height      | 进度条的高度         | number \| string | "24rpx" | -      |
| customClass | 自定义类名           | string           | ""      | -      |
| customStyle | 自定义样式           | string \| object | ""      | -      |

## Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| finish | -    | -        |

## Slots

| 名称 | 说明 |
| ---- | ---- |
| text | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
