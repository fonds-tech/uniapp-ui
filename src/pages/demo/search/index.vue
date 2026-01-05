<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-search v-model="value1" placeholder="请输入搜索关键词" />
      </demo-block>
    </demo-section>

    <demo-section title="圆角搜索框">
      <demo-block direction="column">
        <ui-search v-model="value2" round placeholder="圆角搜索框" />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义圆角 -->
    <demo-section title="自定义圆角">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value2b" radius="8rpx" placeholder="8rpx 圆角" />
        <ui-search v-model="value2c" radius="16rpx" placeholder="16rpx 圆角" />
        <ui-search v-model="value2d" radius="32rpx" placeholder="32rpx 圆角" />
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block direction="column">
        <ui-search v-model="value3" disabled placeholder="禁用状态" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景色">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value4" background="#f5f5f5" placeholder="灰色背景" />
        <ui-search v-model="value4b" background="#e8f4ff" placeholder="蓝色背景" />
        <ui-search v-model="value4c" background="#fff7e6" placeholder="橙色背景" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义按钮文字">
      <demo-block direction="column">
        <ui-search v-model="value5" action-text="确定" placeholder="自定义按钮文字" />
      </demo-block>
    </demo-section>

    <demo-section title="隐藏搜索按钮">
      <demo-block direction="column">
        <ui-search v-model="value6" :action="false" placeholder="隐藏搜索按钮" />
      </demo-block>
    </demo-section>

    <!-- 新增：按钮样式 -->
    <demo-section title="按钮样式" extra="大小/颜色/粗细">
      <demo-block direction="column">
        <ui-search v-model="value7b" action-text="搜索" action-size="30rpx" action-color="#1989fa" action-weight="600" placeholder="自定义按钮样式" />
      </demo-block>
    </demo-section>

    <!-- 新增：搜索图标 -->
    <demo-section title="搜索图标">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value8" icon="scan" placeholder="扫描图标" />
        <ui-search v-model="value8b" icon="location" placeholder="定位图标" />
        <ui-search v-model="value8c" icon="" placeholder="隐藏图标" />
      </demo-block>
    </demo-section>

    <!-- 新增：图标样式 -->
    <demo-section title="图标样式" extra="大小/颜色/粗细">
      <demo-block direction="column">
        <ui-search v-model="value9" icon-size="40rpx" icon-color="#1989fa" icon-weight="600" placeholder="自定义图标样式" />
      </demo-block>
    </demo-section>

    <!-- 新增：输入框高度 -->
    <demo-section title="输入框高度" :extra="`${currentHeight}rpx`">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value10" :height="`${currentHeight}rpx`" placeholder="自定义高度" />
        <ui-slider v-model="currentHeight" :min="48" :max="120" :step="4" />
      </demo-block>
    </demo-section>

    <!-- 新增：输入框字体大小 -->
    <demo-section title="字体大小">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value11" font-size="24rpx" placeholder="24rpx 字体" />
        <ui-search v-model="value11b" font-size="32rpx" placeholder="32rpx 字体" />
      </demo-block>
    </demo-section>

    <!-- 新增：文本颜色 -->
    <demo-section title="文本颜色">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value12" color="#1989fa" placeholder="蓝色文本" />
        <ui-search v-model="value12b" color="#ee0a24" placeholder="红色文本" />
      </demo-block>
    </demo-section>

    <!-- 新增：占位文字颜色 -->
    <demo-section title="占位文字颜色">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value13" placeholder-color="#1989fa" placeholder="蓝色占位文字" />
        <ui-search v-model="value13b" placeholder-color="#ff9500" placeholder="橙色占位文字" />
      </demo-block>
    </demo-section>

    <!-- 新增：输入对齐 -->
    <demo-section title="输入对齐">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value14" input-align="left" placeholder="左对齐" />
        <ui-search v-model="value14b" input-align="center" placeholder="居中对齐" />
        <ui-search v-model="value14c" input-align="right" placeholder="右对齐" />
      </demo-block>
    </demo-section>

    <!-- 新增：边框 -->
    <demo-section title="边框">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value15" border="1rpx solid #ddd" placeholder="灰色边框" />
        <ui-search v-model="value15b" border="2rpx solid #1989fa" placeholder="蓝色边框" />
      </demo-block>
    </demo-section>

    <!-- 新增：外边距 -->
    <demo-section title="外边距">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value16" margin="0 32rpx" background="#f5f5f5" placeholder="左右边距 32rpx" />
      </demo-block>
    </demo-section>

    <!-- 新增：最大输入长度 -->
    <demo-section title="最大输入长度" extra="最多10字符">
      <demo-block direction="column">
        <ui-search v-model="value17" :maxlength="10" placeholder="最多输入10个字符" />
      </demo-block>
    </demo-section>

    <!-- 新增：自动聚焦 -->
    <demo-section title="自动聚焦">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value18" :focus="autoFocus" placeholder="自动聚焦" />
        <demo-block align="center" :gap="16">
          <ui-switch v-model="autoFocus" />
          <text class="switch-label">{{ autoFocus ? "开启自动聚焦" : "关闭自动聚焦" }}</text>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：清除按钮 -->
    <demo-section title="清除按钮">
      <demo-block direction="column" :gap="16">
        <ui-search v-model="value19" :clearable="clearable" placeholder="输入内容后显示清除按钮" />
        <demo-block align="center" :gap="16">
          <ui-switch v-model="clearable" />
          <text class="switch-label">{{ clearable ? "显示清除按钮" : "隐藏清除按钮" }}</text>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="搜索事件">
      <demo-block direction="column">
        <ui-search v-model="value7" placeholder="点击搜索按钮触发事件" @search="onSearch" />
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" :gap="16">
        <ui-search
          v-model="value20"
          placeholder="输入后查看事件"
          @focus="onFocus"
          @blur="onBlur"
          @click="onClick"
          @clear="onClear"
          @change="onChange"
          @search="onSearchEvent"
          @action="onAction"
        />
        <text class="demo-text">{{ eventLog }}</text>
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
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Search 搜索" },
})

const toast = useToast()

// 基础示例
const value1 = ref("")
const value2 = ref("")
const value2b = ref("")
const value2c = ref("")
const value2d = ref("")
const value3 = ref("禁用内容")
const value4 = ref("")
const value4b = ref("")
const value4c = ref("")
const value5 = ref("")
const value6 = ref("")
const value7 = ref("")
const value7b = ref("")
const value8 = ref("")
const value8b = ref("")
const value8c = ref("")
const value9 = ref("")

// 输入框高度
const value10 = ref("")
const currentHeight = ref(72)

// 字体大小
const value11 = ref("")
const value11b = ref("")

// 文本颜色
const value12 = ref("蓝色文本")
const value12b = ref("红色文本")

// 占位文字颜色
const value13 = ref("")
const value13b = ref("")

// 输入对齐
const value14 = ref("")
const value14b = ref("")
const value14c = ref("")

// 边框
const value15 = ref("")
const value15b = ref("")

// 外边距
const value16 = ref("")

// 最大输入长度
const value17 = ref("")

// 自动聚焦
const value18 = ref("")
const autoFocus = ref(false)

// 清除按钮
const value19 = ref("可清除的内容")
const clearable = ref(true)

// 事件处理
const value20 = ref("")
const eventLog = ref("操作搜索框触发事件")
const eventLogs = ref<string[]>([])

function addEventLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
  eventLog.value = log
}

function onFocus() {
  addEventLog("触发 focus 事件 - 输入框聚焦")
}

function onBlur() {
  addEventLog("触发 blur 事件 - 输入框失焦")
}

function onClick() {
  addEventLog("触发 click 事件")
}

function onClear() {
  addEventLog("触发 clear 事件 - 清空内容")
}

function onChange(value: string) {
  addEventLog(`触发 change 事件，值: ${value}`)
}

function onSearchEvent(value: string) {
  addEventLog(`触发 search 事件，搜索: ${value}`)
}

function onAction() {
  addEventLog("触发 action 事件 - 点击搜索按钮")
}

function onSearch() {
  // toast.success(`搜索: ${value}`)
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.switch-label {
  color: var(--ui-color-text-main);
  font-size: 28rpx;
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
</style>
