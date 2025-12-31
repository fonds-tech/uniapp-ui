<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="2" :gap="24">
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

    <demo-section title="自定义内容">
      <demo-block :cols="2" :gap="24">
        <ui-button type="primary" @click="showNoTitleDialog">无标题</ui-button>
        <ui-button type="primary" @click="showLongDialog">长内容</ui-button>
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

function showNoTitleDialog() {
  showDialog({
    message: "这是一个没有标题的弹窗",
  })
}

function showLongDialog() {
  showDialog({
    title: "长内容",
    message: "这是一段很长的内容，用于测试对话框对长文本的显示效果。当内容过长时，对话框应该能够正确处理滚动或自适应高度。这里是更多的文字内容，让我们看看效果如何。",
    showCancelButton: true,
  })
}
</script>
