# Keyboard 数字键盘

虚拟数字键盘，支持数字键盘、身份证键盘、车牌号键盘。

## 基础用法

```vue
<template>
  <ui-cell title="默认键盘" :value="value1" @click="show1 = true" />
  <ui-keyboard v-model:show="show1" @input="onInput1" @delete="onDelete1" />
</template>

<script setup>
import { ref } from "vue"

const show1 = ref(false)
const value1 = ref("")

function onInput1(key) {
  value1.value += key
}
function onDelete1() {
  value1.value = value1.value.slice(0, -1)
}
</script>
```

## 带小数点

通过 `show-dot` 属性显示小数点按钮。

```vue
<template>
  <ui-keyboard v-model:show="show" show-dot @input="onInput" />
</template>
```

## 身份证键盘

通过 `mode="card"` 设置身份证键盘，支持输入 X。

```vue
<template>
  <ui-keyboard v-model:show="show" mode="card" @input="onInput" />
</template>
```

## 车牌号键盘

通过 `mode="car"` 设置车牌号键盘。

```vue
<template>
  <ui-keyboard v-model:show="show" mode="car" @input="onInput" />
</template>
```

## 随机键盘

通过 `random` 属性打乱键盘按键顺序。

```vue
<template>
  <ui-keyboard v-model:show="show" random @input="onInput" />
</template>
```

## 带标题

通过 `title` 属性设置键盘标题。

```vue
<template>
  <ui-keyboard v-model:show="show" title="请输入支付密码" @input="onInput" />
</template>
```

## Props

| 参数                   | 说明                     | 类型                    | 默认值     |
| ---------------------- | ------------------------ | ----------------------- | ---------- |
| v-model:show           | 是否显示键盘             | `boolean`               | `false`    |
| title                  | 标题                     | `string \| number`      | -          |
| mode                   | 键盘类型                 | `number \| card \| car` | `number`   |
| maxlength              | 最大输入长度             | `string \| number`      | `Infinity` |
| z-index                | 元素层级                 | `string \| number`      | -          |
| random                 | 是否打乱键盘按键顺序     | `boolean`               | `false`    |
| overlay                | 是否显示遮罩             | `boolean`               | `true`     |
| show-dot               | 是否显示小数点按钮       | `boolean`               | `false`    |
| show-header            | 是否显示顶部栏           | `boolean`               | `true`     |
| show-cancel            | 是否显示取消按钮         | `boolean`               | `true`     |
| cancel-text            | 取消按钮文字             | `string`                | `取消`     |
| cancel-text-size       | 取消按钮文字大小         | `string \| number`      | -          |
| cancel-text-color      | 取消按钮文字颜色         | `string`                | `error`    |
| cancel-text-weight     | 取消按钮文字粗细         | `string \| number`      | -          |
| show-confirm           | 是否显示确认按钮         | `boolean`               | `true`     |
| confirm-text           | 确认按钮文字             | `string`                | `确定`     |
| confirm-text-size      | 确认按钮文字大小         | `string \| number`      | -          |
| confirm-text-color     | 确认按钮文字颜色         | `string`                | -          |
| confirm-text-weight    | 确认按钮文字粗细         | `string \| number`      | -          |
| background             | 背景颜色                 | `string`                | `#f2f3f5`  |
| safe-area-inset-bottom | 是否开启底部安全区适配   | `boolean`               | `true`     |
| close-on-click-overlay | 是否允许点击遮罩收起键盘 | `boolean`               | `true`     |
| custom-class           | 自定义类名               | `string`                | -          |
| custom-style           | 自定义样式               | `string \| object`      | -          |

## Events

| 事件名  | 说明               | 回调参数        |
| ------- | ------------------ | --------------- |
| open    | 键盘打开时触发     | -               |
| close   | 键盘关闭时触发     | -               |
| input   | 点击按键时触发     | `value: string` |
| delete  | 点击删除键时触发   | -               |
| change  | 输入值变化时触发   | `value: string` |
| cancel  | 点击取消按钮时触发 | -               |
| confirm | 点击确认按钮时触发 | -               |

## Slots

| 名称  | 说明           |
| ----- | -------------- |
| title | 自定义标题内容 |


<!-- AUTO-PROPS-SUPPLEMENT: ui-keyboard -->
## Keyboard Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `vibrate` |
| `auto-switch` |

<!-- AUTO-EVENTS-SUPPLEMENT: ui-keyboard -->
## Keyboard Events 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 事件名 |
| --- |
| `opened` |
| `closed` |

<!-- AUTO-METHODS-SUPPLEMENT: ui-keyboard -->
## Keyboard Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `clear` |

