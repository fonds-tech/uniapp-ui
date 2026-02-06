# NoticeBar 通知栏（ui-notice-bar）

通知栏组件，用于循环播放通知公告。

## 基础用法

```vue
<template>
  <ui-notice-bar text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
</template>
```

## 滚动播放

通过 `scrollable` 属性控制是否滚动播放。

```vue
<template>
  <ui-notice-bar scrollable text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
</template>
```

## 关闭滚动

通过 `scrollable` 设置为 `false` 关闭滚动播放。

```vue
<template>
  <ui-notice-bar :scrollable="false" text="这是一条不会滚动的通知消息。" />
</template>
```

## 左侧图标

通过 `icon` 属性设置左侧图标。

```vue
<template>
  <ui-notice-bar icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
</template>
```

## 自定义样式

通过 `background` 和 `color` 属性自定义样式。

```vue
<template>
  <ui-notice-bar background="#ecf9ff" color="#1989fa" icon="info" text="技术是开发它的人的共同灵魂。" />
</template>
```

## 垂直滚动

传入数组并设置 `mode="vertical"` 实现垂直滚动。

```vue
<template>
  <ui-notice-bar :text="notices" mode="vertical" icon="volume-o" />
</template>

<script setup>
const notices = ["通知内容一", "通知内容二", "通知内容三"]
</script>
```

## Props

| 参数         | 说明                   | 类型                     | 默认值       |
| ------------ | ---------------------- | ------------------------ | ------------ |
| text         | 通知文本内容           | `string \| string[]`     | -            |
| mode         | 滚动模式               | `horizontal \| vertical` | `horizontal` |
| color        | 文本颜色               | `string`                 | -            |
| speed        | 滚动速率(px/s)         | `number`                 | `60`         |
| interval     | 垂直滚动时切换间隔(ms) | `number`                 | `3000`       |
| duration     | 垂直滚动时动画时长(ms) | `number`                 | `500`        |
| scrollable   | 是否开启滚动           | `boolean`                | `true`       |
| min-height   | 最小高度               | `string \| number`       | `72rpx`      |
| font-size    | 文本大小               | `string \| number`       | -            |
| font-weight  | 文本粗细               | `string \| number`       | -            |
| icon         | 左侧图标               | `string`                 | `volume-o`   |
| icon-size    | 左侧图标大小           | `string \| number`       | -            |
| icon-color   | 左侧图标颜色           | `string`                 | `warning`    |
| icon-weight  | 左侧图标粗细           | `string \| number`       | -            |
| right-icon   | 右侧图标               | `string`                 | -            |
| right-icon-size   | 右侧图标大小           | `string \| number`       | -            |
| right-icon-color  | 右侧图标颜色           | `string`                 | `warning`    |
| right-icon-weight | 右侧图标粗细           | `string \| number`       | -            |
| background   | 背景颜色               | `string`                 | -            |
| custom-class | 自定义类名             | `string`                 | -            |
| custom-style | 自定义样式             | `string \| object`       | -            |

## Events

| 事件名 | 说明             | 回调参数        |
| ------ | ---------------- | --------------- |
| click  | 点击通知栏时触发 | `index: number` |

## Slots

| 名称  | 说明           |
| ----- | -------------- |
| left  | 自定义左侧图标 |
| right | 自定义右侧图标 |

## Methods

`NoticeBar` 当前版本无额外公开方法。
