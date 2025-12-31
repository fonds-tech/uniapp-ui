<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-textarea v-model="value1" placeholder="请输入内容" />
      </demo-block>
    </demo-section>

    <demo-section title="字数统计">
      <demo-block direction="column">
        <ui-textarea v-model="value2" placeholder="请输入内容" :maxlength="100" show-count />
      </demo-block>
    </demo-section>

    <demo-section title="自动高度">
      <demo-block direction="column">
        <ui-textarea v-model="value3" placeholder="高度自动增加" auto-height />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column">
        <ui-textarea v-model="value4" placeholder="禁用状态" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="可清除">
      <demo-block direction="column">
        <ui-textarea v-model="value5" placeholder="可清除内容" clearable />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column">
        <ui-textarea v-model="value6" placeholder="自定义边框和圆角" border="1rpx solid #dcdee0" radius="16rpx" padding="24rpx" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Textarea 文本域" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("这是禁用状态的文本")
const value5 = ref("点击右侧图标清除")
const value6 = ref("")
</script>
