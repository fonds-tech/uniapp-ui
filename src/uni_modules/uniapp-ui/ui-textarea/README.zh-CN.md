# Textarea 文本域

多行文本输入组件，支持字数统计、自动高度、清除按钮、表单集成。

## 基础用法

```vue
<ui-textarea v-model="value" placeholder="请输入留言内容" />
```

## 字数统计

```vue
<ui-textarea v-model="value" :maxlength="100" show-count />
```

## 自动高度

```vue
<ui-textarea v-model="value" auto-height />
```

## 清除按钮

聚焦且有值时显示。

```vue
<ui-textarea v-model="value" clearable />
```

## 禁用 / 只读

`disabled` 置灰 + 阻止输入；`readonly` 仅阻止编辑，可选中文本。

```vue
<ui-textarea v-model="value" disabled />
<ui-textarea v-model="value" readonly />
```

## 表单集成

放入 `ui-form` / `ui-form-item` 自动同步父级 disabled/readonly。

```vue
<ui-form :model="form">
  <ui-form-item label="备注" prop="remark">
    <ui-textarea v-model="form.remark" :maxlength="200" show-count />
  </ui-form-item>
</ui-form>
```

## 自定义样式

```vue
<ui-textarea
  v-model="value"
  background="background-section"
  color="text"
  radius="16rpx"
  border="2rpx solid var(--ui-color-border)"
  :min-height="200"
/>
```

## API

### Props

#### 基础

| 参数        | 说明                        | 类型                            | 默认值         |
| ----------- | --------------------------- | ------------------------------- | -------------- |
| modelValue  | 绑定值                      | `string`                        | `""`           |
| placeholder | 占位符                      | `string`                        | `"请输入内容"` |
| maxlength   | 最大长度，`-1` 不限制       | `number`                        | `200`          |
| disabled    | 禁用（置灰 + 阻输入）       | `boolean`                       | `false`        |
| readonly    | 只读（仅阻编辑）            | `boolean`                       | `false`        |
| clearable   | 显示清除按钮（聚焦+有值时） | `boolean`                       | `true`         |
| autoHeight  | 自动撑高                    | `boolean`                       | `false`        |
| showCount   | 显示字数统计                | `boolean`                       | `false`        |
| inputAlign  | 文本对齐                    | `"left" \| "center" \| "right"` | `"left"`       |

#### 原生透传

| 参数                   | 说明                                     | 类型                                                         | 默认值   |
| ---------------------- | ---------------------------------------- | ------------------------------------------------------------ | -------- |
| focus                  | 自动聚焦                                 | `boolean`                                                    | `false`  |
| fixed                  | 父级 `position:fixed` 时设 true          | `boolean`                                                    | `false`  |
| cursor                 | 聚焦时光标位置                           | `number`                                                     | `-1`     |
| cursorColor            | 光标颜色                                 | `string`                                                     | -        |
| cursorSpacing          | 聚焦时底部与键盘距离                     | `number`                                                     | `30`     |
| selectionStart         | 选区起点                                 | `number`                                                     | `-1`     |
| selectionEnd           | 选区终点                                 | `number`                                                     | `-1`     |
| confirmType            | 键盘右下角按钮文字                       | `"send" \| "search" \| "next" \| "go" \| "done" \| "return"` | `"done"` |
| confirmHold            | 点击确认后保持键盘不收起                 | `boolean`                                                    | `false`  |
| showConfirmBar         | 显示键盘上方"完成"栏                     | `boolean`                                                    | `true`   |
| adjustPosition         | 键盘弹起时自动上推页面                   | `boolean`                                                    | `true`   |
| holdKeyboard           | 聚焦后点击页面不收起键盘（仅 MP-WEIXIN） | `boolean`                                                    | `false`  |
| disableDefaultPadding  | 去掉 iOS 默认内边距                      | `boolean`                                                    | `false`  |
| ignoreCompositionEvent | 忽略合成事件                             | `boolean`                                                    | `true`   |

#### 占位符样式

| 参数             | 说明       | 类型                      | 默认值 |
| ---------------- | ---------- | ------------------------- | ------ |
| placeholderColor | 占位符颜色 | `string`                  | -      |
| placeholderStyle | 占位符样式 | `string \| CSSProperties` | -      |

#### 容器样式

| 参数       | 说明     | 类型               | 默认值 |
| ---------- | -------- | ------------------ | ------ |
| color      | 字体颜色 | `string`           | -      |
| background | 背景色   | `string`           | -      |
| width      | 容器宽度 | `number \| string` | -      |
| padding    | 内边距   | `number \| string` | -      |
| minHeight  | 最小高度 | `number \| string` | -      |
| fontSize   | 字号     | `number \| string` | -      |
| fontWeight | 字重     | `number \| string` | -      |
| radius     | 圆角     | `number \| string` | -      |
| border     | 边框样式 | `string`           | -      |

#### 字数统计样式

| 参数        | 说明     | 类型               | 默认值 |
| ----------- | -------- | ------------------ | ------ |
| countSize   | 统计字号 | `number \| string` | -      |
| countColor  | 统计颜色 | `string`           | -      |
| countWeight | 统计字重 | `number \| string` | -      |

#### 清除按钮

| 参数                | 说明       | 类型               | 默认值    |
| ------------------- | ---------- | ------------------ | --------- |
| clearIcon           | 图标名     | `string`           | `"cross"` |
| clearIconSize       | 图标尺寸   | `number \| string` | -         |
| clearIconColor      | 图标颜色   | `string`           | -         |
| clearIconWeight     | 图标字重   | `number \| string` | -         |
| clearIconBackground | 图标背景色 | `string`           | -         |

#### 自定义

| 参数        | 说明       | 类型                      | 默认值 |
| ----------- | ---------- | ------------------------- | ------ |
| customClass | 自定义类名 | `string`                  | -      |
| customStyle | 自定义样式 | `string \| CSSProperties` | -      |

### Events

| 事件名               | 说明         | 回调参数        |
| -------------------- | ------------ | --------------- |
| update:modelValue    | 双向绑定更新 | `value: string` |
| input                | 输入         | `value: string` |
| change               | 值变化       | `value: string` |
| focus                | 聚焦         | -               |
| blur                 | 失焦         | `value: string` |
| confirm              | 键盘确认     | `value: string` |
| clear                | 清除按钮点击 | -               |
| linechange           | 行数变化     | `event`         |
| keyboardheightchange | 键盘高度变化 | -               |

### 暴露方法

| 方法  | 参数              | 说明   |
| ----- | ----------------- | ------ |
| reset | `(value: string)` | 重置值 |

### CSS Variables

| 变量名                           | 默认值                             | 说明         |
| -------------------------------- | ---------------------------------- | ------------ |
| `--ui-textarea-width`            | `100%`                             | 容器宽度     |
| `--ui-textarea-bg`               | `var(--ui-color-background)`       | 背景色       |
| `--ui-textarea-color`            | `var(--ui-color-text)`             | 字体颜色     |
| `--ui-textarea-padding`          | `var(--ui-spacing-md)`             | 内边距       |
| `--ui-textarea-radius`           | `0`                                | 圆角         |
| `--ui-textarea-border`           | `none`                             | 边框         |
| `--ui-textarea-min-height`       | `150rpx`                           | 最小高度     |
| `--ui-textarea-font-size`        | `var(--ui-font-size-sm)`           | 字号         |
| `--ui-textarea-font-weight`      | `var(--ui-font-weight-normal)`     | 字重         |
| `--ui-textarea-count-color`      | `var(--ui-color-text-secondary)`   | 统计颜色     |
| `--ui-textarea-count-size`       | `var(--ui-font-size-xs)`           | 统计字号     |
| `--ui-textarea-count-weight`     | `var(--ui-font-weight-normal)`     | 统计字重     |
| `--ui-textarea-clear-icon-size`  | `24rpx`                            | 清除图标尺寸 |
| `--ui-textarea-clear-icon-color` | `var(--ui-color-text-inverse)`     | 清除图标颜色 |
| `--ui-textarea-clear-icon-bg`    | `var(--ui-color-text-placeholder)` | 清除图标背景 |

## 注意事项

- `holdKeyboard` 仅微信小程序生效
- `disableDefaultPadding` 仅去 iOS 端默认内边距
- `confirmHold` 在 H5 端无效
- `readonly` 不置灰，可选中文本；`disabled` 置灰且不可选中
- `focus` prop 单向触发；再次置 true 不会重新聚焦，需通过焦点重置逻辑实现
