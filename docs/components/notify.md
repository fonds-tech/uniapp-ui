# Notify 消息通知

顶部弹出消息通知组件。

## 基础用法

```vue
<template>
  <ui-button type="primary" @click="showBasic">基础用法</ui-button>
  <ui-notify ref="notifyRef" />
</template>

<script setup>
import { ref } from "vue"

const notifyRef = ref()

function showBasic() {
  notifyRef.value?.show({ content: "这是一条通知消息" })
}
</script>
```

## 通知类型

支持 `primary`、`success`、`warning`、`danger` 四种类型。

```vue
<script setup>
function showPrimary() {
  notifyRef.value?.show({ content: "主要通知", type: "primary" })
}

function showSuccess() {
  notifyRef.value?.show({ content: "成功通知", type: "success" })
}

function showWarning() {
  notifyRef.value?.show({ content: "警告通知", type: "warning" })
}

function showDanger() {
  notifyRef.value?.show({ content: "危险通知", type: "danger" })
}
</script>
```

## 自定义颜色

通过 `background` 和 `color` 属性自定义通知颜色。

```vue
<script setup>
function showCustom() {
  notifyRef.value?.show({
    content: "自定义颜色",
    background: "#7232dd",
    color: "#ffffff",
  })
}
</script>
```

## 自定义时长

通过 `duration` 属性设置通知显示时长（单位：毫秒）。

```vue
<script setup>
function showDuration() {
  notifyRef.value?.show({ content: "5秒后关闭", duration: 5000 })
}
</script>
```

## Props

| 参数         | 说明         | 类型                                      | 默认值    |
| ------------ | ------------ | ----------------------------------------- | --------- |
| show         | 是否显示     | `boolean`                                 | `false`   |
| type         | 类型         | `primary \| success \| warning \| danger` | `primary` |
| content      | 展示内容     | `string`                                  | -         |
| duration     | 展示时长(ms) | `string \| number`                        | `3000`    |
| color        | 字体颜色     | `string`                                  | -         |
| font-size    | 字体大小     | `string \| number`                        | -         |
| font-weight  | 字体粗细     | `string \| number`                        | -         |
| background   | 背景颜色     | `string`                                  | -         |
| z-index      | 层级         | `string \| number`                        | `2000`    |
| offset-top   | 距离顶部偏移 | `string \| number`                        | -         |
| custom-class | 自定义类名   | `string`                                  | -         |
| custom-style | 自定义样式   | `string \| object`                        | -         |

## Methods

| 方法名 | 说明     | 参数                     |
| ------ | -------- | ------------------------ |
| show   | 显示通知 | `options: NotifyOptions` |
| close  | 关闭通知 | -                        |

## NotifyOptions

| 参数         | 说明         | 类型                                      |
| ------------ | ------------ | ----------------------------------------- |
| show         | 是否显示     | `boolean`                                  |
| type         | 通知类型     | `primary \| success \| warning \| danger` |
| content      | 通知内容     | `string`                                  |
| duration     | 展示时长(ms) | `number \| string`                        |
| color        | 字体颜色     | `string`                                  |
| fontSize     | 字体大小     | `string \| number`                        |
| fontWeight   | 字体粗细     | `string \| number`                        |
| background   | 背景颜色     | `string`                                  |
| zIndex       | 层级         | `string \| number`                        |
| offsetTop    | 顶部偏移     | `string \| number`                        |
| customClass  | 自定义类名   | `string`                                  |
| customStyle  | 自定义样式   | `string \| object`                        |

## Events

| 事件名        | 说明               | 回调参数 |
| ------------- | ------------------ | -------- |
| click         | 点击通知时触发     | -        |
| open          | 打开时触发         | -        |
| opened        | 打开动画结束时触发 | -        |
| close         | 关闭时触发         | -        |
| closed        | 关闭动画结束时触发 | -        |
| update:show   | 更新显示状态       | `show: boolean` |

## Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |