<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-switch v-model="value1" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-switch v-model="value2" disabled />
        <ui-switch :model-value="true" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block>
        <ui-switch v-model="value3" loading />
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block>
        <ui-switch v-model="value4" size="40rpx" />
        <ui-switch v-model="value5" size="50rpx" />
        <ui-switch v-model="value6" size="60rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block>
        <ui-switch v-model="value7" active-color="#ee0a24" />
        <ui-switch v-model="value8" active-color="#7232dd" />
        <ui-switch v-model="value9" active-color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
      </demo-block>
    </demo-section>

    <demo-section title="异步控制">
      <demo-block>
        <ui-switch v-model="asyncValue" :loading="asyncLoading" @change="onAsyncChange" />
        <text class="demo-text">点击后延迟1秒切换</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Switch 开关" },
})

const value1 = ref(false)
const value2 = ref(false)
const value3 = ref(true)
const value4 = ref(true)
const value5 = ref(true)
const value6 = ref(true)
const value7 = ref(true)
const value8 = ref(true)
const value9 = ref(true)

const asyncValue = ref(false)
const asyncLoading = ref(false)

function onAsyncChange() {
  asyncLoading.value = true
  setTimeout(() => {
    asyncValue.value = !asyncValue.value
    asyncLoading.value = false
  }, 1000)
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
