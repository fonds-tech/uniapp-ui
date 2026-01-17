<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-cell-group>
          <ui-cell title="单元格" value="内容" />
          <ui-cell title="单元格" value="内容" />
          <ui-cell title="单元格" value="内容" />
        </ui-cell-group>
      </demo-block>
    </demo-section>

    <demo-section title="自定义圆角">
      <demo-block direction="column">
        <ui-cell-group :radius="16">
          <ui-cell title="圆角分组" value="radius=16" />
          <ui-cell title="单元格" value="内容" />
          <ui-cell title="单元格" value="内容" />
        </ui-cell-group>
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景色">
      <demo-block direction="column">
        <ui-cell-group background="#e8f4ff" :radius="12">
          <ui-cell title="浅蓝背景" value="内容" />
          <ui-cell title="单元格" value="内容" />
        </ui-cell-group>
        <view style="height: 16px" />
        <ui-cell-group background="#fff7e6" :radius="12">
          <ui-cell title="浅橙背景" value="内容" />
          <ui-cell title="单元格" value="内容" />
        </ui-cell-group>
      </demo-block>
    </demo-section>

    <demo-section title="嵌套使用">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-cell title="账户设置" is-link />
          <ui-cell title="消息通知" is-link />
          <ui-cell title="隐私设置" is-link />
        </ui-cell-group>
        <view style="height: 16px" />
        <ui-cell-group :radius="12">
          <ui-cell title="帮助中心" is-link />
          <ui-cell title="关于我们" is-link />
        </ui-cell-group>
      </demo-block>
    </demo-section>

    <demo-section title="与其他组件配合">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-cell title="开启通知">
            <template #right>
              <ui-switch v-model="switchValue" />
            </template>
          </ui-cell>
          <ui-cell title="音量">
            <template #right>
              <ui-stepper v-model="stepperValue" :min="0" :max="100" />
            </template>
          </ui-cell>
        </ui-cell-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "CellGroup 单元格分组" },
})

const switchValue = ref(true)
const stepperValue = ref(50)
</script>
