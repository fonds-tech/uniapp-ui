# SidebarItem 侧边导航项

侧边导航项组件，需配合 `Sidebar` 使用。

## 基础用法

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item name="1" title="分类一" />
    <ui-sidebar-item name="2" title="分类二" />
    <ui-sidebar-item name="3" title="分类三" />
  </ui-sidebar>
</template>

<script setup>
import { ref } from "vue"
const active = ref("1")
</script>
```

## 禁用选项

设置 `disabled` 属性禁用选项。

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item name="1" title="分类一" />
    <ui-sidebar-item name="2" title="分类二" disabled />
    <ui-sidebar-item name="3" title="分类三" />
  </ui-sidebar>
</template>
```

## 自定义样式

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item
      name="1"
      title="分类一"
      title-color="#666"
      active-title-color="#1989fa"
      active-background="#fff"
    />
  </ui-sidebar>
</template>
```

## Props

| 参数                | 说明         | 类型               | 默认值   |
| ------------------- | ------------ | ------------------ | -------- |
| name                | 标识符       | `string \| number` | -        |
| title               | 标题         | `string \| number` | -        |
| height              | 高度         | `string \| number` | -        |
| disabled            | 是否禁用     | `boolean`          | `false`  |
| title-color         | 标题颜色     | `string`           | -        |
| title-size          | 标题大小     | `string \| number` | -        |
| title-weight        | 标题粗细     | `string \| number` | -        |
| title-align         | 文字对齐方式 | `string`           | `center` |
| active-title-color  | 激活标题颜色 | `string`           | -        |
| active-title-size   | 激活标题大小 | `string \| number` | -        |
| active-title-weight | 激活标题粗细 | `string \| number` | -        |
| background          | 背景颜色     | `string`           | -        |
| active-background   | 激活背景颜色 | `string`           | -        |
| custom-class        | 自定义类名   | `string`           | -        |
| custom-style        | 自定义样式   | `string \| object` | -        |
