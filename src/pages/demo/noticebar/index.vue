<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-notice-bar text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </demo-block>
    </demo-section>

    <demo-section title="滚动播放">
      <demo-block direction="column">
        <ui-notice-bar scrollable text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </demo-block>
    </demo-section>

    <demo-section title="多行展示">
      <demo-block direction="column">
        <ui-notice-bar wrapable :scrollable="false" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </demo-block>
    </demo-section>

    <demo-section title="左侧图标">
      <demo-block direction="column">
        <ui-notice-bar left-icon="volume-up" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </demo-block>
    </demo-section>

    <demo-section title="通知模式">
      <demo-block direction="column">
        <ui-notice-bar mode="closeable" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
        <ui-notice-bar mode="link" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column">
        <ui-notice-bar background="#ecf9ff" color="#1989fa" left-icon="info" text="技术是开发它的人的共同灵魂。" />
      </demo-block>
    </demo-section>

    <demo-section title="垂直滚动">
      <demo-block direction="column">
        <ui-notice-bar :text="notices" vertical left-icon="volume-up" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "NoticeBar 通知栏" },
})

const notices = ["通知内容一", "通知内容二", "通知内容三"]
</script>
