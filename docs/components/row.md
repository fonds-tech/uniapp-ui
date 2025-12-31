# Row 行

栅格布局的行组件，与 Col 组件配合使用，基于 Flex 布局实现。

## 基础用法

```vue
<template>
  <ui-row>
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8">span: 8</ui-col>
  </ui-row>
</template>
```

## 列间距

通过 `gap` 属性设置列间距。

```vue
<template>
  <ui-row gap="20rpx">
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8">span: 8</ui-col>
  </ui-row>
</template>
```

## 分别设置水平和垂直间距

通过 `col-gap` 和 `row-gap` 分别设置水平和垂直间距。

```vue
<template>
  <ui-row col-gap="20rpx" row-gap="10rpx">
    <ui-col :span="8">1</ui-col>
    <ui-col :span="8">2</ui-col>
    <ui-col :span="8">3</ui-col>
    <ui-col :span="8">4</ui-col>
    <ui-col :span="8">5</ui-col>
    <ui-col :span="8">6</ui-col>
  </ui-row>
</template>
```

## 对齐方式

通过 `justify` 属性设置水平对齐方式，通过 `align` 属性设置垂直对齐方式。

```vue
<template>
  <!-- 水平居中 -->
  <ui-row justify="center">
    <ui-col :span="6">居中</ui-col>
    <ui-col :span="6">居中</ui-col>
  </ui-row>

  <!-- 水平右对齐 -->
  <ui-row justify="end">
    <ui-col :span="6">右对齐</ui-col>
    <ui-col :span="6">右对齐</ui-col>
  </ui-row>

  <!-- 两端对齐 -->
  <ui-row justify="between">
    <ui-col :span="6">两端对齐</ui-col>
    <ui-col :span="6">两端对齐</ui-col>
  </ui-row>

  <!-- 环绕对齐 -->
  <ui-row justify="around">
    <ui-col :span="6">环绕对齐</ui-col>
    <ui-col :span="6">环绕对齐</ui-col>
  </ui-row>
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gap | 列间距 | `string \| number` | - |
| col-gap | 水平间距 | `string \| number` | - |
| row-gap | 垂直间距 | `string \| number` | - |
| align | 垂直对齐方式 | `start \| end \| center \| stretch \| baseline` | `stretch` |
| justify | 水平对齐方式 | `start \| end \| center \| between \| around` | `start` |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| resize | 重新计算布局 | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 行内容，通常为 Col 组件 |
