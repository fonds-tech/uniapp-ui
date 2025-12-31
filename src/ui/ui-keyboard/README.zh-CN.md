# UiKeyboard 组件

## 介绍

UiKeyboard 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-keyboard />
</template>
```

## Props

| 参数                | 说明                              | 类型             | 默认值    | 可选值            |
| ------------------- | --------------------------------- | ---------------- | --------- | ----------------- |
| show                | 是否显示                          | boolean          | false     | -                 |
| title               | 标题                              | string \| number | ""        | -                 |
| mode                | 键盘类型，可选值car、card、number | string           | "number"  | car, card, number |
| maxlength           | 最大输入长度                      | string \| number | Infinity  | -                 |
| zIndex              | 元素层级                          | string \| number | ""        | -                 |
| random              | 是否打乱键盘按键的顺序            | boolean          | false     | -                 |
| overlay             | 是否显示遮罩                      | boolean          | true      | -                 |
| showDot             | 是否显示小数点按钮                | boolean          | false     | -                 |
| showHeader          | 是否显示顶部栏                    | boolean          | true      | -                 |
| showCancel          | 是否显示取消按钮                  | boolean          | true      | -                 |
| cancelText          | 关闭按钮文字                      | string           | "取消"    | -                 |
| cancelTextSize      | 关闭按钮文字大小                  | string \| number | ""        | -                 |
| cancelTextColor     | 关闭按钮文字颜色                  | string           | "error"   | -                 |
| cancelTextWeight    | 关闭按钮文字粗细                  | string \| number | ""        | -                 |
| showConfirm         | 是否显示确认按钮                  | boolean          | true      | -                 |
| confirmText         | 确认按钮文字                      | string           | "确定"    | -                 |
| confirmTextSize     | 确认按钮文字大小                  | string \| number | ""        | -                 |
| confirmTextColor    | 确认按钮文字颜色                  | string           | ""        | -                 |
| confirmTextWeight   | 确认按钮文字粗细                  | string \| number | ""        | -                 |
| background          | 背景颜色                          | string           | "#f2f3f5" | -                 |
| safeAreaInsetBottom | 是否开启底部安全区适配            | boolean          | true      | -                 |
| closeOnClickOverlay | 是否允许点击遮罩收起键盘          | boolean          | true      | -                 |
| customClass         | 自定义类名                        | string           | ""        | -                 |
| customStyle         | 自定义样式                        | string \| object | ""        | -                 |

## Events

| 事件名  | 说明 | 回调参数      |
| ------- | ---- | ------------- |
| open    | -    | -             |
| close   | -    | -             |
| cancel  | -    | -             |
| confirm | -    | -             |
| input   | -    | value: string |
| delete  | -    | -             |
| change  | -    | value: string |
| update  | -    | show: boolean |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| cancel  | -    |
| confirm | -    |
| header  | -    |
| title   | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
