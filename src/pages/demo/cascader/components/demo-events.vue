<template>
  <demo-section title="事件处理">
    <demo-block direction="column" align="start" :gap="16">
      <ui-cell title="选择地区" :value="areaText || '请选择'" is-link @click="show = true" />
      <text class="demo-text">{{ eventLog }}</text>
      <view class="event-list">
        <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
          <text class="event-text">{{ log }}</text>
        </view>
      </view>
    </demo-block>
  </demo-section>

  <ui-cascader
    v-model="value"
    v-model:show="show"
    title="请选择地区"
    :options="options"
    @close="onCascaderClose"
    @change="onCascaderChange"
    @finish="onCascaderFinish"
    @click-tab="onCascaderClickTab"
  />
</template>

<script setup lang="ts">
import type { CascaderOption } from "@/uni_modules/uniapp-ui/ui-cascader"
import { ref } from "vue"

interface FinishData {
  value: string | number
  selectedOptions: CascaderOption[]
}

interface ChangeData {
  value: string | number
  selectedOptions: CascaderOption[]
  index: number
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
const eventLog = ref("操作级联选择器查看事件")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
  eventLog.value = log
}

function onCascaderClose() {
  addEventLog("触发 close 事件")
  show.value = false
}

function onCascaderChange(data: ChangeData) {
  addEventLog(`触发 change 事件，索引: ${data.index}，值: ${data.value}`)
}

function onCascaderFinish(data: FinishData) {
  addEventLog(`触发 finish 事件，完成选择: ${data.selectedOptions.map((item) => item.text).join("/")}`)
  areaText.value = data.selectedOptions.map((item) => item.text).join("/")
  show.value = false
}

function onCascaderClickTab(data: { index: number }) {
  addEventLog(`触发 click-tab 事件，索引: ${data.index}`)
}
</script>
