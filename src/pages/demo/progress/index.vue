<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-progress :percentage="50" />
      </demo-block>
    </demo-section>

    <demo-section title="线条粗细">
      <demo-block direction="column">
        <ui-progress :percentage="50" stroke-width="12rpx" />
        <ui-progress :percentage="50" stroke-width="24rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="置灰">
      <demo-block direction="column">
        <ui-progress :percentage="50" inactive />
      </demo-block>
    </demo-section>

    <demo-section title="不同颜色">
      <demo-block direction="column">
        <ui-progress :percentage="30" color="primary" />
        <ui-progress :percentage="50" color="success" />
        <ui-progress :percentage="70" color="warning" />
        <ui-progress :percentage="90" color="danger" />
      </demo-block>
    </demo-section>

    <demo-section title="渐变色">
      <demo-block direction="column">
        <ui-progress :percentage="percentage" :color="['#3b82f6', '#8b5cf6']" />
      </demo-block>
    </demo-section>

    <demo-section title="显示百分比">
      <demo-block direction="column">
        <ui-progress :percentage="percentage" show-text />
        <ui-progress :percentage="percentage" show-text text-inside />
      </demo-block>
    </demo-section>

    <demo-section title="动态演示">
      <demo-block direction="column">
        <ui-progress :percentage="percentage" show-text />
        <demo-block>
          <ui-button size="small" @click="decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="increase">增加</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Progress 进度条" },
})

const percentage = ref(50)

function increase() {
  percentage.value = Math.min(100, percentage.value + 10)
}

function decrease() {
  percentage.value = Math.max(0, percentage.value - 10)
}
</script>
