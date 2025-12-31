# UiField 组件

## 介绍

UiField 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-field />
</template>
```

## Props

| 参数                   | 说明                                                                                                                                                  | 类型                          | 默认值       | 可选值                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------ | ------------------------ |
| modelValue             | 当前输入的值                                                                                                                                          | string \| number              | ""           | -                        |
| label                  | 输入框左侧文本                                                                                                                                        | string                        | ""           | -                        |
| prop                   | 表单域字段名                                                                                                                                          | string                        | ""           | -                        |
| type                   | 输入框类型                                                                                                                                            | String as PropType<FieldType> | "text"       | -                        |
| maxlength              | 最大输入长度，设置为 -1 的时候不限制最大长度                                                                                                          | string \| number              | 2000         | -                        |
| disabled               | 是否禁用输入框                                                                                                                                        | boolean                       | false        | -                        |
| readonly               | 是否为只读状态，只读状态下无法输入内容                                                                                                                | boolean                       | false        | -                        |
| focus                  | 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点        | boolean                       | false        | -                        |
| fixed                  | 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true                                                                          | boolean                       | false        | -                        |
| colon                  | 是否在 label 后面添加冒号                                                                                                                             | boolean                       | false        | -                        |
| required               | 是否显示表单必填星号                                                                                                                                  | boolean                       | false        | -                        |
| autosize               | 是否自适应内容高度，只对 textarea 有效，                                                                                                              | boolean                       | false        | -                        |
| background             | 背景颜色                                                                                                                                              | string                        | ""           | -                        |
| clearable              | 是否启用清除图标，点击清除图标后会清空输入框                                                                                                          | boolean                       | false        | -                        |
| clearIcon              | 清除图标名称                                                                                                                                          | string                        | "cross"      | -                        |
| clearIconSize          | 清除图标大小                                                                                                                                          | string \| number              | "24rpx"      | -                        |
| clearIconColor         | 清除图标颜色                                                                                                                                          | string                        | "#fff"       | -                        |
| clearIconWeight        | 清除图标粗细                                                                                                                                          | string \| number              | ""           | -                        |
| prefixIcon             | 输入框前置图标                                                                                                                                        | string                        | ""           | -                        |
| prefixIconSize         | 输入框前置图标大小                                                                                                                                    | string \| number              | ""           | -                        |
| prefixIconColor        | 输入框前置图标颜色                                                                                                                                    | string                        | ""           | -                        |
| prefixIconWeight       | 输入框前置图标粗细                                                                                                                                    | string \| number              | ""           | -                        |
| suffixIcon             | 输入框后置图标                                                                                                                                        | string                        | ""           | -                        |
| suffixIconSize         | 输入框后置图标大小                                                                                                                                    | string \| number              | ""           | -                        |
| suffixIconColor        | 输入框后置图标颜色                                                                                                                                    | string                        | ""           | -                        |
| suffixIconWeight       | 输入框后置图标粗细                                                                                                                                    | string \| number              | ""           | -                        |
| placeholder            | 输入框为空时的占位符                                                                                                                                  | string                        | "请输入内容" | -                        |
| placeholderColor       | 输入框为空时的占位符颜色                                                                                                                              | string                        | ""           | -                        |
| placeholderStyle       | 输入框为空时的占位符样式                                                                                                                              | string \| object              | ""           | -                        |
| labelWidth             | 表单项 label 宽度                                                                                                                                     | string \| number              | ""           | -                        |
| labelSize              | 表单项 label 字体大小                                                                                                                                 | string \| number              | ""           | -                        |
| labelColor             | 表单项 label 字体颜色                                                                                                                                 | string                        | ""           | -                        |
| labelWeight            | 表单项 label 字体粗细                                                                                                                                 | string \| number              | ""           | -                        |
| labelAlign             | 表单项 label 对齐方式，可选值为 left center right top                                                                                                 | string                        | "left"       | left, center, right, top |
| inputAlign             | 输入对齐方式，可选值为 left center right                                                                                                              | string                        | "left"       | left, center, right      |
| confirmType            | 设置右下角按钮的文字，兼容性详见uni-app文档                                                                                                           | string                        | "done"       | -                        |
| ignoreCompositionEvent | 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件 | boolean                       | true         | -                        |
| cursor                 | 指定focus时光标的位置                                                                                                                                 | string \| number              | -1           | -                        |
| cursorSpacing          | 输入框聚焦时底部与键盘的距离                                                                                                                          | string \| number              | 30           | -                        |
| selectionStart         | 光标起始位置，自动聚集时有效，需与selection-end搭配使用                                                                                               | string \| number              | -1           | -                        |
| selectionEnd           | 光标结束位置，自动聚集时有效，需与selection-start搭配使用                                                                                             | string \| number              | -1           | -                        |
| adjustPosition         | 键盘弹起时，是否自动上推页面                                                                                                                          | boolean                       | true         | -                        |
| showConfirmBar         | 是否显示键盘上方带有”完成“按钮那一栏                                                                                                                  | boolean                       | true         | -                        |
| autoBlur               | 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效                                                                                                     | boolean                       | false        | -                        |
| confirmHold            | 点击键盘右下角按钮时是否保持键盘不收起，H5无效                                                                                                        | boolean                       | false        | -                        |
| holdKeyboard           | focus时，点击页面的时候不收起键盘，只微信小程序有效                                                                                                   | boolean                       | false        | -                        |
| color                  | 输入框字体颜色                                                                                                                                        | string                        | ""           | -                        |
| width                  | 输入框宽度                                                                                                                                            | string \| number              | ""           | -                        |
| height                 | 输入框高度                                                                                                                                            | string \| number              | ""           | -                        |
| minHeight              | 最小输入框高度                                                                                                                                        | string \| number              | ""           | -                        |
| fontSize               | 输入框字体的大小                                                                                                                                      | string \| number              | ""           | -                        |
| fontWeight             | 输入框字体的粗细                                                                                                                                      | string \| number              | ""           | -                        |
| border                 | 边框样式                                                                                                                                              | string                        | ""           | -                        |
| borderRadius           | 圆角值                                                                                                                                                | string \| number              | ""           | -                        |
| showCount              | 是否显示字数统计                                                                                                                                      | boolean                       | true         | -                        |
| countSize              | 字数统计字体大小                                                                                                                                      | string \| number              | ""           | -                        |
| countColor             | 字数统计字体颜色                                                                                                                                      | string                        | ""           | -                        |
| countWeight            | 字数统计字体粗细                                                                                                                                      | string \| number              | ""           | -                        |
| disableDefaultPadding  | 是否去掉 iOS 下的默认内边距                                                                                                                           | boolean                       | false        | -                        |
| customClass            | 自定义类名                                                                                                                                            | string                        | ""           | -                        |
| customStyle            | 自定义样式                                                                                                                                            | string \| object              | ""           | -                        |

## Events

| 事件名               | 说明 | 回调参数                                                   |
| -------------------- | ---- | ---------------------------------------------------------- |
| clear                | -    | -                                                          |
| focus                | -    | -                                                          |
| blur                 | -    | value: string                                              |
| confirm              | -    | value: string                                              |
| keyboardheightchange | -    | -                                                          |
| input                | -    | value: string                                              |
| change               | -    | value: string                                              |
| linechange           | -    | event: any                                                 |
| startValidate        | -    | -                                                          |
| endValidate          | -    | result: { status: FieldValidationStatus; message: string } |
| update               | -    | value: string                                              |

## Slots

| 名称   | 说明 |
| ------ | ---- |
| label  | -    |
| prefix | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
