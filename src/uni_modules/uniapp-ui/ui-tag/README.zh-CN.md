# Tag 标签

文字标签。5 种主题色 / 镂空 / 圆角 / 图标 / 可关闭。

## 基础用法

```vue
<ui-tag text="标签" />
<ui-tag type="success" text="成功" />
<ui-tag type="danger" text="危险" />
```

## 镂空 / 圆角

```vue
<ui-tag type="primary" plain text="镂空" />
<ui-tag type="success" round text="圆角" />
```

## 带图标

```vue
<ui-tag type="primary" icon="star-o" text="收藏" />
```

## 可关闭

```vue
<ui-tag v-model:show="visible" closeable text="可关闭" />
```

## 自定义颜色

```vue
<ui-tag background="#7232dd" text-color="text-inverse" text="自定义" />
```

## API

### Props

| 参数          | 说明                     | 类型                                                        | 默认值      |
| ------------- | ------------------------ | ----------------------------------------------------------- | ----------- |
| show          | 显示控制（v-model:show） | `boolean`                                                   | `true`      |
| type          | 主题类型                 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| text          | 文字                     | `string`                                                    | -           |
| text-size     | 文字大小                 | `number \| string`                                          | -           |
| text-color    | 文字颜色                 | `string`                                                    | -           |
| text-weight   | 文字粗细                 | `number \| string`                                          | -           |
| icon          | 图标名                   | `string`                                                    | -           |
| icon-size     | 图标大小                 | `number \| string`                                          | -           |
| icon-color    | 图标颜色                 | `string`                                                    | -           |
| icon-weight   | 图标粗细                 | `number \| string`                                          | -           |
| round         | 胶囊圆角                 | `boolean`                                                   | `false`     |
| plain         | 镂空（白底彩边）         | `boolean`                                                   | `false`     |
| closeable     | 显示关闭图标             | `boolean`                                                   | `false`     |
| height        | 高度                     | `number \| string`                                          | -           |
| padding       | 内边距（CSS shorthand）  | `string`                                                    | -           |
| background    | 背景色                   | `string`                                                    | -           |
| border-color  | 边框色                   | `string`                                                    | -           |
| border-width  | 边框宽度                 | `number \| string`                                          | -           |
| border-radius | 圆角大小                 | `number \| string`                                          | -           |
| custom-class  | 自定义类名               | `string`                                                    | -           |
| custom-style  | 自定义样式               | `string \| CSSProperties`                                   | -           |

### Events

| 事件名      | 说明              | 回调参数        |
| ----------- | ----------------- | --------------- |
| click       | 点击              | -               |
| close       | 关闭              | -               |
| update:show | v-model:show 同步 | `show: boolean` |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义文字内容 |
| icon    | 自定义图标     |
| close   | 自定义关闭图标 |

### CSS 变量

| 名称                  | 说明     |
| --------------------- | -------- |
| --ui-tag-bg           | 背景色   |
| --ui-tag-text-color   | 文字色   |
| --ui-tag-text-size    | 文字大小 |
| --ui-tag-padding      | 内边距   |
| --ui-tag-radius       | 圆角     |
| --ui-tag-border-color | 边框色   |
| --ui-tag-border-width | 边框宽度 |
