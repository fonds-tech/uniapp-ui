<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="value1" :columns="columns1" @change="onChange" />
        </view>
        <ui-text size="small" color="secondary">当前选中：{{ value1.join(", ") }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="多列选择">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="value2" :columns="columns2" />
        </view>
        <ui-text size="small" color="secondary">选中：{{ value2.join(" - ") }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="级联选择">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="value3" :columns="cascadeColumns" />
        </view>
        <ui-text size="small" color="secondary">选中：{{ value3.join(" / ") }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义选项高度">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">column-height: 60rpx（较小）</ui-text>
        <view class="picker-panel-demo-small">
          <ui-picker-panel v-model="value4a" :columns="columns1" column-height="60rpx" :visible-column-num="5" />
        </view>
      </demo-block>
      <demo-block direction="column">
        <ui-text size="small" color="secondary">column-height: 100rpx（较大）</ui-text>
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="value4b" :columns="columns1" column-height="100rpx" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="可见选项数量">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">visible-column-num: 3</ui-text>
        <view class="picker-panel-demo-small">
          <ui-picker-panel v-model="value5a" :columns="columns1" :visible-column-num="3" />
        </view>
      </demo-block>
      <demo-block direction="column">
        <ui-text size="small" color="secondary">visible-column-num: 7</ui-text>
        <view class="picker-panel-demo-large">
          <ui-picker-panel v-model="value5b" :columns="columns1" :visible-column-num="7" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义字段名">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">使用 id 和 name 作为字段</ui-text>
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="value6" :columns="customColumns" :column-fields="{ text: 'name', value: 'id' }" />
        </view>
        <ui-text size="small" color="secondary">选中 ID：{{ value6.join(", ") }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义文字样式">
      <demo-block direction="column">
        <ui-text size="small" color="secondary">自定义颜色和大小</ui-text>
        <view class="picker-panel-demo">
          <ui-picker-panel
            v-model="value7a"
            :columns="columns1"
            column-size="26rpx"
            column-color="#999"
            active-column-size="32rpx"
            active-column-color="#1989fa"
            active-column-weight="600"
          />
        </view>
      </demo-block>
      <demo-block direction="column">
        <ui-text size="small" color="secondary">自定义字重</ui-text>
        <view class="picker-panel-demo">
          <ui-picker-panel
            v-model="value7b"
            :columns="columns1"
            column-weight="300"
            column-color="#666"
            active-column-weight="700"
            active-column-color="#ee0a24"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="value8" :columns="columns1" loading />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="时间选择器">
      <demo-block direction="column">
        <view class="picker-panel-demo">
          <ui-picker-panel v-model="timeValue" :columns="timeColumns" />
        </view>
        <ui-text size="small" color="secondary">选中时间：{{ timeValue.join(":") }}</ui-text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "PickerPanel 选择器面板" },
})

const value1 = ref(["hangzhou"])
const value2 = ref(["2024", "06", "15"])
const value3 = ref(["zhejiang", "hangzhou", "xihu"])
const value4a = ref(["beijing"])
const value4b = ref(["shanghai"])
const value5a = ref(["hangzhou"])
const value5b = ref(["shenzhen"])
const value6 = ref(["1"])
const value7a = ref(["hangzhou"])
const value7b = ref(["guangzhou"])
const value8 = ref(["hangzhou"])
const timeValue = ref(["12", "30"])

// 单列数据
const columns1 = [
  [
    { text: "北京", value: "beijing" },
    { text: "上海", value: "shanghai" },
    { text: "杭州", value: "hangzhou" },
    { text: "深圳", value: "shenzhen" },
    { text: "广州", value: "guangzhou" },
    { text: "成都", value: "chengdu" },
    { text: "武汉", value: "wuhan" },
  ],
]

// 多列数据 - 日期选择
const columns2 = [
  [
    { text: "2023", value: "2023" },
    { text: "2024", value: "2024" },
    { text: "2025", value: "2025" },
  ],
  Array.from({ length: 12 }, (_, i) => ({
    text: String(i + 1).padStart(2, "0"),
    value: String(i + 1).padStart(2, "0"),
  })),
  Array.from({ length: 31 }, (_, i) => ({
    text: String(i + 1).padStart(2, "0"),
    value: String(i + 1).padStart(2, "0"),
  })),
]

// 时间选择数据
const timeColumns = [
  Array.from({ length: 24 }, (_, i) => ({
    text: String(i).padStart(2, "0"),
    value: String(i).padStart(2, "0"),
  })),
  Array.from({ length: 60 }, (_, i) => ({
    text: String(i).padStart(2, "0"),
    value: String(i).padStart(2, "0"),
  })),
]

// 级联数据
const cascadeColumns = [
  {
    text: "浙江",
    value: "zhejiang",
    children: [
      {
        text: "杭州",
        value: "hangzhou",
        children: [
          { text: "西湖区", value: "xihu" },
          { text: "余杭区", value: "yuhang" },
          { text: "萧山区", value: "xiaoshan" },
        ],
      },
      {
        text: "宁波",
        value: "ningbo",
        children: [
          { text: "海曙区", value: "haishu" },
          { text: "江北区", value: "jiangbei" },
        ],
      },
    ],
  },
  {
    text: "江苏",
    value: "jiangsu",
    children: [
      {
        text: "南京",
        value: "nanjing",
        children: [
          { text: "玄武区", value: "xuanwu" },
          { text: "秦淮区", value: "qinhuai" },
        ],
      },
      {
        text: "苏州",
        value: "suzhou",
        children: [
          { text: "姑苏区", value: "gusu" },
          { text: "工业园区", value: "gongyeyuan" },
        ],
      },
    ],
  },
  {
    text: "广东",
    value: "guangdong",
    children: [
      {
        text: "广州",
        value: "guangzhou",
        children: [
          { text: "天河区", value: "tianhe" },
          { text: "越秀区", value: "yuexiu" },
        ],
      },
      {
        text: "深圳",
        value: "shenzhen",
        children: [
          { text: "南山区", value: "nanshan" },
          { text: "福田区", value: "futian" },
        ],
      },
    ],
  },
]

// 自定义字段名
const customColumns = [
  [
    { id: "1", name: "选项一" },
    { id: "2", name: "选项二" },
    { id: "3", name: "选项三" },
    { id: "4", name: "选项四" },
    { id: "5", name: "选项五" },
  ],
]

function onChange(data: any) {
  console.log("change", data)
}
</script>

<style scoped lang="scss">
.picker-panel-demo {
  width: 100%;
  border: 1px solid #eee;
  height: 400rpx;
  overflow: hidden;
  border-radius: 12px;
}

.picker-panel-demo-small {
  width: 100%;
  border: 1px solid #eee;
  height: 280rpx;
  overflow: hidden;
  border-radius: 12px;
}

.picker-panel-demo-large {
  width: 100%;
  border: 1px solid #eee;
  height: 520rpx;
  overflow: hidden;
  border-radius: 12px;
}
</style>
