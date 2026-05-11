# Tab 标签页项

`ui-tabs` 的子项。文本样式（颜色 / 字号 / 粗细）由父级 `ui-tabs` 集中配置。

## 用法

```vue
<ui-tabs v-model="active">
  <ui-tab title="推荐" />
  <ui-tab title="发现" name="discover" />
  <ui-tab title="禁用" disabled />
  <ui-tab>
    <template #default="{ active }">
      <view :class="{ on: active }">自定义</view>
    </template>
  </ui-tab>
</ui-tabs>
```

## API

### Props

| 参数         | 说明                       | 类型               | 默认值  |
| ------------ | -------------------------- | ------------------ | ------- |
| title        | 标题                       | `string`           | -       |
| name         | 标识符（缺省回退到 index） | `number \| string` | -       |
| disabled     | 禁用                       | `boolean`          | `false` |
| custom-class | 自定义类名                 | `string`           | -       |
| custom-style | 自定义样式                 | `string \| Object` | -       |

### Events

| 事件名 | 说明     | 回调参数                 |
| ------ | -------- | ------------------------ |
| click  | 点击事件 | `name: number \| string` |

### Slots

| 名称    | 说明            | 参数                                     |
| ------- | --------------- | ---------------------------------------- |
| default | 自定义 tab 内容 | `{ active: boolean, disabled: boolean }` |
