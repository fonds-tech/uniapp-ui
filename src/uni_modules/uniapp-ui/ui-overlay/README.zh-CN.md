# UiOverlay 组件

## 介绍

UiOverlay 遮罩层，覆盖全屏，淡入淡出。属性以源码注释为准。

## 代码演示

```vue
<template>
  <ui-button @click="show = true">显示遮罩</ui-button>
  <ui-overlay v-model:show="show" @click="show = false" />
</template>
```

## Props

| 参数                | 说明                      | 类型             | 默认值     | 可选值 |
| ------------------- | ------------------------- | ---------------- | ---------- | ------ |
| show                | 是否显示                  | boolean          | false      | -      |
| zIndex              | 元素层级                  | string \| number | 自动分配   | -      |
| opacity             | 透明度                    | number           | 0.7        | -      |
| duration            | 过渡时长 (ms)             | string \| number | 300        | -      |
| lazyRender          | 显示时才渲染节点          | boolean          | true       | -      |
| enterTimingFunction | 进入动画函数              | string           | "ease-out" | -      |
| leaveTimingFunction | 离开动画函数              | string           | "ease-in"  | -      |
| background          | 背景色 (覆盖默认半透明黑) | string           | -          | -      |
| customClass         | 自定义类名                | string           | ""         | -      |
| customStyle         | 自定义样式                | string \| object | ""         | -      |

## Events

| 事件名      | 说明          | 回调参数      |
| ----------- | ------------- | ------------- |
| update:show | show 双向绑定 | show: boolean |
| open        | 弹层打开      | -             |
| opened      | 打开动画结束  | -             |
| close       | 弹层关闭      | -             |
| closed      | 关闭动画结束  | -             |
| click       | 点击遮罩      | -             |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 遮罩内嵌内容 |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| open   | 打开 | -    |
| close  | 关闭 | -    |

## CSS 变量

| 变量名                  | 默认值                                   | 说明   |
| ----------------------- | ---------------------------------------- | ------ |
| --ui-overlay-opacity    | 0.7                                      | 透明度 |
| --ui-overlay-background | rgba(0, 0, 0, var(--ui-overlay-opacity)) | 背景色 |
| --ui-overlay-z-index    | 自动                                     | 层级   |
