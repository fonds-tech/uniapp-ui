# Tabs 标签页

横向标签页容器。配合 `ui-tab` 子项使用。支持滚动、指示器自动跟随、颜色 / 尺寸独立配置。

## 基础用法

```vue
<ui-tabs v-model="active">
  <ui-tab title="推荐" />
  <ui-tab title="发现" />
  <ui-tab title="关注" />
</ui-tabs>
```

## name 标识符

```vue
<ui-tabs v-model="active">
  <ui-tab title="首页" name="home" />
  <ui-tab title="发现" name="discover" />
</ui-tabs>
```

## 横向滚动

```vue
<ui-tabs v-model="active" scrollable>
  <ui-tab v-for="i in 12" :key="i" :title="`标签 ${i}`" />
</ui-tabs>
```

## 颜色 / 文字 / 指示器

```vue
<ui-tabs
  v-model="active"
  active-color="primary"
  inactive-color="text-secondary"
  active-size="34rpx"
  inactive-size="28rpx"
  indicator-color="danger"
  indicator-width="80rpx"
/>
```

`auto-indicator-width` 让指示器宽度跟随激活 tab 文字宽度。

## API

### Props

| 参数                 | 说明                            | 类型               | 默认值  |
| -------------------- | ------------------------------- | ------------------ | ------- |
| v-model              | 当前激活的 name                 | `number \| string` | `0`     |
| height               | 整体高度                        | `number \| string` | `88rpx` |
| scrollable           | 横向滚动                        | `boolean`          | `false` |
| active-size          | 激活文字大小                    | `number \| string` | -       |
| active-color         | 激活文字颜色                    | `string`           | -       |
| active-weight        | 激活文字粗细                    | `number \| string` | -       |
| inactive-size        | 未激活文字大小                  | `number \| string` | -       |
| inactive-color       | 未激活文字颜色                  | `string`           | -       |
| inactive-weight      | 未激活文字粗细                  | `number \| string` | -       |
| indicator-color      | 指示器颜色                      | `string`           | -       |
| indicator-width      | 指示器宽度                      | `number \| string` | `40rpx` |
| indicator-height     | 指示器高度                      | `number \| string` | -       |
| indicator-radius     | 指示器圆角                      | `number \| string` | -       |
| show-indicator       | 显示指示器                      | `boolean`          | `true`  |
| auto-indicator-width | 指示器宽度跟随激活 tab 文字宽度 | `boolean`          | `false` |
| item-width           | 单 tab 固定宽度                 | `number \| string` | -       |
| item-max-width       | 单 tab 最大宽度                 | `number \| string` | -       |
| background           | 背景色                          | `string`           | -       |
| duration             | 指示器/滚动动画时长 (ms)        | `number`           | `300`   |
| border-bottom        | 显示底部分隔线                  | `boolean`          | `false` |
| z-index              | 元素层级                        | `number \| string` | -       |
| custom-class         | 自定义类名                      | `string`           | -       |
| custom-style         | 自定义样式                      | `string \| Object` | -       |

### Events

| 事件名            | 说明     | 回调参数                 |
| ----------------- | -------- | ------------------------ |
| update:modelValue | v-model  | `name: number \| string` |
| change            | 切换完成 | `name`                   |
| tab-click         | 点击 tab | `name`                   |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 放 `ui-tab` 子项 |

### CSS 变量

| 名称                       | 说明         |
| -------------------------- | ------------ |
| --ui-tabs-height           | 整体高度     |
| --ui-tabs-background       | 背景色       |
| --ui-tabs-color-active     | 激活文字色   |
| --ui-tabs-color-inactive   | 未激活文字色 |
| --ui-tabs-indicator-color  | 指示器颜色   |
| --ui-tabs-indicator-height | 指示器高度   |
| --ui-tabs-indicator-radius | 指示器圆角   |

## 注意事项

- 子项数量变化（v-for 数据增减）自动重测尺寸并更新指示器位置
- 中间删除 tab 时如果未显式提供 `name`，剩余 tab 的 index 会重排导致 v-model 错位 — **建议显式 name**
