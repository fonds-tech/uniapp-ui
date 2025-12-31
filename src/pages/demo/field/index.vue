<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="0">
        <ui-field v-model="value1" label="用户名" placeholder="请输入用户名" />
        <ui-field v-model="value2" label="密码" type="password" placeholder="请输入密码" />
      </demo-block>
    </demo-section>

    <demo-section title="必填项">
      <demo-block direction="column" :gap="0">
        <ui-field v-model="value3" label="手机号" placeholder="请输入手机号" required />
      </demo-block>
    </demo-section>

    <demo-section title="禁用与只读">
      <demo-block direction="column" :gap="0">
        <ui-field v-model="value4" label="禁用" placeholder="禁用状态" disabled />
        <ui-field v-model="value5" label="只读" placeholder="只读状态" readonly />
      </demo-block>
    </demo-section>

    <demo-section title="带图标">
      <demo-block direction="column" :gap="0">
        <ui-field v-model="value6" label="用户名" placeholder="请输入" prefix-icon="person" />
        <ui-field v-model="value7" label="密码" type="password" placeholder="请输入" suffix-icon="eye" />
      </demo-block>
    </demo-section>

    <demo-section title="可清除">
      <demo-block direction="column" :gap="0">
        <ui-field v-model="value8" label="内容" placeholder="输入后显示清除按钮" clearable />
      </demo-block>
    </demo-section>

    <demo-section title="多行文本">
      <demo-block direction="column" :gap="0">
        <ui-field v-model="value9" label="留言" type="textarea" placeholder="请输入留言" :maxlength="200" autosize />
      </demo-block>
    </demo-section>

    <demo-section title="输入对齐">
      <demo-block direction="column" :gap="0">
        <ui-field v-model="value10" label="左对齐" placeholder="请输入" input-align="left" />
        <ui-field v-model="value11" label="居中" placeholder="请输入" input-align="center" />
        <ui-field v-model="value12" label="右对齐" placeholder="请输入" input-align="right" />
      </demo-block>
    </demo-section>

    <demo-section title="标签位置 (顶部)">
      <demo-block direction="column" :gap="0">
        <ui-field v-model="value13" label="详细地址" type="textarea" placeholder="请输入详细地址" label-align="top" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Field 输入域" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("禁用内容")
const value5 = ref("只读内容")
const value6 = ref("")
const value7 = ref("")
const value8 = ref("")
const value9 = ref("")
const value10 = ref("")
const value11 = ref("")
const value12 = ref("")
const value13 = ref("")
</script>
