# Button 按钮

常用的操作按钮，支持多种类型、尺寸和状态。

## 基础用法

按钮支持 `primary`、`success`、`warning`、`error`、`info`、`default` 六种类型。

```vue
<template>
  <ui-button type="primary">主要按钮</ui-button>
  <ui-button type="success">成功按钮</ui-button>
  <ui-button type="warning">警告按钮</ui-button>
  <ui-button type="error">危险按钮</ui-button>
  <ui-button type="info">信息按钮</ui-button>
  <ui-button type="default">默认按钮</ui-button>
</template>
```

## 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```vue
<template>
  <ui-button type="primary" plain>朴素按钮</ui-button>
  <ui-button type="success" plain>朴素按钮</ui-button>
  <ui-button type="warning" plain>朴素按钮</ui-button>
</template>
```

## 文字按钮

通过 `text` 属性将按钮设置为文字按钮，文字按钮没有边框和背景。

```vue
<template>
  <ui-button type="primary" text>文字按钮</ui-button>
  <ui-button type="success" text>文字按钮</ui-button>
</template>
```

## 禁用状态

通过 `disabled` 属性禁用按钮，禁用状态下按钮不可点击。

```vue
<template>
  <ui-button type="primary" disabled>禁用状态</ui-button>
  <ui-button type="success" disabled>禁用状态</ui-button>
</template>
```

## 加载状态

通过 `loading` 属性设置按钮为加载状态，加载状态下按钮不可点击。

```vue
<template>
  <ui-button type="primary" loading>加载中</ui-button>
  <ui-button type="success" loading loading-text="提交中...">提交</ui-button>
</template>
```

## 按钮尺寸

支持 `mini`、`small`、`normal`、`medium`、`large` 五种尺寸。

```vue
<template>
  <ui-button type="primary" size="large">大号按钮</ui-button>
  <ui-button type="primary" size="medium">中号按钮</ui-button>
  <ui-button type="primary" size="normal">普通按钮</ui-button>
  <ui-button type="primary" size="small">小型按钮</ui-button>
  <ui-button type="primary" size="mini">迷你按钮</ui-button>
</template>
```

## 圆形按钮

通过 `round` 属性设置圆形按钮。

```vue
<template>
  <ui-button type="primary" round>圆形按钮</ui-button>
  <ui-button type="success" round>圆形按钮</ui-button>
</template>
```

## 块级按钮

通过 `block` 属性设置按钮为块级元素，按钮将占满父元素宽度。

```vue
<template>
  <ui-button type="primary" block>块级按钮</ui-button>
  <ui-button type="success" block>块级按钮</ui-button>
</template>
```

## 图标按钮

通过 `icon` 属性设置按钮图标，`icon-position` 控制图标位置。

```vue
<template>
  <ui-button type="primary" icon="search">搜索</ui-button>
  <ui-button type="success" icon="plus">新增</ui-button>
  <ui-button type="primary" icon="arrow-right" icon-position="right">下一步</ui-button>
</template>
```

## 自定义颜色

通过 `color` 属性自定义按钮背景色，`text-color` 自定义文字颜色。

```vue
<template>
  <ui-button color="#7232dd">自定义颜色</ui-button>
  <ui-button color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
    渐变色按钮
  </ui-button>
</template>
```

## API

### Props

| 属性名            | 说明             | 类型                                                                  | 默认值    |
| ----------------- | ---------------- | --------------------------------------------------------------------- | --------- |
| type              | 按钮类型         | `primary` \| `success` \| `warning` \| `error` \| `info` \| `default` | `primary` |
| size              | 按钮尺寸         | `mini` \| `small` \| `normal` \| `medium` \| `large`                  | `normal`  |
| plain             | 是否朴素按钮     | `boolean`                                                             | `false`   |
| text              | 是否文字按钮     | `boolean`                                                             | `false`   |
| round             | 是否圆形按钮     | `boolean`                                                             | `false`   |
| block             | 是否块级按钮     | `boolean`                                                             | `false`   |
| disabled          | 是否禁用         | `boolean`                                                             | `false`   |
| loading           | 是否加载状态     | `boolean`                                                             | `false`   |
| loading-text      | 加载状态文字     | `string`                                                              | -         |
| loading-icon-size | 加载图标大小     | `string \| number`                                                    | -         |
| color             | 按钮颜色         | `string`                                                              | -         |
| width             | 按钮宽度         | `string \| number`                                                    | -         |
| height            | 按钮高度         | `string \| number`                                                    | -         |
| text-size         | 文字大小         | `string \| number`                                                    | -         |
| text-color        | 文字颜色         | `string`                                                              | -         |
| text-weight       | 文字粗细         | `string \| number`                                                    | -         |
| icon              | 左侧图标名称     | `string`                                                              | -         |
| icon-position     | 图标位置         | `left` \| `right`                                                     | `left`    |
| icon-size         | 图标大小         | `string \| number`                                                    | -         |
| icon-color        | 图标颜色         | `string`                                                              | -         |
| icon-weight       | 图标粗细         | `string \| number`                                                    | -         |
| border-radius     | 圆角大小         | `string \| number`                                                    | -         |
| border-width      | 边框宽度         | `string \| number`                                                    | -         |
| border-color      | 边框颜色         | `string`                                                              | -         |
| shadow            | 阴影样式         | `string`                                                              | -         |
| throttle          | 节流时间（毫秒） | `string \| number`                                                    | `200`     |
| form-type         | 表单类型         | `submit` \| `reset`                                                   | -         |
| open-type         | 微信开放能力     | `string`                                                              | -         |
| custom-class      | 自定义类名       | `string`                                                              | -         |
| custom-style      | 自定义样式       | `string \| object`                                                    | -         |

### Events

| 事件名         | 说明                   | 回调参数       |
| -------------- | ---------------------- | -------------- |
| click          | 点击按钮时触发         | `event: Event` |
| getuserinfo    | 获取用户信息回调       | `event: Event` |
| getphonenumber | 获取用户手机号回调     | `event: Event` |
| opensetting    | 打开设置页回调         | `event: Event` |
| launchapp      | 打开APP回调            | `event: Event` |
| error          | 使用开放能力发生错误时 | `event: Event` |

### Methods

通过 ref 可以获取到 Button 实例并调用实例方法。

| 方法名      | 说明         | 参数                              |
| ----------- | ------------ | --------------------------------- |
| setLoading  | 设置加载状态 | `(state: boolean, text?: string)` |
| setDisabled | 设置禁用状态 | `(state: boolean)`                |

```vue
<template>
  <ui-button ref="buttonRef" type="primary">按钮</ui-button>
</template>

<script setup>
import { ref } from 'vue'

const buttonRef = ref()

// 设置加载状态
buttonRef.value?.setLoading(true, '加载中...')

// 设置禁用状态
buttonRef.value?.setDisabled(true)
</script>
```

## 主题定制

组件使用以下 CSS 变量，可以通过覆盖变量进行主题定制：

| 变量名             | 说明         | 默认值    |
| ------------------ | ------------ | --------- |
| --ui-color-primary | 主色         | `#667eea` |
| --ui-color-success | 成功色       | `#67c23a` |
| --ui-color-warning | 警告色       | `#e6a23c` |
| --ui-color-error   | 错误色       | `#f56c6c` |
| --ui-color-info    | 信息色       | `#909399` |
| --ui-size-mini     | 迷你尺寸高度 | `48rpx`   |
| --ui-size-small    | 小尺寸高度   | `64rpx`   |
| --ui-size-normal   | 普通尺寸高度 | `80rpx`   |
| --ui-size-medium   | 中等尺寸高度 | `88rpx`   |
| --ui-size-large    | 大尺寸高度   | `96rpx`   |
| --ui-radius-md     | 圆角大小     | `8rpx`    |
| --ui-radius-round  | 圆形圆角     | `999rpx`  |
