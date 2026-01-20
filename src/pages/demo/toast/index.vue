<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="3" :gap="24">
        <ui-button type="primary" @click="toastRef?.text('文字提示')">文字提示</ui-button>
        <ui-button type="success" @click="toastRef?.success('操作成功')">成功提示</ui-button>
        <ui-button type="danger" @click="toastRef?.fail('操作失败')">失败提示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="加载提示">
      <demo-block>
        <ui-button @click="showLoadingToast">加载提示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标">
      <demo-block :cols="2" :gap="24">
        <ui-button @click="toastRef?.show({ content: '收藏成功', icon: 'star' })">星星图标</ui-button>
        <ui-button @click="toastRef?.show({ content: '已喜欢', icon: 'heart' })">心形图标</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义位置">
      <demo-block :cols="3" :gap="24">
        <ui-button @click="toastRef?.show({ content: 'top 位置', position: 'top' })">顶部展示</ui-button>
        <ui-button @click="toastRef?.show({ content: 'middle 位置', position: 'middle' })">居中展示</ui-button>
        <ui-button @click="toastRef?.show({ content: 'bottom 位置', position: 'bottom' })">底部展示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义时长">
      <demo-block :cols="3" :gap="24">
        <ui-button @click="toastRef?.show({ content: '1秒后关闭', duration: 1000 })">1 秒</ui-button>
        <ui-button @click="toastRef?.show({ content: '3秒后关闭', duration: 3000 })">3 秒</ui-button>
        <ui-button @click="toastRef?.show({ content: '5秒后关闭', duration: 5000 })">5 秒</ui-button>
      </demo-block>
    </demo-section>

    <ui-toast ref="toastRef" />
  </demo-page>
</template>

<script setup lang="ts">
import type { ToastInstance } from "@/uni_modules/uniapp-ui"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Toast 轻提示" },
})

const toastRef = ref<ToastInstance>()

function showLoadingToast() {
  toastRef.value?.loading("加载中...")
  setTimeout(() => toastRef.value?.hide(), 2000)
}
</script>
