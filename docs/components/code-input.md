# CodeInput 验证码输入

用于输入短信验证码、支付密码等场景的验证码输入框组件。

## 基础用法

通过 `v-model` 绑定输入值，当输入完成时会触发 `complete` 事件。

```vue
<template>
  <ui-code-input v-model="code" @complete="onComplete" />
</template>

<script setup>
import { ref } from "vue"

const code = ref("")

function onComplete(value) {
  console.log("验证码:", value)
}
</script>
```

## 自定义长度

通过 `length` 属性设置验证码长度，默认为 6。

```vue
<template>
  <ui-code-input v-model="code" :length="4" />
</template>
```

## 样式类型

通过 `type` 属性设置样式类型，支持 `box`、`underline`、`filled` 三种样式。

```vue
<template>
  <!-- 方框样式（默认） -->
  <ui-code-input v-model="code" type="box" />

  <!-- 下划线样式 -->
  <ui-code-input v-model="code" type="underline" />

  <!-- 填充样式 -->
  <ui-code-input v-model="code" type="filled" />
</template>
```

## 密码模式

通过 `mask` 属性开启密码模式，输入内容将显示为圆点。

```vue
<template>
  <ui-code-input v-model="code" mask />
</template>
```

## 自定义样式

通过各种样式属性自定义验证码格子的外观。

```vue
<template>
  <ui-code-input
    v-model="code"
    :length="4"
    code-width="100rpx"
    code-height="120rpx"
    code-radius="16rpx"
    code-active-color="#6366F1"
    text-size="48rpx"
    text-color="#6366F1"
    gap="32rpx"
  />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用输入框。

```vue
<template>
  <ui-code-input v-model="code" disabled />
</template>
```

## 配合数字键盘

可以配合 `ui-keyboard` 组件使用自定义数字键盘。

```vue
<template>
  <ui-code-input v-model="code" :length="6" />
  <ui-keyboard v-model="code" :maxlength="6" />
</template>
```

## Props

| 参数                   | 说明                   | 类型                         | 默认值   |
| ---------------------- | ---------------------- | ---------------------------- | -------- |
| v-model                | 输入值                 | `string`                     | -        |
| length                 | 验证码长度             | `number`                     | `6`      |
| type                   | 样式类型               | `box \| underline \| filled` | `box`    |
| mask                   | 是否为密码模式         | `boolean`                    | `false`  |
| input-type             | 输入类型               | `number \| text`             | `number` |
| autofocus              | 自动聚焦               | `boolean`                    | `false`  |
| disabled               | 是否禁用               | `boolean`                    | `false`  |
| readonly               | 是否只读               | `boolean`                    | `false`  |
| error                  | 是否错误状态           | `boolean`                    | `false`  |
| error-color            | 错误状态边框颜色       | `string`                     | -        |
| adjust-position        | 键盘弹起时是否上推页面 | `boolean`                    | `true`   |
| gap                    | 格子间距               | `string \| number`           | `20rpx`  |
| code-width             | 格子宽度               | `string \| number`           | `80rpx`  |
| code-height            | 格子高度               | `string \| number`           | `100rpx` |
| code-color             | 边框/下划线颜色        | `string`                     | -        |
| code-active-color      | 聚焦时边框/下划线颜色  | `string`                     | -        |
| code-background        | 背景色                 | `string`                     | -        |
| code-active-background | 聚焦时背景色           | `string`                     | -        |
| code-radius            | 圆角                   | `string \| number`           | `8rpx`   |
| code-border-width      | 边框宽度               | `string \| number`           | `2rpx`   |
| text-size              | 文本字号               | `string \| number`           | `40rpx`  |
| text-color             | 文本颜色               | `string`                     | -        |
| text-weight            | 文本粗细               | `string \| number`           | -        |
| show-cursor            | 是否显示光标           | `boolean`                    | `true`   |
| cursor-width           | 光标宽度               | `string \| number`           | `2rpx`   |
| cursor-height          | 光标高度               | `string \| number`           | `40rpx`  |
| cursor-color           | 光标颜色               | `string`                     | -        |
| dot-size               | 密码模式圆点尺寸       | `string \| number`           | `20rpx`  |
| dot-color              | 密码模式圆点颜色       | `string`                     | -        |
| custom-class           | 自定义类名             | `string`                     | -        |
| custom-style           | 自定义样式             | `string \| object`           | -        |

## Events

| 事件名   | 说明             | 回调参数        |
| -------- | ---------------- | --------------- |
| click    | 点击组件时触发   | -               |
| focus    | 输入框聚焦时触发 | -               |
| blur     | 输入框失焦时触发 | -               |
| change   | 输入值变化时触发 | `value: string` |
| complete | 输入完成时触发   | `value: string` |

## Slots

| 名称    | 说明           | 作用域参数                                           |
| ------- | -------------- | ---------------------------------------------------- |
| default | 自定义格子内容 | `{ value: string, index: number, focused: boolean }` |

## Methods

通过 ref 可以获取到组件实例并调用实例方法。

| 方法名 | 说明     | 参数 | 返回值 |
| ------ | -------- | ---- | ------ |
| focus  | 获取焦点 | -    | -      |
| blur   | 失去焦点 | -    | -      |
| clear  | 清空输入 | -    | -      |

```vue
<template>
  <ui-code-input ref="codeInputRef" v-model="code" />
  <ui-button @click="codeInputRef?.focus()">聚焦</ui-button>
</template>

<script setup>
import { ref } from "vue"

const code = ref("")
const codeInputRef = ref()
</script>
```

## 类型定义

```typescript
type CodeInputType = "box" | "underline" | "filled"
type CodeInputMode = "number" | "text"
```
