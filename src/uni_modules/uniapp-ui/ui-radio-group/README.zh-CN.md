# UiRadioGroup 组件

## 介绍

UiRadioGroup 单选组容器。统一管理子级 ui-radio 的选中值与样式配置，子组件未传值时回退到 group 的 prop。

## 代码演示

```vue
<template>
  <ui-radio-group v-model="value" vertical :gap="12">
    <ui-radio name="a">选项 A</ui-radio>
    <ui-radio name="b">选项 B</ui-radio>
    <ui-radio name="c">选项 C</ui-radio>
  </ui-radio-group>
</template>

<script setup>
const value = ref("a")
</script>
```

## Props

| 参数              | 说明                                   | 类型             | 默认值  |
| ----------------- | -------------------------------------- | ---------------- | ------- |
| modelValue        | 选中值 (v-model)                       | string \| number | -       |
| gap               | 子项间距                               | string \| number | -       |
| columns           | 网格列数 (启用 grid，与 vertical 互斥) | string \| number | -       |
| vertical          | 垂直排列 (与 columns 互斥)             | boolean          | false   |
| disabled          | 整组禁用                               | boolean          | false   |
| size              | 单选框尺寸 (继承给子组件)              | string \| number | -       |
| shape             | 形状: dot / icon                       | string           | "dot"   |
| round             | 圆形图标                               | boolean          | true    |
| color             | 选中态主色 (继承给子组件)              | string           | -       |
| icon              | 图标名称                               | string           | -       |
| iconSize          | 图标尺寸                               | string \| number | -       |
| iconColor         | 未选边框色                             | string           | -       |
| iconRadius        | 图标圆角                               | string \| number | -       |
| labelPosition     | 标签位置: left / right                 | string           | "right" |
| labelSize         | 标签字号                               | string \| number | -       |
| labelColor        | 标签颜色                               | string           | -       |
| labelWeight       | 标签字重                               | string \| number | -       |
| labelGap          | 标签与图标间距                         | string \| number | -       |
| labelDisabled     | 标签点击不切换                         | boolean          | false   |
| checkedLabelColor | 选中态标签颜色                         | string           | -       |
| customClass       | 自定义类名                             | string           | -       |
| customStyle       | 自定义样式                             | string \| object | -       |

## Events

| 事件名            | 说明         | 回调参数                |
| ----------------- | ------------ | ----------------------- |
| update:modelValue | v-model 更新 | value: string \| number |
| change            | 选中值变化   | value: string \| number |

## Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 子级 ui-radio 列表 |
