<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="16">
        <ui-date-select v-model="value1" placeholder="请选择日期" />
        <text class="demo-text">当前值: {{ value1 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择年月">
      <demo-block direction="column" :gap="16">
        <ui-date-select v-model="value2" :columns="['year', 'month']" format="YYYY-MM" placeholder="请选择年月" />
        <text class="demo-text">当前值: {{ value2 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择时间">
      <demo-block direction="column" :gap="16">
        <ui-date-select v-model="value3" :columns="['hour', 'minute', 'second']" format="HH:mm:ss" placeholder="请选择时间" />
        <text class="demo-text">当前值: {{ value3 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择日期时间">
      <demo-block direction="column" :gap="16">
        <ui-date-select v-model="value4" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" placeholder="请选择日期时间" />
        <text class="demo-text">当前值: {{ value4 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="日期范围限制">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">限制 2024-01-01 至 2025-12-31</text>
        <ui-date-select v-model="value5" min-date="2024-01-01" max-date="2025-12-31" placeholder="请选择日期" />
        <text class="demo-text">当前值: {{ value5 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="默认值">
      <demo-block direction="column" :gap="16">
        <ui-date-select v-model="value6" placeholder="有默认值" />
        <text class="demo-text">当前值: {{ value6 }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-date-select v-model="value7" placeholder="禁用状态" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="只读状态">
      <demo-block>
        <ui-date-select v-model="value8" placeholder="只读状态" readonly />
      </demo-block>
    </demo-section>

    <demo-section title="自定义展示格式">
      <demo-block direction="column" :gap="16">
        <ui-date-select v-model="value9" :display-formatter="formatDisplay" placeholder="自定义展示" />
        <text class="demo-text">当前值: {{ value9 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="带标题">
      <demo-block>
        <ui-date-select v-model="value10" title="选择出生日期" placeholder="请选择日期" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义按钮文字">
      <demo-block>
        <ui-date-select v-model="value11" cancel-text="返回" confirm-text="好的" placeholder="请选择日期" />
      </demo-block>
    </demo-section>

    <demo-section title="文字样式">
      <demo-block direction="column" :gap="16">
        <ui-date-select v-model="value12" text-color="#1989fa" text-size="32rpx" text-weight="600" text-align="center" placeholder="请选择日期" />
        <ui-date-select v-model="value13" placeholder-color="#ee0a24" placeholder="自定义占位颜色" />
      </demo-block>
    </demo-section>

    <demo-section title="右侧图标">
      <demo-block direction="column" :gap="16">
        <ui-date-select v-model="value14" right-icon="calendar" right-icon-color="#1989fa" placeholder="日历图标" />
        <ui-date-select v-model="value15" right-icon="" placeholder="隐藏图标" />
      </demo-block>
    </demo-section>

    <demo-section title="事件处理">
      <demo-block direction="column" :gap="16">
        <ui-date-select
          v-model="value16"
          placeholder="请选择日期"
          @open="onOpen"
          @opened="onOpened"
          @close="onClose"
          @closed="onClosed"
          @change="onChange"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
        <view class="event-list">
          <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
            <text class="event-text">{{ log }}</text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="表单集成">
      <demo-block direction="column" :gap="0">
        <ui-form ref="formRef" :model="formData" :rules="formRules">
          <ui-form-item label="出生日期" prop="birthday" :label-width="160">
            <ui-date-select v-model="formData.birthday" placeholder="请选择出生日期" />
          </ui-form-item>
          <ui-form-item label="入职时间" prop="entryDate" :label-width="160">
            <ui-date-select v-model="formData.entryDate" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" placeholder="请选择入职时间" />
          </ui-form-item>
        </ui-form>
        <demo-block :cols="2" :gap="16">
          <ui-button type="primary" @click="submitForm">提交</ui-button>
          <ui-button @click="resetForm">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="综合示例 - 预约表单">
      <demo-block direction="column" :gap="16">
        <view class="form-item">
          <text class="form-label">预约日期</text>
          <ui-date-select v-model="bookingDate" :min-date="today" placeholder="请选择" text-align="right" right-icon="arrow" />
        </view>
        <view class="form-item">
          <text class="form-label">预约时间</text>
          <ui-date-select v-model="bookingTime" :columns="['hour', 'minute']" format="HH:mm" placeholder="请选择" text-align="right" right-icon="arrow" />
        </view>
        <view v-if="bookingDate && bookingTime" class="result-box">
          <text class="result-text">预约时间: {{ bookingDate }} {{ bookingTime }}</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { FormInstance } from "@/uni_modules/uniapp-ui/ui-form"
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "DateSelect 日期选择" },
})

const toast = useToast()

// 基础用法
const value1 = ref("")

// 选择年月
const value2 = ref("")

// 选择时间
const value3 = ref("")

// 选择日期时间
const value4 = ref("")

// 日期范围
const value5 = ref("")

// 默认值
const value6 = ref("2024-06-15")

// 禁用状态
const value7 = ref("2024-01-01")

// 只读状态
const value8 = ref("2024-03-20")

// 自定义展示格式
const value9 = ref("")

function formatDisplay(value: string) {
  if (!value) return ""
  const parts = value.split("-")
  if (parts.length >= 3) {
    return `${parts[0]}年${parts[1]}月${parts[2]}日`
  }
  return value
}

// 带标题
const value10 = ref("")

// 自定义按钮
const value11 = ref("")

// 文字样式
const value12 = ref("2024-05-01")
const value13 = ref("")

// 右侧图标
const value14 = ref("")
const value15 = ref("")

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
  addEventLog("触发 open 事件")
}

function onOpened() {
  addEventLog("触发 opened 事件")
}

function onClose(action: string) {
  addEventLog(`触发 close 事件: ${action}`)
}

function onClosed(action: string) {
  addEventLog(`触发 closed 事件: ${action}`)
}

function onChange(data: any) {
  addEventLog(`触发 change 事件: ${data.value}`)
}

function onCancel() {
  addEventLog("触发 cancel 事件")
}

function onConfirm(data: any) {
  addEventLog(`触发 confirm 事件: ${data.value}`)
}

// 表单集成
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

// 综合示例
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
  width: 100%;
  padding: 16rpx;
  background: var(--ui-color-background-light);
  max-height: 250rpx;
  overflow-y: auto;
  border-radius: 8rpx;
}

.event-item {
  padding: 8rpx 0;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }
}

.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 22rpx;
}

.form-item {
  display: flex;
  padding: 24rpx 0;
  align-items: center;
  border-bottom: 1rpx solid var(--ui-color-border-light);
  justify-content: space-between;
}

.form-label {
  color: var(--ui-color-text-main);
  font-size: 28rpx;
}

.result-box {
  padding: 24rpx;
  background: #f0f9ff;
  border-radius: 12rpx;
}

.result-text {
  color: #1989fa;
  font-size: 26rpx;
}
</style>
