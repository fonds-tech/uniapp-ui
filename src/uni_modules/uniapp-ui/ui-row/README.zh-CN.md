# UiRow 组件

## 介绍

UiRow 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-row />
</template>
```

## Props

| 参数        | 说明         | 类型             | 默认值    | 可选值 |
| ----------- | ------------ | ---------------- | --------- | ------ |
| gap         | 间隔距离     | string \| number | ""        | -      |
| colGap      | 列间隔距离   | string \| number | ""        | -      |
| rowGap      | 行间隔距离   | string \| number | ""        | -      |
| align       | 垂直对齐方式 | string           | "stretch" | -      |
| justify     | 水平对齐方式 | string           | "start"   | -      |
| customClass | 自定义类名   | string           | ""        | -      |
| customStyle | 自定义样式   | string \| object | ""        | -      |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
