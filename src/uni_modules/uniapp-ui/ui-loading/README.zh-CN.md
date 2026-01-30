# UiLoading 组件

## 介绍

UiLoading 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-loading />
</template>
```

## Props

| 参数        | 说明             | 类型                                                  | 默认值 | 可选值 |
| ----------- | ---------------- | ----------------------------------------------------- | ------ | ------ |
| show        | 是否显示         | truthProp                                             | -      | -      |
| type        | 类型             | makeStringProp<LoadingType>("circular")               | -      | -      |
| size        | 大小             | makeNumericProp("32rpx")                              | -      | -      |
| color       | 颜色             | makeStringProp("#999999")                             | -      | -      |
| text        | 文本内容         | string                                                | -      | -      |
| textGap     | 文本和图标的间距 | makeNumericProp("12rpx")                              | -      | -      |
| textSize    | 文本大小         | [Number, String]                                      | -      | -      |
| textColor   | 文本颜色         | string                                                | -      | -      |
| textWeight  | 文本粗细         | [Number, String]                                      | -      | -      |
| vertical    | 垂直布局         | boolean                                               | -      | -      |
| customClass | 自定义类名       | string                                                | -      | -      |
| customStyle | 自定义样式       | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
| icon    | -    |
