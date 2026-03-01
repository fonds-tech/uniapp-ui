<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-date-panel v-model="value1" format="YYYY-MM-DD" />
        </view>
        <text class="demo-text">当前值: {{ value1 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择年月">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-date-panel v-model="value2" :columns="['year', 'month']" format="YYYY-MM" />
        </view>
        <text class="demo-text">当前值: {{ value2 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="选择时间">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-date-panel v-model="value3" :columns="['hour', 'minute']" format="HH:mm" />
        </view>
        <text class="demo-text">当前值: {{ value3 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="完整日期时间">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-date-panel v-model="value4" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" />
        </view>
        <text class="demo-text">当前值: {{ value4 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="日期范围限制">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">限制 2024-01-01 至 2025-12-31</text>
        <view class="panel-box">
          <ui-date-panel v-model="value5" :min-date="minDate" :max-date="maxDate" format="YYYY-MM-DD" />
        </view>
        <text class="demo-text">当前值: {{ value5 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义选项文案">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-date-panel v-model="value6" :columns="['year', 'month', 'day']" format="YYYY-MM-DD" :column-formatter="columnFormatter" />
        </view>
        <text class="demo-text">当前值: {{ value6 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="步进间隔">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">15分钟间隔</text>
        <view class="panel-box">
          <ui-date-panel v-model="value8" :columns="['hour', 'minute']" :steps="{ minute: 15 }" format="HH:mm" />
        </view>
        <text class="demo-text">当前值: {{ value8 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="季度选择">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">月份按 3 步进（1/4/7/10月）</text>
        <view class="panel-box">
          <ui-date-panel v-model="value9" :columns="['year', 'month']" :steps="{ month: 3 }" format="YYYY-MM" />
        </view>
        <text class="demo-text">当前值: {{ value9 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="多列步进">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">2小时间隔 + 30分钟间隔</text>
        <view class="panel-box">
          <ui-date-panel v-model="value10" :columns="['hour', 'minute']" :steps="{ hour: 2, minute: 30 }" format="HH:mm" />
        </view>
        <text class="demo-text">当前值: {{ value10 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="事件回调">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-date-panel
            v-model="value7"
            :columns="['year', 'month', 'day', 'hour', 'minute']"
            format="YYYY-MM-DD HH:mm"
            @change="onChange"
            @pickstart="onPickStart"
            @pickend="onPickEnd"
          />
        </view>
        <text class="demo-text">当前值: {{ value7 || "未选择" }}</text>
        <view class="event-list">
          <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
            <text class="event-text">{{ log }}</text>
          </view>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "DatePanel 日期面板" },
})

const value1 = ref("")
const value2 = ref("2024-06")
const value3 = ref("14:30")
const value4 = ref("")
const value5 = ref("2024-05-01")
const value6 = ref("")
const value7 = ref("")
const value8 = ref("09:15")
const value9 = ref("2024-04")
const value10 = ref("10:30")

const minDate = "2024-01-01"
const maxDate = "2025-12-31"

const eventLogs = ref<string[]>([])

function columnFormatter(type: string, option: { text: string; value: string }) {
  const suffixMap: Record<string, string> = {
    year: "年",
    month: "月",
    day: "日",
    hour: "时",
    minute: "分",
    second: "秒",
  }

  return {
    ...option,
    text: `${option.text}${suffixMap[type]}`,
  }
}

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

function onPickStart() {
  addEventLog("触发 pickstart 事件")
}

function onPickEnd() {
  addEventLog("触发 pickend 事件")
}

function onChange(data: { value: string }) {
  addEventLog(`触发 change 事件: ${data.value}`)
}
</script>

<style lang="scss" scoped>
.panel-box {
  width: 100%;
  border: 1px solid var(--ui-color-border-light);
  overflow: hidden;
  border-radius: 12rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.event-list {
  width: 100%;
  padding: 16rpx;
  background: var(--ui-color-background-page);
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
</style>
