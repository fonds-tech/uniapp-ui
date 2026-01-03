# UiCountDown 组件

## 介绍

UiCountDown 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-count-down />
</template>
```

## Props

| 参数        | 说明                                           | 类型             | 默认值     | 可选值 |
| ----------- | ---------------------------------------------- | ---------------- | ---------- | ------ |
| time        | 倒计时时长，单位毫秒                           | number \| string | ""         | -      |
| format      | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | string           | "HH:mm:ss" | -      |
| autoStart   | 是否自动开始倒计时                             | boolean          | true       | -      |
| millisecond | 是否展示毫秒倒计时                             | boolean          | false      | -      |
| customClass | 自定义类名                                     | string           | ""         | -      |
| customStyle | 自定义样式                                     | string \| object | ""         | -      |

## Events

| 事件名 | 说明 | 回调参数                 |
| ------ | ---- | ------------------------ |
| finish | -    | -                        |
| change | -    | value: CountDownTimeData |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
