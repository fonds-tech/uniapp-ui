<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-select v-model="value1" :columns="cities" placeholder="请选择城市" />
      </demo-block>
    </demo-section>

    <demo-section title="多列选择">
      <demo-block>
        <ui-select v-model="value2" :columns="timeColumns" placeholder="请选择时间" />
      </demo-block>
    </demo-section>

    <demo-section title="级联选择">
      <demo-block>
        <ui-select v-model="value3" :columns="areaColumns" placeholder="请选择地区" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-select v-model="value4" :columns="cities" placeholder="禁用状态" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="只读状态">
      <demo-block>
        <ui-select v-model="value5" :columns="cities" placeholder="只读状态" readonly />
      </demo-block>
    </demo-section>

    <demo-section title="自定义分隔符">
      <demo-block>
        <ui-select v-model="value6" :columns="areaColumns" placeholder="请选择" display-separator=" - " />
      </demo-block>
    </demo-section>

    <demo-section title="带标题">
      <demo-block>
        <ui-select v-model="value7" :columns="cities" placeholder="请选择城市" title="选择城市" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Select 选择器" },
})

const value1 = ref("")
const value2 = ref<string[]>([])
const value3 = ref<string[]>([])
const value4 = ref("")
const value5 = ref("beijing")
const value6 = ref<string[]>([])
const value7 = ref("")

const cities = [
  { text: "北京", value: "beijing" },
  { text: "上海", value: "shanghai" },
  { text: "广州", value: "guangzhou" },
  { text: "深圳", value: "shenzhen" },
  { text: "杭州", value: "hangzhou" },
]

const timeColumns = [
  [
    { text: "上午", value: "am" },
    { text: "下午", value: "pm" },
  ],
  [
    { text: "9:00", value: "9" },
    { text: "10:00", value: "10" },
    { text: "11:00", value: "11" },
    { text: "12:00", value: "12" },
  ],
]

const areaColumns = [
  {
    text: "浙江",
    value: "zhejiang",
    children: [
      { text: "杭州", value: "hangzhou" },
      { text: "宁波", value: "ningbo" },
      { text: "温州", value: "wenzhou" },
    ],
  },
  {
    text: "江苏",
    value: "jiangsu",
    children: [
      { text: "南京", value: "nanjing" },
      { text: "苏州", value: "suzhou" },
      { text: "无锡", value: "wuxi" },
    ],
  },
]
</script>
