# Collapse 折叠面板

可折叠内容区域，支持手风琴模式。

## 基础用法

```vue
<template>
  <ui-collapse v-model="active">
    <ui-collapse-item name="a" title="标题 A">
      内容 A
    </ui-collapse-item>
    <ui-collapse-item name="b" title="标题 B">
      内容 B
    </ui-collapse-item>
  </ui-collapse>
</template>

<script setup>
import { ref } from "vue"
const active = ref(["a"])
</script>
```

## Collapse Props

| 参数         | 说明                          | 类型                             | 默认值 |
| ------------ | ----------------------------- | -------------------------------- | ------ |
| v-model      | 当前展开的 name 或 name 数组  | `string \| number \| (string \| number)[]` | -      |
| accordion    | 是否手风琴模式                | `boolean`                        | `false` |
| border       | 是否显示边框                  | `boolean`                        | `true` |
| custom-class | 自定义类名                    | `string`                         | `""` |
| custom-style | 自定义样式                    | `string \| object`               | `""` |

## Collapse Events

| 事件名             | 说明           | 回调参数 |
| ------------------ | -------------- | -------- |
| change             | 展开项变化触发 | `value`  |
| update:modelValue  | 更新展开项     | `value`  |

## Collapse Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 面板内容     |

## Collapse Methods

| 方法名     | 说明             | 参数 |
| ---------- | ---------------- | ---- |
| toggle     | 切换指定项展开状态 | `name: string \| number, expanded: boolean` |

## Collapse Expose

| 字段名       | 说明               |
| ------------ | ------------------ |
| activeNames  | 当前展开项数组     |

## CollapseItem Props

| 参数           | 说明                 | 类型                | 默认值 |
| -------------- | -------------------- | ------------------- | ------ |
| name           | 唯一标识符（必填）   | `string \| number` | -      |
| title          | 标题                 | `string`            | `""` |
| value          | 右侧内容             | `string \| number` | `""` |
| label          | 标题下方描述         | `string`            | `""` |
| icon           | 左侧图标             | `string`            | `""` |
| disabled       | 是否禁用             | `boolean`           | `false` |
| readonly       | 是否只读             | `boolean`           | `false` |
| is-link        | 是否显示箭头         | `boolean`           | `true` |
| border         | 是否显示下边框       | `boolean`           | `true` |
| duration       | 动画时长（毫秒）     | `number`            | `300`  |
| padding        | 内边距               | `string \| number` | `""` |
| background     | 背景颜色             | `string`            | `""` |
| title-size     | 标题字体大小         | `string \| number` | `""` |
| title-color    | 标题颜色             | `string`            | `""` |
| title-weight   | 标题字重             | `string \| number` | `""` |
| label-size     | 描述字体大小         | `string \| number` | `""` |
| label-color    | 描述颜色             | `string`            | `""` |
| label-weight   | 描述字重             | `string \| number` | `""` |
| label-gap      | 描述与标题间距       | `string \| number` | `""` |
| value-size     | 右侧值字体大小       | `string \| number` | `""` |
| value-color    | 右侧值颜色           | `string`            | `""` |
| value-weight   | 右侧值字重           | `string \| number` | `""` |
| icon-size      | 图标大小             | `string \| number` | `""` |
| icon-color     | 图标颜色             | `string`            | `""` |
| icon-weight    | 图标字重             | `string \| number` | `""` |
| icon-gap       | 图标与标题间距       | `string \| number` | `""` |
| arrow-size     | 箭头大小             | `string \| number` | `""` |
| arrow-color    | 箭头颜色             | `string`            | `""` |
| border-color   | 边框颜色             | `string`            | `""` |
| border-width   | 边框宽度             | `string \| number` | `""` |
| header-class   | 头部区域类名         | `string`            | `""` |
| header-style   | 头部区域样式         | `string \| object` | `""` |
| body-class     | 内容区域类名         | `string`            | `""` |
| body-style     | 内容区域样式         | `string \| object` | `""` |
| custom-class   | 自定义类名           | `string`            | `""` |
| custom-style   | 自定义样式           | `string \| object` | `""` |

## CollapseItem Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| click  | 点击时触发 | `event`  |

## CollapseItem Slots

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 内容区域             |
| title   | 标题区域（作用域：expanded, disabled） |

## CollapseItem Methods/Expose

| 字段/方法 | 说明             |
| --------- | ---------------- |
| name      | 当前项标识       |
| expanded  | 是否展开         |
| toggle    | 切换展开状态     |