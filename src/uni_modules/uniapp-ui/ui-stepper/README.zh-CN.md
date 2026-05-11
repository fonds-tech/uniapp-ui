# Stepper 步进器

数字加减输入控件。支持小数 / 范围 / 长按 / 异步拦截 / 三种主题。

## 基础用法

```vue
<template>
  <ui-stepper v-model="value" />
</template>

<script setup>
const value = ref(1)
</script>
```

## 范围与步长

```vue
<ui-stepper v-model="v" :min="1" :max="10" :step="2" />
```

## 小数位数

```vue
<ui-stepper v-model="v" :step="0.1" :decimal-length="1" />
```

## 主题

```vue
<ui-stepper v-model="v" theme="button" />
<ui-stepper v-model="v" theme="round" />
<ui-stepper v-model="v" theme="border" />
```

## 尺寸

```vue
<ui-stepper v-model="v" size="small" />
<ui-stepper v-model="v" size="medium" />
<ui-stepper v-model="v" size="large" />
```

## 异步拦截

```vue
<ui-stepper v-model="v" :before-change="check" />
<script setup>
function check(value) {
  return value <= 5  // 返回 false 或 Promise<false> 取消变更
}
</script>
```

## 长按连续

```vue
<ui-stepper v-model="v" long-press />
```

## 自定义按钮 slot

```vue
<ui-stepper v-model="v">
  <template #minus="{ disabled }">
    <view :class="{ off: disabled }">−</view>
  </template>
  <template #plus="{ disabled }">
    <view :class="{ off: disabled }">+</view>
  </template>
</ui-stepper>
```

## API

### Props

| 参数               | 说明                      | 类型                                           | 默认值     |
| ------------------ | ------------------------- | ---------------------------------------------- | ---------- |
| v-model            | 绑定值                    | `number \| string`                             | `0`        |
| min                | 最小值                    | `number \| string`                             | `0`        |
| max                | 最大值                    | `number \| string`                             | `Infinity` |
| step               | 步长                      | `number \| string`                             | `1`        |
| name               | 标识符（change 第二参数） | `number \| string`                             | -          |
| size               | 尺寸预设                  | `'small' \| 'medium' \| 'large'`               | `'medium'` |
| height             | 自定义高度，覆盖 size     | `number \| string`                             | -          |
| theme              | 主题                      | `'button' \| 'round' \| 'border'`              | `'button'` |
| integer            | 仅允许正整数              | `boolean`                                      | `false`    |
| decimal-length     | 显示的小数位数            | `number \| string`                             | -          |
| disabled           | 禁用                      | `boolean`                                      | `false`    |
| disable-plus       | 仅禁用加号                | `boolean`                                      | `false`    |
| disable-minus      | 仅禁用减号                | `boolean`                                      | `false`    |
| disabled-input     | 禁用输入框输入            | `boolean`                                      | `false`    |
| input-gap          | 输入框左右间隙            | `number \| string`                             | -          |
| input-width        | 输入框宽度                | `number \| string`                             | -          |
| input-color        | 输入框背景色              | `string`                                       | -          |
| input-text-size    | 输入框文字大小            | `number \| string`                             | -          |
| input-text-weight  | 输入框文字粗细            | `number \| string`                             | -          |
| input-text-color   | 输入框文字颜色            | `string`                                       | -          |
| minus-width        | 减号宽度                  | `number \| string`                             | -          |
| minus-color        | 减号背景色                | `string`                                       | -          |
| minus-border-color | 减号边框色（border 主题） | `string`                                       | -          |
| plus-width         | 加号宽度                  | `number \| string`                             | -          |
| plus-color         | 加号背景色                | `string`                                       | -          |
| plus-border-color  | 加号边框色（border 主题） | `string`                                       | -          |
| border-color       | 外框颜色（border 主题）   | `string`                                       | -          |
| border-width       | 外框宽度（border 主题）   | `number \| string`                             | -          |
| show-plus          | 显示加号                  | `boolean`                                      | `true`     |
| show-minus         | 显示减号                  | `boolean`                                      | `true`     |
| show-input         | 显示输入框                | `boolean`                                      | `true`     |
| long-press         | 长按连续加减              | `boolean`                                      | `false`    |
| before-change      | 值变更前拦截              | `(value, name) => boolean \| Promise<boolean>` | -          |
| custom-class       | 自定义类名                | `string`                                       | -          |
| custom-style       | 自定义样式                | `string \| CSSProperties`                      | -          |

### Events

| 事件名            | 说明                               | 回调参数                  |
| ----------------- | ---------------------------------- | ------------------------- |
| update:modelValue | 值变更                             | `value: number \| string` |
| change            | 值变更（带 name）                  | `value, name`             |
| plus              | 点击加号                           | -                         |
| minus             | 点击减号                           | -                         |
| overlimit         | 超出 min/max 时触发                | `type: 'plus' \| 'minus'` |
| focus             | 输入框聚焦                         | -                         |
| blur              | 输入框失焦                         | `event`                   |
| click             | 点击输入框区域（disabledInput 时） | -                         |

### Slots

| 名称  | 说明           | 参数                    |
| ----- | -------------- | ----------------------- |
| minus | 自定义减号内容 | `{ disabled: boolean }` |
| plus  | 自定义加号内容 | `{ disabled: boolean }` |

### CSS 变量

| 名称                      | 说明       |
| ------------------------- | ---------- |
| --ui-stepper-height       | 整体高度   |
| --ui-stepper-button-size  | 按钮尺寸   |
| --ui-stepper-input-width  | 输入框宽度 |
| --ui-stepper-input-gap    | 输入框间隙 |
| --ui-stepper-icon-size    | 图标大小   |
| --ui-stepper-minus-bg     | 减号背景   |
| --ui-stepper-plus-bg      | 加号背景   |
| --ui-stepper-border-color | 外框颜色   |
| --ui-stepper-border-width | 外框宽度   |
