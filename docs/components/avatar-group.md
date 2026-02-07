# AvatarGroup 头像组

用于展示多个头像的堆叠组合，支持限制显示数量、自定义堆叠方向和样式。

## 基础用法

将 `ui-avatar` 组件放置在 `ui-avatar-group` 内部即可实现头像组效果。

```vue
<template>
  <ui-avatar-group>
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
    <ui-avatar src="https://picsum.photos/104" />
  </ui-avatar-group>
</template>
```

## 限制显示数量

通过 `max` 属性限制最多显示的头像数量，超出部分会显示 `+N` 的形式。

```vue
<template>
  <!-- 最多显示 3 个头像 -->
  <ui-avatar-group :max="3">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
    <ui-avatar src="https://picsum.photos/104" />
    <ui-avatar src="https://picsum.photos/105" />
  </ui-avatar-group>
</template>
```

## 头像尺寸

通过 `size` 属性统一设置组内头像尺寸，支持 `mini`、`small`、`medium`、`large` 四个预设尺寸，也可以传入具体数值。

```vue
<template>
  <ui-avatar-group size="mini">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>

  <ui-avatar-group size="small">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>

  <ui-avatar-group size="large">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>

  <ui-avatar-group size="100rpx">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>
</template>
```

## 头像形状

通过 `shape` 属性设置头像形状，支持 `circle`（圆形）和 `square`（方形）。

```vue
<template>
  <!-- 圆形（默认） -->
  <ui-avatar-group shape="circle">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>

  <!-- 方形 -->
  <ui-avatar-group shape="square">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>
</template>
```

## 堆叠方向

通过 `direction` 属性设置堆叠方向：

- `right`（默认）：右侧头像在上层
- `left`：左侧头像在上层

```vue
<template>
  <!-- 右侧头像在上（默认） -->
  <ui-avatar-group direction="right">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>

  <!-- 左侧头像在上 -->
  <ui-avatar-group direction="left">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>
</template>
```

## 自定义间距

通过 `gap` 属性设置头像之间的间距，负数表示重叠效果。

```vue
<template>
  <!-- 默认重叠间距 -->
  <ui-avatar-group :gap="-16">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>

  <!-- 较大重叠 -->
  <ui-avatar-group :gap="-24">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>

  <!-- 无重叠 -->
  <ui-avatar-group :gap="8">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>
</template>
```

## 自定义边框

通过 `border-color` 和 `border-width` 属性自定义头像边框样式。

```vue
<template>
  <ui-avatar-group border-color="#1890ff" border-width="4rpx">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
  </ui-avatar-group>
</template>
```

## 自定义超出样式

通过 `excess-color` 和 `excess-background` 属性自定义超出数量提示的样式。

```vue
<template>
  <ui-avatar-group :max="3" excess-color="#fff" excess-background="#1890ff">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
    <ui-avatar src="https://picsum.photos/104" />
    <ui-avatar src="https://picsum.photos/105" />
  </ui-avatar-group>
</template>
```

## 点击事件

支持监听头像组点击事件和超出数量点击事件。

```vue
<template>
  <ui-avatar-group :max="3" @click="onClickGroup" @click-excess="onClickExcess">
    <ui-avatar src="https://picsum.photos/101" />
    <ui-avatar src="https://picsum.photos/102" />
    <ui-avatar src="https://picsum.photos/103" />
    <ui-avatar src="https://picsum.photos/104" />
    <ui-avatar src="https://picsum.photos/105" />
  </ui-avatar-group>
</template>

<script setup>
function onClickGroup(event) {
  console.log("点击头像组")
}

function onClickExcess(event) {
  console.log("点击超出数量，可跳转查看更多")
}
</script>
```

## Props

| 参数              | 说明                                            | 类型               | 默认值   |
| ----------------- | ----------------------------------------------- | ------------------ | -------- |
| max               | 最多显示的头像数量                              | `number`           | `5`      |
| size              | 头像尺寸，可选值为 mini/small/medium/large      | `string \| number` | `medium` |
| shape             | 头像形状，可选值为 circle/square                | `string`           | `circle` |
| gap               | 头像间距，负数表示重叠                          | `number`           | `-16`    |
| direction         | 堆叠方向，left 表示左侧在上，right 表示右侧在上 | `string`           | `right`  |
| border-color      | 头像边框颜色                                    | `string`           | `#fff`   |
| border-width      | 头像边框宽度                                    | `string \| number` | `4rpx`   |
| excess-color      | 超出数量文本颜色                                | `string`           | -        |
| excess-background | 超出数量背景颜色                                | `string`           | -        |
| custom-class      | 自定义类名                                      | `string`           | -        |
| custom-style      | 自定义样式                                      | `string \| object` | -        |

## Events

| 事件名       | 说明                   | 回调参数 |
| ------------ | ---------------------- | -------- |
| click        | 点击头像组时触发       | `event`  |
| click-excess | 点击超出数量提示时触发 | `event`  |

## Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 头像组内容，放置 ui-avatar |

## 样式变量

组件使用以下 CSS 变量，可通过修改这些变量自定义样式：

| 变量名                     | 说明               | 默认值 |
| -------------------------- | ------------------ | ------ |
| --ui-color-background-page | 超出数量默认背景色 | -      |
| --ui-color-text-secondary  | 超出数量文字颜色   | -      |
| --ui-radius-md             | 方形头像圆角       | -      |

## 注意事项

1. `ui-avatar-group` 组件会自动向子组件 `ui-avatar` 传递 `size`、`shape`、`border-color`、`border-width` 等属性
2. 子组件 `ui-avatar` 会自动继承父组件的样式配置，无需重复设置
3. 超出 `max` 数量的头像会自动隐藏，并显示 `+N` 提示
4. 点击超出数量提示时会触发 `click-excess` 事件，可用于跳转查看更多成员
