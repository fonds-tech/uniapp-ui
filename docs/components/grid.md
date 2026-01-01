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

通过 `gap` 属性设置列间距，也可以分别使用 `col-gap` 和 `row-gap` 设置水平和垂直间距。

```vue
<template>
  <ui-row gap="20rpx">
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

通过 `justify` 属性设置水平对齐方式，通过 `align` 属性设置垂直对齐方式。

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
  <ui-row justify="between">
    <ui-col :span="6">两端对齐</ui-col>
    <ui-col :span="6">两端对齐</ui-col>
  </ui-row>
</template>
```

## Row Props

| 参数         | 说明         | 类型                                            | 默认值    |
| ------------ | ------------ | ----------------------------------------------- | --------- |
| gap          | 列间距       | `string \| number`                              | -         |
| col-gap      | 水平间距     | `string \| number`                              | -         |
| row-gap      | 垂直间距     | `string \| number`                              | -         |
| align        | 垂直对齐方式 | `start \| end \| center \| stretch \| baseline` | `stretch` |
| justify      | 水平对齐方式 | `start \| end \| center \| between \| around`   | `start`   |
| custom-class | 自定义类名   | `string`                                        | -         |
| custom-style | 自定义样式   | `string \| object`                              | -         |

## Col Props

| 参数         | 说明               | 类型                                            | 默认值    |
| ------------ | ------------------ | ----------------------------------------------- | --------- |
| span         | 栅格占据的列数     | `number`                                        | `24`      |
| offset       | 栅格左侧的偏移格数 | `number`                                        | `0`       |
| align        | 垂直对齐方式       | `start \| end \| center \| stretch \| baseline` | `stretch` |
| justify      | 水平对齐方式       | `start \| end \| center \| between \| around`   | `start`   |
| custom-class | 自定义类名         | `string`                                        | -         |
| custom-style | 自定义样式         | `string \| object`                              | -         |
