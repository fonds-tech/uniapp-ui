<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value1">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">当前选中：{{ value1.join(", ") || "无" }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="水平排列">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value2" :gap="24">
          <ui-checkbox name="1">苹果</ui-checkbox>
          <ui-checkbox name="2">香蕉</ui-checkbox>
          <ui-checkbox name="3">橙子</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="垂直排列">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value3" vertical :gap="16">
          <ui-checkbox name="a">选项一</ui-checkbox>
          <ui-checkbox name="b">选项二</ui-checkbox>
          <ui-checkbox name="c">选项三</ui-checkbox>
          <ui-checkbox name="d">选项四</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="限制最大可选数">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value4" :max="2" :gap="16">
          <ui-checkbox name="1">选项 1</ui-checkbox>
          <ui-checkbox name="2">选项 2</ui-checkbox>
          <ui-checkbox name="3">选项 3</ui-checkbox>
          <ui-checkbox name="4">选项 4</ui-checkbox>
        </ui-checkbox-group>
        <ui-text size="small" color="secondary">最多选择 2 项</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value5" disabled :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
          <ui-checkbox name="c">选项 C</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value6" checked-color="#07c160" :gap="16">
          <ui-checkbox name="1">绿色主题</ui-checkbox>
          <ui-checkbox name="2">选项二</ui-checkbox>
          <ui-checkbox name="3">选项三</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="自定义形状">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">圆形（默认）</ui-text>
        <ui-checkbox-group v-model="value7" round :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
        </ui-checkbox-group>
        <view style="height: 16px" />
        <ui-text size="small" color="secondary">方形</ui-text>
        <ui-checkbox-group v-model="value8" :round="false" :gap="16">
          <ui-checkbox name="a">选项 A</ui-checkbox>
          <ui-checkbox name="b">选项 B</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>

    <demo-section title="标签位置">
      <demo-block direction="column">
        <ui-checkbox-group v-model="value9" label-left :gap="16">
          <ui-checkbox name="1">标签在左侧</ui-checkbox>
          <ui-checkbox name="2">选项二</ui-checkbox>
        </ui-checkbox-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "CheckboxGroup 复选框组" },
})

const value1 = ref(["a"])
const value2 = ref(["1", "2"])
const value3 = ref(["a", "c"])
const value4 = ref(["1"])
const value5 = ref(["a", "b"])
const value6 = ref(["1"])
const value7 = ref(["a"])
const value8 = ref(["a"])
const value9 = ref(["1"])
</script>
