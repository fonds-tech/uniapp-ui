# Tooltip 文字提示

文字提示气泡，点击 / 悬浮触发，支持 12 种位置、自定义内容、受控模式。

## 基础用法

```vue
<ui-tooltip content="提示文字">
  <ui-button>点击显示</ui-button>
</ui-tooltip>
```

## 位置 placement

12 种位置：`top` / `top-start` / `top-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `left-start` / `left-end` / `right` / `right-start` / `right-end`。

```vue
<ui-tooltip content="底部提示" placement="bottom">
  <ui-button>底部</ui-button>
</ui-tooltip>
```

## 触发方式 trigger

- `click`（默认）：点击切换；跨端通用
- `hover`：H5 / App 鼠标悬浮触发；MP 自动降级为 click

```vue
<ui-tooltip content="悬浮显示" trigger="hover">
  <ui-button>悬浮</ui-button>
</ui-tooltip>
```

## 受控模式 v-model:visible

```vue
<ui-tooltip v-model:visible="show" content="受控">
  <ui-button>切换</ui-button>
</ui-tooltip>
```

## 自定义内容

```vue
<ui-tooltip>
  <ui-button>带图标</ui-button>
  <template #content>
    <view><ui-icon name="info" /> 自定义内容</view>
  </template>
</ui-tooltip>
```

## 自定义颜色

```vue
<ui-tooltip content="主色背景" bg-color="primary" text-color="text-inverse">
  <ui-button>主色</ui-button>
</ui-tooltip>
```

## API

### Props

| 参数                | 说明                    | 类型                      | 默认值    |
| ------------------- | ----------------------- | ------------------------- | --------- |
| content             | 提示内容                | `string`                  | -         |
| placement           | 弹出位置                | `TooltipPlacement`        | `"top"`   |
| trigger             | 触发方式（MP 仅 click） | `"click" \| "hover"`      | `"click"` |
| v-model:visible     | 显示状态                | `boolean`                 | `false`   |
| disabled            | 禁用                    | `boolean`                 | `false`   |
| offset              | 偏移量（px）            | `number \| string`        | `0`       |
| showArrow           | 显示箭头                | `boolean`                 | `true`    |
| closeOnClickOutside | 点击外部自动关闭        | `boolean`                 | `true`    |
| bgColor             | 背景色                  | `string`                  | -         |
| textColor           | 文字颜色                | `string`                  | -         |
| maxWidth            | 最大宽度                | `number \| string`        | -         |
| duration            | 动画时长（毫秒）        | `number`                  | `200`     |
| zIndex              | 层级                    | `number \| string`        | -         |
| customClass         | 自定义类名              | `string`                  | -         |
| customStyle         | 自定义样式              | `string \| CSSProperties` | -         |

### Events

| 事件名         | 说明     | 回调参数           |
| -------------- | -------- | ------------------ |
| update:visible | 显示变化 | `visible: boolean` |
| open           | 打开     | -                  |
| close          | 关闭     | -                  |

### 暴露方法

| 方法   | 说明 |
| ------ | ---- |
| open   | 打开 |
| close  | 关闭 |
| toggle | 切换 |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 触发元素       |
| content | 自定义提示内容 |

### CSS Variables

| 变量名                    | 默认值                                      | 说明     |
| ------------------------- | ------------------------------------------- | -------- |
| `--ui-tooltip-bg`         | `rgba(38, 39, 40, 0.85)`                    | 背景色   |
| `--ui-tooltip-color`      | `var(--ui-color-text-inverse)`              | 文字颜色 |
| `--ui-tooltip-radius`     | `var(--ui-radius-sm)`                       | 圆角     |
| `--ui-tooltip-padding`    | `var(--ui-spacing-sm) var(--ui-spacing-md)` | 内边距   |
| `--ui-tooltip-font-size`  | `var(--ui-font-size-sm)`                    | 字号     |
| `--ui-tooltip-max-width`  | `400rpx`                                    | 最大宽度 |
| `--ui-tooltip-arrow-size` | `5px`                                       | 箭头尺寸 |
| `--ui-tooltip-shadow`     | `0 2px 12px rgba(0, 0, 0, 0.15)`            | 阴影     |

## 注意事项

- `trigger="hover"` 仅 H5 / App 生效，MP 自动降级 click
- 点击外部默认关闭，`closeOnClickOutside=false` 可关
- 12 种 placement 不做自动翻转，请预估边界自选合适方向
- `bg-color` 同时影响 popup 背景和箭头颜色
