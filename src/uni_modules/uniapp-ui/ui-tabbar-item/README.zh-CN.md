# UiTabbarItem 组件

## 介绍

UiTabbarItem 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-tabbar-item />
</template>
```

## Props

| 参数        | 说明                       | 类型             | 默认值      | 可选值 |
| ----------- | -------------------------- | ---------------- | ----------- | ------ |
| name        | 标签名称，作为匹配的标识符 | string \| number | ""          | -      |
| icon        | 图标名称或图片链接         | string           | ""          | -      |
| iconSize    | 图标大小                   | string \| number | "44rpx"     | -      |
| iconWeight  | 图标粗细                   | string \| number | ""          | -      |
| iconPrefix  | 图标前缀                   | string           | ""          | -      |
| route       | 跳转路由                   | string           | ""          | -      |
| routeParams | 跳转参数                   | object           | () => ({})  | -      |
| routeType   | 跳转类型                   | string           | "switchTab" | -      |
| customClass | 自定义类名                 | string           | ""          | -      |
| customStyle | 自定义样式                 | string \| object | ""          | -      |

## Events

| 事件名 | 说明 | 回调参数               |
| ------ | ---- | ---------------------- |
| click  | -    | name: string \| number |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
| extra   | -    |
| icon    | -    |
