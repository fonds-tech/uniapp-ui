# UiSidebarItem 组件

## 介绍

侧边栏的子项。必须放在 `ui-sidebar` 内使用。未提供 `name` 时回退到子项 index，**中间删除项会导致 index 重排错位，建议显式提供 `name`**。

## 代码演示

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item name="home" title="首页" />
    <ui-sidebar-item name="cart" title="购物车" badge="9" />
    <ui-sidebar-item name="mine" title="我的" />
  </ui-sidebar>
</template>
```

## Props

未显式提供的样式 prop 自动回退到父 `ui-sidebar` 同名 prop。

| 参数              | 说明         | 类型                                                  | 默认值   |
| ----------------- | ------------ | ----------------------------------------------------- | -------- |
| name              | 标识符       | [Number, String]                                      | -        |
| title             | 标题         | String                                                | -        |
| height            | 高度         | [Number, String]                                      | `100rpx` |
| disabled          | 是否禁用     | Boolean                                               | `false`  |
| dot               | 是否显示圆点 | Boolean                                               | `false`  |
| badge             | 徽标内容     | [Number, String]                                      | -        |
| titleColor        | 标题颜色     | string                                                | -        |
| titleSize         | 标题大小     | [Number, String]                                      | -        |
| titleWeight       | 标题粗细     | [Number, String]                                      | -        |
| titleAlign        | 文字对齐方式 | string                                                | `center` |
| activeTitleColor  | 激活标题颜色 | string                                                | -        |
| activeTitleSize   | 激活标题大小 | [Number, String]                                      | -        |
| activeTitleWeight | 激活标题粗细 | [Number, String]                                      | -        |
| background        | 背景颜色     | string                                                | -        |
| activeBackground  | 激活背景颜色 | string                                                | -        |
| customClass       | 自定义类名   | string                                                | -        |
| customStyle       | 自定义样式   | [String, Object] as PropType<string \| CSSProperties> | -        |

## Slots

| 名称    | 说明                       | 作用域                                   |
| ------- | -------------------------- | ---------------------------------------- |
| default | 自定义内容（覆盖标题渲染） | `{ active: boolean, disabled: boolean }` |
