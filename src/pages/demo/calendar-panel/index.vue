<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-calendar-panel @confirm="onConfirm1" />
        </view>
        <text class="demo-text">当前值: {{ result1 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="范围选择">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-calendar-panel type="range" @confirm="onConfirm2" />
        </view>
        <text class="demo-text">当前值: {{ result2 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="多选">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-calendar-panel type="multiple" @confirm="onConfirm3" />
        </view>
        <text class="demo-text">当前值: {{ result3 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="限制最大选择天数">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-calendar-panel type="range" :max-range="7" range-prompt="最多选择 7 天" @confirm="onConfirm4" />
        </view>
        <text class="demo-text">当前值: {{ result4 || "未选择" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="主题色定制">
      <demo-block direction="column" :gap="16">
        <view class="panel-box">
          <ui-calendar-panel color="#07c160" @confirm="onConfirm5" />
        </view>
        <text class="demo-text">当前值: {{ result5 || "未选择" }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { CalendarPanelConfirmData } from "@/uni_modules/uniapp-ui/ui-calendar-panel"

const result1 = ref("")
const result2 = ref("")
const result3 = ref("")
const result4 = ref("")
const result5 = ref("")

function onConfirm1(data: CalendarPanelConfirmData) {
  result1.value = String(data.dateStr)
}
function onConfirm2(data: CalendarPanelConfirmData) {
  if (typeof data.dateStr === "object" && !Array.isArray(data.dateStr)) {
    result2.value = `${data.dateStr.start} ~ ${data.dateStr.end}`
  }
}
function onConfirm3(data: CalendarPanelConfirmData) {
  if (Array.isArray(data.dateStr)) {
    result3.value = data.dateStr.join(", ")
  }
}
function onConfirm4(data: CalendarPanelConfirmData) {
  if (typeof data.dateStr === "object" && !Array.isArray(data.dateStr)) {
    result4.value = `${data.dateStr.start} ~ ${data.dateStr.end}`
  }
}
function onConfirm5(data: CalendarPanelConfirmData) {
  result5.value = String(data.dateStr)
}
</script>

<style lang="scss" scoped>
.panel-box {
  border-radius: 16rpx;
  background-color: var(--ui-color-background);
  overflow: hidden;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
