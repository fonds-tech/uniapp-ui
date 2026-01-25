<template>
  <demo-section title="双向绑定">
    <demo-block direction="column" align="start" :gap="16">
      <text class="demo-text">当前值: {{ value || "未选择" }}</text>
      <demo-block :gap="16">
        <ui-button size="small" @click="value = '330106'">设为西湖区</ui-button>
        <ui-button size="small" @click="value = '320102'">设为玄武区</ui-button>
        <ui-button size="small" @click="value = ''">清空</ui-button>
      </demo-block>
    </demo-block>
    <ui-cell padding="0" title="选择地区" :value="areaText || '请选择'" @click="show = true" />
  </demo-section>

  <ui-cascader v-model="value" v-model:show="show" title="请选择地区" :options="options" @close="show = false" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { CascaderOption } from "@/uni_modules/uniapp-ui/ui-cascader"
import { ref, watch } from "vue"

defineOptions({ name: "demo-two-way" })

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

// 根据已选值回溯文本路径，保证按钮赋值时展示同步
function getAreaTextByValue(options: CascaderOption[], target: string | number): string {
  for (const option of options) {
    if (option.value === target) {
      return option.text
    }
    if (option.children?.length) {
      const childText = getAreaTextByValue(option.children, target)
      if (childText) {
        return `${option.text}/${childText}`
      }
    }
  }
  return ""
}

function syncAreaText(currentValue: string | number) {
  if (!currentValue) {
    areaText.value = ""
    return
  }
  areaText.value = getAreaTextByValue(options, currentValue)
}

watch(value, (currentValue) => {
  syncAreaText(currentValue)
}, { immediate: true })

function onFinish(data: FinishData) {
  areaText.value = data.selectedOptions.map((item) => item.text).join("/")
  show.value = false
}
</script>
