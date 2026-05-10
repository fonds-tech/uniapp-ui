# UiRadio 组件

## 介绍

UiRadio 单选框，多选项中选一。可独立使用或配合 `ui-radio-group` 组成单选组。

## 代码演示

### 配合 ui-radio-group

```vue
<template>
  <ui-radio-group v-model="value">
    <ui-radio name="a">选项 A</ui-radio>
    <ui-radio name="b">选项 B</ui-radio>
  </ui-radio-group>
</template>

<script setup>
const value = ref("a")
</script>
```

### 独立使用

```vue
<ui-radio v-model="checked" :bind-group="false">独立单选</ui-radio>
```

## Props

| 参数              | 说明                       | 类型                        | 默认值  |
| ----------------- | -------------------------- | --------------------------- | ------- |
| modelValue        | 独立模式选中值             | string \| number \| boolean | false   |
| name              | 选项标识 (group 中作 key)  | string \| number            | -       |
| label             | 标签文本 (优先用默认 slot) | string \| number            | -       |
| bindGroup         | 绑定父级 ui-radio-group    | boolean                     | true    |
| disabled          | 禁用                       | boolean                     | false   |
| readonly          | 只读                       | boolean                     | false   |
| size              | 单选框尺寸 (iconSize 别名) | string \| number            | -       |
| shape             | 形状: dot / icon           | string                      | "dot"   |
| round             | 圆形图标                   | boolean                     | true    |
| color             | 选中态主色                 | string                      | -       |
| icon              | 图标名称 (shape="icon")    | string                      | "check" |
| iconSize          | 图标尺寸 (覆盖 size)       | string \| number            | -       |
| iconColor         | 未选边框色                 | string                      | -       |
| iconRadius        | 图标圆角                   | string \| number            | -       |
| labelPosition     | 标签位置: left / right     | string                      | "right" |
| labelSize         | 标签字号                   | string \| number            | -       |
| labelColor        | 标签颜色                   | string                      | -       |
| labelWeight       | 标签字重                   | string \| number            | -       |
| labelGap          | 标签与图标间距             | string \| number            | -       |
| labelDisabled     | 标签点击不切换             | boolean                     | false   |
| checkedLabelColor | 选中态标签颜色             | string                      | -       |
| customClass       | 自定义类名                 | string                      | -       |
| customStyle       | 自定义样式                 | string \| object            | -       |

> 配合 ui-radio-group 时大部分样式 prop 由 group 统一配置，单个 ui-radio 仅在显式传值时覆盖。

## Events

| 事件名            | 说明         | 回调参数                           |
| ----------------- | ------------ | ---------------------------------- |
| update:modelValue | 独立模式更新 | value: string \| number \| boolean |
| change            | 值变化       | value                              |
| click             | 点击         | event: Event                       |

## Slots

| 名称    | 说明       | 作用域参数                              |
| ------- | ---------- | --------------------------------------- |
| default | 标签内容   | -                                       |
| icon    | 自定义图标 | { checked: boolean, disabled: boolean } |

## 实例方法

| 方法名 | 说明         | 参数            |
| ------ | ------------ | --------------- |
| toggle | 切换选中状态 | check?: boolean |
