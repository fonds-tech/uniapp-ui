# IndexAnchor 索引锚点

索引锚点组件，需配合 `IndexBar` 使用。

## 基础用法

```vue
<template>
  <ui-index-bar>
    <ui-index-anchor name="A" text="A" />
    <ui-cell title="安徽" />
    <ui-cell title="澳门" />

    <ui-index-anchor name="B" text="B" />
    <ui-cell title="北京" />

    <ui-index-anchor name="C" text="C" />
    <ui-cell title="重庆" />
  </ui-index-bar>
</template>
```

## 自定义样式

```vue
<template>
  <ui-index-bar>
    <ui-index-anchor
      name="A"
      text="A"
      color="#1989fa"
      font-size="28rpx"
      font-weight="bold"
      background="#f5f5f5"
    />
    <ui-cell title="安徽" />
  </ui-index-bar>
</template>
```

## 吸顶样式

通过 `sticky-*` 属性设置吸顶时的样式。

```vue
<template>
  <ui-index-bar>
    <ui-index-anchor
      name="A"
      text="A"
      sticky-color="#fff"
      sticky-background="#1989fa"
    />
    <ui-cell title="安徽" />
  </ui-index-bar>
</template>
```

## Props

| 参数               | 说明                     | 类型               | 默认值 |
| ------------------ | ------------------------ | ------------------ | ------ |
| name               | 索引名称，作为匹配标识符 | `string \| number` | -      |
| text               | 索引字符                 | `string \| number` | -      |
| color              | 字符颜色                 | `string`           | -      |
| height             | 高度                     | `string \| number` | -      |
| font-size          | 字符大小                 | `string \| number` | -      |
| font-weight        | 字符粗细                 | `string \| number` | -      |
| background         | 背景颜色                 | `string`           | -      |
| sticky-color       | 吸顶时字符颜色           | `string`           | -      |
| sticky-font-size   | 吸顶时字符大小           | `string \| number` | -      |
| sticky-font-weight | 吸顶时字符粗细           | `string \| number` | -      |
| sticky-background  | 吸顶时背景颜色           | `string`           | -      |
| custom-class       | 自定义类名               | `string`           | -      |
| custom-style       | 自定义样式               | `string \| object` | -      |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| blur   | 失去焦点时触发 | -        |
