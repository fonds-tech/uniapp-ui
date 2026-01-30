# UiSidebar 组件

## 介绍

UiSidebar 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-sidebar />
</template>
```

## Props

| 参数        | 说明                         | 类型                                                  | 默认值 | 可选值 |
| ----------- | ---------------------------- | ----------------------------------------------------- | ------ | ------ |
| modelValue  | 绑定值                       | makeNumericProp(0)                                    | -      | -      |
| width       | 宽度                         | [Number, String]                                           | -      | -      |
| height      | 高度，默认自动               | [Number, String]                                           | -      | -      |
| duration    | 激活线条动画过渡时间，单位ms | makeNumericProp(300)                                  | -      | -      |
| background  | 背景颜色                     | string                                                | -      | -      |
| lineColor   | 激活线条颜色                 | string                                                | -      | -      |
| lineWidth   | 激活线条宽度                 | [Number, String]                                           | -      | -      |
| lineHeight  | 激活线条高度                 | makeNumericProp("40rpx")                              | -      | -      |
| lineRadius  | 激活线条圆角                 | [Number, String]                                           | -      | -      |
| showLine    | 是否显示线条                 | truthProp                                             | -      | -      |
| autoScroll  | 是否自动滚动                 | truthProp                                             | -      | -      |
| zIndex      | 元素层级                     | [Number, String]                                           | -      | -      |
| customClass | 自定义类名                   | string                                                | -      | -      |
| customStyle | 自定义样式                   | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Events

| 事件名    | 说明 | 回调参数                              |
| --------- | ---- | ------------------------------------- |
| change    | -    | name: number \| string                |
| clickItem | -    | name: number \| string, index: number |
| update    | -    | name: number \| string                |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
| line    | -    |
