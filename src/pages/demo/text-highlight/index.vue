<template>
  <demo-page>
    <demo-section title="基础用法" desc="match 子串自动高亮">
      <ui-text-highlight text="Vue.js 是一款用于构建用户界面的渐进式 JavaScript 框架" match="Vue.js" />
    </demo-section>

    <demo-section title="多个匹配" desc="重复出现的 match 全部高亮">
      <ui-text-highlight text="Vue 3 相比 Vue 2 带来了更好的性能和更小的体积，Vue 生态也越来越完善" match="Vue" />
    </demo-section>

    <demo-section title="自定义高亮色" desc="highlight-color 切换">
      <demo-block direction="column" :gap="16">
        <ui-text-highlight text="搜索高亮：keyword 演示，再次出现 keyword" match="keyword" :highlight-color="colorDemo" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in colorPresets" :key="c.value" size="small" :type="colorDemo === c.value ? 'primary' : 'default'" @click="colorDemo = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="搜索场景" desc="输入框联动高亮">
      <demo-block direction="column" :gap="16">
        <ui-input v-model="keyword" placeholder="输入关键词搜索" />
        <view v-for="item in results" :key="item.id" class="result-row">
          <ui-text-highlight :text="item.text" :match="keyword" :text-row="2" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="click / clickMatch 区分匹配段">
      <demo-block direction="column" :gap="12">
        <ui-text-highlight text="点击不同段落：匹配 / 非匹配。再次出现匹配 段落" match="匹配" @click="onClick" @click-match="onClickMatch" />
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 搜索结果列表" desc="结合关键词列表">
      <demo-block direction="column" :gap="16">
        <ui-input v-model="searchKeyword" placeholder="试试 'Vue' 或 '组件'" />
        <view v-for="item in searchList" :key="item.id" class="search-row">
          <ui-text-highlight :text="item.title" :match="searchKeyword" :text-row="1" color="text" font-size="28rpx" font-weight="600" />
          <ui-text-highlight :text="item.desc" :match="searchKeyword" :text-row="2" color="text-secondary" font-size="24rpx" />
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "TextHighlight 文本高亮" },
})

const colorPresets = [
  { label: "主色", value: "primary" },
  { label: "成功", value: "success" },
  { label: "警告", value: "warning" },
  { label: "危险", value: "danger" },
]
const colorDemo = ref("primary")

const keyword = ref("uni")
const results = [
  { id: 1, text: "UniApp UI 是基于 Vue 3 的跨端 UI 组件库" },
  { id: 2, text: "支持 H5 / 小程序 / App 多端运行" },
  { id: 3, text: "uni-helper 提供 TypeScript 类型支持" },
]

const eventLog = ref("等待事件...")
function onClick(val: string | number) {
  eventLog.value = `[click] ${val}`
}
function onClickMatch(val: string | number) {
  eventLog.value = `[clickMatch] ${val}`
}

const searchKeyword = ref("Vue")
const searchList = [
  { id: 1, title: "Vue 3 设计与实现", desc: "深入学习 Vue 响应式系统和编译器原理" },
  { id: 2, title: "组件化开发实战", desc: "如何拆分和复用 Vue 组件" },
  { id: 3, title: "TypeScript + Vue 最佳实践", desc: "类型安全的 Vue 项目结构" },
]
</script>

<style lang="scss" scoped>
.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.result-row {
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-sm);
}

.search-row {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  border-bottom: var(--ui-border-width-thin) solid var(--ui-color-border-light);
  flex-direction: column;
}
</style>
