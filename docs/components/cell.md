# Cell 单元格

列表单元格组件，常用于展示列表信息。

## 基础用法

```vue
<ui-cell-group>
  <ui-cell title="单元格" value="内容" />
  <ui-cell title="单元格" value="内容" label="描述信息" />
</ui-cell-group>
```

## 展示箭头

设置 `is-link` 显示右侧箭头。

```vue
<ui-cell-group>
  <ui-cell title="单元格" is-link />
  <ui-cell title="单元格" value="内容" is-link />
</ui-cell-group>
```

## 带图标

通过 `icon` 设置左侧图标。

```vue
<ui-cell-group>
  <ui-cell title="单元格" icon="location" />
  <ui-cell title="单元格" icon="phone" value="内容" />
</ui-cell-group>
```

## 垂直居中

设置 `center` 使内容垂直居中。

```vue
<ui-cell title="单元格" value="内容" label="描述信息" center />
```

## CellGroup 统一样式

通过 `CellGroup` 可以统一设置内容样式。

```vue
<ui-cell-group content-color="#666" content-size="14">
  <ui-cell title="单元格" value="继承样式" />
  <ui-cell title="单元格" value="继承样式" />
</ui-cell-group>
```

## API

### Cell Props

| 属性名        | 说明         | 类型               | 默认值  |
| ------------- | ------------ | ------------------ | ------- |
| title         | 左侧标题     | `string`           | -       |
| value         | 右侧内容     | `string`           | -       |
| label         | 描述信息     | `string`           | -       |
| icon          | 左侧图标     | `string`           | -       |
| is-link       | 是否展示箭头 | `boolean`          | `false` |
| center        | 是否垂直居中 | `boolean`          | `false` |
| clickable     | 是否可点击   | `boolean`          | `true`  |
| border        | 是否显示边框 | `boolean`          | `true`  |
| url           | 跳转链接     | `string`           | -       |
| content-size  | 内容字体大小 | `string \| number` | -       |
| content-color | 内容字体颜色 | `string`           | -       |

### Cell Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| click  | 点击单元格时触发 | -        |

### CellGroup Props

| 属性名        | 说明                       | 类型               | 默认值 |
| ------------- | -------------------------- | ------------------ | ------ |
| radius        | 圆角大小                   | `string \| number` | -      |
| background    | 背景颜色                   | `string`           | -      |
| content-size  | 内容字体大小（子组件继承） | `string \| number` | -      |
| content-color | 内容字体颜色（子组件继承） | `string`           | -      |
