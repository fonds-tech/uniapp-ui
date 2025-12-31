<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-search v-model="value1" placeholder="请输入搜索关键词" />
      </demo-block>
    </demo-section>

    <demo-section title="圆角搜索框">
      <demo-block direction="column">
        <ui-search v-model="value2" round placeholder="圆角搜索框" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column">
        <ui-search v-model="value3" disabled placeholder="禁用状态" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景色">
      <demo-block direction="column">
        <ui-search v-model="value4" background="#f5f5f5" placeholder="自定义背景色" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义按钮文字">
      <demo-block direction="column">
        <ui-search v-model="value5" action-text="确定" placeholder="自定义按钮文字" />
      </demo-block>
    </demo-section>

    <demo-section title="隐藏搜索按钮">
      <demo-block direction="column">
        <ui-search v-model="value6" :action="false" placeholder="隐藏搜索按钮" />
      </demo-block>
    </demo-section>

    <demo-section title="搜索事件">
      <demo-block direction="column">
        <ui-search v-model="value7" placeholder="点击搜索按钮触发事件" @search="onSearch" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Search 搜索" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("禁用内容")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("")
const value7 = ref("")

function onSearch(value: string) {
  uni.showToast({ title: `搜索: ${value}`, icon: "none" })
}
</script>
