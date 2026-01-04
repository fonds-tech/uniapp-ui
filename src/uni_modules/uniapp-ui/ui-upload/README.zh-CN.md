# UiUpload 组件

## 介绍

UiUpload 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-upload />
</template>
```

## Props

| 参数              | 说明                                                                                                        | 类型                                                                  | 默认值                           | 可选值 |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | ------ |
| modelValue        | 绑定值                                                                                                      | string \| array                                                       | ""                               | -      |
| show              | 是否显示组件                                                                                                | boolean                                                               | true                             | -      |
| width             | 宽度                                                                                                        | string \| number                                                      | "160rpx"                         | -      |
| height            | 高度                                                                                                        | string \| number                                                      | "160rpx"                         | -      |
| accept            | 允许上传的文件类型, https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file                    | String as PropType<UniApp.ChooseMessageFileOption["type"] \| "media"> | ""                               | -      |
| capture           | 图片或视频拾取模式，当accept为image类型时，设置capture为camera可以直接调起摄像头，默认值["album", "camera"] | Array as PropType<string[]>                                           | () => ["album", "camera"]        | -      |
| camera            | 当accept为video时生效，可选值为back或front                                                                  | String as PropType<"back" \| "front">                                 | ""                               | -      |
| preview           | 是否点击预览，仅支持图片格式                                                                                | boolean                                                               | false                            | -      |
| multiple          | 是否多选                                                                                                    | boolean                                                               | false                            | -      |
| deletable         | 是否展示删除按钮                                                                                            | boolean                                                               | true                             | -      |
| disabled          | 是否禁用                                                                                                    | boolean                                                               | false                            | -      |
| compressed        | 当accept为video时生效，是否压缩视频，默认为true                                                             | boolean                                                               | true                             | -      |
| background        | 背景颜色                                                                                                    | string                                                                | ""                               | -      |
| maxSize           | 选择单个文件的最大大小                                                                                      | number \| string \| Function                                          | Infinity                         | -      |
| maxCount          | 文件上传数量限制                                                                                            | number                                                                | Infinity                         | -      |
| maxDuration       | 当accept为video时生效，拍摄视频最长拍摄时间，单位秒                                                         | number                                                                | 60                               | -      |
| sizeType          | original 原图，compressed 压缩图，默认二者都有，H5无效                                                      | Array as PropType<string[]>                                           | () => ["original", "compressed"] | -      |
| previewGap        | 预览上传图之间的间隔                                                                                        | string \| number                                                      | "20rpx"                          | -      |
| imageMode         | 图片显示模式，和image组件mode属性一致                                                                       | string                                                                | "aspectFill"                     | -      |
| previewIconSize   | 预览区图标大小                                                                                              | string \| number                                                      | "60rpx"                          | -      |
| previewIconColor  | 预览区图标颜色                                                                                              | string                                                                | "#cccccc"                        | -      |
| previewIconWeight | 预览区图标粗细                                                                                              | string \| number                                                      | ""                               | -      |
| icon              | 上传区域图标                                                                                                | string                                                                | "photograph"                     | -      |
| iconSize          | 上传区域图标大小                                                                                            | string \| number                                                      | "56rpx"                          | -      |
| iconColor         | 上传区域图标颜色                                                                                            | string                                                                | "#cccccc"                        | -      |
| iconWeight        | 上传区域图标粗细                                                                                            | string \| number                                                      | ""                               | -      |
| beforeRemove      | 文件删除前的回调函数                                                                                        | Function                                                              | -                                | -      |
| afterRead         | 文件读取完成后的回调函数                                                                                    | Function                                                              | -                                | -      |
| beforeRead        | 文件读取前的回调函数                                                                                        | Function                                                              | -                                | -      |
| customClass       | 自定义类名                                                                                                  | string                                                                | ""                               | -      |
| customStyle       | 自定义样式                                                                                                  | string \| object                                                      | ""                               | -      |

## Events

| 事件名   | 说明 | 回调参数                            |
| -------- | ---- | ----------------------------------- |
| upload   | -    | event: { files: any }               |
| delete   | -    | event: { index: number; file: any } |
| oversize | -    | files: UploadFile[]                 |
| update   | -    | value: string \| string[]           |

## Slots

| 名称   | 说明 |
| ------ | ---- |
| delete | -    |
| icon   | -    |
