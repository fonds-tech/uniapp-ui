<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-cell title="选择城市" :value="city1 || '请选择'" is-link @click="show1 = true" />
        <ui-picker v-model="city1" v-model:show="show1" title="选择城市" :columns="cities" />
      </demo-block>
    </demo-section>

    <demo-section title="多列选择">
      <demo-block>
        <ui-cell title="选择时间" :value="timeText" is-link @click="show2 = true" />
        <ui-picker v-model="time" v-model:show="show2" title="选择时间" :columns="timeColumns" />
      </demo-block>
    </demo-section>

    <demo-section title="级联选择">
      <demo-block>
        <ui-cell title="选择地区" :value="areaText" is-link @click="show3 = true" />
        <ui-picker v-model="area" v-model:show="show3" title="选择地区" :columns="areaColumns" />
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block>
        <ui-cell title="加载中" value="请选择" is-link @click="show4 = true" />
        <ui-picker v-model:show="show4" title="加载中" :columns="[]" loading />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Picker 选择器" },
})

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)

const city1 = ref("")
const time = ref<string[]>([])
const area = ref<string[]>([])

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

const timeText = computed(() => {
  if (time.value.length === 2) {
    const period = time.value[0] === "am" ? "上午" : "下午"
    return `${period} ${time.value[1]}:00`
  }
  return "请选择"
})

const areaText = computed(() => {
  return area.value.length > 0 ? area.value.join(" / ") : "请选择"
})
</script>
