<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-cascader-panel v-model="value1" :options="options" height="600rpx" @finish="onFinish1" />
        <text class="demo-text">当前值: {{ result1 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义字段">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-cascader-panel v-model="value2" :options="customOptions" height="600rpx" :field-keys="{ text: 'label', value: 'id' }" @finish="onFinish2" />
        <text class="demo-text">当前值: {{ result2 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-cascader-panel v-model="value3" :options="disabledOptions" height="500rpx" @finish="onFinish3" />
        <text class="demo-text">当前值: {{ result3 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-cascader-panel v-model="value4" :options="options" height="500rpx" color="#646566" active-color="#ee0a24" @finish="onFinish4" />
        <text class="demo-text">当前值: {{ result4 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="不显示头部">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-cascader-panel v-model="value5" :options="options" height="500rpx" :show-header="false" @finish="onFinish5" />
        <text class="demo-text">当前值: {{ result5 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="关闭手势切换">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-cascader-panel v-model="value6" :options="options" height="500rpx" :swipeable="false" @finish="onFinish6" />
        <text class="demo-text">仅可点击 tab 切换</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义关闭按钮">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-cascader-panel v-model="value7" :options="options" height="500rpx" closeable close-icon="close" @close="onClose" @finish="onFinish7" />
        <text class="demo-text">关闭次数: {{ closeCount }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="异步切换（beforeChange）">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-cascader-panel v-model="value8" :options="options" height="500rpx" :before-change="beforeChange" @finish="onFinish8" />
        <text class="demo-text">点击省份会有 800ms 延迟（loading）</text>
      </demo-block>
    </demo-section>

    <demo-section title="多级嵌套（4 层）">
      <demo-block direction="column" align="stretch" :gap="16">
        <ui-cascader-panel v-model="value9" :options="deepOptions" height="600rpx" @finish="onFinish9" />
        <text class="demo-text">当前值: {{ result9 || "未选择" }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { CascaderPanelChangeData } from "@/uni_modules/uniapp-ui/ui-cascader-panel"
import { ref } from "vue"

const value1 = ref<string | number>("")
const value2 = ref<string | number>("")
const value3 = ref<string | number>("")
const value4 = ref<string | number>("")
const value5 = ref<string | number>("")
const value6 = ref<string | number>("")
const value7 = ref<string | number>("")
const value8 = ref<string | number>("")
const value9 = ref<string | number>("")

const result1 = ref("")
const result2 = ref("")
const result3 = ref("")
const result4 = ref("")
const result5 = ref("")
const result6 = ref("")
const result7 = ref("")
const result8 = ref("")
const result9 = ref("")
const closeCount = ref(0)

const options = [
  {
    text: "浙江省",
    value: "zhejiang",
    children: [
      { text: "杭州市", value: "hangzhou" },
      { text: "宁波市", value: "ningbo" },
      { text: "温州市", value: "wenzhou" },
    ],
  },
  {
    text: "江苏省",
    value: "jiangsu",
    children: [
      { text: "南京市", value: "nanjing" },
      { text: "苏州市", value: "suzhou" },
    ],
  },
  {
    text: "广东省",
    value: "guangdong",
    children: [
      { text: "广州市", value: "guangzhou" },
      { text: "深圳市", value: "shenzhen" },
      { text: "珠海市", value: "zhuhai" },
    ],
  },
]

const customOptions = [
  {
    label: "技术",
    id: "tech",
    children: [
      { label: "前端", id: "fe" },
      { label: "后端", id: "be" },
    ],
  },
  { label: "设计", id: "design", children: [{ label: "UI", id: "ui" }] },
]

const disabledOptions = [
  { text: "可选项", value: "a" },
  { text: "禁用项", value: "b", disabled: true },
  { text: "可选项2", value: "c" },
]

const deepOptions = [
  {
    text: "中国",
    value: "cn",
    children: [
      {
        text: "浙江省",
        value: "zj",
        children: [
          { text: "杭州市", value: "hz", children: [{ text: "西湖区", value: "xh" }] },
          { text: "宁波市", value: "nb", children: [{ text: "鄞州区", value: "yz" }] },
        ],
      },
      {
        text: "江苏省",
        value: "js",
        children: [{ text: "南京市", value: "nj", children: [{ text: "鼓楼区", value: "gl" }] }],
      },
    ],
  },
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
function onFinish4(data: CascaderPanelChangeData) {
  result4.value = data.selectedOptions.map((o) => o.text).join(" / ")
}
function onFinish5(data: CascaderPanelChangeData) {
  result5.value = data.selectedOptions.map((o) => o.text).join(" / ")
}
function onFinish6(data: CascaderPanelChangeData) {
  result6.value = data.selectedOptions.map((o) => o.text).join(" / ")
}
function onFinish7(data: CascaderPanelChangeData) {
  result7.value = data.selectedOptions.map((o) => o.text).join(" / ")
}
function onFinish8(data: CascaderPanelChangeData) {
  result8.value = data.selectedOptions.map((o) => o.text).join(" / ")
}
function onFinish9(data: CascaderPanelChangeData) {
  result9.value = data.selectedOptions.map((o) => o.text).join(" / ")
}

function onClose() {
  closeCount.value++
}

// 模拟首层 800ms 异步加载，叶子直接通过
function beforeChange({ index }: { index: number }) {
  return new Promise<boolean>((resolve) => {
    if (index === 0) setTimeout(() => resolve(true), 800)
    else resolve(true)
  })
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}
</style>
