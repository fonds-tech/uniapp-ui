<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-loading />
      </demo-block>
    </demo-section>

    <demo-section title="加载类型">
      <demo-block>
        <ui-loading type="circular" />
        <ui-loading type="spinner" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block>
        <ui-loading color="#1989fa" />
        <ui-loading color="#07c160" />
        <ui-loading color="#ee0a24" />
        <ui-loading color="#7232dd" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block>
        <ui-loading size="24rpx" />
        <ui-loading size="36rpx" />
        <ui-loading size="48rpx" />
        <ui-loading size="64rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="加载文案">
      <demo-block direction="column" align="start">
        <ui-loading text="加载中..." />
        <ui-loading text="请稍候..." vertical />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Loading 加载" },
})
</script>
