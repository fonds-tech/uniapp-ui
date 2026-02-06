# Input 输入框

常用的文本输入组件。

## 基础用法

```vue
<template>
  <ui-input v-model="value" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from "vue"
const value = ref("")
</script>
```

## 输入类型

通过 `type` 属性设置输入类型。

```vue
<ui-input v-model="text" type="text" placeholder="文本输入" />
<ui-input v-model="number" type="number" placeholder="数字输入" />
<ui-input v-model="digit" type="digit" placeholder="带小数点" />
<ui-input v-model="password" password placeholder="密码输入" />
```

## 禁用和只读

```vue
<ui-input model-value="禁用状态" disabled />
<ui-input model-value="只读状态" readonly />
```

## 清除按钮

设置 `clearable` 可显示清除按钮。

```vue
<ui-input v-model="value" clearable placeholder="可清除" />
<ui-input v-model="value" :clearable="false" placeholder="不可清除" />
```

## 自定义样式

```vue
<!-- 自定义背景和圆角 -->
<ui-input v-model="value" background="#f5f6fa" radius="16rpx" />

<!-- 文字对齐 -->
<ui-input v-model="value" input-align="center" />
<ui-input v-model="value" input-align="right" />
```

## API

### Props

| 属性名               | 说明                              | 类型                                   | 默认值       |
| -------------------- | --------------------------------- | -------------------------------------- | ------------ |
| v-model              | 输入值                            | `string \| number`                     | `""`       |
| type                 | 输入类型                          | `text \| number \| digit \| password` | `text`       |
| password             | 是否密码类型                      | `boolean`                              | `false`      |
| color                | 字体颜色                          | `string`                               | -            |
| width                | 宽度                              | `string \| number`                     | -            |
| height               | 高度                              | `string \| number`                     | -            |
| font-size            | 字体大小                          | `string \| number`                     | -            |
| font-weight          | 字体粗细                          | `string \| number`                     | -            |
| readonly             | 是否只读                          | `boolean`                              | `false`      |
| disabled             | 是否禁用                          | `boolean`                              | `false`      |
| clearable            | 是否显示清除按钮                  | `boolean`                              | `true`       |
| maxlength            | 最大输入长度                      | `number`                               | `-1`         |
| background           | 背景颜色                          | `string`                               | -            |
| placeholder          | 占位文本                          | `string`                               | `请输入内容` |
| placeholder-color    | 占位符颜色                        | `string`                               | -            |
| placeholder-style    | 占位符样式                        | `string \| object`                     | `""`       |
| confirm-type         | 右下角按钮文字                    | `string`                               | `done`       |
| confirm-hold         | 点击确认时是否保持键盘            | `boolean`                              | `false`      |
| hold-keyboard        | focus 时点击页面不收起键盘        | `boolean`                              | `false`      |
| focus                | 自动获取焦点                      | `boolean`                              | `false`      |
| auto-blur            | 键盘收起时自动失焦                | `boolean`                              | `false`      |
| ignore-composition-event | 是否忽略文本合成事件          | `boolean`                              | `true`       |
| cursor               | 指定 focus 时光标位置             | `number`                               | `-1`         |
| cursor-color         | 光标颜色                          | `string`                               | -            |
| cursor-spacing       | 输入框聚焦时与键盘的距离          | `number`                               | `30`         |
| selection-start      | 光标起始位置                      | `number`                               | `-1`         |
| selection-end        | 光标结束位置                      | `number`                               | `-1`         |
| adjust-position      | 键盘弹起是否自动上推页面          | `boolean`                              | `true`       |
| radius               | 圆角大小                          | `string \| number`                     | -            |
| padding              | 内边距                            | `string \| number`                     | -            |
| border               | 边框样式                          | `string`                               | -            |
| input-align          | 输入内容对齐                      | `left \| center \| right`              | `left`       |
| prefix-icon          | 前缀图标                          | `string`                               | -            |
| prefix-icon-size     | 前缀图标大小                      | `string \| number`                     | -            |
| prefix-icon-color    | 前缀图标颜色                      | `string`                               | -            |
| prefix-icon-weight   | 前缀图标粗细                      | `string \| number`                     | -            |
| suffix-icon          | 后缀图标                          | `string`                               | -            |
| suffix-icon-size     | 后缀图标大小                      | `string \| number`                     | -            |
| suffix-icon-color    | 后缀图标颜色                      | `string`                               | -            |
| suffix-icon-weight   | 后缀图标粗细                      | `string \| number`                     | -            |
| clear-icon           | 清除图标                          | `string`                               | `cross`      |
| clear-icon-size      | 清除图标大小                      | `string \| number`                     | `20rpx`      |
| clear-icon-color     | 清除图标颜色                      | `string`                               | `#fff`       |
| clear-icon-weight    | 清除图标粗细                      | `string \| number`                     | -            |
| clear-icon-background | 清除图标背景色                   | `string`                               | -            |
| custom-class         | 自定义类名                        | `string`                               | `""`       |
| custom-style         | 自定义样式                        | `string \| object`                     | `""`       |

### Events

| 事件名               | 说明               | 回调参数        |
| -------------------- | ------------------ | --------------- |
| click                | 点击时触发         | -               |
| clear                | 点击清除按钮时触发 | -               |
| focus                | 获取焦点时触发     | -               |
| blur                 | 失去焦点时触发     | `value: string` |
| confirm              | 点击完成按钮时触发 | `value: string` |
| keyboardheightchange | 键盘高度变化时触发 | -               |
| input                | 输入时触发         | `value: string` |
| change               | 内容变化时触发     | `value: string` |
| update:modelValue    | 更新绑定值         | `value: string` |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| prefix  | 前缀区域   |
| suffix  | 后缀区域   |

### Methods

| 方法名 | 说明   | 参数                      |
| ------ | ------ | ------------------------- |
| reset  | 重置值 | `value: string \| number` |
