<template>
  <demo-section title="禁用选项">
    <demo-block direction="column" align="start" :gap="16">
      <text class="demo-text">通过选项的 disabled 属性禁用该选项</text>
      <ui-cell title="选择地区" :value="areaText || '请选择'" is-link @click="show = true" />
    </demo-block>
  </demo-section>

  <ui-cascader v-model="value" v-model:show="show" title="请选择地区" :options="optionsWithDisabled" @close="show = false" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { CascaderOption } from "@/uni_modules/uniapp-ui/ui-cascader"
import { ref } from "vue"

interface FinishData {
  value: string | number
  selectedOptions: CascaderOption[]
}

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

const show = ref(false)
const value = ref("")
const areaText = ref("")

function onFinish(data: FinishData) {
  areaText.value = data.selectedOptions.map((item) => item.text).join("/")
  show.value = false
}
</script>
