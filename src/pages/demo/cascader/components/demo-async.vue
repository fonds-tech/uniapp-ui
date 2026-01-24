<template>
  <demo-section title="异步选项加载">
    <demo-block direction="column" align="start" :gap="16">
      <text class="demo-text">通过 beforeChange 拦截选项变化，实现异步加载</text>
    </demo-block>
    <ui-cell padding="0" title="选择地区" :value="areaText || '请选择'" @click="show = true" />
  </demo-section>

  <ui-cascader v-model="value" v-model:show="show" title="请选择地区" :options="asyncOptions" :before-change="onBeforeChange" @close="show = false" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { CascaderOption } from "@/uni_modules/uniapp-ui/ui-cascader"
import { ref } from "vue"

interface FinishData {
  value: string | number
  selectedOptions: CascaderOption[]
}

const asyncOptions = ref([
  {
    text: "浙江省",
    value: "330000",
    children: [],
  },
  {
    text: "江苏省",
    value: "320000",
    children: [],
  },
])

const show = ref(false)
const value = ref("")
const areaText = ref("")

function onFinish(data: FinishData) {
  areaText.value = data.selectedOptions.map((item) => item.text).join("/")
  show.value = false
}

async function onBeforeChange(value: string | number): Promise<boolean> {
  // 模拟异步加载
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 动态加载子选项
  if (value == "330000") {
    asyncOptions.value[0].children = [
      { text: "杭州市", value: "330100", children: [{ text: "西湖区", value: "330106" }] },
      { text: "宁波市", value: "330200", children: [{ text: "海曙区", value: "330203" }] },
    ]
  } else if (value == "320000") {
    asyncOptions.value[1].children = [
      { text: "南京市", value: "320100", children: [{ text: "玄武区", value: "320102" }] },
      { text: "苏州市", value: "320500", children: [{ text: "虎丘区", value: "320505" }] },
    ]
  }

  return true
}
</script>
