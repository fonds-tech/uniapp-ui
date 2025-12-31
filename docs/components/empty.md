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
