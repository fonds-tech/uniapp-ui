# UiCascader 组件

## 介绍

UiCascader 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-cascader />
</template>
```

## Props

| 参数                | 说明                                                            | 类型                                                  | 默认值          | 可选值 |
| ------------------- | --------------------------------------------------------------- | ----------------------------------------------------- | --------------- | ------ |
| show                | 是否显示弹窗                                                    | boolean                                               | false           | -      |
| mode                | 弹窗位置                                                        | "top" \| "bottom" \| "left" \| "right" \| "center"    | bottom          | -      |
| borderRadius        | 圆角大小                                                        | string \| number                                      | 24rpx 24rpx 0 0 | -      |
| closeOnClickOverlay | 点击遮罩是否关闭                                                | boolean                                               | true            | -      |
| overlay             | 是否显示遮罩                                                    | boolean                                               | true            | -      |
| duration            | 动画时长                                                        | number \| string                                      | 300             | -      |
| zIndex              | 弹窗层级                                                        | number \| string                                      | -               | -      |
| background          | 背景色                                                          | string                                                | -               | -      |
| safeAreaInsetBottom | 底部安全区                                                      | boolean                                               | true            | -      |
| lazyRender          | 是否在显示时才渲染                                              | boolean                                               | true            | -      |
| modelValue          | 绑定值                                                          | [Number, String]                                           | -               | -      |
| title               | 顶部标题                                                        | string                                                | -               | -      |
| options             | 可选项数据源                                                    | Array as PropType<CascaderOption[]>                   | () => []        | -      |
| placeholder         | 未选中时的提示文案                                              | makeStringProp("请选择")                              | -               | -      |
| color               | 选项文字颜色                                                    | makeStringProp("#323233")                             | -               | -      |
| activeColor         | 选中选项文字颜色                                                | string                                                | -               | -      |
| swipeable           | 是否开启手势左右滑动切换                                        | truthProp                                             | -               | -      |
| closeable           | 是否显示关闭图标                                                | truthProp                                             | -               | -      |
| showHeader          | 是否展示头部栏                                                  | truthProp                                             | -               | -      |
| titleSize           | 标题大小                                                        | [Number, String]                                           | -               | -      |
| titleColor          | 标题大小                                                        | [Number, String]                                           | -               | -      |
| titleWeight         | 标题大小                                                        | [Number, String]                                           | -               | -      |
| closeIcon           | 关闭图标名称或图片链接，等同于 Icon 组件的 name 属性            | makeStringProp("cross")                               | -               | -      |
| closeIconSize       | 关闭图标大小                                                    | makeNumericProp("32rpx")                              | -               | -      |
| closeIconColor      | 关闭图标颜色                                                    | makeStringProp("#333333")                             | -               | -      |
| closeIconWeight     | 关闭图标粗细                                                    | [Number, String]                                           | -               | -      |
| beforeChange        | 输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise | Function as PropType<Interceptor>                     | -               | -      |
| fieldKeys           | 数据字段                                                        | Object as PropType<CascaderFieldKeys>                 | () => ({})      | -      |
| customClass         | 自定义类名                                                      | string                                                | -               | -      |
| customStyle         | 自定义样式                                                      | [String, Object] as PropType<string \| CSSProperties> | -               | -      |

## Events

| 事件名            | 说明 | 回调参数                                                                            |
| ----------------- | ---- | ----------------------------------------------------------------------------------- |
| close             | -    | -                                                                                   |
| change            | -    | data: { value: string \| number; selectedOptions: CascaderOption[]; index: number } |
| finish            | -    | data: { value: string \| number; selectedOptions: CascaderOption[]; index: number } |
| clickTab          | -    | data: { index: number }                                                             |
| update:modelValue | -    | value: string \| number                                                             |
| update:show       | -    | show: boolean                                                                       |

## Slots

| 名称  | 说明 |
| ----- | ---- |
| close | -    |
| title | -    |
