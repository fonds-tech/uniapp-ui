# Search 搜索

搜索框组件，支持多种样式和事件。

## 基础用法

```vue
<template>
  <ui-search v-model="value" placeholder="请输入搜索关键词" />
</template>

<script setup>
import { ref } from "vue"
const value = ref("")
</script>
```

## 圆角搜索框

通过 `round` 属性设置圆角样式。

```vue
<template>
  <ui-search v-model="value" round placeholder="圆角搜索框" />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用搜索框。

```vue
<template>
  <ui-search v-model="value" disabled placeholder="禁用状态" />
</template>
```

## 自定义背景色

通过 `background` 属性自定义背景颜色。

```vue
<template>
  <ui-search v-model="value" background="#f5f5f5" placeholder="自定义背景色" />
</template>
```

## 自定义按钮文字

通过 `action-text` 属性自定义搜索按钮文字。

```vue
<template>
  <ui-search v-model="value" action-text="确定" placeholder="自定义按钮文字" />
</template>
```

## 隐藏搜索按钮

通过 `:action="false"` 隐藏搜索按钮。

```vue
<template>
  <ui-search v-model="value" :action="false" placeholder="隐藏搜索按钮" />
</template>
```

## 搜索事件

点击搜索按钮或键盘搜索键时触发 `search` 事件。

```vue
<template>
  <ui-search v-model="value" placeholder="点击搜索按钮触发事件" @search="onSearch" />
</template>

<script setup>
function onSearch(value) {
  uni.showToast({ title: `搜索: ${value}`, icon: "none" })
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值 | `string` | - |
| background | 背景颜色 | `string` | - |
| placeholder | 占位文字 | `string` | `请输入搜索关键词` |
| placeholder-color | 占位文字颜色 | `string` | `#989898` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearabled | 是否启用清除控件 | `boolean` | `true` |
| maxlength | 输入框最大能输入的长度 | `number` | `-1` |
| height | 输入框高度 | `string \| number` | `68rpx` |
| margin | 外边距 | `string \| number` | - |
| round | 是否圆形搜索框 | `boolean` | `false` |
| color | 颜色 | `string` | - |
| focus | 是否自动获得焦点 | `boolean` | `false` |
| border | 边框 | `string` | - |
| radius | 圆角值 | `string \| number` | - |
| font-size | 搜索框字体大小 | `string \| number` | - |
| icon | 搜索图标 | `string` | `search` |
| icon-size | 搜索图标大小 | `string \| number` | `32rpx` |
| icon-color | 搜索图标颜色 | `string` | - |
| icon-weight | 搜索图标粗细 | `string` | - |
| action | 是否显示右侧控件(搜索按钮) | `boolean` | `true` |
| action-text | 右侧控件文字 | `string` | `搜索` |
| action-size | 右侧控件文字大小 | `string \| number` | - |
| action-color | 右侧控件文字颜色 | `string` | `#333` |
| action-weight | 右侧控件文字粗细 | `string` | - |
| input-align | 输入框内容水平对齐方式 | `left \| center \| right` | `left` |
| input-style | 自定义输入框样式 | `string \| object` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| search | 点击搜索按钮或键盘搜索键时触发 | `value: string` |
| change | 输入值变化时触发 | `value: string` |
| focus | 输入框聚焦时触发 | `event` |
| blur | 输入框失焦时触发 | `event` |
| click | 点击输入框时触发 | `event` |
| clear | 点击清除按钮时触发 | `event` |
| cancel | 点击取消按钮时触发 | - |
| action | 点击右侧搜索按钮时触发 | `event` |

## Slots

| 名称 | 说明 |
| --- | --- |
| left | 自定义左侧内容 |
| right | 自定义右侧内容 |
