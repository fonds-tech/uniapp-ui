# Checkbox 复选框

复选框组件，支持单独使用和组合使用。

## 演示页面

Checkbox 与 CheckboxGroup 已合并在同一演示页，路径：`/pages/demo/checkbox/index`。

该页面按“基础 → 视觉 → 状态 → 组合 → 场景”顺序覆盖所有配置。

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

## 选项间距

通过 `gap` 属性设置选项之间的间距。

```vue
<ui-checkbox-group v-model="result" gap="24rpx">
  <ui-checkbox name="a" label="选项 A" />
  <ui-checkbox name="b" label="选项 B" />
  <ui-checkbox name="c" label="选项 C" />
</ui-checkbox-group>
```

## 网格布局

通过 `columns` 属性设置列数，启用网格布局，每项等宽排列。

```vue
<template>
  <!-- 2 列网格布局 -->
  <ui-checkbox-group v-model="result" :columns="2" gap="20rpx">
    <ui-checkbox name="a" label="选项 A" />
    <ui-checkbox name="b" label="选项 B" />
    <ui-checkbox name="c" label="选项 C" />
    <ui-checkbox name="d" label="选项 D" />
  </ui-checkbox-group>
</template>
```

## API

### Checkbox Props

| 属性名               | 说明                     | 类型                                   | 默认值   |
| -------------------- | ------------------------ | -------------------------------------- | -------- |
| v-model              | 是否选中                 | `boolean`                              | `false`  |
| name                 | 标识符                   | `string \| number`                     | `""`   |
| label                | 文本内容                 | `string \| number`                     | `""`   |
| bind-group           | 是否与 CheckboxGroup 绑定 | `boolean`                              | `true`   |
| disabled             | 是否禁用                 | `boolean`                              | `false`  |
| readonly             | 是否只读                 | `boolean`                              | `false`  |
| size                 | 图标大小                 | `string \| number`                     | `36rpx`  |
| shape                | 形状                     | `dot \| icon \| ""`                   | `""`   |
| round                | 是否圆形                 | `boolean`                              | `true`   |
| indeterminate        | 不确定状态               | `boolean`                              | `false`  |
| color                | 主色（选中颜色）         | `string`                               | `""`   |
| checked-color        | 选中颜色（已弃用）       | `string`                               | `""`   |
| checked-icon-color   | 选中图标颜色（已弃用）   | `string`                               | `""`   |
| icon                 | 图标名称                 | `string`                               | `check`  |
| icon-size            | 图标大小                 | `string \| number`                     | `""`   |
| icon-color           | 图标颜色                 | `string`                               | `""`   |
| icon-weight          | 图标粗细                 | `string \| number`                     | `""`   |
| icon-radius          | 图标圆角                 | `string \| number`                     | `""`   |
| label-position       | 标签位置                 | `left \| right`                         | `right`  |
| label-size           | 标签大小                 | `string \| number`                     | `""`   |
| label-color          | 标签颜色                 | `string`                               | `""`   |
| label-weight         | 标签粗细                 | `string \| number`                     | `""`   |
| label-gap            | 标签与图标间距           | `string \| number`                     | `""`   |
| label-disabled       | 是否禁用文本点击         | `boolean`                              | `false`  |
| checked-label-color  | 选中时文本颜色           | `string`                               | `""`   |
| custom-class         | 自定义类名               | `string`                               | `""`   |
| custom-style         | 自定义样式               | `string \| object`                     | `""`   |

### Checkbox Events

| 事件名            | 说明           | 回调参数 |
| ----------------- | -------------- | -------- |
| click             | 点击时触发     | `event`  |
| change            | 状态变化时触发 | `value`  |
| update:modelValue | 更新绑定值     | `value`  |

### Checkbox Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 文本内容                   |
| icon    | 图标插槽（作用域：checked, disabled, indeterminate） |

### Checkbox Methods/Expose

| 方法名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| toggle | 切换选中状态     | `check?: boolean` |

### CheckboxGroup Props

| 属性名               | 说明                               | 类型               | 默认值   |
| -------------------- | ---------------------------------- | ------------------ | -------- |
| v-model              | 选中的标识符数组                   | `unknown[]`        | `[]`     |
| max                  | 最大可选数                         | `string \| number` | `Infinity` |
| min                  | 最小可选数                         | `string \| number` | `0`      |
| gap                  | 选项间距                           | `string \| number` | `0`      |
| columns              | 网格布局列数                       | `string \| number` | `""`   |
| disabled             | 是否禁用                           | `boolean`          | `false`  |
| size                 | 图标大小                           | `string \| number` | `36rpx`  |
| shape                | 形状                               | `dot \| icon`      | `dot`    |
| round                | 是否圆形                           | `boolean`          | `false`  |
| color                | 主色                               | `string`           | `""`   |
| checked-color        | 选中颜色（已弃用）                 | `string`           | `""`   |
| checked-icon-color   | 选中图标颜色（已弃用）             | `string`           | `""`   |
| icon                 | 图标名称                           | `string`           | `""`   |
| icon-size            | 图标大小                           | `string \| number` | `""`   |
| icon-color           | 图标颜色                           | `string`           | `""`   |
| icon-weight          | 图标粗细                           | `string \| number` | `""`   |
| icon-radius          | 图标圆角                           | `string \| number` | `""`   |
| icon-prefix          | 图标前缀                           | `string`           | `ui-icon` |
| label-position       | 标签位置                           | `left \| right`     | `right`  |
| label-left           | 标签是否在左侧（已弃用）           | `boolean`          | `false`  |
| label-size           | 标签大小                           | `string \| number` | `""`   |
| label-color          | 标签颜色                           | `string`           | `""`   |
| label-weight         | 标签粗细                           | `string \| number` | `""`   |
| label-gap            | 标签与图标间距                     | `string \| number` | `""`   |
| label-disabled       | 是否禁用标签点击                   | `boolean`          | `false`  |
| checked-label-color  | 选中时文本颜色                     | `string`           | `""`   |
| custom-class         | 自定义类名                         | `string`           | `""`   |
| custom-style         | 自定义样式                         | `string \| object` | `""`   |

### CheckboxGroup Events

| 事件名            | 说明           | 回调参数 |
| ----------------- | -------------- | -------- |
| click             | 点击时触发     | `event`  |
| change            | 状态变化时触发 | `value`  |
| update:modelValue | 更新绑定值     | `value`  |

### CheckboxGroup Methods/Expose

| 方法名           | 说明               | 参数 |
| ---------------- | ------------------ | ---- |
| toggleAll        | 全选/全不选        | `checked?: boolean` |
| getCheckedCount  | 获取选中数量       | -    |
| isAtMinimum      | 是否达到最小选择数 | -    |
| isAtMaximum      | 是否达到最大选择数 | -    |