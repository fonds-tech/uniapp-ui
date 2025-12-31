<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-button type="primary" @click="showBasic">基础用法</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="通知类型">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showPrimary">主要通知</ui-button>
        <ui-button type="success" @click="showSuccess">成功通知</ui-button>
        <ui-button type="warning" @click="showWarning">警告通知</ui-button>
        <ui-button type="danger" @click="showDanger">危险通知</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义配置">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showCustom">自定义颜色</ui-button>
        <ui-button type="primary" @click="showDuration">自定义时长</ui-button>
      </demo-block>
    </demo-section>

    <!-- Notify Component -->
    <ui-notify ref="notifyRef" />
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Notify 消息通知" },
})

const notifyRef = ref()

function showBasic() {
  notifyRef.value?.show({ message: "这是一条通知消息" })
}

function showPrimary() {
  notifyRef.value?.show({ message: "主要通知", type: "primary" })
}

function showSuccess() {
  notifyRef.value?.show({ message: "成功通知", type: "success" })
}

function showWarning() {
  notifyRef.value?.show({ message: "警告通知", type: "warning" })
}

function showDanger() {
  notifyRef.value?.show({ message: "危险通知", type: "danger" })
}

function showCustom() {
  notifyRef.value?.show({ message: "自定义颜色", background: "#7232dd", color: "#ffffff" })
}

function showDuration() {
  notifyRef.value?.show({ message: "5秒后关闭", duration: 5000 })
}
</script>
