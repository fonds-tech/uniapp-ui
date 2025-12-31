# UiTextarea 组件

## 介绍

UiTextarea 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-textarea />
</template>
```

## Props

| 参数                   | 说明                                                                                                                                                  | 类型             | 默认值       | 可选值              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ | ------------------- |
| modelValue             | 输入值                                                                                                                                                | string           | () => ""     | -                   |
| disabled               | 是否禁用                                                                                                                                              | boolean          | false        | -                   |
| clearable              | 是否显示清除按钮                                                                                                                                      | boolean          | true         | -                   |
| maxlength              | 最大输入长度，设置为 -1 的时候不限制最大长度                                                                                                          | string \| number | 200          | -                   |
| background             | 背景颜色                                                                                                                                              | string           | ""           | -                   |
| placeholder            | 输入框为空时的占位符                                                                                                                                  | string           | "请输入内容" | -                   |
| placeholderColor       | 输入框为空时的占位符颜色                                                                                                                              | string           | ""           | -                   |
| placeholderStyle       | 输入框为空时的占位符样式                                                                                                                              | string \| object | ""           | -                   |
| confirmType            | 设置右下角按钮的文字，兼容性详见uni-app文档                                                                                                           | string           | "done"       | -                   |
| confirmHold            | 点击键盘右下角按钮时是否保持键盘不收起，H5无效                                                                                                        | boolean          | false        | -                   |
| showConfirmBar         | 是否显示键盘上方带有”完成“按钮那一栏                                                                                                                  | boolean          | true         | -                   |
| focus                  | 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点        | boolean          | false        | -                   |
| fixed                  | 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true                                                                          | boolean          | false        | -                   |
| autoHeight             | 是否自动增加高度                                                                                                                                      | boolean          | false        | -                   |
| inputAlign             | 输入对齐方式，可选值为 left center right                                                                                                              | string           | "left"       | left, center, right |
| ignoreCompositionEvent | 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件 | boolean          | true         | -                   |
| cursor                 | 指定focus时光标的位置                                                                                                                                 | string \| number | -1           | -                   |
| cursorColor            | 光标颜色                                                                                                                                              | string           | ""           | -                   |
| cursorSpacing          | 输入框聚焦时底部与键盘的距离                                                                                                                          | string \| number | 30           | -                   |
| selectionStart         | 光标起始位置，自动聚集时有效，需与selection-end搭配使用                                                                                               | string \| number | -1           | -                   |
| selectionEnd           | 光标结束位置，自动聚集时有效，需与selection-start搭配使用                                                                                             | string \| number | -1           | -                   |
| adjustPosition         | 键盘弹起时，是否自动上推页面                                                                                                                          | boolean          | true         | -                   |
| holdKeyboard           | focus时，点击页面的时候不收起键盘，只微信小程序有效                                                                                                   | boolean          | false        | -                   |
| color                  | 输入框字体颜色                                                                                                                                        | string           | ""           | -                   |
| width                  | 输入框宽度                                                                                                                                            | string \| number | ""           | -                   |
| padding                | 内边距                                                                                                                                                | string \| number | ""           | -                   |
| minHeight              | 最小输入框高度                                                                                                                                        | string \| number | "150rpx"     | -                   |
| fontSize               | 输入框字体的大小                                                                                                                                      | string \| number | ""           | -                   |
| fontWeight             | 输入框字体的粗细                                                                                                                                      | string \| number | ""           | -                   |
| radius                 | 圆角值                                                                                                                                                | string \| number | ""           | -                   |
| border                 | 边框样式                                                                                                                                              | string           | ""           | -                   |
| showCount              | 是否显示字数统计                                                                                                                                      | boolean          | true         | -                   |
| countSize              | 字数统计字体大小                                                                                                                                      | string \| number | ""           | -                   |
| countColor             | 字数统计字体颜色                                                                                                                                      | string           | ""           | -                   |
| countWeight            | 字数统计字体粗细                                                                                                                                      | string \| number | ""           | -                   |
| disableDefaultPadding  | 是否去掉 iOS 下的默认内边距                                                                                                                           | boolean          | false        | -                   |
| clearIcon              | 输入框清除图标                                                                                                                                        | string           | "cross"      | -                   |
| clearIconSize          | 输入框清除图标大小                                                                                                                                    | string \| number | "24rpx"      | -                   |
| clearIconColor         | 输入框清除图标颜色                                                                                                                                    | string           | "#fff"       | -                   |
| clearIconWeight        | 输入框清除图标粗细                                                                                                                                    | string \| number | ""           | -                   |
| clearIconBackground    | 输入框清除图标背景色                                                                                                                                  | string           | ""           | -                   |
| customClass            | 自定义类名                                                                                                                                            | string           | ""           | -                   |
| customStyle            | 自定义样式                                                                                                                                            | string \| object | ""           | -                   |

## Events

| 事件名               | 说明 | 回调参数      |
| -------------------- | ---- | ------------- |
| clear                | -    | -             |
| focus                | -    | -             |
| blur                 | -    | value: string |
| confirm              | -    | value: string |
| linechange           | -    | event: any    |
| keyboardheightchange | -    | -             |
| input                | -    | value: string |
| change               | -    | value: string |
| update               | -    | value: string |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
