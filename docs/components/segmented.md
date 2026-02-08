# Segmented 分段控制器

用于在多个互斥选项之间进行切换，类似 iOS 原生的分段控制器。

## 基础用法

通过 `v-model` 绑定当前选中值，`options` 设置选项列表。

```vue
<template>
  <ui-segmented v-model="value" :options="options" />
</template>

<script setup>
const value = ref("daily")
const options = [
  { label: "每日", value: "daily" },
  { label: "每周", value: "weekly" },
  { label: "每月", value: "monthly" },
]
</script>
```

## 样式类型

通过 `type` 属性设置样式类型，可选值为 `filled`、`outline`、`block`。

```vue
<ui-segmented v-model="value" :options="options" type="filled" />
<ui-segmented v-model="value" :options="options" type="outline" />
<ui-segmented v-model="value" :options="options" type="block" />
```

## 尺寸

通过 `size` 属性设置尺寸，可选值为 `small`、`medium`、`large`。

```vue
<ui-segmented v-model="value" :options="options" size="small" />
<ui-segmented v-model="value" :options="options" size="medium" />
<ui-segmented v-model="value" :options="options" size="large" />
```

## 撑满容器

设置 `block` 属性使组件撑满父容器宽度。

```vue
<ui-segmented v-model="value" :options="options" block />
```

## 带图标

在选项中设置 `icon` 属性可以显示图标。

```vue
<template>
  <ui-segmented v-model="value" :options="iconOptions" />
</template>

<script setup>
const iconOptions = [
  { label: "列表", value: "list", icon: "list" },
  { label: "网格", value: "grid", icon: "grid" },
]
</script>
```

## 自定义颜色

通过 `active-color` 和 `active-text-color` 自定义激活项颜色。

```vue
<ui-segmented v-model="value" :options="options" active-color="#6366F1" active-text-color="#fff" />
```

## 禁用状态

通过 `disabled` 禁用整个组件，或在选项中设置 `disabled` 禁用单个选项。

```vue
<!-- 禁用整个组件 -->
<ui-segmented v-model="value" :options="options" disabled />

<!-- 禁用单个选项 -->
<ui-segmented v-model="value" :options="disabledOptions" />
```

## Props

| 属性                  | 说明             | 类型                               | 默认值     |
| --------------------- | ---------------- | ---------------------------------- | ---------- |
| model-value / v-model | 当前选中值       | `string \| number`                 | -          |
| options               | 选项列表         | `SegmentedOption[]`                | `[]`       |
| disabled              | 是否禁用         | `boolean`                          | `false`    |
| type                  | 样式类型         | `'filled' \| 'outline' \| 'block'` | `'filled'` |
| size                  | 尺寸             | `'small' \| 'medium' \| 'large'`   | `'medium'` |
| block                 | 是否撑满容器     | `boolean`                          | `false`    |
| round                 | 是否使用圆角     | `boolean`                          | `true`     |
| active-color          | 激活项背景色     | `string`                           | -          |
| active-text-color     | 激活项文字颜色   | `string`                           | -          |
| inactive-color        | 未激活项背景色   | `string`                           | -          |
| inactive-text-color   | 未激活项文字颜色 | `string`                           | -          |
| gap                   | 选项间距         | `string \| number`                 | `4rpx`     |
| padding               | 容器内边距       | `string \| number`                 | `4rpx`     |

## Events

| 事件   | 说明             | 参数                      |
| ------ | ---------------- | ------------------------- |
| change | 选中值变化时触发 | `value: string \| number` |
| click  | 点击选项时触发   | `option: SegmentedOption` |

## SegmentedOption

| 属性     | 说明     | 类型               | 必填 |
| -------- | -------- | ------------------ | ---- |
| label    | 显示文本 | `string`           | 是   |
| value    | 选项值   | `string \| number` | 是   |
| icon     | 图标名称 | `string`           | 否   |
| disabled | 是否禁用 | `boolean`          | 否   |
