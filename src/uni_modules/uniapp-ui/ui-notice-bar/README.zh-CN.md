# UiNoticeBar 组件

## 介绍

UiNoticeBar 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-notice-bar />
</template>
```

## Props

| 参数            | 说明                                        | 类型                              | 默认值       | 可选值               |
| --------------- | ------------------------------------------- | --------------------------------- | ------------ | -------------------- |
| text            | 显示内容，vertical 垂直模式时要求内容为数组 | string \| array                   | ""           | -                    |
| mode            | 滚动模式                                    | String as PropType<NoticeBarMode> | "horizontal" | vertical, horizontal |
| color           | 内容文本颜色                                | string                            | ""           | -                    |
| speed           | 滚动速率(px/s)                              | number                            | 60           | -                    |
| interval        | 垂直滚动时自动切换时间间隔                  | number                            | 3000         | -                    |
| duration        | 垂直滚动时滑动动画时长                      | number                            | 500          | -                    |
| scrollable      | 是否开启滚动                                | boolean                           | true         | -                    |
| minHeight       | 最小高度                                    | string \| number                  | "80rpx"      | -                    |
| fontSize        | 内容文本大小                                | string \| number                  | ""           | -                    |
| fontWeight      | 内容文本粗细                                | string \| number                  | ""           | -                    |
| icon            | 左侧图标名称                                | string                            | "volume-o"   | -                    |
| iconSize        | 左侧图标名称                                | string \| number                  | ""           | -                    |
| iconColor       | 左侧图标颜色                                | string                            | "primary"    | -                    |
| iconWeight      | 左侧图标粗细                                | string \| number                  | ""           | -                    |
| rightIcon       | 右侧图标名称                                | string                            | ""           | -                    |
| rightIconSize   | 右侧图标名称                                | string \| number                  | ""           | -                    |
| rightIconColor  | 右侧图标颜色                                | string                            | "primary"    | -                    |
| rightIconWeight | 右侧图标粗细                                | string \| number                  | ""           | -                    |
| background      | 背景颜色                                    | string                            | ""           | -                    |
| customClass     | 自定义类名                                  | string                            | ""           | -                    |
| customStyle     | 自定义样式                                  | string \| object                  | ""           | -                    |

## Events

| 事件名 | 说明 | 回调参数      |
| ------ | ---- | ------------- |
| click  | -    | index: number |

## Slots

| 名称  | 说明 |
| ----- | ---- |
| left  | -    |
| right | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
