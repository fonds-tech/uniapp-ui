<template>
  <demo-page>
    <demo-section title="基础用法">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">文本</text>
          <ui-input v-model="value1" placeholder="请输入内容" />
        </view>
      </view>
    </demo-section>

    <demo-section title="输入框类型">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">文本</text>
          <ui-input v-model="value2" type="text" placeholder="请输入文本" />
        </view>
        <view class="form-item">
          <text class="form-label">数字</text>
          <ui-input v-model="value3" type="number" placeholder="请输入数字" />
        </view>
        <view class="form-item">
          <text class="form-label">小数</text>
          <ui-input v-model="value4" type="digit" placeholder="请输入小数" />
        </view>
        <view class="form-item">
          <text class="form-label">密码</text>
          <ui-input v-model="value5" type="password" placeholder="请输入密码" />
        </view>
      </view>
    </demo-section>

    <demo-section title="禁用和只读">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">禁用</text>
          <ui-input model-value="禁用状态" disabled placeholder="禁用状态" />
        </view>
        <view class="form-item">
          <text class="form-label">只读</text>
          <ui-input model-value="只读状态" readonly placeholder="只读状态" />
        </view>
      </view>
    </demo-section>

    <demo-section title="清除按钮">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">可清除</text>
          <ui-input v-model="value6" clearable placeholder="点击清除" @clear="onClear" />
        </view>
        <view class="form-item">
          <text class="form-label">不可清除</text>
          <ui-input v-model="value7" :clearable="false" placeholder="无法清除" />
        </view>
      </view>
    </demo-section>

    <!-- 新增：清除图标样式 -->
    <demo-section title="清除图标样式">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">自定义图标</text>
          <ui-input
            v-model="valueClearIcon"
            clearable
            clear-icon="close"
            clear-icon-size="28rpx"
            clear-icon-color="#fff"
            clear-icon-background="#1989fa"
            placeholder="自定义清除图标"
          />
        </view>
      </view>
    </demo-section>

    <demo-section title="自定义样式">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">自定义背景</text>
          <ui-input v-model="value8" background="#f5f6fa" radius="16rpx" placeholder="自定义背景和圆角" />
        </view>
        <view class="form-item">
          <text class="form-label">居中对齐</text>
          <ui-input v-model="value9" input-align="center" placeholder="居中对齐" />
        </view>
        <view class="form-item">
          <text class="form-label">右对齐</text>
          <ui-input v-model="value10" input-align="right" placeholder="右对齐" />
        </view>
      </view>
    </demo-section>

    <!-- 新增：字体样式 -->
    <demo-section title="字体样式">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">字体颜色</text>
          <ui-input v-model="valueColor" color="#1989fa" placeholder="蓝色字体" />
        </view>
        <view class="form-item">
          <text class="form-label">字体大小</text>
          <ui-input v-model="valueFontSize" font-size="36rpx" placeholder="大字体" />
        </view>
        <view class="form-item">
          <text class="form-label">字体粗细</text>
          <ui-input v-model="valueFontWeight" font-weight="600" placeholder="粗体文字" />
        </view>
      </view>
    </demo-section>

    <!-- 新增：占位符样式 -->
    <demo-section title="占位符样式">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">占位符颜色</text>
          <ui-input v-model="valuePlaceholder1" placeholder-color="#ee0a24" placeholder="红色占位符" />
        </view>
        <view class="form-item">
          <text class="form-label">占位符样式</text>
          <ui-input v-model="valuePlaceholder2" :placeholder-style="{ fontStyle: 'italic', fontSize: '24rpx' }" placeholder="斜体小字占位符" />
        </view>
      </view>
    </demo-section>

    <demo-section title="限制输入长度">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">最多10字</text>
          <ui-input v-model="value11" :maxlength="10" placeholder="最多输入10个字符" />
        </view>
      </view>
    </demo-section>

    <!-- 新增：键盘配置 -->
    <demo-section title="键盘配置">
      <view class="form-list">
        <view class="form-item">
          <text class="form-label">确认按钮</text>
          <ui-input v-model="valueConfirm" confirm-type="search" placeholder="按回车搜索" @confirm="onConfirm" />
        </view>
        <view class="form-item">
          <text class="form-label">光标颜色</text>
          <ui-input v-model="valueCursor" cursor-color="#07c160" placeholder="绿色光标" />
        </view>
        <view class="form-item">
          <text class="form-label">自动聚焦</text>
          <ui-input v-model="valueFocus" :focus="autoFocus" placeholder="自动获取焦点" />
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Input 输入框" },
})

const toast = useToast()

// 基础示例
const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("可以清除的内容")
const value7 = ref("")
const value8 = ref("")
const value9 = ref("")
const value10 = ref("")
const value11 = ref("")

// 新增示例
const valueClearIcon = ref("清除图标示例")
const valueColor = ref("蓝色文字")
const valueFontSize = ref("大字体")
const valueFontWeight = ref("粗体")
const valueWidth = ref("")
const valueHeight = ref("")
const valuePadding = ref("")
const valuePlaceholder1 = ref("")
const valuePlaceholder2 = ref("")
const valueConfirm = ref("")
const valueCursor = ref("")
const valueFocus = ref("")
const autoFocus = ref(false)
const valueEvent = ref("")
const valueCustom = ref("")

// 事件日志
const eventLogs = ref<string[]>([])

function addLog(log: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 20) {
    eventLogs.value.pop()
  }
}

function clearLogs() {
  eventLogs.value = []
}

// 清除回调
function onClear() {
  toast.text("已清除内容")
}

// 确认回调
function onConfirm(value: string) {
  toast.success(`搜索: ${value}`)
}

// 事件处理
function onInputClick() {
  addLog("click: 点击输入框")
}

function onInputFocus() {
  addLog("focus: 获取焦点")
}

function onInputBlur(value: string) {
  addLog(`blur: 失去焦点，值=${value}`)
}

function onInputInput(value: string) {
  addLog(`input: 输入中，值=${value}`)
}

function onInputChange(value: string) {
  addLog(`change: 值变化，值=${value}`)
}

function onInputClear() {
  addLog("clear: 清除内容")
}

function onInputConfirm(value: string) {
  addLog(`confirm: 确认输入，值=${value}`)
}
</script>

<style lang="scss" scoped>
.form-list {
  overflow: hidden;
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-xl);
}

.form-item {
  display: flex;
  padding: var(--ui-spacing-xl) var(--ui-spacing-xxl);
  align-items: center;
  border-bottom: 1px solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }
}

.form-label {
  color: var(--ui-color-text-main);
  width: 160rpx;
  font-size: var(--ui-font-size-md);
  flex-shrink: 0;
}

.event-log {
  padding: 24rpx;
  background: var(--ui-color-background);
  margin-top: 24rpx;
  border-radius: var(--ui-radius-xl);

  &__title {
    color: var(--ui-color-text-main);
    display: block;
    font-size: var(--ui-font-size-md);
    font-weight: 500;
    margin-bottom: 16rpx;
  }

  &__content {
    height: 200rpx;
    padding: 16rpx;
    background: var(--ui-color-background-light);
    border-radius: var(--ui-radius-md);
    margin-bottom: 16rpx;
  }

  &__item {
    color: var(--ui-color-text-secondary);
    display: block;
    font-size: 24rpx;
    line-height: 1.6;
  }
}

:deep(.my-input) {
  background: #f0f9eb;
}
</style>
