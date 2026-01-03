# UiRate 组件

## 介绍

UiRate 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-rate />
</template>
```

## Props

| 参数          | 说明                         | 类型             | 默认值    | 可选值 |
| ------------- | ---------------------------- | ---------------- | --------- | ------ |
| modelValue    | 当前分值                     | number           | 0         | -      |
| icon          | 图标选中时的名称             | string           | "star"    | -      |
| voidIcon      | 图标未选中时的名称           | string           | "star-o"  | -      |
| count         | 最多可选数量                 | number           | 5         | -      |
| size          | 图标大小                     | string \| number | ""        | -      |
| color         | 图标选中时的颜色             | string           | "primary" | -      |
| voidColor     | 图标未选中时的颜色           | string           | "#c8c9cc" | -      |
| gutter        | 图标间距                     | string \| number | "8rpx"    | -      |
| readonly      | 是否为只读                   | boolean          | false     | -      |
| touchable     | 是否可以通过滑动手势选择评分 | boolean          | true      | -      |
| disabled      | 是否禁用                     | boolean          | false     | -      |
| disabledColor | 图标禁用时的颜色             | string           | "#c8c9cc" | -      |
| allowHalf     | 是否允许半星选择             | boolean          | false     | -      |
| iconWeight    | 图标粗细                     | string \| number | ""        | -      |
| customClass   | 自定义类名                   | string           | ""        | -      |
| customStyle   | 自定义样式                   | string \| object | ""        | -      |

## Events

| 事件名 | 说明 | 回调参数      |
| ------ | ---- | ------------- |
| change | -    | value: number |
| update | -    | value: number |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
