# UiOverlay 组件

## 介绍

UiOverlay 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-overlay />
</template>
```

## Props

| 参数                | 说明                   | 类型                                                  | 默认值 | 可选值 |
| ------------------- | ---------------------- | ----------------------------------------------------- | ------ | ------ |
| show                | 是否显示               | boolean                                               | -      | -      |
| zIndex              | 元素层级               | numericProp                                           | -      | -      |
| opacity             | 透明度                 | makeNumericProp(0.7)                                  | -      | -      |
| duration            | 过渡时间               | makeNumericProp(300)                                  | -      | -      |
| lazyRender          | 是否在显示时才渲染节点 | truthProp                                             | -      | -      |
| enterTimingFunction | 进入动画函数           | makeStringProp("ease-out")                            | -      | -      |
| leaveTimingFunction | 离开动画函数           | makeStringProp("ease-in")                             | -      | -      |
| customClass         | 自定义类名             | string                                                | -      | -      |
| customStyle         | 自定义样式             | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Events

| 事件名 | 说明 | 回调参数      |
| ------ | ---- | ------------- |
| update | -    | show: boolean |
| open   | -    | -             |
| opened | -    | -             |
| close  | -    | -             |
| closed | -    | -             |
| click  | -    | -             |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
