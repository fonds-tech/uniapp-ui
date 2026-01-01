# CheckboxGroup 复选框组

管理一组复选框，支持统一设置样式和双向绑定。

## 基础用法

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

## 最大可选数量

通过 `max` 属性限制最大可选数量。

```vue
<template>
  <ui-checkbox-group v-model="result" :max="2">
    <ui-checkbox name="a" label="选项 A" />
    <ui-checkbox name="b" label="选项 B" />
    <ui-checkbox name="c" label="选项 C" />
  </ui-checkbox-group>
</template>
```

## 垂直布局

设置 `vertical` 属性使复选框垂直排列。

```vue
<template>
  <ui-checkbox-group v-model="result" vertical>
    <ui-checkbox name="a" label="选项 A" />
    <ui-checkbox name="b" label="选项 B" />
    <ui-checkbox name="c" label="选项 C" />
  </ui-checkbox-group>
</template>
```

## 禁用状态

设置 `disabled` 属性禁用整个复选框组。

```vue
<template>
  <ui-checkbox-group v-model="result" disabled>
    <ui-checkbox name="a" label="选项 A" />
    <ui-checkbox name="b" label="选项 B" />
  </ui-checkbox-group>
</template>
```

## 全选与反选

通过 ref 调用 `toggleAll` 方法实现全选/反选。

```vue
<template>
  <ui-checkbox-group ref="groupRef" v-model="result">
    <ui-checkbox name="a" label="选项 A" />
    <ui-checkbox name="b" label="选项 B" />
    <ui-checkbox name="c" label="选项 C" />
  </ui-checkbox-group>
  <ui-button @click="toggleAll">全选</ui-button>
</template>

<script setup>
import { ref } from "vue"

const result = ref([])
const groupRef = ref()

function toggleAll() {
  groupRef.value.toggleAll(["a", "b", "c"])
}
</script>
```

## Props

| 参数                | 说明               | 类型               | 默认值     |
| ------------------- | ------------------ | ------------------ | ---------- |
| v-model             | 绑定值             | `array`            | `[]`       |
| max                 | 最大可选数量       | `string \| number` | `Infinity` |
| gap                 | 复选框之间的间距   | `string \| number` | `0`        |
| disabled            | 是否禁用           | `boolean`          | `false`    |
| vertical            | 是否垂直布局       | `boolean`          | `false`    |
| icon                | 图标名称           | `string`           | -          |
| shape               | 形状               | `string`           | `dot`      |
| round               | 是否圆形图标       | `boolean`          | `false`    |
| checked-color       | 选中的颜色         | `string`           | -          |
| icon-size           | 图标大小           | `string \| number` | -          |
| icon-color          | 图标颜色           | `string`           | -          |
| icon-weight         | 图标粗细           | `string \| number` | -          |
| icon-radius         | 图标圆角值         | `string \| number` | -          |
| icon-prefix         | 图标前缀           | `string`           | `ui-icon`  |
| label-size          | 标签文本大小       | `string \| number` | -          |
| label-color         | 标签文本颜色       | `string`           | -          |
| label-weight        | 标签文本粗细       | `string \| number` | -          |
| label-gap           | 标签与图标的间距   | `string \| number` | -          |
| label-left          | 标签是否在图标左侧 | `boolean`          | `false`    |
| label-disabled      | 是否禁用标签点击   | `boolean`          | `false`    |
| checked-icon-color  | 选中的图标颜色     | `string`           | -          |
| checked-label-color | 选中的标签颜色     | `string`           | -          |
| custom-class        | 自定义类名         | `string`           | -          |
| custom-style        | 自定义样式         | `string \| object` | -          |

## Events

| 事件名 | 说明             | 回调参数       |
| ------ | ---------------- | -------------- |
| change | 选中值变化时触发 | `value: array` |
| click  | 点击时触发       | `event`        |

## Methods

| 方法名    | 说明                   | 参数           |
| --------- | ---------------------- | -------------- |
| toggleAll | 切换所有复选框选中状态 | `value: array` |
