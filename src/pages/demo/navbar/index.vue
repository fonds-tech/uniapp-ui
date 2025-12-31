<template>
  <demo-page custom-class="navbar-demo-page">
    <ui-navbar title="标题" background="#ffffff" is-back />

    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" />
      </demo-block>
    </demo-section>

    <demo-section title="返回按钮">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" is-back />
      </demo-block>
    </demo-section>

    <demo-section title="返回文字">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" is-back back-text="返回" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义左侧">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false">
          <template #left>
            <ui-icon name="close" size="40rpx" />
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义右侧">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" is-back>
          <template #right>
            <ui-icon name="search" size="40rpx" />
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" background="primary" title-color="#ffffff" is-back back-icon-color="#ffffff" />
      </demo-block>
    </demo-section>

    <demo-section title="标题居中">
      <demo-block direction="column">
        <ui-navbar title="标题居中" :fixed="false" is-back title-center />
      </demo-block>
    </demo-section>

    <demo-section title="底部边框">
      <demo-block direction="column">
        <ui-navbar title="底部边框" :fixed="false" border-bottom />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Navbar 导航栏" },
})
</script>

<style lang="scss" scoped>
.navbar-demo-page {
  padding-top: 0;
}
</style>
