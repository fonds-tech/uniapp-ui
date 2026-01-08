# Radio 单选框

用于在一组选项中进行单选操作。

## 演示页面

Radio 与 RadioGroup 已合并在同一演示页，路径：`/pages/demo/radio/index`。

该页面按“基础 → 视觉 → 状态 → 组合 → 场景”顺序覆盖所有配置。

## 基础用法

搭配 `ui-radio-group` 和 `ui-radio` 使用。

```vue
<template>
  <ui-radio-group v-model="value">
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>

<script setup>
import { ref } from "vue"
const value = ref("1")
</script>
```

## 水平排列

默认情况下单选框组为水平排列。

```vue
<template>
  <ui-radio-group v-model="value">
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
    <ui-radio name="3" label="选项三" />
  </ui-radio-group>
</template>
```

## 禁用状态

通过 `disabled` 属性禁用单选框组。

```vue
<template>
  <ui-radio-group v-model="value" disabled>
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```

## 圆形样式

通过 `round` 属性设置圆形图标样式。

```vue
<template>
  <ui-radio-group v-model="value" round>
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```

## 圆点样式

通过 `shape="dot"` 设置圆点样式图标。

```vue
<template>
  <ui-radio-group v-model="value" shape="dot" round>
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```

## 自定义颜色

通过 `checked-icon-color` 自定义选中颜色。

```vue
<template>
  <ui-radio-group v-model="value" checked-icon-color="#07c160">
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```

## 左侧文本

通过 `label-left` 属性将文本显示在左侧。

```vue
<template>
  <ui-radio-group v-model="value" label-left>
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```

## 选项间距

通过 `gap` 属性设置选项之间的间距。

```vue
<template>
  <ui-radio-group v-model="value" gap="24rpx">
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
    <ui-radio name="3" label="选项三" />
  </ui-radio-group>
</template>
```

## 网格布局

通过 `columns` 属性设置列数，启用网格布局，每项等宽排列。

```vue
<template>
  <!-- 2 列网格布局 -->
  <ui-radio-group v-model="value" :columns="2" gap="20rpx">
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
    <ui-radio name="3" label="选项三" />
    <ui-radio name="4" label="选项四" />
  </ui-radio-group>
</template>
```

## Radio Props

| 参数                | 说明             | 类型               | 默认值    |
| ------------------- | ---------------- | ------------------ | --------- |
| name                | 标识符           | `string \| number` | -         |
| label               | 文本内容         | `string \| number` | -         |
| disabled            | 是否禁用         | `boolean`          | `false`   |
| icon                | 图标名称         | `string`           | `check`   |
| shape               | 形状             | `icon \| dot`      | `dot`     |
| round               | 是否圆形图标     | `boolean`          | `true`    |
| checked-color       | 选中时的颜色     | `string`           | -         |
| icon-size           | 图标大小         | `string \| number` | -         |
| icon-color          | 图标颜色         | `string`           | -         |
| label-size          | 文本大小         | `string \| number` | -         |
| label-color         | 文本颜色         | `string`           | -         |
| label-left          | 文本是否在左侧   | `boolean`          | `false`   |
| label-disabled      | 是否禁用文本点击 | `boolean`          | `false`   |
| checked-icon-color  | 选中时图标颜色   | `string`           | `primary` |
| checked-label-color | 选中时文本颜色   | `string`           | -         |
| custom-class        | 自定义类名       | `string`           | -         |
| custom-style        | 自定义样式       | `string \| object` | -         |

## Radio Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| click  | 点击时触发 | -        |

## RadioGroup Props

| 参数                | 说明                               | 类型               | 默认值    |
| ------------------- | ---------------------------------- | ------------------ | --------- |
| v-model             | 当前选中的值                       | `string \| number` | -         |
| gap                 | 选项间距                           | `string \| number` | `0`       |
| columns             | 网格布局列数，设置后启用 grid 布局 | `number`           | -         |
| disabled            | 是否禁用所有选项                   | `boolean`          | `false`   |
| icon                | 图标名称                           | `string`           | -         |
| shape               | 形状                               | `icon \| dot`      | `icon`    |
| round               | 是否圆形图标                       | `boolean`          | `true`    |
| checked-color       | 选中时的颜色                       | `string`           | -         |
| icon-size           | 图标大小                           | `string \| number` | `28rpx`   |
| icon-color          | 图标颜色                           | `string`           | `#BFBFBF` |
| label-size          | 文本大小                           | `string \| number` | -         |
| label-color         | 文本颜色                           | `string`           | -         |
| label-left          | 文本是否在左侧                     | `boolean`          | `false`   |
| label-disabled      | 是否禁用文本点击                   | `boolean`          | `false`   |
| checked-icon-color  | 选中时图标颜色                     | `string`           | `primary` |
| checked-label-color | 选中时文本颜色                     | `string`           | -         |
| custom-class        | 自定义类名                         | `string`           | -         |
| custom-style        | 自定义样式                         | `string \| object` | -         |

## RadioGroup Events

| 事件名 | 说明             | 回调参数                  |
| ------ | ---------------- | ------------------------- |
| change | 选中值变化时触发 | `value: string \| number` |
| click  | 点击时触发       | -                         |
