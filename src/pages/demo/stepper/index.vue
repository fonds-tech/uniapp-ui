<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-stepper v-model="value1" />
      </demo-block>
    </demo-section>

    <demo-section title="步长设置">
      <demo-block>
        <ui-stepper v-model="value2" :step="2" />
      </demo-block>
    </demo-section>

    <demo-section title="限制范围">
      <demo-block>
        <ui-stepper v-model="value3" :min="5" :max="10" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-stepper v-model="value4" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="禁用输入">
      <demo-block>
        <ui-stepper v-model="value5" disabled-input />
      </demo-block>
    </demo-section>

    <demo-section title="小数位数">
      <demo-block>
        <ui-stepper v-model="value6" :step="0.1" :decimal-length="1" />
      </demo-block>
    </demo-section>

    <demo-section title="圆角风格">
      <demo-block>
        <ui-stepper v-model="value7" theme="round" />
      </demo-block>
    </demo-section>

    <demo-section title="长按快速加减">
      <demo-block>
        <ui-stepper v-model="value8" long-press />
      </demo-block>
    </demo-section>

    <demo-section title="自定义尺寸">
      <demo-block>
        <ui-stepper v-model="value9" height="64rpx" input-width="80rpx" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Stepper 步进器" },
})

const value1 = ref(1)
const value2 = ref(0)
const value3 = ref(5)
const value4 = ref(1)
const value5 = ref(1)
const value6 = ref(0.5)
const value7 = ref(1)
const value8 = ref(1)
const value9 = ref(1)
</script>
