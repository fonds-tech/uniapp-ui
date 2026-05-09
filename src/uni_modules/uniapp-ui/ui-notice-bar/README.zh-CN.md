# UiNoticeBar 组件

## 介绍

UiNoticeBar 通知栏，支持水平滚动与垂直轮播两种模式，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-notice-bar text="这是一条通知" />
</template>
```

## Props

| 参数            | 说明                            | 类型                              | 默认值       | 可选值               |
| --------------- | ------------------------------- | --------------------------------- | ------------ | -------------------- |
| text            | 显示内容，vertical 模式接收数组 | string \| string[]                | ""           | -                    |
| mode            | 滚动模式                        | String as PropType<NoticeBarMode> | "horizontal" | vertical, horizontal |
| color           | 内容文本颜色                    | string                            | -            | -                    |
| speed           | 滚动速率(px/s)                  | number                            | 60           | -                    |
| interval        | 垂直滚动自动切换间隔(ms)        | number                            | 3000         | -                    |
| duration        | 垂直滚动滑动动画时长(ms)        | number                            | 500          | -                    |
| scrollable      | 是否开启滚动（含垂直自动播放）  | boolean                           | true         | -                    |
| radius          | 圆角                            | string \| number                  | -            | -                    |
| minHeight       | 最小高度                        | string \| number                  | "72rpx"      | -                    |
| fontSize        | 内容文本大小                    | string \| number                  | -            | -                    |
| fontWeight      | 内容文本粗细                    | string \| number                  | -            | -                    |
| icon            | 左侧图标名称                    | string                            | "sound"      | -                    |
| iconSize        | 左侧图标大小                    | string \| number                  | -            | -                    |
| iconColor       | 左侧图标颜色                    | string                            | -            | -                    |
| iconWeight      | 左侧图标粗细                    | string \| number                  | -            | -                    |
| rightIcon       | 右侧图标名称                    | string                            | ""           | -                    |
| rightIconSize   | 右侧图标大小                    | string \| number                  | -            | -                    |
| rightIconColor  | 右侧图标颜色                    | string                            | -            | -                    |
| rightIconWeight | 右侧图标粗细                    | string \| number                  | -            | -                    |
| background      | 背景颜色                        | string                            | -            | -                    |
| customClass     | 自定义类名                      | string                            | ""           | -                    |
| customStyle     | 自定义样式                      | string \| object                  | ""           | -                    |

## Events

| 事件名 | 说明     | 回调参数      |
| ------ | -------- | ------------- |
| click  | 点击通知 | index: number |

## Slots

| 名称  | 说明     |
| ----- | -------- |
| left  | 左侧内容 |
| right | 右侧内容 |

## CSS 变量

| 变量名                      | 默认值                     | 说明         |
| --------------------------- | -------------------------- | ------------ |
| --ui-notice-bar-min-height  | 72rpx                      | 最小高度     |
| --ui-notice-bar-radius      | 0                          | 圆角         |
| --ui-notice-bar-font-size   | var(--ui-font-size-sm)     | 文本字号     |
| --ui-notice-bar-font-weight | inherit                    | 文本粗细     |
| --ui-notice-bar-color       | var(--ui-color-warning)    | 文本颜色     |
| --ui-notice-bar-background  | var(--ui-color-warning-bg) | 背景色       |
| --ui-notice-bar-icon-color  | var(--ui-color-warning)    | 图标默认颜色 |
