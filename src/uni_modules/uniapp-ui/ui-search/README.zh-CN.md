# UiSearch 组件

## 介绍

UiSearch 搜索框，含输入框、清除按钮、可选右侧操作按钮，支持自定义图标 / 背景 / 边框 / 对齐等。

## 代码演示

### 基础用法

```vue
<ui-search v-model="keyword" placeholder="请输入搜索关键词" @search="onSearch" />
```

### 圆形 + 自定义背景

```vue
<ui-search v-model="keyword" round background="#f5f5f5" />
```

### 隐藏操作按钮

```vue
<ui-search v-model="keyword" :action="false" />
```

### 自定义插槽

```vue
<ui-search v-model="keyword">
  <template #left>
    <text>分类</text>
  </template>
  <template #action>
    <ui-button size="small" type="primary">提交</ui-button>
  </template>
</ui-search>
```

## Props

| 参数             | 说明                    | 类型             | 默认值             | 可选值              |
| ---------------- | ----------------------- | ---------------- | ------------------ | ------------------- |
| modelValue       | 绑定值 (v-model)        | string           | ""                 | -                   |
| placeholder      | 占位文字                | string           | "请输入搜索关键词" | -                   |
| placeholderColor | 占位文字颜色            | string           | -                  | -                   |
| maxlength        | 最大输入长度，-1 不限   | number           | -1                 | -                   |
| disabled         | 禁用输入框              | boolean          | false              | -                   |
| focus            | 自动聚焦                | boolean          | false              | -                   |
| clearable        | 显示清除按钮 (有内容时) | boolean          | true               | -                   |
| height           | 输入框高度              | string \| number | "72rpx"            | -                   |
| margin           | 外边距                  | string \| number | -                  | -                   |
| round            | 圆形胶囊                | boolean          | false              | -                   |
| radius           | 自定义圆角值            | string \| number | -                  | -                   |
| color            | 输入文字颜色            | string           | -                  | -                   |
| fontSize         | 输入文字大小            | string \| number | -                  | -                   |
| inputAlign       | 输入内容水平对齐        | string           | "left"             | left, center, right |
| background       | 背景颜色                | string           | -                  | -                   |
| border           | 边框 (CSS 简写)         | string           | -                  | -                   |
| icon             | 搜索图标名 ("" 隐藏)    | string           | "search"           | -                   |
| iconSize         | 搜索图标大小            | string \| number | "40rpx"            | -                   |
| iconColor        | 搜索图标颜色            | string           | -                  | -                   |
| iconWeight       | 搜索图标粗细            | string \| number | -                  | -                   |
| clearIcon        | 清除图标名              | string           | "close"            | -                   |
| clearIconSize    | 清除图标大小            | string \| number | "32rpx"            | -                   |
| clearIconColor   | 清除图标颜色            | string           | -                  | -                   |
| clearIconWeight  | 清除图标粗细            | string \| number | -                  | -                   |
| action           | 显示右侧操作按钮        | boolean          | true               | -                   |
| actionText       | 右侧按钮文字            | string           | "搜索"             | -                   |
| actionSize       | 右侧按钮文字大小        | string \| number | -                  | -                   |
| actionColor      | 右侧按钮文字颜色        | string           | -                  | -                   |
| actionWeight     | 右侧按钮文字粗细        | string \| number | -                  | -                   |
| inputStyle       | 自定义输入框样式        | string \| object | -                  | -                   |
| customClass      | 自定义类名 (根)         | string           | -                  | -                   |
| customStyle      | 自定义样式 (根)         | string \| object | -                  | -                   |

## Events

| 事件名            | 说明                    | 回调参数          |
| ----------------- | ----------------------- | ----------------- |
| update:modelValue | v-model 更新            | value: string     |
| change            | 值变化 (与 update 同帧) | value: string     |
| search            | 键盘 confirm 触发搜索   | value: string     |
| clear             | 点击清除按钮            | event: Event      |
| action            | 点击右侧操作按钮        | event: Event      |
| focus             | 输入框聚焦              | event: FocusEvent |
| blur              | 输入框失焦              | event: FocusEvent |
| click             | 点击根容器              | event: Event      |

## Slots

| 名称   | 说明                  |
| ------ | --------------------- |
| left   | 输入框左侧 (图标之前) |
| icon   | 自定义搜索图标        |
| clear  | 自定义清除按钮内容    |
| action | 自定义右侧操作区      |
