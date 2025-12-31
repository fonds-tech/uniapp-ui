# Navbar 导航栏

顶部导航栏组件，支持返回按钮、自定义内容等。

## 基础用法

```vue
<template>
  <ui-navbar title="标题" />
</template>
```

## 返回按钮

通过 `is-back` 属性显示返回按钮。

```vue
<template>
  <ui-navbar title="标题" is-back />
</template>
```

## 返回文字

通过 `back-text` 属性设置返回按钮文字。

```vue
<template>
  <ui-navbar title="标题" is-back back-text="返回" />
</template>
```

## 自定义左侧

通过 `left` 插槽自定义左侧内容。

```vue
<template>
  <ui-navbar title="标题">
    <template #left>
      <ui-icon name="close" size="40rpx" />
    </template>
  </ui-navbar>
</template>
```

## 自定义右侧

通过 `right` 插槽自定义右侧内容。

```vue
<template>
  <ui-navbar title="标题" is-back>
    <template #right>
      <ui-icon name="search" size="40rpx" />
    </template>
  </ui-navbar>
</template>
```

## 自定义背景

通过 `background` 和 `title-color` 属性自定义样式。

```vue
<template>
  <ui-navbar title="标题" background="primary" title-color="#ffffff" is-back back-icon-color="#ffffff" />
</template>
```

## 标题居中

通过 `title-center` 属性使标题居中。

```vue
<template>
  <ui-navbar title="标题居中" is-back title-center />
</template>
```

## 底部边框

通过 `border-bottom` 属性显示底部边框。

```vue
<template>
  <ui-navbar title="底部边框" border-bottom />
</template>
```
