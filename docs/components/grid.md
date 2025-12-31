# Grid 栅格

栅格布局组件，用于页面布局，基于 24 栅格系统。

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

## 不同比例

```vue
<template>
  <ui-row>
    <ui-col :span="4">span: 4</ui-col>
    <ui-col :span="20">span: 20</ui-col>
  </ui-row>
  <ui-row>
    <ui-col :span="12">span: 12</ui-col>
    <ui-col :span="12">span: 12</ui-col>
  </ui-row>
</template>
```

## 列间距

通过 `gutter` 属性设置列间距。

```vue
<template>
  <ui-row gutter="20rpx">
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8">span: 8</ui-col>
  </ui-row>
</template>
```

## 列偏移

通过 `offset` 属性设置列偏移。

```vue
<template>
  <ui-row>
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8" :offset="8">offset: 8</ui-col>
  </ui-row>
</template>
```

## 对齐方式

通过 `justify` 属性设置水平对齐方式。

```vue
<template>
  <ui-row justify="center">
    <ui-col :span="6">居中</ui-col>
    <ui-col :span="6">居中</ui-col>
  </ui-row>
  <ui-row justify="end">
    <ui-col :span="6">右对齐</ui-col>
    <ui-col :span="6">右对齐</ui-col>
  </ui-row>
  <ui-row justify="space-between">
    <ui-col :span="6">两端对齐</ui-col>
    <ui-col :span="6">两端对齐</ui-col>
  </ui-row>
</template>
```
