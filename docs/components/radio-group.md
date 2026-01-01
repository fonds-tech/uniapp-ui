# RadioGroup 单选框组

管理一组单选框，支持统一设置样式和双向绑定。

## 基础用法

```vue
<template>
  <ui-radio-group v-model="result">
    <ui-radio name="a" label="选项 A" />
    <ui-radio name="b" label="选项 B" />
    <ui-radio name="c" label="选项 C" />
  </ui-radio-group>
</template>

<script setup>
import { ref } from "vue"
const result = ref("a")
</script>
```

## 垂直布局

设置 `vertical` 属性使单选框垂直排列。

```vue
<template>
  <ui-radio-group v-model="result" vertical>
    <ui-radio name="a" label="选项 A" />
    <ui-radio name="b" label="选项 B" />
    <ui-radio name="c" label="选项 C" />
  </ui-radio-group>
</template>
```

## 禁用状态

设置 `disabled` 属性禁用整个单选框组。

```vue
<template>
  <ui-radio-group v-model="result" disabled>
    <ui-radio name="a" label="选项 A" />
    <ui-radio name="b" label="选项 B" />
  </ui-radio-group>
</template>
```

## 自定义样式

```vue
<template>
  <ui-radio-group
    v-model="result"
    checked-color="#ee0a24"
    icon-size="36rpx"
    label-size="28rpx"
  >
    <ui-radio name="a" label="选项 A" />
    <ui-radio name="b" label="选项 B" />
  </ui-radio-group>
</template>
```

## Props

| 参数                | 说明               | 类型               | 默认值     |
| ------------------- | ------------------ | ------------------ | ---------- |
| v-model             | 绑定值             | `string \| number` | -          |
| max                 | 最大可选数量       | `string \| number` | `Infinity` |
| gap                 | 单选框之间的间距   | `string \| number` | `0`        |
| disabled            | 是否禁用           | `boolean`          | `false`    |
| vertical            | 是否垂直布局       | `boolean`          | `false`    |
| icon                | 图标名称           | `string`           | -          |
| shape               | 形状               | `string`           | `icon`     |
| round               | 是否圆形图标       | `boolean`          | `true`     |
| checked-color       | 选中的颜色         | `string`           | -          |
| icon-size           | 图标大小           | `string \| number` | `28rpx`    |
| icon-color          | 图标颜色           | `string`           | `#BFBFBF`  |
| icon-weight         | 图标粗细           | `string \| number` | -          |
| icon-radius         | 图标圆角值         | `string \| number` | -          |
| label-size          | 标签文本大小       | `string \| number` | -          |
| label-color         | 标签文本颜色       | `string`           | -          |
| label-weight        | 标签文本粗细       | `string \| number` | -          |
| label-gap           | 标签与图标的间距   | `string \| number` | -          |
| label-left          | 标签是否在图标左侧 | `boolean`          | `false`    |
| label-disabled      | 是否禁用标签点击   | `boolean`          | `false`    |
| checked-icon-color  | 选中的图标颜色     | `string`           | `primary`  |
| checked-label-color | 选中的标签颜色     | `string`           | -          |
| custom-class        | 自定义类名         | `string`           | -          |
| custom-style        | 自定义样式         | `string \| object` | -          |

## Events

| 事件名 | 说明             | 回调参数                  |
| ------ | ---------------- | ------------------------- |
| change | 选中值变化时触发 | `value: string \| number` |
| click  | 点击时触发       | -                         |
