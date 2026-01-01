# Col 列

栅格布局的列组件，与 Row 组件配合使用，基于 24 栅格系统。

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

通过 `span` 属性设置栅格占据的列数，总共 24 列。

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

通过 `justify` 和 `align` 属性设置列内容的对齐方式。

```vue
<template>
  <ui-row>
    <ui-col :span="12" justify="center" align="center" style="height: 100rpx; background: #f5f5f5;">
      水平垂直居中
    </ui-col>
    <ui-col :span="12" justify="end" align="end" style="height: 100rpx; background: #eee;">
      右下对齐
    </ui-col>
  </ui-row>
</template>
```

## Props

| 参数         | 说明               | 类型                                            | 默认值    |
| ------------ | ------------------ | ----------------------------------------------- | --------- |
| span         | 栅格占据的列数     | `number`                                        | `24`      |
| offset       | 栅格左侧的偏移格数 | `number`                                        | `0`       |
| align        | 垂直对齐方式       | `start \| end \| center \| stretch \| baseline` | `stretch` |
| justify      | 水平对齐方式       | `start \| end \| center \| between \| around`   | `start`   |
| custom-class | 自定义类名         | `string`                                        | -         |
| custom-style | 自定义样式         | `string \| object`                              | -         |

## Slots

| 名称    | 说明   |
| ------- | ------ |
| default | 列内容 |
