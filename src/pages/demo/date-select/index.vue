<template>
  <demo-page>
    <demo-section title="基础用法（表单列表风格）">
      <ui-cell-group>
        <ui-cell title="日期" padding="0">
          <ui-date-select v-model="value1" placeholder="请选择" text-align="right" />
        </ui-cell>
        <ui-cell title="年月" padding="0">
          <ui-date-select v-model="value2" :columns="['year', 'month']" format="YYYY-MM" placeholder="请选择" text-align="right" />
        </ui-cell>
        <ui-cell title="时间" padding="0">
          <ui-date-select v-model="value3" :columns="['hour', 'minute', 'second']" format="HH:mm:ss" placeholder="请选择" text-align="right" />
        </ui-cell>
        <ui-cell title="日期时间" padding="0">
          <ui-date-select v-model="value4" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" placeholder="请选择" text-align="right" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="状态">
      <ui-cell-group>
        <ui-cell title="禁用" padding="0">
          <ui-date-select v-model="value7" placeholder="禁用" disabled text-align="right" />
        </ui-cell>
        <ui-cell title="只读" padding="0">
          <ui-date-select v-model="value8" placeholder="只读" readonly text-align="right" />
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="日期范围限制">
      <demo-block direction="column" :gap="12">
        <text class="demo-text">限制 2024-01-01 至 2025-12-31</text>
        <ui-date-select v-model="value5" min-date="2024-01-01" max-date="2025-12-31" placeholder="请选择日期" />
      </demo-block>
    </demo-section>

    <demo-section title="步进配置">
      <demo-block :cols="2" :gap="12">
        <ui-date-select v-model="valueStepMinute" :columns="['hour', 'minute']" format="HH:mm" :steps="{ minute: 15 }" placeholder="15 分钟间隔" />
        <ui-date-select v-model="valueStepQuarter" :columns="['year', 'month']" format="YYYY-MM" :steps="{ month: 3 }" placeholder="季度选择" />
      </demo-block>
    </demo-section>

    <demo-section title="样式定制">
      <demo-block direction="column" :gap="12">
        <ui-date-select v-model="value12" text-color="primary" text-size="32rpx" text-weight="600" text-align="center" placeholder="居中主色加粗" />
        <ui-date-select v-model="value13" placeholder-color="danger" placeholder="自定义占位颜色 (danger)" />
        <ui-date-select v-model="value14" right-icon="calendar" right-icon-color="primary" placeholder="日历图标" />
        <ui-date-select v-model="value15" right-icon="" placeholder="隐藏图标" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义文案">
      <demo-block direction="column" :gap="12">
        <ui-date-select v-model="value10" title="选择出生日期" placeholder="自定义弹窗标题" />
        <ui-date-select v-model="value11" cancel-text="返回" confirm-text="好的" placeholder="自定义按钮文字" />
        <ui-date-select v-model="value9" :display-formatter="formatDisplay" placeholder="中文展示（YYYY 年 MM 月 DD 日）" />
      </demo-block>
    </demo-section>

    <demo-section title="隐藏头部（滚动即生效）">
      <ui-date-select v-model="valueNoHeader" :show-header="false" placeholder="无取消/确定栏" />
    </demo-section>

    <demo-section title="ref 暴露的方法">
      <demo-block direction="column" align="start" :gap="12">
        <ui-date-select ref="dateSelectRef" v-model="valueRef" placeholder="ref 演示" />
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" type="primary" @click="callOpen">open()</ui-button>
          <ui-button size="small" @click="callGetValue">getSelectedValue()</ui-button>
          <ui-button size="small" type="warning" @click="callConfirm">confirm()</ui-button>
        </demo-block>
        <text v-if="refLog" class="demo-text">{{ refLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="事件监听">
      <demo-block direction="column" :gap="12">
        <ui-date-select
          v-model="value16"
          placeholder="操作弹窗触发事件"
          @open="onOpen"
          @opened="onOpened"
          @close="onClose"
          @closed="onClosed"
          @change="onChange"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
        <view class="event-list">
          <text v-for="(log, index) in eventLogs" :key="index" class="event-text">{{ log }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="表单集成">
      <ui-form ref="formRef" :model="formData" :rules="formRules">
        <ui-form-item label="出生日期" prop="birthday" :label-width="160">
          <ui-date-select v-model="formData.birthday" placeholder="请选择出生日期" />
        </ui-form-item>
        <ui-form-item label="入职时间" prop="entryDate" :label-width="160">
          <ui-date-select v-model="formData.entryDate" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" placeholder="请选择入职时间" />
        </ui-form-item>
      </ui-form>
      <demo-block :cols="2" :gap="12">
        <ui-button type="primary" @click="submitForm">提交</ui-button>
        <ui-button @click="resetForm">重置</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="综合示例 - 预约">
      <ui-cell-group>
        <ui-cell title="预约日期" padding="0">
          <ui-date-select v-model="bookingDate" :min-date="today" placeholder="请选择" text-align="right" />
        </ui-cell>
        <ui-cell title="预约时间" padding="0">
          <ui-date-select v-model="bookingTime" :columns="['hour', 'minute']" format="HH:mm" placeholder="请选择" text-align="right" />
        </ui-cell>
      </ui-cell-group>
      <view v-if="bookingDate && bookingTime" class="result-box">
        <text class="result-text">预约时间: {{ bookingDate }} {{ bookingTime }}</text>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { FormInstance } from "@/uni_modules/uniapp-ui/ui-form"
import type { DateSelectInstance } from "@/uni_modules/uniapp-ui/ui-date-select"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "DateSelect 日期选择" },
})

const toast = useToast()

// 基础用法
const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")

// 范围限制
const value5 = ref("")

// 状态
const value7 = ref("2024-01-01")
const value8 = ref("2024-03-20")

// 自定义文案
const value9 = ref("")
const value10 = ref("")
const value11 = ref("")

// 样式定制
const value12 = ref("2024-05-01")
const value13 = ref("")
const value14 = ref("")
const value15 = ref("")

// 步进
const valueStepMinute = ref("")
const valueStepQuarter = ref("")

// 隐藏头部
const valueNoHeader = ref("")

// ref API
const valueRef = ref("")
const refLog = ref("")
const dateSelectRef = ref<DateSelectInstance>()

function callOpen() {
  dateSelectRef.value?.open()
  refLog.value = "调用 open() 打开弹窗"
}

function callGetValue() {
  const v = dateSelectRef.value?.getSelectedValue?.() ?? ""
  refLog.value = `getSelectedValue() = ${v || "(空)"}`
}

function callConfirm() {
  dateSelectRef.value?.confirm?.()
  refLog.value = "调用 confirm() 确认并关闭"
}

// 事件处理
const value16 = ref("")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

function onOpen() {
  addEventLog("open")
}
function onOpened() {
  addEventLog("opened")
}
function onClose(action: string) {
  addEventLog(`close: ${action}`)
}
function onClosed(action: string) {
  addEventLog(`closed: ${action}`)
}
function onChange(data: any) {
  addEventLog(`change: ${data.value}`)
}
function onCancel() {
  addEventLog("cancel")
}
function onConfirm(data: any) {
  addEventLog(`confirm: ${data.value}`)
}

// 自定义展示
function formatDisplay(value: string) {
  if (!value) return ""
  const parts = value.split("-")
  if (parts.length >= 3) {
    return `${parts[0]}年${parts[1]}月${parts[2]}日`
  }
  return value
}

// 表单
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  birthday: "",
  entryDate: "",
})

const formRules = {
  birthday: [{ required: true, message: "请选择出生日期" }],
  entryDate: [{ required: true, message: "请选择入职时间" }],
}

async function submitForm() {
  try {
    await formRef.value?.validate()
    toast.success("验证通过")
  } catch {
    toast.fail("请填写完整")
  }
}

function resetForm() {
  formData.birthday = ""
  formData.entryDate = ""
  formRef.value?.clearValidate()
}

// 综合
const today = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
})

const bookingDate = ref("")
const bookingTime = ref("")
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.event-list {
  gap: 4rpx;
  width: 100%;
  display: flex;
  padding: 16rpx;
  background: var(--ui-color-background-page);
  max-height: 250rpx;
  overflow-y: auto;
  border-radius: 8rpx;
  flex-direction: column;
}

.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 22rpx;
}

.result-box {
  padding: 24rpx;
  background: var(--ui-color-primary-light);
  margin-top: 16rpx;
  border-radius: 12rpx;
}

.result-text {
  color: var(--ui-color-primary);
  font-size: 26rpx;
}
</style>
