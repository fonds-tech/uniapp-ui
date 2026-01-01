# Tag 标签

用于标记和分类的标签组件。

## 基础用法

```vue
<ui-tag text="标签" />
<ui-tag type="primary" text="主要" />
<ui-tag type="success" text="成功" />
<ui-tag type="warning" text="警告" />
<ui-tag type="danger" text="危险" />
<ui-tag type="info" text="信息" />
```

## 镂空样式

设置 `plain` 显示镂空样式。

```vue
<ui-tag type="primary" plain text="主要" />
<ui-tag type="success" plain text="成功" />
```

## 圆角样式

设置 `round` 显示圆角样式。

```vue
<ui-tag type="primary" round text="圆角标签" />
```

## 可关闭标签

设置 `closeable` 显示关闭按钮。

```vue
<template>
  <ui-tag v-if="show" closeable text="可关闭" @close="show = false" />
</template>

<script setup>
import { ref } from "vue"
const show = ref(true)
</script>
```

## 带图标

通过 `icon` 设置标签图标。

```vue
<ui-tag icon="star" text="收藏" />
<ui-tag icon="check" type="success" text="已完成" />
```

## 自定义颜色

```vue
<ui-tag background="#7232dd" text-color="#fff" text="自定义" />
<ui-tag background="linear-gradient(135deg, #667eea, #764ba2)" text-color="#fff" text="渐变" />
```

## API

### Props

| 属性名        | 说明       | 类型                                              | 默认值    |
| ------------- | ---------- | ------------------------------------------------- | --------- |
| text          | 标签内容   | `string`                                          | -         |
| type          | 类型       | `primary \| success \| warning \| danger \| info` | `primary` |
| plain         | 是否镂空   | `boolean`                                         | `false`   |
| round         | 是否圆角   | `boolean`                                         | `false`   |
| closeable     | 是否可关闭 | `boolean`                                         | `false`   |
| show          | 是否显示   | `boolean`                                         | `true`    |
| icon          | 图标名称   | `string`                                          | -         |
| icon-color    | 图标颜色   | `string`                                          | -         |
| icon-size     | 图标大小   | `string \| number`                                | -         |
| text-color    | 文字颜色   | `string`                                          | -         |
| text-size     | 文字大小   | `string \| number`                                | -         |
| background    | 背景颜色   | `string`                                          | -         |
| border-color  | 边框颜色   | `string`                                          | -         |
| border-radius | 圆角大小   | `string \| number`                                | -         |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| click  | 点击标签时触发     | -        |
| close  | 点击关闭按钮时触发 | -        |
