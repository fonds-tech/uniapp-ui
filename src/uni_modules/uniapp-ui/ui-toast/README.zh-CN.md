# UiToast 组件

## 介绍

轻量级消息提示组件，支持声明式调用（Props + v-model:show）和命令式调用（ref.show()）两种方式。

## 代码演示

### 声明式调用（v-model:show）

```vue
<template>
  <ui-toast v-model:show="visible" type="success" content="操作成功" />
  <button @click="visible = true">显示 Toast</button>
</template>

<script setup>
import { ref } from "vue"
const visible = ref(false)
// toast 自动关闭后 visible 会同步变为 false
</script>
```

### 命令式调用（ref.show()）

```vue
<template>
  <ui-toast ref="toastRef" />
  <button @click="showToast">显示 Toast</button>
</template>

<script setup>
import { ref } from "vue"
const toastRef = ref()

function showToast() {
  // 方式一：传入字符串
  toastRef.value.show("操作成功")

  // 方式二：传入配置对象
  toastRef.value.show({
    type: "success",
    content: "操作成功",
    duration: 3000,
  })
}
</script>
```

### Loading 效果

```vue
<template>
  <ui-toast ref="toastRef" />
  <button @click="showLoading">显示 Loading</button>
</template>

<script setup>
import { ref } from "vue"
const toastRef = ref()

async function showLoading() {
  // loading 类型默认不自动关闭
  toastRef.value.show({ type: "loading", content: "加载中..." })

  // 模拟异步操作
  await someAsyncOperation()

  // 手动关闭
  toastRef.value.hide()
}
</script>
```

## Props

| 参数         | 说明                                         | 类型                                                     | 默认值               |
| ------------ | -------------------------------------------- | -------------------------------------------------------- | -------------------- |
| v-model:show | 是否显示 toast                               | boolean                                                  | false                |
| type         | 显示类型                                     | `loading` \| `await` \| `success` \| `fail` \| `default` | `default`            |
| content      | 显示内容                                     | string                                                   | -                    |
| icon         | 自定义图标（支持图标名称或图片 URL）         | string                                                   | -                    |
| iconSize     | 图标大小                                     | string \| number                                         | `80rpx`              |
| iconPrefix   | 图标前缀                                     | string                                                   | `ui-icon`            |
| mask         | 是否显示透明蒙层，防止触摸穿透               | boolean                                                  | false                |
| position     | 显示位置                                     | `top` \| `middle` \| `bottom`                            | `middle`             |
| offset       | 位置偏移（仅 position 为 top/bottom 时生效） | string \| number                                         | `150`                |
| width        | 显示宽度                                     | string \| number                                         | -                    |
| duration     | 显示持续时间（毫秒），设为 0 则不自动关闭    | string \| number                                         | `2000`               |
| background   | 背景色                                       | string                                                   | `rgba(0, 0, 0, 0.7)` |
| customClass  | 自定义类名                                   | string                                                   | -                    |
| customStyle  | 自定义样式                                   | string \| CSSProperties                                  | -                    |

## Events

| 事件名      | 说明                     | 回调参数        |
| ----------- | ------------------------ | --------------- |
| update:show | 显示状态变化时触发       | (show: boolean) |
| open        | toast 打开时触发         | -               |
| opened      | toast 打开动画结束时触发 | -               |
| close       | toast 关闭时触发         | -               |
| closed      | toast 关闭动画结束时触发 | -               |

## Methods

通过 ref 获取组件实例后可调用以下方法：

| 方法名 | 说明                                               | 参数                               |
| ------ | -------------------------------------------------- | ---------------------------------- |
| show   | 显示 toast，可传入字符串（作为 content）或配置对象 | (options?: string \| ToastOptions) |
| hide   | 隐藏 toast                                         | -                                  |
| open   | 打开 toast（不接受参数，使用当前 props）           | -                                  |
| close  | 关闭 toast                                         | -                                  |

## Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |
