<template>
  <demo-page>
    <demo-section title="基础用法" desc="向下滚动页面，按钮会吸顶" />

    <ui-sticky>
      <ui-button type="primary" block>基础用法</ui-button>
    </ui-sticky>

    <demo-section title="吸顶距离" desc="offset-top 可设置吸顶距离" />

    <ui-sticky :offset-top="100">
      <ui-button type="success" block>吸顶距离 100rpx</ui-button>
    </ui-sticky>

    <!-- Placeholder Content -->
    <demo-section v-for="i in 20" :key="i" :title="`占位内容 ${i}`" desc="这是一段占位内容，用于演示滚动效果" />
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Sticky 粘性布局" },
})
</script>
