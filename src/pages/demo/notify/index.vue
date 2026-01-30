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

    <demo-section title="使用 Hook">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showByHook">Hook 调用</ui-button>
        <ui-button type="success" @click="showSuccessByHook">成功通知</ui-button>
      </demo-block>
    </demo-section>

    <ui-notify ref="notifyRef" />
  </demo-page>
</template>

<script setup lang="ts">
import { useNotify, provideNotify } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Notify 消息通知" },
})

const notifyRef = ref()
const notify = useNotify()

onMounted(() => {
  provideNotify(notifyRef)
})

function showBasic() {
  notifyRef.value?.show({ content: "这是一条通知消息" })
}

function showPrimary() {
  notifyRef.value?.show({ content: "主要通知", type: "primary" })
}

function showSuccess() {
  notifyRef.value?.show({ content: "成功通知", type: "success" })
}

function showWarning() {
  notifyRef.value?.show({ content: "警告通知", type: "warning" })
}

function showDanger() {
  notifyRef.value?.show({ content: "危险通知", type: "danger" })
}

function showCustom() {
  notifyRef.value?.show({ content: "自定义颜色", background: "#7232dd", color: "#ffffff" })
}

function showDuration() {
  notifyRef.value?.show({ content: "5秒后关闭", duration: 5000 })
}

function showByHook() {
  notify.primary("通过 Hook 调用")
}

function showSuccessByHook() {
  notify.success("操作成功")
}
</script>
