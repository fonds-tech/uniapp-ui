# UiSwitch 组件

## 介绍

UiSwitch 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-switch />
</template>
```

## Props

| 参数             | 说明                 | 类型                        | 默认值 | 可选值 |
| ---------------- | -------------------- | --------------------------- | ------ | ------ |
| modelValue       | 开关选中状态         | number \| string \| boolean | false  | -      |
| size             | 开关按钮的尺寸       | number \| string            | ""     | -      |
| gutter           | 圆点与背景的间距     | number \| string            | ""     | -      |
| loading          | 是否为加载状态       | boolean                     | false  | -      |
| disabled         | 是否为禁用状态       | boolean                     | false  | -      |
| activeValue      | 打开时对应的值       | number \| string \| boolean | true   | -      |
| inactiveValue    | 关闭时对应的值       | number \| string \| boolean | false  | -      |
| activeColor      | 打开时的背景色       | string                      | ""     | -      |
| inactiveColor    | 关闭时的背景色       | string                      | ""     | -      |
| loadingIconSize  | 加载中图标大小       | number \| string            | ""     | -      |
| loadingIconColor | 加载中图标颜色       | string                      | ""     | -      |
| beforeChange     | 状态变化前的回调函数 | Function                    | -      | -      |
| customClass      | 自定义类名           | string                      | ""     | -      |
| customStyle      | 自定义样式           | string \| object            | ""     | -      |

## Events

| 事件名 | 说明 | 回调参数                           |
| ------ | ---- | ---------------------------------- |
| change | -    | value: number \| string \| boolean |
| update | -    | value: number \| string \| boolean |

## Slots

| 名称 | 说明 |
| ---- | ---- |
| node | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
