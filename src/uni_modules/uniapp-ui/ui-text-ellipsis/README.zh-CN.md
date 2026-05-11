# TextEllipsis 多行省略

文本多行省略 + 展开/收起切换。基于 `line-clamp` 实现，自动检测溢出。

## 基础用法

```vue
<ui-text-ellipsis content="一段较长的文字内容..." :rows="2" />
```

## 自定义展开/收起文案

```vue
<ui-text-ellipsis
  content="..."
  :rows="3"
  expand-text="查看全部"
  collapse-text="收起"
/>
```

## 渐变遮罩颜色

折叠状态下底部默认带白色渐变遮罩。父容器非白底时需传 `gradient-color` 匹配：

```vue
<ui-text-ellipsis content="..." gradient-color="background-section" />
```

## 实例方法

```vue
<ui-text-ellipsis ref="ellipsisRef" :content="text" />

<script setup>
const ellipsisRef = ref()
ellipsisRef.value?.toggle()     // 切换
ellipsisRef.value?.expand()     // 展开
ellipsisRef.value?.collapse()   // 收起
</script>
```

## API

### Props

| 参数           | 说明                                       | 类型                      | 默认值   |
| -------------- | ------------------------------------------ | ------------------------- | -------- |
| content        | 文本内容                                   | `string`                  | -        |
| rows           | 折叠时展示行数                             | `number \| string`        | `3`      |
| expand-text    | 展开按钮文案                               | `string`                  | `'展开'` |
| collapse-text  | 收起按钮文案                               | `string`                  | `'收起'` |
| color          | 文字颜色                                   | `string`                  | -        |
| font-size      | 字号                                       | `number \| string`        | -        |
| line-height    | 行高                                       | `number \| string`        | -        |
| action-color   | 操作按钮颜色                               | `string`                  | -        |
| gradient-color | 折叠状态下底部渐变遮罩颜色（与父背景匹配） | `string`                  | -        |
| show-action    | 显示展开/收起按钮                          | `boolean`                 | `true`   |
| custom-class   | 自定义类名                                 | `string`                  | -        |
| custom-style   | 自定义样式                                 | `string \| CSSProperties` | -        |

### Events

| 事件名 | 说明          | 回调参数            |
| ------ | ------------- | ------------------- |
| change | 展开/收起切换 | `expanded: boolean` |
| click  | 容器点击      | `event: Event`      |

### 暴露方法

| 方法     | 说明     |
| -------- | -------- |
| toggle   | 切换状态 |
| expand   | 展开     |
| collapse | 收起     |
