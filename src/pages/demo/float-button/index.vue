<template>
  <demo-page>
    <demo-section title="基础用法" desc="右下角显示一个浮动按钮" />

    <demo-section title="按钮类型">
      <demo-block>
        <ui-button type="primary" size="small" @click="currentType = 'primary'">Primary</ui-button>
        <ui-button type="success" size="small" @click="currentType = 'success'">Success</ui-button>
        <ui-button type="warning" size="small" @click="currentType = 'warning'">Warning</ui-button>
        <ui-button type="danger" size="small" @click="currentType = 'danger'">Danger</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标">
      <demo-block>
        <ui-button size="small" @click="currentIcon = 'plus'">Plus</ui-button>
        <ui-button size="small" @click="currentIcon = 'edit'">Edit</ui-button>
        <ui-button size="small" @click="currentIcon = 'message'">Message</ui-button>
        <ui-button size="small" @click="currentIcon = 'share'">Share</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="带文字">
      <demo-block>
        <ui-switch v-model="showText" />
        <text class="switch-label">{{ showText ? "显示文字" : "隐藏文字" }}</text>
      </demo-block>
    </demo-section>

    <!-- Placeholder Content -->
    <demo-section v-for="i in 10" :key="i" :title="`占位内容 ${i}`" desc="滚动页面查看浮动按钮效果" />

    <!-- Float Button -->
    <ui-float-button :type="currentType" :icon="currentIcon" :text="showText ? '添加' : ''" @click="onClick" />
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "FloatButton 浮动按钮" },
})

const currentType = ref("primary")
const currentIcon = ref("plus")
const showText = ref(false)

function onClick() {
  uni.showToast({ title: "点击了浮动按钮", icon: "none" })
}
</script>

<style lang="scss" scoped>
.switch-label {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
  margin-left: 16rpx;
}
</style>
