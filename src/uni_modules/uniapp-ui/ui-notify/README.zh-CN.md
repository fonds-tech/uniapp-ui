# UiNotify 组件

## 介绍

UiNotify 顶部通知，支持命令式调用，配合 `useNotify` / `provideNotify` 全局共享一个实例。属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-notify ref="notifyRef" />
  <ui-button @click="onShow">显示通知</ui-button>
</template>

<script setup lang="ts">
import { useNotify, provideNotify } from "@/uni_modules/uniapp-ui"

const notifyRef = ref()
const notify = useNotify()

onMounted(() => provideNotify(notifyRef))

function onShow() {
  notify.success("操作成功")
}
</script>
```

## Props

| 参数        | 说明          | 类型                           | 默认值    | 可选值                            |
| ----------- | ------------- | ------------------------------ | --------- | --------------------------------- |
| show        | 是否显示      | boolean                        | false     | -                                 |
| type        | 通知类型      | String as PropType<NotifyType> | "primary" | primary, success, warning, danger |
| content     | 展示内容      | string                         | ""        | -                                 |
| duration    | 展示时长 (ms) | string \| number               | 3000      | -                                 |
| color       | 文字颜色      | string                         | -         | -                                 |
| fontSize    | 字号          | string \| number               | -         | -                                 |
| fontWeight  | 字重          | string \| number               | -         | -                                 |
| background  | 背景色        | string                         | -         | -                                 |
| zIndex      | 层级          | string \| number               | 2000      | -                                 |
| offsetTop   | 距离顶部偏移  | string \| number               | -         | -                                 |
| customClass | 自定义类名    | string                         | ""        | -                                 |
| customStyle | 自定义样式    | string \| object               | ""        | -                                 |

## Events

| 事件名      | 说明             | 回调参数       |
| ----------- | ---------------- | -------------- |
| open        | 弹层打开         | -              |
| opened      | 打开动画结束     | -              |
| close       | 弹层关闭         | -              |
| closed      | 关闭动画结束     | -              |
| click       | 点击通知         | -              |
| update:show | 显示状态双向绑定 | value: boolean |

## Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| default | 自定义内容，覆盖 content |

## Methods

| 方法名 | 说明     | 参数                    |
| ------ | -------- | ----------------------- |
| show   | 显示通知 | options?: NotifyOptions |
| close  | 关闭通知 | -                       |

## CSS 变量

| 变量名                  | 默认值                       | 说明     |
| ----------------------- | ---------------------------- | -------- |
| --ui-notify-color       | var(--ui-color-text-inverse) | 文字颜色 |
| --ui-notify-background  | var(--ui-color-primary)      | 背景色   |
| --ui-notify-font-size   | var(--ui-font-size-sm)       | 字号     |
| --ui-notify-font-weight | inherit                      | 字重     |
| --ui-notify-z-index     | 2000                         | 层级     |
| --ui-notify-offset-top  | 0                            | 顶部偏移 |
| --ui-notify-padding     | var(--ui-spacing-md)         | 内边距   |
