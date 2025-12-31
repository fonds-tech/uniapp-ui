<template>
  <demo-page>
    <demo-section title="返回顶部" desc="向下滚动页面，右下角会出现返回顶部按钮" />

    <!-- Placeholder Content -->
    <demo-section v-for="i in 30" :key="i" :title="`占位内容 ${i}`" desc="这是一段占位内容，用于演示滚动效果" />

    <!-- Back Top Button -->
    <ui-back-top />
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "BackTop 返回顶部" },
})
</script>
