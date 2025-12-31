# Checkbox 复选框

复选框组件，支持单独使用和组合使用。

## 基础用法

```vue
<template>
  <ui-checkbox v-model="checked" label="复选框" />
</template>

<script setup>
import { ref } from "vue"
const checked = ref(true)
</script>
```

## 禁用状态

```vue
<ui-checkbox v-model="checked" disabled label="禁用" />
<ui-checkbox :model-value="true" disabled label="禁用且选中" />
```

## 自定义形状

```vue
<ui-checkbox v-model="checked" shape="square" label="方形" />
<ui-checkbox v-model="checked" shape="round" label="圆形" />
```

## 自定义颜色

```vue
<ui-checkbox v-model="checked" checked-color="#ee0a24" label="红色" />
<ui-checkbox v-model="checked" checked-color="#07c160" label="绿色" />
```

## 复选框组

```vue
<template>
  <ui-checkbox-group v-model="result">
    <ui-checkbox name="a" label="选项 A" />
    <ui-checkbox name="b" label="选项 B" />
    <ui-checkbox name="c" label="选项 C" />
  </ui-checkbox-group>
</template>

<script setup>
import { ref } from "vue"
const result = ref(["a"])
</script>
```

## 限制最大可选数

```vue
<ui-checkbox-group v-model="result" :max="2">
  <ui-checkbox name="a" label="选项 A" />
  <ui-checkbox name="b" label="选项 B" />
  <ui-checkbox name="c" label="选项 C" />
</ui-checkbox-group>
```

## API

### Checkbox Props

| 属性名         | 说明             | 类型               | 默认值   |
| -------------- | ---------------- | ------------------ | -------- |
| v-model        | 是否选中         | `boolean`          | `false`  |
| name           | 标识符           | `string`           | -        |
| label          | 文本内容         | `string`           | -        |
| shape          | 形状             | `square \| round`  | `square` |
| disabled       | 是否禁用         | `boolean`          | `false`  |
| checked-color  | 选中时颜色       | `string`           | -        |
| icon-size      | 图标大小         | `string \| number` | -        |
| label-disabled | 是否禁用文本点击 | `boolean`          | `false`  |

### Checkbox Events

| 事件名 | 说明           | 回调参数           |
| ------ | -------------- | ------------------ |
| change | 状态变化时触发 | `checked: boolean` |

### CheckboxGroup Props

| 属性名    | 说明               | 类型                     | 默认值     |
| --------- | ------------------ | ------------------------ | ---------- |
| v-model   | 选中的标识符数组   | `string[]`               | `[]`       |
| disabled  | 是否禁用所有复选框 | `boolean`                | `false`    |
| max       | 最大可选数         | `number`                 | -          |
| direction | 排列方向           | `horizontal \| vertical` | `vertical` |

### CheckboxGroup Events

| 事件名 | 说明           | 回调参数          |
| ------ | -------------- | ----------------- |
| change | 状态变化时触发 | `names: string[]` |
