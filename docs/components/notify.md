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
  notifyRef.value?.show({ message: "这是一条通知消息" })
}
</script>
```

## 通知类型

支持 `primary`、`success`、`warning`、`danger` 四种类型。

```vue
<script setup>
function showPrimary() {
  notifyRef.value?.show({ message: "主要通知", type: "primary" })
}

function showSuccess() {
  notifyRef.value?.show({ message: "成功通知", type: "success" })
}

function showWarning() {
  notifyRef.value?.show({ message: "警告通知", type: "warning" })
}

function showDanger() {
  notifyRef.value?.show({ message: "危险通知", type: "danger" })
}
</script>
```

## 自定义颜色

通过 `background` 和 `color` 属性自定义通知颜色。

```vue
<script setup>
function showCustom() {
  notifyRef.value?.show({
    message: "自定义颜色",
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
  notifyRef.value?.show({ message: "5秒后关闭", duration: 5000 })
}
</script>
```
