# Timeline 时间轴

按时间顺序展示事件信息的时间轴组件。

## 基础用法

```vue
<template>
  <ui-timeline>
    <ui-timeline-item time="10:00" title="开始" description="任务启动" />
    <ui-timeline-item time="12:00" title="进行中" description="处理中" />
    <ui-timeline-item time="18:00" title="完成" description="任务结束" />
  </ui-timeline>
</template>
```

## Timeline Props

| 参数         | 说明                           | 类型                                  | 默认值 |
| ------------ | ------------------------------ | ------------------------------------- | ------ |
| mode         | 轴位置                         | `left \| right \| alternate`          | `left` |
| reverse      | 是否倒序排列                   | `boolean`                             | `false` |
| line-color   | 时间线颜色                     | `string`                              | -      |
| line-style   | 时间线样式                     | `solid \| dashed \| dotted`            | `solid` |
| dot-size     | 节点尺寸                       | `string \| number`                     | -      |
| icon-size    | 图标尺寸                       | `string \| number`                     | -      |
| custom-class | 自定义类名                     | `string`                              | -      |
| custom-style | 自定义样式                     | `string \| object`                     | -      |

## Timeline Events

| 事件名     | 说明             | 回调参数 |
| ---------- | ---------------- | -------- |
| click-item | 点击时间轴项触发 | `index: number` |

## Timeline Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 时间轴项 |

## TimelineItem Props

| 参数          | 说明               | 类型                                      | 默认值 |
| ------------- | ------------------ | ----------------------------------------- | ------ |
| time          | 时间标签           | `string`                                  | -      |
| title         | 标题               | `string`                                  | -      |
| description   | 描述               | `string`                                  | -      |
| icon          | 自定义图标         | `string`                                  | -      |
| icon-color    | 图标颜色           | `string`                                  | -      |
| dot-color     | 节点颜色           | `string`                                  | -      |
| dot-size      | 节点尺寸           | `string \| number`                         | -      |
| type          | 节点状态           | `primary \| success \| warning \| error \| info` | -      |
| hollow        | 是否空心节点       | `boolean`                                 | `false` |
| position      | alternate 模式下位置 | `left \| right`                             | -      |
| custom-class  | 自定义类名         | `string`                                  | -      |
| custom-style  | 自定义样式         | `string \| object`                         | -      |

## TimelineItem Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| click  | 点击时触发 | `index: number` |

## TimelineItem Slots

| 名称         | 说明                           |
| ------------ | ------------------------------ |
| time         | 时间区域（作用域：time）       |
| title        | 标题区域（作用域：title）      |
| description  | 描述区域（作用域：description）|
| dot          | 节点区域                       |
| default      | 内容区域                       |