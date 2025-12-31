# NumberRoll 数字滚动

数字滚动动画组件，用于数字变化时的平滑过渡效果。

## 基础用法

```vue
<template>
  <ui-number-roll :value="12345" />
</template>
```

## 自定义样式

通过 `color`、`font-size`、`font-weight` 等属性自定义样式。

```vue
<template>
  <ui-number-roll :value="99999" color="#ee0a24" :font-size="48" font-weight="600" />
</template>
```

## 千位分隔符

通过 `thousands-sep` 属性设置千位分隔符。

```vue
<template>
  <ui-number-roll :value="1234567" thousands-sep="," :font-size="36" />
</template>
```

## 小数位数

通过 `decimal-places` 属性设置小数位数。

```vue
<template>
  <ui-number-roll :value="123.5" :decimal-places="2" :trim-zero="false" />
</template>
```

## 动态更新

```vue
<template>
  <ui-number-roll :value="dynamicValue" :font-size="48" color="#1989fa" font-weight="600" />
  <ui-button size="small" @click="addValue">+100</ui-button>
  <ui-button size="small" @click="subtractValue">-100</ui-button>
  <ui-button size="small" type="primary" @click="randomValue">随机</ui-button>
</template>

<script setup>
import { ref } from "vue"

const dynamicValue = ref(1000)

function addValue() {
  dynamicValue.value += 100
}
function subtractValue() {
  dynamicValue.value = Math.max(0, dynamicValue.value - 100)
}
function randomValue() {
  dynamicValue.value = Math.floor(Math.random() * 100000)
}
</script>
```

## 金额展示

```vue
<template>
  <text class="money-symbol">¥</text>
  <ui-number-roll :value="88888.88" thousands-sep="," :decimal-places="2" :trim-zero="false" :font-size="56" color="#ee0a24" font-weight="600" />
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 数据值 | `string \| number` | `0` |
| color | 字体颜色 | `string` | - |
| font-size | 字体大小 | `string \| number` | `24` |
| font-weight | 字体粗细 | `string` | - |
| trim-zero | 去除小数末尾的0 | `boolean` | `true` |
| thousands-sep | 千位分隔符 | `string` | - |
| decimal-places | 小数位数 | `number` | `2` |
| duration | 过渡时间 | `string \| number` | - |
| timing-function | 动画函数 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |
