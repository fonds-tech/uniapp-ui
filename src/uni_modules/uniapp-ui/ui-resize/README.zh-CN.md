# UiResize 组件

## 介绍

UiResize 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-resize />
</template>
```

## Props

| 参数        | 说明       | 类型             | 默认值 | 可选值 |
| ----------- | ---------- | ---------------- | ------ | ------ |
| width       | 初始宽度   | [Number, String] | -      | -      |
| height      | 初始高度   | [Number, String] | -      | -      |
| disabled    | 是否禁用   | boolean          | -      | -      |
| customClass | 自定义类名 | string           | ""     | -      |
| customStyle | 自定义样式 | string \| object | ""     | -      |

## Events

| 事件名 | 说明 | 回调参数    |
| ------ | ---- | ----------- |
| resize | -    | vallue: any |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
