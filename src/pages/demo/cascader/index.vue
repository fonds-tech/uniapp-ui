<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-cell title="选择地区" :value="areaText1 || '请选择'" is-link @click="show1 = true" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block>
        <ui-cell title="选择地区" :value="areaText2 || '请选择'" is-link @click="show2 = true" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项">
      <demo-block>
        <ui-cell title="选择地区" :value="areaText3 || '请选择'" is-link @click="show3 = true" />
      </demo-block>
    </demo-section>

    <ui-popup v-model:show="show1" mode="bottom" border-radius="24rpx 24rpx 0 0">
      <ui-cascader
        v-model="value1"
        title="请选择地区"
        :options="options"
        @close="show1 = false"
        @finish="onFinish1"
      />
    </ui-popup>

    <ui-popup v-model:show="show2" mode="bottom" border-radius="24rpx 24rpx 0 0">
      <ui-cascader
        v-model="value2"
        title="请选择地区"
        :options="options"
        active-color="#07c160"
        @close="show2 = false"
        @finish="onFinish2"
      />
    </ui-popup>

    <ui-popup v-model:show="show3" mode="bottom" border-radius="24rpx 24rpx 0 0">
      <ui-cascader
        v-model="value3"
        title="请选择地区"
        :options="optionsWithDisabled"
        @close="show3 = false"
        @finish="onFinish3"
      />
    </ui-popup>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Cascader 级联选择" },
})

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")

const areaText1 = ref("")
const areaText2 = ref("")
const areaText3 = ref("")

const options = [
  {
    text: "浙江省",
    value: "330000",
    children: [
      {
        text: "杭州市",
        value: "330100",
        children: [
          { text: "西湖区", value: "330106" },
          { text: "余杭区", value: "330110" },
          { text: "萧山区", value: "330109" },
        ],
      },
      {
        text: "宁波市",
        value: "330200",
        children: [
          { text: "海曙区", value: "330203" },
          { text: "江北区", value: "330205" },
          { text: "鄞州区", value: "330212" },
        ],
      },
    ],
  },
  {
    text: "江苏省",
    value: "320000",
    children: [
      {
        text: "南京市",
        value: "320100",
        children: [
          { text: "玄武区", value: "320102" },
          { text: "秦淮区", value: "320104" },
          { text: "建邺区", value: "320105" },
        ],
      },
      {
        text: "苏州市",
        value: "320500",
        children: [
          { text: "虎丘区", value: "320505" },
          { text: "吴中区", value: "320506" },
          { text: "相城区", value: "320507" },
        ],
      },
    ],
  },
]

const optionsWithDisabled = [
  {
    text: "浙江省",
    value: "330000",
    children: [
      {
        text: "杭州市",
        value: "330100",
        children: [
          { text: "西湖区", value: "330106" },
          { text: "余杭区", value: "330110", disabled: true },
          { text: "萧山区", value: "330109" },
        ],
      },
      {
        text: "宁波市",
        value: "330200",
        disabled: true,
        children: [],
      },
    ],
  },
  {
    text: "江苏省",
    value: "320000",
    children: [
      {
        text: "南京市",
        value: "320100",
        children: [
          { text: "玄武区", value: "320102" },
          { text: "秦淮区", value: "320104" },
        ],
      },
    ],
  },
]

interface FinishData {
  value: string | number
  selectedOptions: Array<{ text: string; value: string | number }>
}

function onFinish1(data: FinishData) {
  areaText1.value = data.selectedOptions.map((item) => item.text).join("/")
  show1.value = false
}

function onFinish2(data: FinishData) {
  areaText2.value = data.selectedOptions.map((item) => item.text).join("/")
  show2.value = false
}

function onFinish3(data: FinishData) {
  areaText3.value = data.selectedOptions.map((item) => item.text).join("/")
  show3.value = false
}
</script>
