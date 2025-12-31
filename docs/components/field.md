# Field 输入域

表单输入域组件，整合了标签和输入框。

## 基础用法

```vue
<template>
  <ui-field v-model="username" label="用户名" placeholder="请输入用户名" />
  <ui-field v-model="password" label="密码" type="password" placeholder="请输入密码" />
</template>

<script setup>
import { ref } from "vue"
const username = ref("")
const password = ref("")
</script>
```

## 必填项

通过 `required` 属性显示必填标记。

```vue
<template>
  <ui-field v-model="phone" label="手机号" placeholder="请输入手机号" required />
</template>
```

## 禁用与只读

```vue
<template>
  <ui-field v-model="value1" label="禁用" placeholder="禁用状态" disabled />
  <ui-field v-model="value2" label="只读" placeholder="只读状态" readonly />
</template>
```

## 带图标

通过 `prefix-icon` 和 `suffix-icon` 属性设置前后图标。

```vue
<template>
  <ui-field v-model="value" label="用户名" placeholder="请输入" prefix-icon="person" />
  <ui-field v-model="value" label="密码" type="password" placeholder="请输入" suffix-icon="eye" />
</template>
```

## 可清除

通过 `clearable` 属性显示清除按钮。

```vue
<template>
  <ui-field v-model="value" label="内容" placeholder="输入后显示清除按钮" clearable />
</template>
```

## 多行文本

通过 `type="textarea"` 设置为多行文本输入。

```vue
<template>
  <ui-field v-model="value" label="留言" type="textarea" placeholder="请输入留言" :maxlength="200" autosize />
</template>
```

## 输入对齐

通过 `input-align` 属性设置输入框对齐方式。

```vue
<template>
  <ui-field v-model="value" label="左对齐" placeholder="请输入" input-align="left" />
  <ui-field v-model="value" label="居中" placeholder="请输入" input-align="center" />
  <ui-field v-model="value" label="右对齐" placeholder="请输入" input-align="right" />
</template>
```

## 标签位置

通过 `label-align="top"` 将标签放置在顶部。

```vue
<template>
  <ui-field v-model="value" label="详细地址" type="textarea" placeholder="请输入详细地址" label-align="top" />
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前输入的值 | `string \| number` | - |
| label | 输入框左侧文本 | `string` | - |
| prop | 表单域字段名 | `string` | - |
| type | 输入框类型 | `text \| number \| idcard \| digit \| tel \| password \| textarea` | `text` |
| maxlength | 最大输入长度，-1为不限制 | `string \| number` | `2000` |
| disabled | 是否禁用输入框 | `boolean` | `false` |
| readonly | 是否为只读状态 | `boolean` | `false` |
| focus | 自动获取焦点 | `boolean` | `false` |
| fixed | 如果 textarea 在 fixed 区域，需设为 true | `boolean` | `false` |
| colon | 是否在 label 后面添加冒号 | `boolean` | `false` |
| required | 是否显示表单必填星号 | `boolean` | `false` |
| autosize | 是否自适应内容高度(textarea) | `boolean` | `false` |
| background | 背景颜色 | `string` | - |
| clearable | 是否启用清除图标 | `boolean` | `false` |
| clear-icon | 清除图标名称 | `string` | `cross` |
| clear-icon-size | 清除图标大小 | `string \| number` | `24rpx` |
| clear-icon-color | 清除图标颜色 | `string` | `#fff` |
| prefix-icon | 输入框前置图标 | `string` | - |
| prefix-icon-size | 前置图标大小 | `string \| number` | - |
| prefix-icon-color | 前置图标颜色 | `string` | - |
| suffix-icon | 输入框后置图标 | `string` | - |
| suffix-icon-size | 后置图标大小 | `string \| number` | - |
| suffix-icon-color | 后置图标颜色 | `string` | - |
| placeholder | 占位符 | `string` | `请输入内容` |
| placeholder-color | 占位符颜色 | `string` | - |
| placeholder-style | 占位符样式 | `string \| object` | - |
| label-width | 标签宽度 | `string \| number` | - |
| label-size | 标签字体大小 | `string \| number` | - |
| label-color | 标签字体颜色 | `string` | - |
| label-weight | 标签字体粗细 | `string \| number` | - |
| label-align | 标签对齐方式 | `left \| center \| right \| top` | `left` |
| input-align | 输入对齐方式 | `left \| center \| right` | `left` |
| confirm-type | 设置右下角按钮的文字 | `string` | `done` |
| cursor | 指定focus时光标的位置 | `string \| number` | `-1` |
| cursor-spacing | 输入框聚焦时底部与键盘的距离 | `string \| number` | `30` |
| selection-start | 光标起始位置 | `string \| number` | `-1` |
| selection-end | 光标结束位置 | `string \| number` | `-1` |
| adjust-position | 键盘弹起时是否自动上推页面 | `boolean` | `true` |
| show-confirm-bar | 是否显示键盘上方完成栏 | `boolean` | `true` |
| auto-blur | 键盘收起时是否自动失去焦点 | `boolean` | `false` |
| confirm-hold | 点击右下角按钮时是否保持键盘不收起 | `boolean` | `false` |
| hold-keyboard | focus时点击页面不收起键盘(微信小程序) | `boolean` | `false` |
| color | 输入框字体颜色 | `string` | - |
| width | 输入框宽度 | `string \| number` | - |
| height | 输入框高度 | `string \| number` | - |
| min-height | 最小输入框高度 | `string \| number` | - |
| font-size | 输入框字体大小 | `string \| number` | - |
| font-weight | 输入框字体粗细 | `string \| number` | - |
| border | 边框样式 | `string` | - |
| border-radius | 圆角值 | `string \| number` | - |
| show-count | 是否显示字数统计 | `boolean` | `true` |
| count-size | 字数统计字体大小 | `string \| number` | - |
| count-color | 字数统计字体颜色 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 输入时触发 | `value: string` |
| change | 值改变时触发 | `value: string` |
| focus | 输入框聚焦时触发 | - |
| blur | 输入框失焦时触发 | `value: string` |
| clear | 点击清除按钮时触发 | - |
| confirm | 点击完成按钮时触发 | `value: string` |
| linechange | 输入框行数变化时触发(textarea) | `event` |
| keyboardheightchange | 键盘高度变化时触发 | - |
| start-validate | 开始验证时触发 | - |
| end-validate | 验证结束时触发 | `{ status, message }` |

## Slots

| 名称 | 说明 |
| --- | --- |
| label | 自定义标签内容 |
| prefix | 自定义输入框前置内容 |
| suffix | 自定义输入框后置内容 |
