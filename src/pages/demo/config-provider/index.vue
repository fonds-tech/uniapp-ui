<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-config-provider>
          <ui-button type="primary">默认主题按钮</ui-button>
        </ui-config-provider>
      </demo-block>
    </demo-section>

    <demo-section title="主题模式">
      <demo-block direction="column">
        <view class="theme-switch">
          <ui-text>当前主题：{{ currentTheme }}</ui-text>
          <ui-button size="small" @click="toggleTheme">切换主题</ui-button>
        </view>
        <ui-config-provider ref="configProviderRef" :theme="theme" background="#f5f6fa" height="200px">
          <view class="theme-demo">
            <ui-button type="primary">主要按钮</ui-button>
            <ui-button type="success">成功按钮</ui-button>
            <ui-tag type="primary">标签</ui-tag>
          </view>
        </ui-config-provider>
      </demo-block>
    </demo-section>

    <demo-section title="自定义主题色">
      <demo-block direction="column">
        <ui-config-provider :theme-vars="customThemeVars" background="#f5f6fa" height="auto">
          <view class="theme-demo">
            <ui-button type="primary">自定义主色按钮</ui-button>
            <ui-button type="success">自定义成功按钮</ui-button>
            <ui-tag type="primary">自定义标签</ui-tag>
            <ui-tag type="success">成功标签</ui-tag>
          </view>
        </ui-config-provider>
      </demo-block>
    </demo-section>

    <demo-section title="自定义 CSS 变量">
      <demo-block direction="column">
        <ui-config-provider :css-vars="customCssVars" background="#f5f6fa" height="auto">
          <view class="css-vars-demo">
            <ui-text>使用自定义 CSS 变量设置间距和圆角</ui-text>
            <view class="custom-box">自定义样式盒子</view>
          </view>
        </ui-config-provider>
      </demo-block>
    </demo-section>

    <demo-section title="跟随系统主题">
      <demo-block direction="column">
        <ui-config-provider theme="auto" background="#f5f6fa" height="auto">
          <view class="theme-demo">
            <ui-text>主题将跟随系统设置自动切换</ui-text>
            <ui-button type="primary">自动主题按钮</ui-button>
          </view>
        </ui-config-provider>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "ConfigProvider 全局配置" },
})

const theme = ref<"light" | "dark">("light")
const configProviderRef = ref()

const currentTheme = computed(() => {
  return theme.value === "light" ? "亮色" : "暗色"
})

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light"
}

// 自定义主题色
const customThemeVars = {
  primary: "#7232dd",
  success: "#00b894",
}

// 自定义 CSS 变量
const customCssVars = {
  "custom-padding": "20px",
  "custom-radius": "12px",
}
</script>

<style scoped lang="scss">
.theme-switch {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
}

.theme-demo {
  gap: 12px;
  display: flex;
  padding: 16px;
  flex-wrap: wrap;
}

.css-vars-demo {
  padding: 16px;

  .custom-box {
    color: #fff;
    padding: var(--ui-custom-padding, 16px);
    background: var(--ui-color-primary, #1989fa);
    margin-top: 12px;
    text-align: center;
    border-radius: var(--ui-custom-radius, 8px);
  }
}
</style>
