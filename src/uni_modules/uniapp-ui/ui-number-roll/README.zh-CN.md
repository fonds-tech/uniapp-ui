# UiNumberRoll 组件

## 介绍

UiNumberRoll 数字滚动，每位数字独立列轮转，支持千位分隔与小数位格式化。属性以源码注释为准。

## 代码演示

```vue
<template>
  <ui-number-roll :value="1234" thousands-sep="," />
</template>
```

## Props

| 参数           | 说明                              | 类型             | 默认值 | 可选值 |
| -------------- | --------------------------------- | ---------------- | ------ | ------ |
| value          | 数字值                            | string \| number | 0      | -      |
| color          | 文字颜色                          | string           | -      | -      |
| fontSize       | 字号 (同时决定行高)               | string \| number | -      | -      |
| fontWeight     | 字重                              | string \| number | -      | -      |
| trimZero       | 去除小数末尾零                    | boolean          | true   | -      |
| thousandsSep   | 千位分隔符                        | string           | ""     | -      |
| decimalPlaces  | 小数位数                          | number           | 2      | -      |
| duration       | 过渡时长 (ms 数字 / 带单位字符串) | string \| number | -      | -      |
| timingFunction | 缓动函数                          | string           | -      | -      |
| customClass    | 自定义类名                        | string           | ""     | -      |
| customStyle    | 自定义样式                        | string \| object | ""     | -      |

## CSS 变量

| 变量名                       | 默认值                 | 说明         |
| ---------------------------- | ---------------------- | ------------ |
| --ui-number-roll-color       | var(--ui-color-text)   | 文字颜色     |
| --ui-number-roll-height      | var(--ui-font-size-md) | 行高 / 字号  |
| --ui-number-roll-font-weight | inherit                | 字重         |
| --ui-number-roll-duration    | 1.2s                   | 过渡时长     |
| --ui-number-roll-timing      | ease-out               | 过渡缓动函数 |
