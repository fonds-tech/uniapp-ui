<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-code-input v-model="basic" @complete="onComplete" />
      <text class="demo-tip">输入完成后自动触发 complete 事件</text>
    </demo-section>

    <demo-section title="自定义长度">
      <view class="demo-grid">
        <view class="demo-cell">
          <ui-code-input v-model="length4" :length="4" />
          <text class="demo-label">4 位验证码</text>
        </view>
        <view class="demo-cell">
          <ui-code-input v-model="length6" :length="6" />
          <text class="demo-label">6 位验证码</text>
        </view>
      </view>
    </demo-section>

    <demo-section title="样式类型">
      <view class="demo-col">
        <view class="demo-row">
          <ui-code-input v-model="typeBox" :length="4" type="box" />
          <text class="demo-label">box</text>
        </view>
        <view class="demo-row">
          <ui-code-input v-model="typeUnderline" :length="4" type="underline" />
          <text class="demo-label">underline</text>
        </view>
        <view class="demo-row">
          <ui-code-input v-model="typeFilled" :length="4" type="filled" />
          <text class="demo-label">filled</text>
        </view>
      </view>
    </demo-section>

    <demo-section title="密码模式">
      <ui-code-input v-model="masked" :length="6" mask />
      <text class="demo-tip">输入内容显示为圆点</text>
    </demo-section>

    <demo-section title="自定义样式">
      <ui-code-input
        v-model="customStyle"
        :length="4"
        code-width="100rpx"
        code-height="120rpx"
        code-radius="16rpx"
        code-active-color="#6366F1"
        text-size="48rpx"
        text-color="#6366F1"
        gap="32rpx"
      />
    </demo-section>

    <demo-section title="禁用状态">
      <ui-code-input v-model="disabledValue" :length="4" disabled />
    </demo-section>

    <demo-section title="配合键盘使用">
      <ui-code-input v-model="withKeyboard" :length="6" type="filled" :adjust-position="false" @click="showKeyboard = true" />
      <ui-keyboard v-model:show="showKeyboard" v-model="withKeyboard" :maxlength="6" @confirm="onKeyboardConfirm" />
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "CodeInput 验证码输入" },
})

const toast = useToast()

const basic = ref("")
const length4 = ref("")
const length6 = ref("")
const typeBox = ref("12")
const typeUnderline = ref("12")
const typeFilled = ref("12")
const masked = ref("")
const customStyle = ref("")
const disabledValue = ref("1234")
const withKeyboard = ref("")
const showKeyboard = ref(false)

function onComplete(value: string) {
  toast.success(`验证码: ${value}`)
}

function onKeyboardConfirm() {
  toast.success(`键盘确认: ${withKeyboard.value}`)
}
</script>

<style lang="scss" scoped>
.demo-grid {
  gap: 32rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.demo-col {
  gap: 32rpx;
  display: flex;
  flex-direction: column;
}

.demo-row {
  gap: 16rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.demo-cell {
  gap: 12rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.demo-label {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.demo-tip {
  color: var(--ui-color-text-tertiary);
  display: block;
  font-size: var(--ui-font-size-xs);
  margin-top: 16rpx;
}

.demo-keyboard {
  margin-top: 32rpx;
}
</style>
