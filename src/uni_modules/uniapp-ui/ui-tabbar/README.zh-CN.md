# UiTabbar 组件

## 介绍

UiTabbar 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-tabbar />
</template>
```

## Props

| 参数                | 说明                       | 类型             | 默认值    | 可选值 |
| ------------------- | -------------------------- | ---------------- | --------- | ------ |
| modelValue          | 当前选中标签的名称或索引值 | number \| string | 0         | -      |
| fixed               | 是否固定定位               | boolean          | false     | -      |
| border              | 是否显示边框线             | boolean          | true      | -      |
| zIndex              | 元素层级                   | string \| number | ""        | -      |
| activeColor         | 激活颜色                   | string           | ""        | -      |
| inactiveColor       | 未激活颜色                 | string           | ""        | -      |
| route               | 是否开启路由模式           | boolean          | false     | -      |
| height              | 高度                       | string \| number | "100rpx"  | -      |
| background          | 背景色                     | string           | "#ffffff" | -      |
| safeAreaInsetBottom | 是否开启底部安全区适配     | boolean          | true      | -      |
| customClass         | 自定义类名                 | string           | ""        | -      |
| customStyle         | 自定义样式                 | string \| object | ""        | -      |

## Events

| 事件名 | 说明 | 回调参数                |
| ------ | ---- | ----------------------- |
| rect   | -    | rect: UniApp.NodeInfo   |
| height | -    | height: number          |
| change | -    | name: string \| number  |
| update | -    | value: string \| number |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
