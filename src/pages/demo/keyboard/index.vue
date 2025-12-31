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
      <demo-block>
        <ui-cell title="金额输入" :value="value4 || '点击输入'" is-link @click="openKeyboard('dot')" />
      </demo-block>
    </demo-section>

    <demo-section title="随机键盘">
      <demo-block>
        <ui-cell title="密码输入" :value="maskValue" is-link @click="openKeyboard('random')" />
      </demo-block>
    </demo-section>

    <demo-section title="限制长度 (6位)">
      <demo-block>
        <ui-cell title="验证码" :value="value6 || '点击输入'" is-link @click="openKeyboard('maxlength')" />
      </demo-block>
    </demo-section>

    <ui-keyboard
      v-model:show="showKeyboard"
      :mode="keyboardMode"
      :title="keyboardTitle"
      :show-dot="showDot"
      :random="isRandom"
      :maxlength="maxLength"
      @input="onInput"
      @delete="onDelete"
      @confirm="onConfirm"
    />
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Keyboard 键盘" },
})

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const value4 = ref("")
const value5 = ref("")
const value6 = ref("")

const showKeyboard = ref(false)
const keyboardMode = ref<"number" | "card" | "car">("number")
const keyboardTitle = ref("")
const showDot = ref(false)
const isRandom = ref(false)
const maxLength = ref(Infinity)
const currentField = ref("")

const maskValue = computed(() => {
  return value5.value ? "*".repeat(value5.value.length) : ""
})

function openKeyboard(type: string) {
  currentField.value = type
  showDot.value = false
  isRandom.value = false
  maxLength.value = Infinity

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
  }

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
  }
}

function onInput(key: string) {
  const current = getCurrentValue()
  if (maxLength.value !== Infinity && current.length >= maxLength.value) return
  setCurrentValue(current + key)
}

function onDelete() {
  const current = getCurrentValue()
  setCurrentValue(current.slice(0, -1))
}

function onConfirm() {
  showKeyboard.value = false
  uni.showToast({ title: `输入完成: ${getCurrentValue()}`, icon: "none" })
}
</script>
