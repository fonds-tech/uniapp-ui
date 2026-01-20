<template>
  <demo-page padding-x="0">
    <demo-section title="基础用法" :card="false">
      <ui-textarea v-model="basic" placeholder="请输入留言内容" />
    </demo-section>

    <demo-section title="字数统计" :card="false">
      <ui-textarea v-model="count" placeholder="请输入个人简介" :maxlength="100" show-count />
    </demo-section>

    <demo-section title="自动高度" :card="false">
      <ui-textarea v-model="autoHeight" placeholder="输入内容时高度自动增加" auto-height />
    </demo-section>

    <demo-section title="可清除" :card="false">
      <ui-textarea v-model="clearable" placeholder="请输入反馈意见" clearable />
    </demo-section>

    <demo-section title="禁用状态" :card="false">
      <ui-textarea v-model="disabled" placeholder="禁用状态" disabled />
    </demo-section>

    <demo-section title="只读状态" :card="false">
      <ui-textarea model-value="这是只读状态的文本内容，无法编辑。" readonly />
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Textarea 文本域" },
})

const basic = ref("")
const count = ref("")
const autoHeight = ref("")
const clearable = ref("点击右侧图标清除")
const disabled = ref("这是禁用状态的文本")
</script>
