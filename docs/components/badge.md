# Badge 徽标

在右上角展示徽标数字或圆点。

## 基础用法

```vue
<template>
  <ui-badge :value="5">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="10">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge value="new">
    <view class="badge-box" />
  </ui-badge>
</template>
```

## 最大值

通过 `max` 属性设置最大值，超过最大值时显示 `{max}+`。

```vue
<template>
  <ui-badge :value="20" :max="9">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="50" :max="20">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="200" :max="99">
    <view class="badge-box" />
  </ui-badge>
</template>
```

## 圆点徽标

通过 `dot` 属性设置为圆点徽标。

```vue
<template>
  <ui-badge dot>
    <view class="badge-box" />
  </ui-badge>
  <ui-badge dot color="success">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge dot color="warning">
    <view class="badge-box" />
  </ui-badge>
</template>
```

## 自定义颜色

通过 `color` 属性自定义徽标颜色。

```vue
<template>
  <ui-badge :value="5" color="primary">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="10" color="success">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="15" color="warning">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="20" color="#8B5CF6">
    <view class="badge-box" />
  </ui-badge>
</template>
```

## 定位位置

通过 `position` 属性设置徽标位置。

```vue
<template>
  <ui-badge :value="1" position="top-left">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="2" position="top-right">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="3" position="bottom-left">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="4" position="bottom-right">
    <view class="badge-box" />
  </ui-badge>
</template>
```

## 自定义偏移

通过 `offset` 属性设置徽标偏移量。

```vue
<template>
  <ui-badge :value="8" :offset="[-10, -10]">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="8" :offset="[0, 0]">
    <view class="badge-box" />
  </ui-badge>
  <ui-badge :value="8" :offset="[10, 10]">
    <view class="badge-box" />
  </ui-badge>
</template>
```

## 独立展示

不传入子元素时，徽标将作为独立元素展示。

```vue
<template>
  <ui-badge :value="99" />
  <ui-badge value="Hot" color="error" />
  <ui-badge value="New" color="primary" />
</template>
```

## 显示零值

通过 `show-zero` 属性控制值为 0 时是否显示徽标。

```vue
<template>
  <!-- 默认隐藏零值 -->
  <ui-badge :value="0">
    <view class="badge-box" />
  </ui-badge>
  <!-- 显示零值 -->
  <ui-badge :value="0" show-zero>
    <view class="badge-box" />
  </ui-badge>
</template>
```

## Props

| 参数         | 说明              | 类型                                                   | 默认值      |
| ------------ | ----------------- | ------------------------------------------------------ | ----------- |
| value        | 徽标内容          | `string \| number`                                     | -           |
| dot          | 是否显示圆点      | `boolean`                                              | `false`     |
| icon         | 图标名称          | `string`                                               | -           |
| color        | 徽标颜色          | `string`                                               | -           |
| dot-size     | 圆点大小          | `string \| number`                                     | -           |
| max          | 最大值            | `number`                                               | `99`        |
| show-zero    | 值为 0 时是否显示 | `boolean`                                              | `false`     |
| height       | 徽标高度          | `string \| number`                                     | -           |
| radius       | 圆角大小          | `string \| number`                                     | -           |
| offset       | 位置偏移          | `[number, number]`                                     | -           |
| z-index      | 层级              | `number`                                               | -           |
| position     | 定位位置          | `top-left \| top-right \| bottom-left \| bottom-right` | `top-right` |
| value-size   | 字体大小          | `string \| number`                                     | -           |
| value-color  | 字体颜色          | `string`                                               | -           |
| value-weight | 字体粗细          | `string \| number`                                     | -           |
| custom-class | 自定义类名        | `string`                                               | -           |
| custom-style | 自定义样式        | `string \| object`                                     | -           |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击徽标时触发 | -        |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 徽标包裹的内容 |
| content | 自定义徽标内容 |
