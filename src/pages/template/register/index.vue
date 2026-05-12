<template>
  <view class="page">
    <view class="hero">
      <view class="hero__logo">
        <ui-icon name="user-o" size="48rpx" color="text-inverse" />
      </view>
      <text class="hero__title">创建新账号</text>
      <text class="hero__subtitle">开启你的 Uniapp UI 之旅</text>
    </view>

    <view class="card">
      <ui-form ref="formRef" :model="form" :rules="rules" label-position="top" :show-error-message="false">
        <ui-form-item prop="phone">
          <view class="field">
            <text class="field__label">手机号</text>
            <view class="field__input">
              <text class="field__prefix">+86</text>
              <ui-input v-model="form.phone" type="number" placeholder="请输入手机号码" :maxlength="11" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" clearable />
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
        <view class="divider" />

        <ui-form-item prop="password">
          <view class="field">
            <text class="field__label">登录密码</text>
            <view class="field__input">
              <ui-icon name="lock" size="36rpx" color="text-tertiary" />
              <ui-input v-model="form.password" :password="!showPwd" placeholder="设置 6-20 位密码" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" />
              <view class="field__toggle" @click="showPwd = !showPwd">
                <ui-icon :name="showPwd ? 'eye' : 'closed-eye'" size="36rpx" color="text-tertiary" />
              </view>
            </view>
            <view v-if="form.password" class="strength">
              <view v-for="i in 3" :key="i" class="strength__bar" :class="[i <= strength ? `strength__bar--${strengthClass}` : '']" />
              <text class="strength__text">{{ strengthLabel }}</text>
            </view>
          </view>
        </ui-form-item>
        <view class="divider" />

        <ui-form-item prop="invite">
          <view class="field">
            <text class="field__label">邀请码（选填）</text>
            <view class="field__input">
              <ui-icon name="gift" size="36rpx" color="text-tertiary" />
              <ui-input v-model="form.invite" placeholder="填写邀请码，注册成功奖励 +50 积分" :show-border="false" :custom-style="{ flex: 1, background: 'transparent' }" />
            </view>
          </view>
        </ui-form-item>
      </ui-form>
    </view>

    <view class="agreement">
      <ui-checkbox v-model="agree">
        <text class="agreement__text">
          我已阅读并同意
          <text class="agreement__link" @click.stop="onProtocol('服务条款')">《服务条款》</text>
          和
          <text class="agreement__link" @click.stop="onProtocol('隐私政策')">《隐私政策》</text>
        </text>
      </ui-checkbox>
    </view>

    <view class="actions">
      <ui-button block type="primary" size="large" radius="48rpx" :loading="submitting" :disabled="!canSubmit" @click="onSubmit">注 册</ui-button>
      <view class="actions__login">
        <text class="actions__login-text">已有账号？</text>
        <text class="actions__login-link" @click="onLogin">直接登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { FormInstance } from "@/uni_modules/uniapp-ui/ui-form"
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "注册" },
})

const toast = useToast()
const formRef = ref<FormInstance>()
const submitting = ref(false)
const countdown = ref(0)
const agree = ref(false)
const showPwd = ref(false)

const form = reactive({
  phone: "",
  code: "",
  password: "",
  invite: "",
})

const rules = {
  phone: [{ required: true, message: "请输入手机号" }, { pattern: /^1[3-9]\d{9}$/, message: "手机号格式有误" }],
  code: [{ required: true, message: "请输入验证码" }, { pattern: /^\d{6}$/, message: "6 位数字" }],
  password: [{ required: true, message: "请输入密码" }, { pattern: /^.{6,20}$/, message: "密码 6-20 位" }],
}

const canSubmit = computed(() => agree.value && form.phone.length === 11 && form.code.length === 6 && form.password.length >= 6)

const strength = computed(() => {
  const p = form.password
  if (p.length < 6) return 0
  let s = 1
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++
  if (/\d/.test(p) && /[^A-Z0-9]/i.test(p)) s++
  return s
})

const strengthLabel = computed(() => ["", "弱", "中", "强"][strength.value])
const strengthClass = computed(() => ["", "weak", "mid", "strong"][strength.value])

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

function onSubmit() {
  if (!agree.value) {
    toast.fail("请先同意协议")
    return
  }
  formRef.value?.validate((valid) => {
    if (!valid) return
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      toast.success("注册成功")
    }, 800)
  })
}

function onLogin() {
  uni.navigateTo({ url: "/pages/template/login-form/index" })
}

function onProtocol(name: string) {
  toast.text(`查看 ${name}`)
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
  margin-bottom: var(--ui-spacing-xxl);
  flex-direction: column;

  &__logo {
    width: 120rpx;
    height: 120rpx;
    display: flex;
    background: linear-gradient(135deg, var(--ui-color-success), var(--ui-color-primary));
    box-shadow: var(--ui-shadow-md);
    align-items: center;
    border-radius: var(--ui-radius-xl);
    justify-content: center;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: 52rpx;
    font-weight: var(--ui-font-weight-bold);
  }

  &__subtitle {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }
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
}

.divider {
  height: 2rpx;
  background: var(--ui-color-border-light);
}

.strength {
  gap: var(--ui-spacing-xs);
  display: flex;
  margin-top: var(--ui-spacing-sm);
  align-items: center;

  &__bar {
    flex: 1;
    height: 6rpx;
    background: var(--ui-color-border-light);
    border-radius: var(--ui-radius-xs);

    &--weak {
      background: var(--ui-color-danger);
    }

    &--mid {
      background: var(--ui-color-warning);
    }

    &--strong {
      background: var(--ui-color-success);
    }
  }

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    min-width: 40rpx;
    margin-left: var(--ui-spacing-xs);
  }
}

.agreement {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: 0 var(--ui-spacing-md);
  align-items: flex-start;
  margin-bottom: var(--ui-spacing-xl);

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    line-height: 1.6;
  }

  &__link {
    color: var(--ui-color-primary);
  }
}

.actions {
  &__login {
    gap: var(--ui-spacing-xxs);
    display: flex;
    margin-top: var(--ui-spacing-md);
    align-items: center;
    justify-content: center;
  }

  &__login-text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__login-link {
    color: var(--ui-color-primary);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-normal);
  }
}
</style>
