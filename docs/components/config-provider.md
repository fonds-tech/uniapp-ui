# ConfigProvider 配置提供者

用于全局配置组件主题、样式变量等，通常包裹在应用的根节点。

## 基础用法

```vue
<template>
  <ui-config-provider>
    <view>应用内容</view>
  </ui-config-provider>
</template>
```

## 主题模式

通过 `theme` 属性设置主题模式，支持亮色、暗色和跟随系统。

```vue
<template>
  <!-- 亮色模式 -->
  <ui-config-provider theme="light">
    <view>亮色主题</view>
  </ui-config-provider>

  <!-- 暗色模式 -->
  <ui-config-provider theme="dark">
    <view>暗色主题</view>
  </ui-config-provider>

  <!-- 跟随系统 -->
  <ui-config-provider theme="auto">
    <view>跟随系统主题</view>
  </ui-config-provider>
</template>
```

## 自定义主题色

通过 `theme-vars` 属性覆盖默认的主题颜色。

```vue
<template>
  <ui-config-provider :theme-vars="themeVars">
    <ui-button type="primary">自定义主题色按钮</ui-button>
  </ui-config-provider>
</template>

<script setup>
const themeVars = {
  primary: '#7232dd',
  success: '#07c160',
}
</script>
```

## 自定义 CSS 变量

通过 `css-vars` 属性注入自定义的 CSS 变量。

```vue
<template>
  <ui-config-provider :css-vars="cssVars">
    <view :style="{ color: 'var(--my-custom-color)' }">
      使用自定义变量
    </view>
  </ui-config-provider>
</template>

<script setup>
const cssVars = {
  'my-custom-color': '#ff6b6b',
  'my-custom-size': '32rpx',
}
</script>
```

## 可用的主题变量

| 变量名           | 说明       |
| ---------------- | ---------- |
| primary          | 主题色     |
| success          | 成功色     |
| warning          | 警告色     |
| danger           | 危险色     |
| info             | 信息色     |
| text-main        | 主要文本色 |
| text-secondary   | 次要文本色 |
| text-placeholder | 占位文本色 |
| text-disabled    | 禁用文本色 |
| border           | 边框色     |
| border-light     | 浅边框色   |
| border-dark      | 深边框色   |
| background       | 背景色     |
| background-light | 浅背景色   |
| background-dark  | 深背景色   |
| mask             | 遮罩色     |
| mask-light       | 浅遮罩色   |
| mask-heavy       | 深遮罩色   |

## Props

| 参数         | 说明            | 类型                    | 默认值  |
| ------------ | --------------- | ----------------------- | ------- |
| theme        | 主题模式        | `light \| dark \| auto` | `light` |
| theme-vars   | 主题变量配置    | `object`                | `{}`    |
| css-vars     | 自定义 CSS 变量 | `object`                | `{}`    |
| height       | 容器高度        | `string \| number`      | -       |
| background   | 背景色          | `string`                | -       |
| custom-class | 自定义类名      | `string`                | -       |
| custom-style | 自定义样式      | `string \| object`      | -       |

## Events

| 事件名     | 说明           | 回调参数 |
| ---------- | -------------- | -------- |
| touchstart | 触摸开始时触发 | `event`  |
| touchmove  | 触摸移动时触发 | `event`  |
| touchend   | 触摸结束时触发 | `event`  |

## Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 默认插槽，放置应用内容 |

<!-- AUTO-EVENTS-SUPPLEMENT: ui-config-provider -->
## ConfigProvider Events 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 事件名 |
| --- |
| `scroll` |
| `reach-top` |
| `reach-bottom` |

<!-- AUTO-METHODS-SUPPLEMENT: ui-config-provider -->
## ConfigProvider Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `mitt` |

