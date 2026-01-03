# UiFooter 组件

## 介绍

UiFooter 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-footer />
</template>
```

## Props

| 参数                | 说明                 | 类型             | 默认值 | 可选值 |
| ------------------- | -------------------- | ---------------- | ------ | ------ |
| zIndex              | 元素层级             | number \| string | ""     | -      |
| offset              | 距离底部偏移         | number \| string | 0      | -      |
| background          | 背景色               | string           | ""     | -      |
| safeAreaInsetBottom | 是否开启底部安全区域 | boolean          | true   | -      |
| customClass         | 自定义类名           | string           | ""     | -      |
| customStyle         | 自定义样式           | string \| object | ""     | -      |

## Events

| 事件名 | 说明 | 回调参数              |
| ------ | ---- | --------------------- |
| rect   | -    | rect: UniApp.NodeInfo |
| height | -    | height: number        |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
