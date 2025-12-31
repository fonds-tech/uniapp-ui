# Empty 空状态

空状态占位组件，用于展示无数据时的提示。

## 基础用法

```vue
<template>
  <ui-empty />
</template>
```

## 自定义图标

通过 `icon` 属性设置自定义图标。

```vue
<template>
  <ui-empty icon="search" text="暂无搜索结果" />
</template>
```

## 自定义样式

通过 `icon-size`、`icon-color`、`text-color` 等属性自定义样式。

```vue
<template>
  <ui-empty icon="wifi-off" text="网络异常" icon-size="120rpx" icon-color="#999" text-color="#666" />
</template>
```

## 底部插槽

通过 `footer` 插槽在底部添加操作按钮。

```vue
<template>
  <ui-empty icon="cart" text="购物车是空的">
    <template #footer>
      <ui-button type="primary" size="small">去购物</ui-button>
    </template>
  </ui-empty>
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示 | `boolean` | `true` |
| icon | 图标名称 | `string` | - |
| text | 提示文字 | `string` | `暂无数据~` |
| text-size | 文字大小 | `string \| number` | - |
| text-color | 文字颜色 | `string` | - |
| text-weight | 文字粗细 | `string \| number` | - |
| icon-size | 图标大小 | `string \| number` | - |
| icon-color | 图标颜色 | `string` | - |
| icon-weight | 图标粗细 | `string \| number` | - |
| icon-width | 图标宽度 | `string \| number` | - |
| icon-height | 图标高度 | `string \| number` | - |
| margin | 外边距 | `string \| number` | - |
| padding | 内边距 | `string \| number` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义图标区域 |
| footer | 底部内容 |
