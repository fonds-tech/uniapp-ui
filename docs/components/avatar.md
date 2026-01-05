# Avatar 头像

用于展示用户头像、图标或文字的组件，支持图片、图标和文字三种展示方式。

## 基础用法

```vue
<template>
  <ui-avatar src="https://picsum.photos/100" />
</template>
```

## 头像尺寸

通过 `size` 属性设置头像尺寸，支持 `mini`、`small`、`medium`、`large` 四个预设尺寸，也可以传入具体数值。

```vue
<template>
  <ui-avatar src="https://picsum.photos/100" size="mini" />
  <ui-avatar src="https://picsum.photos/100" size="small" />
  <ui-avatar src="https://picsum.photos/100" size="medium" />
  <ui-avatar src="https://picsum.photos/100" size="large" />
  <ui-avatar src="https://picsum.photos/100" size="120rpx" />
</template>
```

## 头像形状

通过 `shape` 属性设置头像形状，支持 `circle`（圆形）和 `square`（方形）。

```vue
<template>
  <!-- 圆形（默认） -->
  <ui-avatar src="https://picsum.photos/100" shape="circle" />
  <!-- 方形 -->
  <ui-avatar src="https://picsum.photos/100" shape="square" />
  <!-- 带圆角的方形 -->
  <ui-avatar src="https://picsum.photos/100" shape="square" radius="8rpx" />
</template>
```

## 图标头像

当没有图片时，可以通过 `icon` 属性显示图标。

```vue
<template>
  <ui-avatar icon="user" />
  <ui-avatar icon="user" background="#1890ff" icon-color="#fff" />
  <ui-avatar icon="user" background="#52c41a" icon-color="#fff" />
</template>
```

## 文字头像

通过 `text` 属性显示文字头像，组件会自动截取前两个字符。

```vue
<template>
  <ui-avatar text="张三" background="#1890ff" text-color="#fff" />
  <ui-avatar text="李四" background="#52c41a" text-color="#fff" />
  <ui-avatar text="U" background="#ff4d4f" text-color="#fff" />
</template>
```

## 带边框

通过 `border-color` 和 `border-width` 属性添加边框。

```vue
<template>
  <ui-avatar src="https://picsum.photos/100" border-color="#1890ff" border-width="4rpx" />
  <ui-avatar src="https://picsum.photos/100" border-color="#52c41a" border-width="4rpx" />
</template>
```

## 自定义加载失败

通过 `error` 插槽自定义加载失败时的内容。

```vue
<template>
  <ui-avatar src="https://invalid-url.com/404.jpg">
    <template #error>
      <text>加载失败</text>
    </template>
  </ui-avatar>
</template>
```

## 头像组

组合多个头像实现头像组效果。

```vue
<template>
  <view class="avatar-group">
    <ui-avatar
      v-for="i in 5"
      :key="i"
      :src="`https://picsum.photos/${100 + i}`"
      size="80rpx"
      border-color="#fff"
      border-width="4rpx"
      class="avatar-group-item"
    />
    <view class="avatar-more">+3</view>
  </view>
</template>

<style>
.avatar-group {
  display: flex;
  align-items: center;
}
.avatar-group-item {
  margin-left: -20rpx;
}
.avatar-group-item:first-child {
  margin-left: 0;
}
.avatar-more {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  margin-left: -20rpx;
  font-size: 24rpx;
  color: #999;
  background: #f5f5f5;
  border: 4rpx solid #fff;
  border-radius: 50%;
}
</style>
```

## Props

| 参数         | 说明                                    | 类型               | 默认值   |
| ------------ | --------------------------------------- | ------------------ | -------- |
| src          | 头像图片地址                            | `string`           | -        |
| size         | 头像尺寸                                | `string \| number` | `medium` |
| shape        | 头像形状                                | `circle \| square` | `circle` |
| icon         | 图标名称                                | `string`           | -        |
| icon-color   | 图标颜色                                | `string`           | -        |
| icon-size    | 图标大小                                | `string \| number` | -        |
| text         | 文字内容，自动截取前两个字符            | `string`           | -        |
| text-color   | 文字颜色                                | `string`           | -        |
| text-size    | 文字大小                                | `string \| number` | -        |
| alt          | 图片替代文字                            | `string`           | -        |
| fit          | 图片填充模式                            | `string`           | `cover`  |
| background   | 背景颜色                                | `string`           | -        |
| border-color | 边框颜色                                | `string`           | -        |
| border-width | 边框宽度                                | `string \| number` | -        |
| radius       | 自定义圆角（仅 shape 为 square 时生效） | `string \| number` | -        |
| lazy-load    | 是否懒加载图片                          | `boolean`          | `false`  |
| custom-class | 自定义类名                              | `string`           | -        |
| custom-style | 自定义样式                              | `string \| object` | -        |

## Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| click  | 点击头像时触发     | `event`  |
| load   | 图片加载成功时触发 | `event`  |
| error  | 图片加载失败时触发 | `event`  |

## Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| default | 自定义头像内容           |
| error   | 图片加载失败时显示的内容 |

## 样式变量

组件使用以下 CSS 变量，可通过修改这些变量自定义样式：

| 变量名                      | 说明         | 默认值 |
| --------------------------- | ------------ | ------ |
| --ui-color-background-light | 默认背景色   | -      |
| --ui-color-text-secondary   | 文字颜色     | -      |
| --ui-color-text-placeholder | 占位图标颜色 | -      |
| --ui-radius-md              | 方形头像圆角 | -      |
