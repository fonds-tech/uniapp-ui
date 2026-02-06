# Stepper 步进器

用于对数量进行增减操作。

## 基础用法

```vue
<template>
  <ui-stepper v-model="value" />
</template>

<script setup>
import { ref } from "vue"
const value = ref(1)
</script>
```

## 步长设置

通过 `step` 属性设置每次点击增减的数量。

```vue
<template>
  <ui-stepper v-model="value" :step="2" />
</template>
```

## 限制范围

通过 `min` 和 `max` 属性限制允许的数值范围。

```vue
<template>
  <ui-stepper v-model="value" :min="5" :max="10" />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用步进器。

```vue
<template>
  <ui-stepper v-model="value" disabled />
</template>
```

## 禁用输入

通过 `disabled-input` 属性禁用输入框，用户只能通过按钮操作。

```vue
<template>
  <ui-stepper v-model="value" disabled-input />
</template>
```

## 小数位数

通过 `decimal-length` 属性设置允许的小数位数。

```vue
<template>
  <ui-stepper v-model="value" :step="0.1" :decimal-length="1" />
</template>
```

## 圆角风格

通过 `theme="round"` 设置圆角风格的步进器。

```vue
<template>
  <ui-stepper v-model="value" theme="round" />
</template>
```

## 长按快速加减

通过 `long-press` 属性启用长按快速加减功能。

```vue
<template>
  <ui-stepper v-model="value" long-press />
</template>
```

## 自定义尺寸

通过 `height` 和 `input-width` 属性自定义步进器尺寸。

```vue
<template>
  <ui-stepper v-model="value" height="64rpx" input-width="80rpx" />
</template>
```

## Props

| 参数              | 说明                   | 类型                        | 默认值     |
| ----------------- | ---------------------- | --------------------------- | ---------- |
| v-model           | 当前输入的值           | `string \| number`          | `0`        |
| min               | 最小值                 | `string \| number`          | `0`        |
| max               | 最大值                 | `string \| number`          | `Infinity` |
| step              | 步长                   | `string \| number`          | `1`        |
| name              | 标识符                 | `string \| number`          | -          |
| height            | 组件高度               | `string \| number`          | -          |
| theme             | 主题风格               | `button \| round \| border` | `button`   |
| integer           | 是否只能输入正整数     | `boolean`                   | `false`    |
| decimal-length    | 固定显示的小数位数     | `string \| number`          | -          |
| disabled          | 是否禁用               | `boolean`                   | `false`    |
| disable-plus      | 是否禁用增加按钮       | `boolean`                   | `false`    |
| disable-minus     | 是否禁用减少按钮       | `boolean`                   | `false`    |
| disabled-input    | 是否禁用输入框         | `boolean`                   | `false`    |
| input-gap         | 输入框左右间距         | `string \| number`          | -          |
| input-width       | 输入框宽度             | `string \| number`          | -          |
| input-color       | 输入框背景色           | `string`                    | -          |
| input-text-size   | 输入框文字大小         | `string \| number`          | -          |
| input-text-weight | 输入框文字粗细         | `string \| number`          | -          |
| input-text-color  | 输入框文字颜色         | `string`                    | -          |
| show-plus         | 是否显示增加按钮       | `boolean`                   | `true`     |
| show-minus        | 是否显示减少按钮       | `boolean`                   | `true`     |
| show-input        | 是否显示输入框         | `boolean`                   | `true`     |
| long-press        | 是否允许长按加减       | `boolean`                   | `false`    |
| before-change     | 输入值变化前的回调函数 | `Function`                  | -          |
| custom-class      | 自定义类名             | `string`                    | -          |
| custom-style      | 自定义样式             | `string \| object`          | -          |

## Events

| 事件名    | 说明                 | 回调参数                                          |
| --------- | -------------------- | ------------------------------------------------- |
| change    | 当绑定值变化时触发   | `value: number \| string, name: number \| string` |
| plus      | 点击增加按钮时触发   | -                                                 |
| minus     | 点击减少按钮时触发   | -                                                 |
| overlimit | 点击不可用按钮时触发 | `type: string`                                    |
| focus     | 输入框聚焦时触发     | -                                                 |
| blur      | 输入框失焦时触发     | `event`                                           |


<!-- AUTO-PROPS-SUPPLEMENT: ui-stepper -->
## Stepper Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `size` |
| `minus-width` |
| `minus-color` |
| `minus-text-size` |
| `minus-text-color` |
| `minus-border-color` |
| `plus-width` |
| `plus-color` |
| `plus-text-size` |
| `plus-text-color` |
| `plus-border-color` |
| `border-color` |
| `border-width` |

<!-- AUTO-EVENTS-SUPPLEMENT: ui-stepper -->
## Stepper Events 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 事件名 |
| --- |
| `click` |

