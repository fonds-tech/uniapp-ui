<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-cascader-panel v-model="value1" :options="options" @finish="onFinish1" />
        </view>
        <text class="demo-text">当前值: {{ result1 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义字段">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-cascader-panel v-model="value2" :options="customOptions" :field-keys="{ text: 'label', value: 'id' }" @finish="onFinish2" />
        </view>
        <text class="demo-text">当前值: {{ result2 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-cascader-panel v-model="value3" :options="disabledOptions" @finish="onFinish3" />
        </view>
        <text class="demo-text">当前值: {{ result3 || "未选择" }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { CascaderPanelChangeData } from "@/uni_modules/uniapp-ui/ui-cascader-panel"

const value1 = ref<string | number>("")
const value2 = ref<string | number>("")
const value3 = ref<string | number>("")
const result1 = ref("")
const result2 = ref("")
const result3 = ref("")

const options = [
  {
    text: "浙江省",
    value: "zhejiang",
    children: [
      { text: "杭州市", value: "hangzhou" },
      { text: "宁波市", value: "ningbo" },
    ],
  },
  {
    text: "江苏省",
    value: "jiangsu",
    children: [{ text: "南京市", value: "nanjing" }],
  },
]

const customOptions = [
  { label: "技术", id: "tech", children: [{ label: "前端", id: "fe" }, { label: "后端", id: "be" }] },
  { label: "设计", id: "design", children: [{ label: "UI", id: "ui" }] },
]

const disabledOptions = [
  { text: "可选项", value: "a" },
  { text: "禁用项", value: "b", disabled: true },
]

function onFinish1(data: CascaderPanelChangeData) {
  result1.value = data.selectedOptions.map((o) => o.text).join(" / ")
}
function onFinish2(data: CascaderPanelChangeData) {
  result2.value = data.selectedOptions.map((o: any) => o.label).join(" / ")
}
function onFinish3(data: CascaderPanelChangeData) {
  result3.value = data.text
}
</script>

<style lang="scss" scoped>
.panel-box {
  height: 600rpx;
  border-radius: 16rpx;
  background-color: var(--ui-color-background);
  overflow: hidden;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
