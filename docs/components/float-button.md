# FloatButton 浮动按钮

悬浮在页面上的浮动操作按钮。

## 基础用法

```vue
<template>
  <ui-float-button @click="onClick" />
</template>

<script setup>
function onClick() {
  uni.showToast({ title: "点击了浮动按钮", icon: "none" })
}
</script>
```

## 按钮类型

通过 `type` 属性设置按钮类型。

```vue
<template>
  <ui-float-button type="primary" />
  <ui-float-button type="success" />
  <ui-float-button type="warning" />
  <ui-float-button type="danger" />
</template>
```

## 自定义图标

通过 `icon` 属性设置按钮图标。

```vue
<template>
  <ui-float-button icon="plus" />
  <ui-float-button icon="edit" />
  <ui-float-button icon="message" />
</template>
```

## 带文字

通过 `text` 属性添加文字。

```vue
<template>
  <ui-float-button icon="plus" text="添加" />
</template>
```
