# Popover 气泡弹出

在目标元素附近显示气泡操作面板。

## 基础用法

```vue
<template>
  <ui-popover :show="show" :actions="actions" @update:show="show = $event">
    <ui-button>点我</ui-button>
  </ui-popover>
</template>

<script setup>
import { ref } from "vue"
const show = ref(false)
const actions = ref([{ text: "复制" }, { text: "删除" }])
</script>
```

## Props

| 参数                   | 说明                     | 类型                                           | 默认值 |
| ---------------------- | ------------------------ | ---------------------------------------------- | ------ |
| show                   | 是否显示气泡             | `boolean`                                      | `false` |
| actions                | 操作选项数组             | `PopoverAction[]`                              | `[]`   |
| placement              | 弹出位置                 | `top \| top-start \| top-end \| bottom \| bottom-start \| bottom-end \| left \| right` | `bottom` |
| theme                  | 主题风格                 | `light \| dark`                                | `light` |
| trigger                | 触发方式                 | `click \| manual`                              | `click` |
| offset                 | 偏移量 `[x, y]`           | `[number, number]`                             | `[0, 8]` |
| show-arrow             | 是否显示箭头             | `boolean`                                      | `true` |
| close-on-click-action  | 点击选项后是否关闭       | `boolean`                                      | `true` |
| close-on-click-outside | 点击外部是否关闭         | `boolean`                                      | `true` |
| duration               | 动画时长                 | `number`                                       | `300`  |
| z-index                | 元素层级                 | `string \| number`                             | -      |
| overlay                | 是否显示遮罩层           | `boolean`                                      | `false` |
| overlay-style          | 遮罩层样式               | `string \| object`                             | -      |
| custom-class           | 自定义类名               | `string`                                       | `""` |
| custom-style           | 自定义样式               | `string \| object`                             | -      |

## Events

| 事件名            | 说明               | 回调参数 |
| ----------------- | ------------------ | -------- |
| update:show       | 更新显示状态       | `show: boolean` |
| select            | 点击选项时触发     | `action: PopoverAction, index: number` |
| open              | 打开前触发         | -        |
| opened            | 打开动画结束触发   | -        |
| close             | 关闭前触发         | -        |
| closed            | 关闭动画结束触发   | -        |
| click-overlay     | 点击遮罩层触发     | -        |

## Slots

| 名称       | 说明                 |
| ---------- | -------------------- |
| default    | 触发元素内容         |
| reference  | 触发元素（同 default） |
| content    | 气泡内容区域         |

## Methods

| 方法名 | 说明       | 参数 |
| ------ | ---------- | ---- |
| open   | 打开气泡   | -    |
| close  | 关闭气泡   | -    |

## PopoverAction

| 参数      | 说明       | 类型               |
| --------- | ---------- | ------------------ |
| id        | 唯一标识   | `string \| number` |
| text      | 选项文字   | `string`           |
| icon      | 选项图标   | `string`           |
| disabled  | 是否禁用   | `boolean`          |
| className | 自定义类名 | `string`           |