<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-color-panel v-model="basic" />
      <text class="demo-tip">当前颜色: {{ basic }}</text>
    </demo-section>

    <demo-section title="仅色板模式">
      <ui-color-panel v-model="palette" mode="palette" />
    </demo-section>

    <demo-section title="仅滑块模式">
      <ui-color-panel v-model="slider" mode="slider" />
    </demo-section>

    <demo-section title="自定义预设颜色">
      <ui-color-panel v-model="custom" :preset-colors="customColors" mode="palette" />
    </demo-section>

    <demo-section title="隐藏输入框">
      <ui-color-panel v-model="noInput" :show-input="false" />
    </demo-section>

    <demo-section title="禁用状态">
      <ui-color-panel v-model="disabled" disabled />
    </demo-section>
  </demo-page>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const basic = ref("#6366F1")
const palette = ref("#F44336")
const slider = ref("#4CAF50")
const custom = ref("#FF5722")
const noInput = ref("#2196F3")
const disabled = ref("#9C27B0")

const customColors = ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#533483", "#F39C12", "#27AE60", "#2980B9", "#8E44AD", "#E74C3C"]
</script>

<style lang="scss" scoped>
.demo-tip {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 20rpx;
  text-align: center;
}
</style>
