# Tooltip 文字提示

用于在目标元素上方展示提示信息。

## 基础用法

```vue
<template>
  <ui-tooltip content="提示内容">
    <ui-button>悬停或点击</ui-button>
  </ui-tooltip>
</template>
```

## Props

| 参数         | 说明                   | 类型                                                     | 默认值 |
| ------------ | ---------------------- | -------------------------------------------------------- | ------ |
| content      | 提示内容               | `string`                                                 | `""` |
| placement    | 弹出位置               | `top \| top-start \| top-end \| bottom \| bottom-start \| bottom-end \| left \| left-start \| left-end \| right \| right-start \| right-end` | `top` |
| trigger      | 触发方式（小程序仅 click） | `click \| hover`                                      | `click` |
| visible      | 是否显示（支持 v-model） | `boolean`                                               | `false` |
| disabled     | 是否禁用               | `boolean`                                                | `false` |
| offset       | 偏移量                 | `string \| number`                                       | `0`    |
| show-arrow   | 是否显示箭头           | `boolean`                                                | `true` |
| show-close   | 是否显示关闭按钮       | `boolean`                                                | `false` |
| bg-color     | 背景颜色               | `string`                                                 | -      |
| text-color   | 文字颜色               | `string`                                                 | -      |
| max-width    | 最大宽度               | `string \| number`                                       | `300rpx` |
| duration     | 动画时长（毫秒）       | `number`                                                 | `200`  |
| z-index      | 元素层级               | `string \| number`                                       | -      |
| custom-class | 自定义类名             | `string`                                                 | `""` |
| custom-style | 自定义样式             | `string \| object`                                       | -      |

## Events

| 事件名            | 说明         | 回调参数 |
| ----------------- | ------------ | -------- |
| update:visible    | 更新显示状态 | `visible: boolean` |
| open              | 打开时触发   | -        |
| close             | 关闭时触发   | -        |

## Slots

| 名称     | 说明       |
| -------- | ---------- |
| default  | 触发元素   |
| content  | 提示内容区 |

## Methods

| 方法名 | 说明   | 参数 |
| ------ | ------ | ---- |
| open   | 打开   | -    |
| close  | 关闭   | -    |
| toggle | 切换   | -    |