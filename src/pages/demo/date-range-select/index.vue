<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value1" />
        <text class="demo-text">当前值: {{ formatRange(value1) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义占位符">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value2" start-placeholder="入住日期" end-placeholder="离店日期" separator="→" />
        <text class="demo-text">当前值: {{ formatRange(value2) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择年月">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value3" :columns="['year', 'month']" format="YYYY-MM" start-placeholder="开始月份" end-placeholder="结束月份" />
        <text class="demo-text">当前值: {{ formatRange(value3) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择时间">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value4" :columns="['hour', 'minute']" format="HH:mm" start-placeholder="开始时间" end-placeholder="结束时间" />
        <text class="demo-text">当前值: {{ formatRange(value4) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择日期时间">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select
          v-model="value5"
          :columns="['year', 'month', 'day', 'hour', 'minute']"
          format="YYYY-MM-DD HH:mm"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
        <text class="demo-text">当前值: {{ formatRange(value5) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="日期范围限制">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">限制 2024-01-01 至 2025-12-31</text>
        <ui-date-range-select v-model="value6" min-date="2024-01-01" max-date="2025-12-31" />
        <text class="demo-text">当前值: {{ formatRange(value6) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="默认值">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value7" />
        <text class="demo-text">当前值: {{ formatRange(value7) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-date-range-select v-model="value8" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="只读状态">
      <demo-block>
        <ui-date-range-select v-model="value9" readonly />
      </demo-block>
    </demo-section>

    <demo-section title="自定义展示格式">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value10" :display-formatter="formatDisplay" />
        <text class="demo-text">当前值: {{ formatRange(value10) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="带标题">
      <demo-block>
        <ui-date-range-select v-model="value11" title="选择日期范围" />
      </demo-block>
    </demo-section>

    <demo-section title="文字样式">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value12" text-color="#1989fa" text-size="28rpx" text-weight="600" separator-color="#ee0a24" />
      </demo-block>
    </demo-section>

    <demo-section title="右侧图标">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value13" right-icon="calendar" right-icon-color="#1989fa" />
        <ui-date-range-select v-model="value14" right-icon="" />
      </demo-block>
    </demo-section>

    <demo-section title="事件处理">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select
          v-model="value15"
          @open="onOpen"
          @opened="onOpened"
          @close="onClose"
          @closed="onClosed"
          @change="onChange"
          @cancel="onCancel"
          @confirm="onConfirm"
          @click="onClick"
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
          <ui-form-item label="活动时间" prop="activityRange" :label-width="160">
            <ui-date-range-select v-model="formData.activityRange" start-placeholder="开始" end-placeholder="结束" />
          </ui-form-item>
          <ui-form-item label="有效期" prop="validRange" :label-width="160">
            <ui-date-range-select v-model="formData.validRange" :columns="['year', 'month']" format="YYYY-MM" start-placeholder="开始月" end-placeholder="结束月" />
          </ui-form-item>
        </ui-form>
        <demo-block :cols="2" :gap="16">
          <ui-button type="primary" @click="submitForm">提交</ui-button>
          <ui-button @click="resetForm">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="综合示例 - 酒店预订">
      <demo-block direction="column" :gap="16">
        <view class="booking-card">
          <view class="booking-header">
            <text class="booking-title">酒店预订</text>
          </view>
          <view class="booking-content">
            <view class="booking-item">
              <text class="booking-label">入住/离店</text>
              <ui-date-range-select
                v-model="hotelRange"
                :min-date="today"
                start-placeholder="入住日期"
                end-placeholder="离店日期"
                separator="→"
                right-icon="calendar"
                :display-formatter="formatHotelDate"
              />
            </view>
            <view v-if="hotelRange.length === 2" class="booking-summary">
              <text class="booking-nights">共 {{ calculateNights(hotelRange) }} 晚</text>
            </view>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合示例 - 请假申请">
      <demo-block direction="column" :gap="16">
        <view class="leave-form">
          <view class="form-item">
            <text class="form-label">请假时间</text>
            <ui-date-range-select
              v-model="leaveRange"
              :columns="['year', 'month', 'day', 'hour']"
              format="YYYY-MM-DD HH"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              text-align="right"
              right-icon="arrow"
            />
          </view>
          <view v-if="leaveRange.length === 2" class="leave-summary">
            <text class="leave-text">请假时长: {{ calculateLeaveHours(leaveRange) }} 小时</text>
          </view>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { FormInstance } from "@/uni_modules/uniapp-ui/ui-form"
import type { DateRangeSelectActiveType, DateRangeSelectValue } from "@/uni_modules/uniapp-ui/ui-date-range-select"
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "DateRangeSelect 日期区间" },
})

const toast = useToast()

// 格式化区间值显示
function formatRange(value: DateRangeSelectValue) {
  if (!value || value.length < 2) return "未选择"
  return `${value[0]} ~ ${value[1]}`
}

// 基础用法
const value1 = ref<DateRangeSelectValue>([])

// 自定义占位符
const value2 = ref<DateRangeSelectValue>([])

// 选择年月
const value3 = ref<DateRangeSelectValue>([])

// 选择时间
const value4 = ref<DateRangeSelectValue>([])

// 选择日期时间
const value5 = ref<DateRangeSelectValue>([])

// 日期范围
const value6 = ref<DateRangeSelectValue>([])

// 默认值
const value7 = ref<DateRangeSelectValue>(["2024-06-01", "2024-06-15"])

// 禁用状态
const value8 = ref<DateRangeSelectValue>(["2024-01-01", "2024-01-10"])

// 只读状态
const value9 = ref<DateRangeSelectValue>(["2024-03-01", "2024-03-15"])

// 自定义展示格式
const value10 = ref<DateRangeSelectValue>([])

function formatDisplay(value: string, type: DateRangeSelectActiveType) {
  if (!value) return ""
  const parts = value.split("-")
  if (parts.length >= 3) {
    const formatted = `${parts[1]}月${parts[2]}日`
    return type === "start" ? `从 ${formatted}` : `到 ${formatted}`
  }
  return value
}

// 带标题
const value11 = ref<DateRangeSelectValue>([])

// 文字样式
const value12 = ref<DateRangeSelectValue>(["2024-05-01", "2024-05-10"])

// 右侧图标
const value13 = ref<DateRangeSelectValue>([])
const value14 = ref<DateRangeSelectValue>([])

// 事件处理
const value15 = ref<DateRangeSelectValue>([])
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
  addEventLog(`触发 change 事件: ${data.type} = ${data.value}`)
}

function onCancel() {
  addEventLog("触发 cancel 事件")
}

function onConfirm(data: any) {
  addEventLog(`触发 confirm 事件: ${data.range.join(" ~ ")}`)
}

function onClick(type: DateRangeSelectActiveType) {
  addEventLog(`触发 click 事件: ${type}`)
}

// 表单集成
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  activityRange: [] as DateRangeSelectValue,
  validRange: [] as DateRangeSelectValue,
})

const formRules = {
  activityRange: [
    {
      validator: (value: DateRangeSelectValue) => value && value.length === 2,
      message: "请选择活动时间",
    },
  ],
  validRange: [
    {
      validator: (value: DateRangeSelectValue) => value && value.length === 2,
      message: "请选择有效期",
    },
  ],
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
  formData.activityRange = []
  formData.validRange = []
  formRef.value?.clearValidate()
}

// 综合示例 - 酒店预订
const today = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
})

const hotelRange = ref<DateRangeSelectValue>([])

function formatHotelDate(value: string, type: DateRangeSelectActiveType) {
  if (!value) return ""
  const date = new Date(value)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"]
  const weekDay = weekDays[date.getDay()]
  return `${month}月${day}日 周${weekDay}`
}

function calculateNights(range: DateRangeSelectValue) {
  if (range.length < 2) return 0
  const start = new Date(range[0])
  const end = new Date(range[1])
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// 综合示例 - 请假申请
const leaveRange = ref<DateRangeSelectValue>([])

function calculateLeaveHours(range: DateRangeSelectValue) {
  if (range.length < 2) return 0
  // 简单计算：假设每天工作8小时
  const start = new Date(range[0].replace(" ", "T") + ":00:00")
  const end = new Date(range[1].replace(" ", "T") + ":00:00")
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60))
}
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
  flex-shrink: 0;
  margin-right: 24rpx;
}

// 酒店预订卡片
.booking-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24rpx;
  overflow: hidden;
}

.booking-header {
  padding: 32rpx;
}

.booking-title {
  color: #fff;
  font-size: 36rpx;
  font-weight: 600;
}

.booking-content {
  padding: 32rpx;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
}

.booking-item {
  display: flex;
  align-items: center;
}

.booking-label {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
  flex-shrink: 0;
  margin-right: 24rpx;
}

.booking-summary {
  margin-top: 24rpx;
  padding: 16rpx 24rpx;
  background: #f0f9ff;
  border-radius: 12rpx;
  text-align: center;
}

.booking-nights {
  color: #1989fa;
  font-size: 28rpx;
  font-weight: 600;
}

// 请假申请
.leave-form {
  background: #fff;
  padding: 24rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.leave-summary {
  margin-top: 24rpx;
  padding: 24rpx;
  background: #fff7e6;
  border-radius: 12rpx;
}

.leave-text {
  color: #fa8c16;
  font-size: 28rpx;
  font-weight: 500;
}
</style>
