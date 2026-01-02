<template>
  <demo-page>
    <demo-section title="数字键盘">
      <demo-block>
        <ui-cell title="数字键盘" :value="value1 || '点击输入'" is-link @click="openKeyboard('number')" />
      </demo-block>
    </demo-section>

    <demo-section title="身份证键盘">
      <demo-block>
        <ui-cell title="身份证键盘" :value="value2 || '点击输入'" is-link @click="openKeyboard('card')" />
      </demo-block>
    </demo-section>

    <demo-section title="车牌号键盘">
      <demo-block>
        <ui-cell title="车牌号键盘" :value="value3 || '点击输入'" is-link @click="openKeyboard('car')" />
      </demo-block>
    </demo-section>

    <demo-section title="带小数点">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 show-dot 显示小数点按钮，适用于金额输入</text>
        <ui-cell title="金额输入" :value="value4 || '点击输入'" is-link @click="openKeyboard('dot')" />
      </demo-block>
    </demo-section>

    <demo-section title="随机键盘">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 random 打乱键盘按键顺序，增强安全性</text>
        <ui-cell title="密码输入" :value="maskValue" is-link @click="openKeyboard('random')" />
      </demo-block>
    </demo-section>

    <demo-section title="限制长度">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 maxlength 限制输入长度</text>
        <ui-cell title="验证码 (6位)" :value="value6 || '点击输入'" is-link @click="openKeyboard('maxlength')" />
      </demo-block>
    </demo-section>

    <!-- 新增：隐藏遮罩 -->
    <demo-section title="隐藏遮罩">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 overlay 控制是否显示遮罩层</text>
        <demo-block align="center" :gap="16">
          <ui-switch v-model="currentOverlay" />
          <text class="switch-label">{{ currentOverlay ? "显示遮罩" : "隐藏遮罩" }}</text>
        </demo-block>
        <ui-cell title="测试输入" :value="value7 || '点击输入'" is-link @click="openKeyboard('overlay')" />
      </demo-block>
    </demo-section>

    <!-- 新增：点击遮罩关闭 -->
    <demo-section title="点击遮罩关闭">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 close-on-click-overlay 控制点击遮罩是否关闭</text>
        <demo-block align="center" :gap="16">
          <ui-switch v-model="currentCloseOnOverlay" />
          <text class="switch-label">{{ currentCloseOnOverlay ? "允许关闭" : "禁止关闭" }}</text>
        </demo-block>
        <ui-cell title="测试输入" :value="value8 || '点击输入'" is-link @click="openKeyboard('closeOnOverlay')" />
      </demo-block>
    </demo-section>

    <!-- 新增：隐藏顶部栏 -->
    <demo-section title="隐藏顶部栏">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 show-header 控制顶部栏显示</text>
        <demo-block align="center" :gap="16">
          <ui-switch v-model="currentShowHeader" />
          <text class="switch-label">{{ currentShowHeader ? "显示顶部栏" : "隐藏顶部栏" }}</text>
        </demo-block>
        <ui-cell title="测试输入" :value="value9 || '点击输入'" is-link @click="openKeyboard('showHeader')" />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义按钮 -->
    <demo-section title="自定义按钮">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">自定义取消/确认按钮的文字、颜色、大小</text>
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="openKeyboard('customBtn1')">自定义文字</ui-button>
          <ui-button size="small" @click="openKeyboard('customBtn2')">自定义样式</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：隐藏取消/确认按钮 -->
    <demo-section title="隐藏按钮">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 show-cancel/show-confirm 控制按钮显示</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="openKeyboard('hideCancel')">隐藏取消</ui-button>
          <ui-button size="small" @click="openKeyboard('hideConfirm')">隐藏确认</ui-button>
          <ui-button size="small" @click="openKeyboard('hideBoth')">都隐藏</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义背景 -->
    <demo-section title="自定义背景">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 background 设置键盘背景色</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="showBackground('#f2f3f5')">默认</ui-button>
          <ui-button size="small" @click="showBackground('#e8f4ff')">蓝色调</ui-button>
          <ui-button size="small" @click="showBackground('#fff0f0')">粉色调</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：层级设置 -->
    <demo-section title="层级设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 z-index 设置键盘层级</text>
        <ui-cell title="测试输入" :value="value10 || '点击输入'" is-link @click="openKeyboard('zIndex')" />
      </demo-block>
    </demo-section>

    <!-- 新增：安全区域适配 -->
    <demo-section title="安全区域适配">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 safe-area-inset-bottom 适配底部安全区</text>
        <demo-block align="center" :gap="16">
          <ui-switch v-model="currentSafeArea" />
          <text class="switch-label">{{ currentSafeArea ? "开启适配" : "关闭适配" }}</text>
        </demo-block>
        <ui-cell title="测试输入" :value="value11 || '点击输入'" is-link @click="openKeyboard('safeArea')" />
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-cell title="测试输入" :value="value12 || '点击输入'" is-link @click="openKeyboard('events')" />
        <text class="demo-text">{{ eventLog }}</text>
        <view class="event-list">
          <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
            <text class="event-text">{{ log }}</text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="openKeyboard('customClass')">自定义类名</ui-button>
          <ui-button size="small" @click="openKeyboard('customStyle')">自定义样式</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 支付密码 -->
    <demo-section title="综合示例 - 支付密码">
      <demo-block direction="column" :gap="16">
        <view class="password-box">
          <view v-for="i in 6" :key="i" class="password-item" :class="{ 'password-item--active': paymentPassword.length >= i }">
            <view v-if="paymentPassword.length >= i" class="password-dot" />
          </view>
        </view>
        <ui-button type="primary" block @click="openKeyboard('payment')">输入支付密码</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 短信验证码 -->
    <demo-section title="综合示例 - 短信验证码">
      <demo-block direction="column" :gap="16">
        <view class="code-box">
          <view v-for="i in 4" :key="i" class="code-item">
            <text class="code-text">{{ smsCode[i - 1] || '' }}</text>
          </view>
        </view>
        <ui-button type="primary" block @click="openKeyboard('sms')">输入验证码</ui-button>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 车牌号输入 -->
    <demo-section title="综合示例 - 车牌号输入">
      <demo-block direction="column" :gap="16">
        <view class="plate-box">
          <view v-for="i in 7" :key="i" class="plate-item" :class="{ 'plate-item--province': i === 1 }">
            <text class="plate-text">{{ carPlate[i - 1] || (i === 1 ? '省' : '') }}</text>
          </view>
        </view>
        <ui-button type="primary" block @click="openKeyboard('plate')">输入车牌号</ui-button>
      </demo-block>
    </demo-section>

    <!-- Keyboard 组件 -->
    <!-- 基础键盘 -->
    <ui-keyboard
      v-model:show="showKeyboard"
      :mode="keyboardMode"
      :title="keyboardTitle"
      :show-dot="showDot"
      :random="isRandom"
      :maxlength="maxLength"
      :overlay="currentOverlay"
      :close-on-click-overlay="currentCloseOnOverlay"
      :show-header="currentShowHeader"
      :show-cancel="currentShowCancel"
      :show-confirm="currentShowConfirm"
      :cancel-text="currentCancelText"
      :cancel-text-size="currentCancelTextSize"
      :cancel-text-color="currentCancelTextColor"
      :confirm-text="currentConfirmText"
      :confirm-text-size="currentConfirmTextSize"
      :confirm-text-color="currentConfirmTextColor"
      :background="currentBackground"
      :z-index="currentZIndex"
      :safe-area-inset-bottom="currentSafeArea"
      :custom-class="currentCustomClass"
      :custom-style="currentCustomStyle"
      @open="onKeyboardOpen"
      @close="onKeyboardClose"
      @input="onInput"
      @delete="onDelete"
      @cancel="onCancel"
      @confirm="onConfirm"
      @change="onKeyboardChange"
    />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Keyboard 键盘" },
})

const toast = useToast()

// 基础值
const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("")
const value7 = ref("")
const value8 = ref("")
const value9 = ref("")
const value10 = ref("")
const value11 = ref("")
const value12 = ref("")

// 综合示例值
const paymentPassword = ref("")
const smsCode = ref("")
const carPlate = ref("")

// 键盘配置
const showKeyboard = ref(false)
const keyboardMode = ref<"number" | "card" | "car">("number")
const keyboardTitle = ref("")
const showDot = ref(false)
const isRandom = ref(false)
const maxLength = ref(Infinity)
const currentField = ref("")

// 可配置项
const currentOverlay = ref(true)
const currentCloseOnOverlay = ref(true)
const currentShowHeader = ref(true)
const currentShowCancel = ref(true)
const currentShowConfirm = ref(true)
const currentCancelText = ref("取消")
const currentCancelTextSize = ref("")
const currentCancelTextColor = ref("error")
const currentConfirmText = ref("确定")
const currentConfirmTextSize = ref("")
const currentConfirmTextColor = ref("")
const currentBackground = ref("#f2f3f5")
const currentZIndex = ref("")
const currentSafeArea = ref(true)
const currentCustomClass = ref("")
const currentCustomStyle = ref<Record<string, string>>({})

// 事件日志
const eventLog = ref("操作键盘查看事件")
const eventLogs = ref<string[]>([])
const isEventMode = ref(false)

function addEventLog(log: string) {
  if (!isEventMode.value) return
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${log}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
  eventLog.value = log
}

// 密码遮罩
const maskValue = computed(() => {
  return value5.value ? "*".repeat(value5.value.length) : ""
})

// 重置配置
function resetConfig() {
  currentOverlay.value = true
  currentCloseOnOverlay.value = true
  currentShowHeader.value = true
  currentShowCancel.value = true
  currentShowConfirm.value = true
  currentCancelText.value = "取消"
  currentCancelTextSize.value = ""
  currentCancelTextColor.value = "error"
  currentConfirmText.value = "确定"
  currentConfirmTextSize.value = ""
  currentConfirmTextColor.value = ""
  currentBackground.value = "#f2f3f5"
  currentZIndex.value = ""
  currentSafeArea.value = true
  currentCustomClass.value = ""
  currentCustomStyle.value = {}
  showDot.value = false
  isRandom.value = false
  maxLength.value = Infinity
  isEventMode.value = false
}

function openKeyboard(type: string) {
  currentField.value = type
  resetConfig()

  switch (type) {
    case "number":
      keyboardMode.value = "number"
      keyboardTitle.value = "数字键盘"
      break
    case "card":
      keyboardMode.value = "card"
      keyboardTitle.value = "身份证键盘"
      break
    case "car":
      keyboardMode.value = "car"
      keyboardTitle.value = "车牌号键盘"
      break
    case "dot":
      keyboardMode.value = "number"
      keyboardTitle.value = "金额输入"
      showDot.value = true
      break
    case "random":
      keyboardMode.value = "number"
      keyboardTitle.value = "随机键盘"
      isRandom.value = true
      break
    case "maxlength":
      keyboardMode.value = "number"
      keyboardTitle.value = "验证码"
      maxLength.value = 6
      break
    case "overlay":
      keyboardMode.value = "number"
      keyboardTitle.value = "遮罩测试"
      break
    case "closeOnOverlay":
      keyboardMode.value = "number"
      keyboardTitle.value = "遮罩关闭测试"
      break
    case "showHeader":
      keyboardMode.value = "number"
      keyboardTitle.value = "顶部栏测试"
      break
    case "customBtn1":
      keyboardMode.value = "number"
      keyboardTitle.value = "自定义按钮"
      currentCancelText.value = "关闭"
      currentConfirmText.value = "完成"
      break
    case "customBtn2":
      keyboardMode.value = "number"
      keyboardTitle.value = "自定义样式"
      currentCancelTextSize.value = "32rpx"
      currentCancelTextColor.value = "#999"
      currentConfirmTextSize.value = "32rpx"
      currentConfirmTextColor.value = "#07c160"
      break
    case "hideCancel":
      keyboardMode.value = "number"
      keyboardTitle.value = "隐藏取消按钮"
      currentShowCancel.value = false
      break
    case "hideConfirm":
      keyboardMode.value = "number"
      keyboardTitle.value = "隐藏确认按钮"
      currentShowConfirm.value = false
      break
    case "hideBoth":
      keyboardMode.value = "number"
      keyboardTitle.value = "仅显示标题"
      currentShowCancel.value = false
      currentShowConfirm.value = false
      break
    case "zIndex":
      keyboardMode.value = "number"
      keyboardTitle.value = "层级测试"
      currentZIndex.value = "1000"
      break
    case "safeArea":
      keyboardMode.value = "number"
      keyboardTitle.value = "安全区域测试"
      break
    case "events":
      keyboardMode.value = "number"
      keyboardTitle.value = "事件测试"
      isEventMode.value = true
      break
    case "customClass":
      keyboardMode.value = "number"
      keyboardTitle.value = "自定义类名"
      currentCustomClass.value = "my-keyboard"
      break
    case "customStyle":
      keyboardMode.value = "number"
      keyboardTitle.value = "自定义样式"
      currentCustomStyle.value = { borderRadius: "24rpx 24rpx 0 0" }
      break
    case "payment":
      keyboardMode.value = "number"
      keyboardTitle.value = "输入支付密码"
      isRandom.value = true
      maxLength.value = 6
      currentShowCancel.value = false
      paymentPassword.value = ""
      break
    case "sms":
      keyboardMode.value = "number"
      keyboardTitle.value = "输入验证码"
      maxLength.value = 4
      smsCode.value = ""
      break
    case "plate":
      keyboardMode.value = "car"
      keyboardTitle.value = "输入车牌号"
      maxLength.value = 7
      carPlate.value = ""
      break
  }

  showKeyboard.value = true
}

function showBackground(color: string) {
  currentField.value = "background"
  resetConfig()
  keyboardMode.value = "number"
  keyboardTitle.value = "自定义背景"
  currentBackground.value = color
  showKeyboard.value = true
}

function getCurrentValue(): string {
  switch (currentField.value) {
    case "number":
      return value1.value
    case "card":
      return value2.value
    case "car":
      return value3.value
    case "dot":
      return value4.value
    case "random":
      return value5.value
    case "maxlength":
      return value6.value
    case "overlay":
      return value7.value
    case "closeOnOverlay":
      return value8.value
    case "showHeader":
      return value9.value
    case "zIndex":
      return value10.value
    case "safeArea":
      return value11.value
    case "events":
      return value12.value
    case "payment":
      return paymentPassword.value
    case "sms":
      return smsCode.value
    case "plate":
      return carPlate.value
    default:
      return ""
  }
}

function setCurrentValue(val: string) {
  switch (currentField.value) {
    case "number":
      value1.value = val
      break
    case "card":
      value2.value = val
      break
    case "car":
      value3.value = val
      break
    case "dot":
      value4.value = val
      break
    case "random":
      value5.value = val
      break
    case "maxlength":
      value6.value = val
      break
    case "overlay":
      value7.value = val
      break
    case "closeOnOverlay":
      value8.value = val
      break
    case "showHeader":
      value9.value = val
      break
    case "zIndex":
      value10.value = val
      break
    case "safeArea":
      value11.value = val
      break
    case "events":
      value12.value = val
      break
    case "payment":
      paymentPassword.value = val
      if (val.length === 6) {
        showKeyboard.value = false
        toast.success("支付密码输入完成")
      }
      break
    case "sms":
      smsCode.value = val
      if (val.length === 4) {
        showKeyboard.value = false
        toast.success("验证码输入完成")
      }
      break
    case "plate":
      carPlate.value = val
      if (val.length === 7) {
        showKeyboard.value = false
        toast.success(`车牌号: ${val}`)
      }
      break
  }
}

// 事件处理
function onKeyboardOpen() {
  addEventLog("触发 open 事件 - 键盘打开")
}

function onKeyboardClose() {
  addEventLog("触发 close 事件 - 键盘关闭")
}

function onInput(key: string) {
  const current = getCurrentValue()
  if (maxLength.value !== Infinity && current.length >= maxLength.value) return
  setCurrentValue(current + key)
  addEventLog(`触发 input 事件，输入: ${key}`)
}

function onDelete() {
  const current = getCurrentValue()
  setCurrentValue(current.slice(0, -1))
  addEventLog("触发 delete 事件 - 删除一位")
}

function onCancel() {
  showKeyboard.value = false
  addEventLog("触发 cancel 事件 - 取消输入")
}

function onConfirm() {
  showKeyboard.value = false
  const value = getCurrentValue()
  if (value) {
    toast.success(`输入完成: ${value}`)
  }
  addEventLog(`触发 confirm 事件 - 确认输入: ${value}`)
}

function onKeyboardChange(value: string) {
  addEventLog(`触发 change 事件，当前值: ${value}`)
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

.password-box {
  gap: 16rpx;
  display: flex;
  justify-content: center;
}

.password-item {
  width: 80rpx;
  border: 2rpx solid var(--ui-color-border);
  height: 80rpx;
  display: flex;
  background: #fff;
  align-items: center;
  border-radius: 12rpx;
  justify-content: center;

  &--active {
    border-color: var(--ui-color-primary);
  }
}

.password-dot {
  width: 24rpx;
  height: 24rpx;
  background: #333;
  border-radius: 50%;
}

.code-box {
  gap: 24rpx;
  display: flex;
  justify-content: center;
}

.code-item {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  border-bottom: 4rpx solid var(--ui-color-border);
  justify-content: center;
}

.code-text {
  color: var(--ui-color-text-main);
  font-size: 56rpx;
  font-weight: 600;
}

.plate-box {
  gap: 12rpx;
  display: flex;
  justify-content: center;
}

.plate-item {
  width: 64rpx;
  border: 2rpx solid var(--ui-color-border);
  height: 80rpx;
  display: flex;
  background: #fff;
  align-items: center;
  border-radius: 8rpx;
  justify-content: center;

  &--province {
    background: var(--ui-color-background-light);
  }
}

.plate-text {
  color: var(--ui-color-text-main);
  font-size: 32rpx;
  font-weight: 600;
}

:deep(.my-keyboard) {
  .ui-keyboard__header {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }

  .ui-keyboard__title {
    color: #fff;
  }
}
</style>
