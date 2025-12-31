# UiPopup 组件

## 介绍

UiPopup 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-popup />
</template>
```

## Props

| 参数                | 说明                                                                  | 类型                                                  | 默认值 | 可选值 |
| ------------------- | --------------------------------------------------------------------- | ----------------------------------------------------- | ------ | ------ |
| show                | 是否显示                                                              | boolean                                               | -      | -      |
| mode                | 显示模式，可选值 top, bottom, left, right, center                     | makeStringProp<PopupMode>("bottom")                   | -      | -      |
| width               | 宽度                                                                  | numericProp                                           | -      | -      |
| height              | 高度                                                                  | numericProp                                           | -      | -      |
| maxWidth            | 最大宽度                                                              | numericProp                                           | -      | -      |
| maxHeight           | 最大高度                                                              | numericProp                                           | -      | -      |
| overlay             | 是否显示遮罩层                                                        | truthProp                                             | -      | -      |
| duration            | 动画时长，单位毫秒                                                    | makeNumericProp(300)                                  | -      | -      |
| zIndex              | 元素层级                                                              | numericProp                                           | -      | -      |
| background          | 背景颜色                                                              | string                                                | -      | -      |
| closeable           | 是否显示关闭按钮                                                      | boolean                                               | -      | -      |
| closeIcon           | 关闭按钮的图标，默认为 "cross"                                        | makeStringProp("cross")                               | -      | -      |
| closeIconPosition   | 关闭按钮的位置，可选值 top-left, top-right, bottom-left, bottom-right | makeStringProp<PopupCloseIconPosition>("")            | -      | -      |
| borderRadius        | 圆角大小                                                              | makeNumericProp("16rpx")                              | -      | -      |
| closeOnClickOverlay | 点击遮罩层时是否关闭弹窗                                              | truthProp                                             | -      | -      |
| lazyRender          | 是否在显示时才渲染节点                                                | truthProp                                             | -      | -      |
| safeAreaInsetTop    | 是否开启顶部安全距离                                                  | boolean                                               | -      | -      |
| safeAreaInsetBottom | 是否开启底部安全距离                                                  | truthProp                                             | -      | -      |
| overlayStyle        | 自定义覆盖层的样式                                                    | [Object, String] as PropType<string \| CSSProperties> | -      | -      |
| customClass         | 自定义类名                                                            | string                                                | -      | -      |
| customStyle         | 自定义样式                                                            | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Events

| 事件名       | 说明 | 回调参数       |
| ------------ | ---- | -------------- |
| update       | -    | show: boolean  |
| open         | -    | -              |
| opened       | -    | -              |
| close        | -    | action: string |
| closed       | -    | action: string |
| click        | -    | -              |
| clickClose   | -    | -              |
| clickOverlay | -    | -              |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| close   | -    |
| default | -    |
| footer  | -    |
| header  | -    |
| outside | -    |
