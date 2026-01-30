# UiCell 组件

## 介绍

UiCell 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-cell />
</template>
```

## Props

| 参数            | 说明                 | 类型                                                  | 默认值 | 可选值 |
| --------------- | -------------------- | ----------------------------------------------------- | ------ | ------ |
| icon            | 图标                 | string                                                | -      | -      |
| title           | 标题                 | string                                                | -      | -      |
| label           | 描述                 | string                                                | -      | -      |
| value           | 内容                 | string                                                | -      | -      |
| height          | 高度                 | [Number, String]                                      | -      | -      |
| padding         | 内边距               | [Number, String]                                      | -      | -      |
| background      | 背景颜色             | string                                                | -      | -      |
| iconGap         | 图标和右侧内容间隔   | string                                                | -      | -      |
| iconSize        | 图标大小             | [Number, String]                                      | -      | -      |
| iconColor       | 图标颜色             | string                                                | -      | -      |
| iconWeight      | 图标粗细             | [Number, String]                                      | -      | -      |
| titleSize       | 标题大小             | [Number, String]                                      | -      | -      |
| titleColor      | 标题颜色             | string                                                | -      | -      |
| titleWeight     | 标题粗细             | [Number, String]                                      | -      | -      |
| labelGap        | 描述信息顶部间隔     | [Number, String]                                      | -      | -      |
| labelSize       | 描述信息大小         | [Number, String]                                      | -      | -      |
| labelColor      | 描述信息颜色         | string                                                | -      | -      |
| labelWeight     | 描述信息粗细         | [Number, String]                                      | -      | -      |
| valueSize       | 内容大小             | [Number, String]                                      | -      | -      |
| valueColor      | 内容颜色             | string                                                | -      | -      |
| valueWeight     | 内容粗细             | [Number, String]                                      | -      | -      |
| rightIcon       | 右侧图标             | makeStringProp("arrow")                               | -      | -      |
| rightIconGap    | 右侧图标距离左边间隔 | string                                                | -      | -      |
| rightIconSize   | 右侧图标大小         | [Number, String]                                      | -      | -      |
| rightIconColor  | 右侧图标颜色         | string                                                | -      | -      |
| rightIconWeight | 右侧图标粗细         | [Number, String]                                      | -      | -      |
| url             | 跳转链接             | string                                                | -      | -      |
| linkType        | 跳转类型             | string                                                | -      | -      |
| border          | 是否显示边框         | truthProp                                             | -      | -      |
| borderColor     | 边框颜色             | string                                                | -      | -      |
| borderLeft      | 边框左侧位置         | [Number, String]                                      | -      | -      |
| borderRight     | 边框右侧位置         | [Number, String]                                      | -      | -      |
| borderWidth     | 边框宽度             | [Number, String]                                      | -      | -      |
| clickable       | 是否可点击的         | truthProp                                             | -      | -      |
| isLink          | 是否为链接           | boolean                                               | -      | -      |
| center          | 是否居中对齐         | boolean                                               | -      | -      |
| customClass     | 自定义类名           | string                                                | -      | -      |
| customStyle     | 自定义样式           | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| click  | -    | -        |

## Slots

| 名称       | 说明 |
| ---------- | ---- |
| icon       | -    |
| label      | -    |
| right-icon | -    |
| title      | -    |
| value      | -    |
