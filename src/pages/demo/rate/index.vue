<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-rate v-model="value1" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标">
      <demo-block>
        <ui-rate v-model="value2" icon="heart-fill" void-icon="heart" color="#ee0a24" />
      </demo-block>
    </demo-section>

    <demo-section title="半星">
      <demo-block>
        <ui-rate v-model="value3" allow-half />
      </demo-block>
    </demo-section>

    <demo-section title="自定义数量">
      <demo-block>
        <ui-rate v-model="value4" :count="6" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block>
        <ui-rate v-model="value5" color="#07c160" void-color="#e8e8e8" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block direction="column" align="start">
        <ui-rate v-model="value6" size="40rpx" />
        <ui-rate v-model="value6" size="56rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-rate v-model="value7" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="只读状态">
      <demo-block>
        <ui-rate v-model="value8" readonly allow-half />
      </demo-block>
    </demo-section>

    <demo-section title="可滑动选择">
      <demo-block>
        <ui-rate v-model="value9" touchable />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Rate 评分" },
})

const value1 = ref(3)
const value2 = ref(3)
const value3 = ref(2.5)
const value4 = ref(4)
const value5 = ref(3)
const value6 = ref(3)
const value7 = ref(3)
const value8 = ref(3.5)
const value9 = ref(3)
</script>
