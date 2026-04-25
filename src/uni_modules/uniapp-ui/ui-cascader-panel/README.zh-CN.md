# CascaderPanel 级联面板

纯级联选择面板，剥离 popup 包装。可独立内嵌到业务页面，也作为 `ui-cascader` 弹层模式下的内部实现。

## 引入

`ui-cascader-panel` 已在 easycom 中注册，无需手动 import。

## 代码示例

### 基本使用

```vue
<template>
  <ui-cascader-panel v-model="value" :options="options" @finish="onFinish" />
</template>
```

### 自定义字段

```vue
<template>
  <ui-cascader-panel v-model="value" :options="options" :field-keys="{ text: 'label', value: 'id' }" />
</template>
```

### 异步加载

```vue
<template>
  <ui-cascader-panel v-model="value" :options="options" :before-change="beforeChange" />
</template>
```

## API

### Props

| 参数              | 说明                 | 类型                      | 默认值    |
| ----------------- | -------------------- | ------------------------- | --------- |
| v-model           | 当前选中值           | `string \| number`        | -         |
| title             | 顶部标题             | `string`                  | -         |
| options           | 可选项数据源         | `CascaderPanelOption[]`   | `[]`      |
| placeholder       | 未选中时的提示文案   | `string`                  | `请选择`  |
| color             | 选项文字颜色         | `string`                  | `#323233` |
| active-color      | 选中项文字颜色       | `string`                  | -         |
| swipeable         | 是否支持手势左右滑动 | `boolean`                 | `true`    |
| closeable         | 是否显示关闭图标     | `boolean`                 | `false`   |
| show-header       | 是否展示头部栏       | `boolean`                 | `true`    |
| title-size        | 标题大小             | `number \| string`        | -         |
| title-color       | 标题颜色             | `string`                  | -         |
| title-weight      | 标题字重             | `number \| string`        | -         |
| close-icon        | 关闭图标名称         | `string`                  | `cross`   |
| close-icon-size   | 关闭图标大小         | `number \| string`        | `32rpx`   |
| close-icon-color  | 关闭图标颜色         | `string`                  | `#333333` |
| close-icon-weight | 关闭图标粗细         | `number \| string`        | -         |
| before-change     | 选项变化前的拦截器   | `Interceptor`             | -         |
| field-keys        | 自定义字段映射       | `CascaderPanelFieldKeys`  | -         |
| custom-class      | 自定义类名           | `string`                  | -         |
| custom-style      | 自定义样式           | `string \| CSSProperties` | -         |

### Events

| 事件              | 说明                           | 回调参数                  |
| ----------------- | ------------------------------ | ------------------------- |
| change            | 选项变化时触发                 | `CascaderPanelChangeData` |
| finish            | 选择完成（叶子节点选中）时触发 | `CascaderPanelChangeData` |
| click-tab         | 点击标签页时触发               | `{ index: number }`       |
| update:modelValue | 选中值更新                     | `string \| number`        |
| close             | 点击关闭按钮时触发             | -                         |

### Slots

| 名称  | 说明           |
| ----- | -------------- |
| title | 自定义标题     |
| close | 自定义关闭按钮 |
| empty | 自定义空状态   |

### 方法

通过 `ref` 调用：

| 方法       | 说明                 |
| ---------- | -------------------- |
| reset      | 重置选择状态         |
| updateTabs | 根据当前值刷新标签页 |
