# UiCol 组件

## 介绍

UiCol 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-col />
</template>
```

## Props

| 参数        | 说明               | 类型             | 默认值    | 可选值 |
| ----------- | ------------------ | ---------------- | --------- | ------ |
| span        | 栅格占据的列数     | number           | 24        | -      |
| align       | 垂直对齐方式       | string           | "stretch" | -      |
| justify     | 水平对齐方式       | string           | "start"   | -      |
| offset      | 栅格左侧的间隔格数 | number           | 0         | -      |
| customClass | 自定义类名         | string           | ""        | -      |
| customStyle | 自定义样式         | string \| object | ""        | -      |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
