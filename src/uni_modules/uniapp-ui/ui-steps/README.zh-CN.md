# Steps 步骤条

引导用户按步完成任务的导航条。配合 `ui-step` 子组件使用。

## 基础用法

```vue
<template>
  <ui-steps :active="active">
    <ui-step title="下单" />
    <ui-step title="付款" />
    <ui-step title="发货" />
    <ui-step title="收货" />
  </ui-steps>
</template>

<script setup>
const active = ref(1)
</script>
```

## 垂直方向

```vue
<ui-steps :active="2" direction="vertical">
  <ui-step title="提交" description="2024-01-01 10:00" />
  <ui-step title="付款" description="2024-01-01 10:05" />
  <ui-step title="发货" description="2024-01-01 12:00" />
</ui-steps>
```

## 自定义颜色 / 图标

```vue
<ui-steps :active="1" active-color="success" finish-icon="check-circle">
  <ui-step title="基本信息" />
  <ui-step title="详细资料" />
  <ui-step title="完成" />
</ui-steps>
```

## 可点击

```vue
<ui-steps :active="active" clickable @click-step="active = $event">
  <ui-step v-for="i in 4" :key="i" :title="`步骤${i}`" />
</ui-steps>
```

## 简洁 / 点状

```vue
<ui-steps :active="1" simple>...</ui-steps>
<ui-steps :active="1" dot>...</ui-steps>
```

## API

### Props

| 参数           | 说明                      | 类型                         | 默认值         |
| -------------- | ------------------------- | ---------------------------- | -------------- |
| active         | 当前激活索引              | `number \| string`           | `0`            |
| direction      | 排列方向                  | `'horizontal' \| 'vertical'` | `'horizontal'` |
| simple         | 简洁模式（隐藏标题/描述） | `boolean`                    | `false`        |
| dot            | 点状模式（圆点替序号）    | `boolean`                    | `false`        |
| center         | 垂直模式图标内容居中      | `boolean`                    | `false`        |
| active-color   | 激活/完成色（向下继承）   | `string`                     | -              |
| inactive-color | 未激活色（向下继承）      | `string`                     | -              |
| error-color    | 错误色（向下继承）        | `string`                     | -              |
| active-icon    | 激活态图标名              | `string`                     | -              |
| inactive-icon  | 未激活态图标名            | `string`                     | -              |
| finish-icon    | 完成态图标名              | `string`                     | -              |
| error-icon     | 错误态图标名              | `string`                     | -              |
| icon-size      | 状态图标大小              | `number \| string`           | -              |
| clickable      | 点击步骤触发 click-step   | `boolean`                    | `false`        |
| custom-class   | 自定义类名                | `string`                     | -              |
| custom-style   | 自定义样式                | `string \| CSSProperties`    | -              |

### Events

| 事件名     | 说明                     | 回调参数        |
| ---------- | ------------------------ | --------------- |
| click-step | 点击步骤（需 clickable） | `index: number` |

### CSS 变量

| 名称                     | 说明           |
| ------------------------ | -------------- |
| --ui-step-color-active   | 激活/完成色    |
| --ui-step-color-inactive | 未激活色       |
| --ui-step-color-error    | 错误色         |
| --ui-step-circle-size    | 圆圈尺寸       |
| --ui-step-dot-size       | 点状模式尺寸   |
| --ui-step-line-thickness | 连接线粗细     |
| --ui-step-content-gap    | 头部与内容间距 |
