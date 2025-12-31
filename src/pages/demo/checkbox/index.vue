<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-checkbox v-model="checked" label="复选框" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="disabled1" disabled label="禁用状态" />
        <ui-checkbox :model-value="true" disabled label="禁用且选中" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义形状">
      <demo-block :cols="2" :gap="32">
        <ui-checkbox v-model="shape1" shape="square" label="方形" />
        <ui-checkbox v-model="shape2" shape="round" label="圆形" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="3" :gap="32">
        <ui-checkbox v-model="color1" checked-color="#ee0a24" label="红色" />
        <ui-checkbox v-model="color2" checked-color="#07c160" label="绿色" />
        <ui-checkbox v-model="color3" checked-color="#7232dd" label="紫色" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小">
      <demo-block :cols="3" :gap="32">
        <ui-checkbox v-model="size1" icon-size="32rpx" label="小" />
        <ui-checkbox v-model="size2" icon-size="40rpx" label="中" />
        <ui-checkbox v-model="size3" icon-size="48rpx" label="大" />
      </demo-block>
    </demo-section>

    <demo-section title="复选框组">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox-group v-model="groupValue">
          <demo-block :gap="32">
            <ui-checkbox name="a" label="选项 A" />
            <ui-checkbox name="b" label="选项 B" />
            <ui-checkbox name="c" label="选项 C" />
          </demo-block>
        </ui-checkbox-group>
        <text class="demo-text">当前选中: {{ groupValue.join(", ") || "无" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="限制最大可选数">
      <demo-block direction="column" align="start" :gap="24">
        <ui-checkbox-group v-model="maxValue" :max="2">
          <demo-block :gap="32">
            <ui-checkbox name="a" label="选项 A" />
            <ui-checkbox name="b" label="选项 B" />
            <ui-checkbox name="c" label="选项 C" />
            <ui-checkbox name="d" label="选项 D" />
          </demo-block>
        </ui-checkbox-group>
        <text class="demo-text">最多选择 2 项</text>
      </demo-block>
    </demo-section>

    <demo-section title="水平排列">
      <demo-block>
        <ui-checkbox-group v-model="horizontalValue" direction="horizontal">
          <ui-checkbox name="a" label="选项 A" />
          <ui-checkbox name="b" label="选项 B" />
          <ui-checkbox name="c" label="选项 C" />
        </ui-checkbox-group>
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
const size1 = ref(true)
const size2 = ref(true)
const size3 = ref(true)
const groupValue = ref(["a"])
const maxValue = ref(["a"])
const horizontalValue = ref(["a", "b"])
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
