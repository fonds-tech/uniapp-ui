# UiTextEllipsis 组件

## 介绍

UiTextEllipsis 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-text-ellipsis />
</template>
```

## Props

| 参数              | 说明                                           | 类型                                                  | 默认值 | 可选值 |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------- | ------ | ------ |
| text              | 文本内容                                       | string                                                | -      | -      |
| rows              | 展示的行数                                     | makeNumericProp(2)                                    | -      | -      |
| dots              | 省略号的文本内容                               | makeStringProp("...")                                 | -      | -      |
| color             | 文字颜色                                       | string                                                | -      | -      |
| weight            | 文字粗细                                       | numericProp                                           | -      | -      |
| lineHeight        | 文字行高                                       | numericProp                                           | -      | -      |
| offset            | 字数偏移，当操作按钮显示不准确时，可以调整此值 | numericProp                                           | -      | -      |
| expandText        | 展开操作的文案                                 | makeStringProp("展开")                                | -      | -      |
| expandTextColor   | 展开操作的文案颜色                             | string                                                | -      | -      |
| collapseText      | 收起操作的文案                                 | makeStringProp("收起")                                | -      | -      |
| collapseTextColor | 收起操作的文案颜色                             | string                                                | -      | -      |
| customClass       | 自定义类名                                     | string                                                | -      | -      |
| customStyle       | 自定义样式                                     | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| click  | -    | -        |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
