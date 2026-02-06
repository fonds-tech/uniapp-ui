# Dialog 对话框

模态对话框组件，用于确认、提示等场景。

## 基础用法

```vue
<script setup>
import { useDialog } from "@/uni_modules/uniapp-ui"

const { showDialog } = useDialog()

function handleClick() {
  showDialog({
    title: "提示",
    message: "这是一个提示弹窗",
  })
}
</script>
```

## 确认弹窗

设置 `showCancelButton` 显示取消按钮。

```vue
showDialog({ title: '确认', message: '确定要执行此操作吗？', showCancelButton: true })
```

## 圆角按钮

设置 `theme` 为 `round-button` 显示圆角按钮。

```vue
showDialog({ title: '提示', message: '这是圆角按钮弹窗', theme: 'round-button' })
```

## 异步关闭

通过 `beforeClose` 实现异步关闭。

```vue
showDialog({ title: '异步关闭', message: '点击确认后延迟1秒关闭', showCancelButton: true, beforeClose: (action) => { return new Promise((resolve) => { setTimeout(() => {
resolve(action === 'confirm') }, 1000) }) } })
```

## 组件调用

```vue
<template>
  <ui-dialog v-model:show="show" title="标题" message="内容" show-cancel-button />
</template>
```

## API

### Props

| 属性名                 | 说明             | 类型                      | 默认值    |
| ---------------------- | ---------------- | ------------------------- | --------- |
| v-model:show           | 是否显示         | `boolean`                 | `false`   |
| title                  | 标题             | `string`                  | -         |
| message                | 内容             | `string`                  | -         |
| width                  | 弹窗宽度         | `string \| number`        | `320px`   |
| theme                  | 主题风格         | `default \| round-button` | `default` |
| show-confirm-button    | 是否显示确认按钮 | `boolean`                 | `true`    |
| show-cancel-button     | 是否显示取消按钮 | `boolean`                 | `false`   |
| confirm-button-text    | 确认按钮文字     | `string`                  | `确认`    |
| cancel-button-text     | 取消按钮文字     | `string`                  | `取消`    |
| confirm-button-color   | 确认按钮颜色     | `string`                  | -         |
| cancel-button-color    | 取消按钮颜色     | `string`                  | -         |
| overlay                | 是否显示遮罩层   | `boolean`                 | `true`    |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean`                 | `false`   |

### Events

| 事件名  | 说明               | 回调参数 |
| ------- | ------------------ | -------- |
| confirm | 点击确认按钮时触发 | -        |
| cancel  | 点击取消按钮时触发 | -        |
| open    | 打开弹窗时触发     | -        |
| close   | 关闭弹窗时触发     | -        |

### 方法

| 方法名     | 说明       | 参数      |
| ---------- | ---------- | --------- |
| showDialog | 显示对话框 | `options` |
| hideDialog | 关闭对话框 | -         |


<!-- AUTO-PROPS-SUPPLEMENT: ui-dialog -->
## Dialog Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `show` |
| `height` |
| `content` |
| `content-align` |
| `button-reverse` |
| `overlay-style` |
| `lazy-render` |
| `padding` |
| `offset-top` |
| `async-close` |
| `z-index` |
| `duration` |
| `background` |
| `border-radius` |
| `enter-timing-function` |
| `leave-timing-function` |
| `custom-class` |
| `custom-style` |

<!-- AUTO-EVENTS-SUPPLEMENT: ui-dialog -->
## Dialog Events 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 事件名 |
| --- |
| `opened` |
| `closed` |

<!-- AUTO-METHODS-SUPPLEMENT: ui-dialog -->
## Dialog Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `alert` |

<!-- AUTO-SLOTS-SUPPLEMENT: ui-dialog -->
## Dialog Slots 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 插槽名 |
| --- |
| `footer` |
| `outside` |

