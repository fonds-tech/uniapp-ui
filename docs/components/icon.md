# Icon 图标

基于字体的图标组件。

## 基础用法

```vue
<ui-icon name="check" />
<ui-icon name="close" />
<ui-icon name="plus" />
```

## 图标颜色

```vue
<ui-icon name="star" color="#1989fa" />
<ui-icon name="star" color="#07c160" />
<ui-icon name="star" color="#ee0a24" />
```

## 图标大小

```vue
<ui-icon name="like" size="32rpx" />
<ui-icon name="like" size="48rpx" />
<ui-icon name="like" size="64rpx" />
```

## 常用图标

| 图标 | 名称   | 图标 | 名称     |
| ---- | ------ | ---- | -------- |
| ✓    | check  | ✕    | close    |
| +    | plus   | -    | minus    |
| 🔍   | search | ⭐   | star     |
| ❤    | like   | 🏠   | home-o   |
| 👤   | user-o | ⚙    | setting  |
| 📞   | phone  | 📍   | location |
| 🛒   | cart   | 📤   | share    |
| 🗑   | delete | ✏    | edit     |

## API

### Props

| 属性名       | 说明       | 类型               | 默认值 |
| ------------ | ---------- | ------------------ | ------ |
| name         | 图标名称   | `string`           | -      |
| color        | 图标颜色   | `string`           | -      |
| size         | 图标大小   | `string \| number` | -      |
| weight       | 图标粗细   | `string \| number` | -      |
| custom-class | 自定义类名 | `string`           | -      |
| custom-style | 自定义样式 | `string \| object` | -      |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击图标时触发 | -        |

<!-- AUTO-PROPS-SUPPLEMENT: ui-icon -->

## Icon Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数            |
| --------------- |
| `radius`        |
| `width`         |
| `height`        |
| `line-height`   |
| `image-mode`    |
| `background`    |
| `custom-prefix` |
| `hover-class`   |
