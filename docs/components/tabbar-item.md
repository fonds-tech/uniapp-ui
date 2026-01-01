# TabbarItem 标签栏项

标签栏项组件，需配合 `Tabbar` 使用。

## 基础用法

```vue
<template>
  <ui-tabbar v-model="active">
    <ui-tabbar-item name="home" icon="home">首页</ui-tabbar-item>
    <ui-tabbar-item name="category" icon="category">分类</ui-tabbar-item>
    <ui-tabbar-item name="cart" icon="cart">购物车</ui-tabbar-item>
    <ui-tabbar-item name="user" icon="user">我的</ui-tabbar-item>
  </ui-tabbar>
</template>

<script setup>
import { ref } from "vue"
const active = ref("home")
</script>
```

## 路由跳转

设置 `route` 属性实现路由跳转。

```vue
<template>
  <ui-tabbar v-model="active">
    <ui-tabbar-item name="home" icon="home" route="/pages/home/index">首页</ui-tabbar-item>
    <ui-tabbar-item name="user" icon="user" route="/pages/user/index">我的</ui-tabbar-item>
  </ui-tabbar>
</template>
```

## 自定义图标

通过 `icon` 属性设置图标，支持图标名称或图片链接。

```vue
<template>
  <ui-tabbar v-model="active">
    <ui-tabbar-item name="home" icon="home">首页</ui-tabbar-item>
    <ui-tabbar-item name="user" icon="/static/user.png">我的</ui-tabbar-item>
  </ui-tabbar>
</template>
```

## Props

| 参数         | 说明                     | 类型               | 默认值      |
| ------------ | ------------------------ | ------------------ | ----------- |
| name         | 标签名称，作为匹配标识符 | `string \| number` | -           |
| icon         | 图标名称或图片链接       | `string`           | -           |
| icon-size    | 图标大小                 | `string \| number` | `44rpx`     |
| icon-weight  | 图标粗细                 | `string \| number` | -           |
| icon-prefix  | 图标前缀                 | `string`           | -           |
| route        | 跳转路由                 | `string`           | -           |
| route-params | 跳转参数                 | `object`           | `{}`        |
| route-type   | 跳转类型                 | `string`           | `switchTab` |
| custom-class | 自定义类名               | `string`           | -           |
| custom-style | 自定义样式               | `string \| object` | -           |

## Events

| 事件名 | 说明           | 回调参数                 |
| ------ | -------------- | ------------------------ |
| click  | 点击标签时触发 | `name: string \| number` |
