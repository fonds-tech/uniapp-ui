<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-button type="primary" @click="show1 = true">基础用法</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="展示取消按钮">
      <demo-block>
        <ui-button type="primary" @click="show2 = true">展示取消按钮</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="展示描述信息">
      <demo-block>
        <ui-button type="primary" @click="show3 = true">展示描述信息</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="选项状态">
      <demo-block>
        <ui-button type="primary" @click="show4 = true">选项状态</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义标题">
      <demo-block>
        <ui-button type="primary" @click="show5 = true">自定义标题</ui-button>
      </demo-block>
    </demo-section>

    <!-- ActionSheet Components -->
    <ui-action-sheet v-model:show="show1" :actions="actions1" @select="onSelect" />
    <ui-action-sheet v-model:show="show2" :actions="actions1" cancel-text="取消" @cancel="onCancel" />
    <ui-action-sheet v-model:show="show3" :actions="actions1" description="这是一段描述信息" cancel-text="取消" />
    <ui-action-sheet v-model:show="show4" :actions="actions2" cancel-text="取消" />
    <ui-action-sheet v-model:show="show5" :actions="actions1" title="标题" cancel-text="取消" />
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "ActionSheet 动作面板" },
})

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)

const actions1 = [{ title: "选项一" }, { title: "选项二" }, { title: "选项三" }]

const actions2 = [{ title: "着色选项", color: "#ee0a24" }, { title: "禁用选项", disabled: true }, { title: "加载选项", loading: true }]

function onSelect(action: { title: string }, index: number) {
  uni.showToast({ title: action.title, icon: "none" })
}

function onCancel() {
  uni.showToast({ title: "取消", icon: "none" })
}
</script>
