<template>
  <view class="page">
    <view class="hero">
      <view class="hero__logo">
        <ui-icon name="lock" size="48rpx" color="text-inverse" />
      </view>
      <text class="hero__title">重置密码</text>
      <text class="hero__subtitle">验证手机号 → 设置新密码 → 完成</text>
    </view>

    <view class="steps-wrap">
      <ui-steps :active="step" align-center>
        <ui-step title="验证手机" />
        <ui-step title="设置密码" />
        <ui-step title="完成" />
      </ui-steps>
    </view>

    <view v-if="step === 0" class="card">
      <ui-form ref="formRef1" :model="form" :rules="rulesPhone" label-position="top" :show-error-message="false">
        <ui-form-item prop="phone">
          <view class="field">
            <text class="field__label">注册手机号</text>
            <view class="field__input">
              <text class="field__prefix">+86</text>
              <ui-input v-model="form.phone" type="number" placeholder="请输入注册手机号" :maxlength="11" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" clearable />
            </view>
          </view>
        </ui-form-item>
        <view class="divider" />
        <ui-form-item prop="code">
          <view class="field">
            <text class="field__label">短信验证码</text>
            <view class="field__input field__input--inline">
              <ui-input v-model="form.code" type="number" placeholder="6 位短信验证码" :maxlength="6" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" />
              <ui-button type="text" size="small" :disabled="countdown > 0" @click="onSendCode">
                {{ countdown > 0 ? `${countdown} s` : "获取验证码" }}
              </ui-button>
            </view>
          </view>
        </ui-form-item>
      </ui-form>
    </view>

    <view v-if="step === 1" class="card">
      <ui-form ref="formRef2" :model="form" :rules="rulesPwd" label-position="top" :show-error-message="false">
        <ui-form-item prop="password">
          <view class="field">
            <text class="field__label">新密码</text>
            <view class="field__input">
              <ui-icon name="lock" size="36rpx" color="text-tertiary" />
              <ui-input v-model="form.password" :password="!showPwd" placeholder="设置 6-20 位新密码" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" />
              <view class="field__toggle" @click="showPwd = !showPwd">
                <ui-icon :name="showPwd ? 'eye' : 'closed-eye'" size="36rpx" color="text-tertiary" />
              </view>
            </view>
          </view>
        </ui-form-item>
        <view class="divider" />
        <ui-form-item prop="confirm">
          <view class="field">
            <text class="field__label">确认密码</text>
            <view class="field__input">
              <ui-icon name="check" size="36rpx" color="text-tertiary" />
              <ui-input v-model="form.confirm" :password="!showPwd" placeholder="再次输入新密码" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" />
            </view>
            <text v-if="form.confirm && form.confirm !== form.password" class="field__error">两次输入不一致</text>
          </view>
        </ui-form-item>
      </ui-form>
    </view>

    <view v-if="step === 2" class="success">
      <view class="success__icon">
        <ui-icon name="check" size="80rpx" color="text-inverse" />
      </view>
      <text class="success__title">密码重置成功</text>
      <text class="success__subtitle">请使用新密码重新登录</text>
    </view>

    <view class="actions">
      <ui-button v-if="step < 2" block type="primary" size="large" radius="48rpx" :loading="submitting" :disabled="!canNext" @click="onNext">
        {{ step === 0 ? "下一步" : "确认重置" }}
      </ui-button>
      <ui-button v-else block type="primary" size="large" radius="48rpx" @click="onBackToLogin">返回登录</ui-button>

      <view v-if="step < 2" class="actions__back">
        <text class="actions__back-text" @click="onBackToLogin">返回登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { FormInstance } from "@/uni_modules/uniapp-ui/ui-form"
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "找回密码" },
})

const toast = useToast()
const formRef1 = ref<FormInstance>()
const formRef2 = ref<FormInstance>()
const step = ref(0)
const submitting = ref(false)
const countdown = ref(0)
const showPwd = ref(false)

const form = reactive({
  phone: "",
  code: "",
  password: "",
  confirm: "",
})

const rulesPhone = {
  phone: [{ required: true, message: "请输入手机号" }, { pattern: /^1[3-9]\d{9}$/, message: "手机号格式有误" }],
  code: [{ required: true, message: "请输入验证码" }, { pattern: /^\d{6}$/, message: "6 位数字" }],
}

const rulesPwd = {
  password: [{ required: true, message: "请输入新密码" }, { pattern: /^.{6,20}$/, message: "密码 6-20 位" }],
  confirm: [
    { required: true, message: "请再次输入" },
    { validator: (v: string) => v === form.password || "两次输入不一致" },
  ],
}

const canNext = computed(() => {
  if (step.value === 0) return form.phone.length === 11 && form.code.length === 6
  return form.password.length >= 6 && form.password === form.confirm
})

function onSendCode() {
  if (countdown.value > 0) return
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    toast.fail("请先填正确手机号")
    return
  }
  toast.success("验证码已发送")
  countdown.value = 60
  const t = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(t)
  }, 1000)
}

function onNext() {
  if (step.value === 0) {
    formRef1.value?.validate((valid) => {
      if (valid) step.value = 1
    })
  } else {
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      step.value = 2
      toast.success("密码已重置")
    }, 800)
  }
}

function onBackToLogin() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.page {
  padding: 80rpx var(--ui-spacing-lg) var(--ui-spacing-xl);
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

.hero {
  gap: var(--ui-spacing-sm);
  display: flex;
  align-items: center;
  margin-bottom: var(--ui-spacing-xl);
  flex-direction: column;

  &__logo {
    width: 120rpx;
    height: 120rpx;
    display: flex;
    background: linear-gradient(135deg, var(--ui-color-warning), var(--ui-color-danger));
    box-shadow: var(--ui-shadow-md);
    align-items: center;
    border-radius: var(--ui-radius-xl);
    justify-content: center;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-xxl);
    font-weight: var(--ui-font-weight-bold);
  }

  &__subtitle {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.steps-wrap {
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-xl);
  margin-bottom: var(--ui-spacing-lg);
}

.card {
  padding: var(--ui-spacing-xs) var(--ui-spacing-lg);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-xl);
  margin-bottom: var(--ui-spacing-lg);
}

.field {
  gap: var(--ui-spacing-xs);
  flex: 1;
  display: flex;
  padding: var(--ui-spacing-md) 0;
  flex-direction: column;

  &__label {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__input {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;

    &--inline {
      justify-content: space-between;
    }
  }

  &__toggle {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__prefix {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
    border-right: 2rpx solid var(--ui-color-border-light);
    padding-right: var(--ui-spacing-sm);
  }

  &__error {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xs);
  }
}

.divider {
  height: 2rpx;
  background: var(--ui-color-border-light);
}

.success {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-xxl) var(--ui-spacing-xl);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  align-items: center;
  border-radius: var(--ui-radius-xl);
  margin-bottom: var(--ui-spacing-lg);
  flex-direction: column;

  &__icon {
    width: 140rpx;
    height: 140rpx;
    display: flex;
    background: linear-gradient(135deg, var(--ui-color-success), var(--ui-color-primary));
    box-shadow: var(--ui-shadow-md);
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-xl);
    margin-top: var(--ui-spacing-sm);
    font-weight: var(--ui-font-weight-bold);
  }

  &__subtitle {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }
}

.actions {
  &__back {
    display: flex;
    margin-top: var(--ui-spacing-md);
    justify-content: center;
  }

  &__back-text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
