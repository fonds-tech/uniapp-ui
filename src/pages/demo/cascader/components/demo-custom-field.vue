<template>
  <demo-section title="自定义字段名">
    <demo-block direction="column" align="start" :gap="16">
      <text class="demo-text">通过 field-keys 自定义 text/value/children/disabled 字段名</text>
      <ui-cell title="选择分类" :value="areaText || '请选择'" is-link @click="show = true" />
    </demo-block>
  </demo-section>

  <ui-cascader
    v-model="value"
    v-model:show="show"
    title="请选择分类"
    :options="customFieldOptions"
    :field-keys="{ text: 'name', value: 'id', children: 'items' }"
    @close="show = false"
    @finish="onFinish"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"

type CustomFieldOption = Record<string, any>

interface FinishData {
  value: string | number
  selectedOptions: CustomFieldOption[]
}

const customFieldOptions: CustomFieldOption[] = [
  {
    name: "电子产品",
    id: "1",
    items: [
      {
        name: "手机",
        id: "1-1",
        items: [
          { name: "苹果", id: "1-1-1" },
          { name: "华为", id: "1-1-2" },
          { name: "小米", id: "1-1-3" },
        ],
      },
      {
        name: "电脑",
        id: "1-2",
        items: [
          { name: "笔记本", id: "1-2-1" },
          { name: "台式机", id: "1-2-2" },
        ],
      },
    ],
  },
  {
    name: "服装鞋帽",
    id: "2",
    items: [
      {
        name: "男装",
        id: "2-1",
        items: [
          { name: "上衣", id: "2-1-1" },
          { name: "裤子", id: "2-1-2" },
        ],
      },
      {
        name: "女装",
        id: "2-2",
        items: [
          { name: "连衣裙", id: "2-2-1" },
          { name: "外套", id: "2-2-2" },
        ],
      },
    ],
  },
]

const show = ref(false)
const value = ref("")
const areaText = ref("")

function onFinish(data: FinishData) {
  areaText.value = data.selectedOptions.map((item) => (item.name ?? item.text)).join("/")
  show.value = false
}
</script>
