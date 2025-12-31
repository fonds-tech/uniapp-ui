<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-button type="primary" @click="showToast('文字提示')">文字提示</ui-button>
        <ui-button type="success" @click="showSuccessToast">成功提示</ui-button>
        <ui-button type="warning" @click="showFailToast">失败提示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="加载提示">
      <demo-block>
        <ui-button @click="showLoadingToast">加载提示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标">
      <demo-block>
        <ui-button @click="showIconToast('star', '收藏成功')">自定义图标</ui-button>
        <ui-button @click="showIconToast('heart', '已喜欢')">心形图标</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义位置">
      <demo-block>
        <ui-button @click="showPositionToast('top')">顶部展示</ui-button>
        <ui-button @click="showPositionToast('center')">居中展示</ui-button>
        <ui-button @click="showPositionToast('bottom')">底部展示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义时长">
      <demo-block>
        <ui-button @click="showDurationToast(1000)">1秒后关闭</ui-button>
        <ui-button @click="showDurationToast(3000)">3秒后关闭</ui-button>
        <ui-button @click="showDurationToast(5000)">5秒后关闭</ui-button>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Toast 轻提示" },
})

const { showToast } = useToast()

function showSuccessToast() {
  showToast({ message: "操作成功", type: "success" })
}

function showFailToast() {
  showToast({ message: "操作失败", type: "fail" })
}

function showLoadingToast() {
  showToast({ message: "加载中...", type: "loading", duration: 2000 })
}

function showIconToast(icon: string, message: string) {
  showToast({ message, icon })
}

function showPositionToast(position: string) {
  showToast({ message: `${position} 位置`, position })
}

function showDurationToast(duration: number) {
  showToast({ message: `${duration / 1000}秒后关闭`, duration })
}
</script>
