<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-button type="primary" @click="showBasicDialog">提示弹窗</ui-button>
        <ui-button type="primary" @click="showConfirmDialog">确认弹窗</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="圆角按钮">
      <demo-block>
        <ui-button @click="showRoundDialog">圆角按钮</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="异步关闭">
      <demo-block>
        <ui-button @click="showAsyncDialog">异步关闭</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="组件调用">
      <demo-block>
        <ui-button type="primary" @click="showComponentDialog = true">组件方式</ui-button>
      </demo-block>
    </demo-section>

    <!-- Dialog Component -->
    <ui-dialog v-model:show="showComponentDialog" title="标题" message="这是通过组件方式调用的对话框" show-cancel-button />
  </demo-page>
</template>

<script setup lang="ts">
import { useDialog } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Dialog 对话框" },
})

const { showDialog } = useDialog()
const showComponentDialog = ref(false)

function showBasicDialog() {
  showDialog({
    title: "提示",
    message: "这是一个提示弹窗",
  })
}

function showConfirmDialog() {
  showDialog({
    title: "确认",
    message: "确定要执行此操作吗？",
    showCancelButton: true,
  })
}

function showRoundDialog() {
  showDialog({
    title: "提示",
    message: "这是圆角按钮弹窗",
    theme: "round-button",
  })
}

function showAsyncDialog() {
  showDialog({
    title: "异步关闭",
    message: "点击确认后延迟1秒关闭",
    showCancelButton: true,
    beforeClose: (action) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(action === "confirm")
        }, 1000)
      })
    },
  })
}
</script>
