<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-checkbox v-model="checked" label="复选框" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-checkbox v-model="disabled1" disabled label="禁用状态" />
        <ui-checkbox :model-value="true" disabled label="禁用且选中" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义形状">
      <demo-block>
        <ui-checkbox v-model="shape1" shape="square" label="方形" />
        <ui-checkbox v-model="shape2" shape="round" label="圆形" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block>
        <ui-checkbox v-model="color1" checked-color="#ee0a24" label="红色" />
        <ui-checkbox v-model="color2" checked-color="#07c160" label="绿色" />
        <ui-checkbox v-model="color3" checked-color="#7232dd" label="紫色" />
      </demo-block>
    </demo-section>

    <demo-section title="复选框组">
      <demo-block direction="column">
        <ui-checkbox-group v-model="groupValue">
          <ui-checkbox name="a" label="选项 A" />
          <ui-checkbox name="b" label="选项 B" />
          <ui-checkbox name="c" label="选项 C" />
        </ui-checkbox-group>
        <text class="demo-text">当前选中: {{ groupValue.join(", ") || "无" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="限制最大可选数">
      <demo-block direction="column">
        <ui-checkbox-group v-model="maxValue" :max="2">
          <ui-checkbox name="a" label="选项 A" />
          <ui-checkbox name="b" label="选项 B" />
          <ui-checkbox name="c" label="选项 C" />
          <ui-checkbox name="d" label="选项 D" />
        </ui-checkbox-group>
        <text class="demo-text">最多选择 2 项</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Checkbox 复选框" },
})

const checked = ref(true)
const disabled1 = ref(false)
const shape1 = ref(true)
const shape2 = ref(true)
const color1 = ref(true)
const color2 = ref(true)
const color3 = ref(true)
const groupValue = ref(["a"])
const maxValue = ref(["a"])
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-top: 8rpx;
}
</style>
