# ActionSheet 动作面板

## 介绍

底部弹出式动作面板组件。它主要用于用于多种场景,如分享菜单、操作确认、筛选选项等可选操作,为用户提供便捷的交互方式。

## 代码演示

```vue
<template>
  <ui-action-sheet
    v-model:show="show"
    :actions="actions"
    @select="onSelect"
  />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const actions = [
  { title: "选项1" },
  { title: "选项2" },
  { title: "选项3" }
]

function onSelect(item, index) {
  console.log(item, index)
}
</script>
```

## Props

| 参数                   | 说明                       | 类型                | 默认值 | 可选值 |
| ---------------------- | -------------------------- | ------------------- | ------ | ------ |
| v-model:show           | 是否显示动作面板           | boolean             | false  | -      |
| actions                | 面板选项列表               | ActionSheetAction[] | []     | -      |
| title                  | 标题                       | string              | -      | -      |
| description            | 描述文字                   | string              | -      | -      |
| cancel-text            | 取消按钮文字               | string              | '取消' | -      |
| overlay                | 是否显示遮罩层             | boolean             | true   | -      |
| close-on-click-action  | 是否在点击选项后关闭       | boolean             | true   | -      |
| close-on-click-overlay | 是否在点击遮罩层后关闭     | boolean             | true   | -      |
| lazy-render            | 是否在显示弹层时才渲染内容 | boolean             | true   | -      |
| safe-area-inset-bottom | 是否开启底部安全区适配     | boolean             | true   | -      |
| z-index                | 层级                       | number \| string    | -      | -      |
| duration               | 动画时长,单位毫秒          | number \| string    | 300    | -      |
| overlay-style          | 自定义遮罩层样式           | string \| object    | -      | -      |
| custom-style           | 自定义弹出层样式           | string \| object    | -      | -      |
| custom-class           | 自定义弹出层类名           | string              | -      | -      |
| border-radius          | 圆角大小                   | number \| string    | -      | -      |
| title-color            | 标题颜色                   | string              | -      | -      |
| title-size             | 标题字体大小               | number \| string    | -      | -      |
| title-weight           | 标题字重                   | number \| string    | -      | -      |
| description-color      | 描述文字颜色               | string              | -      | -      |
| description-size       | 描述文字字体大小           | number \| string    | -      | -      |
| description-weight     | 描述文字字重               | number \| string    | -      | -      |
| cancel-text-color      | 取消按钮文字颜色           | string              | -      | -      |
| cancel-text-size       | 取消按钮文字大小           | number \| string    | -      | -      |
| cancel-text-weight     | 取消按钮文字字重           | number \| string    | -      | -      |
| cancel-background      | 取消按钮背景色             | string              | -      | -      |
| height                 | 内容区域高度               | number \| string    | -      | -      |
| max-height             | 内容区域最大高度           | number \| string    | -      | -      |
| before-close           | 关闭前的回调函数           | Function            | -      | -      |

## ActionSheetAction 数据结构

| 键名             | 说明           | 类型                    |
| ---------------- | -------------- | ----------------------- |
| title            | 标题           | string                  |
| description      | 描述           | string                  |
| loading          | 是否为加载状态 | boolean                 |
| disabled         | 是否为禁用状态 | boolean                 |
| titleStyle       | 自定义标题样式 | string \| CSSProperties |
| descriptionStyle | 自定义描述样式 | string \| CSSProperties |
| [key: string]    | 其他自定义属性 | any                     |

## Events

| 事件名       | 说明                   | 回调参数                            |
| ------------ | ---------------------- | ----------------------------------- |
| select       | 选中选项时触发         | action: 选项对象, index: 选项的索引 |
| open         | 打开面板时触发         | -                                   |
| close        | 关闭面板时触发         | -                                   |
| opened       | 打开面板动画结束时触发 | -                                   |
| closed       | 关闭面板动画结束时触发 | -                                   |
| clickOverlay | 点击遮罩层时触发       | -                                   |

## Slots

| 名称        | 说明               |
| ----------- | ------------------ |
| default     | 自定义面板的内容   |
| header      | 自定义面板头部内容 |
| title       | 自定义标题内容     |
| description | 自定义描述文字内容 |
| footer      | 自定义底部内容     |

## Methods

| 方法名 | 说明     | 参数 |
| ------ | -------- | ---- |
| open   | 打开面板 | -    |
| close  | 关闭面板 | -    |
