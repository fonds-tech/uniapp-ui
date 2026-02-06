# Row / Col 栅格布局

基于 Flex 的 24 栅格布局系统，由 `ui-row` 与 `ui-col` 组件组合使用。

## 基础用法

通过 `span` 属性设置栅格占据的列数，总共 24 列。

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
    <ui-col :span="6">span: 6</ui-col>
    <ui-col :span="18">span: 18</ui-col>
  </ui-row>
  <ui-row>
    <ui-col :span="12">span: 12</ui-col>
    <ui-col :span="12">span: 12</ui-col>
  </ui-row>
</template>
```

## 列间距

通过 `gap` 属性设置统一间距，也可以通过 `col-gap` 和 `row-gap` 分别设置水平和垂直间距。

```vue
<template>
  <!-- 统一间距 -->
  <ui-row gap="20rpx">
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8">span: 8</ui-col>
  </ui-row>

  <!-- 分别设置水平和垂直间距 -->
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

## 列偏移

通过 `offset` 属性设置列的偏移格数。

```vue
<template>
  <ui-row>
    <ui-col :span="8">span: 8</ui-col>
    <ui-col :span="8" :offset="8">offset: 8</ui-col>
  </ui-row>
  <ui-row>
    <ui-col :span="6" :offset="6">offset: 6</ui-col>
    <ui-col :span="6" :offset="6">offset: 6</ui-col>
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

## 禁止换行

通过 `:wrap="false"` 禁止列换行。

```vue
<template>
  <ui-row :wrap="false">
    <ui-col :span="12">不换行</ui-col>
    <ui-col :span="12">不换行</ui-col>
    <ui-col :span="12">不换行</ui-col>
  </ui-row>
</template>
```

## Row Props

| 参数         | 说明           | 类型                                            | 默认值    |
| ------------ | -------------- | ----------------------------------------------- | --------- |
| gap          | 统一间距       | `string \| number`                              | `0`       |
| col-gap      | 列间距（水平） | `string \| number`                              | `0`       |
| row-gap      | 行间距（垂直） | `string \| number`                              | `0`       |
| align        | 垂直对齐方式   | `start \| end \| center \| stretch \| baseline` | `stretch` |
| justify      | 水平对齐方式   | `start \| end \| center \| between \| around`   | `start`   |
| wrap         | 是否允许换行   | `boolean`                                       | `true`    |
| custom-class | 自定义类名     | `string`                                        | -         |
| custom-style | 自定义样式     | `string \| object`                              | -         |

## Row Slots

| 名称    | 说明                    |
| ------- | ----------------------- |
| default | 行内容，通常为 Col 组件 |

## Row Events

`Row` 当前版本无事件。

## Row Methods

`Row` 当前版本无额外公开方法。

## Col Props

| 参数         | 说明               | 类型               | 默认值 |
| ------------ | ------------------ | ------------------ | ------ |
| span         | 栅格占据的列数     | `number`           | `24`   |
| offset       | 栅格左侧的偏移格数 | `number`           | `0`    |
| custom-class | 自定义类名         | `string`           | -      |
| custom-style | 自定义样式         | `string \| object` | -      |

## Col Slots

| 名称    | 说明   |
| ------- | ------ |
| default | 列内容 |

## Col Events

`Col` 当前版本无事件。

## Col Methods

`Col` 当前版本无额外公开方法。
