<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-button type="primary" @click="show1 = true">基础用法</ui-button>
      </view>
    </view>

    <!-- 展示取消按钮 -->
    <view class="demo-section">
      <text class="section-title">展示取消按钮</text>
      <view class="demo-block">
        <ui-button type="primary" @click="show2 = true">展示取消按钮</ui-button>
      </view>
    </view>

    <!-- 展示描述信息 -->
    <view class="demo-section">
      <text class="section-title">展示描述信息</text>
      <view class="demo-block">
        <ui-button type="primary" @click="show3 = true">展示描述信息</ui-button>
      </view>
    </view>

    <!-- 选项状态 -->
    <view class="demo-section">
      <text class="section-title">选项状态</text>
      <view class="demo-block">
        <ui-button type="primary" @click="show4 = true">选项状态</ui-button>
      </view>
    </view>

    <!-- 自定义标题 -->
    <view class="demo-section">
      <text class="section-title">自定义标题</text>
      <view class="demo-block">
        <ui-button type="primary" @click="show5 = true">自定义标题</ui-button>
      </view>
    </view>

    <!-- 动作面板 -->
    <ui-action-sheet v-model:show="show1" :actions="actions1" @select="onSelect" />

    <ui-action-sheet v-model:show="show2" :actions="actions1" cancel-text="取消" @cancel="onCancel" />

    <ui-action-sheet v-model:show="show3" :actions="actions1" description="这是一段描述信息" cancel-text="取消" />

    <ui-action-sheet v-model:show="show4" :actions="actions2" cancel-text="取消" />

    <ui-action-sheet v-model:show="show5" :actions="actions1" title="标题" cancel-text="取消" />
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "ActionSheet 动作面板" },
})

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)

const actions1 = [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }]

const actions2 = [{ name: "着色选项", color: "#ee0a24" }, { name: "禁用选项", disabled: true }, { name: "加载选项", loading: true }]

function onSelect(action: any, index: number) {
  uni.showToast({ title: action.name, icon: "none" })
}

function onCancel() {
  uni.showToast({ title: "取消", icon: "none" })
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
