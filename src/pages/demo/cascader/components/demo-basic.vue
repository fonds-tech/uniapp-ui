<template>
  <demo-section title="基础用法">
    <demo-block>
      <ui-cell title="选择地区" :value="areaText || '请选择'" is-link @click="show = true" />
    </demo-block>
  </demo-section>

  <ui-cascader v-model="value" v-model:show="show" title="请选择地区" :options="options" @close="show = false" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { CascaderOption } from "@/uni_modules/uniapp-ui/ui-cascader"
import { ref } from "vue"

interface FinishData {
  value: string | number
  selectedOptions: CascaderOption[]
}

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
      {
        text: "温州市",
        value: "330300",
        children: [
          { text: "鹿城区", value: "330302" },
          { text: "龙湾区", value: "330303" },
          { text: "瓯海区", value: "330304" },
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
  {
    text: "广东省",
    value: "440000",
    children: [
      {
        text: "广州市",
        value: "440100",
        children: [
          { text: "天河区", value: "440106" },
          { text: "越秀区", value: "440104" },
          { text: "海珠区", value: "440105" },
        ],
      },
      {
        text: "深圳市",
        value: "440300",
        children: [
          { text: "福田区", value: "440304" },
          { text: "南山区", value: "440305" },
          { text: "宝安区", value: "440306" },
        ],
      },
    ],
  },
]

const show = ref(false)
const value = ref("")
const areaText = ref("")

function onFinish(data: FinishData) {
  areaText.value = data.selectedOptions.map((item) => item.text).join("/")
  show.value = false
}
</script>
