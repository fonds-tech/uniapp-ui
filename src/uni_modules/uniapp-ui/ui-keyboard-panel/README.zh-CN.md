# KeyboardPanel 键盘面板

纯键盘渲染面板，剥离 popup 包装。可独立内嵌到业务页面，也作为 `ui-keyboard` 弹层模式下的内部实现。

## 引入

`ui-keyboard-panel` 已在 easycom 中注册，无需手动 import。

## 代码示例

### 数字键盘

```vue
<template>
  <ui-keyboard-panel v-model="value" mode="number" />
</template>
```

### 带小数点

```vue
<template>
  <ui-keyboard-panel v-model="value" mode="number" show-dot />
</template>
```

### 身份证键盘

```vue
<template>
  <ui-keyboard-panel v-model="value" mode="card" />
</template>
```

### 车牌键盘

```vue
<template>
  <ui-keyboard-panel v-model="value" mode="car" />
</template>
```

## API

### Props

| 参数         | 说明                                | 类型                      | 默认值     |
| ------------ | ----------------------------------- | ------------------------- | ---------- |
| v-model      | 当前输入值                          | `string`                  | `""`       |
| title        | 顶部标题                            | `string`                  | `""`       |
| mode         | 键盘类型：`number` / `card` / `car` | `string`                  | `number`   |
| maxlength    | 最大输入长度                        | `number \| string`        | `Infinity` |
| random       | 是否打乱按键顺序                    | `boolean`                 | `false`    |
| show-dot     | 数字键盘是否显示小数点              | `boolean`                 | `false`    |
| vibrate      | 是否开启按键震动                    | `boolean`                 | `false`    |
| auto-switch  | 车牌键盘是否自动中英切换            | `boolean`                 | `true`     |
| show-header  | 是否显示头部栏                      | `boolean`                 | `true`     |
| show-cancel  | 是否显示取消按钮                    | `boolean`                 | `true`     |
| cancel-text  | 取消按钮文字                        | `string`                  | `取消`     |
| show-confirm | 是否显示确认按钮                    | `boolean`                 | `true`     |
| confirm-text | 确认按钮文字                        | `string`                  | `确定`     |
| background   | 背景颜色                            | `string`                  | `#f2f3f5`  |
| custom-class | 自定义类名                          | `string`                  | -          |
| custom-style | 自定义样式                          | `string \| CSSProperties` | -          |

### Events

| 事件              | 说明               | 回调参数 |
| ----------------- | ------------------ | -------- |
| input             | 按键输入时触发     | `string` |
| change            | 输入值变化时触发   | `string` |
| delete            | 删除键按下时触发   | -        |
| cancel            | 点击取消时触发     | -        |
| confirm           | 点击确认时触发     | -        |
| close             | 点击收起按键时触发 | -        |
| update:modelValue | 输入值更新         | `string` |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| header  | 自定义头部栏   |
| title   | 自定义标题     |
| cancel  | 自定义取消按钮 |
| confirm | 自定义确认按钮 |

### 方法

通过 `ref` 调用：

| 方法  | 说明       |
| ----- | ---------- |
| clear | 清空输入值 |
