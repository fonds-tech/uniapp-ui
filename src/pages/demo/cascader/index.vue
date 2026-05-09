<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-cell padding="0" title="选择地区" :value="value1Text || '请选择'" @click="show1 = true" />
      <ui-cascader v-model="value1" v-model:show="show1" title="请选择地区" :options="areaOptions" @finish="onFinish1" />
    </demo-section>

    <demo-section title="双向绑定">
      <ui-cell padding="0" title="当前值" :value="String(value2 || '未选择')" @click="show2 = true" />
      <text class="demo-text">v-model 同步选中 value：{{ value2 || "无" }}</text>
      <ui-cascader v-model="value2" v-model:show="show2" title="选择城市" :options="areaOptions" />
    </demo-section>

    <demo-section title="自定义字段">
      <ui-cell padding="0" title="选择分类" :value="value3Text || '请选择'" @click="show3 = true" />
      <ui-cascader v-model="value3" v-model:show="show3" title="选择分类" :options="customFieldOptions" :field-keys="{ text: 'label', value: 'id' }" @finish="onFinish3" />
    </demo-section>

    <demo-section title="禁用选项">
      <ui-cell padding="0" title="含禁用项" :value="value4Text || '请选择'" @click="show4 = true" />
      <ui-cascader v-model="value4" v-model:show="show4" title="含禁用项" :options="disabledOptions" @finish="onFinish4" />
    </demo-section>

    <demo-section title="自定义颜色">
      <ui-cell padding="0" title="红色主题" :value="value5Text || '请选择'" @click="show5 = true" />
      <ui-cascader v-model="value5" v-model:show="show5" title="自定义颜色" :options="areaOptions" color="#646566" active-color="#ee0a24" @finish="onFinish5" />
    </demo-section>

    <demo-section title="不显示头部">
      <ui-cell padding="0" title="无标题栏" :value="value6Text || '请选择'" @click="show6 = true" />
      <ui-cascader v-model="value6" v-model:show="show6" :show-header="false" :options="areaOptions" @finish="onFinish6" />
    </demo-section>

    <demo-section title="关闭手势切换">
      <ui-cell padding="0" title="仅点击 tab 切换" :value="value7Text || '请选择'" @click="show7 = true" />
      <ui-cascader v-model="value7" v-model:show="show7" title="禁用滑动" :options="areaOptions" :swipeable="false" @finish="onFinish7" />
    </demo-section>

    <demo-section title="自定义关闭按钮">
      <ui-cell padding="0" title="使用 close 图标" :value="value8Text || '请选择'" @click="show8 = true" />
      <ui-cascader v-model="value8" v-model:show="show8" title="自定义关闭" :options="areaOptions" closeable close-icon="close" @finish="onFinish8" />
    </demo-section>

    <demo-section title="异步切换">
      <ui-cell padding="0" title="首层 800ms 延迟" :value="value9Text || '请选择'" @click="show9 = true" />
      <ui-cascader v-model="value9" v-model:show="show9" title="异步加载" :options="areaOptions" :before-change="beforeChange" @finish="onFinish9" />
    </demo-section>

    <demo-section title="自定义高度">
      <ui-cell padding="0" title="height='80vh'" :value="value10Text || '请选择'" @click="show10 = true" />
      <ui-cascader v-model="value10" v-model:show="show10" title="80vh" :options="areaOptions" height="80vh" @finish="onFinish10" />
    </demo-section>

    <demo-section title="占位符">
      <ui-cell padding="0" title="自定义 placeholder" :value="value11Text || '请选择'" @click="show11 = true" />
      <ui-cascader v-model="value11" v-model:show="show11" title="占位文案" :options="areaOptions" placeholder="请点击选择" @finish="onFinish11" />
    </demo-section>

    <demo-section title="标题样式">
      <ui-cell padding="0" title="自定义标题" :value="value12Text || '请选择'" @click="show12 = true" />
      <ui-cascader
        v-model="value12"
        v-model:show="show12"
        title="自定义标题样式"
        :options="areaOptions"
        title-size="36rpx"
        title-color="#ee0a24"
        title-weight="700"
        @finish="onFinish12"
      />
    </demo-section>

    <demo-section title="事件监听">
      <ui-cell padding="0" title="点击查看事件" :value="value13Text || '请选择'" @click="show13 = true" />
      <view class="event-list">
        <text v-for="(log, i) in eventLogs" :key="i" class="demo-text">{{ log }}</text>
      </view>
      <ui-cascader
        v-model="value13"
        v-model:show="show13"
        title="事件演示"
        :options="areaOptions"
        @change="onChange"
        @finish="onFinish13"
        @click-tab="onClickTab"
        @close="onClose"
      />
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { CascaderOption, CascaderChangeData } from "@/uni_modules/uniapp-ui/ui-cascader"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Cascader 级联选择" },
})

// 13 组互相独立的 v-model（避免一个 demo 干扰另一个）
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show8 = ref(false)
const show9 = ref(false)
const show10 = ref(false)
const show11 = ref(false)
const show12 = ref(false)
const show13 = ref(false)

const value1 = ref<string | number>("")
const value2 = ref<string | number>("")
const value3 = ref<string | number>("")
const value4 = ref<string | number>("")
const value5 = ref<string | number>("")
const value6 = ref<string | number>("")
const value7 = ref<string | number>("")
const value8 = ref<string | number>("")
const value9 = ref<string | number>("")
const value10 = ref<string | number>("")
const value11 = ref<string | number>("")
const value12 = ref<string | number>("")
const value13 = ref<string | number>("")

const value1Text = ref("")
const value3Text = ref("")
const value4Text = ref("")
const value5Text = ref("")
const value6Text = ref("")
const value7Text = ref("")
const value8Text = ref("")
const value9Text = ref("")
const value10Text = ref("")
const value11Text = ref("")
const value12Text = ref("")
const value13Text = ref("")

const eventLogs = ref<string[]>([])

const areaOptions: CascaderOption[] = [
  {
    text: "浙江省",
    value: "zhejiang",
    children: [
      { text: "杭州市", value: "hangzhou" },
      { text: "宁波市", value: "ningbo" },
      { text: "温州市", value: "wenzhou" },
    ],
  },
  {
    text: "江苏省",
    value: "jiangsu",
    children: [
      { text: "南京市", value: "nanjing" },
      { text: "苏州市", value: "suzhou" },
    ],
  },
  {
    text: "广东省",
    value: "guangdong",
    children: [
      { text: "广州市", value: "guangzhou" },
      { text: "深圳市", value: "shenzhen" },
      { text: "珠海市", value: "zhuhai" },
    ],
  },
]

const customFieldOptions = [
  {
    label: "技术",
    id: "tech",
    children: [
      { label: "前端", id: "fe" },
      { label: "后端", id: "be" },
    ],
  },
  { label: "设计", id: "design", children: [{ label: "UI", id: "ui" }] },
]

const disabledOptions: CascaderOption[] = [
  { text: "可选项", value: "a" },
  { text: "禁用项", value: "b", disabled: true },
  { text: "可选项2", value: "c" },
]

function joinText(data: CascaderChangeData) {
  return data.selectedOptions.map((o) => o.text).join("/")
}

function onFinish1(data: CascaderChangeData) {
  value1Text.value = joinText(data)
}
function onFinish3(data: CascaderChangeData) {
  value3Text.value = data.selectedOptions.map((o: any) => o.label).join("/")
}
function onFinish4(data: CascaderChangeData) {
  value4Text.value = joinText(data)
}
function onFinish5(data: CascaderChangeData) {
  value5Text.value = joinText(data)
}
function onFinish6(data: CascaderChangeData) {
  value6Text.value = joinText(data)
}
function onFinish7(data: CascaderChangeData) {
  value7Text.value = joinText(data)
}
function onFinish8(data: CascaderChangeData) {
  value8Text.value = joinText(data)
}
function onFinish9(data: CascaderChangeData) {
  value9Text.value = joinText(data)
}
function onFinish10(data: CascaderChangeData) {
  value10Text.value = joinText(data)
}
function onFinish11(data: CascaderChangeData) {
  value11Text.value = joinText(data)
}
function onFinish12(data: CascaderChangeData) {
  value12Text.value = joinText(data)
}
function onFinish13(data: CascaderChangeData) {
  value13Text.value = joinText(data)
  pushEvent(`finish: ${value13Text.value}`)
}

function onChange(data: CascaderChangeData) {
  pushEvent(`change: index=${data.index} value=${data.value}`)
}
function onClickTab(data: { index: number }) {
  pushEvent(`clickTab: index=${data.index}`)
}
function onClose() {
  pushEvent("close")
}
function pushEvent(msg: string) {
  const t = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${t}] ${msg}`)
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

// 模拟首层异步加载 800ms
function beforeChange({ index }: { index: number }) {
  return new Promise<boolean>((resolve) => {
    if (index === 0) setTimeout(() => resolve(true), 800)
    else resolve(true)
  })
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.event-list {
  gap: var(--ui-spacing-xxs);
  display: flex;
  margin-top: var(--ui-spacing-xs);
  flex-direction: column;
}
</style>
