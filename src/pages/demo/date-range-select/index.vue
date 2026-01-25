<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value1" />
        <text class="demo-text">当前值: {{ formatRange(value1) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择年月">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value2" :columns="['year', 'month']" format="YYYY-MM" />
        <text class="demo-text">当前值: {{ formatRange(value2) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择日期时间">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value3" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" />
        <text class="demo-text">当前值: {{ formatRange(value3) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="日期范围限制">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">限制 2024-01-01 至 2025-12-31</text>
        <ui-date-range-select v-model="value4" min-date="2024-01-01" max-date="2025-12-31" />
        <text class="demo-text">当前值: {{ formatRange(value4) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="默认值">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value5" />
        <text class="demo-text">当前值: {{ formatRange(value5) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block>
        <ui-date-range-select v-model="value6" disabled />
      </demo-block>
    </demo-section>

    <demo-section title="只读状态">
      <demo-block>
        <ui-date-range-select v-model="value7" readonly />
      </demo-block>
    </demo-section>

    <demo-section title="自定义占位符">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value8" start-placeholder="入住日期" end-placeholder="离店日期" separator="→" />
      </demo-block>
    </demo-section>

    <demo-section title="关闭自动切换">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">选择开始日期后需手动切换到结束日期</text>
        <ui-date-range-select v-model="value9" :auto-switch-to-end="false" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义展示格式">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value10" :display-formatter="formatDisplay" />
        <text class="demo-text">当前值: {{ formatRange(value10) }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="弹窗位置">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="popupMode = 'bottom'">底部</ui-button>
          <ui-button size="small" @click="popupMode = 'center'">居中</ui-button>
          <ui-button size="small" @click="popupMode = 'top'">顶部</ui-button>
        </demo-block>
        <ui-date-range-select v-model="value11" :mode="popupMode" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义按钮文字">
      <demo-block>
        <ui-date-range-select v-model="value12" cancel-text="返回" confirm-text="好的" />
      </demo-block>
    </demo-section>

    <demo-section title="文字样式">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value13" text-color="#1989fa" text-size="32rpx" text-weight="600" />
        <ui-date-range-select v-model="value14" placeholder-color="#ee0a24" />
      </demo-block>
    </demo-section>

    <demo-section title="右侧图标">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value15" right-icon="calendar" right-icon-color="#1989fa" />
        <ui-date-range-select v-model="value16" right-icon="" />
      </demo-block>
    </demo-section>

    <demo-section title="事件处理">
      <demo-block direction="column" :gap="16">
        <ui-date-range-select v-model="value17" @open="onOpen" @opened="onOpened" @close="onClose" @closed="onClosed" @change="onChange" @cancel="onCancel" @confirm="onConfirm" />
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
          <ui-form-item label="入住时间" prop="checkIn" :label-width="160">
            <ui-date-range-select v-model="formData.checkIn" start-placeholder="入住" end-placeholder="离店" />
          </ui-form-item>
          <ui-form-item label="会议时间" prop="meeting" :label-width="160">
            <ui-date-range-select v-model="formData.meeting" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" />
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
            <text class="booking-title">选择入住日期</text>
          </view>
          <ui-date-range-select
            v-model="bookingDate"
            :min-date="today"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
            separator="→"
            :display-formatter="formatBooking"
            right-icon="calendar"
          />
          <view v-if="bookingDate.length === 2" class="booking-info">
            <text class="booking-nights">共 {{ getNights() }} 晚</text>
          </view>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { PopupMode } from "@/uni_modules/uniapp-ui/ui-popup"
import type { FormInstance } from "@/uni_modules/uniapp-ui/ui-form"
import type {
  DateRangeSelectValue,
  DateRangeSelectActiveType,
  DateRangeSelectCancelData,
  DateRangeSelectChangeData,
  DateRangeSelectConfirmData,
} from "@/uni_modules/uniapp-ui/ui-date-range-select"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "DateRangeSelect 日期区间" },
})

const toast = useToast()

function formatRange(value: DateRangeSelectValue): string {
  if (!value || value.length < 2) return "未选择"
  return `${value[0]} 至 ${value[1]}`
}

// 基础用法
const value1 = ref<DateRangeSelectValue>([])

// 选择年月
const value2 = ref<DateRangeSelectValue>([])

// 选择日期时间
const value3 = ref<DateRangeSelectValue>([])

// 日期范围限制
const value4 = ref<DateRangeSelectValue>([])

// 默认值
const value5 = ref<DateRangeSelectValue>(["2024-06-01", "2024-06-07"])

// 禁用状态
const value6 = ref<DateRangeSelectValue>(["2024-03-01", "2024-03-05"])

// 只读状态
const value7 = ref<DateRangeSelectValue>(["2024-04-10", "2024-04-15"])

// 自定义占位符
const value8 = ref<DateRangeSelectValue>([])

// 关闭自动切换
const value9 = ref<DateRangeSelectValue>([])

// 自定义展示格式
const value10 = ref<DateRangeSelectValue>([])

function formatDisplay(value: string, type: DateRangeSelectActiveType): string {
  if (!value) return ""
  const parts = value.split("-")
  if (parts.length >= 3) {
    const label = type === "start" ? "起" : "止"
    return `${label} ${parts[1]}.${parts[2]}`
  }
  return value
}

// 弹窗位置
const value11 = ref<DateRangeSelectValue>([])
const popupMode = ref<PopupMode>("bottom")

// 自定义按钮文字
const value12 = ref<DateRangeSelectValue>([])

// 文字样式
const value13 = ref<DateRangeSelectValue>(["2024-05-01", "2024-05-10"])
const value14 = ref<DateRangeSelectValue>([])

// 右侧图标
const value15 = ref<DateRangeSelectValue>([])
const value16 = ref<DateRangeSelectValue>([])

// 事件处理
const value17 = ref<DateRangeSelectValue>([])
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

function onChange(data: DateRangeSelectChangeData) {
  addEventLog(`触发 change 事件: ${data.type} = ${data.value}`)
}

function onCancel(data: DateRangeSelectCancelData) {
  addEventLog("触发 cancel 事件")
}

function onConfirm(data: DateRangeSelectConfirmData) {
  addEventLog(`触发 confirm 事件: ${data.startValue} ~ ${data.endValue}`)
}

// 表单集成
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  checkIn: [] as DateRangeSelectValue,
  meeting: [] as DateRangeSelectValue,
})

const formRules = {
  checkIn: [{ required: true, message: "请选择入住时间" }],
  meeting: [{ required: true, message: "请选择会议时间" }],
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
  formData.checkIn = []
  formData.meeting = []
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

const bookingDate = ref<DateRangeSelectValue>([])

function formatBooking(value: string, type: DateRangeSelectActiveType): string {
  if (!value) return ""
  const parts = value.split("-")
  if (parts.length >= 3) {
    return `${parts[1]}月${parts[2]}日`
  }
  return value
}

function getNights(): number {
  if (bookingDate.value.length < 2) return 0
  const start = new Date(bookingDate.value[0])
  const end = new Date(bookingDate.value[1])
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
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

.booking-card {
  padding: 24rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
}

.booking-header {
  margin-bottom: 16rpx;
}

.booking-title {
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
}

.booking-info {
  margin-top: 16rpx;
  text-align: center;
}

.booking-nights {
  color: rgba(255, 255, 255, 0.9);
  font-size: 26rpx;
}
</style>
