# Space 间距

用于在多个元素之间快速设置统一间距的布局容器组件。

## 基础用法

```vue
<template>
  <ui-space>
    <ui-button type="primary">按钮1</ui-button>
    <ui-button type="primary">按钮2</ui-button>
    <ui-button type="primary">按钮3</ui-button>
  </ui-space>
</template>
```

## 垂直排列

```vue
<ui-space direction="vertical" fill>
  <ui-input placeholder="请输入用户名" />
  <ui-input placeholder="请输入密码" type="password" />
</ui-space>
```

## 预设与自定义间距

```vue
<ui-space size="small">
  <ui-tag>small</ui-tag>
  <ui-tag>16rpx</ui-tag>
</ui-space>

<ui-space size="32rpx">
  <ui-tag>自定义</ui-tag>
  <ui-tag>32rpx</ui-tag>
</ui-space>
```

## 行列间距分离

```vue
<ui-space wrap gap-col="16rpx" gap-row="32rpx">
  <ui-button v-for="i in 8" :key="i" size="small">按钮{{ i }}</ui-button>
</ui-space>
```

## 对齐方式

```vue
<ui-space align="center" justify="space-between">
  <ui-button size="small">左侧</ui-button>
  <ui-button size="small">右侧</ui-button>
</ui-space>
```

## Props

| 参数         | 说明                                 | 类型                                                                 | 默认值         |
| ------------ | ------------------------------------ | -------------------------------------------------------------------- | -------------- |
| direction    | 排列方向                             | `'horizontal' \| 'vertical'`                                        | `'horizontal'` |
| size         | 间距大小（支持预设值或自定义值）     | `'mini' \| 'small' \| 'normal' \| 'large' \| string \| number` | `'normal'`     |
| align        | 交叉轴对齐方式                       | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch' \| ''` | `''`           |
| justify      | 主轴对齐方式                         | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' \| ''` | `''`           |
| wrap         | 是否换行（仅水平排列有效）           | `boolean`                                                            | `false`        |
| fill         | 子元素是否填充可用空间               | `boolean`                                                            | `false`        |
| inline       | 是否使用 `inline-flex` 布局          | `boolean`                                                            | `false`        |
| gap-row      | 行间距（优先级高于 `size`）          | `string \| number`                                                  | `''`           |
| gap-col      | 列间距（优先级高于 `size`）          | `string \| number`                                                  | `''`           |
| custom-class | 自定义类名                           | `string`                                                             | `''`           |
| custom-style | 自定义样式                           | `string \| object`                                                  | `''`           |

## Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |
