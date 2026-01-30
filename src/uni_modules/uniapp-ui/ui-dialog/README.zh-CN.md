# UiDialog 组件

## 介绍

UiDialog 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-dialog />
</template>
```

## Props

| 参数                | 说明                       | 类型                                                  | 默认值     | 可选值 |
| ------------------- | -------------------------- | ----------------------------------------------------- | ---------- | ------ |
| show                | 是否显示                   | boolean                                               | -          | -      |
| title               | 标题                       | string                                                | -          | -      |
| width               | 宽度                       | makeNumericProp("88vw")                               | -          | -      |
| height              | 高度                       | [Number, String]                                           | -          | -      |
| content             | 内容                       | string                                                | -          | -      |
| contentAlign        | 内容对齐方式               | makeStringProp<DialogContentAlign>("center")          | -          | -      |
| showConfirmButton   | 是否显示确认按钮           | truthProp                                             | -          | -      |
| showCancelButton    | 是否显示取消按钮           | boolean                                               | -          | -      |
| confirmButtonText   | 确认按钮文字               | makeStringProp("确认")                                | -          | -      |
| confirmButtonColor  | 确认按钮文字颜色           | makeStringProp("primary")                             | -          | -      |
| cancelButtonText    | 取消按钮文字               | makeStringProp("取消")                                | -          | -      |
| cancelButtonColor   | 取消按钮文字颜色           | string                                                | -          | -      |
| buttonReverse       | 是否对调确认和取消按钮位置 | boolean                                               | -          | -      |
| overlay             | 否显示遮罩层               | truthProp                                             | -          | -      |
| overlayStyle        | 自定义遮罩层样式           | object \| string                                      | () => ({}) | -      |
| closeOnClickOverlay | 是否点击遮罩层后关闭       | boolean                                               | -          | -      |
| lazyRender          | 是否在显示时才渲染节点     | truthProp                                             | -          | -      |
| padding             | 内边距                     | [Number, String]                                           | -          | -      |
| offsetTop           | 弹窗顶部偏移               | [Number, String]                                           | -          | -      |
| asyncClose          | 是否异步关闭               | boolean                                               | -          | -      |
| zIndex              | 元素层级                   | [Number, String]                                           | -          | -      |
| duration            | 弹窗打开过渡时间,单位毫秒  | makeNumericProp(300)                                  | -          | -      |
| background          | 背景颜色                   | string                                                | -          | -      |
| borderRadius        | 弹窗圆角                   | [Number, String]                                           | -          | -      |
| enterTimingFunction | 进入动画函数               | makeStringProp("cubic-bezier(0.5, 1.5, 0.5, 1)")      | -          | -      |
| leaveTimingFunction | 离开动画函数               | makeStringProp("cubic-bezier(0.4, 0.8, 0.74, 1)")     | -          | -      |
| customClass         | 自定义类名                 | string                                                | -          | -      |
| customStyle         | 自定义样式                 | [String, Object] as PropType<string \| CSSProperties> | -          | -      |

## Events

| 事件名       | 说明 | 回调参数                                                                                        |
| ------------ | ---- | ----------------------------------------------------------------------------------------------- |
| update       | -    | show: boolean                                                                                   |
| open         | -    | -                                                                                               |
| opened       | -    | -                                                                                               |
| close        | -    | -                                                                                               |
| closed       | -    | -                                                                                               |
| cancel       | -    | next?: { close: (action: DialogCloseAction) => void; done: (action: DialogDoneAction) => void } |
| confirm      | -    | next?: { close: (action: DialogCloseAction) => void; done: (action: DialogDoneAction) => void } |
| clickOverlay | -    | next?: { close: (action: DialogCloseAction) => void }                                           |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| cancel  | -    |
| confirm | -    |
| default | -    |
| footer  | -    |
| outside | -    |
| title   | -    |
