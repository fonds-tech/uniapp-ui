# Tab 标签项

标签项组件，需配合 `Tabs` 使用。

## 基础用法

```vue
<template>
  <ui-tabs v-model="active">
    <ui-tab title="标签一" name="a">内容一</ui-tab>
    <ui-tab title="标签二" name="b">内容二</ui-tab>
    <ui-tab title="标签三" name="c">内容三</ui-tab>
  </ui-tabs>
</template>

<script setup>
import { ref } from "vue"
const active = ref("a")
</script>
```

## 禁用标签

设置 `disabled` 属性禁用标签。

```vue
<template>
  <ui-tabs v-model="active">
    <ui-tab title="标签一" name="a">内容一</ui-tab>
    <ui-tab title="标签二" name="b" disabled>内容二</ui-tab>
    <ui-tab title="标签三" name="c">内容三</ui-tab>
  </ui-tabs>
</template>
```

## Props

| 参数         | 说明       | 类型               | 默认值  |
| ------------ | ---------- | ------------------ | ------- |
| title        | 标题       | `string \| number` | -       |
| name         | 标识符     | `string \| number` | -       |
| disabled     | 是否禁用   | `boolean`          | `false` |
| custom-class | 自定义类名 | `string`           | -       |
| custom-style | 自定义样式 | `string \| object` | -       |

## Events

| 事件名 | 说明           | 回调参数                 |
| ------ | -------------- | ------------------------ |
| click  | 点击标签时触发 | `name: string \| number` |
