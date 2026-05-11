# Step 步骤项

`ui-steps` 的子项。状态根据父级 `active` 自动派生（`finish` / `process` / `wait`），也可用 `status` 显式覆盖。

## 用法

```vue
<ui-steps :active="2">
  <ui-step title="下单" description="2024-01-01" />
  <ui-step title="付款" description="2024-01-02" />
  <ui-step title="发货" icon="truck" />
  <ui-step title="出错" status="error" />
</ui-steps>
```

## API

### Props

| 参数         | 说明                                            | 类型                                         | 默认值 |
| ------------ | ----------------------------------------------- | -------------------------------------------- | ------ |
| title        | 标题                                            | `string`                                     | -      |
| description  | 描述                                            | `string`                                     | -      |
| icon         | 自定义图标，覆盖父级 active/inactive/finish/err | `string`                                     | -      |
| status       | 显式状态，覆盖按 active 派生的状态              | `'wait' \| 'process' \| 'finish' \| 'error'` | -      |
| icon-size    | 图标大小，覆盖父级 iconSize                     | `number \| string`                           | -      |
| custom-class | 自定义类名                                      | `string`                                     | -      |
| custom-style | 自定义样式                                      | `string \| CSSProperties`                    | -      |

### Events

| 事件名 | 说明     | 回调参数        |
| ------ | -------- | --------------- |
| click  | 点击步骤 | `index: number` |

### Slots

| 名称    | 说明         | 参数                        |
| ------- | ------------ | --------------------------- |
| default | 自定义内容区 | `{ status, index, active }` |
| icon    | 自定义图标区 | `{ status, index, active }` |

### 暴露

| 属性   | 说明     |
| ------ | -------- |
| index  | 当前索引 |
| status | 当前状态 |
