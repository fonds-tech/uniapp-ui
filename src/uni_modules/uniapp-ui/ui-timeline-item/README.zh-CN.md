# TimelineItem 时间轴节点

`ui-timeline` 的子节点，承载单条时间、标题、描述、图标节点或完全自定义内容。

## 基础用法

```vue
<ui-timeline>
  <ui-timeline-item time="10:00" title="事件" description="说明" />
</ui-timeline>
```

## 状态类型 type

```vue
<ui-timeline-item type="success" time="10:00" title="已完成" />
<ui-timeline-item type="warning" time="11:00" title="进行中" />
<ui-timeline-item type="danger" time="12:00" title="出错" />
```

## 空心节点 hollow

```vue
<ui-timeline-item hollow type="primary" time="10:00" title="未开始" />
```

## 图标节点

```vue
<ui-timeline-item icon="check" type="success" time="10:00" title="已签收" />
```

## 自定义插槽

```vue
<ui-timeline-item>
  <template #dot>
    <view class="my-dot">★</view>
  </template>
  <template #time>
    <ui-tag>10:00</ui-tag>
  </template>
  <template #title>
    <text class="my-title">自定义标题</text>
  </template>
  <template #description>
    <text>自定义描述</text>
  </template>
</ui-timeline-item>
```

## API

### Props

| 参数        | 说明                           | 类型                                                        | 默认值  |
| ----------- | ------------------------------ | ----------------------------------------------------------- | ------- |
| time        | 时间标签                       | `string`                                                    | -       |
| title       | 标题                           | `string`                                                    | -       |
| description | 描述                           | `string`                                                    | -       |
| icon        | 节点图标名                     | `string`                                                    | -       |
| iconColor   | 图标颜色                       | `string`                                                    | -       |
| dotColor    | 节点颜色                       | `string`                                                    | -       |
| dotSize     | 节点尺寸（覆盖父级）           | `number \| string`                                          | -       |
| type        | 状态类型（自动着色）           | `"primary" \| "success" \| "warning" \| "danger" \| "info"` | -       |
| hollow      | 空心节点                       | `boolean`                                                   | `false` |
| position    | alternate 模式下手动指定轴位置 | `"left" \| "right"`                                         | -       |
| customClass | 自定义类名                     | `string`                                                    | -       |
| customStyle | 自定义样式                     | `string \| CSSProperties`                                   | -       |

### Events

| 事件名 | 说明     | 回调参数        |
| ------ | -------- | --------------- |
| click  | 点击节点 | `index: number` |

### Slots

| 名称        | 说明       | 插槽参数          |
| ----------- | ---------- | ----------------- |
| default     | 自定义内容 | -                 |
| dot         | 自定义节点 | -                 |
| time        | 自定义时间 | `{ time }`        |
| title       | 自定义标题 | `{ title }`       |
| description | 自定义描述 | `{ description }` |

## 颜色优先级

节点颜色（`dotCurrentColor`）优先级：

1. `dotColor` prop
2. `type` prop（语义色）
3. `iconColor` prop
4. `var(--ui-color-primary)` 兜底

## 注意事项

- 必须放在 `ui-timeline` 内使用
- `position` 仅在父级 `mode="alternate"` 时生效
- `hollow=true` 时图标颜色默认跟随节点颜色（保证可见性）
