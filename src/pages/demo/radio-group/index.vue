<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-radio-group v-model="value1" gap="12">
          <ui-radio name="a">选项 A</ui-radio>
          <ui-radio name="b">选项 B</ui-radio>
          <ui-radio name="c">选项 C</ui-radio>
        </ui-radio-group>
        <ui-text size="small" color="secondary">当前选中：{{ value1 || "无" }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="水平排列">
      <demo-block direction="column">
        <ui-radio-group v-model="value2" :gap="24">
          <ui-radio name="1">选项 1</ui-radio>
          <ui-radio name="2">选项 2</ui-radio>
          <ui-radio name="3">选项 3</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="垂直排列">
      <demo-block direction="column">
        <ui-radio-group v-model="value3" vertical :gap="16">
          <ui-radio name="small">小杯</ui-radio>
          <ui-radio name="medium">中杯</ui-radio>
          <ui-radio name="large">大杯</ui-radio>
          <ui-radio name="extra">超大杯</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column">
        <ui-radio-group v-model="value4" disabled :gap="16">
          <ui-radio name="a">选项 A</ui-radio>
          <ui-radio name="b">选项 B</ui-radio>
          <ui-radio name="c">选项 C</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column">
        <ui-radio-group v-model="value5" checked-color="#7232dd" :gap="16">
          <ui-radio name="1">紫色主题</ui-radio>
          <ui-radio name="2">选项二</ui-radio>
          <ui-radio name="3">选项三</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标大小">
      <demo-block direction="column">
        <ui-radio-group v-model="value6" icon-size="40rpx" :gap="16">
          <ui-radio name="a">大图标</ui-radio>
          <ui-radio name="b">选项 B</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="标签位置">
      <demo-block direction="column">
        <ui-radio-group v-model="value7" label-left :gap="16">
          <ui-radio name="1">标签在左侧</ui-radio>
          <ui-radio name="2">选项二</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="实际应用：支付方式">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-radio-group v-model="payMethod" vertical>
            <ui-cell title="微信支付" icon="wechat">
              <template #right>
                <ui-radio name="wechat" />
              </template>
            </ui-cell>
            <ui-cell title="支付宝" icon="alipay">
              <template #right>
                <ui-radio name="alipay" />
              </template>
            </ui-cell>
            <ui-cell title="银行卡" icon="bank-card">
              <template #right>
                <ui-radio name="bank" />
              </template>
            </ui-cell>
          </ui-radio-group>
        </ui-cell-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "RadioGroup 单选框组" },
})

const value1 = ref("a")
const value2 = ref("1")
const value3 = ref("medium")
const value4 = ref("a")
const value5 = ref("1")
const value6 = ref("a")
const value7 = ref("1")
const payMethod = ref("wechat")
</script>
