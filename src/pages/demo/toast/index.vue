<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="3" :gap="24">
        <ui-button type="primary" @click="showToast('文字提示')">文字提示</ui-button>
        <ui-button type="success" @click="showSuccessToast">成功提示</ui-button>
        <ui-button type="danger" @click="showFailToast">失败提示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="加载提示">
      <demo-block>
        <ui-button @click="showLoadingToast">加载提示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="showIconToast('star', '收藏成功')">星星图标</ui-button>
        <ui-button @click="showIconToast('heart', '已喜欢')">心形图标</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义位置">
      <demo-block :cols="3" :gap="24">
        <ui-button @click="showPositionToast('top')">顶部展示</ui-button>
        <ui-button @click="showPositionToast('middle')">居中展示</ui-button>
        <ui-button @click="showPositionToast('bottom')">底部展示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义时长">
      <demo-block :cols="3" :gap="24">
        <ui-button @click="showDurationToast(1000)">1 秒</ui-button>
        <ui-button @click="showDurationToast(3000)">3 秒</ui-button>
        <ui-button @click="showDurationToast(5000)">5 秒</ui-button>
      </demo-block>
    </demo-section>

    <!-- 页面级 Toast 组件 -->
    <ui-toast ref="toastRef" />
  </demo-page>
</template>

<script setup lang="ts">
import type { ToastInstance } from "@/ui/ui-toast"
import { ref } from "vue"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Toast 轻提示" },
})

// Toast 组件实例引用
const toastRef = ref<ToastInstance | null>(null)

function showToast(content: string) {
  toastRef.value?.show(content)
}

function showSuccessToast() {
  toastRef.value?.show({ content: "操作成功", type: "success" })
}

function showFailToast() {
  toastRef.value?.show({ content: "操作失败", type: "fail" })
}

function showLoadingToast() {
  toastRef.value?.show({ content: "加载中...", type: "loading" })
  // 2秒后手动关闭
  setTimeout(() => toastRef.value?.hide(), 2000)
}

function showIconToast(icon: string, message: string) {
  toastRef.value?.show({ content: message, icon })
}

function showPositionToast(position: "top" | "middle" | "bottom") {
  toastRef.value?.show({ content: `${position} 位置`, position })
}

function showDurationToast(duration: number) {
  toastRef.value?.show({ content: `${duration / 1000}秒后关闭`, duration })
}
</script>
