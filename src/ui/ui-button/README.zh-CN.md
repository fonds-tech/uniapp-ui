# UiButton 组件

## 介绍

UiButton 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-button />
</template>
```

## Props

| 参数                 | 说明                                                                                                                                                           | 类型                        | 默认值    | 可选值                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | --------- | ----------------------------------------- |
| type                 | 按钮类型                                                                                                                                                       | string                      | "primary" | primary, success, warning, error, default |
| size                 | 按钮大小                                                                                                                                                       | string                      | "normal"  | mini, small, normal, medium, large        |
| round                | 是否圆形的                                                                                                                                                     | boolean                     | false     | -                                         |
| text                 | 是否文本按钮                                                                                                                                                   | boolean                     | false     | -                                         |
| plain                | 是否镂空的                                                                                                                                                     | boolean                     | false     | -                                         |
| block                | 是否块级的                                                                                                                                                     | boolean                     | false     | -                                         |
| color                | 按钮颜色                                                                                                                                                       | string                      | ""        | -                                         |
| width                | 按钮宽度                                                                                                                                                       | number \| string            | ""        | -                                         |
| height               | 按钮高度                                                                                                                                                       | number \| string            | ""        | -                                         |
| disabled             | 是否禁用                                                                                                                                                       | boolean                     | false     | -                                         |
| loading              | 是否加载中                                                                                                                                                     | boolean                     | false     | -                                         |
| shadow               | 按钮阴影                                                                                                                                                       | string                      | -         | -                                         |
| loadingText          | 加载中文本                                                                                                                                                     | number \| string \| boolean | ""        | -                                         |
| loadingIconSize      | 加载中图标大小                                                                                                                                                 | number \| string            | ""        | -                                         |
| textSize             | 按钮文本大小                                                                                                                                                   | string \| number            | ""        | -                                         |
| textColor            | 按钮文本颜色                                                                                                                                                   | string                      | ""        | -                                         |
| textWeight           | 按钮文本粗细                                                                                                                                                   | string \| number            | ""        | -                                         |
| icon                 | 按钮图标                                                                                                                                                       | string                      | ""        | -                                         |
| iconSize             | 按钮图标大小                                                                                                                                                   | string \| number            | ""        | -                                         |
| iconColor            | 按钮图标颜色                                                                                                                                                   | string                      | ""        | -                                         |
| iconWeight           | 按钮图标粗细                                                                                                                                                   | string \| number            | ""        | -                                         |
| borderRadius         | 按钮圆角大小                                                                                                                                                   | string \| number            | ""        | -                                         |
| borderWidth          | 按钮边框宽度                                                                                                                                                   | string \| number            | ""        | -                                         |
| borderColor          | 按钮边框颜色                                                                                                                                                   | string                      | ""        | -                                         |
| formType             | 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件                                                                                               | string                      | "submit"  | -                                         |
| openType             | 开放能力                                                                                                                                                       | string                      | ""        | -                                         |
| appParameter         | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效                                                                                                      | string                      | ""        | -                                         |
| hoverStopPropagation | 指定是否阻止本节点的祖先节点出现点击态                                                                                                                         | boolean                     | true      | -                                         |
| lang                 | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。                                                                                              | string                      | "zh_CN"   | zh_CN, zh_TW, en                          |
| sessionFrom          | 会话来源，open-type="contact"时有效                                                                                                                            | string                      | ""        | -                                         |
| sendMessageTitle     | 会话内消息卡片标题，open-type="contact"时有效                                                                                                                  | string                      | ""        | -                                         |
| sendMessagePath      | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效                                                                                                    | string                      | ""        | -                                         |
| sendMessageImg       | 会话内消息卡片图片，open-type="contact"时有效                                                                                                                  | string                      | ""        | -                                         |
| showMessageCard      | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | boolean                     | false     | -                                         |
| throttle             | 节流，一定时间内只能触发一次，默认为 200                                                                                                                       | string \| number            | 200       | -                                         |
| hoverStartTime       | 按住后多久出现点击态，单位毫秒                                                                                                                                 | number                      | 0         | -                                         |
| hoverStayTime        | 手指松开后点击态保留时间，单位毫秒                                                                                                                             | number                      | 50        | -                                         |
| marginLeft           | 左外边距                                                                                                                                                       | string \| number            | ""        | -                                         |
| marginRight          | 右外边距                                                                                                                                                       | string \| number            | ""        | -                                         |
| customClass          | 自定义类名                                                                                                                                                     | string                      | ""        | -                                         |
| customStyle          | 自定义样式                                                                                                                                                     | string \| object            | ""        | -                                         |

## Events

| 事件名         | 说明 | 回调参数                                                                                     |
| -------------- | ---- | -------------------------------------------------------------------------------------------- |
| click          | -    | next: { loading: (state: boolean, text: string) => void; disable: (state: boolean) => void } |
| error          | -    | event: any                                                                                   |
| launchapp      | -    | event: any                                                                                   |
| getuserinfo    | -    | event: any                                                                                   |
| opensetting    | -    | event: any                                                                                   |
| getphonenumber | -    | event: any                                                                                   |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
