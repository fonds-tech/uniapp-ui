# Navbar 导航栏

顶部导航栏组件，支持返回按钮、自定义内容等。

## 基础用法

```vue
<template>
  <ui-navbar title="标题" />
</template>
```

## 返回按钮

通过 `show-back` 属性显示返回按钮。

```vue
<template>
  <ui-navbar title="标题" show-back />
</template>
```

## 返回文字

通过 `back-text` 属性设置返回按钮文字。

```vue
<template>
  <ui-navbar title="标题" show-back back-text="返回" />
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
  <ui-navbar title="标题" show-back>
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
  <ui-navbar title="标题" background="primary" title-color="#ffffff" show-back back-icon-color="#ffffff" />
</template>
```

## 标题居中

通过 `center-title` 属性使标题居中。

```vue
<template>
  <ui-navbar title="标题居中" show-back center-title />
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

| 参数             | 说明                                     | 类型               | 默认值                     |
| ---------------- | ---------------------------------------- | ------------------ | -------------------------- |
| title            | 标题内容                                 | `string`           | -                          |
| center-title     | 标题是否居中                             | `boolean`          | `true`                     |
| title-size       | 标题字体大小                             | `string \| number` | `32rpx`                    |
| title-width      | 标题宽度                                 | `string \| number` | -                          |
| title-color      | 标题颜色                                 | `string`           | `#333333`                  |
| title-weight     | 标题字重                                 | `string \| number` | `700`                      |
| show-back        | 是否显示返回按钮                         | `boolean`          | `true`                     |
| back-text        | 返回按钮文字                             | `string`           | -                          |
| back-text-size   | 返回按钮文字大小                         | `string`           | `30rpx`                    |
| back-text-color  | 返回按钮文字颜色                         | `string`           | `#333333`                  |
| back-text-weight | 返回按钮文字粗细                         | `string \| number` | -                          |
| back-icon-name   | 返回图标名称                             | `string`           | `left`                     |
| back-icon-size   | 返回图标大小                             | `string \| number` | `44rpx`                    |
| back-icon-color  | 返回图标颜色                             | `string`           | `#333333`                  |
| height           | 导航栏高度                               | `string \| number` | -                          |
| padding          | 左右内边距                               | `string \| number` | `20rpx`                    |
| background       | 背景颜色                                 | `string`           | `#ffffff`                  |
| fixed            | 是否固定在顶部                           | `boolean`          | `true`                     |
| placeholder      | 固定定位时是否生成占位元素               | `boolean`          | `true`                     |
| immersive        | 是否沉浸式模式                           | `boolean`          | `false`                    |
| gradient         | 是否开启渐变背景                         | `boolean`          | `false`                    |
| gradient-height  | 渐变区域高度                             | `string \| number` | `200px`                    |
| scroll-top       | 当前滚动位置（配合 gradient 使用）       | `number`           | -                          |
| border-bottom    | 是否显示底部边框                         | `boolean`          | `false`                    |
| z-index          | 层级                                     | `string \| number` | -                          |
| home-path        | 首页路径（页面栈只有一页时点击返回跳转） | `string`           | `/pages/tabbar/home/index` |
| home-type        | 首页跳转类型，可选 `tab` `page`          | `string`           | `tab`                      |
| custom-back      | 自定义返回函数                           | `function`         | -                          |
| custom-class     | 自定义类名                               | `string`           | -                          |
| custom-style     | 自定义样式                               | `string \| object` | -                          |

## Events

| 事件名      | 说明                   | 回调参数                |
| ----------- | ---------------------- | ----------------------- |
| back        | 点击返回按钮时触发     | -                       |
| title-click | 点击标题区域时触发     | -                       |
| rect        | 获取导航栏尺寸时触发   | `rect: UniApp.NodeInfo` |
| height      | 导航栏高度变化时触发   | `height: number`        |
| gradient    | 渐变滚动位置变化时触发 | `scrollTop: number`     |

## Methods

通过 ref 获取组件实例后调用。

| 方法名 | 说明               | 参数 | 返回值 |
| ------ | ------------------ | ---- | ------ |
| resize | 重新计算导航栏尺寸 | -    | -      |

## Slots

| 名称    | 说明               |
| ------- | ------------------ |
| left    | 自定义左侧内容     |
| back    | 自定义返回按钮图标 |
| title   | 自定义标题内容     |
| default | 自定义中间区域     |
| right   | 自定义右侧内容     |
