<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-input v-model="value1" placeholder="请输入内容" />
      </demo-block>
    </demo-section>

    <demo-section title="输入框类型">
      <demo-block direction="column">
        <ui-input v-model="value2" type="text" placeholder="文本输入" />
        <ui-input v-model="value3" type="number" placeholder="数字输入" />
        <ui-input v-model="value4" type="digit" placeholder="带小数点数字" />
        <ui-input v-model="value5" password placeholder="密码输入" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用和只读">
      <demo-block direction="column">
        <ui-input model-value="禁用状态" disabled placeholder="禁用状态" />
        <ui-input model-value="只读状态" readonly placeholder="只读状态" />
      </demo-block>
    </demo-section>

    <demo-section title="清除按钮">
      <demo-block direction="column">
        <ui-input v-model="value6" clearable placeholder="可清除内容" />
        <ui-input v-model="value7" :clearable="false" placeholder="不可清除" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column">
        <ui-input v-model="value8" background="#f5f6fa" radius="16rpx" placeholder="自定义背景和圆角" />
        <ui-input v-model="value9" input-align="center" placeholder="居中对齐" />
        <ui-input v-model="value10" input-align="right" placeholder="右对齐" />
      </demo-block>
    </demo-section>

    <demo-section title="限制输入长度">
      <demo-block direction="column">
        <ui-input v-model="value11" :maxlength="10" placeholder="最多输入10个字符" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Input 输入框" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("可以清除的内容")
const value7 = ref("")
const value8 = ref("")
const value9 = ref("")
const value10 = ref("")
const value11 = ref("")
</script>
