# Sidebar 侧边栏

侧边导航组件，用于分类内容切换。

## 基础用法

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item title="标签一" />
    <ui-sidebar-item title="标签二" />
    <ui-sidebar-item title="标签三" />
  </ui-sidebar>
</template>

<script setup>
import { ref } from "vue"
const active = ref(0)
</script>
```

## 徽标提示

通过 `dot` 属性显示圆点提示，`badge` 属性显示徽标数字。

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item title="标签一" dot />
    <ui-sidebar-item title="标签二" badge="5" />
    <ui-sidebar-item title="标签三" badge="20" />
  </ui-sidebar>
</template>
```

## 禁用选项

通过 `disabled` 属性禁用某个选项。

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item title="标签一" />
    <ui-sidebar-item title="标签二" disabled />
    <ui-sidebar-item title="标签三" />
  </ui-sidebar>
</template>
```

## 切换事件

通过 `change` 事件监听选项切换。

```vue
<template>
  <ui-sidebar v-model="active" @change="onChange">
    <ui-sidebar-item title="标签一" />
    <ui-sidebar-item title="标签二" />
    <ui-sidebar-item title="标签三" />
  </ui-sidebar>
</template>

<script setup>
function onChange(index) {
  uni.showToast({ title: `切换到第 ${index + 1} 项`, icon: "none" })
}
</script>
```

## Sidebar Props

| 参数         | 说明             | 类型               | 默认值  |
| ------------ | ---------------- | ------------------ | ------- |
| v-model      | 当前选中项索引   | `string \| number` | `0`     |
| width        | 宽度             | `string \| number` | -       |
| height       | 高度             | `string \| number` | -       |
| duration     | 切换动画时长(ms) | `string \| number` | `300`   |
| background   | 背景颜色         | `string`           | -       |
| line-color   | 激活线条颜色     | `string`           | -       |
| line-width   | 激活线条宽度     | `string \| number` | -       |
| line-height  | 激活线条高度     | `string \| number` | `40rpx` |
| line-radius  | 激活线条圆角     | `string \| number` | -       |
| show-line    | 是否显示线条     | `boolean`          | `true`  |
| auto-scroll  | 是否自动滚动     | `boolean`          | `true`  |
| z-index      | 层级             | `string \| number` | -       |
| custom-class | 自定义类名       | `string`           | -       |
| custom-style | 自定义样式       | `string \| object` | -       |

## Sidebar Events

| 事件名     | 说明           | 回调参数                                |
| ---------- | -------------- | --------------------------------------- |
| change     | 切换选项时触发 | `name: string \| number`                |
| click-item | 点击选项时触发 | `name: string \| number, index: number` |

## SidebarItem Props

| 参数                | 说明                   | 类型               | 默认值   |
| ------------------- | ---------------------- | ------------------ | -------- |
| name                | 标识符，用于匹配选中项 | `string \| number` | 当前索引 |
| title               | 标题                   | `string`           | -        |
| height              | 高度                   | `string \| number` | -        |
| disabled            | 是否禁用               | `boolean`          | `false`  |
| dot                 | 是否显示圆点徽标       | `boolean`          | `false`  |
| badge               | 徽标内容               | `string \| number` | -        |
| title-color         | 标题颜色               | `string`           | -        |
| title-size          | 标题大小               | `string \| number` | -        |
| title-weight        | 标题粗细               | `string \| number` | -        |
| title-align         | 文字对齐方式           | `string`           | `center` |
| active-title-color  | 激活标题颜色           | `string`           | -        |
| active-title-size   | 激活标题大小           | `string \| number` | -        |
| active-title-weight | 激活标题粗细           | `string \| number` | -        |
| background          | 背景颜色               | `string`           | -        |
| active-background   | 激活背景颜色           | `string`           | -        |
| custom-class        | 自定义类名             | `string`           | -        |
| custom-style        | 自定义样式             | `string \| object` | -        |

## SidebarItem Events

`SidebarItem` 当前版本无独立事件（点击与切换由 `Sidebar` 统一抛出）。

## SidebarItem Slots

| 名称    | 说明                                       | 参数 |
| ------- | ------------------------------------------ | ---- |
| default | 自定义选项内容                             | `{ active, disabled }` |

## SidebarItem Methods

通过 `ref` 可访问以下暴露字段/方法。

| 字段/方法 | 说明 |
| --------- | ---- |
| resize    | 重新计算选项尺寸 |
