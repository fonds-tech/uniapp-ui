# Navbar 导航栏

顶部导航栏组件，支持返回按钮、自定义内容等。

## 基础用法

```vue
<template>
  <ui-navbar title="标题" />
</template>
```

## 返回按钮

通过 `is-back` 属性显示返回按钮。

```vue
<template>
  <ui-navbar title="标题" is-back />
</template>
```

## 返回文字

通过 `back-text` 属性设置返回按钮文字。

```vue
<template>
  <ui-navbar title="标题" is-back back-text="返回" />
</template>
```

## 自定义左侧

通过 `left` 插槽自定义左侧内容。

```vue
<template>
  <ui-navbar title="标题">
    <template #left>
      <ui-icon name="close" size="40rpx" />
    </template>
  </ui-navbar>
</template>
```

## 自定义右侧

通过 `right` 插槽自定义右侧内容。

```vue
<template>
  <ui-navbar title="标题" is-back>
    <template #right>
      <ui-icon name="search" size="40rpx" />
    </template>
  </ui-navbar>
</template>
```

## 自定义背景

通过 `background` 和 `title-color` 属性自定义样式。

```vue
<template>
  <ui-navbar title="标题" background="primary" title-color="#ffffff" is-back back-icon-color="#ffffff" />
</template>
```

## 标题居中

通过 `title-center` 属性使标题居中。

```vue
<template>
  <ui-navbar title="标题居中" is-back title-center />
</template>
```

## 底部边框

通过 `border-bottom` 属性显示底部边框。

```vue
<template>
  <ui-navbar title="底部边框" border-bottom />
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题内容 | `string` | - |
| title-center | 标题是否居中 | `boolean` | `true` |
| title-size | 标题字体大小 | `string \| number` | `32rpx` |
| title-color | 标题颜色 | `string` | `#333333` |
| title-weight | 标题字重 | `string \| number` | `700` |
| is-back | 是否显示返回按钮 | `boolean` | `true` |
| back-text | 返回按钮文字 | `string` | - |
| back-icon-name | 返回图标名称 | `string` | `arrow-left` |
| back-icon-size | 返回图标大小 | `string \| number` | `44rpx` |
| back-icon-color | 返回图标颜色 | `string` | `#333333` |
| height | 导航栏高度 | `string \| number` | - |
| padding | 左右内边距 | `string \| number` | `20rpx` |
| background | 背景颜色 | `string` | `#ffffff` |
| fixed | 是否固定在顶部 | `boolean` | `true` |
| immersive | 是否沉浸式模式 | `boolean` | `false` |
| border-bottom | 是否显示底部边框 | `boolean` | `false` |
| z-index | 层级 | `string \| number` | - |
| home-path | 首页路径 | `string` | `/pages/home/index` |
| custom-back | 自定义返回函数 | `function` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| back | 点击返回按钮时触发 | - |
| height | 导航栏高度变化时触发 | `height: number` |

## Slots

| 名称 | 说明 |
| --- | --- |
| left | 自定义左侧内容 |
| default | 自定义标题内容 |
| right | 自定义右侧内容 |
