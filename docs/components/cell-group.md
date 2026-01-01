# CellGroup 单元格组

用于将多个单元格组合在一起，提供统一的圆角和背景。

## 基础用法

```vue
<template>
  <ui-cell-group>
    <ui-cell title="单元格" value="内容" />
    <ui-cell title="单元格" value="内容" />
  </ui-cell-group>
</template>
```

## 圆角设置

通过 `radius` 属性设置分组圆角。

```vue
<template>
  <ui-cell-group radius="16rpx">
    <ui-cell title="单元格" value="内容" />
    <ui-cell title="单元格" value="内容" />
  </ui-cell-group>
</template>
```

## 自定义背景

通过 `background` 属性设置背景颜色。

```vue
<template>
  <ui-cell-group background="#f5f5f5">
    <ui-cell title="单元格" value="内容" />
    <ui-cell title="单元格" value="内容" />
  </ui-cell-group>
</template>
```

## Props

| 参数         | 说明       | 类型               | 默认值 |
| ------------ | ---------- | ------------------ | ------ |
| radius       | 圆角值     | `string \| number` | -      |
| background   | 背景颜色   | `string`           | -      |
| custom-class | 自定义类名 | `string`           | -      |
| custom-style | 自定义样式 | `string \| object` | -      |
