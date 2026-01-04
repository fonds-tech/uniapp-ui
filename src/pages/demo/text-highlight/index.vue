<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-text-highlight text="Vue.js 是一款用于构建用户界面的渐进式 JavaScript 框架" match="Vue.js" />
      </demo-block>
    </demo-section>

    <demo-section title="多个匹配">
      <demo-block>
        <ui-text-highlight text="Vue 3 相比 Vue 2 带来了更好的性能和更小的体积" match="Vue" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义高亮颜色">
      <demo-block direction="column">
        <ui-text-highlight text="TypeScript 是 JavaScript 的超集，提供了类型系统" match="TypeScript" highlight-color="#07c160" />
        <ui-text-highlight text="React 和 Vue 都是流行的前端框架" match="React" highlight-color="#1989fa" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义文本样式">
      <demo-block>
        <ui-text-highlight text="UniApp 支持多端发布，一套代码多处运行" match="UniApp" color="#666" font-size="32rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="多行文本">
      <demo-block>
        <ui-text-highlight :text="longText" match="组件" :text-row="3" line-height="1.6" />
      </demo-block>
    </demo-section>

    <demo-section title="搜索场景">
      <demo-block direction="column">
        <ui-input v-model="keyword" placeholder="输入关键词搜索" />
        <ui-text-highlight :text="searchText" :match="keyword" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "TextHighlight 文本高亮" },
})

const keyword = ref("")
const searchText = "UniApp UI 是一个基于 Vue 3 的跨端 UI 组件库，提供丰富的组件和工具函数"
const longText =
  "组件化开发是现代前端开发的核心理念之一。通过将页面拆分为独立的组件，我们可以更好地复用代码、维护项目。每个组件都有自己的逻辑和样式，组件之间通过 props 和事件进行通信。"
</script>
