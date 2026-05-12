# Timeline 时间轴

时间轴容器，垂直串联多个 `ui-timeline-item` 节点。支持左/右/交替三种轴位置、倒序、虚实线、连接线颜色。

## 基础用法

```vue
<ui-timeline>
  <ui-timeline-item time="10:00" title="事件一" description="第一条" />
  <ui-timeline-item time="11:00" title="事件二" description="第二条" />
  <ui-timeline-item time="12:00" title="事件三" description="第三条" />
</ui-timeline>
```

## 轴位置 mode

```vue
<ui-timeline mode="right">...</ui-timeline>
<ui-timeline mode="alternate">...</ui-timeline>
```

## 倒序排列

```vue
<ui-timeline reverse>...</ui-timeline>
```

## 连接线样式

```vue
<ui-timeline line-style="dashed" line-color="primary">...</ui-timeline>
```

## API

### Props

| 参数        | 说明             | 类型                               | 默认值    |
| ----------- | ---------------- | ---------------------------------- | --------- |
| mode        | 轴位置           | `"left" \| "right" \| "alternate"` | `"left"`  |
| reverse     | 倒序排列         | `boolean`                          | `false`   |
| lineColor   | 连接线颜色       | `string`                           | -         |
| lineStyle   | 连接线样式       | `"solid" \| "dashed" \| "dotted"`  | `"solid"` |
| lineWidth   | 连接线宽度       | `number \| string`                 | -         |
| dotSize     | 节点尺寸         | `number \| string`                 | -         |
| iconSize    | 节点图标尺寸     | `number \| string`                 | -         |
| axisWidth   | 轴列宽度         | `number \| string`                 | -         |
| itemGap     | 项目间距         | `number \| string`                 | -         |
| contentGap  | 轴到内容横向间距 | `number \| string`                 | -         |
| customClass | 自定义类名       | `string`                           | -         |
| customStyle | 自定义样式       | `string \| CSSProperties`          | -         |

### Events

| 事件名    | 说明           | 回调参数        |
| --------- | -------------- | --------------- |
| clickItem | 子项点击时触发 | `index: number` |

### CSS Variables

定义在 `.ui-timeline-item` 选择器内（父组件 props 注入到根节点，cascade 到子项）。

| 变量名                               | 默认值                    | 说明         |
| ------------------------------------ | ------------------------- | ------------ |
| `--ui-timeline-item-dot-size`        | `24rpx`                   | 节点尺寸     |
| `--ui-timeline-item-dot-color`       | `var(--ui-color-primary)` | 节点颜色     |
| `--ui-timeline-item-icon-size`       | `28rpx`                   | 图标尺寸     |
| `--ui-timeline-item-axis-width`      | `48rpx`                   | 轴列宽度     |
| `--ui-timeline-item-line-color`      | `var(--ui-color-border)`  | 连接线颜色   |
| `--ui-timeline-item-line-width`      | `2rpx`                    | 连接线宽度   |
| `--ui-timeline-item-gap`             | `24rpx`                   | 项目间距     |
| `--ui-timeline-item-content-gap`     | `24rpx`                   | 轴到内容间距 |
| `--ui-timeline-item-time-font-size`  | `var(--ui-font-size-xs)`  | 时间字号     |
| `--ui-timeline-item-title-font-size` | `var(--ui-font-size-sm)`  | 标题字号     |
| `--ui-timeline-item-desc-font-size`  | `var(--ui-font-size-xs)`  | 描述字号     |

## 注意事项

- 子项必须是 `ui-timeline-item`
- `mode="alternate"` 配 `reverse` 会保持视觉交替规律（基于反序后的索引计算位置）
- `lineStyle` 为 `dashed`/`dotted` 时通过 `border-left` 实现
