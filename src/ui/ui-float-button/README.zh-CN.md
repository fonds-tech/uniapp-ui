# UiFloatButton 组件

## 介绍

UiFloatButton 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-float-button />
</template>
```

## Props

| 参数           | 说明                       | 类型                                                  | 默认值                              | 可选值                                         |
| -------------- | -------------------------- | ----------------------------------------------------- | ----------------------------------- | ---------------------------------------------- |
| icon           | 图标名称                   | makeStringProp("plus")                                | -                                   | -                                              |
| text           | 按钮文本，为空时只显示图标 | string                                                | ""                                  | -                                              |
| type           | 按钮类型                   | string                                                | "primary"                           | primary, success, warning, danger, default     |
| size           | 按钮尺寸                   | makeNumericProp("100rpx")                             | -                                   | -                                              |
| width          | 按钮宽度，优先级高于size   | numericProp                                           | -                                   | -                                              |
| height         | 按钮高度，优先级高于size   | numericProp                                           | -                                   | -                                              |
| position       | 位置                       | string                                                | "right-bottom"                      | left-bottom, right-bottom, left-top, right-top |
| right          | 距离右侧的距离             | makeNumericProp("24rpx")                              | -                                   | -                                              |
| bottom         | 距离底部的距离             | makeNumericProp("100rpx")                             | -                                   | -                                              |
| left           | 距离左侧的距离             | numericProp                                           | -                                   | -                                              |
| top            | 距离顶部的距离             | numericProp                                           | -                                   | -                                              |
| zIndex         | 元素层级                   | makeNumericProp(100)                                  | -                                   | -                                              |
| color          | 自定义背景色               | string                                                | ""                                  | -                                              |
| iconColor      | 图标颜色                   | makeStringProp("#fff")                                | -                                   | -                                              |
| iconSize       | 图标大小                   | makeNumericProp("40rpx")                              | -                                   | -                                              |
| textColor      | 文本颜色                   | makeStringProp("#fff")                                | -                                   | -                                              |
| textSize       | 文本大小                   | numericProp                                           | -                                   | -                                              |
| shadow         | 阴影样式，传入box-shadow值 | string                                                | "0 4rpx 16rpx 0 rgba(0, 0, 0, 0.2)" | -                                              |
| borderRadius   | 圆角大小                   | numericProp                                           | -                                   | -                                              |
| disabled       | 是否禁用                   | boolean                                               | false                               | -                                              |
| loading        | 是否加载中                 | boolean                                               | false                               | -                                              |
| safeAreaBottom | 是否适配底部安全区域       | boolean                                               | true                                | -                                              |
| customClass    | 自定义类名                 | string                                                | ""                                  | -                                              |
| customStyle    | 自定义样式                 | [String, Object] as PropType<string \| CSSProperties> | ""                                  | -                                              |

## Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| click  | -    | -        |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
