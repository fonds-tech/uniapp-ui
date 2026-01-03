# UiLine 组件

## 介绍

UiLine 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-line />
</template>
```

## Props

| 参数        | 说明                                        | 类型             | 默认值  | 可选值 |
| ----------- | ------------------------------------------- | ---------------- | ------- | ------ |
| color       | 线条颜色                                    | string           | ""      | -      |
| width       | 线条宽度                                    | number \| string | "100%"  | -      |
| height      | 线条高度                                    | number \| string | "2rpx"  | -      |
| type        | 线条类型 solid 实线 dashed 虚线 dotted 点线 | string           | "solid" | -      |
| vertical    | 是否为垂直线条，默认为水平线条              | boolean          | false   | -      |
| margin      | 外间距                                      | number \| string | ""      | -      |
| customClass | 自定义类名                                  | string           | ""      | -      |
| customStyle | 自定义样式                                  | string \| object | ""      | -      |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
